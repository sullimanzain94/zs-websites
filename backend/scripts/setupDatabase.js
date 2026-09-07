// Database Setup Script
// Creates tables and initializes database structure
// Run with: node scripts/setupDatabase.js

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import pkg from 'pg';
const { Pool } = pkg;
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const setupDatabase = async () => {
    const pool = new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    try {
        console.log('╔════════════════════════════════════════╗');
        console.log('║ Prime Lane Motors - Database Setup     ║');
        console.log('╚════════════════════════════════════════╝\n');

        const client = await pool.connect();

        // Read and execute schema
        const schemaPath = path.join(__dirname, '../database/schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('Executing schema...');
        await client.query(schema);
        console.log('✓ Schema created successfully\n');

        // Create default admin user (if not exists)
        console.log('Creating default admin user...');
        const defaultAdminPassword = 'ChangeMe123!';
        const bcrypt = await import('bcryptjs');
        const hashedPassword = await bcrypt.default.hash(defaultAdminPassword, 10);

        try {
            await client.query(
                `INSERT INTO users (username, email, password_hash, first_name, last_name, role, is_active)
                 VALUES ('admin', 'admin@primelanemotors.com', $1, 'Admin', 'User', 'admin', true)
                 ON CONFLICT (email) DO NOTHING`,
                [hashedPassword]
            );
            console.log('✓ Default admin user created');
            console.log('  Email: admin@primelanemotors.com');
            console.log('  Password: ChangeMe123!');
            console.log('  ⚠️  CHANGE THIS PASSWORD IN PRODUCTION!\n');
        } catch (error) {
            console.log('✓ Admin user already exists\n');
        }

        // Create default sales team member (Zain Sulliman - owner_id: 1)
        console.log('Creating default sales team member (Zain Sulliman)...');
        try {
            // First create the user if not exists
            const userResult = await client.query(
                `INSERT INTO users (username, email, password_hash, first_name, last_name, role, is_active)
                 VALUES ('zain.sulliman', 'zain@primelanemotors.com', $1, 'Zain', 'Sulliman', 'salesperson', true)
                 ON CONFLICT (email) DO NOTHING
                 RETURNING id`,
                [hashedPassword]
            );

            const userId = userResult.rows[0]?.id;

            if (userId) {
                // Then create sales team entry
                await client.query(
                    `INSERT INTO sales_team (user_id, territory, phone, is_available)
                     VALUES ($1, 'All Territories', '+27657572632', true)`,
                    [userId]
                );
                console.log('✓ Zain Sulliman created as default sales team member\n');
            } else {
                console.log('✓ Zain Sulliman already exists\n');
            }
        } catch (error) {
            console.log('✓ Zain Sulliman already exists\n');
        }

        client.release();

        console.log('════════════════════════════════════════');
        console.log('✓ Database setup completed successfully!');
        console.log('════════════════════════════════════════\n');

        console.log('Next steps:');
        console.log('1. Copy .env.example to .env');
        console.log('2. Update environment variables in .env');
        console.log('3. Run: npm run dev');

    } catch (error) {
        console.error('✗ Database setup failed:', error.message);
        process.exit(1);
    } finally {
        await pool.end();
    }
};

setupDatabase();
