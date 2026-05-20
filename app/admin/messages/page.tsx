"use client";

import { useEffect, useState } from "react";
import { FiMail, FiUser, FiPhone, FiCalendar, FiCheck } from "react-icons/fi";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => setMessages(data.messages || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/admin/messages/${id}`, { method: "PATCH" });
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, read: true } : m))
      );
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Messages</h1>
          <p className="text-gray-500 text-sm mt-1">
            {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <FiMail className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500">No messages yet</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Messages List */}
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
            {messages.map((msg) => (
              <button
                key={msg._id}
                onClick={() => {
                  setSelected(msg);
                  if (!msg.read) markAsRead(msg._id);
                }}
                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                  selected?._id === msg._id ? "bg-navy-50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      msg.read ? "bg-gray-300" : "bg-gold-400"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-navy-900">
                        {msg.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {msg.subject || msg.message.slice(0, 80)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Message Detail */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            {selected ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-navy-900">
                    {selected.subject || "No Subject"}
                  </h3>
                  {selected.read && (
                    <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      <FiCheck size={12} />
                      Read
                    </span>
                  )}
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiUser size={14} />
                    <span>{selected.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMail size={14} />
                    <a href={`mailto:${selected.email}`} className="text-navy-600 hover:underline">
                      {selected.email}
                    </a>
                  </div>
                  {selected.phone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiPhone size={14} />
                      <a href={`tel:${selected.phone}`} className="text-navy-600 hover:underline">
                        {selected.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiCalendar size={14} />
                    <span>
                      {new Date(selected.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FiMail className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500 text-sm">
                  Select a message to view
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
