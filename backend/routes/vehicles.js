// Vehicles Routes
import express from 'express';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// GET: Retrieve all vehicles
router.get('/', async (req, res) => {
    res.json({ success: true, message: 'Vehicles list endpoint (to be implemented)' });
});

// GET: Get vehicle by ID
router.get('/:id', authenticate, async (req, res) => {
    res.json({ success: true, message: 'Get vehicle endpoint (to be implemented)' });
});

export default router;
