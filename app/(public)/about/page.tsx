import type { Metadata } from "next";
import AnimatedSection from "@/components/animations/AnimatedSection";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import {
  FiShield, FiLock, FiClock,
  FiTarget, FiEye, FiAward, FiUsers,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "HMA Auditing of Accounts — formed in 2017 with a mission to support UAE businesses through Auditing, Accounting, Taxation and Business Advisory services. Licensed by the Ministry of Economy and approved by ICAEW & ACCA.",
  openGraph: {
    title: "About HMA Auditing of Accounts | Dubai UAE",
    description:
      "Learn about HMA — a licensed audit firm, FTA-registered tax agent and ICAEW Authorised Training Employer based in Business Bay, Dubai.",
  },
};

const valuesData = [
  {
    icon: FiShield,
    title: "Integrity",
    description: "Performing every task with utmost dedication and to the best of our abilities — always acting in the best interest of our clients.",
  },
  {
    icon: FiLock,
    title: "Confidentiality",
    description: "Taking all necessary steps to ensure the complete confidentiality of client data and sensitive business information.",
  },
  {
    icon: FiClock,
    title: "Timely",
    description: "Always delivering on promised timelines. We provide clients with real-time file tracking at every stage of the engagement.",
  },
];

const teamData = [
  {
    name: "Mr Hussain Ahli",
    title: "Managing Partner",
    initial: "H",
    bio: "Hussain Ahli is an Emirati professional equipped with vision and courage to take decisive steps. Being part of an entrepreneurial family, he possesses true business insight and a thorough understanding of the UAE market.",
  },
  {
    name: "Mr Muhammad Ali",
    title: "Chief Executive Officer",
    initial: "M",
    bio: "Muhammad Ali is a qualified Chartered Accountant from the Institute of Chartered Accountants in England & Wales (ICAEW). He is an experienced professional equipped with updated knowledge of IFRS and VAT regulations in the United Arab Emirates.",
  },
];

const accreditations = [
  { label: "ICAEW", sub: "Authorised Training Employer" },
  { label: "ACCA", sub: "Approved Employer – Platinum" },
  { label: "Ministry of Economy", sub: "Licensed Audit Firm — UAE" },
  { label: "FTA", sub: "Registered Tax Agency" },
];

