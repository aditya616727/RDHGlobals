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
    default: "RDH Globals — International Trade House | Makhana, Amla & Home Textiles Exporter",
    template: "%s | RDH Globals",
  },
  description:
    "RDH Globals is a premier Indian International Trade House specializing in premium Makhana (fox nuts), fresh & processed Amla (Indian gooseberry), and luxury home textiles. FSSAI, APEDA certified. Exporting to 12+ countries.",
  keywords: [
    "Makhana Supplier in India",
    "Makhana Supplier from India",
    "Makhana Exporter from India",
    "Makhana Manufacturer in India",
    "Amla Supplier in India",
    "Amla Exporter from India",
    "Indian Gooseberry Exporter",
    "Fresh Amla Exporter",
    "Organic Amla Powder Supplier",
    "Amla Candy Manufacturer",
    "Cold Pressed Amla Juice Exporter",
    "Roasted Makhana Supplier in India",
    "Flavoured Makhana Supplier in India",
    "Roasted Makhana Supplier in USA",
    "Flavoured Makhana Supplier in USA",
    "Makhana Supplier from India to USA",
    "Makhana Exporter from India to USA",
    "Amla Exporter from India to USA",
    "Roasted Makhana Supplier in UAE",
    "Flavoured Makhana Supplier in UAE",
    "Makhana Supplier from India to UAE",
    "Makhana Exporter from India to UAE",
    "Amla Supplier from India to UAE",
    "Roasted Makhana Supplier in UK",
    "Flavoured Makhana Supplier in UK",
    "Makhana Supplier from India to UK",
    "Makhana Exporter from India to UK",
    "Roasted Makhana Supplier in Canada",
    "Flavoured Makhana Supplier in Canada",
    "Makhana Supplier from India to Canada",
    "Makhana Exporter from India to Canada",
    "Roasted Makhana Supplier in Australia",
    "Flavoured Makhana Supplier in Australia",
    "Makhana Supplier from India to Australia",
    "Makhana Exporter from India to Australia",
    "Roasted Makhana Supplier in Malaysia",
    "Flavoured Makhana Supplier in Malaysia",
    "Makhana Supplier from India to Malaysia",
    "Makhana Exporter from India to Malaysia",
    "Roasted Makhana Supplier in Bangladesh",
    "Flavoured Makhana Supplier in Bangladesh",
    "Makhana Supplier from India to Bangladesh",
    "Makhana Exporter from India to Bangladesh",
    "Roasted Makhana Supplier in Maldives",
    "Flavoured Makhana Supplier in Maldives",
    "Makhana Supplier from India to Maldives",
    "Makhana Exporter from India to Maldives",
    "Roasted Makhana Supplier in Thailand",
    "Flavoured Makhana Supplier in Thailand",
    "Makhana Supplier from India to Thailand",
    "Makhana Exporter from India to Thailand",
    "Roasted Makhana Supplier in Sri Lanka",
    "Flavoured Makhana Supplier in Sri Lanka",
    "Makhana Supplier from India to Sri Lanka",
    "Makhana Exporter from India to Sri Lanka",
    "RDH Globals",
    "fox nuts wholesale supplier",
    "Indian gooseberry bulk export",
    "Indian home textiles exporter",
    "hotel linen supplier India",
    "bedsheets exporter",
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
    title: "RDH Globals — International Trade House | Premium Indian Makhana, Amla & Home Textiles Exporter",
    description:
      "Direct Indian exporter & manufacturer of raw, roasted & flavoured makhana (fox nuts), fresh and processed Amla products, and luxury home textiles. Shipping to USA, UAE, UK, Canada, Australia, Malaysia & worldwide.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RDH Globals — International Trade House",
    description:
      "Premier Indian Makhana, Amla & Textile Exporter. FSSAI & APEDA certified. Shipping container loads worldwide.",
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
    "RDH Globals is a premier Indian International Trade House and direct manufacturer/exporter of premium raw, roasted, and flavoured Makhana (fox nuts), fresh & processed Amla (Indian gooseberry), and hospitality home textiles.",
  foundingLocation: { "@type": "Place", name: "Kanpur, Uttar Pradesh, India" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "1061/18 Chandan Nagar Sanigawan Road",
    addressLocality: "Kanpur",
    addressRegion: "Uttar Pradesh",
    postalCode: "208021",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "export@rdhglobals.com",
    contactType: "sales",
  },
  areaServed: ["US", "CA", "AE", "GB", "AU", "MY", "BD", "MV", "TH", "LK", "DE", "SG", "NL", "NP"],
  knowsAbout: [
    "Makhana Exporter from India",
    "Amla Exporter from India",
    "Indian Gooseberry Wholesale Exporter",
    "Roasted Makhana Supplier in USA",
    "Flavoured Makhana Supplier in UAE",
    "Makhana Supplier from India to UK",
    "Makhana Exporter from India to Canada",
    "Makhana Supplier from India to Australia",
    "Makhana Exporter from India to Malaysia",
    "Makhana Supplier from India to Bangladesh",
    "Makhana Supplier from India to Maldives",
    "Makhana Supplier from India to Thailand",
    "Makhana Supplier from India to Sri Lanka",
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
