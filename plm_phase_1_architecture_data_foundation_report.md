# PRIME LANE MOTORS — PHASE 1: ARCHITECTURE & DATA FOUNDATION

## 1. PRODUCTION ROUTE MAP (AUDIT)

| Screen Name | Path | Type | Role | Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **Home** | `/` | PUBLIC | Brand Entry | **KEEP** - Main funnel entry |
| **Inventory** | `/inventory` | PUBLIC | Stock Display | **KEEP** - Product exploration |
| **Vehicle Detail** | `/inventory/:ref` | PUBLIC | Conversion | **KEEP** - Dynamic hydration needed |
| **Finance Assistance** | `/finance` | PUBLIC | Education | **KEEP** - Friction reduction |
| **Finance Enquiry** | `/enquiry` | PUBLIC | Lead Gen | **KEEP** - Core conversion (Disabled) |
| **How It Works** | `/how-it-works` | PUBLIC | Trust | **KEEP** - Transparency |
| **About PLM** | `/about` | PUBLIC | Authority | **KEEP** - Brand story |
| **FAQs** | `/faqs` | PUBLIC | Support | **KEEP** - Objection handling |
| **Contact** | `/contact` | PUBLIC | Direct Comms | **KEEP** - Physical/Digital access |
| **Legal Pages** | `/privacy`, `/terms`, `/disclaimer` | PUBLIC | Compliance | **KEEP** - Legal requirement |
| **Success** | `/success` | PUBLIC | Feedback | **KEEP** - Confirmation journey |
| **Sales Dashboard** | `/admin` | INTERNAL | Executive | **KEEP** - Management overview |
| **Leads List** | `/admin/leads` | INTERNAL | Ops | **KEEP** - Daily lead management |
| **Lead Detail** | `/admin/leads/:id`| INTERNAL | Sales | **KEEP** - Deep dive & action |
| **Pipeline** | `/admin/pipeline`| INTERNAL | Funnel | **KEEP** - Visual tracking |
| **Follow-ups** | `/admin/tasks` | INTERNAL | Action | **KEEP** - Task management |
| **Performance** | `/admin/reports` | INTERNAL | Analytics | **KEEP** - KPI tracking |

### Redundant Assets
- `{{DATA:SCREEN:SCREEN_13}}` (Monitoring Mode Overlay) - To be merged into standard Sales Dashboard.
- `{{DATA:SCREEN:SCREEN_2}}` (Health Check) - To be converted into a recurring background cron job/admin report.
- `{{DATA:SCREEN:SCREEN_7}}` & `{{DATA:SCREEN:SCREEN_8}}` (Sarah Miller Test Case) - Archive after verification.

---

## 2. DATA MODELS (SCHEMA DEFINITION)

### **Vehicle Model**
```json
{
  "id": "uuid",
  "stock_reference": "string (unique)",
  "make": "string",
  "model": "string",
  "variant": "string",
  "year": "integer",
  "mileage": "integer",
  "transmission": "enum (Manual, Automatic)",
  "fuel_type": "enum (Petrol, Diesel, Hybrid, Electric)",
  "price": "decimal",
  "estimated_monthly_payment": "decimal",
  "deposit": "decimal",
  "description": "text",
  "features": "array[string]",
  "images": "array[url]",
  "availability": "boolean",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### **Lead Model**
```json
{
  "id": "uuid",
  "first_name": "string",
  "surname": "string",
  "phone": "string",
  "email": "string",
  "vehicle_id": "uuid (fk)",
  "lead_source": "enum (Website, FB, IG, WhatsApp, Google, Other)",
  "campaign": "string",
  "finance_intent": "boolean",
  "financial_profile": {
    "employment_status": "string",
    "monthly_income": "decimal"
  },
  "consent": "boolean",
  "status": "enum (NEW, CONTACTED, QUALIFIED, APPLICATION_STARTED, APPLICATION_SUBMITTED, AWAITING_DOCUMENTS, SUBMITTED_TO_FINANCE, APPROVED, SOLD, DECLINED, LOST, NURTURE)",
  "score": "integer (0-100)",
  "priority": "enum (HOT, WARM, NURTURE)",
  "owner_id": "uuid (fk)",
  "created_at": "timestamp",
  "last_contact_at": "timestamp",
  "next_follow_up_at": "timestamp",
  "notes": "array[object]"
}
```

---

## 3. LEAD SCORING & OWNERSHIP

### **Salesperson Configuration**
- **Default Owner**: Zain Sulliman (`owner_id: 1`).
- **Logic**: Configurable via `sales_rotation` table to allow for round-robin assignment in Phase 3.

### **Scoring Logic (Sales Prioritisation Only)**
- **+40 points**: Complete contact data (Phone + Email).
- **+30 points**: Explicit Vehicle ID attached.
- **+20 points**: High income/Employment verified.
- **+10 points**: "Finance Enquiry" source.
- **Priority Brackets**: 
  - 80+: **HOT** 🔴
  - 50-79: **WARM** 🟠
  - <50: **NURTURE** 🟢

---

## 4. INFRASTRUCTURE & SECURITY

- **Database**: PostgreSQL (Relational integrity for Lead/Vehicle relationships).
- **Security Boundary**: 
  - **Public**: Next.js Server Actions (Read-only for Inventory, Write-only for Leads).
  - **Internal**: Middleware-protected `/admin` routes with Session-based Auth.
  - **API**: Separate Public Enqueue API vs Private Admin Management API.
- **Status**: Production Finance Form submissions are currently **LOCKED** (Foundation Verification Mode).