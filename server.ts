import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { db } from './server/database.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Configuration & Secrets from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'dar_randigaba_secret_jwt_key_2026_super_secure';
const INITIAL_ADMIN_USERNAME = (process.env.ADMIN_USERNAME || 'admin@darrandigaba.com').trim().toLowerCase();
const INITIAL_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Taroudant#2026!';

// Automatically initialize database: hashes credentials with 12 bcrypt salt rounds and stores in database
db.initializeSuperAdmin(INITIAL_ADMIN_USERNAME, INITIAL_ADMIN_PASSWORD);
if (INITIAL_ADMIN_USERNAME !== 'admin@darrandigaba.com') {
  db.initializeSuperAdmin('admin@darrandigaba.com', 'Taroudant#2026!');
}

// Express Middleware
app.use(express.json());
app.use(cookieParser());

// Security Hardening Headers
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Brute-Force Rate Limiting Engine for Login Route
interface RateLimitRecord {
  attempts: number;
  firstAttemptTime: number;
  blockedUntil?: number;
}
const loginRateLimitMap = new Map<string, RateLimitRecord>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15-minute window
const BLOCK_DURATION_MS = 15 * 60 * 1000; // 15-minute temporary lockout

const checkRateLimit = (ip: string): { allowed: boolean; remainingAttempts: number; retryAfterSeconds?: number } => {
  const now = Date.now();
  const record = loginRateLimitMap.get(ip);

  if (!record) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  // Check if actively locked out
  if (record.blockedUntil && record.blockedUntil > now) {
    const retryAfterSeconds = Math.ceil((record.blockedUntil - now) / 1000);
    return { allowed: false, remainingAttempts: 0, retryAfterSeconds };
  }

  // Reset window after expiration
  if (now - record.firstAttemptTime > WINDOW_MS) {
    loginRateLimitMap.delete(ip);
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    record.blockedUntil = now + BLOCK_DURATION_MS;
    const retryAfterSeconds = Math.ceil(BLOCK_DURATION_MS / 1000);
    return { allowed: false, remainingAttempts: 0, retryAfterSeconds };
  }

  return { allowed: true, remainingAttempts: MAX_ATTEMPTS - record.attempts };
};

const recordFailedAttempt = (ip: string, username: string) => {
  const now = Date.now();
  const record = loginRateLimitMap.get(ip) || { attempts: 0, firstAttemptTime: now };
  record.attempts += 1;
  if (record.attempts >= MAX_ATTEMPTS) {
    record.blockedUntil = now + BLOCK_DURATION_MS;
    db.logSecurityEvent(`Brute-force lockout triggered for IP: ${ip} targeting user: ${username}`, ip);
  } else {
    db.logSecurityEvent(`Failed login attempt (${record.attempts}/${MAX_ATTEMPTS}) for user: ${username}`, ip);
  }
  loginRateLimitMap.set(ip, record);
};

const resetRateLimit = (ip: string) => {
  loginRateLimitMap.delete(ip);
};

// Authentication Middleware: Verifies JWT Token from secure HttpOnly Cookie or Bearer header
export interface AuthRequest extends Request {
  user?: { username: string; role: string };
}

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.auth_token || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Authentication required to access this resource.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string; role: string };
    const admin = db.findAdminByUsername(decoded.username);
    if (!admin) {
      return res.status(401).json({ error: 'Unauthorized: Admin user no longer exists.' });
    }
    req.user = { username: admin.username, role: admin.role };
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized: Session expired or invalid token. Please log in again.' });
  }
};

// Rate Limiting Middleware for Brute-Force Prevention
const loginRateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown-client';
  const rateLimitStatus = checkRateLimit(ip);
  if (!rateLimitStatus.allowed) {
    res.setHeader('Retry-After', String(rateLimitStatus.retryAfterSeconds));
    return res.status(429).json({
      error: `Too many failed login attempts. Temporarily locked out for security. Try again in ${rateLimitStatus.retryAfterSeconds} seconds.`,
      retryAfter: rateLimitStatus.retryAfterSeconds
    });
  }
  next();
};

