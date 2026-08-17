# PLM PRODUCTION IMPLEMENTATION CHECKLIST

## 1. Audit & Infrastructure
- [ ] Map all current screens (26 in inventory) to production routes.
- [ ] Identify and remove duplicate/redundant screens (e.g., multiple dashboard versions).
- [ ] Replace all hard-coded customer data with dynamic lead/vehicle models.
- [ ] Verify all internal links (Customer: `/`, `/inventory`, `/enquiry`; Internal: `/admin`, `/admin/leads`).

## 2. Inventory System (Data Model)
- [ ] Transition static vehicle cards to a structured JSON-ready schema.
- [ ] Ensure every vehicle detail page supports dynamic hydration for specs and CTAs.
- [ ] Standardize "Apply for Finance" and "WhatsApp" CTAs across all listings.

## 3. Finance Lead Engine
- [ ] Implement full validation on the 4-step enquiry form.
- [ ] Configure real-time lead creation on form submission.
- [ ] Link lead source tracking (UTM/Referral) to the database entry.

## 4. Sales Command Centre (CRM)
- [ ] Connect the "Active Leads" view to the live database.
- [ ] Implement Lead Scoring logic (HOT/WARM/NURTURE) based on the defined weights.
- [ ] Activate the Salesperson Assignment rules (Zain S. as default).
- [ ] Enable Lead Status progression (New -> Qualified -> Application -> Sale).

## 5. Rapid Response & WhatsApp
- [ ] Ensure all WhatsApp links use the official PLM number (+27 67 621 9820).
- [ ] Pre-populate contextual outreach drafts in the CRM.
- [ ] Activate response-time tracking KPIs.

## 6. Security & Compliance
- [ ] Separate Public Website from Internal Sales System.
- [ ] Implement role-based access (Admin/Manager/Salesperson).
- [ ] Scrub all test data from the production database.
- [ ] Final legal audit of Privacy/Terms/Disclaimer content.

## 7. Performance & SEO
- [ ] Optimize image assets for mobile-first loading.
- [ ] Implement SEO metadata (Open Graph/Meta Titles) for all public routes.
