const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const Deal = require('../models/Deal');
const Store = require('../models/Store');
const Subscriber = require('../models/Subscriber');
const Tip = require('../models/Tip');
const Analytics = require('../models/Analytics');

// Homepage
router.get('/', (req, res) => {
  try {
    const featuredDeals = Deal.getFeatured(6);
    const topSavings = Deal.getTopSavings(5);
    const tip = Tip.getRandom(1)[0];
    const stores = Store.getStats();
    const dealStats = Deal.getStats();

    // Log page view
    Analytics.log({
      event_type: 'page_view',
      metadata: { page: 'home' },
      ip_address: req.ip,
      user_agent: req.get('User-Agent')
    });

    res.render('index', {
      title: 'NL Grocery Deals Newsletter',
      featuredDeals,
      topSavings,
      tip,
      stores,
      dealStats
    });
  } catch (error) {
    console.error('Homepage error:', error);
    res.status(500).render('error', { title: 'Error', message: 'Failed to load homepage' });
  }
});

// Deals page
router.get('/deals', (req, res) => {
  try {
    const { region, category, chain } = req.query;
    const filters = {};
    
    if (region) filters.region = region;
    if (category) filters.category = category;
    if (chain) filters.chain = chain;

    const deals = Deal.getAll(filters);
    const categories = Deal.getCategories();
    const regions = Store.getRegions();
    const chains = Store.getChains();

    res.render('deals', {
      title: 'Today\'s Deals - NL Grocery Deals',
      deals,
      categories,
      regions,
      chains,
      activeFilters: { region, category, chain }
    });
  } catch (error) {
    console.error('Deals page error:', error);
    res.status(500).render('error', { title: 'Error', message: 'Failed to load deals' });
  }
});

// Single deal page
router.get('/deals/:id', (req, res) => {
  try {
    const deal = Deal.getById(req.params.id);
    if (!deal) {
      return res.status(404).render('404', { title: 'Deal Not Found' });
    }

    // Log deal view
    Analytics.log({
      event_type: 'click',
      deal_id: deal.id,
      metadata: { page: 'deal_detail' },
      ip_address: req.ip
    });

    res.render('deal-detail', {
      title: `${deal.product_name} - NL Grocery Deals`,
      deal
    });
  } catch (error) {
    console.error('Deal detail error:', error);
    res.status(500).render('error', { title: 'Error', message: 'Failed to load deal' });
  }
});

// Stores directory
router.get('/stores', (req, res) => {
  try {
    const { region, chain, type } = req.query;
    const filters = {};
    
    if (region) filters.region = region;
    if (chain) filters.chain = chain;
    if (type) filters.store_type = type;

    const stores = Store.getAll(filters);
    const regions = Store.getRegions();
    const chains = Store.getChains();

    res.render('stores', {
      title: 'Store Directory - NL Grocery Deals',
      stores,
      regions,
      chains,
      activeFilters: { region, chain, type }
    });
  } catch (error) {
    console.error('Stores page error:', error);
    res.status(500).render('error', { title: 'Error', message: 'Failed to load stores' });
  }
});

// Subscribe page
router.get('/subscribe', (req, res) => {
  res.render('subscribe', {
    title: 'Subscribe - NL Grocery Deals Newsletter',
    success: req.query.success,
    error: req.query.error
  });
});

// Handle subscription
router.post('/subscribe', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('first_name').optional().trim().escape(),
  body('last_name').optional().trim().escape(),
  body('region').optional().isIn(['Avalon', 'Central', 'Western', 'Labrador', 'All'])
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.redirect('/subscribe?error=' + encodeURIComponent(errors.array()[0].msg));
  }

  try {
    const { email, first_name, last_name, region } = req.body;
    
    // Check if already subscribed
    const existing = Subscriber.getByEmail(email);
    if (existing) {
      if (existing.is_active) {
        return res.redirect('/subscribe?error=' + encodeURIComponent('You are already subscribed!'));
      } else {
        // Reactivate
        Subscriber.reactivate(existing.id);
        return res.redirect('/subscribe?success=1&reactivated=1');
      }
    }

    const subscriber = Subscriber.create({
      email,
      first_name,
      last_name,
      region: region || 'All'
    });

    // Log subscription
    Analytics.log({
      event_type: 'subscribe',
      subscriber_id: subscriber.id,
      ip_address: req.ip,
      user_agent: req.get('User-Agent')
    });

    // In production, send verification email here
    // For now, auto-verify in development
    if (process.env.NODE_ENV === 'development') {
      Subscriber.verify(subscriber.verificationToken);
    }

    res.redirect('/subscribe?success=1');
  } catch (error) {
    console.error('Subscription error:', error);
    res.redirect('/subscribe?error=' + encodeURIComponent(error.message || 'Failed to subscribe'));
  }
});

// Email verification
router.get('/verify/:token', (req, res) => {
  try {
    const subscriber = Subscriber.verify(req.params.token);
    if (!subscriber) {
      return res.render('message', {
        title: 'Invalid Link',
        message: 'This verification link is invalid or has expired.',
        type: 'error'
      });
    }

    res.render('message', {
      title: 'Email Verified!',
      message: 'Thank you! Your email has been verified. You\'ll start receiving our daily deals newsletter.',
      type: 'success'
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.render('message', {
      title: 'Error',
      message: 'Failed to verify email. Please try again.',
      type: 'error'
    });
  }
});

// Unsubscribe
router.get('/unsubscribe/:token', (req, res) => {
  try {
    const subscriber = Subscriber.unsubscribe(req.params.token);
    if (!subscriber) {
      return res.render('message', {
        title: 'Invalid Link',
        message: 'This unsubscribe link is invalid.',
        type: 'error'
      });
    }

    // Log unsubscribe
    Analytics.log({
      event_type: 'unsubscribe',
      subscriber_id: subscriber.id,
      ip_address: req.ip
    });

    res.render('message', {
      title: 'Unsubscribed',
      message: 'You have been unsubscribed from our newsletter. We\'re sorry to see you go!',
      type: 'info'
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.render('message', {
      title: 'Error',
      message: 'Failed to unsubscribe. Please try again.',
      type: 'error'
    });
  }
});

// Tips page
router.get('/tips', (req, res) => {
  try {
    const { category } = req.query;
    const filters = category ? { category } : {};
    const tips = Tip.getAll(filters);
    const categories = Tip.getCategories();

    res.render('tips', {
      title: 'Shopping Tips - NL Grocery Deals',
      tips,
      categories,
      activeCategory: category
    });
  } catch (error) {
    console.error('Tips page error:', error);
    res.status(500).render('error', { title: 'Error', message: 'Failed to load tips' });
  }
});

// About page
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About - NL Grocery Deals Newsletter'
  });
});

module.exports = router;
