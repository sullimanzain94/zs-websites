// Database Connection Module
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { logger } from '../utils/logger.js';

dotenv.config();

let pool = null;

export const connectDB = async () => {
    try {
        pool = new Pool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            max: parseInt(process.env.DB_POOL_MAX || 10),
            min: parseInt(process.env.DB_POOL_MIN || 2),
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });

        // Test connection
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        client.release();

        logger.info('Database connection successful', {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME
        });

        return pool;
    } catch (error) {
        logger.error('Database connection failed', error);
        throw error;
    }
};

export const getPool = () => {
    if (!pool) {
        throw new Error('Database pool not initialized. Call connectDB() first.');
    }
    return pool;
};

export const query = async (text, params) => {
    const start = Date.now();
    try {
        const result = await pool.query(text, params);
        const duration = Date.now() - start;
        
        if (duration > 1000) {
            logger.warn(`Slow query detected (${duration}ms)`, { text: text.substring(0, 100) });
        }
        
        return result;
    } catch (error) {
        logger.error('Query execution failed', { error, query: text });
        throw error;
    }
};

export const transaction = async (callback) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await callback(client);
        await client.query('COMMIT');
        return result;
    } catch (error) {
        await client.query('ROLLBACK');
        logger.error('Transaction failed', error);
        throw error;
    } finally {
        client.release();
    }
};

export default {
    connectDB,
    getPool,
    query,
    transaction
};
