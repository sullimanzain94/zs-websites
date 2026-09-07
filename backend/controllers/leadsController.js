// Lead Management Controller
// Handles all lead-related operations: creation, updates, status changes, etc.

import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';
import { logger } from '../utils/logger.js';
import { ApiError } from '../middleware/errorHandler.js';
import { sendLeadConfirmationEmail, sendLeadNotificationToTeam } from '../services/emailService.js';

// ===== CREATE LEAD (PRIMARY WEBSITE FORM ENDPOINT) =====
export const createLead = async (req, res, next) => {
    try {
        const {
            first_name,
            surname,
            email,
            phone,
            secondary_phone,
            vehicle_id,
            employment_status,
            monthly_income,
            deposit_available,
            finance_intent,
            lead_source = 'Website',
            campaign,
            consent_marketing,
            address_line_1,
            city,
            province
        } = req.body;

        logger.info('Creating new lead', { email, phone });

        // Check for duplicates
        const duplicateCheck = await query(
            'SELECT id, email, phone FROM customers WHERE email = LOWER($1) OR phone = $2',
            [email.toLowerCase(), phone]
        );

        let customerId;
        let isDuplicate = false;
        let duplicateLeadId = null;

        if (duplicateCheck.rows.length > 0) {
            const existing = duplicateCheck.rows[0];
            logger.warn('Duplicate customer detected', { 
                existingId: existing.id, 
                email, 
                phone 
            });

            // Check if they have an existing lead
            const existingLead = await query(
                'SELECT id, status FROM leads WHERE customer_id = $1 ORDER BY created_at DESC LIMIT 1',
                [existing.id]
            );

            if (existingLead.rows.length > 0) {
                isDuplicate = true;
                duplicateLeadId = existingLead.rows[0].id;
                customerId = existing.id;
            } else {
                customerId = existing.id;
            }
        } else {
            // Create new customer record
            customerId = uuidv4();
            await query(
                `INSERT INTO customers 
                (id, first_name, surname, email, phone, secondary_phone, employment_status, 
                 monthly_income, consent_marketing, address_line_1, city, province)
                VALUES ($1, $2, $3, LOWER($4), $5, $6, $7, $8, $9, $10, $11, $12)`,
                [customerId, first_name, surname, email, phone, secondary_phone || null, 
                 employment_status || null, monthly_income || null, consent_marketing || false,
                 address_line_1 || null, city || null, province || null]
            );

            logger.info('New customer created', { customerId, email });
        }

        // Create lead record
        const leadId = uuidv4();
        const defaultOwnerId = '1'; // Default to Zain Sulliman (owner_id: 1)

        // Calculate lead score
        const leadScore = calculateLeadScore({
            complete_contact: !!email && !!phone,
            vehicle_id: !!vehicle_id,
            high_income: monthly_income && ['R30k+', 'R20-30k'].includes(monthly_income),
            finance_source: true // From website form
        });

        const priority = getPriorityFromScore(leadScore);

        await query(
            `INSERT INTO leads 
            (id, customer_id, vehicle_id, lead_source, campaign, finance_intent, 
             deposit_available, status, priority, score, owner_id, assigned_at, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())`,
            [leadId, customerId, vehicle_id || null, lead_source, campaign || null, 
             finance_intent !== false, deposit_available || null, isDuplicate ? 'DUPLICATE' : 'NEW', 
             priority, leadScore, defaultOwnerId]
        );

        // Log status change
        await query(
            `INSERT INTO lead_status_history 
            (lead_id, old_status, new_status, reason, created_at)
            VALUES ($1, NULL, $2, $3, NOW())`,
            [leadId, isDuplicate ? 'DUPLICATE' : 'NEW', isDuplicate ? 'Duplicate customer detected' : 'Lead created from website form']
        );

        logger.info('Lead created successfully', { 
            leadId, 
            customerId, 
            isDuplicate,
            duplicateLeadId,
            score: leadScore 
        });

        // Send confirmation email to customer
        try {
            await sendLeadConfirmationEmail({
                name: first_name,
                email,
                leadId,
                isDuplicate
            });
        } catch (emailError) {
            logger.warn('Failed to send confirmation email', { error: emailError.message });
            // Continue despite email failure
        }

        // Send notification to sales team
        try {
            await sendLeadNotificationToTeam({
                leadId,
                customerName: `${first_name} ${surname}`,
                email,
                phone,
                score: leadScore,
                priority,
                isDuplicate,
                duplicateLeadId
            });
        } catch (emailError) {
            logger.warn('Failed to send team notification', { error: emailError.message });
        }

        res.status(201).json({
            success: true,
            message: isDuplicate ? 'Lead already exists for this customer' : 'Lead created successfully',
            data: {
                leadId,
                customerId,
                isDuplicate,
                duplicateLeadId,
                score: leadScore,
                priority,
                status: isDuplicate ? 'DUPLICATE' : 'NEW'
            }
        });

    } catch (error) {
        logger.error('Failed to create lead', { error: error.message });
        next(new ApiError(500, 'Failed to create lead', { error: error.message }));
    }
};

