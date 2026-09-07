-- Prime Lane Motors Database Schema - Phase 2
-- PostgreSQL Production Database

-- Drop existing tables if they exist (for fresh setup only)
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS lead_notes CASCADE;
DROP TABLE IF EXISTS follow_ups CASCADE;
DROP TABLE IF EXISTS finance_applications CASCADE;
DROP TABLE IF EXISTS sales_activities CASCADE;
DROP TABLE IF EXISTS lead_status_history CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS sales_team CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS vehicles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ===== CORE USERS & AUTHENTICATION =====

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'sales_manager', 'salesperson', 'finance', 'viewer')),
    department VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ===== SALES TEAM =====

CREATE TABLE sales_team (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    manager_id UUID REFERENCES sales_team(id),
    territory VARCHAR(255),
    phone VARCHAR(20),
    quota_monthly DECIMAL(12, 2),
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sales_team_user ON sales_team(user_id);
CREATE INDEX idx_sales_team_manager ON sales_team(manager_id);

-- ===== INVENTORY & VEHICLES =====

CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stock_reference VARCHAR(50) UNIQUE NOT NULL,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    variant VARCHAR(100),
    year INTEGER,
    body_type VARCHAR(50),
    transmission VARCHAR(50),
    fuel_type VARCHAR(50),
    engine_size VARCHAR(50),
    mileage INTEGER,
    color VARCHAR(50),
    price DECIMAL(12, 2) NOT NULL,
    estimated_monthly_payment DECIMAL(12, 2),
    deposit DECIMAL(12, 2),
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    images JSONB DEFAULT '[]'::jsonb,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_vehicles_stock_ref ON vehicles(stock_reference);
CREATE INDEX idx_vehicles_available ON vehicles(is_available);
CREATE INDEX idx_vehicles_make_model ON vehicles(make, model);

-- ===== CUSTOMERS =====

CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) NOT NULL,
    secondary_phone VARCHAR(20),
    id_number VARCHAR(50),
    date_of_birth DATE,
    address_line_1 VARCHAR(255),
    address_line_2 VARCHAR(255),
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'South Africa',
    employment_status VARCHAR(50),
    employer_name VARCHAR(255),
    monthly_income DECIMAL(12, 2),
    consent_marketing BOOLEAN DEFAULT false,
    consent_terms BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_name ON customers(first_name, surname);

-- ===== LEADS =====

CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID UNIQUE REFERENCES customers(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES vehicles(id),
    lead_source VARCHAR(50) NOT NULL CHECK (lead_source IN ('Website', 'Facebook', 'Instagram', 'WhatsApp', 'Google', 'Referral', 'Other')),
    campaign VARCHAR(255),
    finance_intent BOOLEAN DEFAULT true,
    deposit_available BOOLEAN,
    status VARCHAR(50) NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTED', 'QUALIFIED', 'FINANCE_ENQUIRY', 'APPLICATION', 'APPROVED', 'VEHICLE_SECURED', 'SALE_CLOSED', 'LOST', 'DUPLICATE', 'NURTURE')),
    priority VARCHAR(20) DEFAULT 'WARM' CHECK (priority IN ('HOT', 'WARM', 'NURTURE', 'COLD')),
    score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
    owner_id UUID REFERENCES sales_team(id),
    assigned_at TIMESTAMP,
    is_duplicate_of UUID REFERENCES leads(id),
    duplicate_reason VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    contacted_at TIMESTAMP,
    qualified_at TIMESTAMP,
    last_activity_at TIMESTAMP
);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_owner ON leads(owner_id);
CREATE INDEX idx_leads_created ON leads(created_at);
CREATE INDEX idx_leads_priority ON leads(priority);
CREATE INDEX idx_leads_customer ON leads(customer_id);
CREATE INDEX idx_leads_vehicle ON leads(vehicle_id);

-- ===== LEAD STATUS HISTORY =====

CREATE TABLE lead_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    old_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    reason VARCHAR(255),
    changed_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_lead_status_history_lead ON lead_status_history(lead_id);

-- ===== SALES ACTIVITIES =====

CREATE TABLE sales_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL CHECK (activity_type IN ('CALL', 'EMAIL', 'SMS', 'WHATSAPP', 'MEETING', 'TEST_DRIVE', 'QUOTE', 'APPLICATION', 'FOLLOW_UP', 'NOTE')),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    outcome VARCHAR(50) CHECK (outcome IN ('POSITIVE', 'NEUTRAL', 'NEGATIVE', 'PENDING', 'COMPLETED')),
    created_by UUID REFERENCES users(id),
    scheduled_for TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sales_activities_lead ON sales_activities(lead_id);
CREATE INDEX idx_sales_activities_created_by ON sales_activities(created_by);
CREATE INDEX idx_sales_activities_scheduled ON sales_activities(scheduled_for);

-- ===== FOLLOW-UPS =====

CREATE TABLE follow_ups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    follow_up_type VARCHAR(50) NOT NULL CHECK (follow_up_type IN ('CALL', 'EMAIL', 'SMS', 'WHATSAPP', 'MEETING')),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date TIMESTAMP NOT NULL,
    assigned_to UUID REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'CANCELLED', 'OVERDUE')),
    completed_at TIMESTAMP,
    notes TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_follow_ups_lead ON follow_ups(lead_id);
CREATE INDEX idx_follow_ups_due_date ON follow_ups(due_date);
CREATE INDEX idx_follow_ups_status ON follow_ups(status);
CREATE INDEX idx_follow_ups_assigned_to ON follow_ups(assigned_to);

-- ===== FINANCE APPLICATIONS =====

CREATE TABLE finance_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL UNIQUE REFERENCES leads(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES vehicles(id),
    application_status VARCHAR(50) DEFAULT 'SUBMITTED' CHECK (application_status IN ('SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'CONDITIONAL', 'DECLINED', 'WITHDRAWN')),
    finance_provider VARCHAR(255),
    requested_amount DECIMAL(12, 2),
    approved_amount DECIMAL(12, 2),
    interest_rate DECIMAL(5, 2),
    loan_term_months INTEGER,
    monthly_installment DECIMAL(12, 2),
    documents_required JSONB DEFAULT '[]'::jsonb,
    documents_submitted JSONB DEFAULT '[]'::jsonb,
    decision_date DATE,
    decision_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_finance_applications_lead ON finance_applications(lead_id);
CREATE INDEX idx_finance_applications_status ON finance_applications(application_status);

-- ===== LEAD NOTES / COMMENTS =====

CREATE TABLE lead_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    note_type VARCHAR(50) DEFAULT 'GENERAL' CHECK (note_type IN ('GENERAL', 'CALL_LOG', 'MEETING_LOG', 'FOLLOW_UP', 'INTERNAL', 'CUSTOMER_FEEDBACK')),
    is_internal_only BOOLEAN DEFAULT false,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_lead_notes_lead ON lead_notes(lead_id);
CREATE INDEX idx_lead_notes_created_by ON lead_notes(created_by);

-- ===== AUDIT LOGS =====

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL CHECK (action IN ('CREATE', 'READ', 'UPDATE', 'DELETE')),
    changed_fields JSONB,
    old_values JSONB,
    new_values JSONB,
    performed_by UUID REFERENCES users(id),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_performed_by ON audit_logs(performed_by);

-- ===== GRANTS =====

-- Note: Adjust usernames and permissions based on your actual setup
-- GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO plm_app;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO plm_app;