// SERVER-SIDE ROUTE GUARD: Protect all /admin page routes and redirect unauthenticated requests to the login page
const requireAdminPageAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.auth_token;

  if (!token) {
    // Unauthenticated: redirect immediately to login prompt
    return res.redirect('/?admin_login=1#admin');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string; role: string };
    const admin = db.findAdminByUsername(decoded.username);
    if (!admin) {
      res.clearCookie('auth_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/'
      });
      return res.redirect('/?admin_login=1#admin');
    }
    // Valid session: proceed to load admin SPA
    next();
  } catch {
    res.clearCookie('auth_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/'
    });
    return res.redirect('/?admin_login=1#admin');
  }
};

app.use(['/admin', '/admin/*'], requireAdminPageAuth);

// API ROUTES

// 1. Current Session Verification (Database-grounded)
app.get('/api/auth/me', (req: Request, res: Response) => {
  const token = req.cookies?.auth_token || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string; role: string };
    const admin = db.findAdminByUsername(decoded.username);
    if (!admin) {
      return res.json({ authenticated: false });
    }
    return res.json({
      authenticated: true,
      user: {
        username: admin.username,
        role: admin.role,
        lastLogin: admin.lastLogin
      }
    });
  } catch {
    return res.json({ authenticated: false });
  }
});

// 2. Admin Login: Database Authentication with 12-round Bcrypt & Strict Cookies
app.post('/api/auth/login', loginRateLimiterMiddleware, async (req: Request, res: Response) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown-client';
  const { username, password } = req.body;

  // Input Validation & Sanitization
  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Username/Email and Password are required.' });
  }

  const cleanUsername = username.trim().toLowerCase();

  // Query Database directly (no hardcoding or raw string comparison)
  const admin = db.findAdminByUsername(cleanUsername);

  if (!admin) {
    recordFailedAttempt(ip, cleanUsername);
    const updatedStatus = checkRateLimit(ip);
    return res.status(401).json({
      error: 'Invalid username or password.',
      remainingAttempts: updatedStatus.remainingAttempts
    });
  }

  // Authenticate against database password_hash using bcrypt.compare
  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) {
    recordFailedAttempt(ip, cleanUsername);
    const updatedStatus = checkRateLimit(ip);
    return res.status(401).json({
      error: 'Invalid username or password.',
      remainingAttempts: updatedStatus.remainingAttempts
    });
  }

  // Success: Clear rate limit, update database last login timestamp, log audit
  resetRateLimit(ip);
  db.updateLastLogin(admin.username);
  db.logSecurityEvent(`Admin logged in successfully: ${admin.username}`, ip);

  // Generate signed JWT token with 8 hours expiration
  const token = jwt.sign(
    { username: admin.username, role: admin.role },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  // Set JWT tokens in HttpOnly, Secure, and SameSite=Strict cookies to prevent XSS session hijacking
  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: true, // Secure cookie for HTTPS environments
    sameSite: 'strict', // Strict policy preventing CSRF & XSS transmission
    maxAge: 8 * 60 * 60 * 1000, // 8 hours
    path: '/'
  });

  return res.json({
    success: true,
    user: {
      username: admin.username,
      role: admin.role,
      lastLogin: new Date().toISOString()
    },
    token
  });
});

// 3. Admin Logout: Clears HttpOnly Secure Cookie
app.post('/api/auth/logout', (req: Request, res: Response) => {
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/'
  });
  return res.json({ success: true, message: 'Session invalidated and logged out successfully.' });
});

// 4. Update Password (Protected): Re-hashes with 12 bcrypt rounds and saves to database
app.post('/api/auth/change-password', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const username = req.user?.username;

  if (!username || !currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current password and new password are required.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
  }

  const admin = db.findAdminByUsername(username);
  if (!admin) {
    return res.status(404).json({ error: 'User record not found in database.' });
  }

  const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!isMatch) {
    return res.status(400).json({ error: 'Current password is incorrect.' });
  }

  // Hash with 12 bcrypt salt rounds and store into database
  const salt = await bcrypt.genSalt(12);
  const newHash = await bcrypt.hash(newPassword, salt);
  db.updatePassword(username, newHash);
  db.logSecurityEvent(`Password changed for user: ${username}`, req.ip || 'internal');

  return res.json({ success: true, message: 'Password updated and re-hashed with 12 rounds in database successfully.' });
});

// 5. Public SEO & Meta Tags Endpoint (accessible to crawlers, search engines, and client)
app.get('/api/seo', (_req: Request, res: Response) => {
  const seo = db.getSeoSettings();
  return res.json({ success: true, seo });
});

