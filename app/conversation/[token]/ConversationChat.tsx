"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import {
  FiRefreshCw,
  FiSend,
  FiAlertCircle,
  FiClock,
  FiCheckCircle,
  FiWifi,
  FiWifiOff,
  FiMessageSquare,
} from "react-icons/fi";

interface ConversationMessage {
  sender: "customer" | "admin";
  senderName: string;
  content: string;
  createdAt: string;
}

interface TicketData {
  ticketId: string;
  customerName: string;
  subject: string;
  description: string;
  status: "open" | "in-progress" | "closed";
  messages: ConversationMessage[];
  createdAt: string;
}

const statusConfig = {
  open: {
    label: "Open",
    color: "bg-green-50 text-green-700 border border-green-200",
    icon: FiAlertCircle,
  },
  "in-progress": {
    label: "In Progress",
    color: "bg-navy-50 text-navy-700 border border-navy-200",
    icon: FiClock,
  },
  closed: {
    label: "Closed",
    color: "bg-gray-100 text-gray-500 border border-gray-200",
    icon: FiCheckCircle,
  },
};

function formatTime(iso: string) {
  const d = new Date(iso);
  const delta = Date.now() - d.getTime();
  if (delta < 60_000) return "just now";
  if (delta < 3_600_000) return `${Math.floor(delta / 60_000)}m ago`;
  if (delta < 86_400_000) return `${Math.floor(delta / 3_600_000)}h ago`;
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function MessageBubble({
  msg,
  isAdmin,
}: {
  msg: ConversationMessage;
  isAdmin: boolean;
}) {
  return (
    <div className={`flex items-end gap-2 ${isAdmin ? "justify-start" : "justify-end"}`}>
      {isAdmin && (
        <div className="w-7 h-7 rounded-full bg-navy-900 flex items-center justify-center flex-shrink-0 mb-1">
          <span className="text-[9px] font-black text-gold-400 tracking-tight">HMA</span>
        </div>
      )}
      <div className="max-w-[78%]">
        <div
          className={`flex items-center gap-2 mb-1 ${
            isAdmin ? "" : "justify-end"
          }`}
        >
          <span className="text-[11px] font-semibold text-gray-500">
            {isAdmin ? "HMA Support" : msg.senderName}
          </span>
          <span className="text-[10px] text-gray-400">{formatTime(msg.createdAt)}</span>
        </div>
        <div
          className={`px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
            isAdmin
              ? "bg-navy-900 text-white rounded-2xl rounded-bl-sm"
              : "bg-[#F0F0F0] text-navy-900 rounded-2xl rounded-br-sm"
          }`}
        >
          {msg.content}
        </div>
      </div>
    </div>
  );
}

export default function ConversationChat() {
  const params = useParams();
  const token = params.token as string;

  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [connected, setConnected] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    bottomRef.current?.scrollIntoView({ behavior });
  };

  const fetchTicket = useCallback(
    async (showRefreshing = false) => {
      if (showRefreshing) setRefreshing(true);
      try {
        const res = await fetch(`/api/conversation/${token}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setTicket(data.ticket);
        setMessages(data.ticket.messages || []);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [token]
  );

  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!loading && ticket) scrollToBottom("instant");
  }, [loading, ticket]);

  // SSE — real-time push from server
  useEffect(() => {
    if (!token) return;
    const es = new EventSource(`/api/conversation/${token}/stream`);
    es.onopen = () => setConnected(true);
    es.onerror = () => setConnected(false);
    es.onmessage = (e) => {
      try {
        const payload = JSON.parse(e.data);
        if (payload.type === "message") {
          setMessages((prev) => [...prev, payload.message]);
        }
        if (payload.type === "status") {
          setTicket((t) => (t ? { ...t, status: payload.status } : t));
        }
      } catch {
        /* ignore */
      }
    };
    return () => {
      es.close();
      setConnected(false);
    };
  }, [token]);

  const handleSend = async () => {
    if (!reply.trim() || sending) return;
    setSending(true);
    setSendError("");
    const content = reply.trim();
    setReply("");

    const optimistic: ConversationMessage = {
      sender: "customer",
      senderName: ticket?.customerName ?? "You",
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);

    try {
      const res = await fetch(`/api/conversation/${token}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) {
        const data = await res.json();
        setMessages((prev) => prev.filter((m) => m !== optimistic));
        setReply(content);
        setSendError(data.error || "Failed to send message");
      }
    } catch {
      setMessages((prev) => prev.filter((m) => m !== optimistic));
      setReply(content);
      setSendError("Network error. Please try again.");
    } finally {
      setSending(false);
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Not found ─────────────────────────────────────────
  if (!loading && notFound) {
    return (
      <div className="min-h-screen bg-[#F0F0F0] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center max-w-md w-full">
            <FiMessageSquare className="mx-auto text-gray-300 mb-4" size={40} />
            <h1 className="text-xl font-bold text-navy-900 mb-2">
              Conversation Not Found
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              The link is invalid or has expired. Check your email for the
              correct conversation link.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors"
            >
              Start a New Inquiry
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Loading ───────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F0F0] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-9 h-9 border-[3px] border-navy-900 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const statusCfg = statusConfig[ticket!.status] || statusConfig.open;
  const StatusIcon = statusCfg.icon;
  const isClosed = ticket?.status === "closed";

  const initialMessage: ConversationMessage = {
    sender: "customer",
    senderName: ticket!.customerName,
    content: ticket!.description,
    createdAt: ticket!.createdAt,
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] flex flex-col">
      <Header />

      {/* Page body — centered container matching site component width */}
      <div className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto flex flex-col gap-0" style={{ height: "calc(100vh - 10rem)" }}>

          {/* ── Card ──────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">

            {/* Card header — ticket info + controls */}
            <div className="border-b border-gray-100 px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${statusCfg.color}`}
                    >
                      <StatusIcon size={11} />
                      {statusCfg.label}
                    </span>
                    <span className="text-xs font-mono text-gray-400">
                      {ticket!.ticketId}
                    </span>
                  </div>
                  <h1 className="text-base font-bold text-navy-900 truncate">
                    {ticket!.subject}
                  </h1>
                </div>

                {/* Live indicator + refresh */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="flex items-center gap-1.5 text-xs">
                    {connected ? (
                      <>
                        <FiWifi size={12} className="text-green-500" />
                        <span className="text-green-600 font-medium hidden sm:inline">
                          Live
                        </span>
                      </>
                    ) : (
                      <>
                        <FiWifiOff size={12} className="text-gray-400" />
                        <span className="text-gray-400 hidden sm:inline">
                          Connecting
                        </span>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => fetchTicket(true)}
                    disabled={refreshing}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-navy-600 hover:text-navy-900 hover:bg-navy-50 rounded-lg border border-gray-200 transition-colors disabled:opacity-50"
                    title="Refresh"
                  >
                    <FiRefreshCw
                      size={12}
                      className={refreshing ? "animate-spin" : ""}
                    />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Messages — scrollable */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 bg-white">
              {/* Initial contact form message */}
              <MessageBubble msg={initialMessage} isAdmin={false} />

              {/* Follow-up messages */}
              {messages.map((msg, i) => (
                <MessageBubble key={i} msg={msg} isAdmin={msg.sender === "admin"} />
              ))}

              <div ref={bottomRef} />
            </div>

            {/* Reply composer / closed bar */}
            {isClosed ? (
              <div className="border-t border-gray-200 bg-gray-50 px-5 py-4">
                <div className="flex gap-3 items-end">
                  <div className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-sm text-gray-400 select-none cursor-not-allowed h-[76px] flex items-start pt-3">
                    This conversation is closed
                  </div>
                  <button
                    disabled
                    className="flex-shrink-0 flex items-center gap-2 px-5 py-3 bg-gray-200 text-gray-400 text-sm font-semibold rounded-xl cursor-not-allowed"
                  >
                    <FiSend size={15} />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1.5">
                  <FiCheckCircle size={11} />
                  Conversation closed · <Link href="/contact" className="text-gold-500 hover:text-gold-600 font-medium">Start a new inquiry →</Link>
                </p>
              </div>
            ) : (
              <div className="border-t border-gray-100 bg-white px-5 py-4">
                {sendError && (
                  <p className="text-xs text-red-500 mb-2 flex items-center gap-1">
                    <FiAlertCircle size={12} />
                    {sendError}
                  </p>
                )}
                <div className="flex gap-3 items-end">
                  <textarea
                    ref={textareaRef}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your follow-up message…"
                    rows={3}
                    className="flex-1 resize-none px-4 py-3 rounded-xl border border-gray-200 bg-[#F0F0F0] focus:bg-white focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm text-navy-900 placeholder:text-gray-400 transition-all"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!reply.trim() || sending}
                    className="flex-shrink-0 flex items-center gap-2 px-5 py-3 bg-navy-900 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 disabled:opacity-40 transition-colors"
                  >
                    {sending ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FiSend size={15} />
                    )}
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 mt-2">
                  Ctrl+Enter to send · Our team will be notified of your message
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
