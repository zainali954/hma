export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import AnimatedSection from "@/components/animations/AnimatedSection";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/lib/models/BlogPost";
import {
  FiArrowRight,
  FiTrendingUp,
  FiBarChart2,
  FiGlobe,
  FiBookOpen,
  FiSearch,
  FiHome,
  FiCoffee,
  FiPackage,
  FiGrid,
  FiFileText,
  FiCalendar,
  FiAward,
  FiBriefcase,
  FiCpu,
  FiShoppingBag,
  FiTruck,
  FiMonitor,
  FiHeart,
  FiCheck,
  FiX,
  FiMessageCircle,
  FiShield,
  FiUsers,
  FiLayers,
  FiCreditCard,
  FiUser,
  FiMapPin,
} from "react-icons/fi";

/* ─────────────────────────────────────────────
   SEO Metadata
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Business Setup in Dubai | Company Formation Experts | HMA",
  description:
    "Launch your Dubai business in as little as 3 days. Mainland, Free Zone & Offshore company formation by Ministry of Economy licensed Chartered Accountants. 150+ businesses formed.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Business Setup in Dubai — HMA Chartered Accountants",
    description:
      "Mainland, Free Zone & Offshore company formation with end-to-end support for licensing, visas, banking, tax and compliance. Ministry of Economy licensed firm.",
    url: "/",
    type: "website",
  },
};

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const industriesData = [
  { icon: FiShoppingBag, label: "E-Commerce & Retail" },
  { icon: FiBriefcase,   label: "Consulting & Services" },
  { icon: FiCpu,         label: "Tech & SaaS" },
  { icon: FiTrendingUp,  label: "Trading & Holding" },
  { icon: FiCoffee,      label: "Food & Beverage" },
  { icon: FiHome,        label: "Real Estate" },
  { icon: FiHeart,       label: "Healthcare & Clinics" },
  { icon: FiBookOpen,    label: "Education & Training" },
  { icon: FiTruck,       label: "Logistics & Freight" },
  { icon: FiPackage,     label: "Manufacturing" },
  { icon: FiMonitor,     label: "Media & Marketing" },
  { icon: FiGlobe,       label: "Import & Export" },
];

const statsData = [
  { label: "Businesses Launched", value: 150, suffix: "+" },
  { label: "Free Zones Covered",  value: 40,  suffix: "+" },
  { label: "Years in the UAE",    value: 8,   suffix: "+" },
  { label: "Client Retention",    value: 98,  suffix: "%" },
];

const whyUsData = [
  {
    Icon: FiAward,
    title: "Chartered Accountants",
    description:
      "ICAEW, ACCA and AICPA-qualified professionals review every client file — from incorporation to first audit. Not PRO agents. Not middlemen.",
  },
  {
    Icon: FiCreditCard,
    title: "Banking Support",
    description:
      "We prepare your full documentation pack, advise on the right bank for your activity, and guide you through UAE corporate account opening — end to end.",
  },
  {
    Icon: FiFileText,
    title: "Tax Readiness from Day One",
    description:
      "Corporate Tax and VAT registration handled before your first invoice. UAE's tax landscape managed by FTA Registered Tax Agents.",
  },
  {
    Icon: FiLayers,
    title: "End-to-End Support",
    description:
      "From trade licence to annual audit under one roof. No handoffs, no knowledge gaps, no expensive surprises when compliance season arrives.",
  },
  {
    Icon: FiShield,
    title: "Ministry of Economy Licensed",
    description:
      "Legally authorised to practise audit, tax advisory and business setup under UAE law. A licensed professional firm — not a middleman agency.",
  },
  {
    Icon: FiUsers,
    title: "Dedicated UAE Experts",
    description:
      "An Emirati business leader with deep government authority relationships, and an ICAEW Chartered Accountant — both working for you from day one.",
  },
];

const freeZonesData = [
  {
    name: "IFZA",
    full: "International Free Zone Authority",
    benefit: "Best for cost-effective multi-activity licences. Fast approvals.",
    from: "AED 6,900",
    tag: "Most Popular",
    slug: "ifza",
  },
  {
    name: "Meydan",
    full: "Meydan Free Zone, Dubai",
    benefit: "Zero paid-up capital. Ideal for consultants, coaches and startups.",
    from: "AED 9,000",
    tag: null,
    slug: "meydan",
  },
  {
    name: "SHAMS",
    full: "Sharjah Media City",
    benefit: "Low-cost option for media, tech, creative and digital businesses.",
    from: "AED 5,750",
    tag: "Affordable",
    slug: "shams",
  },
  {
    name: "SPC",
    full: "Sharjah Publishing City",
    benefit: "Publishing, education, research and knowledge-economy businesses.",
    from: "AED 5,500",
    tag: null,
    slug: "spc",
  },
  {
    name: "RAKEZ",
    full: "Ras Al Khaimah Economic Zone",
    benefit: "Manufacturing, trading and industrial licence packages.",
    from: "AED 8,000",
    tag: null,
    slug: "rakez",
  },
  {
    name: "Dubai South",
    full: "Dubai South Free Zone",
    benefit: "Aviation, logistics and e-commerce near Al Maktoum Airport.",
    from: "AED 7,500",
    tag: null,
    slug: "dubai-south",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Free Consultation",
    description:
      "We review your business goals, activity and budget. You receive clear advice on costs, structure and timelines — with no obligation.",
    timeline: "Day 1",
    Icon: FiMessageCircle,
  },
  {
    step: "02",
    title: "Jurisdiction Selection",
    description:
      "Free Zone, Mainland or Offshore. We match the right structure to your visa needs, market access and long-term goals.",
    timeline: "Day 1–2",
    Icon: FiMapPin,
  },
  {
    step: "03",
    title: "Trade Licence",
    description:
      "We handle all government submissions, activity approvals and authority coordination. Licence issued in as little as 3 working days.",
    timeline: "Day 3–7",
    Icon: FiFileText,
  },
  {
    step: "04",
    title: "Visa & Emirates ID",
    description:
      "Residency visa, medical, biometrics and Emirates ID — fully coordinated by your dedicated consultant. Family visas available.",
    timeline: "Week 2–3",
    Icon: FiUser,
  },
  {
    step: "05",
    title: "Bank Account Opening",
    description:
      "We prepare your full banking documentation, advise on bank selection by business type, and support you through the full account opening process.",
    timeline: "Week 3–5",
    Icon: FiCreditCard,
  },
  {
    step: "06",
    title: "Tax & Compliance",
    description:
      "Corporate Tax and VAT registration, accounting setup and annual compliance — all managed by our ICAEW-qualified team from day one.",
    timeline: "Ongoing",
    Icon: FiBarChart2,
  },
];

/* Placeholder testimonials — replace with verified Google Reviews before launch */
const testimonialsData = [
  {
    initial: "J",
    name: "James R.",
    type: "UK Entrepreneur",
    rating: 5,
    text: "HMA handled the entire formation seamlessly — trade licence, visa, bank account. As a UK national setting up in Dubai for the first time, having a Chartered Accountant on my side made all the difference.",
  },
  {
    initial: "S",
    name: "Sarah M.",
    type: "Startup Founder",
    rating: 5,
    text: "I was overwhelmed by the options. HMA walked me through jurisdiction selection, visa requirements and banking. Fully operational in under three weeks. Their compliance support is outstanding.",
  },
  {
    initial: "A",
    name: "Ahmed K.",
    type: "Trading Company",
    rating: 5,
    text: "What impressed me most was the proactive tax support. They registered us for Corporate Tax before we even knew it was a requirement. The depth of knowledge goes far beyond a typical setup firm.",
  },
];