// ===== GET ALL LEADS (WITH FILTERS) =====
export const getAllLeads = async (req, res, next) => {
    try {
        const {
            status,
            priority,
            owner_id,
            search,
            page = 1,
            limit = 20,
            sort_by = 'created_at',
            sort_order = 'DESC'
        } = req.query;

        let whereClause = [];
        let params = [];

        if (status) {
            whereClause.push(`leads.status = $${whereClause.length + 1}`);
            params.push(status);
        }

        if (priority) {
            whereClause.push(`leads.priority = $${whereClause.length + 1}`);
            params.push(priority);
        }

        if (owner_id) {
            whereClause.push(`leads.owner_id = $${whereClause.length + 1}`);
            params.push(owner_id);
        }

        if (search) {
            whereClause.push(`(customers.first_name ILIKE $${whereClause.length + 1} OR customers.surname ILIKE $${whereClause.length + 1} OR customers.email ILIKE $${whereClause.length + 1})`);
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        const whereSQL = whereClause.length > 0 ? 'WHERE ' + whereClause.join(' AND ') : '';

        // Get total count
        const countResult = await query(
            `SELECT COUNT(*) as total FROM leads 
             LEFT JOIN customers ON leads.customer_id = customers.id 
             ${whereSQL}`,
            params
        );

        const total = parseInt(countResult.rows[0].total);
        const offset = (page - 1) * limit;

        // Get leads with pagination
        const result = await query(
            `SELECT 
                leads.id, leads.customer_id, leads.status, leads.priority, leads.score,
                leads.lead_source, leads.created_at, leads.last_activity_at,
                customers.first_name, customers.surname, customers.email, customers.phone,
                vehicles.stock_reference, vehicles.make, vehicles.model
             FROM leads
             LEFT JOIN customers ON leads.customer_id = customers.id
             LEFT JOIN vehicles ON leads.vehicle_id = vehicles.id
             ${whereSQL}
             ORDER BY ${sort_by} ${sort_order}
             LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
            [...params, limit, offset]
        );

        res.json({
            success: true,
            data: result.rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        logger.error('Failed to get leads', { error: error.message });
        next(new ApiError(500, 'Failed to retrieve leads'));
    }
};

// ===== GET LEAD BY ID =====
export const getLeadById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await query(
            `SELECT 
                leads.*, customers.*, vehicles.stock_reference, vehicles.make, vehicles.model
             FROM leads
             LEFT JOIN customers ON leads.customer_id = customers.id
             LEFT JOIN vehicles ON leads.vehicle_id = vehicles.id
             WHERE leads.id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            throw new ApiError(404, 'Lead not found');
        }

        res.json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }
        logger.error('Failed to get lead', { error: error.message });
        next(new ApiError(500, 'Failed to retrieve lead'));
    }
};

