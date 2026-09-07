// Follow-ups Routes
import express from 'express';
import { body } from 'express-validator';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// POST: Create follow-up
router.post('/', authenticate, authorize(['admin', 'sales_manager', 'salesperson']), [
    body('lead_id').isUUID(),
    body('follow_up_type').isIn(['CALL', 'EMAIL', 'SMS', 'WHATSAPP', 'MEETING']),
    body('due_date').isISO8601(),
    body('title').notEmpty()
], async (req, res) => {
    res.json({ success: true, message: 'Create follow-up endpoint (to be implemented)' });
});

// GET: Get follow-ups for a lead
router.get('/lead/:leadId', authenticate, async (req, res) => {
    res.json({ success: true, message: 'Get follow-ups endpoint (to be implemented)' });
});

// PATCH: Update follow-up
router.patch('/:id', authenticate, async (req, res) => {
    res.json({ success: true, message: 'Update follow-up endpoint (to be implemented)' });
});

// POST: Mark follow-up completed
router.post('/:id/complete', authenticate, async (req, res) => {
    res.json({ success: true, message: 'Complete follow-up endpoint (to be implemented)' });
});

export default router;