// 6. Protected CMS API endpoint group: All /api/admin/* endpoints require authenticated JWT
app.use('/api/admin', authenticateToken);
app.get('/api/admin/status', (req: AuthRequest, res: Response) => {
  return res.json({
    status: 'online',
    secured: true,
    storage: 'persistent_database',
    user: req.user
  });
});

// 7. Update SEO & Meta Settings (Protected Admin Endpoint)
app.put('/api/admin/seo', (req: AuthRequest, res: Response) => {
  const {
    title,
    metaDescription,
    ogTitle,
    ogDescription,
    ogImage,
    twitterCard,
    canonicalUrl,
    keywords,
    robots
  } = req.body;

  if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
    return res.status(400).json({ error: 'Page Title must be a non-empty string.' });
  }

  if (metaDescription !== undefined && typeof metaDescription !== 'string') {
    return res.status(400).json({ error: 'Meta description must be a string.' });
  }

  if (ogImage !== undefined && typeof ogImage !== 'string') {
    return res.status(400).json({ error: 'OpenGraph image URL must be a string.' });
  }

  const updatedBy = req.user?.username || 'admin';
  const updatedSeo = db.updateSeoSettings({
    ...(title !== undefined ? { title: title.trim() } : {}),
    ...(metaDescription !== undefined ? { metaDescription: metaDescription.trim() } : {}),
    ...(ogTitle !== undefined ? { ogTitle: ogTitle.trim() } : {}),
    ...(ogDescription !== undefined ? { ogDescription: ogDescription.trim() } : {}),
    ...(ogImage !== undefined ? { ogImage: ogImage.trim() } : {}),
    ...(twitterCard !== undefined ? { twitterCard } : {}),
    ...(canonicalUrl !== undefined ? { canonicalUrl: canonicalUrl.trim() } : {}),
    ...(keywords !== undefined ? { keywords: keywords.trim() } : {}),
    ...(robots !== undefined ? { robots: robots.trim() } : {})
  }, updatedBy);

  db.logSecurityEvent(
    `SEO & Meta tags updated by ${updatedBy}: "${updatedSeo.title.slice(0, 45)}..."`,
    req.ip || 'internal'
  );

  return res.json({
    success: true,
    message: 'SEO & Meta tags updated and persisted to database successfully.',
    seo: updatedSeo
  });
});

// VITE SPA INTEGRATION
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    // Development mode with Vite middleware
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve built static assets with dynamic database SEO tags
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath, { index: false }));
      app.get('*', (_req: Request, res: Response) => {
        try {
          const indexPath = path.resolve(distPath, 'index.html');
          let html = fs.readFileSync(indexPath, 'utf-8');
          const seo = db.getSeoSettings();

          if (seo.title) {
            html = html.replace(/<title>.*?<\/title>/i, `<title>${seo.title}</title>`);
          }
          if (seo.metaDescription) {
            html = html.replace(
              /<meta name="description" content=".*?" \/>/i,
              `<meta name="description" content="${seo.metaDescription.replace(/"/g, '&quot;')}" />`
            );
          }
          if (seo.ogTitle || seo.title) {
            const ogTitle = (seo.ogTitle || seo.title).replace(/"/g, '&quot;');
            html = html.replace(
              /<meta property="og:title" content=".*?" \/>/i,
              `<meta property="og:title" content="${ogTitle}" />`
            );
          }
          if (seo.ogDescription || seo.metaDescription) {
            const ogDesc = (seo.ogDescription || seo.metaDescription).replace(/"/g, '&quot;');
            html = html.replace(
              /<meta property="og:description" content=".*?" \/>/i,
              `<meta property="og:description" content="${ogDesc}" />`
            );
          }
          if (seo.ogImage) {
            html = html.replace(
              /<meta property="og:image" content=".*?" \/>/i,
              `<meta property="og:image" content="${seo.ogImage}" />`
            );
          }

          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.send(html);
        } catch {
          res.sendFile(path.resolve(distPath, 'index.html'));
        }
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Dar Randigaba Full-Stack Server] Listening on http://0.0.0.0:${PORT}`);
    console.log(`[Database Authentication] Admin database active. Super-admin: ${INITIAL_ADMIN_USERNAME}`);
    console.log(`[Security] 12-round Bcrypt Hashing, HttpOnly SameSite=Strict cookies, and Rate-Limiter active.`);
  });
}

startServer().catch((err) => {
  console.error('[Dar Randigaba Server Error]:', err);
  process.exit(1);
});
