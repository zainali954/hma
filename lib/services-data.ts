export interface Service {
  slug: string;
  title: string;
  tagline?: string;
  shortDesc: string;
  description: string;
  features: string[];
  process: { step: string; title: string; desc: string }[];
  subsections?: { title: string; body: string }[];
}

export const servicesData: Service[] = [
  {
    slug: "audit-assurance",
    title: "Audit & Assurance",
    tagline: "Audit success comes from service, not from status",
    shortDesc:
      "Independent statutory and internal audit services ensuring financial accuracy and full regulatory compliance across the UAE.",
    description:
      "A systematic scrutiny of books of accounts & statutory records to verify the financial position of an organisation. It is legally mandated for all free zone companies doing business in the UAE to submit their annual audit report with their respective authorities. Auditors have a vital role to play in any business organisation as it indicates the overall health of the business. Investors and management use audit as a tool to assess past performance and formulate future course of action.",
    features: [
      "Statutory Audit (Ministry of Economy licensed)",
      "Internal Audit & Controls Review",
      "External / Statutory Audit",
      "Tax Audit",
      "Revenue Audit",
      "Interim Audit",
    ],
    process: [
      { step: "01", title: "Planning & Risk Assessment", desc: "We assess your business environment, identify risk areas and tailor the audit scope accordingly." },
      { step: "02", title: "Fieldwork & Evidence Gathering", desc: "On-site examination of financial records, transactions and internal controls." },
      { step: "03", title: "Audit Report & Opinion", desc: "Clear, actionable audit opinion delivered within agreed timelines." },
    ],
    subsections: [
      {
        title: "Internal Audit",
        body: "Higher management use internal audit as an assurance to check all operations are being carried out effectively. Our competent auditors provide an independent and objective assessment of your company's operations, especially the effectiveness of the internal control structure.",
      },
      {
        title: "External Audit",
        body: "Also known as statutory audit, a firm doing business in UAE has to submit its audit report 3 to 6 months within end of financial year. We are approved by the Ministry of Economy to act as a licensed auditor. We are listed in all major free zones and our audit report is accepted across the UAE.",
      },
      {
        title: "Tax Audit",
        body: "Today's multinational corporations are facing the most challenging tax environment in history because of a combination of four global forces converging to create a perfect storm. The unstable environment created by these forces is resulting in a substantial increase in the number and size of tax audits, adjustments, and disputes. This surge is placing significant strain on traditional methods of resolving tax controversaries.",
      },
      {
        title: "Revenue Audit",
        body: "A revenue audit is a two-part process that examines the figures and information on a company tax return against those found in its business records. In general, auditors check the returns of income over a one year period. However, they may review records for prior years too in case they notice any discrepancies. Most companies, big and small, are subject to an audit at some points. Auditors can focus on one or more areas, such as your financial statements, compliance, tax information, or business operations. Basically, their role is to investigate an existing report, system or entity. During the revenue audit, for example, a company tax return will be compared to its tax records. This can be done through substantive tests, completeness tests, cutoff tests and other procedures.",
      },
      {
        title: "Interim Audit",
        body: "An interim audit is a part of audit strategy where audit testing is performed on interim financial statements or near balance sheet date. This audit strategy is done for more efficient audit execution of procedures at the annual audit or final audit testing. Frequently, an interim audit is also performed as the result of the request from client as a response to financial institutions who are requiring their interim financial statements to be reviewed every quarter by the independent audit firm to be submitted to local regulator or authority and banks.",
      },
    ],
  },
  {
    slug: "accounting",
    title: "Accounting Services",
    shortDesc:
      "End-to-end accounting and financial reporting services that give you a real-time view of your business performance.",
    description:
      "Tax accounting is the means of accounting for tax purposes. It applies to all individuals, businesses, corporations, and other entities. The purpose involves tracking funds and maintaining accurate records to prevent financial mismanagement. Businesses require deeper analysis during tax accounting processes — tracking both incoming funds and outgoing expenditures related to business obligations, shareholder distributions, and operational expenses.",
    features: [
      "Financial Statement Preparation (IFRS)",
      "General Ledger Management",
      "Accounts Payable & Receivable",
      "Accounting Review & Reconciliation",
      "Backlog Accounting",
      "Accounting Supervision",
    ],
    process: [
      { step: "01", title: "Onboarding & Data Migration", desc: "We review your existing records and migrate data to your chosen accounting platform." },
      { step: "02", title: "Monthly Processing", desc: "Regular posting of transactions, reconciliations and management reports." },
      { step: "03", title: "Year-End Financials", desc: "Preparation of audited-ready financial statements for filing and compliance." },
    ],
    subsections: [
      {
        title: "Accounting",
        body: "Businesses require deeper analysis during tax accounting processes. Companies must track both incoming funds and outgoing expenditures related to business obligations, shareholder distributions, and operational expenses. It is recommended that a business use a tax accountant to perform these duties, due to the complexity of the records involved.",
      },
      {
        title: "Accounting Review",
        body: "This service targets organisations with existing monthly accounting systems who want independent verification. The team conducts thorough account reviews to verify reconciliations meet industry standards and identify potential hidden issues. Quarterly reviews can detect shortage, missed deposits or bank charges that could add up to a significant cost.",
      },
      {
        title: "Backlog Accounting",
        body: "Under the UAE Commercial Companies Act, businesses must maintain proper accounts. HMA assists small and medium enterprises in establishing backlog accounts from their operational start date, requiring appropriate documentation such as invoices, receipts, bank statements and transfer copies. The firm completes annual account books.",
      },
      {
        title: "Accounting Supervision",
        body: "This offering mirrors the accounting review service, providing independent assessment of existing accounting functions with a focus on reconciliation accuracy and loss prevention.",
      },
    ],
  },
  {
    slug: "bookkeeping",
    title: "Bookkeeping Services",
    shortDesc:
      "Accurate, timely bookkeeping so your accounts are always up to date and audit-ready.",
    description:
      "Bookkeeping is the systematic recording and organising of financial transactions in a company. The service involves recording financial activities on a day-to-day basis to maintain records that are accurate, current, and thorough. Quality control structures help guarantee that whether transactions involve purchases or sales, documentation stays timely and precise.",
    features: [
      "Daily Transaction Recording",
      "Supplier Invoice Processing",
      "Customer Receipt Management",
      "Bank & Credit Card Reconciliation",
      "Expense Categorisation & Tracking",
      "Monthly Trial Balance & Reporting",
    ],
    process: [
      { step: "01", title: "System Setup", desc: "Configure your chart of accounts and integrate bank feeds for seamless data capture." },
      { step: "02", title: "Ongoing Recording", desc: "Daily or weekly posting of all transactions with proper coding." },
      { step: "03", title: "Monthly Close & Review", desc: "Reconcile all accounts and deliver clean, reviewed financials each month." },
    ],
  },
  {
    slug: "tax-consultancy",
    title: "Tax Consultancy",
    shortDesc:
      "UAE VAT, Excise Tax, Corporate Tax registration, filing and end-to-end advisory for businesses of all sizes.",
    description:
      "Corporate tax represents a direct tax on net income or profits of corporations and business entities. In the UAE, taxable income not exceeding AED 375,000 is subject to 0% tax, while income exceeding AED 375,000 is subject to 9%. HMA provides consultation and training on the new corporate tax legislation and assists with all registration and compliance procedures.",
    features: [
      "Corporate Tax Registration & Returns",
      "VAT / Excise Tax Registration",
      "VAT / Excise Tax Return Filing",
      "VAT / Excise Tax Reconsideration",
      "VAT / Excise Tax Training & Advisory",
      "Tax Residence Certificate",
    ],
    process: [
      { step: "01", title: "Eligibility Assessment", desc: "Determine your VAT and corporate tax obligations and registration requirements." },
      { step: "02", title: "Registration & Setup", desc: "Handle FTA registration and configure your invoicing for full tax compliance." },
      { step: "03", title: "Ongoing Compliance", desc: "Prepare and file returns on time, and represent you in any FTA correspondence." },
    ],
    subsections: [
      {
        title: "Corporate Tax",
        body: "Corporate tax represents a direct tax on net income or profits of corporations and business entities, also termed Corporate Income Tax (CIT) or Business Profits Tax. The UAE maintains competitive corporate tax rates: 0% for taxable income not exceeding AED 375,000 and 9% for taxable income exceeding AED 375,000. HMA provides consultation, training and registration assistance on the new corporate tax legislation.",
      },
      {
        title: "VAT / Excise Tax Registration",
        body: "Registration with the FTA requires compliance with Federal Law Number 7 and 8 of 2017. Non-compliance penalties can reach AED 20,000. HMA guides applicants through the correct registration procedures to ensure timely, penalty-free compliance.",
      },
      {
        title: "VAT / Excise Tax Return Filing",
        body: "VAT returns must be filed within 28 days following each tax period, with VAT payment due simultaneously. Excise Tax returns require filing by the 15th day after the period closure. HMA manages the entire filing process on your behalf.",
      },
      {
        title: "VAT / Excise Tax Reconsideration",
        body: "Businesses may request FTA reconsideration within 20 business days from notification, with supporting analysis. The FTA responds within 20 business days. Applications must be submitted in Arabic. HMA prepares and submits reconsideration requests on your behalf.",
      },
      {
        title: "VAT / Excise Tax Training & Advisory",
        body: "Expert-led training covers VAT and Excise concepts, regulations, compliance, and accounting system design. Advisory services address group VAT, error minimisation, penalties, international transactions, and activity-specific treatments.",
      },
      {
        title: "Tax Residence Certificate",
        body: "The UAE maintains agreements with 55 countries preventing double taxation. A Tax Residency Certificate is one of the official documents issued by the Ministry of Finance confirming corporate or individual tax residence in the UAE.",
      },
    ],
  },
  {
    slug: "corporate-tax",
    title: "Corporate Tax",
    shortDesc:
      "UAE Corporate Tax registration, compliance and strategic planning — ensuring you meet the 2023 regime requirements.",
    description:
      "The UAE's Federal Corporate Tax regime (effective June 2023) applies to most businesses. HMA's corporate tax team helps you understand your obligations, register with the FTA, prepare accurate tax returns and plan your structure to optimise your tax position — all within the letter of the law.",
    features: [
      "Corporate Tax Registration (FTA)",
      "Taxable Income Computation",
      "Annual Corporate Tax Return",
      "Transfer Pricing Documentation",
      "Tax Planning & Structuring",
      "Deferred Tax Accounting (IFRS)",
    ],
    process: [
      { step: "01", title: "Tax Position Review", desc: "Assess your business structure and identify corporate tax implications." },
      { step: "02", title: "Registration & Compliance Setup", desc: "Register with FTA and establish compliant accounting and reporting processes." },
      { step: "03", title: "Annual Return & Planning", desc: "Prepare and file the CT return, and advise on lawful tax optimisation strategies." },
    ],
  },
  {
    slug: "business-advisory",
    title: "Business Advisory",
    tagline: "Advisory Services with H M A!",
    shortDesc:
      "Strategic advisory helping UAE businesses grow, make better decisions and navigate a rapidly changing marketplace.",
    description:
      "Businesses today are facing significant challenges in light of the rapidly changing economic landscape. It becomes imperative in such a situation to seek expert opinion. Our advisory professionals will work with you to help you sail through the complexity of today's rapidly changing marketplace in a way that is both pragmatic and sustainable. We put our knowledge to use to develop practical recommendations designed to help you work smarter, grow faster and compete stronger.",
    features: [
      "Company Valuation",
      "Feasibility Study",
      "Management Consultancy",
      "Due Diligence",
      "Business Plan Preparation",
      "Management Reporting",
    ],
    process: [
      { step: "01", title: "Business Health Check", desc: "Review your financials, operations and strategic direction." },
      { step: "02", title: "Advisory Plan", desc: "Develop a tailored roadmap addressing your specific challenges and goals." },
      { step: "03", title: "Implementation Support", desc: "Work alongside your team to execute recommendations and track results." },
    ],
    subsections: [
      {
        title: "Company Valuation",
        body: "A business valuation is a general process of determining the economic value of a whole business or company unit. The service addresses fair value determination for sales, partnerships, taxation, and legal matters, with professional evaluators providing objective, defensible assessments.",
      },
      {
        title: "Feasibility Study",
        body: "Statistics show that 8 out of 10 businesses fail in the first year due to multiple reasons like poor management, lack of planning, starting business without research, and not understanding product and customers. HMA assists with market analysis and viability assessment for new ventures to ensure informed investment decisions.",
      },
      {
        title: "Management Consultancy",
        body: "HMA offers customised strategies through experienced professionals who work collaboratively with organisations, acknowledging that each business requires tailored approaches based on its organisational structure, policies, and market conditions.",
      },
      {
        title: "Due Diligence",
        body: "Due diligence is an investigation or audit of a potential investment or product to confirm all the facts, including the review of financial records. This encompasses research before agreements and financial transactions, protecting your investment decisions with verified, accurate information.",
      },
      {
        title: "Business Plan",
        body: "A business plan is a written description of your business's future — a document that tells what you plan to do and how you plan to do it. HMA's professional planning services position organisations for improved profitability and asset growth.",
      },
      {
        title: "Management Report",
        body: "Management reporting is the foundation for monitoring performance, tracking against plans and making strategic business decisions. The service emphasises clear, timely reporting essential for understanding your organisation's financial health and direction.",
      },
    ],
  },
  {
    slug: "company-formation",
    title: "Company Formation",
    shortDesc:
      "End-to-end business setup services for Mainland, Free Zone and Offshore companies in the UAE.",
    description:
      "Setting up a business can be a technical and tedious task as it requires a lot of documentation, know-how of the intricacies of law and a lot of clearance. You can rely on our expertise and experience to take care of all these works for you, so that you can focus on other important things.",
    features: [
      "Mainland (DED) Company Setup",
      "Free Zone Company Formation",
      "Offshore Company Registration",
      "Trade Licence Applications",
      "Liquidation / De-Registration",
      "Liquidator Report",
    ],
    process: [
      { step: "01", title: "Structure Consultation", desc: "Determine the best jurisdiction and legal structure for your business activity." },
      { step: "02", title: "Licensing & Registration", desc: "Prepare and submit all documentation to the relevant authority." },
      { step: "03", title: "Post-Setup Support", desc: "Assist with bank account opening, visas and ongoing compliance." },
    ],
    subsections: [
      {
        title: "Mainland Company Formation",
        body: "A mainland company allows you to conduct business anywhere in the UAE and with the UAE government. HMA manages the entire process — from initial approvals with the Department of Economic Development (DED) to obtaining your trade licence and completing all regulatory requirements.",
      },
      {
        title: "Free Zone Company Formation",
        body: "There are more than 40 free zones in the UAE. Most entrepreneurs who want tax optimisation opt for free zone formation as the free zone authorities bring out various benefits and incentives to businesses set up in the zone. A free zone company has no restrictions in terms of ownership — an expat can hold 100% of the company.",
      },
      {
        title: "Offshore Company Formation",
        body: "An offshore company is one established in another jurisdiction while its parent corporation is in another country. It does not carry out any substantial business activities in its country of formation and is framed in a law of no-tax jurisdiction for the purposes of legally reducing tax payments and enhancing wealth management. The UAE is one of the well-known jurisdictions in the world for incorporating an offshore company.",
      },
      {
        title: "Liquidation / De-Registration",
        body: "Liquidation is the process of ceasing the operations of a company. No matter what type of business you own in the UAE, you must cancel your business licence and all related permits associated with it when you have made the decision to close it down.",
      },
      {
        title: "Liquidator Report",
        body: "It is the process of selling all the assets of the company, paying creditors, distributing any remaining assets to shareholders, and then dissolving the company. HMA is a legal liquidator for mainland, free zone and offshore companies in UAE. The liquidator is registered with the Registrar of Companies and submits his report to the respective authority.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return servicesData.find((s) => s.slug === slug);
}
