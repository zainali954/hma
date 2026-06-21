import { randomUUID } from "crypto";
import mongoose, { Schema, type Document } from "mongoose";

export interface ITicketMessage {
  sender: "customer" | "admin";
  senderName: string;
  senderEmail: string;
  content: string;
  createdAt: Date;
}

export interface ITicketNote {
  content: string;
  createdAt: Date;
}

export interface ITicket extends Document {
  ticketId: string;
  conversationToken: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  subject: string;
  description: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
  category: string;
  messages: ITicketMessage[];
  internalNotes: ITicketNote[];
  createdAt: Date;
  updatedAt: Date;
}

const TicketMessageSchema = new Schema<ITicketMessage>(
  {
    sender: { type: String, enum: ["customer", "admin"], required: true },
    senderName: { type: String, required: true },
    senderEmail: { type: String, required: true },
    content: { type: String, required: true },
  },
  { _id: false, timestamps: { createdAt: true, updatedAt: false } }
);

const TicketNoteSchema = new Schema<ITicketNote>(
  {
    content: { type: String, required: true },
  },
  { _id: false, timestamps: { createdAt: true, updatedAt: false } }
);

const TicketSchema = new Schema<ITicket>(
  {
    ticketId: { type: String, required: true, unique: true, index: true },
    conversationToken: { type: String, unique: true, sparse: true, index: true },
    customerName: { type: String, required: true, trim: true },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    customerPhone: { type: String, default: "", trim: true },
    subject: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in-progress", "closed"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    category: { type: String, default: "general", trim: true },
    messages: [TicketMessageSchema],
    internalNotes: [TicketNoteSchema],
  },
  { timestamps: true }
);

// Auto-generate conversationToken if missing (handles new tickets + legacy tickets on first update)
TicketSchema.pre("save", async function () {
  if (!this.conversationToken) {
    this.conversationToken = randomUUID();
  }
});

// Generate unique ticket ID
export async function generateTicketId(): Promise<string> {
  try {
    const count = await mongoose.model("Ticket").countDocuments();
    return `TKT-${String(count + 1).padStart(4, "0")}`;
  } catch {
    return `TKT-${Date.now().toString(36).toUpperCase()}`;
  }
}

export const Ticket =
  mongoose.models.Ticket ??
  mongoose.model<ITicket>("Ticket", TicketSchema);
