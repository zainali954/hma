import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/lib/models/BlogPost";
import { ContactMessage } from "@/lib/models/ContactMessage";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const [totalPosts, publishedPosts, totalMessages, unreadMessages] =
      await Promise.all([
        BlogPost.countDocuments(),
        BlogPost.countDocuments({ published: true }),
        ContactMessage.countDocuments(),
        ContactMessage.countDocuments({ read: false }),
      ]);

    // Get recent posts
    const recentPosts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title slug published createdAt")
      .lean();

    // Get recent messages
    const recentMessages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return NextResponse.json({
      stats: {
        totalPosts,
        publishedPosts,
        draftPosts: totalPosts - publishedPosts,
        totalMessages,
        unreadMessages,
      },
      recentPosts,
      recentMessages,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
