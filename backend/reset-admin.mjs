import bcryptjs from 'bcryptjs';
import { connectDB, query, getPool } from './config/database.js';

const password = process.env.PLM_NEW_PASSWORD;

if (!password || password.length < 8) {
  console.error('Set PLM_NEW_PASSWORD to a password of at least 8 characters.');
  process.exit(1);
}

try {
  await connectDB();

  const hash = await bcryptjs.hash(password, 10);

  const result = await query(
    `UPDATE users
     SET password_hash = $1,
         is_active = true,
         updated_at = CURRENT_TIMESTAMP
     WHERE email = LOWER($2)
     RETURNING username, email, role, is_active`,
    [hash, 'primelanemotors2@gmail.com']
  );

  if (!result.rows.length) {
    throw new Error('Admin account not found.');
  }

  console.log('Admin password reset successfully.');
  console.log(result.rows[0]);
} finally {
  await getPool().end();
}
