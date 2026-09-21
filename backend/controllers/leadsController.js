import { query } from '../config/database.js';
import { logger } from '../utils/logger.js';

const VALID_STAGES = [
  'New Lead',
  'Contacted',
  'Qualified',
  'Vehicle Selected',
  'Finance Application',
  'Awaiting Approval',
  'Finance Approved',
  'Deal Preparation',
  'Vehicle Ready',
  'Sale Completed',
  'Post-Sale Follow-Up',
  'Lost'
];

export async function createLead(req, res, next) {
  try {
    const {
      full_name,
      phone_number,
      email = null,
      target_vehicle_id = null,
      target_monthly_budget = null,
      source = 'Website',
      notes = null
    } = req.body;

    logger.info('Creating new lead', {
      email,
      phone_number
    });

    const duplicateResult = await query(
      `SELECT id, full_name, phone_number, email, stage
       FROM leads
       WHERE ($1::text IS NOT NULL AND LOWER(email) = LOWER($1))
          OR ($2::text IS NOT NULL AND phone_number = $2)
       ORDER BY created_at DESC
       LIMIT 1`,
      [email, phone_number]
    );

    const leadResult = await query(
      `INSERT INTO leads
       (
         full_name,
         phone_number,
         email,
         stage,
         target_vehicle_id,
         target_monthly_budget,
         notes,
         source
       )
       VALUES ($1, $2, $3, 'New Lead', $4, $5, $6, $7)
       RETURNING *`,
      [
        full_name,
        phone_number,
        email,
        target_vehicle_id,
        target_monthly_budget,
        notes,
        source
      ]
    );

    const lead = leadResult.rows[0];

    await query(
      `INSERT INTO lead_status_history
       (lead_id, old_status, new_status, reason, created_at)
       VALUES ($1, NULL, $2, $3, NOW())`,
      [
        lead.id,
        'New Lead',
        'Lead created'
      ]
    );

    res.status(201).json({
      success: true,
      message: duplicateResult.rows.length
        ? 'Lead created successfully (possible duplicate detected)'
        : 'Lead created successfully',
      data: {
        ...lead,
        duplicate: duplicateResult.rows.length > 0,
        duplicate_of: duplicateResult.rows[0]?.id || null
      }
    });

  } catch (error) {
    logger.error('Failed to create lead', {
      error: error.message,
      stack: error.stack
    });

    next(error);
  }
}

export async function getAllLeads(req, res, next) {
  try {
    const result = await query(
      `SELECT *
       FROM leads
       ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });

  } catch (error) {
    next(error);
  }
}

export async function getLeadById(req, res, next) {
  try {
    const result = await query(
      `SELECT *
       FROM leads
       WHERE id = $1`,
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
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

export async function updateLead(req, res, next) {
  try {
    const allowed = [
      'full_name',
      'phone_number',
      'email',
      'target_vehicle_id',
      'target_monthly_budget',
      'notes',
      'source'
    ];

    const fields = [];
    const values = [];

    for (const field of allowed) {
      if (req.body[field] !== undefined) {
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

    values.push(req.params.id);

    const result = await query(
      `UPDATE leads
       SET ${fields.join(', ')}
       WHERE id = $${values.length}
       RETURNING *`,
      values
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.json({
      success: true,
      message: 'Lead updated successfully',
      data: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
}

export async function changeLeadStatus(req, res, next) {
  try {
    const newStage = req.body.stage || req.body.new_status;

    if (!VALID_STAGES.includes(newStage)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead stage',
        valid_stages: VALID_STAGES
      });
    }

    const current = await query(
      `SELECT stage FROM leads WHERE id = $1`,
      [req.params.id]
    );

    if (!current.rows.length) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    const oldStage = current.rows[0].stage;

    const result = await query(
      `UPDATE leads
       SET stage = $1
       WHERE id = $2
       RETURNING *`,
      [newStage, req.params.id]
    );

    await query(
      `INSERT INTO lead_status_history
       (lead_id, old_status, new_status, reason, changed_by, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [
        req.params.id,
        oldStage,
        newStage,
        req.body.reason || null,
        req.user?.id || null
      ]
    );

    res.json({
      success: true,
      message: 'Lead stage updated successfully',
      data: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
}

export async function checkDuplicates(req, res, next) {
  try {
    const email = req.body.email || null;
    const phone = req.body.phone_number || req.body.phone || null;

    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        message: 'Email or phone number required'
      });
    }

    const result = await query(
      `SELECT id, full_name, phone_number, email, stage, created_at
       FROM leads
       WHERE ($1::text IS NOT NULL AND LOWER(email) = LOWER($1))
          OR ($2::text IS NOT NULL AND phone_number = $2)
       ORDER BY created_at DESC`,
      [email, phone]
    );

    res.json({
      success: true,
      duplicate: result.rows.length > 0,
      data: result.rows
    });

  } catch (error) {
    next(error);
  }
}

export async function assignLead(req, res, next) {
  try {
    await query(
      `INSERT INTO lead_notes
       (lead_id, content, note_type, is_internal_only, created_by, created_at)
       VALUES ($1, $2, 'assignment', TRUE, $3, NOW())`,
      [
        req.params.id,
        `Lead assigned to ${req.body.assigned_to}`,
        req.user?.id || null
      ]
    );

    res.json({
      success: true,
      message: 'Lead assignment recorded'
    });

  } catch (error) {
    next(error);
  }
}

export async function addLeadNote(req, res, next) {
  try {
    const result = await query(
      `INSERT INTO lead_notes
       (lead_id, content, note_type, is_internal_only, created_by, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [
        req.params.id,
        req.body.content,
        req.body.note_type || 'general',
        req.body.is_internal_only ?? true,
        req.user?.id || null
      ]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
}

export async function getLeadNotes(req, res, next) {
  try {
    const result = await query(
      `SELECT *
       FROM lead_notes
       WHERE lead_id = $1
       ORDER BY created_at DESC`,
      [req.params.id]
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    next(error);
  }
}

export async function getLeadHistory(req, res, next) {
  try {
    const result = await query(
      `SELECT *
       FROM lead_status_history
       WHERE lead_id = $1
       ORDER BY created_at DESC`,
      [req.params.id]
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    next(error);
  }
}

export async function markDuplicate(req, res, next) {
  try {
    const result = await query(
      `UPDATE leads
       SET stage = 'Lost',
           notes = CONCAT(
             COALESCE(notes, ''),
             CASE WHEN COALESCE(notes, '') = '' THEN '' ELSE E'\\n' END,
             '[DUPLICATE] ',
             $1
           )
       WHERE id = $2
       RETURNING *`,
      [
        req.body.reason || 'Duplicate lead',
        req.params.id
      ]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.json({
      success: true,
      message: 'Lead marked as duplicate',
      data: result.rows[0]
    });

  } catch (error) {
    next(error);
  }
}
