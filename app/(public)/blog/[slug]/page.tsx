import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/lib/models/BlogPost";
import { FiCalendar, FiUser, FiArrowLeft, FiArrowRight, FiTag } from "react-icons/fi";
import AnimatedSection from "@/components/animations/AnimatedSection";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    await connectDB();
    const post = await BlogPost.findOne({ slug, published: true }).lean();

    if (!post) {
      return { title: "Post Not Found" };
    }

    const robots = post.noIndex || post.noFollow
      ? {
          ...(post.noIndex ? { index: false } : {}),
          ...(post.noFollow ? { follow: false } : {}),
        }
      : undefined;

    return {
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt || `Read about ${post.title} on HMA Dubai blog`,
      alternates: {
        canonical: post.canonicalUrl || `https://hmaadubai.com/blog/${post.slug}`,
      },
      ...(robots ? { robots } : {}),
      openGraph: {
        title: post.ogTitle || post.seoTitle || `${post.title} | HMA Dubai`,
        description: post.ogDescription || post.metaDescription || post.excerpt || "",
        type: "article",
        publishedTime: post.createdAt?.toISOString(),
        authors: [post.author],
        images: post.ogImage
          ? [post.ogImage]
          : post.coverImage
          ? [post.coverImage]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: post.ogTitle || post.seoTitle || post.title,
        description: post.ogDescription || post.metaDescription || post.excerpt || "",
        images: post.ogImage
          ? [post.ogImage]
          : post.coverImage
          ? [post.coverImage]
          : [],
      },
    };
  } catch {
    return { title: "HMA Dubai Blog" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  try {
    await connectDB();
    const [post, otherPosts] = await Promise.all([
      BlogPost.findOne({ slug, published: true }).lean(),
      BlogPost.find({ slug: { $ne: slug }, published: true })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("title slug excerpt tags createdAt coverImage")
        .lean(),
    ]);

    if (!post) {
      notFound();
    }

    return (
      <>
        {/* Article Header */}
        <section className="pt-24 sm:pt-32 pb-14 sm:pb-16 bg-navy-950 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #C59D4B 0%, transparent 60%)" }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatedSection>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-gold-400 text-sm mb-8 transition-colors"
              >
                <FiArrowLeft size={16} />
                Back to Blog
              </Link>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="text-xs font-medium text-gold-200 bg-gold-400/15 px-3 py-1 rounded-full border border-gold-400/20">
                      <FiTag size={12} className="inline mr-1" />{tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 max-w-4xl">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1.5"><FiUser size={14} />{post.author}</span>
                <span className="flex items-center gap-1.5">
                  <FiCalendar size={14} />
                  {new Date(post.createdAt).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </span>
              </div>

              {post.coverImage && (
                <div className="mt-8 rounded-xl overflow-hidden max-w-4xl">
                  <img src={post.coverImage} alt={post.title} width="800" height="400" fetchPriority="high" className="w-full h-auto max-h-[400px] object-cover" />
                </div>
              )}
            </AnimatedSection>
          </div>
        </section>

        {/* Article Content + Sidebar */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_340px] gap-12 items-start">

              {/* Main article */}
              <AnimatedSection direction="left">
                {post.excerpt && (
                  <p className="text-lg text-gray-600 italic mb-8 leading-relaxed border-l-4 border-gold-400 pl-6">
                    {post.excerpt}
                  </p>
                )}
                <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />

                {/* Key Takeaways */}
                {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                  <div className="mt-10 p-6 bg-navy-950 rounded-xl">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gold-400 mb-4">Key Takeaways</h3>
                    <ul className="space-y-3">
                      {post.keyTakeaways.map((takeaway: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gold-400/20 text-gold-400 flex items-center justify-center text-xs font-bold mt-0.5">
                            {i + 1}
                          </span>
                          {takeaway}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* FAQ Section */}
                {post.faqs && post.faqs.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-lg font-bold text-navy-900 mb-6">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      {post.faqs.map((faq: { question: string; answer: string }, i: number) => (
                        <details key={i} className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                          <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-gray-100 transition-colors">
                            <span className="text-sm font-semibold text-navy-900 pr-4">{faq.question}</span>
                            <svg className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </summary>
                          <div className="px-5 pb-4">
                            <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-12 pt-8 border-t border-gray-100">
                  <Link href="/blog" className="group inline-flex items-center gap-2 text-navy-900 font-medium hover:text-gold-600 transition-colors">
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to all articles
                  </Link>
                </div>
              </AnimatedSection>

              {/* Sidebar */}
              <AnimatedSection direction="right" delay={0.15}>
                <aside className="sticky top-28 space-y-6">

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="bg-[#F0F0F0] rounded-xl p-5 border border-gray-200">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Tags</h3>
                      {post.category && (
                        <span className="block text-xs font-medium text-navy-600 mb-2">
                          Category: {post.category}
                        </span>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag: string) => (
                          <span key={tag} className="text-xs font-medium bg-white border border-gray-200 text-navy-700 px-3 py-1.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Other posts */}
                  {otherPosts.length > 0 && (
                    <div className="bg-[#F0F0F0] rounded-xl p-5 border border-gray-200">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">More Articles</h3>
                      <div className="space-y-4">
                        {otherPosts.map((p) => (
                          <Link key={p._id.toString()} href={`/blog/${p.slug}`} className="group flex gap-3 items-start">
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-navy-100">
                              {p.coverImage ? (
                                <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="text-navy-300 font-bold text-lg">H</span>
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-navy-900 group-hover:text-gold-500 transition-colors leading-snug line-clamp-2">
                                {p.title}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {new Date(p.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link href="/blog" className="mt-4 flex items-center gap-1 text-xs font-bold text-gold-500 hover:text-gold-600 transition-colors uppercase tracking-wider">
                        View all posts <FiArrowRight size={12} />
                      </Link>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="bg-navy-950 rounded-xl p-5 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-2">Free Consultation</p>
                    <p className="text-white font-semibold text-sm mb-4 leading-snug">Have a question for our experts?</p>
                    <Link href="/contact" className="block w-full py-2.5 bg-gold-400 text-navy-950 font-bold text-xs rounded-lg hover:bg-gold-300 transition-colors uppercase tracking-wide">
                      Get in Touch
                    </Link>
                  </div>

                </aside>
              </AnimatedSection>

            </div>
          </div>
        </section>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              author: {
                "@type": "Person",
                name: post.author,
              },
              datePublished: post.createdAt,
              dateModified: post.updatedAt,
              ...(post.coverImage
                ? { image: post.coverImage }
                : {}),
              publisher: {
                "@type": "Organization",
                name: "HMA Dubai",
              },
            }),
          }}
        />
      </>
    );
  } catch {
    notFound();
  }
}
