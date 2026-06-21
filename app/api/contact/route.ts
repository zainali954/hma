import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Ticket, generateTicketId } from "@/lib/models/Ticket";
import {
  sendContactConfirmation,
  sendAdminNewTicketNotification,
} from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, category, message, _website } = body;

    // Honeypot check - reject if filled (bot detection)
    if (_website) {
      return NextResponse.json(
        { success: true, message: "Message sent successfully" },
        { status: 201 }
      );
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Create a ticket from the contact form submission
    const ticketId = await generateTicketId();
    const ticket = await Ticket.create({
      ticketId,
      customerName: name,
      customerEmail: email,
      customerPhone: phone || "",
      subject: subject || "Contact Form Inquiry",
      description: message,
      status: "open",
      priority: "medium",
      category: category || "general",
      messages: [],
    });

    // Send acknowledgment to customer (non-blocking)
    sendContactConfirmation({
      customerName: name,
      customerEmail: email,
      category: category || "general",
      message,
    }).catch((err) => console.error("[email] Customer confirmation failed:", err));

    // Notify admin of new ticket (non-blocking)
    sendAdminNewTicketNotification({
      ticketId: ticket.ticketId,
      customerName: name,
      customerEmail: email,
      customerPhone: phone || "",
      subject: subject || "Contact Form Inquiry",
      category: category || "general",
      description: message,
    }).catch((err) => console.error("[email] Admin notification failed:", err));

    return NextResponse.json(
      { success: true, message: "Message sent successfully", ticketId: ticket.ticketId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
