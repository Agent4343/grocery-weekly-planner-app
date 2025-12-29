# Grocery Weekly Planner App

A modern web application built with Next.js for planning weekly grocery shopping and meal preparation.

## Features

- 📅 Weekly meal planning
- 🛒 Automated grocery list generation
- 💳 Stripe payment integration
- 🔐 Supabase authentication and database
- 🎨 Beautiful UI with Radix UI components
- 🌙 Dark mode support with next-themes
- 📊 Data visualization with Recharts

## Tech Stack

- **Framework:** Next.js 15.3.8
- **UI Components:** Radix UI, Tailwind CSS
- **Database:** Supabase
- **Payment:** Stripe
- **Forms:** React Hook Form with Zod validation
- **Icons:** Lucide React
- **Date Handling:** date-fns, React Day Picker

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Agent4343/grocery-weekly-planner-app.git
cd grocery-weekly-planner-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with your configuration:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
grocery-weekly-planner-app/
├── app/              # Next.js app directory
├── components/       # React components
├── public/          # Static assets
├── styles/          # Global styles
└── ...
```

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.
