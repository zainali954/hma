"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  FiMessageSquare,
  FiSearch,
  FiFilter,
  FiAlertCircle,
  FiClock,
  FiCheckCircle,
  FiX,
  FiChevronDown,
  FiRefreshCw,
  FiMail,
} from "react-icons/fi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { relativeTime } from "@/lib/utils";
import { getCached, setCached, bustCache } from "@/lib/client-cache";

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

const statusConfig: Record<string, { label: string; color: string; dot: string; icon: React.ElementType }> = {
  open: { label: "Open", color: "bg-green-50 text-green-700 border border-green-200", dot: "bg-green-500", icon: FiAlertCircle },
  "in-progress": { label: "In Progress", color: "bg-navy-50 text-navy-700 border border-navy-200", dot: "bg-navy-500", icon: FiClock },
  closed: { label: "Closed", color: "bg-gray-100 text-gray-500 border border-gray-200", dot: "bg-gray-300", icon: FiCheckCircle },
};

const priorityConfig: Record<string, { label: string; color: string; stripe: string }> = {
  high: { label: "High", color: "bg-red-50 text-red-700", stripe: "bg-red-400" },
  medium: { label: "Medium", color: "bg-gold-50 text-gold-700", stripe: "bg-gold-400" },
  low: { label: "Low", color: "bg-gray-100 text-gray-500", stripe: "bg-gray-200" },
};

export default function TicketsPage() {
  const [data, setData] = useState<TicketsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const fetchTickets = useCallback(async (bust = false) => {
    const key = `tickets:${statusFilter}:${priorityFilter}:${categoryFilter}:${submittedSearch}:${page}`;
    if (bust) bustCache(key);

    const cached = getCached<TicketsResponse>(key);
    if (cached) {
      setData(cached);
      setLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      const params = new URLSearchParams({ page: String(page), limit: "20" });
      if (submittedSearch) params.set("search", submittedSearch);
      if (statusFilter) params.set("status", statusFilter);
      if (priorityFilter) params.set("priority", priorityFilter);
      if (categoryFilter) params.set("category", categoryFilter);

      const res = await fetch(`/api/admin/tickets?${params}`);
      const json = await res.json();
      setCached(key, json);
      setData(json);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [statusFilter, priorityFilter, categoryFilter, submittedSearch, page]);

  useEffect(() => {
    setRefreshing(true);
    fetchTickets();
  }, [fetchTickets]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSubmittedSearch(search);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTickets(true);
  };

  const clearFilters = () => {
    setSearch("");
    setSubmittedSearch("");
    setStatusFilter("");
    setPriorityFilter("");
    setCategoryFilter("");
    setPage(1);
  };

  const hasActiveFilters = !!(statusFilter || priorityFilter || categoryFilter || submittedSearch);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Tickets</h1>
          <p className="text-gray-500 text-sm mt-1">
            {data?.summary.total ?? "—"} total tickets
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing && !data}
          className="flex items-center gap-2 px-3 py-2 text-sm text-navy-600 hover:text-navy-900 hover:bg-navy-50 rounded-lg transition-colors disabled:opacity-50"
          title="Refresh tickets"
        >
          <FiRefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Status Summary Cards */}
      {data?.summary && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {(["open", "in-progress", "closed"] as const).map((status) => {
            const config = statusConfig[status];
            const Icon = config.icon;
            const count =
              status === "open"
                ? data.summary.open
                : status === "in-progress"
                ? data.summary.inProgress
                : data.summary.closed;
            const isActive = statusFilter === status;
            return (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(isActive ? "" : status);
                  setPage(1);
                }}
                className={`group flex items-center gap-3 p-3 sm:p-4 rounded-xl border-2 transition-all text-left ${
                  isActive
                    ? `border-current ${config.color}`
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    isActive
                      ? config.color
                      : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
                  }`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-navy-900">{count}</p>
                  <p className="text-xs text-gray-500">{config.label}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <form onSubmit={handleSearch} className="flex gap-2 sm:gap-3">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by ID, name, email, or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
              showFilters || hasActiveFilters
                ? "bg-navy-50 border-navy-200 text-navy-700"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FiFilter size={16} />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <span className="w-4 h-4 bg-gold-400 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                !
              </span>
            )}
            <FiChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </form>

        {showFilters && (
          <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-gray-100">
            <Select
              value={priorityFilter || "all"}
              onValueChange={(val) => { setPriorityFilter(val === "all" ? "" : val); setPage(1); }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={categoryFilter || "all"}
              onValueChange={(val) => { setCategoryFilter(val === "all" ? "" : val); setPage(1); }}
            >
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="business-setup">Business Setup</SelectItem>
                <SelectItem value="tax-vat">Tax & VAT</SelectItem>
                <SelectItem value="accounting">Accounting</SelectItem>
                <SelectItem value="visa">Visa</SelectItem>
                <SelectItem value="audit">Audit</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiX size={14} />
                Clear all
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tickets List */}
      {loading && !data ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : !data?.tickets.length ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
          <FiMessageSquare className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 font-medium">No tickets found</p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-3 text-sm text-gold-600 hover:text-gold-700 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className={`space-y-2 transition-opacity duration-150 ${refreshing ? "opacity-60" : "opacity-100"}`}>
          {data.tickets.map((ticket) => {
            const statusCfg = statusConfig[ticket.status] || statusConfig.open;
            const priorityCfg = priorityConfig[ticket.priority] || priorityConfig.medium;
            return (
              <Link
                key={ticket._id}
                href={`/admin/tickets/${ticket._id}`}
                className="group flex bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 overflow-hidden transition-all"
              >
                {/* Priority stripe */}
                <div className={`w-[3px] flex-shrink-0 ${priorityCfg.stripe}`} />

                {/* Content */}
                <div className="flex-1 min-w-0 p-4">
                  {/* Top row: ID + category | status + time */}
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono text-gray-400">{ticket.ticketId}</span>
                      {ticket.category && ticket.category !== "general" && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-navy-50 text-navy-600 font-medium capitalize">
                          {ticket.category.replace("-", " ")}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1.5 ${statusCfg.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusCfg.dot}`} />
                        {statusCfg.label}
                      </span>
                      <span className="text-xs text-gray-400 tabular-nums whitespace-nowrap hidden sm:inline">
                        {relativeTime(ticket.updatedAt)}
                      </span>
                    </div>
                  </div>

                  {/* Subject */}
                  <h3 className="text-sm font-semibold text-navy-900 mb-1.5 truncate group-hover:text-navy-700 transition-colors">
                    {ticket.subject}
                  </h3>

                  {/* Bottom row: customer | priority */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 min-w-0">
                      <FiMail size={11} className="flex-shrink-0 text-gray-400" />
                      <span className="truncate">
                        {ticket.customerName} · {ticket.customerEmail}
                      </span>
                    </div>
                    <span className={`flex-shrink-0 text-[11px] px-2 py-0.5 rounded-full font-medium ${priorityCfg.color}`}>
                      {priorityCfg.label}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {data && data.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {((data.pagination.page - 1) * data.pagination.limit) + 1}–
            {Math.min(data.pagination.page * data.pagination.limit, data.pagination.total)} of{" "}
            {data.pagination.total}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              ← Prev
            </button>
            <span className="px-3 py-1.5 text-sm text-gray-500 tabular-nums">
              {page} / {data.pagination.totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(data.pagination.totalPages, p + 1))}
              disabled={page >= data.pagination.totalPages}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
