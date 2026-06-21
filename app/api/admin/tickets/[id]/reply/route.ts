import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Ticket } from "@/lib/models/Ticket";
import { getCurrentUser } from "@/lib/auth";
import { sendTicketReply } from "@/lib/email";
import bus from "@/lib/event-bus";

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

    const newMessage = {
      sender: "admin" as const,
      senderName: user.username,
      senderEmail: "admin@hmadubai.com",
      content: content.trim(),
      createdAt: new Date(),
    };

    ticket.messages.push(newMessage);

    if (ticket.status === "open") {
      ticket.status = "in-progress";
    }

    await ticket.save();

    // Push to any open conversation page via SSE (non-blocking)
    if (ticket.conversationToken) {
      bus.emit(`conv:${ticket.conversationToken}`, {
        type: "message",
        message: {
          sender: "admin",
          senderName: user.username,
          content: content.trim(),
          createdAt: newMessage.createdAt.toISOString(),
        },
      });
    }

    // Email customer (non-blocking)
    sendTicketReply({
      ticketId: ticket.ticketId,
      customerName: ticket.customerName,
      customerEmail: ticket.customerEmail,
      subject: ticket.subject,
      replyContent: content.trim(),
      adminName: user.username,
      conversationToken: ticket.conversationToken,
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
