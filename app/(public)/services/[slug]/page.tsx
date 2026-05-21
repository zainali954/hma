import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import AnimatedSection from "@/components/animations/AnimatedSection";
import { servicesData, getServiceBySlug } from "@/lib/services-data";
import { FiCheckCircle, FiArrowRight, FiArrowLeft, FiHelpCircle } from "react-icons/fi";
import ContactForm from "@/components/ContactForm";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = service.metaTitle ?? service.title;
  const description = service.metaDescription ?? service.shortDesc;

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/services/${service.slug}`,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const currentIndex = servicesData.findIndex((s) => s.slug === slug);
  const prev = servicesData[currentIndex - 1];
  const next = servicesData[currentIndex + 1];

  const faqSchema = service.faqs && service.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      }
    : null;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription ?? service.shortDesc,
    provider: {
      "@type": "ProfessionalService",
      name: "HMA Dubai",
      url: "https://hmaadubai.com",
    },
    areaServed: {
      "@type": "Place",
      name: "Dubai, United Arab Emirates",
    },
  };

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-14 sm:pb-20 bg-navy-950 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #C59D4B 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gold-400 transition-colors mb-8"
            >
              <FiArrowLeft size={13} /> All Services
            </Link>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600 mb-4">
              HMA Dubai
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 max-w-3xl">
              {service.title}
            </h1>
            {service.tagline && (
              <p className="text-gold-400 italic text-base sm:text-lg font-medium mb-4">
                &ldquo;{service.tagline}&rdquo;
              </p>
            )}
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              {service.shortDesc}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-14 items-start">

            {/* Left: Description + Subsections + Process */}
            <AnimatedSection direction="left">
              {service.tagline && (
                <p className="text-lg sm:text-xl italic text-gold-500 font-semibold mb-6 border-l-4 border-gold-400 pl-4">
                  &ldquo;{service.tagline}&rdquo;
                </p>
              )}

              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-6">
                Overview
              </h2>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg mb-10">
                {service.description}
              </p>

              {/* Subsections */}
              {service.subsections && service.subsections.length > 0 && (
                <div className="space-y-8 mb-12">
                  {service.subsections.map((sub) => (
                    <div key={sub.title} className="border-l-2 border-gray-200 pl-6">
                      <h3 className="text-lg font-bold text-navy-900 mb-2">{sub.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{sub.body}</p>
                    </div>
                  ))}
                </div>
              )}

              <h3 className="text-lg font-bold text-navy-900 uppercase tracking-wide mb-8">
                Our Process
              </h3>
              <div className="space-y-8">
                {service.process.map((step) => (
                  <div key={step.step} className="flex gap-5 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center">
                      <span className="text-gold-400 font-black text-sm">{step.step}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-900 mb-1">{step.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Right: Features card */}
            <AnimatedSection direction="right" delay={0.15}>
              <div className="bg-[#F0F0F0] rounded-2xl p-8 border border-gray-200 sticky top-28">
                <p className="text-xs font-bold tracking-[0.25em] uppercase text-gold-600 mb-4">
                  What&apos;s Included
                </p>
                <h3 className="text-xl font-bold text-navy-900 mb-6">Key Services</h3>
                <ul className="space-y-4">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <FiCheckCircle className="text-gold-400 mt-0.5 flex-shrink-0" size={17} />
                      <span className="text-gray-700 text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-navy-900 text-white font-bold text-sm rounded-lg hover:bg-navy-800 transition-all duration-200 uppercase tracking-wide"
                  >
                    Get a Free Quote
                    <FiArrowRight size={14} />
                  </Link>
                  <a
                    href="https://wa.me/971528370245"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-navy-900 text-navy-900 font-bold text-sm rounded-lg hover:bg-navy-900 hover:text-white transition-all duration-200 uppercase tracking-wide"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-20 bg-[#F0F0F0] border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-navy-900 mb-4">
                <FiHelpCircle className="text-gold-400" size={22} />
              </div>
              <p className="text-xs font-bold tracking-[0.25em] uppercase text-gold-600 mb-3">
                Frequently Asked
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
                Questions About {service.title}
              </h2>
            </AnimatedSection>

            <div className="space-y-4">
              {service.faqs.map((faq, i) => (
                <AnimatedSection key={faq.q} delay={i * 0.05}>
                  <details className="group bg-white rounded-xl border border-gray-200 hover:border-gold-300 transition-colors">
                    <summary className="cursor-pointer px-6 py-5 flex items-center justify-between gap-4 list-none">
                      <h3 className="text-base sm:text-lg font-bold text-navy-900 leading-snug">
                        {faq.q}
                      </h3>
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600 font-black transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="px-6 pb-6 -mt-1 text-gray-600 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </details>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next navigation */}
      {(prev || next) && (
        <section className="py-12 bg-[#F0F0F0] border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {prev ? (
                <Link
                  href={`/services/${prev.slug}`}
                  className="group flex items-center gap-3 px-6 py-4 bg-white rounded-xl border border-gray-200 hover:border-gold-300 hover:shadow-md transition-all duration-200 flex-1 sm:max-w-xs"
                >
                  <FiArrowLeft className="text-gray-400 group-hover:text-gold-400 transition-colors flex-shrink-0" size={18} />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Previous</p>
                    <p className="text-sm font-bold text-navy-900 group-hover:text-gold-500 transition-colors">{prev.title}</p>
                  </div>
                </Link>
              ) : <div className="flex-1 sm:max-w-xs" />}

              {next && (
                <Link
                  href={`/services/${next.slug}`}
                  className="group flex items-center justify-end gap-3 px-6 py-4 bg-white rounded-xl border border-gray-200 hover:border-gold-300 hover:shadow-md transition-all duration-200 flex-1 sm:max-w-xs sm:ml-auto"
                >
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Next</p>
                    <p className="text-sm font-bold text-navy-900 group-hover:text-gold-500 transition-colors">{next.title}</p>
                  </div>
                  <FiArrowRight className="text-gray-400 group-hover:text-gold-400 transition-colors flex-shrink-0" size={18} />
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Contact Form */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <AnimatedSection direction="left">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600 mb-4">Free Consultation</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
                Talk to a Specialist Today
              </h2>
              <p className="text-gray-400 text-base leading-relaxed mb-8">
                Get straight answers on <span className="text-white font-medium">{service.title}</span> from a qualified expert — no obligation, no pressure, no upsell.
              </p>
              <ul className="space-y-3">
                {[
                  "Ministry of Economy Licensed Firm",
                  "Federal Tax Authority Registered Agent",
                  "ICAEW, ACCA & AICPA Qualified Experts",
                  "Reply Within 1 Business Hour",
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
