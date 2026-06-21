import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Ticket } from "@/lib/models/Ticket";
import { getCurrentUser } from "@/lib/auth";

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { content } = body;

    if (!content?.trim()) {
      return NextResponse.json(
        { error: "Note content is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    ticket.internalNotes.push({
      content: content.trim(),
      createdAt: new Date(),
    });

    await ticket.save();

    return NextResponse.json({ ticket: ticket.toObject() });
  } catch (error) {
    console.error("Ticket note error:", error);
    return NextResponse.json(
      { error: "Failed to add note" },
      { status: 500 }
    );
  }
}
