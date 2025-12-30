const db = require('./db');
const { v4: uuidv4 } = require('uuid');

class Subscriber {
  static getAll(filters = {}) {
    let query = 'SELECT * FROM subscribers WHERE 1=1';
    const params = [];

    if (filters.active_only !== false) {
      query += ' AND is_active = 1';
    }

    if (filters.verified_only) {
      query += ' AND is_verified = 1';
    }

    if (filters.region && filters.region !== 'All') {
      query += ' AND (region = ? OR region = "All")';
      params.push(filters.region);
    }

    if (filters.premium_only) {
      query += ' AND is_premium = 1';
    }

    query += ' ORDER BY subscribed_at DESC';

    if (filters.limit) {
      query += ' LIMIT ?';
      params.push(filters.limit);
    }

    return db.prepare(query).all(...params);
  }

  static getById(id) {
    return db.prepare('SELECT * FROM subscribers WHERE id = ?').get(id);
  }

  static getByEmail(email) {
    return db.prepare('SELECT * FROM subscribers WHERE email = ?').get(email.toLowerCase());
  }

  static getByToken(token, type = 'verification') {
    if (type === 'verification') {
      return db.prepare('SELECT * FROM subscribers WHERE verification_token = ?').get(token);
    }
    return db.prepare('SELECT * FROM subscribers WHERE unsubscribe_token = ?').get(token);
  }

  static create(data) {
    const verificationToken = uuidv4();
    const unsubscribeToken = uuidv4();

    const stmt = db.prepare(`
      INSERT INTO subscribers (
        email, first_name, last_name, region, preferences,
        verification_token, unsubscribe_token
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    try {
      const result = stmt.run(
        data.email.toLowerCase(),
        data.first_name || null,
        data.last_name || null,
        data.region || 'All',
        JSON.stringify(data.preferences || {}),
        verificationToken,
        unsubscribeToken
      );

      return {
        ...this.getById(result.lastInsertRowid),
        verificationToken
      };
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new Error('Email already subscribed');
      }
      throw error;
    }
  }

  static verify(token) {
    const subscriber = this.getByToken(token, 'verification');
    if (!subscriber) return null;

    db.prepare(`
      UPDATE subscribers SET 
        is_verified = 1, 
        verification_token = NULL,
        verified_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(subscriber.id);

    return this.getById(subscriber.id);
  }

  static unsubscribe(token) {
    const subscriber = this.getByToken(token, 'unsubscribe');
    if (!subscriber) return null;

    db.prepare(`
      UPDATE subscribers SET 
        is_active = 0, 
        unsubscribed_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(subscriber.id);

    return this.getById(subscriber.id);
  }

  static update(id, data) {
    const stmt = db.prepare(`
      UPDATE subscribers SET
        first_name = COALESCE(?, first_name),
        last_name = COALESCE(?, last_name),
        region = COALESCE(?, region),
        preferences = COALESCE(?, preferences),
        is_premium = COALESCE(?, is_premium),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      data.first_name,
      data.last_name,
      data.region,
      data.preferences ? JSON.stringify(data.preferences) : null,
      data.is_premium !== undefined ? (data.is_premium ? 1 : 0) : null,
      id
    );

    return this.getById(id);
  }

  static delete(id) {
    return db.prepare('DELETE FROM subscribers WHERE id = ?').run(id);
  }

  static reactivate(id) {
    db.prepare(`
      UPDATE subscribers SET 
        is_active = 1, 
        unsubscribed_at = NULL,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(id);
    return this.getById(id);
  }

  static getStats() {
    return db.prepare(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN is_active = 1 THEN 1 END) as active,
        COUNT(CASE WHEN is_verified = 1 THEN 1 END) as verified,
        COUNT(CASE WHEN is_premium = 1 THEN 1 END) as premium,
        COUNT(CASE WHEN region = 'Avalon' THEN 1 END) as avalon,
        COUNT(CASE WHEN region = 'Central' THEN 1 END) as central,
        COUNT(CASE WHEN region = 'Western' THEN 1 END) as western,
        COUNT(CASE WHEN region = 'Labrador' THEN 1 END) as labrador,
        COUNT(CASE WHEN region = 'All' THEN 1 END) as all_regions
      FROM subscribers
    `).get();
  }

  static getRecentSubscribers(days = 7) {
    return db.prepare(`
      SELECT * FROM subscribers 
      WHERE subscribed_at >= datetime('now', '-' || ? || ' days')
      AND is_active = 1
      ORDER BY subscribed_at DESC
    `).all(days);
  }

  static getForNewsletter(region = null) {
    let query = `
      SELECT * FROM subscribers 
      WHERE is_active = 1 AND is_verified = 1
    `;
    const params = [];

    if (region && region !== 'All') {
      query += ' AND (region = ? OR region = "All")';
      params.push(region);
    }

    return db.prepare(query).all(...params);
  }
}

module.exports = Subscriber;
