"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiArrowLeft,
  FiSend,
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMessageSquare,
  FiEdit3,
  FiAlertCircle,
  FiClock,
  FiCheckCircle,
  FiTrash2,
  FiSettings,
  FiSearch,
  FiRefreshCw,
} from "react-icons/fi";
import { getCached, setCached, bustCache } from "@/lib/client-cache";
import ConfirmModal from "@/components/admin/ConfirmModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TicketMessage {
  sender: "customer" | "admin";
  senderName: string;
  senderEmail: string;
  content: string;
  createdAt: string;
}

interface TicketNote {
  content: string;
  createdAt: string;
}

interface Ticket {
  _id: string;
  ticketId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  subject: string;
  description: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
  category: string;
  messages: TicketMessage[];
  internalNotes: TicketNote[];
  createdAt: string;
  updatedAt: string;
}

interface TicketSummary {
  _id: string;
  ticketId: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
  category: string;
  updatedAt: string;
}

interface TicketsResponse {
  tickets: TicketSummary[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
  summary: { open: number; inProgress: number; closed: number; total: number };
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  open: { label: "Open", color: "bg-green-100 text-green-700", icon: FiAlertCircle },
  "in-progress": { label: "In Progress", color: "bg-blue-100 text-blue-700", icon: FiClock },
  closed: { label: "Closed", color: "bg-gray-200 text-gray-600", icon: FiCheckCircle },
};

const statusDotColors: Record<string, string> = {
  open: "bg-green-500",
  "in-progress": "bg-blue-500",
  closed: "bg-gray-400",
};

const priorityConfig: Record<string, { label: string; color: string }> = {
  high: { label: "High", color: "bg-red-100 text-red-700" },
  medium: { label: "Medium", color: "bg-yellow-100 text-yellow-700" },
  low: { label: "Low", color: "bg-gray-100 text-gray-500" },
};

const categories = [
  { value: "general", label: "General" },
  { value: "business-setup", label: "Business Setup" },
  { value: "tax-vat", label: "Tax & VAT" },
  { value: "accounting", label: "Accounting" },
  { value: "visa", label: "Visa" },
  { value: "audit", label: "Audit" },
  { value: "other", label: "Other" },
];

export default function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [ticketList, setTicketList] = useState<TicketSummary[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listSearch, setListSearch] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [sendingNote, setSendingNote] = useState(false);
  const [activeTab, setActiveTab] = useState<"conversation" | "notes">("conversation");
  const [currentId, setCurrentId] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchTicket = useCallback(async (id: string, bust = false) => {
    const key = `ticket:${id}`;
    if (bust) bustCache(key);

    const cached = getCached<Ticket>(key);
    if (cached) {
      setTicket(cached);
      setLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      const res = await fetch(`/api/admin/tickets/${id}`);
      const data = await res.json();
      setCached(key, data.ticket, 60_000);
      setTicket(data.ticket);
    } catch (err) {
      console.error("Failed to fetch ticket:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const fetchTicketList = useCallback(async (search?: string) => {
    setListLoading(true);
    try {
      const params = new URLSearchParams({ limit: "50", page: "1" });
      if (search) params.set("search", search);
      const res = await fetch(`/api/admin/tickets?${params}`);
      const data: TicketsResponse = await res.json();
      setTicketList(data.tickets || []);
    } catch (err) {
      console.error("Failed to fetch tickets list:", err);
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    params.then(({ id }) => {
      setCurrentId(id);
      fetchTicket(id);
      fetchTicketList();
    });
  }, [params, fetchTicket, fetchTicketList]);

  const patchTicket = async (update: Record<string, string>) => {
    if (!ticket) return;
    try {
      const res = await fetch(`/api/admin/tickets/${ticket._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
      });
      const data = await res.json();
      bustCache(`ticket:${ticket._id}`);
      setTicket(data.ticket);
    } catch (err) {
      console.error("Failed to update ticket:", err);
    }
  };

  const handleSendReply = async () => {
    if (!ticket || !replyContent.trim()) return;
    setSendingReply(true);
    try {
      const res = await fetch(`/api/admin/tickets/${ticket._id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyContent }),
      });
      const data = await res.json();
      bustCache(`ticket:${ticket._id}`);
      setTicket(data.ticket);
      setReplyContent("");
    } catch (err) {
      console.error("Failed to send reply:", err);
    } finally {
      setSendingReply(false);
    }
  };

  const handleAddNote = async () => {
    if (!ticket || !noteContent.trim()) return;
    setSendingNote(true);
    try {
      const res = await fetch(`/api/admin/tickets/${ticket._id}/note`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: noteContent }),
      });
      const data = await res.json();
      bustCache(`ticket:${ticket._id}`);
      setTicket(data.ticket);
      setNoteContent("");
    } catch (err) {
      console.error("Failed to add note:", err);
    } finally {
      setSendingNote(false);
    }
  };

  const handleDelete = async () => {
    if (!ticket) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/tickets/${ticket._id}`, { method: "DELETE" });
      router.push("/admin/tickets");
    } catch (err) {
      console.error("Failed to delete ticket:", err);
      setDeleting(false);
    }
  };

  const handleRefresh = () => {
    if (!currentId) return;
    setRefreshing(true);
    fetchTicket(currentId, true);
    fetchTicketList(listSearch);
  };

  const doListSearch = useCallback(() => {
    fetchTicketList(listSearch);
  }, [fetchTicketList, listSearch]);

  const handleListSearch = (e: React.FormEvent) => {
    e.preventDefault();
    doListSearch();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Ticket not found</p>
        <Link href="/admin/tickets" className="text-gold-500 hover:text-gold-600 text-sm mt-2 inline-block">
          ← Back to tickets
        </Link>
      </div>
    );
  }

  const statusCfg = statusConfig[ticket.status] || statusConfig.open;
  const priorityCfg = priorityConfig[ticket.priority] || priorityConfig.medium;
  const StatusIcon = statusCfg.icon;

  return (
    <div className="flex gap-6 items-start">
      {/* ── Left Panel: Ticket List ── */}
      <div className="hidden lg:flex lg:flex-col w-[340px] xl:w-[380px] flex-shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-6 h-[calc(100vh-5rem)]">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-navy-900">Tickets</h2>
            <Link
              href="/admin/tickets"
              className="text-xs text-gold-500 hover:text-gold-600 font-medium"
            >
              Full list
            </Link>
          </div>
          <form onSubmit={handleListSearch} className="relative">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search tickets..."
              value={listSearch}
              onChange={(e) => setListSearch(e.target.value)}                onKeyDown={(e) => {
                  if (e.key === "Enter") doListSearch();
                }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-xs"
            />
          </form>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {listLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : ticketList.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-xs text-gray-400">No tickets found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {ticketList.map((t) => {
                const isActive = t._id === currentId;
                const pCfg = priorityConfig[t.priority] || priorityConfig.medium;
                const dot = statusDotColors[t.status] || "bg-gray-400";
                return (
                  <Link
                    key={t._id}
                    href={`/admin/tickets/${t._id}`}
                    className={`block px-4 py-3 transition-colors ${
                      isActive
                        ? "bg-gold-50 border-l-3 border-gold-400"
                        : "border-l-3 border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${dot}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[11px] font-mono text-gray-400">{t.ticketId}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${pCfg.color}`}>
                            {t.priority}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-navy-900 truncate">{t.subject}</p>
                        <p className="text-[11px] text-gray-400 truncate mt-0.5">
                          {t.customerName}
                        </p>
                        <p className="text-[10px] text-gray-300">
                          {new Date(t.updatedAt).toLocaleDateString()} · {new Date(t.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer count */}
        <div className="p-3 border-t border-gray-200 bg-gray-50/50">
          <p className="text-[11px] text-gray-400 text-center">
            {ticketList.length} ticket{ticketList.length !== 1 ? "s" : ""} total
          </p>
        </div>
      </div>

      {/* ── Right Panel: Ticket Detail ── */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Back link (mobile) */}
        <Link
          href="/admin/tickets"
          className="lg:hidden inline-flex items-center gap-2 text-sm text-gray-500 hover:text-navy-900 transition-colors"
        >
          <FiArrowLeft size={16} />
          Back to tickets
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <span className="text-sm font-mono text-gray-400">{ticket.ticketId}</span>
              <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${statusCfg.color}`}>
                <StatusIcon size={12} />
                {statusCfg.label}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${priorityCfg.color}`}>
                {priorityCfg.label}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-navy-900">{ticket.subject}</h1>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-navy-600 hover:bg-navy-50 transition-colors disabled:opacity-50"
              title="Refresh ticket"
            >
              <FiRefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-200 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <FiTrash2 size={14} />
              Delete
            </button>
          </div>
        </div>

        {/* Ticket Settings */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-3">
            <FiSettings size={14} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-500">Ticket Settings</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Status</label>
              <Select value={ticket.status} onValueChange={(val) => patchTicket({ status: val })}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Priority</label>
              <Select value={ticket.priority} onValueChange={(val) => patchTicket({ priority: val })}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Category</label>
              <Select value={ticket.category} onValueChange={(val) => patchTicket({ category: val })}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Two-column: Conversation + Sidebar */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Main conversation area */}
          <div className="xl:col-span-2 space-y-4">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("conversation")}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "conversation"
                    ? "border-gold-400 text-navy-900"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <FiMessageSquare size={16} />
                Conversation ({ticket.messages.length})
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "notes"
                    ? "border-gold-400 text-navy-900"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <FiEdit3 size={16} />
                Internal Notes ({ticket.internalNotes.length})
              </button>
            </div>

            {activeTab === "conversation" && (
              <>
                <div className="space-y-4">
                  {/* Initial description */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-navy-100 flex items-center justify-center">
                        <FiUser size={14} className="text-navy-600" />
                      </div>
                      <span className="text-sm font-medium text-navy-900">{ticket.customerName}</span>
                      <span className="text-xs text-gray-400">· {new Date(ticket.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap ml-9">
                      {ticket.description}
                    </p>
                  </div>

                  {/* Messages */}
                  {ticket.messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`rounded-xl p-4 ${
                        msg.sender === "admin"
                          ? "bg-navy-50 border border-navy-100"
                          : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          msg.sender === "admin" ? "bg-gold-100" : "bg-navy-100"
                        }`}>
                          {msg.sender === "admin" ? (
                            <span className="text-xs font-bold text-gold-700">A</span>
                          ) : (
                            <FiUser size={14} className="text-navy-600" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-navy-900">{msg.senderName}</span>
                        <span className="text-xs text-gray-400">· {new Date(msg.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap ml-9">
                        {msg.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Reply composer */}
                {ticket.status !== "closed" && (
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FiSend size={14} className="text-gray-400" />
                      <span className="text-xs font-medium text-gray-500">
                        Reply to customer — this will be sent as an email
                      </span>
                    </div>
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Type your reply to the customer..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm resize-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                          handleSendReply();
                        }
                      }}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs text-gray-400">⌘/Ctrl + Enter to send</p>
                      <button
                        onClick={handleSendReply}
                        disabled={!replyContent.trim() || sendingReply}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 disabled:opacity-50 transition-colors"
                      >
                        {sendingReply ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <FiSend size={14} />
                        )}
                        Send Reply
                      </button>
                    </div>
                  </div>
                )}

                {ticket.status === "closed" && (
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-500">This ticket is closed. Reopen it to reply.</p>
                    <button
                      onClick={() => patchTicket({ status: "open" })}
                      className="mt-2 text-sm text-gold-600 hover:text-gold-700 font-medium"
                    >
                      Reopen ticket
                    </button>
                  </div>
                )}
              </>
            )}

            {activeTab === "notes" && (
              <>
                <div className="space-y-4">
                  {ticket.internalNotes.length === 0 && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500">
                        No internal notes yet. Add notes here — they&apos;re only visible to admins, never sent to the customer.
                      </p>
                    </div>
                  )}

                  {ticket.internalNotes.map((note, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FiEdit3 size={12} className="text-gray-400" />
                        <span className="text-xs font-medium text-navy-900">Internal Note</span>
                        <span className="text-xs text-gray-400">· {new Date(note.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {note.content}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FiEdit3 size={14} className="text-gray-400" />
                    <span className="text-xs font-medium text-gray-500">
                      Add internal note — not visible to customer
                    </span>
                  </div>
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Add a private note about this ticket..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm resize-none"
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={handleAddNote}
                      disabled={!noteContent.trim() || sendingNote}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 disabled:opacity-50 transition-colors"
                    >
                      {sendingNote ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <FiEdit3 size={14} />
                      )}
                      Add Note
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar: Customer info + Details */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-navy-900 mb-3">Customer</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <FiUser size={14} className="text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700">{ticket.customerName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FiMail size={14} className="text-gray-400 flex-shrink-0" />
                  <a href={`mailto:${ticket.customerEmail}`} className="text-navy-600 hover:underline truncate">
                    {ticket.customerEmail}
                  </a>
                </div>
                {ticket.customerPhone && (
                  <div className="flex items-center gap-2 text-sm">
                    <FiPhone size={14} className="text-gray-400 flex-shrink-0" />
                    <a href={`tel:${ticket.customerPhone}`} className="text-navy-600 hover:underline">
                      {ticket.customerPhone}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <FiCalendar size={14} className="text-gray-400 flex-shrink-0" />
                  <span className="text-gray-500">
                    Created {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-navy-900 mb-3">Details</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusCfg.color}`}>
                    {statusCfg.label}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Priority</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityCfg.color}`}>
                    {priorityCfg.label}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Category</span>
                  <span className="text-navy-700 capitalize">{ticket.category.replace("-", " & ")}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Messages</span>
                  <span className="text-navy-700">{ticket.messages.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Notes</span>
                  <span className="text-navy-700">{ticket.internalNotes.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Ticket"
        description={
          ticket
            ? `Ticket ${ticket.ticketId} — "${ticket.subject}" and all its messages will be permanently deleted.`
            : ""
        }
        confirmLabel="Delete Ticket"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
