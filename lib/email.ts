import nodemailer from "nodemailer";

// ── Brand constants ───────────────────────────────────
const BRAND = {
  name: "HMA Dubai",
  navy: "#0f172a",
  gold: "#C59D4B",
  gray: "#6b7280",
  lightGray: "#9ca3af",
  mutedBg: "#f8fafc",
  border: "#e5e7eb",
  phone: "+971 4 583 7001",
  email: "dubai.office@hmaa.ae",
  address: "Office 1106, Burlington Tower, Business Bay, Dubai, UAE",
} as const;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const ADMIN_EMAIL = process.env.ADMIN_NOTIFY_EMAIL || BRAND.email;

// ── Transporter ───────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ── HTML escape helper ────────────────────────────────
function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ── Shared email wrapper ──────────────────────────────
function emailWrapper(bodyHtml: string): string {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <!-- Header -->
      <div style="background: ${BRAND.navy}; padding: 28px 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: ${BRAND.gold}; margin: 0; font-size: 22px; font-weight: 700;">
          ${BRAND.name}
        </h1>
        <p style="color: #94a3b8; margin: 4px 0 0; font-size: 13px;">
          Business Setup & Compliance Partner
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 32px 24px; border: 1px solid ${BRAND.border}; border-top: none; border-radius: 0 0 8px 8px;">
        ${bodyHtml}
      </div>

      <!-- Footer -->
      <div style="padding: 20px 24px; text-align: center;">
        <hr style="border: none; border-top: 1px solid ${BRAND.border}; margin: 0 0 16px;" />
        <p style="margin: 0; color: ${BRAND.lightGray}; font-size: 12px; line-height: 1.6;">
          ${BRAND.name} — ${BRAND.address}<br/>
          Phone: ${BRAND.phone} | Email: <a href="mailto:${BRAND.email}" style="color: ${BRAND.lightGray}; text-decoration: underline;">${BRAND.email}</a>
        </p>
      </div>
    </div>
  `;
}

// ── Inline style helpers ──────────────────────────────
const styles = {
  greet: (name: string) =>
    `<p style="margin: 0 0 16px;">Dear <strong>${esc(name)}</strong>,</p>`,
  paragraph: (text: string) =>
    `<p style="margin: 0 0 12px; line-height: 1.6;">${text}</p>`,
  callout: (content: string) =>
    `<div style="background: ${BRAND.mutedBg}; border-left: 3px solid ${BRAND.gold}; padding: 16px 20px; margin: 16px 0; border-radius: 0 4px 4px 0;">${content}</div>`,
  details: (label: string, value: string) =>
    `<tr><td style="padding: 4px 12px 4px 0; color: ${BRAND.gray}; font-size: 13px; white-space: nowrap; vertical-align: top;">${label}</td><td style="padding: 4px 0; font-size: 13px;">${value}</td></tr>`,
  button: (url: string, text: string) =>
    `<div style="text-align: center; margin: 24px 0;">
      <a href="${esc(url)}" style="display: inline-block; background: ${BRAND.navy}; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px;">${esc(text)}</a>
    </div>`,
  signature: () =>
    `<p style="margin: 16px 0 0; color: ${BRAND.gray}; font-size: 13px;">Warm regards,<br/><strong>${BRAND.name} Support Team</strong></p>`,
  ticketBadge: (id: string) =>
    `<span style="display: inline-block; background: ${BRAND.mutedBg}; color: ${BRAND.navy}; font-family: monospace; font-size: 13px; font-weight: 700; padding: 2px 10px; border-radius: 4px;">#${esc(id)}</span>`,
  conversationNote: (url: string) =>
    `<div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 16px 20px; margin: 20px 0;">
      <p style="margin: 0 0 6px; font-size: 13px; font-weight: 600; color: #0369a1;">Your Conversation Link</p>
      <p style="margin: 0 0 10px; font-size: 13px; color: #0c4a6e; line-height: 1.5;">
        This link is unique to your inquiry. Use it any time to view the full conversation history and send follow-up messages — no login required.
      </p>
      <a href="${esc(url)}" style="font-size: 12px; color: #0369a1; word-break: break-all;">${esc(url)}</a>
    </div>`,
};

// ── Interfaces ────────────────────────────────────────
interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

// ── Core send function ────────────────────────────────
export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: SendEmailOptions): Promise<boolean> {
  try {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
      console.warn(
        "[email] SMTP not configured — skipping. Set SMTP_HOST, SMTP_USER, SMTP_PASS env vars."
      );
      return false;
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"${BRAND.name}" <${BRAND.email}>`,
      to,
      subject,
      html,
      replyTo,
    });

    console.log(`[email] ✓ Sent to ${to}: ${subject}`);
    return true;
  } catch (error) {
    console.error("[email] ✗ Failed to send:", error);
    return false;
  }
}

// ═══════════════════════════════════════════════════════
// 1. Contact form — confirmation to customer
// ═══════════════════════════════════════════════════════
export async function sendContactConfirmation({
  customerName,
  customerEmail,
  category,
  message,
  conversationToken,
}: {
  customerName: string;
  customerEmail: string;
  category: string;
  message: string;
  conversationToken: string;
}): Promise<boolean> {
  const categoryLabel = esc(
    category.charAt(0).toUpperCase() + category.replace(/-/g, " ").slice(1)
  );
  const summary = message.length > 120 ? esc(message.slice(0, 120)) + "…" : esc(message);
  const conversationUrl = `${BASE_URL}/conversation/${conversationToken}`;

  const html = emailWrapper(`
    ${styles.greet(customerName)}

    ${styles.paragraph(
      "Thank you for reaching out to HMA Dubai. We have received your inquiry and our team will review it shortly. You can expect a response within 1 business hour during working hours (Sunday–Thursday, 9 AM – 6 PM)."
    )}

    ${styles.paragraph("Here is a summary of your inquiry for your reference:")}

    <table style="font-size: 14px; margin: 16px 0;">
      ${styles.details("Category", categoryLabel)}
      ${styles.details("Message", summary)}
      ${styles.details("Status", "Open")}
    </table>

    ${styles.button(conversationUrl, "View Your Conversation →")}

    ${styles.conversationNote(conversationUrl)}

    ${styles.signature()}
  `);

  return sendEmail({
    to: customerEmail,
    subject: `We've received your inquiry — ${BRAND.name}`,
    html,
  });
}

