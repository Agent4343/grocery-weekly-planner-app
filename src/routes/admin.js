const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const Deal = require('../models/Deal');
const Store = require('../models/Store');
const Subscriber = require('../models/Subscriber');
const Newsletter = require('../models/Newsletter');
const Tip = require('../models/Tip');
const Analytics = require('../models/Analytics');
const { generateNewsletterHTML } = require('../utils/newsletterGenerator');

// Simple session-based auth (in production, use proper session management)
const sessions = new Map();

// Auth middleware
const requireAuth = (req, res, next) => {
  const sessionId = req.headers['x-session-id'] || req.query.session;
  
  if (sessions.has(sessionId)) {
    req.user = sessions.get(sessionId);
    return next();
  }
  
  // For browser requests, redirect to login
  if (req.accepts('html')) {
    return res.redirect('/admin/login');
  }
  
  res.status(401).json({ success: false, error: 'Unauthorized' });
};

// ============== AUTH ROUTES ==============

router.get('/login', (req, res) => {
  res.render('admin/login', { 
    title: 'Admin Login',
    error: req.query.error 
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const sessionId = require('crypto').randomBytes(32).toString('hex');
    sessions.set(sessionId, { username, loginTime: new Date() });
    
    // Set cookie for browser
    res.cookie('session', sessionId, { 
      httpOnly: true, 
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    return res.redirect('/admin/dashboard?session=' + sessionId);
  }
  
  res.redirect('/admin/login?error=Invalid credentials');
});

router.get('/logout', (req, res) => {
  const sessionId = req.query.session || req.cookies?.session;
  if (sessionId) {
    sessions.delete(sessionId);
  }
  res.clearCookie('session');
  res.redirect('/admin/login');
});

// Cookie parser middleware for admin routes
router.use((req, res, next) => {
  if (!req.query.session && req.headers.cookie) {
    const cookies = req.headers.cookie.split(';').reduce((acc, c) => {
      const [key, val] = c.trim().split('=');
      acc[key] = val;
      return acc;
    }, {});
    if (cookies.session) {
      req.query.session = cookies.session;
    }
  }
  next();
});

// ============== DASHBOARD ==============

router.get('/dashboard', requireAuth, (req, res) => {
  try {
    const dealStats = Deal.getStats();
    const storeStats = Store.getStats();
    const subscriberStats = Subscriber.getStats();
    const newsletterStats = Newsletter.getStats();
    const analyticsStats = Analytics.getDashboardStats();
    const recentDeals = Deal.getAll({ limit: 5 });
    const recentSubscribers = Subscriber.getRecentSubscribers(7);
    const recentNewsletters = Newsletter.getRecent(3);

    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      session: req.query.session,
      dealStats,
      storeStats,
      subscriberStats,
      newsletterStats,
      analyticsStats,
      recentDeals,
      recentSubscribers,
      recentNewsletters
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).render('error', { title: 'Error', message: 'Failed to load dashboard' });
  }
});

// ============== DEALS MANAGEMENT ==============

router.get('/deals', requireAuth, (req, res) => {
  try {
    const { region, category, active } = req.query;
    const filters = { active_only: active !== 'false' };
    if (region) filters.region = region;
    if (category) filters.category = category;

    const deals = Deal.getAll(filters);
    const stores = Store.getAll();
    const categories = Deal.getCategories();
    const regions = Store.getRegions();

    res.render('admin/deals', {
      title: 'Manage Deals',
      session: req.query.session,
      deals,
      stores,
      categories,
      regions,
      activeFilters: { region, category }
    });
  } catch (error) {
    console.error('Deals management error:', error);
    res.status(500).render('error', { title: 'Error', message: 'Failed to load deals' });
  }
});

router.get('/deals/new', requireAuth, (req, res) => {
  const stores = Store.getAll();
  res.render('admin/deal-form', {
    title: 'Add New Deal',
    session: req.query.session,
    deal: null,
    stores,
    categories: ['produce', 'meat', 'dairy', 'bakery', 'frozen', 'pantry', 'beverages', 'snacks', 'household', 'personal_care', 'other']
  });
});

router.post('/deals', requireAuth, [
  body('store_id').isInt(),
  body('product_name').notEmpty().trim(),
  body('category').notEmpty(),
  body('sale_price').isFloat({ min: 0 }),
  body('start_date').isDate(),
  body('end_date').isDate()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const deal = Deal.create(req.body);
    
    if (req.accepts('json')) {
      return res.status(201).json({ success: true, data: deal });
    }
    res.redirect('/admin/deals?session=' + req.query.session);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/deals/:id/edit', requireAuth, (req, res) => {
  try {
    const deal = Deal.getById(req.params.id);
    if (!deal) {
      return res.status(404).render('404', { title: 'Deal Not Found' });
    }

    const stores = Store.getAll();
    res.render('admin/deal-form', {
      title: 'Edit Deal',
      session: req.query.session,
      deal,
      stores,
      categories: ['produce', 'meat', 'dairy', 'bakery', 'frozen', 'pantry', 'beverages', 'snacks', 'household', 'personal_care', 'other']
    });
  } catch (error) {
    res.status(500).render('error', { title: 'Error', message: 'Failed to load deal' });
  }
});

router.post('/deals/:id', requireAuth, (req, res) => {
  try {
    const deal = Deal.update(req.params.id, req.body);
    
    if (req.accepts('json')) {
      return res.json({ success: true, data: deal });
    }
    res.redirect('/admin/deals?session=' + req.query.session);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/deals/:id/toggle-featured', requireAuth, (req, res) => {
  try {
    const deal = Deal.toggleFeatured(req.params.id);
    res.json({ success: true, data: deal });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/deals/:id', requireAuth, (req, res) => {
  try {
    Deal.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============== STORES MANAGEMENT ==============

router.get('/stores', requireAuth, (req, res) => {
  try {
    const { region, chain } = req.query;
    const filters = {};
    if (region) filters.region = region;
    if (chain) filters.chain = chain;

    const stores = Store.getAll(filters);
    const regions = Store.getRegions();
    const chains = Store.getChains();

    res.render('admin/stores', {
      title: 'Manage Stores',
      session: req.query.session,
      stores,
      regions,
      chains,
      activeFilters: { region, chain }
    });
  } catch (error) {
    res.status(500).render('error', { title: 'Error', message: 'Failed to load stores' });
  }
});

router.get('/stores/new', requireAuth, (req, res) => {
  res.render('admin/store-form', {
    title: 'Add New Store',
    session: req.query.session,
    store: null,
    regions: ['Avalon', 'Central', 'Western', 'Labrador'],
    storeTypes: ['grocery', 'discount', 'wholesale', 'specialty', 'farmers_market']
  });
});

router.post('/stores', requireAuth, [
  body('name').notEmpty().trim(),
  body('chain').notEmpty().trim(),
  body('city').notEmpty().trim(),
  body('region').isIn(['Avalon', 'Central', 'Western', 'Labrador'])
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const store = Store.create(req.body);
    
    if (req.accepts('json')) {
      return res.status(201).json({ success: true, data: store });
    }
    res.redirect('/admin/stores?session=' + req.query.session);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/stores/:id/edit', requireAuth, (req, res) => {
  try {
    const store = Store.getById(req.params.id);
    if (!store) {
      return res.status(404).render('404', { title: 'Store Not Found' });
    }

    res.render('admin/store-form', {
      title: 'Edit Store',
      session: req.query.session,
      store,
      regions: ['Avalon', 'Central', 'Western', 'Labrador'],
      storeTypes: ['grocery', 'discount', 'wholesale', 'specialty', 'farmers_market']
    });
  } catch (error) {
    res.status(500).render('error', { title: 'Error', message: 'Failed to load store' });
  }
});

router.post('/stores/:id', requireAuth, (req, res) => {
  try {
    const store = Store.update(req.params.id, req.body);
    
    if (req.accepts('json')) {
      return res.json({ success: true, data: store });
    }
    res.redirect('/admin/stores?session=' + req.query.session);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/stores/:id', requireAuth, (req, res) => {
  try {
    Store.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============== SUBSCRIBERS MANAGEMENT ==============

router.get('/subscribers', requireAuth, (req, res) => {
  try {
    const { region, status } = req.query;
    const filters = {};
    if (region) filters.region = region;
    if (status === 'verified') filters.verified_only = true;
    if (status === 'premium') filters.premium_only = true;
    if (status === 'inactive') filters.active_only = false;

    const subscribers = Subscriber.getAll(filters);
    const stats = Subscriber.getStats();

    res.render('admin/subscribers', {
      title: 'Manage Subscribers',
      session: req.query.session,
      subscribers,
      stats,
      activeFilters: { region, status }
    });
  } catch (error) {
    res.status(500).render('error', { title: 'Error', message: 'Failed to load subscribers' });
  }
});

router.delete('/subscribers/:id', requireAuth, (req, res) => {
  try {
    Subscriber.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============== NEWSLETTER MANAGEMENT ==============

router.get('/newsletters', requireAuth, (req, res) => {
  try {
    const newsletters = Newsletter.getAll();
    const stats = Newsletter.getStats();

    res.render('admin/newsletters', {
      title: 'Manage Newsletters',
      session: req.query.session,
      newsletters,
      stats
    });
  } catch (error) {
    res.status(500).render('error', { title: 'Error', message: 'Failed to load newsletters' });
  }
});

router.get('/newsletters/new', requireAuth, (req, res) => {
  try {
    const deals = Deal.getAll({ limit: 50 });
    const tips = Tip.getAll();

    res.render('admin/newsletter-form', {
      title: 'Create Newsletter',
      session: req.query.session,
      newsletter: null,
      deals,
      tips
    });
  } catch (error) {
    res.status(500).render('error', { title: 'Error', message: 'Failed to load form' });
  }
});

router.post('/newsletters/generate', requireAuth, (req, res) => {
  try {
    const { deal_ids, tip_id, custom_intro } = req.body;
    
    const deals = deal_ids ? deal_ids.map(id => Deal.getById(id)).filter(Boolean) : Deal.getFeatured(5);
    const tip = tip_id ? Tip.getById(tip_id) : Tip.getRandom(1)[0];
    
    const html = generateNewsletterHTML({
      deals,
      tip,
      customIntro: custom_intro,
      date: new Date()
    });

    res.json({ success: true, data: { html } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/newsletters', requireAuth, (req, res) => {
  try {
    const { subject, preview_text, content_html, deal_ids, status } = req.body;
    
    const newsletter = Newsletter.create({
      subject,
      preview_text,
      content_html,
      status: status || 'draft'
    });

    if (deal_ids && deal_ids.length > 0) {
      Newsletter.setDeals(newsletter.id, deal_ids);
    }

    if (req.accepts('json')) {
      return res.status(201).json({ success: true, data: newsletter });
    }
    res.redirect('/admin/newsletters?session=' + req.query.session);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/newsletters/:id', requireAuth, (req, res) => {
  try {
    const newsletter = Newsletter.getWithDeals(req.params.id);
    if (!newsletter) {
      return res.status(404).render('404', { title: 'Newsletter Not Found' });
    }

    res.render('admin/newsletter-preview', {
      title: 'Preview Newsletter',
      session: req.query.session,
      newsletter
    });
  } catch (error) {
    res.status(500).render('error', { title: 'Error', message: 'Failed to load newsletter' });
  }
});

router.delete('/newsletters/:id', requireAuth, (req, res) => {
  try {
    Newsletter.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============== TIPS MANAGEMENT ==============

router.get('/tips', requireAuth, (req, res) => {
  try {
    const tips = Tip.getAll();
    const categories = Tip.getCategories();

    res.render('admin/tips', {
      title: 'Manage Tips',
      session: req.query.session,
      tips,
      categories
    });
  } catch (error) {
    res.status(500).render('error', { title: 'Error', message: 'Failed to load tips' });
  }
});

router.post('/tips', requireAuth, [
  body('title').notEmpty().trim(),
  body('content').notEmpty().trim(),
  body('category').isIn(['general', 'couponing', 'loyalty', 'meal_planning', 'seasonal'])
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const tip = Tip.create(req.body);
    res.status(201).json({ success: true, data: tip });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/tips/:id', requireAuth, (req, res) => {
  try {
    Tip.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
