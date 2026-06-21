"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";
import SeoSettings from "@/components/admin/blog/SeoSettings";
import SocialSharing from "@/components/admin/blog/SocialSharing";
import FaqBuilder from "@/components/admin/blog/FaqBuilder";
import KeyTakeaways from "@/components/admin/blog/KeyTakeaways";
import {
  FiSave,
  FiArrowLeft,
  FiEye,
  FiCalendar,
  FiFlag,
  FiStar,
  FiSlash,
  FiAlertTriangle,
} from "react-icons/fi";
import Link from "next/link";

const CATEGORIES = [
  "Business Setup",
  "Golden Visa",
  "Tax & VAT",
  "Accounting",
  "Audit",
  "UAE Economy",
  "General",
];

export default function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "scheduled">("draft");
  const [publishDate, setPublishDate] = useState("");
  const [featured, setFeatured] = useState(false);
  const [noIndex, setNoIndex] = useState(false);
  const [noFollow, setNoFollow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // SEO
  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");

  // Social
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");

  // AEO
  const [faqs, setFaqs] = useState<Array<{ question: string; answer: string }>>([]);
  const [keyTakeaways, setKeyTakeaways] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const post = data.post;
        setTitle(post.title);
        setSlug(post.slug);
        setExcerpt(post.excerpt || "");
        setContent(post.content || "");
        setCoverImage(post.coverImage || "");
        setTags((post.tags || []).join(", "));
        setCategory(post.category || "");
        setStatus(post.status || (post.published ? "published" : "draft"));
        setPublishDate(
          post.publishDate
            ? new Date(post.publishDate).toISOString().slice(0, 16)
            : ""
        );
        setFeatured(post.featured || false);
        setNoIndex(post.noIndex || false);
        setNoFollow(post.noFollow || false);
        // SEO
        setSeoTitle(post.seoTitle || "");
        setMetaDescription(post.metaDescription || "");
        setFocusKeyword(post.focusKeyword || "");
        setCanonicalUrl(post.canonicalUrl || "");
        // Social
        setOgTitle(post.ogTitle || "");
        setOgDescription(post.ogDescription || "");
        setOgImage(post.ogImage || "");
        // AEO
        setFaqs(post.faqs || []);
        setKeyTakeaways(post.keyTakeaways || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const generateSlug = (val: string) => {
    return val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!slug.trim()) newErrors.slug = "Slug is required";
    if (!content.trim()) newErrors.content = "Content is required";

    if (status === "scheduled" && !publishDate) {
      newErrors.publishDate = "Publish date is required for scheduled posts";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          coverImage,
          tags: tags
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean),
          category,
          published: status === "published" || status === "scheduled",
          status,
          publishDate: status === "scheduled" ? publishDate : null,
          featured,
          seoTitle,
          metaDescription,
          focusKeyword,
          canonicalUrl,
          ogTitle,
          ogDescription,
          ogImage,
          faqs,
          keyTakeaways,
          noIndex,
          noFollow,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }
      router.push("/admin/blog");
    } catch (err) {
      console.error("Failed to save post:", err);
      alert("Failed to save post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSeoChange = (field: string, value: string) => {
    const setters: Record<string, (v: string) => void> = {
      seoTitle: setSeoTitle,
      metaDescription: setMetaDescription,
      focusKeyword: setFocusKeyword,
      canonicalUrl: setCanonicalUrl,
    };
    setters[field]?.(value);
  };

  const handleSocialChange = (field: string, value: string) => {
    const setters: Record<string, (v: string) => void> = {
      ogTitle: setOgTitle,
      ogDescription: setOgDescription,
      ogImage: setOgImage,
    };
    setters[field]?.(value);
  };

  const seoData = { seoTitle, metaDescription, focusKeyword, canonicalUrl };
  const socialData = { ogTitle, ogDescription, ogImage };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 lg:p-6 pb-0">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="p-2 text-gray-400 hover:text-navy-900 rounded-lg hover:bg-gray-100 transition-all"
          >
            <FiArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Edit Post</h1>
            <p className="text-gray-500 text-sm">Update your blog post</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !title}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-all disabled:opacity-50"
        >
          <FiSave size={18} />
          {saving ? "Saving..." : "Update"}
        </button>
      </div>

      {/* Main editor + Sidebar */}
      <div className="flex gap-6 items-start p-4 lg:p-6">
        {/* Left — Main Editor */}
        <div className="flex-1 min-w-0 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-4 py-3 text-lg font-semibold rounded-xl border ${
                  errors.title ? "border-red-300 bg-red-50" : "border-gray-200"
                } focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all`}
                placeholder="Enter post title"
              />
              {errors.title && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <FiAlertTriangle size={12} />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Slug + Cover Image */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">
                  Slug <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  className={`w-full px-4 py-2.5 text-sm rounded-xl border ${
                    errors.slug ? "border-red-300 bg-red-50" : "border-gray-200"
                  } focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all`}
                  placeholder="post-url-slug"
                />
                {errors.slug && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertTriangle size={12} />
                    {errors.slug}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Cover Image Preview */}
            {coverImage && (
              <div className="rounded-lg overflow-hidden border border-gray-200 max-w-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full h-36 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Excerpt
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all resize-none"
                placeholder="Brief description for blog listing..."
              />
            </div>

            {/* Tags + Category */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                  placeholder="business, strategy, dubai"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all bg-white"
                >
                  <option value="">Uncategorized</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-3">
                Content <span className="text-red-400">*</span>
              </label>
              <RichTextEditor content={content} onChange={setContent} />
              {errors.content && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <FiAlertTriangle size={12} />
                  {errors.content}
                </p>
              )}
            </div>

            {/* Preview */}
            {content && (
              <div className="border-t border-gray-200 pt-4">
                <details className="group">
                  <summary className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:text-navy-900 transition-colors">
                    <FiEye size={16} />
                    Preview
                  </summary>
                  <div
                    className="mt-4 blog-content p-4 bg-gray-50 rounded-xl"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </details>
              </div>
            )}
          </div>
        </div>

        {/* Right — Sidebar (wider, sticky) */}
        <div className="hidden lg:flex lg:flex-col w-[380px] xl:w-[420px] flex-shrink-0 space-y-6 sticky top-6">
          {/* Status & Scheduling */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-navy-900 flex items-center gap-2">
              <FiFlag size={15} />
              Status
            </h3>
            <div className="space-y-3">
              {(["draft", "published", "scheduled"] as const).map((s) => (
                <label
                  key={s}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    status === s
                      ? "border-gold-400 bg-gold-50/50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={s}
                    checked={status === s}
                    onChange={(e) => setStatus(e.target.value as typeof status)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      status === s ? "border-gold-400" : "border-gray-300"
                    }`}
                  >
                    {status === s && (
                      <div className="w-2 h-2 rounded-full bg-gold-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-900 capitalize">{s}</p>
                    <p className="text-xs text-gray-400">
                      {s === "draft" && "Not visible to visitors"}
                      {s === "published" && "Live on your site"}
                      {s === "scheduled" && "Publish on a future date"}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {status === "scheduled" && (
              <div>
                <label className="block text-xs font-medium text-navy-900 mb-1.5 flex items-center gap-1.5">
                  <FiCalendar size={13} />
                  Publish Date
                </label>
                <input
                  type="datetime-local"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className={`w-full px-3 py-2 text-sm rounded-xl border ${
                    errors.publishDate ? "border-red-300 bg-red-50" : "border-gray-200"
                  } focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all`}
                />
                {errors.publishDate && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertTriangle size={12} />
                    {errors.publishDate}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Featured */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-navy-900 flex items-center gap-2">
              <FiStar size={15} />
              Promotion
            </h3>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-navy-900">Featured Post</p>
                <p className="text-xs text-gray-400">Highlight this post</p>
              </div>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-navy-900 relative" />
            </label>
          </div>

          {/* Indexing */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-navy-900 flex items-center gap-2">
              <FiSlash size={15} />
              Indexing
            </h3>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-navy-900">No Index</p>
                <p className="text-xs text-gray-400">Hide from search engines</p>
              </div>
              <input
                type="checkbox"
                checked={noIndex}
                onChange={(e) => setNoIndex(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500 relative" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-navy-900">No Follow</p>
                <p className="text-xs text-gray-400">Don&apos;t follow links</p>
              </div>
              <input
                type="checkbox"
                checked={noFollow}
                onChange={(e) => setNoFollow(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500 relative" />
            </label>
          </div>

          {/* SEO Settings */}
          <SeoSettings
            {...seoData}
            postTitle={title}
            excerpt={excerpt}
            onChange={handleSeoChange}
          />

          {/* Social Sharing */}
          <SocialSharing
            {...socialData}
            seoTitle={seoTitle}
            metaDescription={metaDescription}
            postTitle={title}
            excerpt={excerpt}
            coverImage={coverImage}
            onChange={handleSocialChange}
          />

          {/* FAQ Builder */}
          <FaqBuilder faqs={faqs} onChange={setFaqs} />

          {/* Key Takeaways */}
          <KeyTakeaways takeaways={keyTakeaways} onChange={setKeyTakeaways} />
        </div>
      </div>
    </div>
  );
}
