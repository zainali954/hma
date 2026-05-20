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
    siteName: { type: String, default: "HMAA Dubai" },
    tagline: { type: String, default: "Excellence in Consultancy" },
    description: { type: String, default: "Premier consultancy agency in Dubai" },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "" },
    email: { type: String, default: "info@hmaadubai.com" },
    phone: { type: String, default: "+971 XX XXX XXXX" },
    address: { type: String, default: "Dubai, United Arab Emirates" },
    socialLinks: {
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
    heroSection: {
      title: { type: String, default: "Strategic Consulting Excellence" },
      subtitle: {
        type: String,
        default:
          "Empowering businesses with professional consultancy services in Dubai and beyond",
      },
      ctaText: { type: String, default: "Get Started" },
      ctaLink: { type: String, default: "/contact" },
      backgroundImage: { type: String, default: "" },
    },
    aboutSection: {
      title: { type: String, default: "About HMAA Dubai" },
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
      defaultTitle: { type: String, default: "HMAA Dubai | Premier Consultancy Agency" },
      titleTemplate: { type: String, default: "%s | HMAA Dubai" },
      defaultDescription: {
        type: String,
        default:
          "HMAA Dubai is a leading consultancy agency offering professional business consulting services in Dubai, UAE.",
      },
      ogImage: { type: String, default: "" },
      keywords: {
        type: String,
        default:
          "consultancy, dubai, business consulting, HMAA, UAE, professional services",
      },
    },
  },
  { timestamps: true }
);

export const SiteSettings =
  mongoose.models.SiteSettings ??
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
