const db = require('./db');

class Analytics {
  static log(data) {
    const stmt = db.prepare(`
      INSERT INTO analytics (event_type, newsletter_id, subscriber_id, deal_id, metadata, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    return stmt.run(
      data.event_type,
      data.newsletter_id || null,
      data.subscriber_id || null,
      data.deal_id || null,
      JSON.stringify(data.metadata || {}),
      data.ip_address || null,
      data.user_agent || null
    );
  }

  static getByType(eventType, limit = 100) {
    return db.prepare(`
      SELECT * FROM analytics 
      WHERE event_type = ? 
      ORDER BY created_at DESC 
      LIMIT ?
    `).all(eventType, limit);
  }

  static getStats(days = 30) {
    return db.prepare(`
      SELECT 
        event_type,
        COUNT(*) as count,
        DATE(created_at) as date
      FROM analytics 
      WHERE created_at >= datetime('now', '-' || ? || ' days')
      GROUP BY event_type, DATE(created_at)
      ORDER BY date DESC
    `).all(days);
  }

  static getDashboardStats() {
    const subscriberStats = db.prepare(`
      SELECT 
        COUNT(CASE WHEN event_type = 'subscribe' THEN 1 END) as new_subscribers,
        COUNT(CASE WHEN event_type = 'unsubscribe' THEN 1 END) as unsubscribes
      FROM analytics 
      WHERE created_at >= datetime('now', '-7 days')
    `).get();

    const engagementStats = db.prepare(`
      SELECT 
        COUNT(CASE WHEN event_type = 'open' THEN 1 END) as opens,
        COUNT(CASE WHEN event_type = 'click' THEN 1 END) as clicks
      FROM analytics 
      WHERE created_at >= datetime('now', '-7 days')
    `).get();

    const pageViews = db.prepare(`
      SELECT COUNT(*) as views
      FROM analytics 
      WHERE event_type = 'page_view' AND created_at >= datetime('now', '-7 days')
    `).get();

    return {
      ...subscriberStats,
      ...engagementStats,
      page_views: pageViews.views
    };
  }

  static getSubscriberGrowth(days = 30) {
    return db.prepare(`
      SELECT 
        DATE(created_at) as date,
        COUNT(CASE WHEN event_type = 'subscribe' THEN 1 END) as subscribed,
        COUNT(CASE WHEN event_type = 'unsubscribe' THEN 1 END) as unsubscribed
      FROM analytics 
      WHERE created_at >= datetime('now', '-' || ? || ' days')
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `).all(days);
  }

  static getTopDealsClicked(limit = 10) {
    return db.prepare(`
      SELECT 
        d.id,
        d.product_name,
        s.name as store_name,
        COUNT(a.id) as click_count
      FROM analytics a
      JOIN deals d ON a.deal_id = d.id
      JOIN stores s ON d.store_id = s.id
      WHERE a.event_type = 'click' AND a.deal_id IS NOT NULL
      GROUP BY d.id
      ORDER BY click_count DESC
      LIMIT ?
    `).all(limit);
  }

  static cleanup(days = 90) {
    return db.prepare(`
      DELETE FROM analytics 
      WHERE created_at < datetime('now', '-' || ? || ' days')
    `).run(days);
  }
}

module.exports = Analytics;
