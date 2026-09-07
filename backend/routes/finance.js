// Finance Routes
import express from 'express';
import { body } from 'express-validator';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// POST: Create finance application
router.post('/applications', authenticate, authorize(['admin', 'sales_manager', 'salesperson', 'finance']), [
    body('lead_id').isUUID(),
    body('vehicle_id').optional().isUUID(),
    body('requested_amount').isFloat({ min: 0 })
], async (req, res) => {
    res.json({ success: true, message: 'Create finance application endpoint (to be implemented)' });
});

// GET: Get finance application
router.get('/applications/:id', authenticate, async (req, res) => {
    res.json({ success: true, message: 'Get finance application endpoint (to be implemented)' });
});

// PATCH: Update finance application
router.patch('/applications/:id', authenticate, authorize(['admin', 'finance']), async (req, res) => {
    res.json({ success: true, message: 'Update finance application endpoint (to be implemented)' });
});

// POST: Set finance decision
router.post('/applications/:id/decision', authenticate, authorize(['admin', 'finance']), [
    body('decision').isIn(['APPROVED', 'CONDITIONAL', 'DECLINED']),
    body('decision_notes').optional()
], async (req, res) => {
    res.json({ success: true, message: 'Set finance decision endpoint (to be implemented)' });
});

export default router;
