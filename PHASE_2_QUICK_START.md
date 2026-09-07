# PRIME LANE MOTORS - PHASE 2 QUICK START GUIDE

## Installation & Deployment (5-15 minutes)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### 2. Configure Environment (.env)

Edit `backend/.env` with your actual values:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=plm_production
DB_USER=plm_admin
DB_PASSWORD=YOUR_PASSWORD

# JWT (Generate strong secrets)
JWT_SECRET=your_random_secret_string_here_min_32_chars
REFRESH_TOKEN_SECRET=another_random_secret_min_32_chars

# Email (Gmail with App Password)
EMAIL_USER=primelanemotors2@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_FROM=primelanemotors2@gmail.com
EMAIL_ADMIN=admin@primelanemotors.com

# Frontend URLs
FRONTEND_URL=http://localhost:5173
FRONTEND_URL_PROD=https://yourdomain.com

# Other settings
NODE_ENV=development
PORT=3000
```

### 3. PostgreSQL Database Setup

```bash
# Create database
createdb plm_production

# Run setup script (creates schema + default users)
npm run db:setup

# Verify setup
psql -U plm_admin -d plm_production -c "SELECT COUNT(*) FROM users;"
```

**Default Admin User Created:**
- Email: `admin@primelanemotors.com`
- Password: `ChangeMe123!`
- ⚠️ **CHANGE THIS PASSWORD IMMEDIATELY IN PRODUCTION**

**Default Sales Team Member Created:**
- Name: Zain Sulliman
- Email: zain@primelanemotors.com
- Role: Salesperson
- Phone: +27657572632

### 4. Start Backend Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will start on `http://localhost:3000`

**Verify it's running:**
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "environment": "development",
  "timestamp": "2025-09-01T..."
}
```

---

## Frontend Integration (10-15 minutes)

### Update Finance Form Handler

**File:** `finance_enquiry_final_vw_mobile/code.html`

**Find this code (around line 260):**
```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault();
  formContainer.style.display = 'none';
  successState.classList.add('active');
});
```

**Replace with:**
```javascript
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';
  
  try {
    // Collect form data
    const formData = new FormData(form);
    const data = {
      first_name: formData.get('first_name'),
      surname: formData.get('surname'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      vehicle_id: formData.get('vehicle_id') || null,
      employment_status: formData.get('employment_status'),
      monthly_income: formData.get('monthly_income'),
      deposit_available: formData.get('deposit') === 'yes',
      finance_intent: true,
      lead_source: 'Website',
      consent_marketing: formData.get('consent') === 'on'
    };

    // Send to backend
    const response = await fetch('http://localhost:3000/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Lead created:', result.data.leadId);
      
      // Show success message
      formContainer.style.display = 'none';
      successState.classList.add('active');
    } else {
      const error = await response.json();
      console.error('Submission failed:', error);
      alert('Submission failed: ' + (error.message || 'Please try again'));
      
      // Reset form
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  } catch (error) {
    console.error('Lead submission error:', error);
    alert('Network error: ' + error.message);
    
    // Reset form
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});
```

### Test Form Submission

1. Open `http://localhost:5173/finance_enquiry_final_vw_mobile/code.html`
2. Fill out the form with test data
3. Submit the form
4. Check browser console for success message
5. Verify in database:

```bash
# Check if lead was created
psql -U plm_admin -d plm_production -c "
  SELECT id, email, status, score, priority FROM leads 
  ORDER BY created_at DESC LIMIT 1;
"
```

---

## Testing the System

### 1. Test Authentication

```bash
# Login (get access token)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@primelanemotors.com",
    "password": "ChangeMe123!"
  }'

# Save the accessToken from response
# Use it for subsequent requests
```

### 2. Test Lead Creation

```bash
# Create test lead from form (no authentication)
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "surname": "Doe",
    "email": "john.doe@example.com",
    "phone": "+27821234567",
    "employment_status": "Employed Full-Time",
    "monthly_income": "R30k+",
    "finance_intent": true,
    "lead_source": "Website"
  }'
```

### 3. Test Lead Retrieval (Protected)

```bash
# Get all leads (requires token)
curl -X GET http://localhost:3000/api/leads \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 4. Test Lead Status Change

```bash
curl -X POST http://localhost:3000/api/leads/{LEAD_ID}/status \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "new_status": "CONTACTED",
    "reason": "Initial contact made"
  }'
```

### 5. Check Email Logs

Backend logs emails sent to files:
```bash
# View logs
tail -f backend/logs/combined.log

# Check email service logs
grep "Email" backend/logs/info.log
```

---

## Common Issues & Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:**
1. Verify PostgreSQL is running
2. Check DB credentials in .env
3. Ensure database exists: `psql -l`
4. Check database user has permissions

### Email Not Sending
```
Error: Invalid login - 535 5.7.8 Username and password not accepted
```

**Solution:**
1. Enable 2-factor auth on Gmail
2. Generate App Password (not regular password)
3. Use App Password in .env EMAIL_PASSWORD
4. Verify EMAIL_USER is correct

### CORS Errors in Browser Console
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
1. Update CORS_ORIGIN in .env to include frontend URL
2. For local dev: `CORS_ORIGIN=http://localhost:5173`
3. Restart backend after .env change

### "Invalid token" Error
```
Error: Invalid token
```

**Solution:**
1. Token may have expired (7 days)
2. Login again to get new token
3. Include 'Bearer ' prefix in Authorization header

### Port Already in Use
```
Error: listen EADDRINUSE :::3000
```

**Solution:**
```bash
# Kill process on port 3000
# Windows: taskkill /PID {PID} /F
# Mac/Linux: kill -9 {PID}

# Or change port in .env
PORT=3001
```

---

## Production Deployment

### Environment Setup
```bash
# Set production environment
cp .env.example .env.production

# Configure for production
NODE_ENV=production
FRONTEND_URL_PROD=https://yourdomain.com
```

### Database Backup
```bash
# Backup database before deployment
pg_dump -U plm_admin plm_production > backup.sql

# Restore if needed
psql -U plm_admin plm_production < backup.sql
```

### SSL/HTTPS Setup
```bash
# Generate self-signed certificate (for testing)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# In production, use proper SSL certificate from Let's Encrypt
```

### Process Management
```bash
# Install PM2 for production
npm install -g pm2

# Start with PM2
pm2 start server.js --name "plm-backend"

# Auto-restart on reboot
pm2 startup
pm2 save

# Monitor
pm2 monit
```

---

## Next Steps

1. **Test Lead Creation** - Submit a test lead through the form
2. **Check Database** - Verify lead was saved
3. **Check Emails** - Verify confirmation and team notification emails
4. **Train Sales Team** - Show how to view and manage leads
5. **Set Up Monitoring** - Configure error alerts and logging
6. **Security Review** - Change default passwords, secure credentials

---

## Support & Documentation

- **Full Backend README:** [backend/README.md](backend/README.md)
- **Phase 2 Report:** [PHASE_2_COMPLETION_REPORT.md](PHASE_2_COMPLETION_REPORT.md)
- **Database Schema:** [backend/database/schema.sql](backend/database/schema.sql)
- **API Documentation:** See backend/README.md for complete endpoint list

---

**Backend Version:** 1.0.0  
**Status:** Production Ready  
**Last Updated:** 2025-09-01
