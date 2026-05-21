"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiFileText,
  FiMessageSquare,
  FiEdit3,
  FiEye,
  FiTrendingUp,
} from "react-icons/fi";
import Spinner from "@/components/Spinner";

interface DashboardData {
  stats: {
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    totalMessages: number;
    unreadMessages: number;
  };
  recentPosts: Array<{
    _id: string;
    title: string;
    slug: string;
    published: boolean;
    createdAt: string;
  }>;
  recentMessages: Array<{
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    read: boolean;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  const statsCards = [
    {
      label: "Total Posts",
      value: data?.stats.totalPosts ?? 0,
      icon: FiFileText,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Published",
      value: data?.stats.publishedPosts ?? 0,
      icon: FiEye,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Drafts",
      value: data?.stats.draftPosts ?? 0,
      icon: FiEdit3,
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "Unread Messages",
      value: data?.stats.unreadMessages ?? 0,
      icon: FiMessageSquare,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-navy-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome to HMAA Dubai admin panel
        </p>
      </div>

      {/* Stats Grid — 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
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
        {/* Recent Posts */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-navy-900">Recent Posts</h2>
            <Link
              href="/admin/blog"
              className="text-sm text-gold-500 hover:text-gold-600 font-medium"
            >
              View all
            </Link>
          </div>
          {data?.recentPosts && data.recentPosts.length > 0 ? (
            <div className="space-y-4">
              {data.recentPosts.map((post) => (
                <div
                  key={post._id}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-navy-900 truncate">
                      {post.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      post.published
                        ? "bg-green-50 text-green-600"
                        : "bg-orange-50 text-orange-600"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-8">
              No posts yet
            </p>
          )}
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-navy-900">Recent Messages</h2>
            <Link
              href="/admin/messages"
              className="text-sm text-gold-500 hover:text-gold-600 font-medium"
            >
              View all
            </Link>
          </div>
          {data?.recentMessages && data.recentMessages.length > 0 ? (
            <div className="space-y-4">
              {data.recentMessages.map((msg) => (
                <div
                  key={msg._id}
                  className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      msg.read ? "bg-gray-300" : "bg-gold-400"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-navy-900">
                      {msg.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {msg.subject || msg.message.slice(0, 60)}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-8">
              No messages yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
