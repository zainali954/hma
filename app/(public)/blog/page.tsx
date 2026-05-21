import type { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/lib/models/BlogPost";
import { FiCalendar, FiUser, FiArrowRight } from "react-icons/fi";
import AnimatedSection from "@/components/animations/AnimatedSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Knowledge Hub — Business Setup, Tax & Compliance Insights",
  description:
    "Expert guides on Dubai business setup, UAE Golden Visa, corporate tax, VAT, accounting and audit — written by HMA's chartered accountants.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Knowledge Hub | HMA Dubai",
    description:
      "Practical guides for entrepreneurs setting up and growing a business in the UAE — formation, Golden Visa, tax, accounting and audit.",
    url: "/blog",
  },
};

async function getPosts() {
  try {
    await connectDB();
    const posts = await BlogPost.find({ published: true })
      .sort({ createdAt: -1 })
      .lean();
    return posts;
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-14 sm:pb-20 bg-navy-950 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #C59D4B 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedSection>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600 mb-4">
              H M A Auditing of Accounts
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-5">
              Knowledge Hub
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Insights, expert advice and the latest updates on accounting,
              tax and business advisory in the UAE.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <AnimatedSection className="text-center py-20">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">No Posts Yet</h3>
              <p className="text-gray-600">Check back soon for new articles and insights.</p>
            </AnimatedSection>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <AnimatedSection key={post._id.toString()} delay={i * 0.07}>
                <article
                  className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gold-200 transition-all duration-300 h-full flex flex-col"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Read article: ${post.title}`}
                  >
                    <div className="aspect-[16/9] bg-gradient-to-br from-navy-100 to-navy-200 relative overflow-hidden">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={`Cover image for ${post.title}`}
                          width="400"
                          height="225"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-navy-300 text-4xl font-bold">
                            H
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-6">
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="text-xs font-medium text-gold-700 bg-gold-50 px-2.5 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
                      <h2 className="text-lg font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>
                    {post.excerpt && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <FiUser size={12} aria-hidden="true" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiCalendar size={12} aria-hidden="true" />
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-gold-700 hover:text-gold-600 transition-colors"
                        aria-label={`Read ${post.title}`}
                      >
                        <FiArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
