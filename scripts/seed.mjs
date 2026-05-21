import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import pkg from "@next/env";
const { loadEnvConfig } = pkg;

loadEnvConfig(process.cwd());

async function seed() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set. Check your .env.local file.");
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const UserSchema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, enum: ["admin", "editor"], default: "admin" },
    }, { timestamps: true });

    const User = mongoose.models.User || mongoose.model("User", UserSchema);

    // Check if admin user exists
    const existing = await User.findOne({ username: "admin" });
    if (existing) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 12);

    await User.create({
      username: "admin",
      email: "admin@hmaadubai.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created successfully!");
    console.log("Username: admin");
    console.log("Password: admin123");

    // Create default site settings
    const SettingsSchema = new mongoose.Schema({}, { timestamps: true, strict: false });
    const SiteSettings = mongoose.models.SiteSettings || mongoose.model("SiteSettings", SettingsSchema);

    const existingSettings = await SiteSettings.findOne();
    if (!existingSettings) {
      await SiteSettings.create({
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
        aboutSection: { title: "About HMA Dubai", content: "", mission: "", vision: "" },
        stats: [
          { label: "Projects Completed", value: "500+", icon: "FiBriefcase" },
          { label: "Happy Clients", value: "200+", icon: "FiUsers" },
          { label: "Years of Experience", value: "15+", icon: "FiClock" },
          { label: "Team Members", value: "50+", icon: "FiAward" },
        ],
        services: [
          { title: "Business Consulting", description: "Strategic business consulting to optimize operations and drive growth.", icon: "FiTrendingUp" },
          { title: "Market Research", description: "In-depth market analysis to identify opportunities.", icon: "FiBarChart2" },
          { title: "Risk Management", description: "Comprehensive risk assessment strategies.", icon: "FiShield" },
        ],
      });
      console.log("Default site settings created!");
    }

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();
