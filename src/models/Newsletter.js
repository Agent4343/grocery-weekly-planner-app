const db = require('./db');

class Newsletter {
  static getAll(filters = {}) {
    let query = 'SELECT * FROM newsletters WHERE 1=1';
    const params = [];

    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    query += ' ORDER BY created_at DESC';

    if (filters.limit) {
      query += ' LIMIT ?';
      params.push(filters.limit);
    }

    return db.prepare(query).all(...params);
  }

  static getById(id) {
    return db.prepare('SELECT * FROM newsletters WHERE id = ?').get(id);
  }

  static getWithDeals(id) {
    const newsletter = this.getById(id);
    if (!newsletter) return null;

    const deals = db.prepare(`
      SELECT d.*, s.name as store_name, s.chain, s.city, s.region, nd.display_order
      FROM newsletter_deals nd
      JOIN deals d ON nd.deal_id = d.id
      JOIN stores s ON d.store_id = s.id
      WHERE nd.newsletter_id = ?
      ORDER BY nd.display_order
    `).all(id);

    return { ...newsletter, deals };
  }

  static create(data) {
    const stmt = db.prepare(`
      INSERT INTO newsletters (subject, preview_text, content_html, content_text, status, scheduled_for)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      data.subject,
      data.preview_text || null,
      data.content_html,
      data.content_text || null,
      data.status || 'draft',
      data.scheduled_for || null
    );

    return this.getById(result.lastInsertRowid);
  }

  static update(id, data) {
    const stmt = db.prepare(`
      UPDATE newsletters SET
        subject = COALESCE(?, subject),
        preview_text = COALESCE(?, preview_text),
        content_html = COALESCE(?, content_html),
        content_text = COALESCE(?, content_text),
        status = COALESCE(?, status),
        scheduled_for = COALESCE(?, scheduled_for),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      data.subject,
      data.preview_text,
      data.content_html,
      data.content_text,
      data.status,
      data.scheduled_for,
      id
    );

    return this.getById(id);
  }

  static delete(id) {
    // Also delete associated deals
    db.prepare('DELETE FROM newsletter_deals WHERE newsletter_id = ?').run(id);
    return db.prepare('DELETE FROM newsletters WHERE id = ?').run(id);
  }

  static addDeal(newsletterId, dealId, displayOrder = 0) {
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO newsletter_deals (newsletter_id, deal_id, display_order)
      VALUES (?, ?, ?)
    `);
    return stmt.run(newsletterId, dealId, displayOrder);
  }

  static removeDeal(newsletterId, dealId) {
    return db.prepare('DELETE FROM newsletter_deals WHERE newsletter_id = ? AND deal_id = ?')
      .run(newsletterId, dealId);
  }

  static setDeals(newsletterId, dealIds) {
    // Remove existing deals
    db.prepare('DELETE FROM newsletter_deals WHERE newsletter_id = ?').run(newsletterId);
    
    // Add new deals
    const stmt = db.prepare(`
      INSERT INTO newsletter_deals (newsletter_id, deal_id, display_order)
      VALUES (?, ?, ?)
    `);
    
    dealIds.forEach((dealId, index) => {
      stmt.run(newsletterId, dealId, index);
    });
  }

  static markSent(id, recipientsCount) {
    db.prepare(`
      UPDATE newsletters SET
        status = 'sent',
        sent_at = CURRENT_TIMESTAMP,
        recipients_count = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(recipientsCount, id);

    return this.getById(id);
  }

  static incrementStats(id, type) {
    if (type === 'open') {
      db.prepare('UPDATE newsletters SET open_count = open_count + 1 WHERE id = ?').run(id);
    } else if (type === 'click') {
      db.prepare('UPDATE newsletters SET click_count = click_count + 1 WHERE id = ?').run(id);
    }
  }

  static getStats() {
    return db.prepare(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'draft' THEN 1 END) as drafts,
        COUNT(CASE WHEN status = 'sent' THEN 1 END) as sent,
        COUNT(CASE WHEN status = 'scheduled' THEN 1 END) as scheduled,
        SUM(recipients_count) as total_recipients,
        SUM(open_count) as total_opens,
        SUM(click_count) as total_clicks
      FROM newsletters
    `).get();
  }

  static getRecent(limit = 5) {
    return db.prepare(`
      SELECT * FROM newsletters 
      WHERE status = 'sent'
      ORDER BY sent_at DESC
      LIMIT ?
    `).all(limit);
  }
}

module.exports = Newsletter;