// ===== UPDATE LEAD =====
export const updateLead = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Validate lead exists
        const leadResult = await query('SELECT * FROM leads WHERE id = $1', [id]);
        if (leadResult.rows.length === 0) {
            throw new ApiError(404, 'Lead not found');
        }

        const oldLead = leadResult.rows[0];

        // Build update query
        const allowedFields = ['priority', 'score', 'notes'];
        const updateFields = [];
        const updateValues = [];

        Object.keys(updates).forEach(key => {
            if (allowedFields.includes(key)) {
                updateFields.push(`${key} = $${updateValues.length + 1}`);
                updateValues.push(updates[key]);
            }
        });

        if (updateFields.length === 0) {
            throw new ApiError(400, 'No valid fields to update');
        }

        updateValues.push(id);

        await query(
            `UPDATE leads SET ${updateFields.join(', ')}, updated_at = NOW() WHERE id = $${updateValues.length}`,
            updateValues
        );

        logger.info('Lead updated', { leadId: id, updates });

        res.json({
            success: true,
            message: 'Lead updated successfully'
        });

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }
        logger.error('Failed to update lead', { error: error.message });
        next(new ApiError(500, 'Failed to update lead'));
    }
};

// ===== CHANGE LEAD STATUS =====
export const changeLeadStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { new_status, reason } = req.body;

        const validStatuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'FINANCE_ENQUIRY', 'APPLICATION', 'APPROVED', 'VEHICLE_SECURED', 'SALE_CLOSED', 'LOST', 'NURTURE'];

        if (!validStatuses.includes(new_status)) {
            throw new ApiError(400, `Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        }

        // Get current lead
        const leadResult = await query('SELECT status FROM leads WHERE id = $1', [id]);
        if (leadResult.rows.length === 0) {
            throw new ApiError(404, 'Lead not found');
        }

        const oldStatus = leadResult.rows[0].status;

        // Update status
        await query(
            'UPDATE leads SET status = $1, updated_at = NOW() WHERE id = $2',
            [new_status, id]
        );

        // Log status change
        await query(
            `INSERT INTO lead_status_history 
            (lead_id, old_status, new_status, reason, changed_by, created_at)
            VALUES ($1, $2, $3, $4, $5, NOW())`,
            [id, oldStatus, new_status, reason || null, req.user?.id || null]
        );

        logger.info('Lead status changed', { leadId: id, oldStatus, newStatus: new_status });

        res.json({
            success: true,
            message: 'Lead status updated successfully',
            data: { old_status: oldStatus, new_status }
        });

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }
        logger.error('Failed to change lead status', { error: error.message });
        next(new ApiError(500, 'Failed to update status'));
    }
};

// ===== CHECK FOR DUPLICATES =====
export const checkDuplicates = async (req, res, next) => {
    try {
        const { email, phone } = req.body;

        if (!email && !phone) {
            throw new ApiError(400, 'Email or phone required for duplicate check');
        }

        let whereClause = [];
        let params = [];

        if (email) {
            whereClause.push('email = LOWER($' + (params.length + 1) + ')');
            params.push(email);
        }

        if (phone) {
            if (whereClause.length > 0) {
                whereClause.push('OR phone = $' + (params.length + 1));
            } else {
                whereClause.push('phone = $' + (params.length + 1));
            }
            params.push(phone);
        }

        const result = await query(
            `SELECT customers.id, customers.first_name, customers.surname, leads.id as lead_id, leads.status
             FROM customers
             LEFT JOIN leads ON customers.id = leads.customer_id
             WHERE ${whereClause.join(' ')}`,
            params
        );

        if (result.rows.length > 0) {
            res.json({
                success: true,
                isDuplicate: true,
                data: result.rows
            });
        } else {
            res.json({
                success: true,
                isDuplicate: false,
                data: []
            });
        }

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }
        logger.error('Failed to check duplicates', { error: error.message });
        next(new ApiError(500, 'Failed to check for duplicates'));
    }
};

// ===== ASSIGN LEAD TO SALESPERSON =====
export const assignLead = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { sales_team_id } = req.body;

        if (!sales_team_id) {
            throw new ApiError(400, 'sales_team_id required');
        }

        // Verify sales team exists
        const teamResult = await query('SELECT id FROM sales_team WHERE id = $1', [sales_team_id]);
        if (teamResult.rows.length === 0) {
            throw new ApiError(404, 'Sales team member not found');
        }

        await query(
            'UPDATE leads SET owner_id = $1, assigned_at = NOW(), updated_at = NOW() WHERE id = $2',
            [sales_team_id, id]
        );

        logger.info('Lead assigned', { leadId: id, ownerID: sales_team_id });

        res.json({
            success: true,
            message: 'Lead assigned successfully'
        });

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }
        logger.error('Failed to assign lead', { error: error.message });
        next(new ApiError(500, 'Failed to assign lead'));
    }
};

// ===== ADD LEAD NOTE =====
export const addLeadNote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content, note_type = 'GENERAL', is_internal_only = false } = req.body;

        if (!content || content.trim().length === 0) {
            throw new ApiError(400, 'Note content required');
        }

        const noteId = uuidv4();

        await query(
            `INSERT INTO lead_notes 
            (id, lead_id, content, note_type, is_internal_only, created_by, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
            [noteId, id, content, note_type, is_internal_only, req.user?.id || null]
        );

        logger.info('Note added to lead', { leadId: id, noteId });

        res.status(201).json({
            success: true,
            message: 'Note added successfully',
            data: { noteId }
        });

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }
        logger.error('Failed to add note', { error: error.message });
        next(new ApiError(500, 'Failed to add note'));
    }
};

