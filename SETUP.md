# NL Grocery Deals Newsletter Platform - Setup Guide

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd nl-grocery-deals-newsletter

# Install dependencies
npm install

# Initialize the database
npm run init-db

# Seed with sample data (optional)
npm run seed

# Start the server
npm start
```

The application will be available at:
- **Website:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin

### Default Admin Credentials

- **Username:** `admin`
- **Password:** `admin123`

> ⚠️ **Important:** Change these credentials in production by editing the `.env` file.

---

## 📁 Project Structure

```
nl-grocery-deals-newsletter/
├── src/
│   ├── models/          # Database models
│   │   ├── db.js        # Database connection
│   │   ├── Deal.js      # Deal model
│   │   ├── Store.js     # Store model
│   │   ├── Subscriber.js# Subscriber model
│   │   ├── Newsletter.js# Newsletter model
│   │   ├── Tip.js       # Tip model
│   │   └── Analytics.js # Analytics model
│   ├── routes/          # Express routes
│   │   ├── public.js    # Public website routes
│   │   ├── api.js       # REST API routes
│   │   └── admin.js     # Admin panel routes
│   ├── views/           # EJS templates
│   │   ├── partials/    # Header, footer
│   │   ├── admin/       # Admin panel views
│   │   └── *.ejs        # Public page templates
│   ├── public/          # Static assets
│   │   ├── css/         # Stylesheets
│   │   ├── js/          # Client-side JavaScript
│   │   └── images/      # Images
│   ├── templates/       # Newsletter templates
│   ├── utils/           # Utility functions
│   │   ├── initDb.js    # Database initialization
│   │   ├── seedData.js  # Sample data seeder
│   │   └── newsletterGenerator.js
│   └── server.js        # Main application entry
├── data/                # SQLite database files
├── .env                 # Environment configuration
├── .env.example         # Example environment file
├── package.json
├── README.md            # Newsletter guide
└── SETUP.md             # This file
```

---

## ⚙️ Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here

# Email Configuration (for sending newsletters)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=newsletter@nlgrocerydeals.ca
FROM_NAME=NL Grocery Deals

# Site Configuration
SITE_URL=http://localhost:3000
SITE_NAME=NL Grocery Deals Newsletter
```

---

## 📊 Features

### Public Website

- **Homepage** - Featured deals, top savings, daily tip
- **Deals Page** - Browse and filter all active deals
- **Stores Page** - Store directory with locations
- **Tips Page** - Shopping tips and loyalty program guides
- **Subscribe** - Newsletter sign-up form

### Admin Dashboard

- **Dashboard** - Overview stats, recent deals, new subscribers
- **Deals Management** - Add, edit, delete deals; toggle featured
- **Stores Management** - Manage store directory
- **Subscribers** - View and manage email list
- **Newsletters** - Create, preview, and send newsletters
- **Tips** - Add and manage shopping tips

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/deals` | List all deals |
| GET | `/api/deals/:id` | Get single deal |
| GET | `/api/stores` | List all stores |
| GET | `/api/stores/:id` | Get single store |
| GET | `/api/tips` | List all tips |
| GET | `/api/tips/random` | Get random tip |
| POST | `/api/subscribe` | Subscribe to newsletter |
| GET | `/api/stats` | Get platform statistics |

---

## 🗄️ Database

The platform uses SQLite for simplicity. The database is stored in `data/newsletter.db`.

### Tables

- `stores` - Grocery store directory
- `deals` - Current and past deals
- `subscribers` - Newsletter subscribers
- `newsletters` - Sent newsletters
- `newsletter_deals` - Junction table for newsletter-deal relationships
- `tips` - Shopping tips
- `analytics` - Event tracking

### Database Commands

```bash
# Initialize database
npm run init-db

# Seed with sample data
npm run seed
```

---

## 🎨 Customization

### Styling

Main CSS files are located in `src/public/css/`:

- `style.css` - Public website styles
- `admin.css` - Admin panel styles

CSS variables are defined at the top of `style.css` for easy theme customization:

```css
:root {
  --primary: #1e3a5f;
  --accent: #ff6b35;
  --success: #28a745;
  /* ... more variables */
}
```

### Newsletter Templates

Newsletter HTML is generated in `src/utils/newsletterGenerator.js`. Customize the template by editing this file.

---

## 🚢 Deployment

### Production Checklist

1. [ ] Change admin credentials in `.env`
2. [ ] Set `NODE_ENV=production`
3. [ ] Configure SMTP settings for email sending
4. [ ] Set up a process manager (PM2, systemd)
5. [ ] Configure a reverse proxy (nginx, Caddy)
6. [ ] Set up SSL/TLS certificates
7. [ ] Configure a backup strategy for the database

### Using PM2

```bash
# Install PM2
npm install -g pm2

# Start the application
pm2 start src/server.js --name "nl-grocery-deals"

# Save process list
pm2 save

# Set up startup script
pm2 startup
```

### Using Docker (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

RUN npm run init-db

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t nl-grocery-deals .
docker run -p 3000:3000 -v $(pwd)/data:/app/data nl-grocery-deals
```

---

## 📧 Email Setup

To send newsletters, configure SMTP settings:

### Gmail (with App Password)

1. Enable 2-factor authentication on your Google account
2. Generate an App Password: Google Account > Security > App Passwords
3. Use the app password in `.env`:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
```

### Other Providers

- **SendGrid:** `smtp.sendgrid.net`, port 587
- **Mailgun:** `smtp.mailgun.org`, port 587
- **Amazon SES:** `email-smtp.region.amazonaws.com`, port 587

---

## 🔒 Security Considerations

1. **Change default credentials** - Update `ADMIN_USERNAME` and `ADMIN_PASSWORD`
2. **Use HTTPS** - Set up SSL/TLS in production
3. **Rate limiting** - Already configured for API routes
4. **CASL compliance** - Newsletter includes unsubscribe links
5. **Input validation** - Using express-validator
6. **Helmet** - Security headers are configured

---

## 🛠️ Development

### Running in Development Mode

```bash
npm run dev
```

This uses nodemon to auto-restart on file changes.

### Adding New Stores

1. Go to Admin Panel > Stores > Add Store
2. Or add directly to `src/utils/seedData.js` and re-run `npm run seed`

### Adding New Deals

1. Go to Admin Panel > Deals > Add Deal
2. Select a store, enter product details, prices, and dates
3. Toggle "Featured" to highlight on homepage

---

## 📞 Support

For issues or feature requests, please open an issue on GitHub.

---

## 📄 License

MIT License - See LICENSE file for details.
