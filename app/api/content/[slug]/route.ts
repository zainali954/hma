import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/lib/models/BlogPost";

export const dynamic = "force-dynamic";

// Strips HTML tags to produce a plain-text representation of content.
function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    await connectDB();
    const post = await BlogPost.findOne({ slug, published: true }).lean();

    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const payload = {
      schema_version: "1.0",
      url: `https://hmaadubai.com/blog/${post.slug}`,
      content_feed: `https://hmaadubai.com/api/content/${post.slug}`,
      metadata: {
        title: post.seoTitle || post.title,
        description: post.metaDescription || post.excerpt || "",
        author: post.author,
        published_at: post.createdAt,
        updated_at: post.updatedAt,
        tags: post.tags,
        category: post.category,
        focus_keyword: post.focusKeyword || null,
        schema_type: post.schemaType || "Article",
        ...(post.coverImage ? { cover_image: post.coverImage } : {}),
      },
      ai_snippet: post.aiSnippet || post.excerpt || null,
      key_takeaways: post.keyTakeaways ?? [],
      faqs: (post.faqs ?? []).map((f: { question: string; answer: string }) => ({ q: f.question, a: f.answer })),
      ...(post.schemaType === "HowTo"
        ? {
            how_to: {
              total_time: post.howToTotalTime || null,
              estimated_cost: post.howToEstimatedCost || null,
              supply: post.howToSupply ?? [],
            },
          }
        : {}),
      body_plain: stripHtml(post.content || ""),
    };

    return NextResponse.json(payload, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "X-Content-Type": "machine-readable-article",
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
