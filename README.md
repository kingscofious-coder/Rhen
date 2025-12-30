# Rhenstore

A modern fashion e-commerce platform built with Next.js, featuring user authentication, product management, shopping cart, checkout, and a seller dashboard.

## Features

- **User Authentication**: Sign up, login, forgot password, and profile completion
- **Product Management**: Add, edit, and manage fashion products
- **Shopping Cart**: Add items to cart, view cart, and proceed to checkout
- **Checkout Process**: Secure payment processing and order placement
- **Seller Dashboard**: Analytics, insights, marketing tools, reports, and settings
- **Order Management**: View and track orders
- **Responsive Design**: Mobile-friendly interface with dark/light theme toggle

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Styling**: Tailwind CSS, PostCSS
- **Icons**: Custom SVG icons

## Getting Started

### Prerequisites

- Node.js 18+ (check `.nvmrc` for recommended version)
- npm, yarn, pnpm, or bun
- Supabase account and project

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rhenstore.git
   cd rhenstore
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. Run the database setup:
   Execute the SQL in `supabase_setup.sql` in your Supabase SQL editor.

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Home Page**: Browse featured products and navigate to different sections
- **Store**: View all products, filter by category
- **Dashboard**: Manage your store (for sellers)
- **Cart & Checkout**: Add products to cart and complete purchases
- **Orders**: View order history and status

## Project Structure

```
rhenstore/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── cart/              # Shopping cart pages
│   ├── checkout/          # Checkout process
│   ├── dashboard/         # User dashboard
│   ├── login/             # Authentication
│   ├── orders/            # Order management
│   └── store/             # Store pages
├── components/            # Reusable components
├── lib/                   # Utility functions and configs
├── public/                # Static assets
└── styles/                # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Deploy on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new).

1. Connect your GitHub repository to Vercel
2. Add your environment variables in Vercel dashboard
3. Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
