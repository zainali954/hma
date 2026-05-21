import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://hmaadubai.com";
const PHONE = "+97145837001";
const EMAIL = "dubai.office@hmaa.ae";

export const metadata: Metadata = {
  title: {
    default: "HMA Dubai | Business Setup & Company Formation Specialists",
    template: "%s | HMA Dubai",
  },
  description:
    "Business setup in Dubai made simple. HMA helps you form mainland, free zone and offshore companies, secure UAE Golden Visa, and stay tax-compliant. Ministry of Economy licensed.",
  keywords: [
    "business setup dubai",
    "company formation dubai",
    "mainland company dubai",
    "free zone setup uae",
    "offshore company uae",
    "golden visa uae",
    "vat registration dubai",
    "corporate tax uae",
    "audit firm dubai",
    "accounting services dubai",
    "HMA dubai",
  ],
  authors: [{ name: "HMA Dubai" }],
  creator: "HMA Dubai",
  publisher: "HMA Dubai",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "HMA Dubai",
    title: "HMA Dubai | Business Setup & Company Formation Specialists",
    description:
      "Mainland, free zone and offshore company formation, Golden Visa, tax and audit — by a Ministry of Economy licensed firm in Business Bay, Dubai.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "HMA Dubai | Business Setup & Company Formation Specialists",
    description:
      "Set up your Dubai company in 3–5 days. Mainland, free zone, offshore, Golden Visa, tax and audit — one Ministry of Economy licensed firm.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
  }),
  category: "business",
};

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "HMA Dubai",
      legalName: "HMA Auditing of Accounts",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      description:
        "Ministry of Economy licensed firm offering business setup, Golden Visa, tax, accounting and audit services in Dubai, UAE.",
      foundingDate: "2017",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Office 1106, Burlington Tower, Business Bay",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: PHONE,
        contactType: "customer service",
        email: EMAIL,
        areaServed: "AE",
        availableLanguage: ["en", "ar"],
      },
      sameAs: [
        "https://www.facebook.com/hmaaudit/",
        "https://www.twitter.com/hmaaudit/",
        "https://www.instagram.com/hmaaudit/",
        "https://www.linkedin.com/in/hmaaudit/",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: "HMA Dubai",
      image: `${SITE_URL}/logo.png`,
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Office 1106, Burlington Tower, Business Bay",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 25.1841,
        longitude: 55.2682,
      },
      areaServed: [
        { "@type": "City", name: "Dubai" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "HMA Dubai Services",
        itemListElement: [
          { "@type": "OfferCatalog", name: "Business Setup in Dubai" },
          { "@type": "OfferCatalog", name: "UAE Golden Visa & Residency" },
          { "@type": "OfferCatalog", name: "Tax & VAT Compliance" },
          { "@type": "OfferCatalog", name: "Accounting & Bookkeeping" },
          { "@type": "OfferCatalog", name: "Audit & Assurance" },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "HMA Dubai",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} antialiased`}
      data-scroll-behavior="smooth"
    >
      <head>
        {/* Preconnect to important origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        {/* JSON-LD Schema (Organization + ProfessionalService + WebSite) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F0F0F0]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
