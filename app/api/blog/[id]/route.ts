import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/lib/models/BlogPost";
import { getCurrentUser } from "@/lib/auth";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectDB();

    const post = await BlogPost.findById(id).lean();
    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Blog fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    await connectDB();

    // Sync published with status
    let isPublished = body.published;
    if (body.status === "published") isPublished = true;
    if (body.status === "draft") isPublished = false;

    const updateFields = {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      coverImage: body.coverImage,
      tags: body.tags,
      category: body.category,
      published: isPublished,
      featured: body.featured,
      status: body.status,
      publishDate: body.publishDate,
      seoTitle: body.seoTitle,
      metaDescription: body.metaDescription,
      focusKeyword: body.focusKeyword,
      canonicalUrl: body.canonicalUrl,
      ogTitle: body.ogTitle,
      ogDescription: body.ogDescription,
      ogImage: body.ogImage,
      faqs: body.faqs,
      keyTakeaways: body.keyTakeaways,
      aiSnippet: body.aiSnippet,
      schemaType: body.schemaType,
      howToTotalTime: body.howToTotalTime,
      howToEstimatedCost: body.howToEstimatedCost,
      howToSupply: body.howToSupply,
      noIndex: body.noIndex,
      noFollow: body.noFollow,
    };

    const post = await BlogPost.findByIdAndUpdate(id, updateFields, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Blog update error:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const post = await BlogPost.findByIdAndDelete(id);
    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Blog delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
