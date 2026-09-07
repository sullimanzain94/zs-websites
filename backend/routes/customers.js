// Customers Routes
import express from 'express';
import { body } from 'express-validator';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// GET: Retrieve all customers
router.get('/', authenticate, authorize(['admin', 'sales_manager', 'salesperson']), async (req, res) => {
    res.json({ success: true, message: 'Customers list endpoint (to be implemented)' });
});

// POST: Create customer
router.post('/', [
    body('first_name').notEmpty(),
    body('surname').notEmpty(),
    body('email').isEmail(),
    body('phone').notEmpty()
], authenticate, async (req, res) => {
    res.json({ success: true, message: 'Create customer endpoint (to be implemented)' });
});

// GET: Get customer by ID
router.get('/:id', authenticate, async (req, res) => {
    res.json({ success: true, message: 'Get customer endpoint (to be implemented)' });
});

// PATCH: Update customer
router.patch('/:id', authenticate, async (req, res) => {
    res.json({ success: true, message: 'Update customer endpoint (to be implemented)' });
});

export default router;
