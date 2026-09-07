// Email Service
// Handles all email notifications: confirmations, team alerts, follow-ups

import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

let transporter = null;

// Initialize email transporter
export const initializeEmailService = async () => {
    try {
        transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // Test connection
        await transporter.verify();
        logger.info('Email service initialized successfully');
        return transporter;
    } catch (error) {
        logger.error('Failed to initialize email service', error);
        throw error;
    }
};

// Get or initialize transporter
const getTransporter = async () => {
    if (!transporter) {
        await initializeEmailService();
    }
    return transporter;
};

// ===== SEND LEAD CONFIRMATION EMAIL (TO CUSTOMER) =====
export const sendLeadConfirmationEmail = async ({ name, email, leadId, isDuplicate }) => {
    try {
        const transport = await getTransporter();

        const subject = isDuplicate 
            ? 'Your Vehicle Enquiry - Already in Our System'
            : 'Your Vehicle Enquiry Received';

        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f2ca50; padding: 20px; text-align: center; color: white; }
        .content { padding: 20px; border: 1px solid #eee; }
        .footer { text-align: center; font-size: 12px; color: #999; margin-top: 20px; }
        .cta-button { background-color: #121414; color: #f2ca50; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Prime Lane Motors</h1>
        </div>
        <div class="content">
            <h2>Hello ${name}!</h2>
            
            ${isDuplicate 
                ? `
                <p>We found that you've already submitted an enquiry with us. We're already working on your vehicle financing options!</p>
                <p>Our sales team will contact you shortly with updates on your enquiry.</p>
                `
                : `
                <p>Thank you for your vehicle financing enquiry with Prime Lane Motors.</p>
                <p>We've received your information and will review it right away.</p>
                <p><strong>Your Enquiry Reference: ${leadId}</strong></p>
                <p>What happens next:</p>
                <ul>
                    <li>Our sales team will review your details within 24 hours</li>
                    <li>We'll contact you via phone or email with available options</li>
                    <li>We'll discuss your vehicle preferences and financing needs</li>
                    <li>If approved, we'll present you with the perfect vehicle and payment plan</li>
                </ul>
                `
            }
            
            <p>If you have any questions in the meantime, feel free to contact us:</p>
            <ul>
                <li>Phone: +27 657572632</li>
                <li>Email: ${process.env.EMAIL_FROM}</li>
            </ul>

            <p>Thank you for choosing Prime Lane Motors!</p>
        </div>
        <div class="footer">
            <p>© 2025 Prime Lane Motors. All rights reserved.</p>
            <p>This email was sent to ${email}</p>
        </div>
    </div>
</body>
</html>
        `;

        const mailOptions = {
            from: `"Prime Lane Motors" <${process.env.EMAIL_FROM}>`,
            to: email,
            subject,
            html: htmlContent,
            replyTo: process.env.EMAIL_FROM
        };

        const info = await transport.sendMail(mailOptions);
        logger.info('Confirmation email sent', { 
            messageId: info.messageId, 
            to: email,
            leadId 
        });

        return info;
    } catch (error) {
        logger.error('Failed to send confirmation email', { 
            error: error.message,
            email 
        });
        throw error;
    }
};

// ===== SEND TEAM NOTIFICATION EMAIL =====
export const sendLeadNotificationToTeam = async ({ leadId, customerName, email, phone, score, priority, isDuplicate, duplicateLeadId }) => {
    try {
        const transport = await getTransporter();

        const subject = `${priority} PRIORITY: New Lead - ${customerName}`;

        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #121414; padding: 20px; text-align: center; color: #f2ca50; }
        .priority { 
            padding: 10px; 
            border-radius: 4px;
            margin: 10px 0;
            font-weight: bold;
        }
        .hot { background-color: #ffb4ab; color: #333; }
        .warm { background-color: #fff3b0; color: #333; }
        .nurture { background-color: #c8c6c5; color: #333; }
        .content { padding: 20px; border: 1px solid #eee; }
        .footer { text-align: center; font-size: 12px; color: #999; margin-top: 20px; }
        .alert { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 10px; margin: 10px 0; }
        .lead-details { background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔔 NEW LEAD ALERT</h1>
        </div>
        <div class="content">
            <div class="priority ${priority.toLowerCase()}">
                ${priority} PRIORITY - Score: ${score}/100
            </div>

            ${isDuplicate 
                ? `<div class="alert"><strong>⚠️ DUPLICATE:</strong> This customer already has a lead (#${duplicateLeadId})</div>`
                : ''
            }

            <div class="lead-details">
                <h3>Customer Information</h3>
                <p>
                    <strong>Name:</strong> ${customerName}<br>
                    <strong>Email:</strong> ${email}<br>
                    <strong>Phone:</strong> ${phone}<br>
                    <strong>Lead ID:</strong> ${leadId}<br>
                    <strong>Lead Source:</strong> Website Form
                </p>
            </div>

            <h3>Recommended Actions:</h3>
            <ol>
                <li>Review lead details in the admin panel</li>
                <li>Contact customer within 24 hours</li>
                <li>Qualify their vehicle preferences</li>
                <li>Begin finance application process</li>
            </ol>

            <p style="margin-top: 30px; padding: 15px; background-color: #e8f5e9; border-radius: 4px;">
                <strong>⏱️ Response Time Goal:</strong> Contact within 4 hours for HOT leads, 24 hours for WARM leads
            </p>
        </div>
        <div class="footer">
            <p>© 2025 Prime Lane Motors Sales Command Centre</p>
        </div>
    </div>
</body>
</html>
        `;

        const mailOptions = {
            from: `"PLM System" <${process.env.EMAIL_FROM}>`,
            to: process.env.EMAIL_ADMIN || process.env.EMAIL_FROM,
            subject,
            html: htmlContent,
            replyTo: email
        };

        const info = await transport.sendMail(mailOptions);
        logger.info('Team notification sent', { 
            messageId: info.messageId,
            leadId,
            priority 
        });

        return info;
    } catch (error) {
        logger.error('Failed to send team notification', { 
            error: error.message,
            leadId 
        });
        throw error;
    }
};

// ===== SEND FOLLOW-UP REMINDER EMAIL =====
export const sendFollowUpReminderEmail = async ({ salespersonEmail, salespersonName, leadId, customerName, followUpType, dueDate }) => {
    try {
        const transport = await getTransporter();

        const subject = `Follow-up Reminder: ${customerName} - ${followUpType}`;

        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f2ca50; padding: 20px; text-align: center; color: #121414; }
        .content { padding: 20px; border: 1px solid #eee; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Follow-up Reminder</h2>
        </div>
        <div class="content">
            <p>Hi ${salespersonName},</p>
            <p>You have a follow-up due for <strong>${customerName}</strong> (Lead #${leadId})</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin: 15px 0;">
                <p><strong>Follow-up Type:</strong> ${followUpType}</p>
                <p><strong>Due Date:</strong> ${new Date(dueDate).toLocaleString()}</p>
            </div>

            <p>Please contact the customer as soon as possible.</p>
        </div>
    </div>
</body>
</html>
        `;

        const mailOptions = {
            from: `"PLM System" <${process.env.EMAIL_FROM}>`,
            to: salespersonEmail,
            subject,
            html: htmlContent
        };

        const info = await transport.sendMail(mailOptions);
        logger.info('Follow-up reminder sent', { 
            messageId: info.messageId,
            to: salespersonEmail 
        });

        return info;
    } catch (error) {
        logger.error('Failed to send follow-up reminder', { error: error.message });
        throw error;
    }
};

// ===== SEND FINANCE DECISION EMAIL =====
export const sendFinanceDecisionEmail = async ({ customerEmail, customerName, leadId, decision, details }) => {
    try {
        const transport = await getTransporter();

        const isApproved = decision === 'APPROVED' || decision === 'CONDITIONAL';
        const subject = isApproved 
            ? 'Great News! Your Finance Application'
            : 'Update on Your Finance Application';

        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: ${isApproved ? '#4caf50' : '#ff9800'}; padding: 20px; text-align: center; color: white; }
        .content { padding: 20px; border: 1px solid #eee; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>${isApproved ? '✓ APPROVED' : '⏳ ' + decision}</h2>
        </div>
        <div class="content">
            <p>Hi ${customerName},</p>
            
            ${isApproved 
                ? `
                <p>Fantastic news! Your vehicle finance application has been <strong>APPROVED</strong>.</p>
                <p>Our team will contact you shortly with:</p>
                <ul>
                    <li>Final approved amount</li>
                    <li>Interest rate and terms</li>
                    <li>Monthly payment details</li>
                    <li>Next steps for vehicle selection</li>
                </ul>
                `
                : `
                <p>Thank you for your patience. We have an update on your finance application.</p>
                <p><strong>Status:</strong> ${decision}</p>
                ${details ? `<p><strong>Details:</strong> ${details}</p>` : ''}
                <p>Our team will contact you shortly to discuss the next steps.</p>
                `
            }

            <p style="margin-top: 30px;">Contact us if you have any questions:</p>
            <ul>
                <li>Phone: +27 657572632</li>
                <li>Email: ${process.env.EMAIL_FROM}</li>
            </ul>
        </div>
    </div>
</body>
</html>
        `;

        const mailOptions = {
            from: `"Prime Lane Motors" <${process.env.EMAIL_FROM}>`,
            to: customerEmail,
            subject,
            html: htmlContent
        };

        const info = await transport.sendMail(mailOptions);
        logger.info('Finance decision email sent', { 
            messageId: info.messageId,
            to: customerEmail,
            decision 
        });

        return info;
    } catch (error) {
        logger.error('Failed to send finance decision email', { error: error.message });
        throw error;
    }
};

export default {
    initializeEmailService,
    sendLeadConfirmationEmail,
    sendLeadNotificationToTeam,
    sendFollowUpReminderEmail,
    sendFinanceDecisionEmail
};