export default function AboutPage() {
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
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600 mb-4">
              H M A Auditing of Accounts
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Your Trusted Compliance<br />Partner in the UAE
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              A licensed audit firm, FTA-registered tax agent and ICAEW Authorised Training Employer —
              serving UAE businesses since 2017 with integrity, confidentiality and timeliness.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Accreditations bar */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {accreditations.map((a, i) => (
              <AnimatedSection key={a.label} delay={i * 0.08}>
                <div className="text-center">
                  <p className="text-sm font-black text-navy-900 uppercase tracking-wide">{a.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{a.sub}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <AnimatedSection direction="left">
              <div className="aspect-[4/3] bg-white rounded-2xl border border-gray-200 flex items-center justify-center relative overflow-hidden">
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-navy-900 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <img src="/logo.svg" alt="HMA" style={{ height: "40px", width: "auto" }} />
                  </div>
                  <p className="text-gold-500 font-bold text-lg tracking-wide">Est. 2017</p>
                  <p className="text-gray-500 text-sm mt-1">Business Bay, Dubai, UAE</p>
                </div>
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gold-400 opacity-10 rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-navy-900 opacity-10 rounded-tr-full" />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <p className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase mb-3">Who We Are</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Back in 2017, <strong className="text-navy-900">HMA Auditing of Accounts</strong> had been formed
                  with a mission of supporting businesses in UAE by providing a complete range of esteemed quality
                  Chartered Accountancy services like Auditing, Accounting, Taxation and Business Advisory.
                </p>
                <p>
                  HMA is an association of dedicated professionals qualified from world-class professional
                  Accountancy bodies like <strong className="text-navy-900">ICAEW, AICPA, PICPA, IPA (Australia), ACCA</strong> and{" "}
                  <strong className="text-navy-900">CIA</strong>. Our experienced professional team is highly energetic
                  and enthusiastic with great vision and enriched market exposure in wide range of industries in the region.
                </p>
                <p>
                  HMA is an <strong className="text-navy-900">Authorised Training Employer (ATE)</strong> approved by
                  the Institute of Chartered Accountants in England and Wales, and an{" "}
                  <strong className="text-navy-900">Approved Employer – Platinum</strong> with the Association of
                  Certified Chartered Accountants (ACCA – UK). HMA is a licensed audit firm registered with the
                  Ministry of Economy, UAE.
                </p>
                <p className="text-gray-500 text-sm italic border-l-2 border-gray-300 pl-4">
                  We are a team of experts and professionals in the field of Chartered Accountancy who are sharing
                  a common vision of helping businesses to succeed and we are dedicated to{" "}
                  <span className="text-gold-600 not-italic font-semibold">&ldquo;DOING MORE&rdquo;</span>.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-navy-700">
            {[
              { label: "Happy Clients",      value: 150, suffix: "+" },
              { label: "Accountings",         value: 30,  suffix: "+" },
              { label: "Business Advisory",   value: 50,  suffix: "+" },
              { label: "Advisory",            value: 100, suffix: "+" },
            ].map((stat, i) => (
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

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase mb-3">Our Purpose</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Mission &amp; Vision</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection delay={0.1} direction="left">
              <div className="bg-[#F0F0F0] rounded-xl p-10 border border-gray-200 h-full">
                <div className="w-14 h-14 bg-navy-900 rounded-xl flex items-center justify-center mb-6">
                  <FiTarget className="text-gold-400" size={26} />
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our primary purpose as an organisation is to deliver high quality products both in
                  appearance and content — supporting businesses in UAE with a complete range of esteemed
                  Chartered Accountancy services including Auditing, Accounting, Taxation and Business Advisory.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="right">
              <div className="bg-[#F0F0F0] rounded-xl p-10 border border-gray-200 h-full">
                <div className="w-14 h-14 bg-navy-900 rounded-xl flex items-center justify-center mb-6">
                  <FiEye className="text-gold-400" size={26} />
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our organisation stands at 10+ dedicated employees. We plan to expand to other GCC nations
                  with 50+ employees — becoming the most trusted Chartered Accountancy and business advisory
                  firm in the region, recognised for integrity and excellence.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase mb-3">Pillars of HMA</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Our Core Values</h2>
            <div className="w-12 h-[3px] bg-gold-400 rounded-full mx-auto mt-4" />
          </AnimatedSection>

          <div className="grid sm:grid-cols-3 gap-6">
            {valuesData.map((value, i) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={value.title} delay={i * 0.12}>
                  <div className="bg-white text-center p-8 rounded-xl border border-gray-200 hover:border-gold-300 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="w-14 h-14 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-5">
                      <Icon className="text-gold-400" size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-navy-900 mb-3 uppercase tracking-wide">{value.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase mb-3">The People Behind HMA</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Meet Our Leadership</h2>
            <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
              We&apos;re sharing a common vision of helping businesses to succeed and we&apos;re dedicated to <span className="text-gold-400 font-semibold">&ldquo;Doing More&rdquo;</span>.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {teamData.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.15}>
                <div className="bg-navy-900 rounded-2xl p-8 border border-navy-800 hover:border-gold-400/30 transition-all duration-300 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-5">
                    <span className="text-navy-950 font-black text-2xl">{member.initial}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white text-center mb-1">{member.name}</h3>
                  <p className="text-gold-400 text-xs font-bold uppercase tracking-wider text-center mb-4">{member.title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed text-center">{member.bio}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <p className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase mb-3">Approved &amp; Certified</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">Accreditations &amp; Registrations</h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FiAward,  title: "ICAEW",              sub: "Authorised Training Employer" },
              { icon: FiAward,  title: "ACCA – UK",          sub: "Approved Employer – Platinum" },
              { icon: FiShield, title: "Ministry of Economy",sub: "Licensed Audit Firm, UAE" },
              { icon: FiUsers,  title: "FTA",                sub: "Registered Tax Agency" },
            ].map((cert, i) => {
              const Icon = cert.icon;
              return (
                <AnimatedSection key={cert.title} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center p-6 rounded-xl bg-[#F0F0F0] border border-gray-200 hover:border-gold-300 transition-all duration-200">
                    <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="text-gold-400" size={22} />
                    </div>
                    <p className="font-bold text-navy-900 text-sm uppercase tracking-wide">{cert.title}</p>
                    <p className="text-gray-500 text-xs mt-1 leading-snug">{cert.sub}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
