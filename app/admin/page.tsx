"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  FiFileText,
  FiEdit3,
  FiEye,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";
import Spinner from "@/components/Spinner";
import { getCached, setCached, bustCache } from "@/lib/client-cache";
import { relativeTime } from "@/lib/utils";

interface DashboardData {
  stats: {
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    totalTickets: number;
    openTickets: number;
    inProgressTickets: number;
    closedTickets: number;
  };
  recentPosts: Array<{
    _id: string;
    title: string;
    slug: string;
    published: boolean;
    createdAt: string;
  }>;
  recentTickets: Array<{
    _id: string;
    ticketId: string;
    customerName: string;
    subject: string;
    status: string;
    priority: string;
    category: string;
    createdAt: string;
  }>;
}

const CACHE_KEY = "admin:dash";

const statusColors: Record<string, string> = {
  open: "bg-green-50 text-green-600",
  "in-progress": "bg-navy-50 text-navy-600",
  closed: "bg-navy-100 text-navy-400",
};

const priorityColors: Record<string, string> = {
  high: "bg-red-50 text-red-600",
  medium: "bg-gold-50 text-gold-600",
  low: "bg-navy-100 text-navy-400",
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async (bust = false) => {
    if (bust) bustCache(CACHE_KEY);
    const cached = getCached<DashboardData>(CACHE_KEY);
    if (cached) {
      setData(cached);
      setLoading(false);
      setRefreshing(false);
      return;
    }
    try {
      const res = await fetch("/api/admin/stats");
      const json = await res.json();
      setCached(CACHE_KEY, json);
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData(true);
  };

  if (loading) return <Spinner />;

  const statsCards = [
    {
      label: "Total Posts",
      value: data?.stats.totalPosts ?? 0,
      icon: FiFileText,
      color: "bg-navy-50 text-navy-600",
    },
    {
      label: "Published",
      value: data?.stats.publishedPosts ?? 0,
      icon: FiEye,
      color: "bg-gold-50 text-gold-600",
    },
    {
      label: "Drafts",
      value: data?.stats.draftPosts ?? 0,
      icon: FiEdit3,
      color: "bg-navy-100 text-navy-500",
    },
    {
      label: "Open Tickets",
      value: data?.stats.openTickets ?? 0,
      icon: FiAlertCircle,
      color: "bg-gold-100 text-gold-700",
    },
    {
      label: "In Progress",
      value: data?.stats.inProgressTickets ?? 0,
      icon: FiClock,
      color: "bg-navy-50 text-navy-700",
    },
    {
      label: "Closed",
      value: data?.stats.closedTickets ?? 0,
      icon: FiCheckCircle,
      color: "bg-navy-100 text-navy-400",
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-navy-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome to HMA Dubai admin panel</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-3 py-2 text-sm text-navy-600 hover:text-navy-900 hover:bg-navy-50 rounded-lg transition-colors disabled:opacity-50"
          title="Refresh dashboard"
        >
          <FiRefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Stats Grid — 2 cols on mobile, 3 on tablet, 6 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${card.color} flex items-center justify-center`}>
                  <Icon size={18} />
                </div>
                <FiTrendingUp className="text-gray-300" size={16} />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-navy-900">{card.value}</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-tight">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Recent Posts — 5 most recent */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-navy-900">Recent Posts</h2>
              <p className="text-xs text-gray-400 mt-0.5">5 most recent</p>
            </div>
            <Link href="/admin/blog" className="text-sm text-gold-500 hover:text-gold-600 font-medium">
              View all
            </Link>
          </div>
          {data?.recentPosts && data.recentPosts.length > 0 ? (
            <div className="space-y-1">
              {data.recentPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/admin/blog/${post._id}/edit`}
                  className="flex items-center justify-between py-2.5 px-2 -mx-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-navy-900 truncate">{post.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{relativeTime(post.createdAt)}</p>
                  </div>
                  <span
                    className={`ml-3 flex-shrink-0 text-xs px-2 py-1 rounded-full font-medium ${
                      post.published ? "bg-green-50 text-green-600" : "bg-gold-50 text-gold-600"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-8">No posts yet</p>
          )}
        </div>

        {/* Recent Tickets — 5 most recent */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-navy-900">Recent Tickets</h2>
              <p className="text-xs text-gray-400 mt-0.5">5 most recent</p>
            </div>
            <Link href="/admin/tickets" className="text-sm text-gold-500 hover:text-gold-600 font-medium">
              View all
            </Link>
          </div>
          {data?.recentTickets && data.recentTickets.length > 0 ? (
            <div className="space-y-1">
              {data.recentTickets.map((ticket) => (
                <Link
                  key={ticket._id}
                  href={`/admin/tickets/${ticket._id}`}
                  className="flex items-start gap-3 py-2.5 px-2 -mx-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                      ticket.status === "open"
                        ? "bg-green-500"
                        : ticket.status === "in-progress"
                        ? "bg-navy-500"
                        : "bg-gray-300"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-xs font-mono text-gray-400">{ticket.ticketId}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusColors[ticket.status] || ""}`}>
                        {ticket.status}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${priorityColors[ticket.priority] || ""}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-navy-900 truncate">{ticket.subject}</p>
                    <p className="text-xs text-gray-400">
                      {ticket.customerName} · {relativeTime(ticket.createdAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-8">No tickets yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
