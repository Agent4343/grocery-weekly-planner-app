const db = require('./db');

class Store {
  static getAll(filters = {}) {
    let query = 'SELECT * FROM stores WHERE is_active = 1';
    const params = [];

    if (filters.region) {
      query += ' AND region = ?';
      params.push(filters.region);
    }

    if (filters.chain) {
      query += ' AND chain = ?';
      params.push(filters.chain);
    }

    if (filters.store_type) {
      query += ' AND store_type = ?';
      params.push(filters.store_type);
    }

    if (filters.city) {
      query += ' AND city LIKE ?';
      params.push(`%${filters.city}%`);
    }

    query += ' ORDER BY region, city, name';
    
    return db.prepare(query).all(...params);
  }

  static getById(id) {
    return db.prepare('SELECT * FROM stores WHERE id = ?').get(id);
  }

  static getByChain(chain) {
    return db.prepare('SELECT * FROM stores WHERE chain = ? AND is_active = 1 ORDER BY region, city').all(chain);
  }

  static getRegions() {
    return db.prepare('SELECT DISTINCT region FROM stores WHERE is_active = 1 ORDER BY region').all();
  }

  static getChains() {
    return db.prepare('SELECT DISTINCT chain FROM stores WHERE is_active = 1 ORDER BY chain').all();
  }

  static getCities() {
    return db.prepare('SELECT DISTINCT city, region FROM stores WHERE is_active = 1 ORDER BY region, city').all();
  }

  static create(data) {
    const stmt = db.prepare(`
      INSERT INTO stores (name, chain, address, city, region, postal_code, phone, website, loyalty_program, store_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      data.name, data.chain, data.address, data.city, data.region,
      data.postal_code, data.phone, data.website, data.loyalty_program, data.store_type || 'grocery'
    );
    
    return this.getById(result.lastInsertRowid);
  }

  static update(id, data) {
    const stmt = db.prepare(`
      UPDATE stores SET
        name = COALESCE(?, name),
        chain = COALESCE(?, chain),
        address = COALESCE(?, address),
        city = COALESCE(?, city),
        region = COALESCE(?, region),
        postal_code = COALESCE(?, postal_code),
        phone = COALESCE(?, phone),
        website = COALESCE(?, website),
        loyalty_program = COALESCE(?, loyalty_program),
        store_type = COALESCE(?, store_type),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    stmt.run(
      data.name, data.chain, data.address, data.city, data.region,
      data.postal_code, data.phone, data.website, data.loyalty_program, data.store_type, id
    );
    
    return this.getById(id);
  }

  static delete(id) {
    return db.prepare('UPDATE stores SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(id);
  }

  static getStats() {
    return db.prepare(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN region = 'Avalon' THEN 1 END) as avalon,
        COUNT(CASE WHEN region = 'Central' THEN 1 END) as central,
        COUNT(CASE WHEN region = 'Western' THEN 1 END) as western,
        COUNT(CASE WHEN region = 'Labrador' THEN 1 END) as labrador
      FROM stores WHERE is_active = 1
    `).get();
  }
}

module.exports = Store;
