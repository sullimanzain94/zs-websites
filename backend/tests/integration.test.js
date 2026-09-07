// Phase 2 Backend Testing Suite
// Run with: npm test

import request from 'supertest';
import app from '../server.js';
import { query } from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

describe('Prime Lane Motors Backend - Phase 2 Tests', () => {
    let accessToken = '';
    let testLeadId = '';
    let testCustomerId = '';
    let testUserId = '';

    // ===== SETUP & TEARDOWN =====

    beforeAll(async () => {
        // Login to get access token
        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'admin@primelanemotors.com',
                password: 'ChangeMe123!'
            });

        if (loginRes.body.data?.tokens?.accessToken) {
            accessToken = loginRes.body.data.tokens.accessToken;
        }
    });

    // ===== HEALTH & AUTHENTICATION TESTS =====

    describe('Health & Server', () => {
        test('GET /api/health should return OK', async () => {
            const res = await request(app).get('/api/health');
            expect(res.status).toBe(200);
            expect(res.body.status).toBe('OK');
        });
    });

    describe('Authentication', () => {
        test('POST /api/auth/login should return access token', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'admin@primelanemotors.com',
                    password: 'ChangeMe123!'
                });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.tokens.accessToken).toBeDefined();
        });

        test('POST /api/auth/login with wrong password should fail', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'admin@primelanemotors.com',
                    password: 'WrongPassword'
                });

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });

        test('GET /api/auth/me with token should return user', async () => {
            if (!accessToken) {
                console.warn('Skipping authenticated test - no token available');
                return;
            }

            const res = await request(app)
                .get('/api/auth/me')
                .set('Authorization', `Bearer ${accessToken}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.email).toBeDefined();
        });

        test('Endpoints without token should return 401', async () => {
            const res = await request(app).get('/api/leads');
            expect(res.status).toBe(401);
        });
    });

    // ===== LEAD MANAGEMENT TESTS =====

    describe('Lead Management', () => {
        test('POST /api/leads should create new lead', async () => {
            const res = await request(app)
                .post('/api/leads')
                .send({
                    first_name: 'Test',
                    surname: 'Customer',
                    email: `test${Date.now()}@example.com`,
                    phone: '+27821234567',
                    finance_intent: true,
                    lead_source: 'Website'
                });

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.leadId).toBeDefined();

            testLeadId = res.body.data.leadId;
        });

        test('POST /api/leads should validate required fields', async () => {
            const res = await request(app)
                .post('/api/leads')
                .send({
                    first_name: 'Test'
                    // Missing other required fields
                });

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });

        test('POST /api/leads/check/duplicates should detect duplicates', async () => {
            // Create first lead
            const email = `duplicate${Date.now()}@example.com`;
            await request(app)
                .post('/api/leads')
                .send({
                    first_name: 'First',
                    surname: 'Lead',
                    email,
                    phone: '+27821111111',
                    finance_intent: true
                });

            // Check for duplicate
            const res = await request(app)
                .post('/api/leads/check/duplicates')
                .send({
                    email
                });

            expect(res.status).toBe(200);
            expect(res.body.isDuplicate).toBe(true);
        });

        test('GET /api/leads with token should return leads list', async () => {
            if (!accessToken) {
                console.warn('Skipping authenticated test - no token available');
                return;
            }

            const res = await request(app)
                .get('/api/leads')
                .set('Authorization', `Bearer ${accessToken}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
        });

        test('GET /api/leads/:id with token should return single lead', async () => {
            if (!accessToken || !testLeadId) {
                console.warn('Skipping test - token or lead not available');
                return;
            }

            const res = await request(app)
                .get(`/api/leads/${testLeadId}`)
                .set('Authorization', `Bearer ${accessToken}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.id).toBe(testLeadId);
        });

        test('POST /api/leads/:id/status should change lead status', async () => {
            if (!accessToken || !testLeadId) {
                console.warn('Skipping test - token or lead not available');
                return;
            }

            const res = await request(app)
                .post(`/api/leads/${testLeadId}/status`)
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    new_status: 'CONTACTED',
                    reason: 'Test status change'
                });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
        });

        test('POST /api/leads/:id/notes should add note to lead', async () => {
            if (!accessToken || !testLeadId) {
                console.warn('Skipping test - token or lead not available');
                return;
            }

            const res = await request(app)
                .post(`/api/leads/${testLeadId}/notes`)
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    content: 'Test note content',
                    note_type: 'GENERAL'
                });

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
        });

        test('GET /api/leads/:id/notes should retrieve lead notes', async () => {
            if (!accessToken || !testLeadId) {
                console.warn('Skipping test - token or lead not available');
                return;
            }

            const res = await request(app)
                .get(`/api/leads/${testLeadId}/notes`)
                .set('Authorization', `Bearer ${accessToken}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
        });

        test('GET /api/leads/:id/history should retrieve status history', async () => {
            if (!accessToken || !testLeadId) {
                console.warn('Skipping test - token or lead not available');
                return;
            }

            const res = await request(app)
                .get(`/api/leads/${testLeadId}/history`)
                .set('Authorization', `Bearer ${accessToken}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    // ===== DATA PERSISTENCE TESTS =====

    describe('Database Persistence', () => {
        test('Created lead should persist in database', async () => {
            if (!testLeadId) {
                console.warn('Skipping test - no test lead available');
                return;
            }

            const result = await query('SELECT * FROM leads WHERE id = $1', [testLeadId]);
            expect(result.rows.length).toBeGreaterThan(0);
            expect(result.rows[0].id).toBe(testLeadId);
        });

        test('Customer data should persist correctly', async () => {
            if (!testLeadId) {
                console.warn('Skipping test - no test lead available');
                return;
            }

            const result = await query(
                `SELECT customers.* FROM customers 
                 JOIN leads ON customers.id = leads.customer_id 
                 WHERE leads.id = $1`,
                [testLeadId]
            );

            expect(result.rows.length).toBeGreaterThan(0);
            expect(result.rows[0].email).toBeDefined();
        });

        test('Lead notes should persist in database', async () => {
            if (!testLeadId) {
                console.warn('Skipping test - no test lead available');
                return;
            }

            const result = await query(
                'SELECT * FROM lead_notes WHERE lead_id = $1',
                [testLeadId]
            );

            expect(result.rows.length).toBeGreaterThan(0);
        });

        test('Status history should persist in database', async () => {
            if (!testLeadId) {
                console.warn('Skipping test - no test lead available');
                return;
            }

            const result = await query(
                'SELECT * FROM lead_status_history WHERE lead_id = $1',
                [testLeadId]
            );

            expect(result.rows.length).toBeGreaterThan(0);
        });
    });

    // ===== VALIDATION & ERROR HANDLING TESTS =====

    describe('Validation & Error Handling', () => {
        test('Invalid email should be rejected', async () => {
            const res = await request(app)
                .post('/api/leads')
                .send({
                    first_name: 'Test',
                    surname: 'Customer',
                    email: 'invalid-email',
                    phone: '+27821234567'
                });

            expect(res.status).toBe(400);
            expect(res.body.errors).toBeDefined();
        });

        test('Non-existent lead should return 404', async () => {
            if (!accessToken) {
                console.warn('Skipping authenticated test - no token available');
                return;
            }

            const res = await request(app)
                .get('/api/leads/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${accessToken}`);

            expect(res.status).toBe(404);
            expect(res.body.success).toBe(false);
        });

        test('Invalid status should be rejected', async () => {
            if (!accessToken || !testLeadId) {
                console.warn('Skipping test - token or lead not available');
                return;
            }

            const res = await request(app)
                .post(`/api/leads/${testLeadId}/status`)
                .set('Authorization', `Bearer ${accessToken}`)
                .send({
                    new_status: 'INVALID_STATUS'
                });

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });
    });

    // ===== PERMISSION & AUTHORIZATION TESTS =====

    describe('Authorization & Permissions', () => {
        test('Anonymous user should not access protected endpoints', async () => {
            const res = await request(app).get('/api/leads');
            expect(res.status).toBe(401);
        });

        test('Invalid token should be rejected', async () => {
            const res = await request(app)
                .get('/api/leads')
                .set('Authorization', 'Bearer invalid-token');

            expect(res.status).toBe(401);
        });
    });
});

export default {};
