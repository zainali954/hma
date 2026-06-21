import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Ticket } from "@/lib/models/Ticket";
import { sendCustomerReplyNotification } from "@/lib/email";
import bus from "@/lib/event-bus";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ token: string }> };

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { token } = await params;
    const body = await request.json();
    const { content } = body;

    if (!content?.trim()) {
      return NextResponse.json({ error: "Message content is required" }, { status: 400 });
    }

    await connectDB();

    const ticket = await Ticket.findOne({ conversationToken: token });
    if (!ticket) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    if (ticket.status === "closed") {
      return NextResponse.json(
        { error: "This conversation has been closed. Please start a new inquiry." },
        { status: 400 }
      );
    }

    const newMessage = {
      sender: "customer" as const,
      senderName: ticket.customerName,
      senderEmail: ticket.customerEmail,
      content: content.trim(),
      createdAt: new Date(),
    };

    ticket.messages.push(newMessage);
    await ticket.save();

    // Broadcast to any connected SSE clients for this conversation
    bus.emit(`conv:${token}`, {
      type: "message",
      message: {
        sender: "customer",
        senderName: ticket.customerName,
        content: content.trim(),
        createdAt: newMessage.createdAt.toISOString(),
      },
    });

    // Notify admin of customer follow-up (non-blocking)
    sendCustomerReplyNotification({
      ticketId: ticket.ticketId,
      ticketMongoId: ticket._id.toString(),
      customerName: ticket.customerName,
      customerEmail: ticket.customerEmail,
      subject: ticket.subject,
      replyContent: content.trim(),
    }).catch((err) => console.error("[email] Admin notification failed:", err));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Conversation reply error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
