import dynamic from 'next/dynamic';

// Minimal server wrapper: dynamically import client dashboard without SSR
const DashboardClient = dynamic(() => import('./DashboardClient'), { ssr: false });

export default function Page() {
  return <DashboardClient />;
}

// NOTE: The full dashboard UI must live in `app/store/dashboard/DashboardClient.tsx` as a "use client" component.
// Move any browser-only libraries (framer-motion, window, navigator, etc.) into that file to avoid server-time errors.


