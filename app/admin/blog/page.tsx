"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiSearch,
  FiRefreshCw,
} from "react-icons/fi";
import { getCached, setCached, bustPrefix } from "@/lib/client-cache";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  published: boolean;
  featured: boolean;
  status: "draft" | "published" | "scheduled";
  category: string;
  createdAt: string;
  author: string;
}

interface BlogResponse {
  posts: BlogPost[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

const LIMIT = 10;

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [pagination, setPagination] = useState<BlogResponse["pagination"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchPosts = useCallback(async (bust = false) => {
    const key = `blog:admin:${filter}:${submittedSearch}:${page}`;
    if (bust) bustPrefix("blog:admin:");

    if (!bust) {
      const cached = getCached<BlogResponse>(key);
      if (cached) {
        setPosts(cached.posts);
        setPagination(cached.pagination);
        setLoading(false);
        setRefreshing(false);
        return;
      }
    }

    try {
      const params = new URLSearchParams({ page: String(page), limit: String(LIMIT) });
      if (filter === "published") params.set("published", "true");
      else if (filter === "draft") params.set("published", "false");
      else params.set("published", "all");
      if (submittedSearch) params.set("search", submittedSearch);

      const res = await fetch(`/api/blog?${params}`);
      const data: BlogResponse = await res.json();
      setCached(key, data);
      setPosts(data.posts || []);
      setPagination(data.pagination || null);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filter, submittedSearch, page]);

  useEffect(() => {
    setLoading(true);
    fetchPosts();
  }, [fetchPosts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSubmittedSearch(search);
  };

  const handleFilterChange = (f: "all" | "published" | "draft") => {
    setFilter(f);
    setPage(1);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts(true);
  };

  const togglePublish = async (post: BlogPost) => {
    setActionLoading(`toggle-${post._id}`);
    try {
      await fetch(`/api/blog/${post._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !post.published }),
      });
      bustPrefix("blog:admin:");
      await fetchPosts(true);
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
      bustPrefix("blog:admin:");
      // If deleting the only item on a page > 1, go back
      if (posts.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        await fetchPosts(true);
      }
    } catch (err) {
      console.error("Failed to delete post:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const InlineSpinner = () => (
    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
  );

  const postStatus = (post: BlogPost) =>
    post.status || (post.published ? "published" : "draft");

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Blog Posts</h1>
          <p className="text-gray-500 text-sm mt-1">
            {pagination ? `${pagination.total} posts total` : "Manage your blog content"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={refreshing || loading}
            className="flex items-center gap-2 px-3 py-2 text-sm text-navy-600 hover:text-navy-900 hover:bg-navy-50 rounded-lg border border-gray-200 transition-colors disabled:opacity-50"
            title="Refresh posts"
          >
            <FiRefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-all duration-300"
          >
            <FiPlus size={18} />
            New Post
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-white border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-navy-900 text-white text-sm font-medium rounded-xl hover:bg-navy-800 transition-colors"
          >
            Search
          </button>
        </form>
        <div className="flex gap-2">
          {(["all", "published", "draft"] as const).map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
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
      {loading && !posts.length ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
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
        <div className={`transition-opacity ${refreshing ? "opacity-60" : "opacity-100"}`}>
          {/* Mobile cards */}
          <div className="sm:hidden space-y-3">
            {posts.map((post) => (
              <div key={post._id} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy-900 leading-snug">{post.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">/{post.slug}</p>
                  </div>
                  <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-medium ${
                    postStatus(post) === "published" ? "bg-green-50 text-green-600" :
                    postStatus(post) === "scheduled" ? "bg-navy-50 text-navy-600" :
                    "bg-gold-50 text-gold-600"
                  }`}>
                    {postStatus(post).charAt(0).toUpperCase() + postStatus(post).slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => togglePublish(post)}
                      disabled={!!actionLoading}
                      className="p-2 text-gray-400 hover:text-navy-900 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                      title={post.published ? "Unpublish" : "Publish"}
                    >
                      {actionLoading === `toggle-${post._id}` ? <InlineSpinner /> : post.published ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                    <Link href={`/admin/blog/${post._id}/edit`} className="p-2 text-gray-400 hover:text-navy-900 rounded-lg hover:bg-gray-100 transition-colors" title="Edit">
                      <FiEdit3 size={16} />
                    </Link>
                    <button
                      onClick={() => deletePost(post._id)}
                      disabled={!!actionLoading}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      {actionLoading === `delete-${post._id}` ? <InlineSpinner /> : <FiTrash2 size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-navy-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-navy-700 uppercase tracking-wider">Title</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-navy-700 uppercase tracking-wider hidden md:table-cell">Author</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-navy-700 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-navy-700 uppercase tracking-wider hidden lg:table-cell">Category</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-navy-700 uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-navy-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-navy-900 truncate max-w-[280px]">{post.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">/{post.slug}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{post.author}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        postStatus(post) === "published" ? "bg-green-50 text-green-600" :
                        postStatus(post) === "scheduled" ? "bg-navy-50 text-navy-600" :
                        "bg-gold-50 text-gold-600"
                      }`}>
                        {postStatus(post).charAt(0).toUpperCase() + postStatus(post).slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        {post.featured && <span className="text-gold-400 text-xs" title="Featured">★</span>}
                        <span>{post.category || "—"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => togglePublish(post)}
                          disabled={!!actionLoading}
                          className="p-2 text-gray-400 hover:text-navy-900 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                          title={post.published ? "Unpublish" : "Publish"}
                        >
                          {actionLoading === `toggle-${post._id}` ? <InlineSpinner /> : post.published ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                        </button>
                        <Link href={`/admin/blog/${post._id}/edit`} className="p-2 text-gray-400 hover:text-navy-900 rounded-lg hover:bg-gray-100 transition-colors" title="Edit">
                          <FiEdit3 size={16} />
                        </Link>
                        <button
                          onClick={() => deletePost(post._id)}
                          disabled={!!actionLoading}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          {actionLoading === `delete-${post._id}` ? <InlineSpinner /> : <FiTrash2 size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-500">
                Showing {((pagination.page - 1) * pagination.limit) + 1}–
                {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
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
                  {page} / {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={page >= pagination.totalPages}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
