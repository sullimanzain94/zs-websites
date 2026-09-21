// Authentication Routes
import express from 'express';
import { body, validationResult } from 'express-validator';
import * as authController from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// POST: Register new user (admin only)
router.post('/register', [
    body('username').trim().notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('role').isIn(['admin', 'sales_manager', 'salesperson', 'finance', 'viewer'])
], authController.register);

// POST: Login
router.post('/login', [
    body('email').isEmail(),
    body('password').notEmpty()
], authController.login);

// POST: Refresh token
router.post('/refresh', authController.refreshToken);

// POST: Logout
router.post('/logout', authenticate, authController.logout);

// GET: Current user
router.get('/me', authenticate, authController.getCurrentUser);

export default router;
