"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiSearch,
} from "react-icons/fi";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  published: boolean;
  featured: boolean;
  createdAt: string;
  author: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null); // post._id being actioned

  const fetchPosts = async () => {
    try {
      const params = new URLSearchParams();
      if (filter === "published") params.set("published", "true");
      if (filter === "draft") params.set("published", "false");
      if (search) params.set("search", search);
      params.set("limit", "100");

      const res = await fetch(`/api/blog?${params}`);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts();
  };

  const togglePublish = async (post: BlogPost) => {
    setActionLoading(`toggle-${post._id}`);
    try {
      await fetch(`/api/blog/${post._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !post.published }),
      });
      fetchPosts();
    } catch (err) {
      console.error("Failed to update post:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setActionLoading(`delete-${id}`);
    try {
      await fetch(`/api/blog/${id}`, { method: "DELETE" });
      fetchPosts();
    } catch (err) {
      console.error("Failed to delete post:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const Spinner = () => (
    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Blog Posts</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your blog content
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-all duration-300"
        >
          <FiPlus size={18} />
          New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
            />
          </div>
        </form>
        <div className="flex gap-2">
          {(["all", "published", "draft"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-all flex-1 sm:flex-none ${
                filter === f
                  ? "bg-navy-900 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <FiEdit3 className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 mb-4">No blog posts found</p>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-all"
          >
            <FiPlus size={18} />
            Create Your First Post
          </Link>
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="sm:hidden space-y-3">
            {posts.map((post) => (
              <div key={post._id} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy-900 leading-snug">{post.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">/{post.slug}</p>
                  </div>
                  <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-medium ${
                    post.published ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                  }`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
                  <div className="flex items-center gap-1">
                    <button onClick={() => togglePublish(post)} disabled={!!actionLoading} className="p-2 text-gray-400 hover:text-navy-900 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50" title={post.published ? "Unpublish" : "Publish"}>
                      {actionLoading === `toggle-${post._id}` ? <Spinner /> : post.published ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                    <Link href={`/admin/blog/${post._id}/edit`} className="p-2 text-gray-400 hover:text-navy-900 rounded-lg hover:bg-gray-100 transition-colors" title="Edit">
                      <FiEdit3 size={16} />
                    </Link>
                    <button onClick={() => deletePost(post._id)} disabled={!!actionLoading} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50" title="Delete">
                      {actionLoading === `delete-${post._id}` ? <Spinner /> : <FiTrash2 size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Author</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {posts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-navy-900 truncate max-w-[280px]">{post.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">/{post.slug}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{post.author}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        post.published ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                      }`}>
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => togglePublish(post)} className="p-2 text-gray-400 hover:text-navy-900 rounded-lg hover:bg-gray-100 transition-colors" title={post.published ? "Unpublish" : "Publish"}>
                          {post.published ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                        </button>
                        <Link href={`/admin/blog/${post._id}/edit`} className="p-2 text-gray-400 hover:text-navy-900 rounded-lg hover:bg-gray-100 transition-colors" title="Edit">
                          <FiEdit3 size={16} />
                        </Link>
                        <button onClick={() => deletePost(post._id)} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>

      )}
    </div>
  );
}
