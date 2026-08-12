import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-context";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "RDH Globals — International Trade House | Makhana & Home Textiles Exporter",
    template: "%s | RDH Globals",
  },
  description:
    "RDH Globals is a premier Indian International Trade House specializing in premium Makhana (fox nuts) and luxury home textiles. FSSAI, APEDA, ISO certified. Exporting to 12+ countries.",
  keywords: [
    "RDH Globals",
    "RDH Globals International Trade House",
    "makhana exporter India",
    "fox nuts wholesale supplier",
    "Indian home textiles exporter",
    "hotel linen supplier India",
    "bedsheets exporter",
    "premium makhana export",
    "APEDA registered exporter",
    "FSSAI certified food exporter",
  ],
  authors: [{ name: "RDH Globals" }],
  creator: "RDH Globals",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rdhglobals.com",
    siteName: "RDH Globals International Trade House",
    title: "RDH Globals — International Trade House | Premium Indian Makhana & Home Textiles Exporter",
    description:
      "Two premium product divisions. One export standard you can verify. Makhana & home textiles exported to 12+ countries by RDH Globals.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RDH Globals — International Trade House",
    description:
      "Trusted Indian export house. FSSAI, APEDA, ISO certified. Shipping to 12+ countries.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Schema.org JSON-LD for Organization
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RDH Globals",
  alternateName: "RDH Globals International Trade House",
  url: "https://rdhglobals.com",
  logo: "https://rdhglobals.com/images/logo.jpeg",
  description:
    "RDH Globals is a premier Indian International Trade House specializing in premium Makhana (fox nuts) and luxury home textiles. FSSAI, APEDA, ISO certified.",
  foundingLocation: { "@type": "Place", name: "Gujarat, India" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "export@rdhglobals.com",
    contactType: "sales",
  },
  areaServed: ["US", "CA", "AE", "GB", "AU", "DE", "SG"],
  knowsAbout: [
    "Makhana export from India",
    "Fox nuts wholesale",
    "Indian home textiles export",
    "Hotel linen supply",
    "Bedsheets export",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="food" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
