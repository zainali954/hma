export const dynamic = "force-dynamic";

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
  FiShield,
  FiBarChart2,
  FiGlobe,
  FiUsers,
  FiBookOpen,
  FiSearch,
  FiHome,
  FiHeart,
  FiZap,
  FiCoffee,
  FiActivity,
  FiPackage,
  FiRadio,
  FiDroplet,
  FiGrid,
  FiCheckCircle,
  FiFileText,
  FiTool,
  FiCalendar,
} from "react-icons/fi";

/* ─── data ─── */

const credentialsData = [
  {
    icon: FiCheckCircle,
    title: "ICAEW, ACCA, AICPA, Certified Experts.",
    subtitle: "Trusted financial experts.",
  },
  {
    icon: FiFileText,
    title: "Licensed Ministry of Economy Auditors.",
    subtitle: "Authorised commercial agents.",
  },
  {
    icon: FiTool,
    title: "Approved Federal Tax Authority Agency.",
    subtitle: "Verified FTA Portal Access.",
  },
];

const industriesData = [
  { icon: FiTrendingUp, label: "Private Equity" },
  { icon: FiBarChart2, label: "Financial Services" },
  { icon: FiHeart, label: "Healthcare" },
  { icon: FiZap, label: "Power & Utilities" },
  { icon: FiCoffee, label: "Restaurants" },
  { icon: FiHome, label: "Construction & Real Estate" },
  { icon: FiPackage, label: "Production & Distribution" },
  { icon: FiRadio, label: "Advertising & Market Research" },
  { icon: FiBookOpen, label: "Education" },
  { icon: FiDroplet, label: "Oil & Gas" },
  { icon: FiActivity, label: "Asset Management" },
  { icon: FiGrid, label: "& many more..." },
];

const statsData = [
  { label: "Clients", value: 150, suffix: "+" },
  { label: "Accountings", value: 30, suffix: "+" },
  { label: "Business Advisory", value: 50, suffix: "+" },
  { label: "Advisory", value: 100, suffix: "+" },
];

const servicesData = [
  { icon: FiSearch,    label: "Audit & Assurance",  href: "/services/audit-assurance"   },
  { icon: FiBarChart2, label: "Accounting",          href: "/services/accounting"         },
  { icon: FiBookOpen,  label: "Bookkeeping",         href: "/services/bookkeeping"        },
  { icon: FiGlobe,     label: "Tax Consultancy",     href: "/services/tax-consultancy"    },
  { icon: FiShield,    label: "Corporate Tax",       href: "/services/corporate-tax"      },
  { icon: FiTrendingUp,label: "Business Advisory",   href: "/services/business-advisory"  },
];

const clientsData = [
  { name: "Armond",     src: "/images/armond.png" },
  { name: "Bastil",     src: "/images/bastil.png" },
  { name: "Bolier",     src: "/images/bolier.png" },
  { name: "Digit",      src: "/images/digit.png" },
  { name: "Darkside",   src: "/images/darkside.png" },
  { name: "FifthFlour", src: "/images/fifthflour.png" },
  { name: "Modal",      src: "/images/Modal.png" },
  { name: "Madrin",     src: "/images/madrin.png" },
];

const whyUsData = [
  {
    title: "Integrity",
    description:
      "Performing every task with utmost dedication and to the best of our abilities — always acting in the best interest of our clients.",
  },
  {
    title: "Confidentiality",
    description:
      "Taking all necessary steps to ensure the complete confidentiality of client data and sensitive business information.",
  },
  {
    title: "Timely Delivery",
    description:
      "Always delivering on promised timelines. We provide clients with real-time file tracking at every stage of the engagement.",
  },
];

/* ─── blog helper ─── */
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

