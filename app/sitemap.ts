import type { MetadataRoute } from "next";
import { servicesData } from "@/lib/services-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://hmaadubai.com";
  const now = new Date();

  // Static top-level routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl,                lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${baseUrl}/services`,  lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${baseUrl}/about`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog`,      lastModified: now, changeFrequency: "weekly",  priority: 0.6 },
  ];

  // Service detail pages — business-setup gets a small priority boost as our primary offer
  const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: s.slug === "business-setup" ? 0.95 : 0.85,
  }));

  // Dynamic blog posts
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { connectDB } = await import("@/lib/db");
    const { BlogPost } = await import("@/lib/models/BlogPost");
    await connectDB();
    const posts = await BlogPost.find({ published: true })
      .select("slug updatedAt")
      .lean();

    blogRoutes = posts.map((post: { slug: string; updatedAt?: Date }) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));
  } catch {
    // If DB is not available at build time, ship the sitemap without blog routes.
  }

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
