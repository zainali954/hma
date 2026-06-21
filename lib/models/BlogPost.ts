import mongoose, { Schema, type Document } from "mongoose";

export interface IFaq {
  question: string;
  answer: string;
}

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  category: string;
  published: boolean;
  featured: boolean;
  status: "draft" | "published" | "scheduled";
  publishDate: Date | null;
  // SEO
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl: string;
  // Social Sharing
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  // AEO
  faqs: IFaq[];
  keyTakeaways: string[];
  // Technical
  noIndex: boolean;
  noFollow: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FaqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    author: { type: String, default: "HMA Dubai" },
    tags: [{ type: String, trim: true }],
    category: { type: String, default: "" },
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["draft", "published", "scheduled"], default: "draft" },
    publishDate: { type: Date, default: null },
    // SEO
    seoTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    focusKeyword: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" },
    // Social Sharing
    ogTitle: { type: String, default: "" },
    ogDescription: { type: String, default: "" },
    ogImage: { type: String, default: "" },
    // AEO
    faqs: { type: [FaqSchema], default: [] },
    keyTakeaways: [{ type: String, trim: true }],
    // Technical
    noIndex: { type: Boolean, default: false },
    noFollow: { type: Boolean, default: false },
  },
  { timestamps: true }
);

BlogPostSchema.index({ published: 1, createdAt: -1 });
BlogPostSchema.index({ status: 1, publishDate: 1 });
BlogPostSchema.index({ category: 1 });

export const BlogPost =
  mongoose.models.BlogPost ?? mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
