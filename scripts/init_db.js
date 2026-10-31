const mysql = require('mysql2/promise');

async function run() {
  const c = await mysql.createConnection({
    host: '82.25.121.2',
    user: 'u829141913_harshanand',
    password: 'Siddu@Intc.123456',
    database: 'u829141913_harshanand'
  });
  console.log('Connected to MySQL!');

  // Users Table
  await c.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      mobile VARCHAR(15) NOT NULL UNIQUE,
      name VARCHAR(100) NULL,
      role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
      preferred_language ENUM('kn', 'en') NOT NULL DEFAULT 'kn',
      status ENUM('active', 'suspended') NOT NULL DEFAULT 'active',
      last_login_at DATETIME NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_users_mobile (mobile),
      INDEX idx_users_role (role)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
  console.log('Created users table');

  // OTP Verifications Table
  await c.query(`
    CREATE TABLE IF NOT EXISTS otp_verifications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      mobile VARCHAR(15) NOT NULL,
      otp_code VARCHAR(6) NOT NULL,
      expires_at DATETIME NOT NULL,
      is_used TINYINT(1) NOT NULL DEFAULT 0,
      attempts INT NOT NULL DEFAULT 0,
      ip_address VARCHAR(45) NULL,
      user_agent TEXT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_otp_mobile_status (mobile, is_used, expires_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
  console.log('Created otp_verifications table');

  // User Activity Logs Table
  await c.query(`
    CREATE TABLE IF NOT EXISTS user_activity_logs (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NULL,
      mobile VARCHAR(15) NOT NULL,
      action VARCHAR(50) NOT NULL,
      ip_address VARCHAR(45) NULL,
      user_agent TEXT NULL,
      device_type VARCHAR(50) NULL,
      metadata JSON NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_logs_user_id (user_id),
      INDEX idx_logs_mobile (mobile),
      INDEX idx_logs_action (action),
      INDEX idx_logs_created_at (created_at),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
  console.log('Created user_activity_logs table');

  // User Sessions Table
  await c.query(`
    CREATE TABLE IF NOT EXISTS user_sessions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      session_id VARCHAR(64) NOT NULL UNIQUE,
      user_agent_hash VARCHAR(64) NOT NULL,
      ip_address VARCHAR(45) NULL,
      is_revoked TINYINT(1) NOT NULL DEFAULT 0,
      expires_at DATETIME NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_session_lookup (session_id, is_revoked, expires_at),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
  console.log('Created user_sessions table');

  const [tables] = await c.query('SHOW TABLES;');
  console.log('Current Tables:', tables);
  await c.end();
}

run().catch(e => {
  console.error('Error during init:', e);
  process.exit(1);
});

