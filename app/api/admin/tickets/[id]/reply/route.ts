import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Ticket } from "@/lib/models/Ticket";
import { getCurrentUser } from "@/lib/auth";
import { sendTicketReply } from "@/lib/email";

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
        { error: "Reply content is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    // Add admin reply to ticket messages
    ticket.messages.push({
      sender: "admin",
      senderName: user.username,
      senderEmail: "admin@hmaadubai.com",
      content: content.trim(),
      createdAt: new Date(),
    });

    // Auto-set status to in-progress if currently open
    if (ticket.status === "open") {
      ticket.status = "in-progress";
    }

    await ticket.save();

    // Send email to customer (non-blocking)
    sendTicketReply({
      ticketId: ticket.ticketId,
      customerName: ticket.customerName,
      customerEmail: ticket.customerEmail,
      subject: ticket.subject,
      replyContent: content.trim(),
      adminName: user.username,
    }).catch((err) => console.error("Email send failed:", err));

    return NextResponse.json({ ticket: ticket.toObject() });
  } catch (error) {
    console.error("Ticket reply error:", error);
    return NextResponse.json(
      { error: "Failed to send reply" },
      { status: 500 }
    );
  }
}
