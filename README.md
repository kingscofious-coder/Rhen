```bash
<<<<<<< HEAD
   git clone https://github.com/kingscofious-coder/Rhen.git
   cd Rhen
=======
   git clone https://github.com/yourusername/rhenstore.git
   cd rhenstore
>>>>>>> 862698adc94b68668c094eafdf73bb61c6886ee9
   ```
=======
1. Clone the repository:
   ```bash
   git clone https://github.com/kingscofious-coder/Rhen.git
   cd Rhen
   ```

---

## Deployment & Environment Variables ✅

Authentication requires Supabase to be configured at build time. Set the following environment variables in your hosting provider (Production and Preview builds):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- (Optional) `NEXT_PUBLIC_SITE_URL` — used for password reset redirects

Examples:

- Vercel: Project Settings → Environment Variables → Add keys for Production and Preview → Redeploy
- Netlify/Render: Add project environment variables in their settings and trigger a redeploy

Local testing:

1. Create a `.env.local` at the project root with the same keys
2. Run `npm run dev` and verify sign up / login

If these keys are missing at build time, the app shows a friendly notice and authentication functions will return a helpful error.
