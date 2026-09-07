// Sales Activities Routes
import express from 'express';
import { body } from 'express-validator';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// POST: Create activity
router.post('/', authenticate, authorize(['admin', 'sales_manager', 'salesperson']), [
    body('lead_id').isUUID(),
    body('activity_type').isIn(['CALL', 'EMAIL', 'SMS', 'WHATSAPP', 'MEETING', 'TEST_DRIVE', 'QUOTE', 'APPLICATION', 'FOLLOW_UP', 'NOTE']),
    body('title').notEmpty()
], async (req, res) => {
    res.json({ success: true, message: 'Create activity endpoint (to be implemented)' });
});

// GET: Get activities for a lead
router.get('/lead/:leadId', authenticate, async (req, res) => {
    res.json({ success: true, message: 'Get activities endpoint (to be implemented)' });
});

// PATCH: Update activity
router.patch('/:id', authenticate, async (req, res) => {
    res.json({ success: true, message: 'Update activity endpoint (to be implemented)' });
});

export default router;
