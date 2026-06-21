import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Ticket } from "@/lib/models/Ticket";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    await connectDB();

    // Build filter
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { ticketId: { $regex: search, $options: "i" } },
        { customerName: { $regex: search, $options: "i" } },
        { customerEmail: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Ticket.countDocuments(filter);
    const tickets = await Ticket.find(filter)
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-messages -internalNotes")
      .lean();

    // Get counts for status summary
    const [openCount, inProgressCount, closedCount] = await Promise.all([
      Ticket.countDocuments({ ...filter, status: "open" }),
      Ticket.countDocuments({ ...filter, status: "in-progress" }),
      Ticket.countDocuments({ ...filter, status: "closed" }),
    ]);

    return NextResponse.json({
      tickets,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
      summary: { open: openCount, inProgress: inProgressCount, closed: closedCount, total },
    });
  } catch (error) {
    console.error("Tickets fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}
