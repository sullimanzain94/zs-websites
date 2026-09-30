# Prime Lane Motors — Contributor Guide

## Welcome

Thank you for your interest in contributing to Prime Lane Motors (PLM).

PLM is building an integrated automotive sales and business platform covering marketing, lead generation, customer management, vehicle discovery, finance workflows, sales operations, automation and business intelligence.

Contributors are expected to work professionally, communicate clearly and protect PLM systems and information.

---

## 1. Before You Start

Before receiving project access, a contributor should provide:

- Name
- Area of expertise
- Relevant experience
- Type of contribution they want to make
- Availability
- Preferred communication method
- Relevant portfolio, GitHub profile or examples where applicable

PLM may assign a small initial task before granting broader access.

---

## 2. Contribution Areas

Examples include:

### Development
- Frontend
- Backend
- API development
- Database
- Supabase
- Testing
- DevOps
- Security

### Product
- UI/UX
- Product design
- Customer experience
- Workflow design

### Commercial
- Marketing
- Lead generation
- Sales operations
- Business development
- Partnerships

### Intelligence and Automation
- AI
- Automation
- Data analysis
- Business intelligence

---

## 3. How Work Is Assigned

Work should normally begin with a GitHub Issue.

The Issue should define:

- The problem
- The objective
- Scope
- Acceptance criteria
- Testing requirements
- Dependencies
- Risks

A contributor should ask for clarification before making major assumptions about the intended behaviour.

---

## 4. Development Rules

When working on the codebase:

- Work from the latest approved branch.
- Create a dedicated branch for the task.
- Keep changes focused.
- Do not modify unrelated files.
- Do not commit secrets.
- Do not commit `.env` files.
- Test changes before submitting them.
- Document important technical decisions.
- Do not bypass required reviews.
- Do not make direct production changes unless specifically authorized.

---

## 5. Branch Naming

Use descriptive branch names.

Examples:

feature/lead-source-tracking

feature/customer-location

fix/vehicle-search

fix/authentication-error

docs/contributor-guide

test/lead-pipeline

---

## 6. Commits

Commits should describe the change clearly.

Examples:

Add lead source field

Fix customer lookup validation

Add contributor onboarding documentation

Improve vehicle search error handling

Avoid vague messages such as:

update

changes

stuff

fixed

---

## 7. Pull Requests

Every Pull Request should explain:

- What changed
- Why it changed
- Related Issue
- Files or systems affected
- Testing performed
- Known limitations
- Potential risks
- Deployment requirements

The contributor should not assume that opening a Pull Request means the change has been approved.

---

## 8. Testing

Before requesting review, contributors should test the change relevant to their task.

Depending on the task this may include:

- Unit tests
- Integration tests
- API tests
- Database tests
- Browser testing
- Mobile testing
- Authentication testing
- Regression testing
- Build verification

Testing results should be included in the Pull Request.

---

## 9. Communication

Contributors should communicate:

- Blockers
- Security concerns
- Unexpected behaviour
- Scope changes
- Dependency problems
- Deployment concerns

Early communication is preferable to silently changing the scope of a task.

---

## 10. Handling Existing PLM Systems

PLM contains interconnected systems.

A contributor should consider whether a proposed change could affect:

- Leads
- Customers
- Vehicles
- Finance
- Follow-ups
- Activities
- Authentication
- API routes
- Dashboards
- Mobile applications
- Existing frontend functionality
- Database relationships

If a change could affect multiple systems, identify those dependencies before implementation.

---

## 11. Sensitive Information

Never request or expose information unnecessarily.

Do not commit or share:

- Passwords
- API keys
- Authentication tokens
- Database credentials
- `.env` files
- Customer personal information
- Customer financial information
- Private communications
- Production credentials

If sensitive information is accidentally exposed, report it immediately.

---

## 12. Ownership and Approval

Contributing to PLM does not automatically grant ownership or decision-making authority over PLM.

Contributors are responsible for the work they are assigned.

PLM retains final approval over production changes and business-critical decisions.

---

## 13. Professional Standard

PLM contributors should aim for:

- Clear communication
- Reliable delivery
- Secure development
- Maintainable code
- Useful documentation
- Appropriate testing
- Respect for existing architecture
- Responsible handling of access

---

## 14. First Contribution

A typical first contribution should be small enough to review easily.

Example:

1. Receive Issue.
2. Understand acceptance criteria.
3. Create branch.
4. Make change.
5. Test.
6. Commit.
7. Push branch.
8. Open Pull Request.
9. Respond to review.
10. Wait for approval.
11. Merge through the approved process.

---

## Contributor Principle

Contribute with purpose.

Change only what is required.

Test what you change.

Protect what you access.

Document what matters.
