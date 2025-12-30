const db = require('./db');

class Deal {
  static getAll(filters = {}) {
    let query = `
      SELECT d.*, s.name as store_name, s.chain, s.city, s.region, s.loyalty_program
      FROM deals d
      JOIN stores s ON d.store_id = s.id
      WHERE d.is_active = 1
    `;
    const params = [];

    if (filters.region) {
      query += ' AND s.region = ?';
      params.push(filters.region);
    }

    if (filters.category) {
      query += ' AND d.category = ?';
      params.push(filters.category);
    }

    if (filters.store_id) {
      query += ' AND d.store_id = ?';
      params.push(filters.store_id);
    }

    if (filters.chain) {
      query += ' AND s.chain = ?';
      params.push(filters.chain);
    }

    if (filters.featured) {
      query += ' AND d.is_featured = 1';
    }

    if (filters.active_only !== false) {
      query += " AND d.start_date <= date('now') AND d.end_date >= date('now')";
    }

    if (filters.has_loyalty_points) {
      query += ' AND d.loyalty_points > 0';
    }

    query += ' ORDER BY d.is_featured DESC, d.discount_percent DESC, d.created_at DESC';

    if (filters.limit) {
      query += ' LIMIT ?';
      params.push(filters.limit);
    }

    return db.prepare(query).all(...params);
  }

  static getById(id) {
    return db.prepare(`
      SELECT d.*, s.name as store_name, s.chain, s.city, s.region, s.loyalty_program
      FROM deals d
      JOIN stores s ON d.store_id = s.id
      WHERE d.id = ?
    `).get(id);
  }

  static getFeatured(limit = 5) {
    return this.getAll({ featured: true, limit });
  }

  static getByRegion(region, limit = 10) {
    return this.getAll({ region, limit });
  }

  static getByCategory(category) {
    return this.getAll({ category });
  }

  static getLoyaltyDeals() {
    return this.getAll({ has_loyalty_points: true });
  }

  static getCategories() {
    return db.prepare(`
      SELECT DISTINCT category, COUNT(*) as count 
      FROM deals 
      WHERE is_active = 1 AND start_date <= date('now') AND end_date >= date('now')
      GROUP BY category 
      ORDER BY count DESC
    `).all();
  }

  static create(data) {
    // Calculate discount percent if not provided
    let discountPercent = data.discount_percent;
    if (!discountPercent && data.regular_price && data.sale_price) {
      discountPercent = Math.round(((data.regular_price - data.sale_price) / data.regular_price) * 100);
    }

    const stmt = db.prepare(`
      INSERT INTO deals (
        store_id, product_name, category, regular_price, sale_price, unit,
        discount_percent, loyalty_points, loyalty_points_value, description,
        start_date, end_date, is_featured, source, image_url
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      data.store_id, data.product_name, data.category,
      data.regular_price, data.sale_price, data.unit || 'each',
      discountPercent, data.loyalty_points || 0, data.loyalty_points_value || 0,
      data.description, data.start_date, data.end_date,
      data.is_featured ? 1 : 0, data.source, data.image_url
    );

    return this.getById(result.lastInsertRowid);
  }

  static update(id, data) {
    let discountPercent = data.discount_percent;
    if (data.regular_price && data.sale_price) {
      discountPercent = Math.round(((data.regular_price - data.sale_price) / data.regular_price) * 100);
    }

    const stmt = db.prepare(`
      UPDATE deals SET
        store_id = COALESCE(?, store_id),
        product_name = COALESCE(?, product_name),
        category = COALESCE(?, category),
        regular_price = COALESCE(?, regular_price),
        sale_price = COALESCE(?, sale_price),
        unit = COALESCE(?, unit),
        discount_percent = COALESCE(?, discount_percent),
        loyalty_points = COALESCE(?, loyalty_points),
        loyalty_points_value = COALESCE(?, loyalty_points_value),
        description = COALESCE(?, description),
        start_date = COALESCE(?, start_date),
        end_date = COALESCE(?, end_date),
        is_featured = COALESCE(?, is_featured),
        source = COALESCE(?, source),
        image_url = COALESCE(?, image_url),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      data.store_id, data.product_name, data.category,
      data.regular_price, data.sale_price, data.unit,
      discountPercent, data.loyalty_points, data.loyalty_points_value,
      data.description, data.start_date, data.end_date,
      data.is_featured !== undefined ? (data.is_featured ? 1 : 0) : null,
      data.source, data.image_url, id
    );

    return this.getById(id);
  }

  static delete(id) {
    return db.prepare('UPDATE deals SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(id);
  }

  static toggleFeatured(id) {
    db.prepare('UPDATE deals SET is_featured = NOT is_featured, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(id);
    return this.getById(id);
  }

  static getStats() {
    return db.prepare(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN is_featured = 1 THEN 1 END) as featured,
        COUNT(CASE WHEN start_date <= date('now') AND end_date >= date('now') THEN 1 END) as active,
        AVG(discount_percent) as avg_discount,
        MAX(discount_percent) as max_discount
      FROM deals WHERE is_active = 1
    `).get();
  }

  static getTopSavings(limit = 10) {
    return db.prepare(`
      SELECT d.*, s.name as store_name, s.chain, s.city, s.region,
             (d.regular_price - d.sale_price) as savings
      FROM deals d
      JOIN stores s ON d.store_id = s.id
      WHERE d.is_active = 1 AND d.start_date <= date('now') AND d.end_date >= date('now')
      ORDER BY d.discount_percent DESC
      LIMIT ?
    `).all(limit);
  }

  static expirePastDeals() {
    return db.prepare(`
      UPDATE deals 
      SET is_active = 0, updated_at = CURRENT_TIMESTAMP 
      WHERE end_date < date('now') AND is_active = 1
    `).run();
  }
}

module.exports = Deal;
