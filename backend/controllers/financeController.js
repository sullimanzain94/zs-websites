import { query } from '../config/database.js';
import { logger } from '../utils/logger.js';

const VALID_STATUSES = [
  'SUBMITTED',
  'UNDER_REVIEW',
  'APPROVED',
  'CONDITIONAL',
  'DECLINED',
  'WITHDRAWN'
];

const DECISION_STATUSES = [
  'APPROVED',
  'CONDITIONAL',
  'DECLINED'
];

const FINANCE_TO_LEAD_STAGE = {
  SUBMITTED: 'Finance Application',
  UNDER_REVIEW: 'Awaiting Approval',
  APPROVED: 'Finance Approved',
  CONDITIONAL: 'Awaiting Approval'
};

async function syncLeadStage(leadId, newStage, changedBy, reason) {
  const current = await query(
    `SELECT stage FROM leads WHERE id = $1`,
    [leadId]
  );

  if (!current.rows.length) {
    throw new Error('Lead not found while synchronizing finance stage');
  }

  const oldStage = current.rows[0].stage;

  if (oldStage === newStage) {
    return;
  }

  await query(
    `UPDATE leads
     SET stage = $1
     WHERE id = $2`,
    [newStage, leadId]
  );

  await query(
    `INSERT INTO lead_status_history
       (lead_id, old_status, new_status, changed_by, reason)
     VALUES ($1, $2, $3, $4, $5)`,
    [leadId, oldStage, newStage, changedBy || null, reason]
  );

  logger.info('Lead stage synchronized from finance', {
    leadId,
    oldStage,
    newStage,
    changedBy: changedBy || null,
    reason
  });
}

export async function createFinanceApplication(req, res, next) {
  try {
    const {
      lead_id,
      vehicle_id = null,
      requested_amount,
      finance_provider = null,
      loan_term_months = null
    } = req.body;

    const lead = await query(
      `SELECT id FROM leads WHERE id = $1`,
      [lead_id]
    );

    if (!lead.rows.length) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    if (vehicle_id) {
      const vehicle = await query(
        `SELECT id FROM vehicles WHERE id = $1`,
        [vehicle_id]
      );

      if (!vehicle.rows.length) {
        return res.status(404).json({
          success: false,
          message: 'Vehicle not found'
        });
      }
    }

    const existing = await query(
      `SELECT id
       FROM finance_applications
       WHERE lead_id = $1`,
      [lead_id]
    );

    if (existing.rows.length) {
      return res.status(409).json({
        success: false,
        message: 'Finance application already exists for this lead',
        application_id: existing.rows[0].id
      });
    }

    const result = await query(
      `INSERT INTO finance_applications
       (
         lead_id,
         vehicle_id,
         application_status,
         finance_provider,
         requested_amount,
         loan_term_months
       )
       VALUES ($1, $2, 'SUBMITTED', $3, $4, $5)
       RETURNING *`,
      [
        lead_id,
        vehicle_id,
        finance_provider,
        requested_amount,
        loan_term_months
      ]
    );

    await syncLeadStage(
      lead_id,
      'Finance Application',
      req.user?.id,
      'Finance application created'
    );

    logger.info('Finance application created', {
      applicationId: result.rows[0].id,
      leadId: lead_id
    });

    res.status(201).json({
      success: true,
      message: 'Finance application created successfully',
      data: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
}

export async function getFinanceApplication(req, res, next) {
  try {
    const result = await query(
      `SELECT
         fa.*,
         l.full_name AS lead_name,
         l.phone_number AS lead_phone,
         l.email AS lead_email,
         l.stage AS lead_stage,
         v.make,
         v.model,
         v.year,
         v.price AS vehicle_price
       FROM finance_applications fa
       JOIN leads l ON l.id = fa.lead_id
       LEFT JOIN vehicles v ON v.id = fa.vehicle_id
       WHERE fa.id = $1`,
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: 'Finance application not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
}

export async function updateFinanceApplication(req, res, next) {
  try {
    const allowed = [
      'application_status',
      'finance_provider',
      'requested_amount',
      'approved_amount',
      'interest_rate',
      'loan_term_months',
      'monthly_installment',
      'documents_required',
      'documents_submitted',
      'decision_date',
      'decision_notes'
    ];

    const fields = [];
    const values = [];

    for (const field of allowed) {
      if (req.body[field] !== undefined) {
        if (
          field === 'application_status' &&
          !VALID_STATUSES.includes(req.body[field])
        ) {
          return res.status(400).json({
            success: false,
            message: 'Invalid finance application status',
            valid_statuses: VALID_STATUSES
          });
        }

        values.push(req.body[field]);
        fields.push(`${field} = $${values.length}`);
      }
    }

    if (!fields.length) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update'
      });
    }

    const current = await query(
      `SELECT lead_id, application_status
       FROM finance_applications
       WHERE id = $1`,
      [req.params.id]
    );

    if (!current.rows.length) {
      return res.status(404).json({
        success: false,
        message: 'Finance application not found'
      });
    }

    const previousStatus = current.rows[0].application_status;

    values.push(req.params.id);

    const result = await query(
      `UPDATE finance_applications
       SET ${fields.join(', ')},
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $${values.length}
       RETURNING *`,
      values
    );

    const application = result.rows[0];

    if (
      application.application_status !== previousStatus &&
      FINANCE_TO_LEAD_STAGE[application.application_status]
    ) {
      await syncLeadStage(
        application.lead_id,
        FINANCE_TO_LEAD_STAGE[application.application_status],
        req.user?.id,
        `Finance status changed to ${application.application_status}`
      );
    }

    res.json({
      success: true,
      message: 'Finance application updated successfully',
      data: application
    });

  } catch (error) {
    next(error);
  }
}

export async function setFinanceDecision(req, res, next) {
  try {
    const {
      decision,
      decision_notes = null,
      approved_amount,
      interest_rate,
      loan_term_months,
      monthly_installment
    } = req.body;

    if (!DECISION_STATUSES.includes(decision)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid finance decision',
        valid_decisions: DECISION_STATUSES
      });
    }

    const current = await query(
      `SELECT lead_id
       FROM finance_applications
       WHERE id = $1`,
      [req.params.id]
    );

    if (!current.rows.length) {
      return res.status(404).json({
        success: false,
        message: 'Finance application not found'
      });
    }

    const result = await query(
      `UPDATE finance_applications
       SET application_status = $1,
           decision_notes = COALESCE($2, decision_notes),
           approved_amount = COALESCE($3, approved_amount),
           interest_rate = COALESCE($4, interest_rate),
           loan_term_months = COALESCE($5, loan_term_months),
           monthly_installment = COALESCE($6, monthly_installment),
           decision_date = CURRENT_DATE,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [
        decision,
        decision_notes,
        approved_amount ?? null,
        interest_rate ?? null,
        loan_term_months ?? null,
        monthly_installment ?? null,
        req.params.id
      ]
    );

    const application = result.rows[0];

    if (FINANCE_TO_LEAD_STAGE[decision]) {
      await syncLeadStage(
        application.lead_id,
        FINANCE_TO_LEAD_STAGE[decision],
        req.user?.id,
        `Finance decision recorded: ${decision}`
      );
    }

    logger.info('Finance decision recorded', {
      applicationId: application.id,
      leadId: application.lead_id,
      decision,
      decidedBy: req.user?.id || null
    });

    res.json({
      success: true,
      message: `Finance application marked ${decision}`,
      data: application
    });

  } catch (error) {
    next(error);
  }
}
