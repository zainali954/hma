import type { Metadata } from "next";
import AnimatedSection from "@/components/animations/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import { FiMail, FiPhone, FiMapPin, FiClock, FiMessageCircle, FiBriefcase } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Professional Chartered Accountancy Service in Dubai UAE with 5+ years of experience. Reach HMA Auditing of Accounts by phone, WhatsApp or email.",
  openGraph: {
    title: "Contact | HMA Auditing of Accounts",
    description:
      "Get in touch with HMA Auditing of Accounts — licensed Ministry of Economy auditors and FTA-approved tax agents in Dubai, UAE.",
  },
};

const contactInfo = [
  {
    icon: FiMail,
    label: "Email",
    value: "dubai.office@hmaa.ae",
    href: "mailto:dubai.office@hmaa.ae",
  },
  {
    icon: FiPhone,
    label: "Landline",
    value: "04 583 7001",
    href: "tel:+97145837001",
  },
  {
    icon: FiMessageCircle,
    label: "WhatsApp",
    value: "(+971) 52 837 0245",
    href: "https://wa.me/971528370245",
  },
  {
    icon: FiMapPin,
    label: "Address",
    value: "Office 1106, Burlington Tower, Business Bay, Dubai, UAE",
  },
  {
    icon: FiClock,
    label: "Working Hours",
    value: "Monday – Saturday: 09:00 AM – 06:00 PM",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-14 sm:pb-20 bg-navy-950 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #C59D4B 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedSection>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400 mb-4">
              H M A Auditing of Accounts
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              Reach Us
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Professional Chartered Accountancy Service in Dubai UAE with 5+ Years of Experience!
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
            <span>Authorized Training Employer — ICAEW</span>
            <span className="text-gray-300">|</span>
            <span>Approved Employer Platinum — ACCA UK</span>
            <span className="text-gray-300">|</span>
            <span>Licensed — Ministry of Economy UAE</span>
          </div>
        </div>
      </section>

      {/* Main contact section */}
      <section className="py-20 bg-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start">

            {/* Left — contact details */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatedSection direction="left">
                <h2 className="text-2xl font-bold text-navy-900 mb-8 uppercase tracking-wide">
                  Contact Details
                </h2>
                <div className="space-y-5">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-11 h-11 bg-white rounded-xl border border-gray-200 flex items-center justify-center flex-shrink-0">
                        <item.icon className="text-gold-400" size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="text-navy-900 font-medium text-sm hover:text-gold-500 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-navy-900 font-medium text-sm">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Careers */}
              <AnimatedSection direction="left" delay={0.15}>
                <div className="bg-white rounded-xl border border-gray-200 p-6 mt-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gold-50 rounded-lg flex items-center justify-center">
                      <FiBriefcase className="text-gold-500" size={18} />
                    </div>
                    <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wide">Careers</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    If you are looking for a growth-oriented future, send us your updated resume!
                  </p>
                  <a
                    href="mailto:hr@hmaa.ae"
                    className="text-gold-500 font-semibold text-sm hover:text-gold-600 transition-colors"
                  >
                    hr@hmaa.ae
                  </a>
                </div>
              </AnimatedSection>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="right" delay={0.1}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2">
                  <div className="px-6 pt-6 pb-2">
                    <p className="text-xs font-bold tracking-[0.25em] uppercase text-gold-600 mb-1">
                      Free Consultation
                    </p>
                    <h2 className="text-xl font-bold text-navy-900">
                      Send Us Your Query Now
                    </h2>
                  </div>
                  <ContactForm />
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
