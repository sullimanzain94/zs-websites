// Lead Management Routes
import express from 'express';
import { body, validationResult, query } from 'express-validator';
import { authenticate, authorize } from '../middleware/auth.js';
import { ApiError } from '../middleware/errorHandler.js';
import * as leadsController from '../controllers/leadsController.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Validation middleware
const validateLeadInput = [
    body('first_name').trim().notEmpty().withMessage('First name required'),
    body('surname').trim().notEmpty().withMessage('Surname required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('phone').trim().notEmpty().withMessage('Phone number required'),
    body('employment_status').optional().isIn(['Employed Full-Time', 'Self Employed', 'Contract Worker', 'Retired']),
    body('monthly_income').optional().isIn(['Under R10k', 'R10-20k', 'R20-30k', 'R30k+']),
    body('vehicle_id').optional().isUUID(),
    body('deposit_available').optional().isBoolean().toBoolean(),
    body('finance_intent').optional().isBoolean().toBoolean(),
    body('lead_source').optional().isIn(['Website', 'Facebook', 'Instagram', 'WhatsApp', 'Google', 'Referral', 'Other']),
];

// POST: Create new lead from website form
// This is the PRIMARY endpoint for frontend form submissions
router.post('/', validateLeadInput, leadsController.createLead);

// GET: Retrieve all leads (with filters)
router.get('/', authenticate, authorize(['admin', 'sales_manager', 'salesperson']), leadsController.getAllLeads);

// GET: Retrieve single lead by ID
router.get('/:id', authenticate, leadsController.getLeadById);

// PATCH: Update lead
router.patch('/:id', authenticate, authorize(['admin', 'sales_manager', 'salesperson']), leadsController.updateLead);

// POST: Change lead status
router.post('/:id/status', authenticate, authorize(['admin', 'sales_manager', 'salesperson']), leadsController.changeLeadStatus);

// POST: Check for duplicates
router.post('/check/duplicates', validateLeadInput, leadsController.checkDuplicates);

// POST: Assign lead to salesperson
router.post('/:id/assign', authenticate, authorize(['admin', 'sales_manager']), leadsController.assignLead);

// POST: Add lead note
router.post('/:id/notes', authenticate, leadsController.addLeadNote);

// GET: Get lead notes
router.get('/:id/notes', authenticate, leadsController.getLeadNotes);

// GET: Get lead activity history
router.get('/:id/history', authenticate, leadsController.getLeadHistory);

// POST: Mark lead as duplicate
router.post('/:id/mark-duplicate', authenticate, authorize(['admin']), leadsController.markDuplicate);

// Handle validation errors
router.use((err, req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn('Validation error', { errors: errors.array() });
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next(err);
});

export default router;
