# Prime Lane Motors - Production File Structure

This document outlines the proposed production-ready file structure for the Prime Lane Motors web application, mapping the designed screens to a standard Next.js / React project architecture.

## 1. Project Root
```text
prime-lane-motors/
├── .github/                # CI/CD workflows
├── public/                 # Static assets (Logos, Vehicle Images)
│   ├── brand/              # PLM Logos and Marks
│   └── vehicles/           # Stock photography organized by SKU
├── src/
│   ├── app/                # Next.js App Router (Pages & Routes)
│   ├── components/         # Shared UI Components (Nav, Footer, Cards)
│   ├── hooks/              # Custom React hooks (Lead scoring, Auth)
│   ├── lib/                # Shared utilities & API clients
│   ├── styles/             # Global CSS and Design System tokens
│   └── types/              # TypeScript definitions
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.js      # Design System implementation
└── tsconfig.json
```

## 2. Route Mapping (src/app/)

### Customer-Facing (Public)
| Route | Source Screen | Purpose |
| :--- | :--- | :--- |
| `/` | `{{DATA:SCREEN:SCREEN_6}}` | Home Page (Final VW Only) |
| `/inventory` | `{{DATA:SCREEN:SCREEN_5}}` | Volkswagen Vehicles Catalogue |
| `/inventory/[ref]` | `{{DATA:SCREEN:SCREEN_52}}` | Vehicle Detail Page |
| `/finance` | `{{DATA:SCREEN:SCREEN_4}}` | Finance Education & Options |
| `/enquiry` | `{{DATA:SCREEN:SCREEN_3}}` | Finance Enquiry Form (Mobile-First) |
| `/about` | `{{DATA:SCREEN:SCREEN_68}}` | About Prime Lane Motors |
| `/contact` | `{{DATA:SCREEN:SCREEN_65}}` | Contact & Location |
| `/success` | `{{DATA:SCREEN:SCREEN_63}}` | Enquiry Confirmation |

### Internal Operations (Protected `/admin`)
| Route | Source Screen | Purpose |
| :--- | :--- | :--- |
| `/admin` | `{{DATA:SCREEN:SCREEN_55}}` | Sales Dashboard (Production Ready) |
| `/admin/leads` | `{{DATA:SCREEN:SCREEN_62}}` | Active Leads CRM |
| `/admin/leads/[id]` | `{{DATA:SCREEN:SCREEN_51}}` | Lead Detail & Status Management |
| `/admin/pipeline` | `{{DATA:SCREEN:SCREEN_27}}` | Application Pipeline |
| `/admin/verification`| `{{DATA:SCREEN:SCREEN_21}}` | Document Verification Workspace |
| `/admin/decisions` | `{{DATA:SCREEN:SCREEN_9}}` | Finance Decisions Command Centre |

## 3. Component Architecture (src/components/)

- **Layouts**: `RootLayout`, `AdminLayout`
- **Navigation**: `TopNavBar`, `SideNavBar` (Internal), `BottomNav` (Mobile)
- **Forms**: `FinanceEnquiryForm`, `LeadContactForm`
- **Cards**: `VehicleCard`, `LeadCard`, `DecisionCard`
- **Feedback**: `StatusAlert`, `QualificationBadge`

## 4. Environment & Data
- **CMS**: Dynamic hydration for Vehicle Inventory.
- **Database**: PostgreSQL for Lead and Application storage.
- **Security**: RBAC for the `/admin` routes via Middleware.
