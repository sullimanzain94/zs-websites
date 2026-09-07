# Prime Lane Motors - Phase 2 Backend

Complete production-ready backend for the Prime Lane Motors sales management system.

## 📋 Overview

Phase 2 Backend provides:
- Complete lead management system
- Authentication & authorization
- Sales pipeline tracking
- Follow-up management
- Email notifications
- Finance application handling
- Comprehensive audit logging

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm

### Installation

1. **Clone and navigate to backend directory:**
```bash
cd backend
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
- Database credentials
- JWT secrets
- Email configuration
- API keys

3. **Create database:**
```sql
CREATE DATABASE plm_production;
```

4. **Run database setup:**
```bash
npm run db:setup
```

5. **Start the server:**
```bash
# Development
npm run dev

# Production
npm start
```

Server will start on `http://localhost:3000`

## 📚 API Documentation

### Health Check
```
GET /api/health
```

### Authentication
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
POST /api/auth/logout
GET /api/auth/me
```

### Leads (Primary Frontend Integration)
```
POST /api/leads              # Create lead from form
GET /api/leads               # Get all leads (paginated)
GET /api/leads/:id           # Get single lead
PATCH /api/leads/:id         # Update lead
POST /api/leads/:id/status   # Change status
POST /api/leads/check/duplicates  # Check for duplicates
POST /api/leads/:id/assign   # Assign to salesperson
POST /api/leads/:id/notes    # Add note
GET /api/leads/:id/notes     # Get notes
GET /api/leads/:id/history   # Get status history
```

### Other Endpoints
- Customers: `/api/customers`
- Vehicles: `/api/vehicles`
- Sales Team: `/api/sales-team`
- Follow-ups: `/api/follow-ups`
- Activities: `/api/activities`
- Finance: `/api/finance`

## 🔐 Authentication

All protected endpoints require Bearer token in Authorization header:

```javascript
fetch('/api/leads', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  }
})
```

### User Roles
- `admin` - Full access
- `sales_manager` - Team management & lead oversight
- `salesperson` - Own leads & activities
- `finance` - Finance applications
- `viewer` - Read-only access

## 📧 Email Configuration

The backend sends automated emails for:
1. **Lead confirmation** - Sent to customer after form submission
2. **Team notification** - Alerts sales team about new leads
3. **Follow-up reminders** - Reminds salesperson of upcoming follow-ups
4. **Finance decisions** - Notifies customer of approval/decline

### Email Configuration (Gmail Example)

1. Enable 2-factor authentication on Gmail
2. Generate App Password: https://myaccount.google.com/apppasswords
3. In `.env`:
```
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=your_email@gmail.com
EMAIL_ADMIN=admin@primelanemotors.com
```

## 🗄️ Database Schema

### Core Tables
- **users** - System users & authentication
- **sales_team** - Sales team members with territories
- **customers** - Customer records
- **leads** - Lead management with status tracking
- **vehicles** - Vehicle inventory
- **finance_applications** - Finance applications
- **follow_ups** - Follow-up activities
- **sales_activities** - Call logs, emails, meetings
- **lead_status_history** - Complete lead history
- **lead_notes** - Lead notes & comments
- **audit_logs** - System audit trail

## 🧪 Testing

### Manual Testing

1. **Test lead creation:**
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Test",
    "surname": "Customer",
    "email": "test@example.com",
    "phone": "+27821234567",
    "vehicle_id": "optional-uuid",
    "finance_intent": true
  }'
```

2. **Test authentication:**
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@primelanemotors.com",
    "password": "ChangeMe123!"
  }'

# Use returned accessToken for authenticated requests
```

3. **Test lead retrieval:**
```bash
curl -X GET http://localhost:3000/api/leads \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Automated Testing
```bash
npm test
```

## 🛡️ Security Features

- ✅ JWT authentication with refresh tokens
- ✅ Password hashing with bcrypt
- ✅ SQL injection prevention (parameterized queries)
- ✅ Environment variables for secrets
- ✅ CORS protection
- ✅ Helmet.js security headers
- ✅ Role-based access control (RBAC)
- ✅ Audit logging for all data changes
- ✅ Data validation and sanitization

## 📊 Lead Scoring

Leads are automatically scored based on:
- Complete contact info: +40 points
- Vehicle selected: +30 points
- High income bracket: +20 points
- Financed source: +10 points

**Priority Levels:**
- **HOT**: Score ≥80 (Contact within 4 hours)
- **WARM**: Score 50-79 (Contact within 24 hours)
- **NURTURE**: Score <50 (Follow-up in weekly)

## 🔄 Frontend Integration

### Replace form handler in `finance_enquiry_final_vw_mobile/code.html`

Old (non-functional):
```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault();
  formContainer.style.display = 'none';
  successState.classList.add('active');
});
```

New (connected to backend):
```javascript
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  try {
    const formData = new FormData(form);
    const response = await fetch('http://localhost:3000/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    
    if (response.ok) {
      formContainer.style.display = 'none';
      successState.classList.add('active');
    } else {
      alert('Submission failed. Please try again.');
    }
  } catch (error) {
    console.error('Lead submission error:', error);
    alert('Network error. Please try again.');
  }
});
```

## 📋 Phase 2 Completion Checklist

- [x] Database schema designed and implemented
- [x] Authentication system with JWT
- [x] Lead management API endpoints
- [x] Email notification service
- [x] Lead scoring system
- [x] Duplicate detection
- [x] Status tracking & history
- [x] Error handling & logging
- [ ] Frontend form integration
- [ ] Comprehensive test suite
- [ ] Production deployment
- [ ] Sales team training

## 🐛 Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check credentials in `.env`
- Ensure database exists

### Email Not Sending
- Check Gmail App Password setup
- Verify EMAIL_USER and EMAIL_PASSWORD in `.env`
- Check spam folder

### CORS Errors
- Update CORS_ORIGIN in `.env`
- Include both dev and production URLs

## 📞 Support

For issues or questions:
- Email: admin@primelanemotors.com
- Phone: +27 657572632

## 📝 License

Proprietary - Prime Lane Motors
