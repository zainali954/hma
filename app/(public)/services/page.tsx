import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/animations/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import { servicesData } from "@/lib/services-data";
import {
  FiSearch, FiBarChart2, FiBookOpen,
  FiFileText, FiShield, FiTrendingUp, FiHome, FiArrowRight,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "HMA Auditing of Accounts provides Audit & Assurance, Accounting, Bookkeeping, Tax Consultancy, Corporate Tax, Business Advisory and Company Formation services in the UAE.",
  openGraph: {
    title: "Our Services | HMA Auditing of Accounts",
    description:
      "Comprehensive Chartered Accountancy and business advisory services for UAE companies.",
  },
};

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "audit-assurance":   FiSearch,
  "accounting":        FiBarChart2,
  "bookkeeping":       FiBookOpen,
  "tax-consultancy":   FiFileText,
  "corporate-tax":     FiShield,
  "business-advisory": FiTrendingUp,
  "company-formation": FiHome,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-14 sm:pb-20 bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #C59D4B 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedSection>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600 mb-4">
              H M A Auditing of Accounts
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              Our Services
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* We Offer intro */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-start">
            <AnimatedSection direction="left" className="flex-shrink-0">
              <p className="text-xs font-bold tracking-[0.3em] text-gold-600 uppercase mb-2">What</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 leading-tight uppercase tracking-tight">
                We<br />Offer
              </h2>
              <div className="w-10 h-[3px] bg-gold-400 rounded-full mt-4" />
            </AnimatedSection>
            <AnimatedSection direction="right" className="flex-1">
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                HMA provides a comprehensive and integrated range of services which address
                all Accounting, Auditing, Taxation and Advisory needs of our clients.
                We are expert in the following fields and are committed to delivering
                excellence with <span className="text-gold-600 font-semibold">integrity, confidentiality</span> and{" "}
                <span className="text-gold-600 font-semibold">timeliness</span>.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 uppercase">Services</h2>
            <div className="w-12 h-[3px] bg-gold-400 rounded-full mx-auto mt-4" />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, i) => {
              const Icon = iconMap[service.slug] ?? FiSearch;
              return (
                <AnimatedSection key={service.slug} delay={i * 0.07}>
                  <Link
                    href={`/services/${service.slug}`}
                    aria-label={`Learn more about ${service.title}`}
                    className="group flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gold-300 transition-all duration-300 h-full"
                  >
                    {/* Card top accent */}
                    <div className="h-1 bg-gray-100 group-hover:bg-gold-400 transition-colors duration-300" />

                    <div className="p-7 flex flex-col flex-1">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center mb-5 group-hover:bg-gold-50 transition-colors duration-300">
                        <Icon size={22} className="text-navy-700 group-hover:text-gold-500 transition-colors duration-300" />
                      </div>

                      <h3 className="text-lg font-bold text-navy-900 mb-3 uppercase tracking-wide">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed flex-1">
                        {service.shortDesc}
                      </p>

                      <div className="flex items-center gap-2 mt-6 text-xs font-bold uppercase tracking-wider text-navy-700 group-hover:text-gold-500 transition-colors duration-300">
                        Learn More
                        <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <AnimatedSection direction="left">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600 mb-4">Get In Touch</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
                Free Consultation.<br />Send Us Your Query.
              </h2>
              <p className="text-gray-400 text-base leading-relaxed mb-8">
                Not sure which service you need? Our qualified team will listen to
                your requirements and recommend the right solution — no obligation.
              </p>
              <ul className="space-y-3">
                {["ICAEW, ACCA & AICPA Qualified Experts", "Licensed Ministry of Economy Auditors", "Approved Federal Tax Authority Agency", "Confidential & Timely Service"].map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.15}>
              <ContactForm />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
