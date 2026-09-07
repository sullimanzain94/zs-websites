// Authentication Controller
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';
import { logger } from '../utils/logger.js';
import { ApiError } from '../middleware/errorHandler.js';

// POST: Register new user
export const register = async (req, res, next) => {
    try {
        const { username, email, password, first_name, last_name, role } = req.body;

        // Check if user exists
        const existing = await query(
            'SELECT id FROM users WHERE email = LOWER($1) OR username = $2',
            [email, username]
        );

        if (existing.rows.length > 0) {
            throw new ApiError(409, 'User already exists');
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);
        const userId = uuidv4();

        await query(
            `INSERT INTO users (id, username, email, password_hash, first_name, last_name, role)
             VALUES ($1, $2, LOWER($3), $4, $5, $6, $7)`,
            [userId, username, email, hashedPassword, first_name, last_name, role]
        );

        logger.info('New user registered', { userId, email, role });

        res.status(201).json({
            success: true,
            message: 'User registered successfully'
        });

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }
        logger.error('Registration failed', { error: error.message });
        next(new ApiError(500, 'Registration failed'));
    }
};

// POST: Login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user
        const result = await query(
            'SELECT id, username, email, password_hash, first_name, last_name, role, is_active FROM users WHERE email = LOWER($1)',
            [email]
        );

        if (result.rows.length === 0) {
            throw new ApiError(401, 'Invalid credentials');
        }

        const user = result.rows[0];

        if (!user.is_active) {
            throw new ApiError(403, 'Account is inactive');
        }

        // Check password
        const passwordMatch = await bcryptjs.compare(password, user.password_hash);
        if (!passwordMatch) {
            throw new ApiError(401, 'Invalid credentials');
        }

        // Update last login
        await query(
            'UPDATE users SET last_login = NOW() WHERE id = $1',
            [user.id]
        );

        // Generate tokens
        const accessToken = jwt.sign(
            {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY || '7d' }
        );

        const refreshToken = jwt.sign(
            { id: user.id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '30d' }
        );

        logger.info('User logged in', { userId: user.id, email });

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    role: user.role
                },
                tokens: {
                    accessToken,
                    refreshToken
                }
            }
        });

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }
        logger.error('Login failed', { error: error.message });
        next(new ApiError(500, 'Login failed'));
    }
};

// POST: Refresh token
export const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            throw new ApiError(400, 'Refresh token required');
        }

        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        } catch (error) {
            throw new ApiError(401, 'Invalid refresh token');
        }

        // Get user
        const result = await query(
            'SELECT id, email, username, role FROM users WHERE id = $1 AND is_active = true',
            [decoded.id]
        );

        if (result.rows.length === 0) {
            throw new ApiError(401, 'User not found');
        }

        const user = result.rows[0];

        // Generate new access token
        const newAccessToken = jwt.sign(
            {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY || '7d' }
        );

        res.json({
            success: true,
            data: {
                accessToken: newAccessToken
            }
        });

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }
        logger.error('Token refresh failed', { error: error.message });
        next(new ApiError(500, 'Token refresh failed'));
    }
};

// POST: Logout
export const logout = async (req, res) => {
    logger.info('User logged out', { userId: req.user.id });
    res.json({
        success: true,
        message: 'Logout successful'
    });
};

// GET: Current user
export const getCurrentUser = async (req, res, next) => {
    try {
        const result = await query(
            'SELECT id, username, email, first_name, last_name, role FROM users WHERE id = $1',
            [req.user.id]
        );

        if (result.rows.length === 0) {
            throw new ApiError(404, 'User not found');
        }

        res.json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }
        logger.error('Failed to get current user', { error: error.message });
        next(new ApiError(500, 'Failed to retrieve user'));
    }
};

export default {
    register,
    login,
    refreshToken,
    logout,
    getCurrentUser
};
