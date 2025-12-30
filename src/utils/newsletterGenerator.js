/**
 * Newsletter HTML Generator
 * Generates responsive HTML emails for the NL Grocery Deals Newsletter
 */

function formatPrice(price) {
  return `$${parseFloat(price).toFixed(2)}`;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getCategoryEmoji(category) {
  const emojis = {
    produce: '🥬',
    meat: '🥩',
    dairy: '🥛',
    bakery: '🍞',
    frozen: '🧊',
    pantry: '🥫',
    beverages: '🥤',
    snacks: '🍿',
    household: '🧹',
    personal_care: '🧴',
    other: '📦'
  };
  return emojis[category] || '📦';
}

function generateNewsletterHTML(options) {
  const {
    deals = [],
    tip = null,
    customIntro = '',
    date = new Date(),
    unsubscribeUrl = '{{unsubscribe_url}}'
  } = options;

  // Group deals by region
  const dealsByRegion = deals.reduce((acc, deal) => {
    const region = deal.region || 'All Regions';
    if (!acc[region]) acc[region] = [];
    acc[region].push(deal);
    return acc;
  }, {});

  // Featured deals (highest discounts)
  const featuredDeals = [...deals]
    .sort((a, b) => (b.discount_percent || 0) - (a.discount_percent || 0))
    .slice(0, 4);

  // Loyalty deals
  const loyaltyDeals = deals.filter(d => d.loyalty_points > 0);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NL Grocery Deals - ${formatDate(date)}</title>
  <style>
    /* Reset */
    body, table, td, p, a, li { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    
    /* Base */
    body {
      margin: 0 !important;
      padding: 0 !important;
      background-color: #f4f4f4;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    
    .header {
      background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
      padding: 30px 20px;
      text-align: center;
    }
    
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    
    .header .date {
      color: #a8d4ff;
      font-size: 14px;
      margin-top: 8px;
    }
    
    .content {
      padding: 30px 20px;
    }
    
    .intro {
      font-size: 16px;
      color: #333;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    
    .section {
      margin-bottom: 35px;
    }
    
    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #1e3a5f;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 3px solid #ff6b35;
    }
    
    .deal-card {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 15px;
      border-left: 4px solid #ff6b35;
    }
    
    .deal-card.featured {
      background: linear-gradient(135deg, #fff5f0 0%, #fff 100%);
      border-left-color: #ff6b35;
    }
    
    .deal-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 10px;
    }
    
    .deal-name {
      font-size: 18px;
      font-weight: 600;
      color: #1e3a5f;
      margin: 0 0 5px 0;
    }
    
    .deal-store {
      font-size: 13px;
      color: #666;
    }
    
    .deal-prices {
      text-align: right;
    }
    
    .price-sale {
      font-size: 24px;
      font-weight: 700;
      color: #28a745;
    }
    
    .price-regular {
      font-size: 14px;
      color: #999;
      text-decoration: line-through;
    }
    
    .discount-badge {
      display: inline-block;
      background: #ff6b35;
      color: white;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 15px;
      margin-top: 5px;
    }
    
    .points-badge {
      display: inline-block;
      background: #6f42c1;
      color: white;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 15px;
      margin-top: 5px;
    }
    
    .deal-meta {
      font-size: 13px;
      color: #666;
      margin-top: 10px;
    }
    
    .tip-box {
      background: linear-gradient(135deg, #e8f4fd 0%, #d4e9f7 100%);
      border-radius: 8px;
      padding: 20px;
      margin: 30px 0;
    }
    
    .tip-box h3 {
      color: #1e3a5f;
      margin: 0 0 10px 0;
      font-size: 16px;
    }
    
    .tip-box p {
      color: #333;
      margin: 0;
      line-height: 1.6;
    }
    
    .region-header {
      background: #f0f4f8;
      padding: 10px 15px;
      border-radius: 5px;
      margin: 20px 0 15px 0;
      font-weight: 600;
      color: #1e3a5f;
    }
    
    .cta-button {
      display: inline-block;
      background: #ff6b35;
      color: white !important;
      text-decoration: none;
      padding: 15px 30px;
      border-radius: 5px;
      font-weight: 600;
      font-size: 16px;
      margin: 20px 0;
    }
    
    .footer {
      background: #1e3a5f;
      padding: 30px 20px;
      text-align: center;
    }
    
    .footer p {
      color: #a8d4ff;
      font-size: 13px;
      margin: 5px 0;
    }
    
    .footer a {
      color: #ffffff;
      text-decoration: underline;
    }
    
    .social-links {
      margin: 15px 0;
    }
    
    .social-links a {
      display: inline-block;
      margin: 0 10px;
      color: #ffffff;
      text-decoration: none;
    }
    
    /* Mobile responsive */
    @media screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 20px 15px !important; }
      .header h1 { font-size: 24px !important; }
      .deal-card { padding: 15px !important; }
      .deal-name { font-size: 16px !important; }
      .price-sale { font-size: 20px !important; }
    }
  </style>
</head>
<body>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <table role="presentation" class="container" width="600" cellspacing="0" cellpadding="0" border="0">
          
          <!-- Header -->
          <tr>
            <td class="header">
              <h1>🛒 NL Grocery Deals</h1>
              <p class="date">${formatDate(date)}</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td class="content">
              
              <!-- Intro -->
              <p class="intro">
                ${customIntro || `Good morning! Here are today's best grocery deals across Newfoundland & Labrador. Save big on your weekly shop! 💰`}
              </p>
              
              ${featuredDeals.length > 0 ? `
              <!-- Featured Deals -->
              <div class="section">
                <h2 class="section-title">🔥 Top Deals Today</h2>
                ${featuredDeals.map(deal => `
                <div class="deal-card featured">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="vertical-align: top;">
                        <p class="deal-name">${getCategoryEmoji(deal.category)} ${deal.product_name}</p>
                        <p class="deal-store">${deal.store_name} - ${deal.city}</p>
                        ${deal.description ? `<p class="deal-meta">${deal.description}</p>` : ''}
                      </td>
                      <td style="vertical-align: top; text-align: right; width: 120px;">
                        <p class="price-sale">${formatPrice(deal.sale_price)}</p>
                        ${deal.regular_price ? `<p class="price-regular">${formatPrice(deal.regular_price)}</p>` : ''}
                        ${deal.discount_percent ? `<span class="discount-badge">Save ${Math.round(deal.discount_percent)}%</span>` : ''}
                        ${deal.loyalty_points > 0 ? `<br><span class="points-badge">+${deal.loyalty_points} pts</span>` : ''}
                      </td>
                    </tr>
                  </table>
                  <p class="deal-meta">Valid: ${deal.start_date} to ${deal.end_date}${deal.unit !== 'each' ? ` • ${deal.unit}` : ''}</p>
                </div>
                `).join('')}
              </div>
              ` : ''}
              
              ${loyaltyDeals.length > 0 ? `
              <!-- Loyalty Deals -->
              <div class="section">
                <h2 class="section-title">💳 Bonus Points Offers</h2>
                ${loyaltyDeals.slice(0, 3).map(deal => `
                <div class="deal-card">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="vertical-align: top;">
                        <p class="deal-name">${deal.product_name}</p>
                        <p class="deal-store">${deal.store_name} • ${deal.loyalty_program || 'Loyalty Program'}</p>
                      </td>
                      <td style="vertical-align: top; text-align: right; width: 120px;">
                        <p class="price-sale">${formatPrice(deal.sale_price)}</p>
                        <span class="points-badge">+${deal.loyalty_points} pts</span>
                      </td>
                    </tr>
                  </table>
                </div>
                `).join('')}
              </div>
              ` : ''}
              
              ${tip ? `
              <!-- Tip of the Day -->
              <div class="tip-box">
                <h3>💡 ${tip.title}</h3>
                <p>${tip.content}</p>
              </div>
              ` : ''}
              
              <!-- CTA -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="{{site_url}}/deals" class="cta-button">View All Deals →</a>
              </div>
              
              <!-- Disclaimer -->
              <p style="font-size: 12px; color: #999; text-align: center; margin-top: 30px;">
                Prices and availability may vary by location. Please confirm with your local store before shopping.
                Deals are valid while supplies last.
              </p>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td class="footer">
              <p><strong>NL Grocery Deals Newsletter</strong></p>
              <p>Helping Newfoundlanders save money on groceries</p>
              <div class="social-links">
                <a href="#">Facebook</a> |
                <a href="#">Twitter</a> |
                <a href="{{site_url}}">Website</a>
              </div>
              <p style="margin-top: 20px;">
                <a href="${unsubscribeUrl}">Unsubscribe</a> |
                <a href="{{site_url}}/preferences">Update Preferences</a>
              </p>
              <p style="font-size: 11px; margin-top: 15px;">
                © ${new Date().getFullYear()} NL Grocery Deals. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

module.exports = { generateNewsletterHTML, formatPrice, formatDate, getCategoryEmoji };
