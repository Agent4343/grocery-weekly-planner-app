const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const Deal = require('../models/Deal');
const Store = require('../models/Store');
const Subscriber = require('../models/Subscriber');
const Newsletter = require('../models/Newsletter');
const Tip = require('../models/Tip');
const Analytics = require('../models/Analytics');

// Middleware to validate API requests
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// ============== DEALS API ==============

// Get all deals
router.get('/deals', (req, res) => {
  try {
    const { region, category, chain, featured, limit } = req.query;
    const filters = {};
    
    if (region) filters.region = region;
    if (category) filters.category = category;
    if (chain) filters.chain = chain;
    if (featured === 'true') filters.featured = true;
    if (limit) filters.limit = parseInt(limit);

    const deals = Deal.getAll(filters);
    res.json({ success: true, data: deals, count: deals.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single deal
router.get('/deals/:id', (req, res) => {
  try {
    const deal = Deal.getById(req.params.id);
    if (!deal) {
      return res.status(404).json({ success: false, error: 'Deal not found' });
    }
    res.json({ success: true, data: deal });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get featured deals
router.get('/deals/featured/:limit?', (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 5;
    const deals = Deal.getFeatured(limit);
    res.json({ success: true, data: deals });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get deal categories
router.get('/categories', (req, res) => {
  try {
    const categories = Deal.getCategories();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============== STORES API ==============

// Get all stores
router.get('/stores', (req, res) => {
  try {
    const { region, chain, city, type } = req.query;
    const filters = {};
    
    if (region) filters.region = region;
    if (chain) filters.chain = chain;
    if (city) filters.city = city;
    if (type) filters.store_type = type;

    const stores = Store.getAll(filters);
    res.json({ success: true, data: stores, count: stores.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single store
router.get('/stores/:id', (req, res) => {
  try {
    const store = Store.getById(req.params.id);
    if (!store) {
      return res.status(404).json({ success: false, error: 'Store not found' });
    }
    res.json({ success: true, data: store });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get regions
router.get('/regions', (req, res) => {
  try {
    const regions = Store.getRegions();
    res.json({ success: true, data: regions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get chains
router.get('/chains', (req, res) => {
  try {
    const chains = Store.getChains();
    res.json({ success: true, data: chains });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============== SUBSCRIBERS API ==============

// Subscribe
router.post('/subscribe', [
  body('email').isEmail().normalizeEmail(),
  body('first_name').optional().trim().escape(),
  body('last_name').optional().trim().escape(),
  body('region').optional().isIn(['Avalon', 'Central', 'Western', 'Labrador', 'All'])
], validateRequest, (req, res) => {
  try {
    const { email, first_name, last_name, region } = req.body;
    
    const existing = Subscriber.getByEmail(email);
    if (existing) {
      if (existing.is_active) {
        return res.status(400).json({ success: false, error: 'Email already subscribed' });
      }
      Subscriber.reactivate(existing.id);
      return res.json({ success: true, message: 'Subscription reactivated', data: { id: existing.id } });
    }

    const subscriber = Subscriber.create({
      email,
      first_name,
      last_name,
      region: region || 'All'
    });

    Analytics.log({
      event_type: 'subscribe',
      subscriber_id: subscriber.id,
      ip_address: req.ip
    });

    // Auto-verify in development
    if (process.env.NODE_ENV === 'development') {
      Subscriber.verify(subscriber.verificationToken);
    }

    res.status(201).json({ 
      success: true, 
      message: 'Subscribed successfully',
      data: { id: subscriber.id }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============== TIPS API ==============

// Get all tips
router.get('/tips', (req, res) => {
  try {
    const { category, limit } = req.query;
    const filters = {};
    if (category) filters.category = category;
    if (limit) filters.limit = parseInt(limit);

    const tips = Tip.getAll(filters);
    res.json({ success: true, data: tips });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get random tip
router.get('/tips/random', (req, res) => {
  try {
    const tip = Tip.getRandom(1)[0];
    res.json({ success: true, data: tip });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============== STATS API ==============

router.get('/stats', (req, res) => {
  try {
    const deals = Deal.getStats();
    const stores = Store.getStats();
    const subscribers = Subscriber.getStats();
    const newsletters = Newsletter.getStats();

    res.json({
      success: true,
      data: {
        deals,
        stores,
        subscribers,
        newsletters
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
