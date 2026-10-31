import mysql from 'mysql2/promise';

declare global {
  // eslint-disable-next-line no-var
  var __mysqlPool: mysql.Pool | undefined;
}

const pool = global.__mysqlPool || mysql.createPool({
  host: process.env.DB_HOST || '82.25.121.2',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'u829141913_harshanand',
  password: process.env.DB_PASSWORD || 'Siddu@Intc.123456',
  database: process.env.DB_NAME || 'u829141913_harshanand',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

if (process.env.NODE_ENV !== 'production') {
  global.__mysqlPool = pool;
}

export default pool;

