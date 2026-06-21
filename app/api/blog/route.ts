import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/lib/models/BlogPost";
import { getCurrentUser } from "@/lib/auth";
import slugifyLib from "slugify";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const published = searchParams.get("published");
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");

    // Require auth for unpublished or all-posts queries
    if (published === "false" || published === "all") {
      const user = await getCurrentUser();
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    await connectDB();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};

    if (published === "true") query.published = true;
    else if (published === "false") query.published = false;
    else if (published === "all") { /* no filter — return all posts for admin */ }
    else query.published = true; // Default: only published to public

    if (tag) query.tags = tag;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    const total = await BlogPost.countDocuments(query);
    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Blog fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      content,
      excerpt,
      coverImage,
      tags,
      published,
      featured,
      category,
      status,
      publishDate,
      seoTitle,
      metaDescription,
      focusKeyword,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogImage,
      faqs,
      keyTakeaways,
      noIndex,
      noFollow,
    } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    let slug = body.slug || slugifyLib(title, { lower: true, strict: true });

    await connectDB();

    // Check if slug exists and make it unique
    const existingPost = await BlogPost.findOne({ slug });
    if (existingPost) {
      slug = `${slug}-${Date.now()}`;
    }

    // Determine publish status
    let isPublished = published || false;
    let postStatus = status || "draft";
    if (postStatus === "published") isPublished = true;
    if (postStatus === "draft") isPublished = false;

    const post = await BlogPost.create({
      title,
      slug,
      content: content || "",
      excerpt: excerpt || "",
      coverImage: coverImage || "",
      author: user.username,
      tags: tags || [],
      category: category || "",
      published: isPublished,
      featured: featured || false,
      status: postStatus,
      publishDate: publishDate || null,
      seoTitle: seoTitle || "",
      metaDescription: metaDescription || "",
      focusKeyword: focusKeyword || "",
      canonicalUrl: canonicalUrl || "",
      ogTitle: ogTitle || "",
      ogDescription: ogDescription || "",
      ogImage: ogImage || "",
      faqs: faqs || [],
      keyTakeaways: keyTakeaways || [],
      noIndex: noIndex || false,
      noFollow: noFollow || false,
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Blog create error:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
