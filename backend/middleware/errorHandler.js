// Error Handling Middleware
import { logger } from '../utils/logger.js';

export class ApiError extends Error {
    constructor(statusCode, message, details = {}) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}

export const notFound = (req, res) => {
    const error = new ApiError(404, `Route not found: ${req.originalUrl}`);
    res.status(404).json({
        success: false,
        message: error.message,
        statusCode: 404
    });
};

export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Log the error
    logger.error(`API Error: ${message}`, {
        statusCode,
        path: req.path,
        method: req.method,
        details: err.details || {},
        stack: err.stack
    });

    // Database errors
    if (err.code === '23505') {
        statusCode = 409;
        message = 'Duplicate entry detected';
    }

    if (err.code === '23503') {
        statusCode = 400;
        message = 'Invalid reference: Related record not found';
    }

    if (err.code === '42P01') {
        statusCode = 500;
        message = 'Database table error';
    }

    // Validation errors
    if (err.array && typeof err.array === 'function') {
        statusCode = 400;
        message = 'Validation failed';
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        ...(process.env.NODE_ENV === 'development' && { details: err.details || {}, stack: err.stack })
    });
};

export default {
    ApiError,
    notFound,
    errorHandler
};