/* ─────────────────────────────────────────────
   Blog helper
───────────────────────────────────────────── */
async function getLatestPosts() {
  try {
    await connectDB();
    const posts = await BlogPost.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();
    return posts as Array<{
      _id: { toString(): string };
      title: string;
      slug: string;
      excerpt?: string;
      coverImage?: string;
      createdAt: Date;
    }>;
  } catch {
    return [];
  }
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default async function HomePage() {
  const posts = await getLatestPosts();

  return (
    <>
      {/* 1 ── Hero */}
      <HeroSection />

      {/* 2 ── Authority Bar */}
      <section className="py-5 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase whitespace-nowrap flex-shrink-0">
              Certified &amp; Licensed By
            </p>
            <div className="hidden sm:block w-px h-7 bg-gray-200 flex-shrink-0" />
            <div className="flex items-center justify-center sm:justify-start flex-wrap gap-5 sm:gap-7">
              {[
                { name: "ICAEW", src: "/images/ICAEW-logo-small.png" },
                { name: "ACCA",  src: "/images/acca.png" },
                { name: "AICPA", src: "/images/aicpaLogo.png" },
                { name: "CIA",   src: "/images/CIA.png" },
              ].map((logo) => (
                <div key={logo.name} className="w-16 sm:w-20 h-8 flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={80}
                    height={32}
                    className="object-contain w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
              <div className="hidden sm:block w-px h-7 bg-gray-200 flex-shrink-0" />
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-[9px] sm:text-[10px] font-bold text-navy-700 uppercase tracking-[0.08em] sm:tracking-wider whitespace-nowrap">
                  <FiShield size={10} className="text-navy-900" />
                  Ministry of Economy Licensed
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-gold-50 border border-gold-200 rounded-full text-[9px] sm:text-[10px] font-bold text-gold-700 uppercase tracking-[0.08em] sm:tracking-wider whitespace-nowrap">
                  <FiFileText size={10} className="text-gold-600" />
                  FTA Registered Tax Agent
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 ── More Than A Business Setup Agency */}
      <section className="py-20 bg-navy-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.25em] text-gold-400 uppercase mb-3">Our Difference</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase">
              More Than A Business Setup Agency
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base leading-relaxed">
              Most setup firms stop after issuing your trade licence. HMA supports you through every stage of your business journey — under one roof.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
            <AnimatedSection direction="left">
              <div className="rounded-xl border border-white/10 bg-white/5 p-8 h-full">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-6">
                  Typical Setup Agency
                </p>
                <ul className="space-y-3">
                  {[
                    { label: "Trade Licence",         ok: true  },
                    { label: "Visa Processing",        ok: false },
                    { label: "Bank Account Opening",   ok: false },
                    { label: "Corporate Tax",          ok: false },
                    { label: "VAT Compliance",         ok: false },
                    { label: "Accounting",             ok: false },
                    { label: "Audit & Assurance",      ok: false },
                    { label: "Licence Renewal",        ok: false },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center gap-3">
                      {item.ok
                        ? <FiCheck className="text-white/50 flex-shrink-0" size={15} />
                        : <FiX className="text-white/25 flex-shrink-0" size={15} />
                      }
                      <span className={`text-sm font-medium ${item.ok ? "text-white/60" : "text-white/30 line-through"}`}>
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-white/45 italic border-t border-white/10 pt-5">
                  Then you&apos;re on your own.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}>
              <div className="rounded-xl border border-gold-400/40 bg-gold-400/5 p-8 relative h-full">
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gold-400 rounded-full" />
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold-400 mb-6">
                  HMA — Full Service
                </p>
                <ul className="space-y-3">
                  {[
                    "Trade Licence",
                    "Visa Processing",
                    "Bank Account Opening",
                    "Corporate Tax",
                    "VAT Compliance",
                    "Accounting",
                    "Audit & Assurance",
                    "Licence Renewal",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <FiCheck className="text-gold-400 flex-shrink-0" size={15} />
                      <span className="text-sm font-medium text-white">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-gold-400/60 italic border-t border-gold-400/10 pt-5">
                  One firm. From day one to year-end audit — and every renewal in between.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection className="text-center mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold-400 text-navy-950 font-black text-sm rounded-lg hover:bg-gold-300 transition-all duration-200 uppercase tracking-wide"
            >
              Get the Full-Service Setup
              <FiArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* 4 ── 6-Step Business Setup Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 uppercase">
              Your Business Setup In 6 Steps
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              From first conversation to full UAE compliance — a clear process, clear timelines, no surprises.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.step} delay={i * 0.07}>
                <div className="bg-white border border-gray-100 rounded-xl p-5 sm:p-6 hover:border-gold-300 hover:shadow-md transition-all duration-200 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-navy-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gold-400 font-black text-xs">{step.step}</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gold-600">
                      {step.timeline}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <step.Icon className="text-navy-900 flex-shrink-0" size={15} />
                    <h3 className="text-sm font-black text-navy-900 uppercase tracking-wide leading-snug">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link
              href="/contact?service=business-setup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-navy-900 text-white font-bold text-sm rounded-lg hover:bg-navy-800 transition-all duration-200 uppercase tracking-wide"
            >
              Start Step 1 — Free Consultation
              <FiArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* 5 ── Mainland vs Free Zone vs Offshore */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <p className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase mb-3">
              Plain-English Breakdown
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 uppercase">
              Mainland vs Free Zone vs Offshore
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
              Not sure which jurisdiction fits your business? 80% of our clients don&apos;t know the answer before they speak to us. Here&apos;s the breakdown.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="sm:hidden text-xs text-center text-gray-400 mb-3">← Swipe to compare →</p>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-[640px] px-4 sm:px-0">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left p-4 text-xs font-bold uppercase tracking-wider text-gray-400 w-36" />
                      <th className="p-4 bg-navy-900 text-white text-sm font-bold uppercase tracking-wide rounded-t-xl text-center">
                        Mainland
                      </th>
                      <th className="p-4 bg-gold-400 text-navy-950 text-sm font-bold uppercase tracking-wide rounded-t-xl text-center">
                        Free Zone
                        <span className="block text-[9px] font-bold tracking-[0.12em] mt-0.5 opacity-70 normal-case">
                          Most Popular
                        </span>
                      </th>
                      <th className="p-4 bg-navy-950 text-gray-300 text-sm font-bold uppercase tracking-wide rounded-t-xl text-center">
                        Offshore
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        factor: "UAE Trading",
                        mainland: "✓ Full local market",
                        freezone: "Restricted — agent needed",
                        offshore: "✗ Not permitted",
                      },
                      {
                        factor: "Ownership",
                        mainland: "100% Foreign",
                        freezone: "100% Foreign",
                        offshore: "100% Foreign",
                      },
                      {
                        factor: "Office",
                        mainland: "Required (flexi-desk OK)",
                        freezone: "Virtual office OK",
                        offshore: "No office required",
                      },
                      {
                        factor: "Visa Quota",
                        mainland: "Flexible",
                        freezone: "Fixed per package",
                        offshore: "Not applicable",
                      },
                      {
                        factor: "Corporate Tax",
                        mainland: "9% (standard)",
                        freezone: "0% qualifying income",
                        offshore: "Exempt",
                      },
                      {
                        factor: "Banking",
                        mainland: "All UAE banks",
                        freezone: "Most UAE banks",
                        offshore: "Limited options",
                      },
                      {
                        factor: "Starting Cost",
                        mainland: "AED 15,000+",
                        freezone: "AED 6,000+",
                        offshore: "AED 10,000+",
                      },
                      {
                        factor: "Best For",
                        mainland: "Retail, F&B, Services",
                        freezone: "Tech, Consulting, E-comm",
                        offshore: "Asset holding, Intl trade",
                      },
                    ].map((row, i) => (
                      <tr key={row.factor} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">{row.factor}</td>
                        <td className="p-4 text-center text-sm text-navy-900 font-medium">{row.mainland}</td>
                        <td className="p-4 text-center text-sm text-navy-900 font-medium bg-gold-50/50">{row.freezone}</td>
                        <td className="p-4 text-center text-sm text-navy-900 font-medium">{row.offshore}</td>
                      </tr>
                    ))}
                    <tr>
                      <td />
                      <td className="p-4 text-center bg-navy-900 rounded-b-xl">
                        <Link
                          href="/contact?service=mainland"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-navy-900 rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-gray-100 transition-colors"
                        >
                          I want Mainland <FiArrowRight size={11} />
                        </Link>
                      </td>
                      <td className="p-4 text-center bg-gold-400 rounded-b-xl">
                        <Link
                          href="/contact?service=freezone"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-navy-950 text-white rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-navy-900 transition-colors"
                        >
                          I want Free Zone <FiArrowRight size={11} />
                        </Link>
                      </td>
                      <td className="p-4 text-center bg-navy-950 rounded-b-xl">
                        <Link
                          href="/contact?service=offshore"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-white/20 transition-colors"
                        >
                          I want Offshore <FiArrowRight size={11} />
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="text-center mt-5">
              <Link
                href="/contact"
                className="text-sm text-gray-400 hover:text-gold-600 transition-colors underline underline-offset-2"
              >
                Not sure which fits? Tell us what you&apos;re building →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 6 ── Business Setup Packages */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase mb-3">
              Transparent Pricing
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 uppercase">
              Business Setup Packages
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              Prices vary by jurisdiction and activity. All quotes are free, detailed, and obligation-free.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {[
              {
                name: "Free Zone Setup",
                badge: null,
                jurisdiction: "Free Zone",
                price: "From AED 6,000",
                timeline: "Licence in ~3 days",
                description: "Launch your UAE company from a free zone — the fastest, most cost-effective route for solo founders, consultants and digital businesses.",
                features: [
                  "Free Zone Trade Licence",
                  "1 Residency Visa",
                  "Bank Account Introduction",
                  "VAT Registration",
                  "Dedicated Setup Consultant",
                ],
                cta: "Enquire About Free Zone Setup",
                href: "/contact?package=freezone",
                featured: false,
              },
              {
                name: "Mainland Setup",
                badge: "Most Popular",
                jurisdiction: "Mainland DED",
                price: "From AED 15,000",
                timeline: "Licence in ~5 days",
                description: "Full UAE market access with visa quota for growing teams. The most flexible licence type — trade anywhere in the UAE.",
                features: [
                  "Mainland DED Trade Licence",
                  "Up to 3 Residency Visas",
                  "Bank Account Introduction",
                  "VAT Registration",
                  "Corporate Tax Registration",
                  "Dedicated Setup Consultant",
                ],
                cta: "Enquire About Mainland Setup",
                href: "/contact?package=mainland",
                featured: true,
              },
              {
                name: "Full-Service Setup",
                badge: null,
                jurisdiction: "End-to-End",
                price: "Custom Quote",
                timeline: "Full setup ~3 weeks",
                description: "End-to-end company formation plus ongoing accounting, tax advisory and annual audit — everything in one engagement.",
                features: [
                  "Choice of Jurisdiction",
                  "Unlimited Visas Advisory",
                  "Bank Account Introduction",
                  "Full Accounting Setup",
                  "VAT & Corporate Tax Filing",
                  "Annual Audit Package",
                  "Dedicated Senior Consultant",
                ],
                cta: "Get a Custom Quote",
                href: "/contact?package=fullservice",
                featured: false,
              },
            ].map((pkg, i) => (
              <AnimatedSection key={pkg.name} delay={i * 0.08}>
                <div
                  className={`relative flex flex-col rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    pkg.featured
                      ? "bg-navy-900 border-gold-400/50"
                      : "bg-white border-gray-200 hover:border-gold-300"
                  }`}
                >
                  {pkg.featured && <div className="h-1 bg-gold-400" />}
                  <div className="p-8 flex flex-col">
                    {pkg.badge && (
                      <span className="inline-block mb-4 px-3 py-1 bg-gold-400/20 text-gold-400 text-[9px] font-bold tracking-[0.18em] uppercase rounded-full self-start">
                        {pkg.badge}
                      </span>
                    )}
                    <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-1 ${pkg.featured ? "text-gold-400" : "text-gold-600"}`}>
                      {pkg.jurisdiction}
                    </p>
                    <h3 className={`text-xl font-black uppercase mb-1 ${pkg.featured ? "text-white" : "text-navy-900"}`}>
                      {pkg.name}
                    </h3>
                    <p className={`text-xl font-bold mb-1 ${pkg.featured ? "text-gold-400" : "text-navy-900"}`}>
                      {pkg.price}
                    </p>
                    <p className={`text-[10px] font-bold tracking-[0.1em] uppercase mb-4 ${pkg.featured ? "text-gold-400/60" : "text-gold-600/70"}`}>
                      {pkg.timeline}
                    </p>
                    <p className={`text-sm mb-6 leading-relaxed ${pkg.featured ? "text-gray-400" : "text-gray-500"}`}>
                      {pkg.description}
                    </p>
                    <ul className="space-y-2.5 mb-8">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <FiCheck
                            className={`flex-shrink-0 mt-0.5 ${pkg.featured ? "text-gold-400" : "text-gold-600"}`}
                            size={14}
                          />
                          <span className={`text-sm ${pkg.featured ? "text-gray-300" : "text-gray-600"}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={pkg.href}
                      className={`mt-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-200 ${
                        pkg.featured
                          ? "bg-gold-400 text-navy-950 hover:bg-gold-300"
                          : "bg-navy-900 text-white hover:bg-navy-800"
                      }`}
                    >
                      {pkg.cta}
                      <FiArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              All prices exclude UAE government fees, which vary by jurisdiction and activity. Final cost breakdowns are provided free of charge.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 7 ── Banking Support */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: copy */}
            <AnimatedSection direction="left">
              <p className="text-xs font-bold tracking-[0.25em] text-gold-400 uppercase mb-4">Banking Support</p>
              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase mb-6 leading-tight">
                UAE Bank Accounts Are Harder To Open Than You Think
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Most setup firms hand you a contact number and step away. UAE banks require extensive compliance documentation, and new companies frequently face rejection without proper preparation. HMA handles it differently.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Full documentation pack prepared before your bank appointment",
                  "Bank selection matched to your business activity and structure",
                  "Personal introduction to relationship managers at partner banks",
                  "Guidance through all KYC, compliance and UBO requirements",
                  "Post-opening support for additional signatories and services",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <FiCheck className="text-gold-400 flex-shrink-0 mt-0.5" size={15} />
                    <span className="text-gray-300 text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact?service=banking"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold-400 text-navy-950 font-black text-sm rounded-lg hover:bg-gold-300 transition-all duration-200 uppercase tracking-wide"
              >
                Get Banking Support <FiArrowRight size={14} />
              </Link>
            </AnimatedSection>

            {/* Right: bank partners card */}
            <AnimatedSection direction="right" delay={0.15}>
              <div className="bg-navy-900 border border-navy-800 rounded-2xl p-8">
                <p className="text-xs font-bold tracking-[0.2em] text-gold-400 uppercase mb-6">
                  Banks We Work With
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    "Emirates NBD",
                    "Mashreq Bank",
                    "RAKBANK",
                    "ADIB",
                    "Wio Bank",
                    "First Abu Dhabi Bank",
                  ].map((bank) => (
                    <div key={bank} className="flex items-center gap-2.5 p-3.5 bg-navy-800 rounded-xl border border-navy-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300 font-medium leading-snug">{bank}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-navy-700 pt-6">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    We prepare complete, tailored documentation packs for every major UAE retail and digital bank, matched to your company structure, licence type and business activity.
                  </p>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* 8 ── Visa & Residency */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase mb-3">Visa & Residency</p>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 uppercase">
              UAE Residency Visas — All Types, One Firm
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
              From the standard investor visa included with your licence to the 10-year Golden Visa — HMA manages the full application, medical, biometrics and Emirates ID in-house.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                type: "Investor Visa",
                duration: "2-Year Residency",
                Icon: FiUser,
                description: "For company owners and shareholders. Included with most company formations.",
                features: [
                  "Included with most formations",
                  "Medical & Emirates ID",
                  "Family visa sponsorship eligible",
                  "Renewable every 2 years",
                ],
                badge: "Most Common",
                featured: false,
              },
              {
                type: "Golden Visa",
                duration: "10-Year Residency",
                Icon: FiAward,
                description: "Long-term UAE residency for investors, entrepreneurs and qualified professionals.",
                features: [
                  "AED 2M+ investment criteria",
                  "Property investors eligible",
                  "No UAE sponsor required",
                  "Sponsored family visas included",
                ],
                badge: "Premium",
                featured: true,
              },
              {
                type: "Employment Visa",
                duration: "2–3 Year Residency",
                Icon: FiUsers,
                description: "For staff and employees of your UAE company. Quota varies by licence type.",
                features: [
                  "Flexible quota per licence type",
                  "Medical & Emirates ID",
                  "Mainland and Free Zone",
                  "Fast processing available",
                ],
                badge: null,
                featured: false,
              },
            ].map((visa, i) => (
              <AnimatedSection key={visa.type} delay={i * 0.08}>
                <div
                  className={`rounded-xl border overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md ${
                    visa.featured
                      ? "bg-navy-900 border-gold-400/50"
                      : "bg-white border-gray-200 hover:border-gold-300"
                  }`}
                >
                  {visa.featured && <div className="h-1 bg-gold-400" />}
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        visa.featured ? "bg-gold-400/20" : "bg-navy-900"
                      }`}>
                        <visa.Icon className="text-gold-400" size={19} />
                      </div>
                      {visa.badge && (
                        <span className={`text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full ${
                          visa.featured
                            ? "bg-gold-400/20 text-gold-400"
                            : "bg-gold-50 text-gold-700 border border-gold-200"
                        }`}>
                          {visa.badge}
                        </span>
                      )}
                    </div>
                    <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-1 ${visa.featured ? "text-gold-400" : "text-gold-600"}`}>
                      {visa.duration}
                    </p>
                    <h3 className={`text-xl font-black uppercase mb-3 ${visa.featured ? "text-white" : "text-navy-900"}`}>
                      {visa.type}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-5 ${visa.featured ? "text-gray-400" : "text-gray-500"}`}>
                      {visa.description}
                    </p>
                    <ul className="space-y-2.5 mb-7 flex-1">
                      {visa.features.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <FiCheck
                            className={`flex-shrink-0 mt-0.5 ${visa.featured ? "text-gold-400" : "text-gold-600"}`}
                            size={13}
                          />
                          <span className={`text-sm ${visa.featured ? "text-gray-300" : "text-gray-600"}`}>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact?service=visa"
                      className={`mt-auto flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-200 ${
                        visa.featured
                          ? "bg-gold-400 text-navy-950 hover:bg-gold-300"
                          : "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white"
                      }`}
                    >
                      Enquire About {visa.type} <FiArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              All visas include medical examination coordination, biometrics and Emirates ID processing. Timelines are estimates and subject to authority schedules.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 9 ── Stats */}
      <section className="bg-navy-950 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-navy-800">
            {statsData.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <div className="text-center md:px-6">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-1">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 10 ── Why Entrepreneurs Choose HMA */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase mb-3">Our Edge</p>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 uppercase">
              Why Entrepreneurs Choose HMA
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUsData.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.07}>
                <div className="bg-white rounded-xl border border-gray-100 p-7 hover:border-gold-300 hover:shadow-md transition-all duration-200 h-full">
                  <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center mb-5">
                    <item.Icon className="text-gold-400" size={20} />
                  </div>
                  <h3 className="text-sm font-bold text-navy-900 mb-3 uppercase tracking-wide leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 11 ── Industries We Cover */}
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900 mb-2 uppercase">
              Every Industry. Every Activity.
            </h2>
            <p className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase">
              From Trade Licence to Tax Filing
            </p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-2.5">
              {industriesData.map((ind) => {
                const Icon = ind.icon;
                return (
                  <div
                    key={ind.label}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full hover:border-gold-300 hover:bg-gold-50 transition-all duration-200"
                  >
                    <Icon className="text-gold-600 flex-shrink-0" size={13} />
                    <span className="text-sm font-medium text-navy-800 whitespace-nowrap">{ind.label}</span>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
          <AnimatedSection className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Don&apos;t see your industry?{" "}
              <Link href="/contact" className="text-gold-600 hover:text-gold-500 underline underline-offset-2 transition-colors">
                Every business is unique — talk to us →
              </Link>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 12 ── Popular UAE Free Zones */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase mb-3">
              40+ Free Zones Covered
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 uppercase">
              Popular UAE Free Zones
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              HMA covers all major UAE free zones. Here are the most popular choices for international entrepreneurs.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {freeZonesData.map((zone, i) => (
              <AnimatedSection key={zone.name} delay={i * 0.06}>
                <Link
                  href={`/contact?freezone=${zone.slug}`}
                  className="group flex flex-col h-full bg-white rounded-xl border border-gray-100 hover:border-gold-300 hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <div className="h-1 bg-gray-100 group-hover:bg-gold-400 transition-colors duration-300" />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-black text-navy-900 uppercase">{zone.name}</h3>
                      {zone.tag && (
                        <span className="text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-1 bg-gold-50 text-gold-700 rounded-full border border-gold-200 flex-shrink-0 ml-2">
                          {zone.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-3">{zone.full}</p>
                    <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-5">{zone.benefit}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Starting From</p>
                        <p className="text-base font-black text-navy-900">{zone.from}</p>
                      </div>
                      <span className="text-xs font-bold text-gold-600 group-hover:text-gold-500 flex items-center gap-1 uppercase tracking-wide transition-colors">
                        Enquire <FiArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="text-center mt-10">
            <Link
              href="/contact?service=freezone"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-navy-900 text-navy-900 font-bold text-sm rounded-lg hover:bg-navy-900 hover:text-white transition-all duration-200 uppercase tracking-wide"
            >
              Compare All 40+ Free Zones <FiArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* 13 ── Our Services */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 uppercase">Our Services</h2>
            <div className="w-12 h-[3px] bg-gold-400 rounded-full mx-auto mt-4" />
          </AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

            <AnimatedSection direction="left">
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-gold-600 mb-1">Step One</p>
              <h3 className="text-xl font-black text-navy-900 uppercase mb-6">Start Your Business</h3>
              <div className="space-y-2">
                {[
                  { icon: FiHome,     label: "Business Setup in Dubai",   href: "/services/business-setup" },
                  { icon: FiGlobe,    label: "Mainland Formation",         href: "/services/business-setup" },
                  { icon: FiGrid,     label: "Free Zone Formation",        href: "/services/business-setup" },
                  { icon: FiPackage,  label: "Offshore Formation",         href: "/services/business-setup" },
                  { icon: FiAward,    label: "Golden Visa & Residency",    href: "/services/golden-visa"    },
                ].map((svc) => (
                  <Link
                    key={svc.label}
                    href={svc.href}
                    className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-gold-300 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold-400 transition-colors duration-200">
                      <svc.icon className="text-gold-400 group-hover:text-navy-950 transition-colors duration-200" size={17} />
                    </div>
                    <span className="text-sm font-bold text-navy-900 uppercase tracking-wide flex-1">{svc.label}</span>
                    <FiArrowRight className="text-gray-200 group-hover:text-gold-500 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" size={15} />
                  </Link>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}>
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-gold-600 mb-1">Step Two</p>
              <h3 className="text-xl font-black text-navy-900 uppercase mb-6">Stay Compliant</h3>
              <div className="space-y-2 mb-6">
                {[
                  { icon: FiFileText,   label: "Corporate Tax",              href: "/services/tax-vat-compliance"     },
                  { icon: FiTrendingUp, label: "VAT Compliance",             href: "/services/tax-vat-compliance"     },
                  { icon: FiBarChart2,  label: "Accounting & Bookkeeping",   href: "/services/accounting-bookkeeping" },
                  { icon: FiSearch,     label: "Audit & Assurance",          href: "/services/audit-assurance"        },
                ].map((svc) => (
                  <Link
                    key={svc.label}
                    href={svc.href}
                    className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-gold-300 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold-400 transition-colors duration-200">
                      <svc.icon className="text-gold-400 group-hover:text-navy-950 transition-colors duration-200" size={17} />
                    </div>
                    <span className="text-sm font-bold text-navy-900 uppercase tracking-wide flex-1">{svc.label}</span>
                    <FiArrowRight className="text-gray-200 group-hover:text-gold-500 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" size={15} />
                  </Link>
                ))}
              </div>
              <div className="p-5 bg-navy-900 rounded-xl">
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-gold-400 mb-2">The HMA Advantage</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  The same chartered accountants who set up your business also handle your compliance — no knowledge gaps, no handoffs, no costly surprises.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-navy-900 text-navy-900 font-bold text-sm rounded-lg hover:bg-navy-900 hover:text-white transition-all duration-200 uppercase tracking-wide"
            >
              Explore All Services <FiArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* 14 ── Leadership */}
      <section className="bg-navy-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <AnimatedSection direction="left" className="lg:col-span-1">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold-400 mb-3">Leadership</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 uppercase">
                Trusted Advisors
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Two qualified professionals — one Emirati, one ICAEW Chartered Accountant — who give you a legal, financial and market edge from day one.
              </p>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-500 ml-2">5-star rated</span>
              </div>
            </AnimatedSection>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              <AnimatedSection delay={0.1}>
                <div className="bg-navy-900 border border-navy-800 rounded-xl p-7 hover:border-gold-400/30 transition-colors duration-200 h-full">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold-400 mb-1">
                    Managing Partner
                  </p>
                  <h3 className="text-lg font-bold text-white mb-1">Mr Hussain Ahli</h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mb-4">
                    UAE National · Emirati Business Leader
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">
                    Emirati business leader with deep government and free zone authority relationships.
                    His local market insight gives clients a direct advantage in DED approvals,
                    authority negotiations and strategic UAE market entry.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Emirati Partner", "UAE Market Entry", "Authority Relations"].map((tag) => (
                      <span key={tag} className="text-[9px] px-2 py-1 bg-navy-800 text-gray-400 rounded font-medium uppercase tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="bg-navy-900 border border-navy-800 rounded-xl p-7 hover:border-gold-400/30 transition-colors duration-200 h-full">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold-400 mb-1">
                    CEO
                  </p>
                  <h3 className="text-lg font-bold text-white mb-1">Mr Muhammad Ali</h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mb-4">
                    ICAEW Chartered Accountant (England &amp; Wales)
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">
                    ICAEW-qualified Chartered Accountant with 8+ years structuring Dubai businesses
                    for long-term compliance and tax efficiency. Expert in IFRS, UAE Corporate Tax,
                    VAT and audit across multiple industries. FTA Registered Tax Agent.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["ICAEW · CA", "UAE Corporate Tax", "IFRS Expert", "FTA Registered"].map((tag) => (
                      <span key={tag} className="text-[9px] px-2 py-1 bg-navy-800 text-gray-400 rounded font-medium uppercase tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* 15 ── Client Testimonials */}
      {/* TODO: Replace placeholder content with verified Google Reviews before launch */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase mb-3">
              Client Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 uppercase mb-5">
              Trusted By Entrepreneurs Across the UAE
            </h2>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
              <span className="text-sm font-black text-navy-900">5.0</span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-3.5 h-3.5 text-gold-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-400 font-medium">Google Reviews</span>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonialsData.map((review, i) => (
              <AnimatedSection key={review.name} delay={i * 0.08}>
                <div className="bg-white rounded-xl border border-gray-100 p-7 hover:border-gold-200 hover:shadow-md transition-all duration-200 h-full flex flex-col">
                  <div className="flex items-center gap-0.5 mb-5">
                    {[...Array(review.rating)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-gold-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed italic flex-1 mb-6">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-navy-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-gold-400 font-black text-xs">{review.initial}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-navy-900 leading-tight">{review.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">{review.type}</p>
                      </div>
                    </div>
                    <span className="text-[9px] text-gray-300 uppercase tracking-wider font-bold">Google</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-8">
            <a
              href="https://www.google.com/search?q=HMA+Chartered+Accountants+Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-navy-900 text-navy-900 font-bold text-sm rounded-lg hover:bg-navy-900 hover:text-white transition-all duration-200 uppercase tracking-wide"
            >
              See Our Google Reviews <FiArrowRight size={14} />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* 16 ── Final CTA */}
      <section className="py-20 bg-gold-400">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-[10px] font-bold tracking-[0.1em] sm:tracking-[0.3em] uppercase text-navy-900/60 mb-4">
              Free · No Obligation · Response in 1 Hour
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 uppercase leading-tight mb-5">
              Licence. Visas. Banking. Tax.
              <span className="block mt-1">All From One Firm.</span>
            </h2>
            <p className="text-navy-900/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
              150+ entrepreneurs have launched with HMA. Your consultation is free, takes 30 minutes,
              and comes with a full cost breakdown — no obligation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto whitespace-nowrap justify-center inline-flex items-center gap-2 px-8 py-4 bg-navy-950 text-white font-black text-sm rounded-lg hover:bg-navy-900 transition-all duration-200 uppercase tracking-wide"
              >
                Book Free Consultation
                <FiArrowRight size={14} />
              </Link>
              <a
                href="https://wa.me/971528370245"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto whitespace-nowrap justify-center inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold text-sm rounded-lg hover:bg-[#1ebe5a] transition-all duration-200 uppercase tracking-wide"
              >
                <FiMessageCircle size={16} />
                WhatsApp Now
              </a>
            </div>
            <p className="text-navy-900/40 text-xs mt-6">
              Burlington Tower, Office 1106, Business Bay, Dubai · dubai.office@hmaa.ae
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 17 ── Knowledge Hub (Blog) */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase mb-3">
              Insights &amp; Guides
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 uppercase">
              Knowledge Hub
            </h2>
          </AnimatedSection>

          {posts.length === 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[
                "Free Zone vs Mainland: Which Jurisdiction Fits Your Business in 2025?",
                "UAE Corporate Tax Guide for New Companies: What You Need to Know",
                "How to Get a Golden Visa Through Your Dubai Company",
              ].map((title, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-gold-200 transition-all duration-200">
                  <div className="aspect-[16/9] bg-gradient-to-br from-navy-900 to-navy-950 flex items-center justify-center">
                    <span className="text-gold-400/30 text-5xl font-black">H</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-sm font-bold text-navy-900 mb-4 leading-snug">{title}</h3>
                    <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-bold text-gold-700 hover:text-gold-600 transition-colors uppercase tracking-wide">
                      Read More <FiArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <AnimatedSection key={post._id.toString()} delay={i * 0.08}>
                  <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-gold-200 transition-all duration-200 h-full flex flex-col">
                    <Link href={`/blog/${post.slug}`} aria-label={`Read: ${post.title}`} tabIndex={-1}>
                      <div className="aspect-[16/9] bg-gradient-to-br from-navy-900 to-navy-950 relative overflow-hidden">
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt=""
                            width="400"
                            height="225"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-gold-400/30 text-5xl font-black" aria-hidden="true">H</span>
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                        <FiCalendar size={11} aria-hidden="true" />
                        <time dateTime={new Date(post.createdAt).toISOString()}>
                          {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </time>
                      </div>
                      <h3 className="text-sm font-bold text-navy-900 mb-4 leading-snug line-clamp-3 flex-1">
                        {post.title}
                      </h3>
                      <Link
                        href={`/blog/${post.slug}`}
                        aria-label={`Read: ${post.title}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-gold-700 hover:text-gold-600 transition-colors uppercase tracking-wide mt-auto"
                      >
                        Read More <FiArrowRight size={12} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          )}

          <AnimatedSection className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-navy-900 text-navy-900 font-bold text-sm rounded-lg hover:bg-navy-900 hover:text-white transition-all duration-200 uppercase tracking-wide"
            >
              View All Articles <FiArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
