const db = require('./db');

class Tip {
  static getAll(filters = {}) {
    let query = 'SELECT * FROM tips WHERE is_active = 1';
    const params = [];

    if (filters.category) {
      query += ' AND category = ?';
      params.push(filters.category);
    }

    query += ' ORDER BY created_at DESC';

    if (filters.limit) {
      query += ' LIMIT ?';
      params.push(filters.limit);
    }

    return db.prepare(query).all(...params);
  }

  static getById(id) {
    return db.prepare('SELECT * FROM tips WHERE id = ?').get(id);
  }

  static getRandom(count = 1) {
    return db.prepare(`
      SELECT * FROM tips 
      WHERE is_active = 1 
      ORDER BY RANDOM() 
      LIMIT ?
    `).all(count);
  }

  static getByCategory(category) {
    return db.prepare('SELECT * FROM tips WHERE category = ? AND is_active = 1').all(category);
  }

  static create(data) {
    const stmt = db.prepare(`
      INSERT INTO tips (title, content, category)
      VALUES (?, ?, ?)
    `);

    const result = stmt.run(
      data.title,
      data.content,
      data.category || 'general'
    );

    return this.getById(result.lastInsertRowid);
  }

  static update(id, data) {
    const stmt = db.prepare(`
      UPDATE tips SET
        title = COALESCE(?, title),
        content = COALESCE(?, content),
        category = COALESCE(?, category)
      WHERE id = ?
    `);

    stmt.run(data.title, data.content, data.category, id);
    return this.getById(id);
  }

  static delete(id) {
    return db.prepare('UPDATE tips SET is_active = 0 WHERE id = ?').run(id);
  }

  static getCategories() {
    return db.prepare(`
      SELECT DISTINCT category, COUNT(*) as count 
      FROM tips 
      WHERE is_active = 1 
      GROUP BY category
    `).all();
  }
}

module.exports = Tip;