/* ─── page ─── */
export default async function HomePage() {
  const posts = await getLatestPosts();

  return (
    <>
      <HeroSection />

      {/* ── Credentials / Trust Bar ── */}
      <section className="bg-gray-50 border-y border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:divide-x divide-gray-200">
            {credentialsData.map((cred, i) => {
              const Icon = cred.icon;
              return (
                <AnimatedSection key={cred.title} delay={i * 0.1} className="flex flex-col items-center text-center px-6">
                  <div className="w-16 h-16 bg-navy-900 rounded-full flex items-center justify-center mb-4 flex-shrink-0">
                    <Icon className="text-white" size={26} />
                  </div>
                  <p className="text-base font-bold text-navy-900 leading-snug mb-1">
                    {cred.title}
                  </p>
                  <p className="text-sm text-gray-500 italic">({cred.subtitle})</p>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── About Us ── */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
            {/* Watermark */}
            <div className="lg:w-1/3 flex-shrink-0 hidden lg:block">
              <span className="text-7xl xl:text-8xl font-black text-gray-100 leading-none select-none uppercase tracking-tight">
                ABOUT<br />US
              </span>
            </div>
            <AnimatedSection direction="right" className="lg:w-2/3">
              <h2 className="text-2xl font-bold text-navy-900 mb-5 lg:hidden uppercase">About Us</h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                Back in 2017 HMA AUDITING OF ACCOUNTS had been formed with a mission of
                supporting businesses in UAE by providing a complete range of esteemed quality
                Chartered Accountancy services like Auditing, Accounting, Taxation and Business
                Advisory.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                HMA is an association of dedicated professionals qualified from world-class
                professional Accountancy bodies like ICAEW, AICPA, PICPA, IPA (Australia), ACCA
                and CIA. Our experienced professional team is highly energetic and enthusiastic
                with great vision and enriched market exposure in wide range of industries in the
                region.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed italic mb-6 border-l-2 border-gray-200 pl-4">
                We are a team of experts and professionals in the field of Chartered Accountancy
                who are sharing a common vision of helping businesses to succeed and we are
                dedicated to{" "}
                <span className="text-gold-600 not-italic font-semibold">&ldquo;DOING MORE&rdquo;</span>.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-navy-900 text-navy-900 font-bold text-sm rounded-lg hover:bg-navy-900 hover:text-white transition-all duration-200 uppercase tracking-wide"
              >
                Learn More <FiArrowRight size={14} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Industries We Serve ── */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mb-2 uppercase">
              Industries We Serve
            </h2>
            <p className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase">
              H M A Auditing of Accounts
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {industriesData.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <AnimatedSection key={ind.label} delay={i * 0.04}>
                  <div className="flex flex-col items-center text-center gap-3 py-6 px-4 bg-white rounded-xl border border-gray-100 hover:border-gold-300 hover:shadow-md transition-all duration-200">
                    <div className="w-12 h-12 bg-gold-50 border border-gold-200 rounded-full flex items-center justify-center">
                      <Icon className="text-gold-600" size={20} />
                    </div>
                    <span className="text-sm font-semibold text-navy-800 leading-tight">
                      {ind.label}
                    </span>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-navy-900 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-navy-700">
            {statsData.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <div className="text-center md:px-6">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-1">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Strength ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left */}
            <AnimatedSection direction="left">
              <p className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase mb-3">
                Who We Are
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-4 leading-tight">
                Our Strength
              </h2>
              <div className="w-14 h-[3px] bg-gold-400 rounded-full" />
            </AnimatedSection>

            {/* Right */}
            <AnimatedSection direction="right" delay={0.15}>
              <div className="space-y-8">
                {[
                  {
                    title: "Integrity",
                    description:
                      "Performing the task at hand with utmost dedication & to the best of our abilities.",
                  },
                  {
                    title: "Confidentiality",
                    description:
                      "Taking all steps to ensure confidentiality of clients data.",
                  },
                  {
                    title: "Timely",
                    description:
                      "Always delivering on promised time. For this purpose, we provide all our clients a real time file tracking facility on our website.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start group">
                    <span className="mt-1 text-gold-400 text-xl leading-none flex-shrink-0">★</span>
                    <div>
                      <h3 className="text-lg font-bold text-navy-900 mb-1 group-hover:text-gold-400 transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ── Our Services ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 uppercase">
              Our Services
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-gray-200 rounded-xl overflow-hidden">
            {servicesData.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <AnimatedSection key={svc.label} delay={i * 0.05}>
                  <Link
                    href={svc.href}
                    aria-label={`Learn about our ${svc.label} services`}
                    className="group flex flex-col items-center justify-center gap-4 bg-white p-10 border-b border-r border-gray-200 hover:bg-navy-900 transition-all duration-300 h-full min-h-[160px]"
                  >
                    <div className="w-14 h-14 rounded-full border-2 border-gray-200 group-hover:border-gold-400 flex items-center justify-center transition-colors duration-300">
                      <Icon className="text-gray-500 group-hover:text-gold-400 transition-colors duration-300" size={22} />
                    </div>
                    <span className="text-sm font-bold text-navy-900 group-hover:text-white transition-colors duration-300 text-center uppercase tracking-wide">
                      {svc.label}
                    </span>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Our Clients ── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 uppercase mb-4">
              Our Clients
            </h2>
            <div className="flex justify-center gap-1 mb-10">
              {[...Array(5)].map((_, j) => (
                <svg key={j} className="w-6 h-6 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {clientsData.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-center h-20 sm:h-28 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gold-300 transition-all duration-200 px-3 sm:px-6 py-3 sm:py-4"
                >
                  <Image
                    src={c.src}
                    alt={c.name}
                    width={160}
                    height={80}
                    className="object-contain w-full h-full"
                  />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Why Choose Us / Values ── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 uppercase">
              Why Choose Us
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {whyUsData.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="text-center px-6">
                  <div className="w-14 h-14 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-5">
                    <span className="text-gold-400 font-black text-lg">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-3 uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Team ── */}
      <section className="bg-navy-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <AnimatedSection direction="left" className="lg:col-span-1">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 uppercase">
                Our Team
              </h2>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold-400 mb-5">
                Welcome to H M A Auditing of Accounts
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                We&apos;re sharing a common vision of helping businesses to succeed
                and we&apos;re dedicated to &ldquo;Doing more.&rdquo;
              </p>
            </AnimatedSection>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              <AnimatedSection delay={0.1}>
                <div className="bg-navy-900 border border-navy-800 rounded-xl p-7">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold-400 mb-3">
                    Managing Partner
                  </p>
                  <h3 className="text-lg font-bold text-white mb-3">Mr Hussain Ahli</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Hussain Ahli is an Emirati professional equipped with vision and courage to take risks.
                    Being part of an Entrepreneurial family, he possesses all the necessary business skills
                    and thorough understanding of the UAE market.
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <div className="bg-navy-900 border border-navy-800 rounded-xl p-7">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold-400 mb-3">
                    CEO
                  </p>
                  <h3 className="text-lg font-bold text-white mb-3">Mr Muhammad Ali</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Muhammad Ali is a qualified Chartered Accountant from ICAEW, England &amp; Wales.
                    An experienced professional equipped with updated knowledge of IFRS and
                    UAE VAT regulations across various industries.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── Regulatory Authorities ── */}
      <section className="py-10 bg-white border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8">

            {/* Label */}
            <div className="flex-shrink-0 sm:w-44 text-center sm:text-left">
              <p className="text-[10px] font-bold tracking-[0.2em] text-gold-600 uppercase mb-1">
                Certified By
              </p>
              <h3 className="text-lg font-bold text-navy-900 leading-snug">
                Regulatory<br className="hidden sm:block" /> Authorities
              </h3>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-14 bg-gray-200 flex-shrink-0" />

            {/* Marquee — min-w-0 lets the flex child shrink so overflow-hidden clips correctly */}
            <div className="w-full sm:flex-1 min-w-0 overflow-hidden relative">
              <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

              <div className="flex animate-marquee gap-8 sm:gap-12 items-center w-max">
                {[
                  { name: "ACCA",  src: "/images/acca.png" },
                  { name: "AICPA", src: "/images/aicpaLogo.png" },
                  { name: "CIA",   src: "/images/CIA.png" },
                  { name: "ICAEW", src: "/images/ICAEW-logo-small.png" },
                  { name: "ACCA",  src: "/images/acca.png" },
                  { name: "AICPA", src: "/images/aicpaLogo.png" },
                  { name: "CIA",   src: "/images/CIA.png" },
                  { name: "ICAEW", src: "/images/ICAEW-logo-small.png" },
                ].map((logo, i) => (
                  <div key={i} className="flex items-center justify-center w-24 sm:w-32 h-12 sm:h-14 flex-shrink-0">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={120}
                      height={52}
                      className="object-contain w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Our Blogs ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 uppercase">
              Our Blogs
            </h2>
          </AnimatedSection>

          {posts.length === 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[
                "How can you protect your finances in 2023 from economic slowdowns?",
                "8 Qualities of a Good Accountant You Should Always Remember",
                "How Do Islamic Banks work?",
              ].map((title, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-gold-200 transition-all duration-200">
                  <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-gray-300 text-4xl font-black">H</span>
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
                    <Link href={`/blog/${post.slug}`} aria-label={`Read article: ${post.title}`} tabIndex={-1}>
                      <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
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
                            <span className="text-gray-300 text-4xl font-black" aria-hidden="true">H</span>
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
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
                        aria-label={`Read article: ${post.title}`}
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
            <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-navy-900 text-navy-900 font-bold text-sm rounded-lg hover:bg-navy-900 hover:text-white transition-all duration-200 uppercase tracking-wide">
              View All Posts <FiArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
