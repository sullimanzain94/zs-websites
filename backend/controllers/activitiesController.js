// Sales Activities Controller
import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';
import { logger } from '../utils/logger.js';
import { ApiError } from '../middleware/errorHandler.js';

// CREATE ACTIVITY
export const createActivity = async (req, res, next) => {
    try {
        const {
            lead_id,
            activity_type,
            title,
            description,
            outcome,
            scheduled_for
        } = req.body;

        if (!lead_id || !activity_type || !title) {
            throw new ApiError(400, 'Missing required fields: lead_id, activity_type, title');
        }

        // Verify lead exists
        const leadResult = await query('SELECT id FROM leads WHERE id = $1', [lead_id]);
        if (leadResult.rows.length === 0) {
            throw new ApiError(404, 'Lead not found');
        }

        const activityId = uuidv4();

        await query(
            `INSERT INTO sales_activities 
            (id, lead_id, activity_type, title, description, outcome, created_by, scheduled_for, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
            [activityId, lead_id, activity_type, title, description || null, outcome || 'PENDING', 
             req.user?.id || null, scheduled_for || null]
        );

        // Update lead last_activity_at
        await query(
            'UPDATE leads SET last_activity_at = NOW() WHERE id = $1',
            [lead_id]
        );

        logger.info('Activity created', { activityId, leadId: lead_id, type: activity_type });

        res.status(201).json({
            success: true,
            message: 'Activity created successfully',
            data: { activityId }
        });

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }
        logger.error('Failed to create activity', { error: error.message });
        next(new ApiError(500, 'Failed to create activity'));
    }
};

// GET ACTIVITIES FOR LEAD
export const getActivitiesForLead = async (req, res, next) => {
    try {
        const { leadId } = req.params;
        const { limit = 100 } = req.query;

        const result = await query(
            `SELECT sales_activities.*, users.first_name, users.last_name
             FROM sales_activities
             LEFT JOIN users ON sales_activities.created_by = users.id
             WHERE lead_id = $1
             ORDER BY created_at DESC
             LIMIT $2`,
            [leadId, limit]
        );

        res.json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        logger.error('Failed to get activities', { error: error.message });
        next(new ApiError(500, 'Failed to retrieve activities'));
    }
};

// UPDATE ACTIVITY
export const updateActivity = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, outcome, completed_at } = req.body;

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

        if (outcome) {
            updateFields.push(`outcome = $${params.length + 1}`);
            params.push(outcome);
        }

        if (completed_at) {
            updateFields.push(`completed_at = $${params.length + 1}`);
            params.push(completed_at);
        }

        if (updateFields.length === 0) {
            throw new ApiError(400, 'No fields to update');
        }

        params.push(id);

        await query(
            `UPDATE sales_activities SET ${updateFields.join(', ')} WHERE id = $${params.length}`,
            params
        );

        logger.info('Activity updated', { activityId: id });

        res.json({
            success: true,
            message: 'Activity updated successfully'
        });

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }
        logger.error('Failed to update activity', { error: error.message });
        next(new ApiError(500, 'Failed to update activity'));
    }
};

// GET ACTIVITY SUMMARY (Dashboard)
export const getActivitySummary = async (req, res, next) => {
    try {
        const { time_period = '7' } = req.query; // days

        const result = await query(
            `SELECT 
                activity_type,
                COUNT(*) as total,
                COUNT(CASE WHEN outcome = 'COMPLETED' THEN 1 END) as completed,
                COUNT(CASE WHEN outcome = 'POSITIVE' THEN 1 END) as positive
             FROM sales_activities
             WHERE created_at >= NOW() - INTERVAL '${time_period} days'
             GROUP BY activity_type
             ORDER BY total DESC`,
            []
        );

        res.json({
            success: true,
            data: result.rows,
            period_days: parseInt(time_period)
        });

    } catch (error) {
        logger.error('Failed to get activity summary', { error: error.message });
        next(new ApiError(500, 'Failed to retrieve activity summary'));
    }
};

export default {
    createActivity,
    getActivitiesForLead,
    updateActivity,
    getActivitySummary
};
