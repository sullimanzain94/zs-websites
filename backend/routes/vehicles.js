// Vehicles Routes
import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { query } from '../config/database.js';

const router = express.Router();

// GET: Retrieve all available vehicles
router.get('/', async (req, res, next) => {
    try {
        const result = await query(`
            SELECT
                id,
                created_at,
                make,
                model,
                year,
                variant,
                mileage,
                price_zar,
                est_monthly_zar,
                color,
                transmission,
                fuel_type,
                status,
                image_urls,
                description
            FROM vehicles
            WHERE status = 'Available'
            ORDER BY year DESC, make ASC, model ASC
        `);

        res.json({
            success: true,
            count: result.rows.length,
            vehicles: result.rows
        });
    } catch (error) {
        next(error);
    }
});

// GET: Get vehicle by ID
router.get('/:id', authenticate, async (req, res, next) => {
    try {
        const result = await query(`
            SELECT
                id,
                created_at,
                make,
                model,
                year,
                variant,
                mileage,
                price_zar,
                est_monthly_zar,
                color,
                transmission,
                fuel_type,
                status,
                image_urls,
                description
            FROM vehicles
            WHERE id = $1
        `, [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        res.json({
            success: true,
            vehicle: result.rows[0]
        });
    } catch (error) {
        next(error);
    }
});

export default router;
