import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Ticket } from "@/lib/models/Ticket";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ token: string }> };

export async function GET(_req: Request, { params }: RouteParams) {
  try {
    const { token } = await params;

    await connectDB();

    const ticket = await Ticket.findOne({ conversationToken: token })
      .select("ticketId customerName subject description status messages createdAt")
      .lean();

    if (!ticket) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    return NextResponse.json({ ticket });
  } catch (error) {
    console.error("Conversation fetch error:", error);
    return NextResponse.json({ error: "Failed to load conversation" }, { status: 500 });
  }
}
