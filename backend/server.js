// Prime Lane Motors Backend - Express Server
// Phase 2: Production Backend Implementation

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables
dotenv.config();

// Import modules (will be created next)
import { connectDB } from './config/database.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { logger } from './utils/logger.js';

// Routes (to be implemented)
import authRoutes from './routes/auth.js';
import leadsRoutes from './routes/leads.js';
import customersRoutes from './routes/customers.js';
import vehiclesRoutes from './routes/vehicles.js';
import salesTeamRoutes from './routes/salesTeam.js';
import followUpsRoutes from './routes/followUps.js';
import activitiesRoutes from './routes/activities.js';
import financeRoutes from './routes/finance.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ===== SECURITY MIDDLEWARE =====
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true,
    optionsSuccessStatus: 200
}));

// ===== BODY PARSING MIDDLEWARE =====
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ===== LOGGING MIDDLEWARE =====
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`, {
        ip: req.ip,
        userAgent: req.get('user-agent')
    });
    next();
});

// ===== HEALTH CHECK =====
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        environment: NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

// ===== API ROUTES =====
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/sales-team', salesTeamRoutes);
app.use('/api/follow-ups', followUpsRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/finance', financeRoutes);

// ===== ERROR HANDLING =====
app.use(notFound);
app.use(errorHandler);

// ===== DATABASE CONNECTION =====
let dbConnected = false;

const startServer = async () => {
    try {
        // Connect to database
        await connectDB();
        dbConnected = true;
        logger.info('Database connected successfully');

        // Start Express server
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT} in ${NODE_ENV} mode`);
            console.log(`
╔══════════════════════════════════════════════════════════════╗
║  Prime Lane Motors Backend - Phase 2                        ║
║  ✓ Database: Connected                                      ║
║  ✓ Server: Running                                          ║
║  ✓ Environment: ${NODE_ENV}                                       ║
║  ✓ Port: ${PORT}                                               ║
║  ✓ API Documentation: /api/docs                             ║
╚══════════════════════════════════════════════════════════════╝
            `);
        });
    } catch (error) {
        logger.error('Failed to start server', error);
        process.exit(1);
    }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down gracefully');
    process.exit(0);
});

// Start the server
startServer();

export default app;
