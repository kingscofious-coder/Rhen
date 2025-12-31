import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { isAuthConfigured } from "../lib/supabaseClient";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rhen-fashion.vercel.app"), // Replace with your actual domain
  title: {
    default: "Rhen | Luxury Fashion & Style",
    template: "%s | Rhen",
  },
  description:
    "Discover unique pieces from our exclusive collection. Rhen brings you the future of fashion with hand-picked items you won't find anywhere else.",
  keywords: ["fashion", "luxury", "streetwear", "exclusive", "rhen store"],
  authors: [{ name: "Rhen Team" }],
  openGraph: {
    title: "Rhen | Luxury Fashion & Style",
    description: "Discover unique pieces from our exclusive collection.",
    siteName: "Rhen",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rhen | Luxury Fashion & Style",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Site-wide notice when auth isn't configured */}
          {!isAuthConfigured && (
            <div className="w-full bg-yellow-50 text-yellow-900 border-b border-yellow-200 text-center py-2 text-sm">
              <div className="max-w-6xl mx-auto px-4">
                <strong>Notice:</strong> Authentication is not configured — signups/logins may not work. Please set <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in your deployment provider and redeploy.
              </div>
            </div>
          )}

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}