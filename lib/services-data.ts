export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  title: string;
  tagline?: string;
  shortDesc: string;
  description: string;
  features: string[];
  process: { step: string; title: string; desc: string }[];
  subsections?: { title: string; body: string }[];
  faqs?: ServiceFAQ[];
  metaTitle?: string;
  metaDescription?: string;
}

export const servicesData: Service[] = [
  {
    slug: "business-setup",
    title: "Business Setup in Dubai",
    tagline: "Your trade licence in 3–5 working days — Mainland, Free Zone or Offshore.",
    shortDesc:
      "End-to-end business setup in Dubai for entrepreneurs and SMEs — mainland, free zone, and offshore company formation handled by a Ministry of Economy licensed firm.",
    description:
      "Business setup in Dubai is one of the smartest moves an entrepreneur can make in 2026 — 0% personal income tax, 100% foreign ownership across 1,100+ activities, world-class infrastructure, and direct access to a USD 460 billion economy. HMA helps you cut through the paperwork. We assess your activity, recommend the right jurisdiction, prepare every document, secure your trade licence, and walk you through bank account opening and visa quotas — all under one roof. Whether you want to incorporate a mainland LLC, register in a free zone like IFZA, DMCC or Meydan, or set up an offshore holding structure in JAFZA or RAK ICC, our team has done it hundreds of times. As a Ministry of Economy licensed firm with eight years on the ground in Dubai, we know which authority approves what, where the hidden costs hide, and how to keep your timeline tight.",
    features: [
      "Mainland (DED) Company Formation",
      "Free Zone Company Setup — 40+ Zones",
      "Offshore Company Registration (JAFZA, RAK ICC)",
      "Trade Licence Application & Renewal",
      "MOA Drafting & Legal Documentation",
      "Local Sponsor & Corporate Nominee Services",
      "Company Liquidation & De-Registration",
    ],
    process: [
      {
        step: "01",
        title: "Free Consultation & Jurisdiction Plan",
        desc: "We map your activity, ownership preferences and visa needs to the right jurisdiction — mainland, free zone or offshore — with a transparent cost breakdown.",
      },
      {
        step: "02",
        title: "Documentation & Licensing",
        desc: "We draft your MOA, secure initial approvals, reserve your trade name and submit the licence application to the relevant authority on your behalf.",
      },
      {
        step: "03",
        title: "Trade Licence & Post-Setup",
        desc: "You receive your trade licence in 3–5 working days. We then guide you through Emirates ID, residence visa, corporate bank account opening and ongoing compliance.",
      },
    ],
    subsections: [
      {
        title: "Mainland Company Formation in Dubai",
        body: "A Dubai mainland company, registered with the Department of Economy and Tourism (DET), lets you trade anywhere in the UAE, bid for government contracts, and open unlimited branches. Since the 2021 Commercial Companies Law amendments, expats enjoy 100% foreign ownership on more than 1,100 commercial and industrial activities — no local sponsor required for most sectors. HMA handles activity selection, initial approval, MOA notarisation, Ejari, and final trade licence issuance end-to-end.",
      },
      {
        title: "Free Zone Company Formation",
        body: "The UAE has 40+ free zones, each specialising in different sectors — IFZA and Meydan for cost-effective general trading and services, DMCC for commodities and gold, DIFC for financial services, DAFZA for aviation and logistics, twofour54 for media, and DAFZ for tech. Free zone companies offer 100% foreign ownership, zero corporate tax (subject to qualifying conditions), full profit repatriation, and zero customs duties on imports and exports. HMA helps you compare zones on cost, activity coverage, visa quotas and office requirements before you commit.",
      },
      {
        title: "Offshore Company Formation",
        body: "An offshore company in JAFZA Offshore or RAK ICC is the right vehicle for international trading, asset holding, intellectual property protection, and wealth structuring. Offshore companies enjoy full anonymity, zero tax, and no requirement to maintain a physical office or local employees. They cannot trade inside the UAE but are ideal as holding companies above your operating entity.",
      },
      {
        title: "Trade Licence Types",
        body: "Dubai issues four primary trade licences — commercial (general trading, retail, wholesale), professional (consultancy, freelancers, services), industrial (manufacturing, processing), and tourism. The licence type drives every downstream decision: activity codes, visa quotas, office space requirements, and renewal costs. We match the right licence to your business model so you don't over-pay or under-license.",
      },
      {
        title: "Company Liquidation & De-Registration",
        body: "Closing a business in the UAE without proper liquidation can result in personal blacklisting, AED 25,000+ in fines, and visa cancellations. HMA is a registered liquidator with mainland, free zone and offshore authorities. We handle creditor notifications, final audit, liquidator's report, and licence cancellation — leaving you with a clean exit and a clearance certificate for your records.",
      },
    ],
    faqs: [
      {
        q: "How long does it take to set up a company in Dubai?",
        a: "Most free zone and mainland companies are licensed within 3–5 working days once documents are submitted. Activities requiring external approvals (legal, medical, education) can take 2–4 weeks. We give you a realistic timeline in your first consultation.",
      },
      {
        q: "Do I need a local sponsor for a Dubai mainland company?",
        a: "No — since 2021, 100% foreign ownership is allowed on 1,100+ mainland activities. Only a small list of strategic-impact activities still require an Emirati partner or service agent, and we'll tell you upfront if yours is one of them.",
      },
      {
        q: "Mainland vs free zone — which is better?",
        a: "Mainland lets you trade anywhere in the UAE and bid for government work but requires a physical office. Free zone is cheaper to start, tax-efficient, and ideal if you mainly serve international clients or operate online. We recommend the right fit after understanding your customer base and revenue model.",
      },
      {
        q: "Can I get a UAE residence visa through company formation?",
        a: "Yes. Every licence comes with a visa quota — typically 1–6 visas depending on office size and jurisdiction. Your investor visa, family sponsorship and employment visas all flow from the trade licence. We handle the entire visa chain.",
      },
      {
        q: "What is the cheapest way to start a business in Dubai?",
        a: "A free zone licence with a flexi-desk and no visa is the most cost-effective entry point. We'll compare 4–5 zones for your activity and recommend the lowest-cost option that still meets your visa and banking needs.",
      },
    ],
    metaTitle: "Business Setup in Dubai | Company Formation by HMA",
    metaDescription:
      "Set up your Dubai mainland, free zone or offshore company in 3–5 days. Ministry of Economy licensed, 8+ years of UAE experience. Free consultation.",
  },
  {
    slug: "golden-visa",
    title: "Golden Visa & Residency",
    tagline: "10-year UAE residency for investors, entrepreneurs and talented professionals.",
    shortDesc:
      "End-to-end UAE Golden Visa assistance — eligibility assessment, document preparation, application submission, and family sponsorship for investors and entrepreneurs.",
    description:
      "The UAE Golden Visa is a long-term renewable residence permit that grants 5 or 10 years of residency without needing a local sponsor. It lets you live, work, and study in the UAE, sponsor your family with no age limit on children, and stay outside the country for more than six months without losing residency. Eligibility extends to investors (in property, public investments, or businesses), entrepreneurs of registered start-ups, specialised talents (scientists, doctors, creatives), outstanding students, and humanitarian pioneers. HMA assesses your eligibility against the latest ICA and GDRFA criteria, prepares your supporting evidence package, submits the application, and tracks it through to issuance. We've helped Dubai-based business owners convert their existing trade licences into Golden Visa eligibility — turning a 2-year investor visa into a 10-year residency that secures your family's future in the UAE.",
    features: [
      "Eligibility Assessment Against ICA Criteria",
      "Investor Golden Visa (Property & Business)",
      "Entrepreneur Golden Visa",
      "Specialised Talent & Skilled Professional Visa",
      "Family Sponsorship — Spouse, Children, Parents",
      "Document Preparation & Attestation",
      "Application Submission & Tracking",
    ],
    process: [
      {
        step: "01",
        title: "Eligibility Review",
        desc: "We assess your profile against current Golden Visa categories — investor, entrepreneur, talent, or student — and tell you honestly which route is realistic for you.",
      },
      {
        step: "02",
        title: "Document Package",
        desc: "We compile and attest every supporting document: bank statements, valuation reports, recommendation letters, professional credentials, and business records.",
      },
      {
        step: "03",
        title: "Submission & Issuance",
        desc: "We submit through ICA or GDRFA, respond to any queries, and follow up until your Golden Visa is stamped — typically 30–60 days end-to-end.",
      },
    ],
    subsections: [
      {
        title: "Investor Golden Visa (10-Year)",
        body: "Property investors with real estate worth AED 2 million or more qualify for a 10-year Golden Visa. Business investors with a capital deposit of AED 2 million in a UAE-licensed business — verified by a chartered accountant — also qualify. HMA handles the valuation letter, financial audit report and capital verification on your behalf.",
      },
      {
        title: "Entrepreneur Golden Visa",
        body: "Founders of registered SMEs with annual revenue of AED 1 million or more, or those whose business has received approval from an officially accredited business incubator, qualify for entrepreneur Golden Visas. We prepare the auditor's report, business valuation and recommendation letter required by the Ministry of Economy.",
      },
      {
        title: "Specialised Talent & Skilled Professionals",
        body: "Doctors, scientists, engineers, IT specialists, executives, and creatives can apply under the talent track. Each profession has specific salary thresholds (typically AED 30,000+ monthly) and credential requirements. We help you assemble the recommendation letters, contracts and qualification attestations needed for approval.",
      },
      {
        title: "Family Sponsorship",
        body: "Golden Visa holders can sponsor their spouse, sons up to any age (previously limited to 25), unmarried daughters, and parents — all under the same 10-year permit. There is no minimum salary requirement for family sponsorship under the Golden Visa, unlike standard residence visas.",
      },
    ],
    faqs: [
      {
        q: "Who qualifies for the UAE Golden Visa?",
        a: "Investors (property AED 2M+ or business deposit AED 2M+), entrepreneurs with revenue AED 1M+, specialised talents (doctors, scientists, executives), outstanding students, and humanitarian leaders all qualify. We assess your profile against the latest criteria during your free consultation.",
      },
      {
        q: "How long does the Golden Visa application take?",
        a: "Typically 30–60 days from document submission to visa stamping, depending on the category and supporting documents. Investor visas with clean documentation can be issued in under 30 days.",
      },
      {
        q: "Can I sponsor my parents on a Golden Visa?",
        a: "Yes. Unlike standard residence visas, Golden Visa holders can sponsor parents without minimum salary requirements and without the medical insurance limitations that apply to other visa types.",
      },
      {
        q: "Do I need to live in the UAE to keep my Golden Visa?",
        a: "No — Golden Visa holders can stay outside the UAE for more than the standard six-month limit without losing residency status. This makes it ideal for international business owners and frequent travellers.",
      },
      {
        q: "Can I convert my existing investor visa to a Golden Visa?",
        a: "Yes, if your business or property holdings meet the threshold. Many of our clients upgrade from a 2-year investor visa to a 10-year Golden Visa after their business hits AED 1M+ in audited revenue — we can run the conversion for you.",
      },
    ],
    metaTitle: "UAE Golden Visa Services in Dubai | 10-Year Residency | HMA",
    metaDescription:
      "Apply for the UAE Golden Visa with HMA. Investor, entrepreneur and talent routes. Family sponsorship, 10-year residency, no local sponsor. Free eligibility check.",
  },
  {
    slug: "tax-vat-compliance",
    title: "Tax & VAT Compliance",
    tagline: "Stay 100% compliant with UAE Corporate Tax, VAT and Excise — without the stress.",
    shortDesc:
      "FTA-registered tax agency handling UAE Corporate Tax registration, VAT filing, transfer pricing, and FTA reconsideration — keeping your business penalty-free.",
    description:
      "Tax in the UAE is no longer optional. The Federal Corporate Tax regime (effective June 2023) imposes 9% on profits above AED 375,000, with 15% Domestic Minimum Top-Up Tax now in force for large multinationals from January 2025. VAT at 5% has been mandatory since 2018 for businesses turning over AED 375,000+. Penalties for non-compliance can reach AED 20,000 per offence, and FTA audits are escalating. HMA is a Federal Tax Authority registered tax agency. We handle your Corporate Tax registration, return preparation, transfer pricing documentation, VAT registration and quarterly filings, Excise Tax compliance, and FTA reconsideration requests. As ICAEW and ACCA qualified chartered accountants, we structure your tax position lawfully — keeping you penalty-free, audit-ready, and paying the minimum tax legally required.",
    features: [
      "UAE Corporate Tax Registration with FTA",
      "Corporate Tax Return Preparation & Filing",
      "Transfer Pricing Documentation",
      "VAT Registration, Filing & Reconciliation",
      "Excise Tax Registration & Returns",
      "FTA Reconsideration & Dispute Support",
      "Tax Residence Certificate (TRC)",
      "Tax Planning & Lawful Structuring",
    ],
    process: [
      {
        step: "01",
        title: "Tax Health Check",
        desc: "We review your entity structure, revenue, and existing returns to identify exposure, missed deadlines, and lawful optimisation opportunities.",
      },
      {
        step: "02",
        title: "Registration & Compliance Setup",
        desc: "We register you with the FTA for Corporate Tax, VAT and Excise as applicable, and configure your invoicing and accounting for clean compliance.",
      },
      {
        step: "03",
        title: "Filing & Year-Round Advisory",
        desc: "We prepare and file every return on time, respond to FTA queries on your behalf, and advise on structuring decisions before they affect your tax bill.",
      },
    ],
    subsections: [
      {
        title: "UAE Corporate Tax",
        body: "UAE Corporate Tax applies at 0% on taxable income up to AED 375,000 and 9% above that threshold, with a 15% Domestic Minimum Top-Up Tax for large multinationals (revenue EUR 750M+) effective January 2025. Free zone companies can still benefit from a 0% rate on qualifying income if they meet substance requirements. HMA helps you register, compute taxable income under the FTA rules, and file your annual return — including transfer pricing disclosures where applicable.",
      },
      {
        title: "VAT Registration & Filing",
        body: "VAT registration is mandatory once your taxable supplies exceed AED 375,000 in any rolling 12-month period; voluntary registration is allowed above AED 187,500. Returns must be filed within 28 days of the tax period end, with VAT payment due simultaneously. Missed registrations attract an AED 10,000 late-registration penalty. HMA handles the full lifecycle — registration, invoicing setup, quarterly filing, input/output VAT reconciliation, and refund claims.",
      },
      {
        title: "Excise Tax",
        body: "Excise Tax applies to tobacco (100%), energy drinks (100%), carbonated drinks (50%), sweetened beverages (50%), and electronic smoking devices (100%). Registered importers, producers and warehouse keepers must file Excise returns by the 15th of each month. HMA manages your Excise registration, designated zone applications, and monthly returns.",
      },
      {
        title: "FTA Reconsideration & Disputes",
        body: "If the FTA issues a penalty or assessment you disagree with, you have 40 business days to file a reconsideration request (in Arabic, with full supporting analysis). If denied, you can escalate to the Tax Dispute Resolution Committee. HMA prepares and files reconsiderations on your behalf — we've successfully overturned six-figure penalty assessments for clients.",
      },
      {
        title: "Tax Residence Certificate (TRC)",
        body: "A UAE Tax Residence Certificate, issued by the Ministry of Finance, lets you claim Double Taxation Avoidance Agreement (DTAA) benefits across the UAE's 137+ treaty partners. Corporations and individuals can apply. HMA handles the application, supporting documents, and follow-up until issuance.",
      },
    ],
    faqs: [
      {
        q: "Do I need to register for UAE Corporate Tax?",
        a: "Yes — every UAE business, including free zone companies and sole establishments, must register for Corporate Tax with the FTA, regardless of profit level. Registration deadlines depend on your licence issue date. Missing the deadline triggers an AED 10,000 fine.",
      },
      {
        q: "What is the VAT registration threshold in the UAE?",
        a: "Mandatory registration kicks in once taxable supplies exceed AED 375,000 in the past 12 months or are expected to exceed it in the next 30 days. Voluntary registration is allowed above AED 187,500.",
      },
      {
        q: "Are free zone companies exempt from Corporate Tax?",
        a: "Not automatically. Qualifying Free Zone Persons enjoy a 0% rate on Qualifying Income only, provided they maintain adequate substance, don't elect to be taxed, and meet the de minimis rules. Most free zone companies still file a Corporate Tax return — even when their tax is zero.",
      },
      {
        q: "How long does VAT registration take?",
        a: "Standard FTA processing is 20 business days from submission of a complete application. We typically secure TRN issuance within 2–3 weeks when documents are clean on submission.",
      },
      {
        q: "Can HMA represent us in front of the FTA?",
        a: "Yes — we're a registered FTA Tax Agency, which means we can correspond with the FTA on your behalf, handle audits, and file reconsiderations under our agency licence.",
      },
    ],
    metaTitle: "UAE Corporate Tax & VAT Services | FTA Tax Agent | HMA Dubai",
    metaDescription:
      "FTA-registered tax agency in Dubai. Corporate Tax registration, VAT filing, transfer pricing, tax residence certificates. Stay compliant, avoid penalties.",
  },
  {
    slug: "accounting-bookkeeping",
    title: "Accounting & Bookkeeping",
    tagline: "Clean books, IFRS-ready financials, real-time visibility — outsourced to chartered accountants.",
    shortDesc:
      "Outsourced accounting and bookkeeping services in Dubai — daily transaction recording, monthly close, IFRS financial statements, and audit-ready records.",
    description:
      "Accurate accounting is the foundation of every successful Dubai business. The UAE Commercial Companies Law requires every entity to maintain proper books for at least seven years; Corporate Tax now adds annual return obligations on top. HMA's outsourced accounting and bookkeeping service replaces the need for an in-house finance team. We post your daily transactions, reconcile your bank and credit card accounts, manage payables and receivables, and deliver IFRS-compliant monthly financials so you always know where your business stands. Because our accountants are ICAEW, ACCA, and AICPA qualified — and we audit hundreds of companies ourselves — the books we keep are built to pass any audit or FTA inspection. Whether you're a solo founder still on spreadsheets, an established SME with backlog accounting issues, or a multi-entity group needing consolidated reports, we plug in and run your finance function end-to-end.",
    features: [
      "Daily Transaction Recording & Posting",
      "Bank & Credit Card Reconciliation",
      "Accounts Payable & Receivable Management",
      "IFRS-Compliant Monthly Financial Statements",
      "General Ledger Management",
      "Backlog Accounting & Catch-Up Work",
      "Management Reporting & KPI Dashboards",
      "Year-End Audit-Ready File Preparation",
    ],
    process: [
      {
        step: "01",
        title: "Onboarding & System Setup",
        desc: "We review your current records, migrate data to Zoho, Xero, QuickBooks or your preferred platform, and configure a chart of accounts that scales with your business.",
      },
      {
        step: "02",
        title: "Monthly Bookkeeping & Close",
        desc: "Daily or weekly transaction posting, full reconciliations, AP/AR ageing reports, and a clean management pack delivered by the 10th of every month.",
      },
      {
        step: "03",
        title: "Year-End & Audit Handover",
        desc: "We prepare your statutory financial statements in IFRS format, ready for audit, FTA filing, and stakeholder review — no last-minute scramble.",
      },
    ],
    subsections: [
      {
        title: "Outsourced Bookkeeping",
        body: "Day-to-day bookkeeping covers transaction entry, supplier invoice processing, customer receipt management, expense categorisation, and bank reconciliation. We work on cloud platforms (Zoho Books, Xero, QuickBooks Online, Sage) so you have real-time access to your numbers from any device. Quality-controlled, double-reviewed before each month-end close.",
      },
      {
        title: "IFRS Financial Statements",
        body: "Every UAE company is required to maintain accounts in line with International Financial Reporting Standards. We prepare your statement of financial position, profit and loss, cash flow statement, and notes to the accounts in full IFRS format — ready for audit, bank loans, investor due diligence, or visa quota applications.",
      },
      {
        title: "Backlog Accounting & Catch-Up",
        body: "Behind on your books? You're not alone — most SMEs come to us with 6–24 months of backlog. We reconstruct your accounts from bank statements, invoices and receipts, sort out the past, and hand you a clean trial balance ready for Corporate Tax filing or audit. The earlier we start, the lower your exposure to penalties.",
      },
      {
        title: "Management Reporting",
        body: "Beyond statutory accounts, we deliver monthly management packs — revenue trends, gross margin analysis, AR ageing, cash runway, and KPIs tailored to your business model. The reports answer the questions owners actually ask: 'How much did we make last month, and where is the cash?'",
      },
      {
        title: "Accounting Review & Supervision",
        body: "If you already have an in-house bookkeeper, we provide independent quarterly reviews — checking reconciliations, identifying missed entries, spotting fraud risks, and verifying your numbers are audit-ready. A cost-effective alternative to hiring a senior controller.",
      },
    ],
    faqs: [
      {
        q: "How much does outsourced accounting cost in Dubai?",
        a: "Fees depend on transaction volume, complexity, and whether you need monthly reporting. SMEs typically pay between AED 1,500 and AED 5,000 per month for a full bookkeeping + financials package. We quote fixed monthly fees with no surprises.",
      },
      {
        q: "Which accounting software do you work with?",
        a: "We're certified on Zoho Books, Xero, QuickBooks Online, Sage, and Tally. We'll recommend the best fit for your business size, industry and integrations — or work in your existing platform if you already have one.",
      },
      {
        q: "Can you fix our backlog accounting?",
        a: "Yes — backlog and catch-up work is a core service. Whether you have 3 months or 3 years of unrecorded transactions, we reconstruct your books from source documents and deliver a clean trial balance for tax filing or audit.",
      },
      {
        q: "Do you provide audit support?",
        a: "Absolutely. Because we audit companies ourselves, we structure your records to sail through audit. We coordinate directly with your auditor, prepare every schedule, and respond to all queries — saving you time and audit fees.",
      },
      {
        q: "How quickly can you onboard us?",
        a: "Standard onboarding takes 5–10 working days, including chart of accounts setup, opening balance review, and access to your cloud platform. Backlog projects start in parallel.",
      },
    ],
    metaTitle: "Accounting & Bookkeeping Services in Dubai | IFRS | HMA",
    metaDescription:
      "Outsourced accounting and bookkeeping in Dubai by ICAEW & ACCA chartered accountants. IFRS financials, backlog catch-up, audit-ready books. Fixed monthly fees.",
  },
  {
    slug: "audit-assurance",
    title: "Audit & Assurance",
    tagline: "Ministry of Economy licensed auditors — independent, accepted across all UAE free zones.",
    shortDesc:
      "Statutory, internal and tax audits by a Ministry of Economy licensed firm — accepted by all UAE free zones, banks, and regulators.",
    description:
      "Audit is more than a compliance tick-box — it's how investors verify your business, banks underwrite your credit, and regulators trust your numbers. The UAE requires every free zone company to file an annual audit report within 3–6 months of financial year end, and mainland LLCs must produce audited accounts for renewals, visas, and tax. HMA is licensed by the UAE Ministry of Economy as an independent audit firm and is listed across all major free zones — DMCC, JAFZA, DIFC, ADGM, DAFZA, IFZA, Meydan, twofour54, and 30+ others — meaning our audit reports are accepted everywhere. Our team of ICAEW, ACCA, AICPA and CIA qualified auditors delivers thorough, defensible audits without the inflated fees of the Big Four. Whether you need a statutory year-end audit, an internal controls review, a tax audit, or an interim quarterly review for your bank, we deliver a clean, independent opinion on time.",
    features: [
      "Statutory / External Audit (Ministry of Economy Licensed)",
      "Internal Audit & Controls Review",
      "Tax Audit & FTA Compliance Audit",
      "Revenue Audit",
      "Interim & Quarterly Reviews",
      "Free Zone Audit (Listed in 30+ Zones)",
      "Special Purpose Audits & Agreed-Upon Procedures",
    ],
    process: [
      {
        step: "01",
        title: "Planning & Risk Assessment",
        desc: "We understand your business, identify risk areas, agree the audit scope, and confirm timelines with you upfront — no surprises.",
      },
      {
        step: "02",
        title: "Fieldwork & Evidence",
        desc: "On-site or remote examination of transactions, internal controls, and supporting documentation, with clear communication on any issues found.",
      },
      {
        step: "03",
        title: "Audit Report & Sign-Off",
        desc: "A clear, independent audit opinion delivered within the agreed timeline — accepted by all UAE free zones, banks, and regulators.",
      },
    ],
    subsections: [
      {
        title: "Statutory External Audit",
        body: "Every UAE free zone company must submit an annual audit report within 3–6 months of financial year end to maintain its trade licence. Mainland LLCs require audited accounts for licence renewals, bank facilities, visa quota increases and Corporate Tax filing. HMA is licensed by the Ministry of Economy and listed across all major free zones — our audit reports are accepted without exception.",
      },
      {
        title: "Internal Audit & Controls Review",
        body: "Internal audit gives senior management independent assurance that operations, controls, and risk management are working as designed. Our internal audit team — including CIA-qualified professionals — reviews your processes, identifies control gaps, tests effectiveness, and delivers a practical report with prioritised recommendations.",
      },
      {
        title: "Tax Audit & FTA Compliance",
        body: "With Corporate Tax now in force and VAT audits intensifying, a proactive tax audit identifies exposure before the FTA does. We review your registrations, returns, input VAT recovery, transfer pricing positions, and supporting documentation — flagging issues you can fix before they become penalties.",
      },
      {
        title: "Revenue Audit",
        body: "Revenue audits verify that reported income matches your business records, contracts, and supporting documents. They're often required for performance-linked contracts, royalty calculations, franchise audits, and lender covenants. We deliver an independent, defensible report on the agreed scope.",
      },
      {
        title: "Interim & Quarterly Reviews",
        body: "Many banks and regulators now require interim or quarterly financial reviews — a lighter-touch engagement than a full audit but with independent assurance. We deliver review reports on a timeline that matches your reporting calendar, ideal for facilities, investor reporting, or group consolidation.",
      },
    ],
    faqs: [
      {
        q: "Is an audit mandatory for my UAE company?",
        a: "Yes for all free zone companies and most mainland LLCs. Even where not legally mandatory, an audit is required for bank facilities, visa quota increases, Corporate Tax filing for entities above certain thresholds, and most government tenders.",
      },
      {
        q: "How long does an audit take?",
        a: "Standard SME statutory audits take 2–4 weeks from fieldwork start to signed report, depending on the quality of your records. We agree the timeline at planning stage and stick to it.",
      },
      {
        q: "Are your audit reports accepted by all UAE free zones?",
        a: "Yes — HMA is licensed by the Ministry of Economy and listed in 30+ free zones including DMCC, JAFZA, DIFC, ADGM, DAFZA, IFZA, Meydan, twofour54, and more. Our reports are universally accepted.",
      },
      {
        q: "Can you audit and do our accounting?",
        a: "Independence rules prevent us from auditing books we've prepared for the same entity. We can either audit you (if a third party does your accounting) or run your accounting (if a different auditor audits you). Many clients use us for accounting and a separate firm for audit, or vice versa.",
      },
      {
        q: "How much does an audit cost in Dubai?",
        a: "Fees depend on entity size, transaction volume, complexity, and the audit standard required. SME audits typically range from AED 8,000 to AED 25,000. We quote a fixed fee after a brief scoping call — no hourly billing surprises.",
      },
    ],
    metaTitle: "Audit Firm in Dubai | Ministry of Economy Licensed | HMA",
    metaDescription:
      "Ministry of Economy licensed audit firm in Dubai. Statutory, internal and tax audits accepted by all UAE free zones. ICAEW, ACCA & AICPA qualified auditors.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return servicesData.find((s) => s.slug === slug);
}
