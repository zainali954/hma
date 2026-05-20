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

export const metadata: Metadata = {
  title: {
    default: "HMAA Dubai | Premier Consultancy Agency",
    template: "%s | HMAA Dubai",
  },
  description:
    "HMAA Dubai is a leading consultancy agency offering professional business consulting, strategic planning, market research, and risk management services in Dubai, UAE.",
  keywords: [
    "consultancy",
    "dubai",
    "business consulting",
    "HMAA",
    "UAE",
    "professional services",
    "strategic planning",
    "market research",
    "Dubai consultants",
  ],
  authors: [{ name: "HMAA Dubai" }],
  creator: "HMAA Dubai",
  publisher: "HMAA Dubai",
  metadataBase: new URL("https://hmaadubai.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "HMAA Dubai",
    title: "HMAA Dubai | Premier Consultancy Agency",
    description:
      "Premier consultancy agency in Dubai delivering strategic business solutions with excellence and integrity.",
    url: "https://hmaadubai.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "HMAA Dubai | Premier Consultancy Agency",
    description:
      "Premier consultancy agency in Dubai delivering strategic business solutions with excellence and integrity.",
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
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "HMAA Dubai",
              url: "https://hmaadubai.com",
              logo: "https://hmaadubai.com/logo.png",
              description:
                "Premier consultancy agency in Dubai delivering strategic business solutions.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dubai",
                addressCountry: "AE",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+971 XX XXX XXXX",
                contactType: "customer service",
                email: "info@hmaadubai.com",
              },
              sameAs: [
                "https://www.facebook.com/hmaaudit/",
                "https://www.twitter.com/hmaaudit/",
                "https://www.instagram.com/hmaaudit/",
                "https://www.linkedin.com/in/hmaaudit/",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F0F0F0]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
