import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import pool from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_harshanand_secret_key_please_change_in_production_12345';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface TokenPayload {
  userId: number;
  mobile: string;
  role: 'user' | 'admin';
  sessionId: string;
  fingerprint: string; // Anti-hijack client hash
  iat?: number;
  exp?: number;
}

/**
 * Creates a cryptographic SHA-256 fingerprint from the client's User-Agent.
 * Used to detect token hijacking across different devices or browsers.
 */
export function generateFingerprint(userAgent: string = ''): string {
  return crypto.createHash('sha256').update(userAgent || 'unknown-client').digest('hex');
}

/**
 * Signs a strongly authenticated JWT with embedded anti-hijack fingerprint
 */
export function signAuthToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    algorithm: 'HS256',
    issuer: 'harshanand-portal',
    audience: 'harshanand-citizens',
  });
}

/**
 * Verifies JWT signature and checks anti-hijack fingerprint against current request's user-agent
 */
export async function verifyAuthToken(
  token: string, 
  currentUserAgent: string = ''
): Promise<{ valid: boolean; payload?: TokenPayload; reason?: string }> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'harshanand-portal',
      audience: 'harshanand-citizens',
    }) as TokenPayload;

    // 1. Anti-hijack fingerprint check
    const currentFingerprint = generateFingerprint(currentUserAgent);
    if (decoded.fingerprint !== currentFingerprint) {
      return { 
        valid: false, 
        reason: 'HIJACK_DETECTED: Client fingerprint does not match issuing device' 
      };
    }

    // 2. Check if session was revoked in MySQL
    if (decoded.sessionId) {
      const [rows] = await pool.query<any[]>(
        'SELECT id, is_revoked, expires_at, (expires_at < NOW()) as is_expired FROM user_sessions WHERE session_id = ? LIMIT 1',
        [decoded.sessionId]
      );

      if (!rows || rows.length === 0) {
        return { valid: false, reason: 'SESSION_NOT_FOUND' };
      }

      if (rows[0].is_revoked) {
        return { valid: false, reason: 'SESSION_REVOKED' };
      }

      if (rows[0].is_expired) {
        return { valid: false, reason: 'SESSION_EXPIRED' };
      }
    }

    return { valid: true, payload: decoded };
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return { valid: false, reason: 'TOKEN_EXPIRED' };
    }
    return { valid: false, reason: 'TOKEN_INVALID: ' + err.message };
  }
}

/**
 * Helper to extract client IP address from standard headers
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return '127.0.0.1';
}

/**
 * Helper to identify client device category
 */
export function getDeviceType(userAgent: string = ''): string {
  const ua = userAgent.toLowerCase();
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(ua)) {
    return 'Mobile';
  }
  if (/tablet|ipad/i.test(ua)) {
    return 'Tablet';
  }
  return 'Desktop';
}

/**
 * Log user activity into user_activity_logs table for administrative auditing
 */
export async function logUserActivity(params: {
  userId?: number | null;
  mobile: string;
  action: string;
  headers: Headers;
  metadata?: Record<string, any>;
}): Promise<void> {
  try {
    const userAgent = params.headers.get('user-agent') || 'Unknown';
    const ipAddress = getClientIp(params.headers);
    const deviceType = getDeviceType(userAgent);

    await pool.query(
      `INSERT INTO user_activity_logs (user_id, mobile, action, ip_address, user_agent, device_type, metadata)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        params.userId || null,
        params.mobile,
        params.action,
        ipAddress,
        userAgent,
        deviceType,
        params.metadata ? JSON.stringify(params.metadata) : null,
      ]
    );
  } catch (err) {
    console.error('Failed to log user activity:', err);
    // Don't crash request if logging fails
  }
}