// ═══════════════════════════════════════════════════════
// 2. New ticket — notification to admin(s)
// ═══════════════════════════════════════════════════════
export async function sendAdminNewTicketNotification({
  ticketId,
  ticketMongoId,
  customerName,
  customerEmail,
  customerPhone,
  subject,
  category,
  description,
}: {
  ticketId: string;
  ticketMongoId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  subject: string;
  category: string;
  description: string;
}): Promise<boolean> {
  const categoryLabel = esc(
    category.charAt(0).toUpperCase() + category.replace(/-/g, " ").slice(1)
  );
  const adminUrl = `${BASE_URL}/admin/tickets/${esc(ticketMongoId)}`;

  const html = emailWrapper(`
    <p style="margin: 0 0 8px; color: #ef4444; font-weight: 600; font-size: 13px;">🔔 NEW INQUIRY</p>

    ${styles.paragraph(
      `A new inquiry has been submitted via the ${BRAND.name} contact form.`
    )}

    <table style="font-size: 14px; margin: 16px 0; width: 100%;">
      ${styles.details("Ticket", styles.ticketBadge(ticketId))}
      ${styles.details("Customer", esc(customerName))}
      ${styles.details("Email", esc(customerEmail))}
      ${customerPhone ? styles.details("Phone", esc(customerPhone)) : ""}
      ${styles.details("Subject", esc(subject))}
      ${styles.details("Category", categoryLabel)}
      ${styles.details("Priority", "Medium")}
      ${styles.details("Status", "Open")}
    </table>

    <p style="margin: 0 0 8px; font-weight: 600; font-size: 13px; color: ${BRAND.navy};">Customer Message:</p>
    ${styles.callout(`<p style="margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${esc(description)}</p>`)}

    ${styles.button(adminUrl, "View & Reply in Admin Panel")}

    <p style="margin: 12px 0 0; color: ${BRAND.gray}; font-size: 12px;">
      Tickets are also accessible from the HMA admin dashboard → Tickets.
    </p>
  `);

  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `[New Inquiry ${ticketId}] ${esc(subject)}`,
    html,
  });
}

// ═══════════════════════════════════════════════════════
// 3. Admin reply — notification to customer with conversation link
// ═══════════════════════════════════════════════════════
export async function sendTicketReply({
  ticketId,
  customerName,
  customerEmail,
  subject,
  replyContent,
  adminName,
  conversationToken,
}: {
  ticketId: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  replyContent: string;
  adminName: string;
  conversationToken: string;
}): Promise<boolean> {
  const conversationUrl = `${BASE_URL}/conversation/${conversationToken}`;

  const html = emailWrapper(`
    ${styles.greet(customerName)}

    ${styles.paragraph(
      `You have a new reply from the ${BRAND.name} team regarding your inquiry ${styles.ticketBadge(ticketId)}:`
    )}

    ${styles.callout(`<p style="margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${esc(replyContent)}</p>`)}

    ${styles.button(conversationUrl, "View Conversation & Reply →")}

    ${styles.paragraph(
      "If you have further questions, click the button above to open your conversation page and send a follow-up message directly. No login required."
    )}

    ${styles.conversationNote(conversationUrl)}

    <p style="margin: 16px 0 0; color: ${BRAND.gray}; font-size: 13px;">
      — ${esc(adminName)}, ${BRAND.name} Support Team
    </p>
  `);

  return sendEmail({
    to: customerEmail,
    subject: `[Reply] ${esc(subject)} — ${BRAND.name}`,
    html,
  });
}

// ═══════════════════════════════════════════════════════
// 4. Customer reply via conversation page — notify admin
// ═══════════════════════════════════════════════════════
export async function sendCustomerReplyNotification({
  ticketId,
  ticketMongoId,
  customerName,
  customerEmail,
  subject,
  replyContent,
}: {
  ticketId: string;
  ticketMongoId: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  replyContent: string;
}): Promise<boolean> {
  const adminUrl = `${BASE_URL}/admin/tickets/${esc(ticketMongoId)}`;

  const html = emailWrapper(`
    <p style="margin: 0 0 8px; color: #f59e0b; font-weight: 600; font-size: 13px;">💬 CUSTOMER FOLLOW-UP</p>

    ${styles.paragraph(
      `<strong>${esc(customerName)}</strong> (${esc(customerEmail)}) has sent a follow-up message on ticket ${styles.ticketBadge(ticketId)}:`
    )}

    ${styles.callout(`<p style="margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${esc(replyContent)}</p>`)}

    ${styles.button(adminUrl, "Reply in Admin Panel")}
  `);

  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `[Follow-up ${ticketId}] ${esc(subject)}`,
    html,
  });
}
