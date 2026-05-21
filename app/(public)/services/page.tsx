import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/animations/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import { servicesData } from "@/lib/services-data";
import {
  FiHome,
  FiAward,
  FiFileText,
  FiBarChart2,
  FiSearch,
  FiArrowRight,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "Business Setup & Compliance Services in Dubai",
  description:
    "HMA Dubai delivers business setup, Golden Visa, tax & VAT compliance, accounting, and audit services for entrepreneurs and SMEs across the UAE. Ministry of Economy licensed.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Business Setup & Compliance Services in Dubai | HMA",
    description:
      "From mainland and free zone company formation to Golden Visa, corporate tax and audit — HMA is your full-service partner for Dubai business setup.",
    url: "/services",
  },
};

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "business-setup":          FiHome,
  "golden-visa":             FiAward,
  "tax-vat-compliance":      FiFileText,
  "accounting-bookkeeping":  FiBarChart2,
  "audit-assurance":         FiSearch,
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
              HMA Dubai
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-5">
              Everything You Need to Launch and Run a Business in Dubai
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              Company formation, Golden Visa, tax compliance, accounting and audit —
              one Ministry of Economy licensed firm, end-to-end.
            </p>
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
                Setting up a business in Dubai is just the beginning — keeping it compliant, profitable
                and audit-ready is where most companies struggle. HMA covers the full lifecycle, from{" "}
                <span className="text-gold-600 font-semibold">trade licence</span> to{" "}
                <span className="text-gold-600 font-semibold">Golden Visa</span>,{" "}
                <span className="text-gold-600 font-semibold">corporate tax filing</span> and{" "}
                <span className="text-gold-600 font-semibold">annual audit</span> — under one roof,
                with one trusted team.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 uppercase">Our Services</h2>
            <div className="w-12 h-[3px] bg-gold-400 rounded-full mx-auto mt-4" />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, i) => {
              const Icon = iconMap[service.slug] ?? FiHome;
              const isPrimary = service.slug === "business-setup";
              return (
                <AnimatedSection
                  key={service.slug}
                  delay={i * 0.07}
                  className={isPrimary ? "sm:col-span-2 lg:col-span-2" : ""}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    aria-label={`Learn more about ${service.title}`}
                    className={`group flex flex-col rounded-xl border overflow-hidden transition-all duration-300 h-full ${
                      isPrimary
                        ? "bg-navy-900 border-navy-800 hover:border-gold-400 text-white"
                        : "bg-white border-gray-100 hover:border-gold-300 hover:shadow-lg"
                    }`}
                  >
                    {/* Card top accent */}
                    <div className={`h-1 transition-colors duration-300 ${isPrimary ? "bg-gold-400" : "bg-gray-100 group-hover:bg-gold-400"}`} />

                    <div className="p-7 flex flex-col flex-1">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${
                        isPrimary
                          ? "bg-gold-400/10 border border-gold-400/30"
                          : "bg-navy-50 group-hover:bg-gold-50"
                      }`}>
                        <Icon
                          size={22}
                          className={isPrimary ? "text-gold-400" : "text-navy-700 group-hover:text-gold-500 transition-colors duration-300"}
                        />
                      </div>

                      {isPrimary && (
                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold-400 mb-2">
                          Our Specialty
                        </p>
                      )}

                      <h3 className={`text-lg font-bold mb-3 uppercase tracking-wide ${isPrimary ? "text-white" : "text-navy-900"}`}>
                        {service.title}
                      </h3>
                      <p className={`text-sm leading-relaxed flex-1 ${isPrimary ? "text-gray-300" : "text-gray-500"}`}>
                        {service.shortDesc}
                      </p>

                      <div className={`flex items-center gap-2 mt-6 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                        isPrimary
                          ? "text-gold-400"
                          : "text-navy-700 group-hover:text-gold-500"
                      }`}>
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
                Free Consultation.<br />Real Answers in 24 Hours.
              </h2>
              <p className="text-gray-400 text-base leading-relaxed mb-8">
                Not sure which jurisdiction or service fits your business? Tell us
                what you&apos;re trying to do — we&apos;ll recommend the right path. No obligation.
              </p>
              <ul className="space-y-3">
                {[
                  "ICAEW, ACCA & AICPA Qualified Experts",
                  "Licensed Ministry of Economy Auditors",
                  "Approved Federal Tax Authority Agency",
                  "Confidential & Timely Service",
                ].map((point) => (
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
