import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/lib/models/BlogPost";
import { Ticket } from "@/lib/models/Ticket";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const [totalPosts, publishedPosts, totalTickets, openTickets, inProgressTickets, closedTickets] =
      await Promise.all([
        BlogPost.countDocuments(),
        BlogPost.countDocuments({ published: true }),
        Ticket.countDocuments(),
        Ticket.countDocuments({ status: "open" }),
        Ticket.countDocuments({ status: "in-progress" }),
        Ticket.countDocuments({ status: "closed" }),
      ]);

    // Get recent posts
    const recentPosts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title slug published createdAt")
      .lean();

    // Get recent tickets
    const recentTickets = await Ticket.find()
      .sort({ updatedAt: -1 })
      .limit(5)
      .select("ticketId customerName subject status priority category createdAt")
      .lean();

    return NextResponse.json({
      stats: {
        totalPosts,
        publishedPosts,
        draftPosts: totalPosts - publishedPosts,
        totalTickets,
        openTickets,
        inProgressTickets,
        closedTickets,
      },
      recentPosts,
      recentTickets,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
