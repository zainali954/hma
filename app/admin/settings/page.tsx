"use client";

import { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";

interface Settings {
  siteName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    keywords: string;
  };
  heroSection: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
  aboutSection: {
    title: string;
    content: string;
    mission: string;
    vision: string;
  };
}

const defaultSettings: Settings = {
  siteName: "HMA Dubai",
  tagline: "Business Setup & Compliance Partner in Dubai",
  description:
    "Ministry of Economy licensed firm offering business setup, Golden Visa, tax, accounting and audit services in Dubai, UAE.",
  email: "dubai.office@hmaa.ae",
  phone: "+971 4 583 7001",
  address: "Office 1106, Burlington Tower, Business Bay, Dubai, UAE",
  socialLinks: { facebook: "", twitter: "", linkedin: "", instagram: "" },
  seo: {
    defaultTitle: "HMA Dubai | Business Setup & Company Formation Specialists",
    titleTemplate: "%s | HMA Dubai",
    defaultDescription:
      "Business setup in Dubai made simple. Mainland, free zone and offshore company formation, Golden Visa, tax and audit — by a Ministry of Economy licensed firm.",
    keywords:
      "business setup dubai, company formation dubai, mainland company dubai, free zone setup uae, golden visa uae, vat registration dubai, corporate tax uae, audit firm dubai, HMA dubai",
  },
  heroSection: {
    title: "Start Your Business in Dubai — The Right Way",
    subtitle:
      "Mainland, Free Zone and Offshore company formation by a Ministry of Economy licensed firm. Trade licence in 3–5 working days.",
    ctaText: "Free Setup Consultation",
    ctaLink: "/contact",
  },
  aboutSection: {
    title: "About HMA Dubai",
    content: "",
    mission: "",
    vision: "",
  },
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "general" | "social" | "seo" | "hero" | "about"
  >("general");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { _id, updatedAt, createdAt, __v, ...rest } = data.settings;
          setSettings(rest as Settings);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const updateField = (
    section: string,
    field: string,
    value: string | Record<string, string>
  ) => {
    setSettings((prev) => {
      const p = prev as unknown as Record<string, unknown>;
      if (typeof value === "object") {
        return {
          ...prev,
          [section]: { ...(p[section] as Record<string, string>), ...value },
        };
      }
      if (section && field) {
        return {
          ...prev,
          [section]: {
            ...(p[section] as Record<string, string>),
            [field]: value,
          },
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to save");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save settings:", err);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: "general", label: "General" },
    { id: "social", label: "Social Links" },
    { id: "seo", label: "SEO" },
    { id: "hero", label: "Hero Section" },
    { id: "about", label: "About Section" },
  ] as const;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Site Settings</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your website configuration
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-all disabled:opacity-50"
        >
          <FiSave size={18} />
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-white text-navy-900 shadow-sm"
                : "text-gray-500 hover:text-navy-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        {activeTab === "general" && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Description
              </label>
              <textarea
                value={settings.description}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all resize-none"
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="space-y-6">
            <p className="text-sm text-gray-500">
              Enter full URLs including https://
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {(["facebook", "twitter", "linkedin", "instagram"] as const).map(
                (platform) => (
                  <div key={platform}>
                    <label className="block text-sm font-medium capitalize text-navy-900 mb-2">
                      {platform}
                    </label>
                    <input
                      type="text"
                      value={settings.socialLinks[platform]}
                      onChange={(e) =>
                        updateField("socialLinks", platform, e.target.value)
                      }
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                      placeholder={`https://${platform}.com/...`}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {activeTab === "seo" && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">
                  Default Title
                </label>
                <input
                  type="text"
                  value={settings.seo.defaultTitle}
                  onChange={(e) =>
                    updateField("seo", "defaultTitle", e.target.value)
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">
                  Title Template
                </label>
                <input
                  type="text"
                  value={settings.seo.titleTemplate}
                  onChange={(e) =>
                    updateField("seo", "titleTemplate", e.target.value)
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Use %s as placeholder for page title
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Default Description
              </label>
              <textarea
                value={settings.seo.defaultDescription}
                onChange={(e) =>
                  updateField("seo", "defaultDescription", e.target.value)
                }
                rows={3}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Keywords (comma separated)
              </label>
              <input
                type="text"
                value={settings.seo.keywords}
                onChange={(e) => updateField("seo", "keywords", e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
              />
            </div>
          </div>
        )}

        {activeTab === "hero" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Hero Title
              </label>
              <input
                type="text"
                value={settings.heroSection.title}
                onChange={(e) =>
                  updateField("heroSection", "title", e.target.value)
                }
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Hero Subtitle
              </label>
              <textarea
                value={settings.heroSection.subtitle}
                onChange={(e) =>
                  updateField("heroSection", "subtitle", e.target.value)
                }
                rows={3}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all resize-none"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">
                  CTA Text
                </label>
                <input
                  type="text"
                  value={settings.heroSection.ctaText}
                  onChange={(e) =>
                    updateField("heroSection", "ctaText", e.target.value)
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">
                  CTA Link
                </label>
                <input
                  type="text"
                  value={settings.heroSection.ctaLink}
                  onChange={(e) =>
                    updateField("heroSection", "ctaLink", e.target.value)
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Section Title
              </label>
              <input
                type="text"
                value={settings.aboutSection.title}
                onChange={(e) =>
                  updateField("aboutSection", "title", e.target.value)
                }
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Content
              </label>
              <textarea
                value={settings.aboutSection.content}
                onChange={(e) =>
                  updateField("aboutSection", "content", e.target.value)
                }
                rows={5}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all resize-none"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">
                  Mission Statement
                </label>
                <textarea
                  value={settings.aboutSection.mission}
                  onChange={(e) =>
                    updateField("aboutSection", "mission", e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">
                  Vision Statement
                </label>
                <textarea
                  value={settings.aboutSection.vision}
                  onChange={(e) =>
                    updateField("aboutSection", "vision", e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
