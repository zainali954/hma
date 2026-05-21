import mongoose, { Schema, type Document } from "mongoose";

export interface ISiteSettings extends Document {
  siteName: string;
  tagline: string;
  description: string;
  logo: string;
  favicon: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  heroSection: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
  };
  aboutSection: {
    title: string;
    content: string;
    mission: string;
    vision: string;
    image: string;
  };
  stats: {
    label: string;
    value: string;
    icon: string;
  }[];
  services: {
    title: string;
    description: string;
    icon: string;
  }[];
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    ogImage: string;
    keywords: string;
  };
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    siteName: { type: String, default: "HMA Dubai" },
    tagline: { type: String, default: "Business Setup & Compliance Partner in Dubai" },
    description: {
      type: String,
      default:
        "Ministry of Economy licensed firm offering business setup, Golden Visa, tax, accounting and audit services in Dubai, UAE.",
    },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "" },
    email: { type: String, default: "dubai.office@hmaa.ae" },
    phone: { type: String, default: "+971 4 583 7001" },
    address: {
      type: String,
      default: "Office 1106, Burlington Tower, Business Bay, Dubai, UAE",
    },
    socialLinks: {
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
    heroSection: {
      title: { type: String, default: "Start Your Business in Dubai — The Right Way" },
      subtitle: {
        type: String,
        default:
          "Mainland, Free Zone and Offshore company formation by a Ministry of Economy licensed firm. Trade licence in 3–5 working days.",
      },
      ctaText: { type: String, default: "Free Setup Consultation" },
      ctaLink: { type: String, default: "/contact" },
      backgroundImage: { type: String, default: "" },
    },
    aboutSection: {
      title: { type: String, default: "About HMA Dubai" },
      content: { type: String, default: "" },
      mission: { type: String, default: "" },
      vision: { type: String, default: "" },
      image: { type: String, default: "" },
    },
    stats: [
      {
        label: { type: String, default: "Projects Completed" },
        value: { type: String, default: "500+" },
        icon: { type: String, default: "FiBriefcase" },
      },
    ],
    services: [
      {
        title: { type: String, default: "Business Consulting" },
        description: { type: String, default: "" },
        icon: { type: String, default: "FiTrendingUp" },
      },
    ],
    seo: {
      defaultTitle: {
        type: String,
        default: "HMA Dubai | Business Setup & Company Formation Specialists",
      },
      titleTemplate: { type: String, default: "%s | HMA Dubai" },
      defaultDescription: {
        type: String,
        default:
          "Business setup in Dubai made simple. Mainland, free zone and offshore company formation, Golden Visa, tax and audit — by a Ministry of Economy licensed firm.",
      },
      ogImage: { type: String, default: "" },
      keywords: {
        type: String,
        default:
          "business setup dubai, company formation dubai, mainland company dubai, free zone setup uae, golden visa uae, vat registration dubai, corporate tax uae, audit firm dubai, HMA dubai",
      },
    },
  },
  { timestamps: true }
);

export const SiteSettings =
  mongoose.models.SiteSettings ??
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
