import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface AdminUserRecord {
  id: string;
  username: string;
  passwordHash: string; // Store ONLY the 12-round bcrypt hash
  role: 'super-admin' | 'admin';
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface SeoSettings {
  title: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: 'summary_large_image' | 'summary';
  canonicalUrl: string;
  keywords: string;
  robots: string;
  updatedAt: string;
  updatedBy: string;
}

export interface DatabaseSchema {
  adminUsers: AdminUserRecord[];
  auditLogs: Array<{ id: string; event: string; ip: string; timestamp: string }>;
  seoSettings?: SeoSettings;
}

const DEFAULT_SEO_SETTINGS: SeoSettings = {
  title: 'Dar Randigaba — Luxury Guest House & Cultural Riad Taroudant',
  metaDescription: 'An artistic Moroccan sanctuary in Taroudant. Experience slow travel, acoustic music salons, courtyard serenity, and authentic editorial hospitality.',
  ogTitle: 'Dar Randigaba — Luxury Guest House & Cultural Riad Taroudant',
  ogDescription: 'An artistic Moroccan home in Taroudant where slow mornings, acoustic music, culture, and warm hospitality meet.',
  ogImage: '/assets/aistudio/logo-randigaba_2x_0bd4f40f.png',
  twitterCard: 'summary_large_image',
  canonicalUrl: 'https://darrandigaba.com',
  keywords: 'Dar Randigaba, Taroudant riad, Morocco luxury guest house, Moroccan sanctuary, slow travel Morocco, boutique hotel Taroudant, cultural riad',
  robots: 'index, follow',
  updatedAt: new Date().toISOString(),
  updatedBy: 'system'
};

const DB_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.join(DB_DIR, 'database.json');

class DatabaseService {
  private data: DatabaseSchema = {
    adminUsers: [],
    auditLogs: [],
    seoSettings: { ...DEFAULT_SEO_SETTINGS }
  };

  constructor() {
    this.ensureDatabaseFile();
    this.load();
  }

  private ensureDatabaseFile() {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true, mode: 0o700 });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initialSchema: DatabaseSchema = {
        adminUsers: [],
        auditLogs: []
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialSchema, null, 2), { encoding: 'utf-8', mode: 0o600 });
    }
  }

  private load() {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      this.data = JSON.parse(content);
      if (!this.data.seoSettings) {
        this.data.seoSettings = { ...DEFAULT_SEO_SETTINGS };
        this.save();
      }
    } catch {
      this.data = {
        adminUsers: [],
        auditLogs: [],
        seoSettings: { ...DEFAULT_SEO_SETTINGS }
      };
    }
  }

  private save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), { encoding: 'utf-8', mode: 0o600 });
    } catch (err) {
      console.error('[DatabaseService] Failed to write database file:', err);
    }
  }

  /**
   * Initializes the database with the initial super-admin from environment variables.
   * Hashes the password with 12 bcrypt salt rounds before writing to disk.
   */
  public initializeSuperAdmin(username: string, plainPassword: string): AdminUserRecord {
    const cleanUsername = username.trim().toLowerCase();
    const existing = this.findAdminByUsername(cleanUsername);

    // High salt rounds factor (12 rounds) as requested
    const SALT_ROUNDS = 12;
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const passwordHash = bcrypt.hashSync(plainPassword, salt);

    if (existing) {
      // Always ensure the database hash matches the secure configured environment password
      existing.passwordHash = passwordHash;
      existing.updatedAt = new Date().toISOString();
      this.save();
      return existing;
    }

    const now = new Date().toISOString();
    const newAdmin: AdminUserRecord = {
      id: 'admin_' + crypto.randomUUID().replace(/-/g, ''),
      username: cleanUsername,
      passwordHash, // Storing only bcrypt hash
      role: 'super-admin',
      createdAt: now,
      updatedAt: now
    };

    this.data.adminUsers.push(newAdmin);
    this.logSecurityEvent(`Super-admin account initialized with 12-round bcrypt hash: ${cleanUsername}`, 'system');
    this.save();
    return newAdmin;
  }

  /**
   * Queries the database for an admin record by username
   */
  public findAdminByUsername(username: string): AdminUserRecord | null {
    const cleanUsername = username.trim().toLowerCase();
    return this.data.adminUsers.find((u) => u.username === cleanUsername) || null;
  }

  /**
   * Updates an admin's password with a new 12-round bcrypt hash
   */
  public updatePassword(username: string, newPasswordHash: string): boolean {
    const cleanUsername = username.trim().toLowerCase();
    const user = this.data.adminUsers.find((u) => u.username === cleanUsername);
    if (!user) return false;

    user.passwordHash = newPasswordHash;
    user.updatedAt = new Date().toISOString();
    this.save();
    return true;
  }

  /**
   * Updates the last login timestamp in the database
   */
  public updateLastLogin(username: string): void {
    const cleanUsername = username.trim().toLowerCase();
    const user = this.data.adminUsers.find((u) => u.username === cleanUsername);
    if (user) {
      user.lastLogin = new Date().toISOString();
      this.save();
    }
  }

  /**
   * Logs security events for auditing
   */
  public logSecurityEvent(event: string, ip: string): void {
    this.data.auditLogs.push({
      id: 'log_' + crypto.randomUUID().slice(0, 8),
      event,
      ip,
      timestamp: new Date().toISOString()
    });
    // Keep max 200 logs
    if (this.data.auditLogs.length > 200) {
      this.data.auditLogs = this.data.auditLogs.slice(-200);
    }
    this.save();
  }

  /**
   * Retrieves current home page SEO and Meta settings
   */
  public getSeoSettings(): SeoSettings {
    if (!this.data.seoSettings) {
      this.data.seoSettings = { ...DEFAULT_SEO_SETTINGS };
      this.save();
    }
    return { ...this.data.seoSettings };
  }

  /**
   * Updates home page SEO and Meta settings in the database
   */
  public updateSeoSettings(patch: Partial<SeoSettings>, updatedBy: string = 'admin'): SeoSettings {
    const current = this.getSeoSettings();
    const updated: SeoSettings = {
      ...current,
      ...patch,
      updatedAt: new Date().toISOString(),
      updatedBy: updatedBy
    };
    this.data.seoSettings = updated;
    this.save();
    return updated;
  }
}

export const db = new DatabaseService();