// ===== GET LEAD NOTES =====
export const getLeadNotes = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { limit = 50 } = req.query;

        const result = await query(
            `SELECT * FROM lead_notes 
             WHERE lead_id = $1 
             ORDER BY created_at DESC 
             LIMIT $2`,
            [id, limit]
        );

        res.json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        logger.error('Failed to get notes', { error: error.message });
        next(new ApiError(500, 'Failed to retrieve notes'));
    }
};

// ===== GET LEAD HISTORY =====
export const getLeadHistory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await query(
            `SELECT * FROM lead_status_history 
             WHERE lead_id = $1 
             ORDER BY created_at DESC`,
            [id]
        );

        res.json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        logger.error('Failed to get history', { error: error.message });
        next(new ApiError(500, 'Failed to retrieve history'));
    }
};

// ===== MARK AS DUPLICATE =====
export const markDuplicate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { duplicate_of, reason } = req.body;

        if (!duplicate_of) {
            throw new ApiError(400, 'duplicate_of required');
        }

        await query(
            'UPDATE leads SET is_duplicate_of = $1, duplicate_reason = $2, status = $3 WHERE id = $4',
            [duplicate_of, reason || null, 'DUPLICATE', id]
        );

        logger.info('Lead marked as duplicate', { leadId: id, duplicateOf: duplicate_of });

        res.json({
            success: true,
            message: 'Lead marked as duplicate successfully'
        });

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }
        logger.error('Failed to mark duplicate', { error: error.message });
        next(new ApiError(500, 'Failed to mark as duplicate'));
    }
};

// ===== HELPER FUNCTIONS =====

function calculateLeadScore(factors) {
    let score = 0;
    if (factors.complete_contact) score += 40;
    if (factors.vehicle_id) score += 30;
    if (factors.high_income) score += 20;
    if (factors.finance_source) score += 10;
    return Math.min(score, 100);
}

function getPriorityFromScore(score) {
    if (score >= 80) return 'HOT';
    if (score >= 50) return 'WARM';
    return 'NURTURE';
}
