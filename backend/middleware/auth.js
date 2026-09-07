// Authentication Middleware
import jwt from 'jsonwebtoken';
import { ApiError } from './errorHandler.js';
import { logger } from '../utils/logger.js';

export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ApiError(401, 'No token provided');
        }

        const token = authHeader.substring(7);
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new ApiError(401, 'Token expired');
            }
            throw new ApiError(401, 'Invalid token');
        }
    } catch (error) {
        logger.warn('Authentication failed', { error: error.message });
        res.status(error.statusCode || 401).json({
            success: false,
            message: error.message
        });
    }
};

export const authorize = (allowedRoles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
            logger.warn('Authorization failed', {
                user: req.user.id,
                role: req.user.role,
                requiredRoles: allowedRoles
            });

            return res.status(403).json({
                success: false,
                message: 'Insufficient permissions'
            });
        }

        next();
    };
};

export const optionalAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        }
        
        next();
    } catch (error) {
        // Continue without user context
        next();
    }
};

export default {
    authenticate,
    authorize,
    optionalAuth
};
