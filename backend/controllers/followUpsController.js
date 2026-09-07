// Follow-ups Controller
import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';
import { logger } from '../utils/logger.js';
import { ApiError } from '../middleware/errorHandler.js';
import { sendFollowUpReminderEmail } from '../services/emailService.js';

// CREATE FOLLOW-UP
export const createFollowUp = async (req, res, next) => {
    try {
        const {
            lead_id,
            follow_up_type,
            title,
            description,
            due_date,
            assigned_to
        } = req.body;

        if (!lead_id || !follow_up_type || !title || !due_date) {
            throw new ApiError(400, 'Missing required fields: lead_id, follow_up_type, title, due_date');
        }

        // Verify lead exists
        const leadResult = await query(
            'SELECT * FROM leads WHERE id = $1',
            [lead_id]
        );

        if (leadResult.rows.length === 0) {
            throw new ApiError(404, 'Lead not found');
        }

        const lead = leadResult.rows[0];

        const followUpId = uuidv4();

        // Create follow-up
        await query(
            `INSERT INTO follow_ups 
            (id, lead_id, follow_up_type, title, description, due_date, assigned_to, created_by, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
            [followUpId, lead_id, follow_up_type, title, description || null, due_date, assigned_to || lead.owner_id, req.user?.id || null]
        );

        // Create corresponding sales activity
        await query(
            `INSERT INTO sales_activities 
            (lead_id, activity_type, title, description, outcome, created_by, scheduled_for, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
            [lead_id, 'FOLLOW_UP', `Follow-up: ${title}`, description, 'PENDING', req.user?.id || null, due_date]
        );

        logger.info('Follow-up created', { followUpId, leadId: lead_id, type: follow_up_type });

        // Send reminder email to assigned salesperson
        try {
            const userResult = await query(
                `SELECT users.email, users.first_name, customers.first_name as customer_first_name
                 FROM users 
                 LEFT JOIN sales_team ON users.id = sales_team.user_id
                 LEFT JOIN leads ON sales_team.id = leads.owner_id
                 LEFT JOIN customers ON leads.customer_id = customers.id
                 WHERE sales_team.id = $1`,
                [assigned_to || lead.owner_id]
            );

            if (userResult.rows.length > 0) {
                const user = userResult.rows[0];
                await sendFollowUpReminderEmail({
                    salespersonEmail: user.email,
                    salespersonName: user.first_name,
                    leadId: lead_id,
                    customerName: user.customer_first_name,
                    followUpType: follow_up_type,
                    dueDate: due_date
                });
            }
        } catch (emailError) {
            logger.warn('Failed to send follow-up reminder email', { error: emailError.message });
        }

        res.status(201).json({
            success: true,
            message: 'Follow-up created successfully',
            data: { followUpId }
        });

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }
        logger.error('Failed to create follow-up', { error: error.message });
        next(new ApiError(500, 'Failed to create follow-up'));
    }
};

// GET FOLLOW-UPS FOR LEAD
export const getFollowUpsForLead = async (req, res, next) => {
    try {
        const { leadId } = req.params;
        const { status = 'PENDING' } = req.query;

        let whereClause = 'WHERE lead_id = $1';
        let params = [leadId];

        if (status) {
            whereClause += ` AND status = $2`;
            params.push(status);
        }

        const result = await query(
            `SELECT * FROM follow_ups 
             ${whereClause}
             ORDER BY due_date ASC`,
            params
        );

        res.json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        logger.error('Failed to get follow-ups', { error: error.message });
        next(new ApiError(500, 'Failed to retrieve follow-ups'));
    }
};

// UPDATE FOLLOW-UP
export const updateFollowUp = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, due_date, status, notes } = req.body;

        const updateFields = [];
        const params = [];

        if (title) {
            updateFields.push(`title = $${params.length + 1}`);
            params.push(title);
        }

        if (description) {
            updateFields.push(`description = $${params.length + 1}`);
            params.push(description);
        }

        if (due_date) {
            updateFields.push(`due_date = $${params.length + 1}`);
            params.push(due_date);
        }

        if (status) {
            updateFields.push(`status = $${params.length + 1}`);
            params.push(status);
        }

        if (notes) {
            updateFields.push(`notes = $${params.length + 1}`);
            params.push(notes);
        }

        if (updateFields.length === 0) {
            throw new ApiError(400, 'No fields to update');
        }

        updateFields.push(`updated_at = NOW()`);
        params.push(id);

        await query(
            `UPDATE follow_ups SET ${updateFields.join(', ')} WHERE id = $${params.length}`,
            params
        );

        logger.info('Follow-up updated', { followUpId: id });

        res.json({
            success: true,
            message: 'Follow-up updated successfully'
        });

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }
        logger.error('Failed to update follow-up', { error: error.message });
        next(new ApiError(500, 'Failed to update follow-up'));
    }
};

// MARK FOLLOW-UP COMPLETED
export const completeFollowUp = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { outcome_notes } = req.body;

        await query(
            `UPDATE follow_ups 
             SET status = 'COMPLETED', completed_at = NOW(), notes = $1, updated_at = NOW() 
             WHERE id = $2`,
            [outcome_notes || null, id]
        );

        logger.info('Follow-up completed', { followUpId: id });

        res.json({
            success: true,
            message: 'Follow-up marked as completed'
        });

    } catch (error) {
        logger.error('Failed to complete follow-up', { error: error.message });
        next(new ApiError(500, 'Failed to complete follow-up'));
    }
};

// GET PENDING FOLLOW-UPS
export const getPendingFollowUps = async (req, res, next) => {
    try {
        const { assigned_to, limit = 50 } = req.query;

        let whereClause = 'WHERE status = \'PENDING\' AND due_date <= NOW() + INTERVAL \'7 days\'';
        let params = [];

        if (assigned_to) {
            whereClause += ` AND assigned_to = $${params.length + 1}`;
            params.push(assigned_to);
        }

        const result = await query(
            `SELECT follow_ups.*, customers.first_name, customers.surname, customers.phone, customers.email
             FROM follow_ups
             LEFT JOIN leads ON follow_ups.lead_id = leads.id
             LEFT JOIN customers ON leads.customer_id = customers.id
             ${whereClause}
             ORDER BY follow_ups.due_date ASC
             LIMIT $${params.length + 1}`,
            [...params, limit]
        );

        res.json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        logger.error('Failed to get pending follow-ups', { error: error.message });
        next(new ApiError(500, 'Failed to retrieve pending follow-ups'));
    }
};

export default {
    createFollowUp,
    getFollowUpsForLead,
    updateFollowUp,
    completeFollowUp,
    getPendingFollowUps
};
