import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate, authorize } from '../middleware/auth.js';
import * as financeController from '../controllers/financeController.js';

const router = express.Router();

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    next();
};

// Create finance application
router.post(
    '/applications',
    authenticate,
    authorize(['admin', 'sales_manager', 'salesperson', 'finance']),
    [
        body('lead_id').isUUID().withMessage('Valid lead ID required'),
        body('vehicle_id').optional({ values: 'falsy' }).isUUID()
            .withMessage('Valid vehicle ID required'),
        body('requested_amount').isFloat({ min: 0 })
            .withMessage('Requested amount must be numeric'),
        body('finance_provider').optional().isString(),
        body('loan_term_months').optional().isInt({ min: 1 })
            .withMessage('Loan term must be a positive integer')
    ],
    validate,
    financeController.createFinanceApplication
);

// Get finance application
router.get(
    '/applications/:id',
    authenticate,
    financeController.getFinanceApplication
);

// Update finance application
router.patch(
    '/applications/:id',
    authenticate,
    authorize(['admin', 'finance']),
    financeController.updateFinanceApplication
);

// Set finance decision
router.post(
    '/applications/:id/decision',
    authenticate,
    authorize(['admin', 'finance']),
    [
        body('decision')
            .isIn(['APPROVED', 'CONDITIONAL', 'DECLINED'])
            .withMessage('Invalid finance decision'),
        body('decision_notes').optional().isString(),
        body('approved_amount').optional().isFloat({ min: 0 }),
        body('interest_rate').optional().isFloat({ min: 0 }),
        body('loan_term_months').optional().isInt({ min: 1 }),
        body('monthly_installment').optional().isFloat({ min: 0 })
    ],
    validate,
    financeController.setFinanceDecision
);

export default router;
