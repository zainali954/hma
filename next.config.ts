import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure external images for blog posts
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compress responses
  compress: true,

  // Disable source maps in production (improves performance)
  productionBrowserSourceMaps: false,

  // Add security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https:; frame-src 'self' https://www.google.com https://maps.google.com https://www.google.com/maps/; object-src 'none'; base-uri 'self'; form-action 'self';",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-site",
          },
        ],
      },
    ];
  },

  // Power efficient data fetching
  httpAgentOptions: {
    keepAlive: true,
  },

  // 301 redirects for retired service slugs after the 2026 business-formation pivot
  async redirects() {
    return [
      { source: "/services/company-formation", destination: "/services/business-setup", permanent: true },
      { source: "/services/business-advisory", destination: "/services/business-setup", permanent: true },
      { source: "/services/corporate-tax", destination: "/services/tax-vat-compliance", permanent: true },
      { source: "/services/tax-consultancy", destination: "/services/tax-vat-compliance", permanent: true },
      { source: "/services/accounting", destination: "/services/accounting-bookkeeping", permanent: true },
      { source: "/services/bookkeeping", destination: "/services/accounting-bookkeeping", permanent: true },
    ];
  },
};

export default nextConfig;
