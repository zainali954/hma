/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Blog seed script — run with:
 *   npx ts-node -r tsconfig-paths/register scripts/seed-blogs.ts
 * or add to package.json:
 *   "seed:blogs": "ts-node -r tsconfig-paths/register scripts/seed-blogs.ts"
 */

const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/hmaa-dubai";

// ─── Schema (mirrors lib/models/BlogPost.ts) ──────────────────────────────────
const BlogPostSchema = new mongoose.Schema(
  {
    title:      { type: String, required: true, trim: true },
    slug:       { type: String, required: true, unique: true, trim: true },
    excerpt:    { type: String, default: "" },
    content:    { type: String, default: "" },
    coverImage: { type: String, default: "" },
    author:     { type: String, default: "HMA Auditing of Accounts" },
    tags:       [{ type: String, trim: true }],
    published:  { type: Boolean, default: true },
    featured:   { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ─── Blog posts ───────────────────────────────────────────────────────────────
const posts = [
  // ── 1 ────────────────────────────────────────────────────────────────────────
  {
    title: "How Can You Protect Your Finances in 2023 from Economic Slowdowns?",
    slug: "how-can-you-protect-your-finances-in-2023-from-economic-slowdowns",
    excerpt:
      "Small business owners rarely have a reliable plan for economic downturns. Here are the key steps you can take to protect your finances during an economic slowdown in the UAE.",
    author: "HMA Auditing of Accounts",
    tags: ["Financial Planning", "Business Advisory", "UAE Economy", "Accounting"],
    published: true,
    featured: true,
    coverImage: "",
    content: `<h1>How Can You Protect Your Finances in 2023 from Economic Slowdowns?</h1>

<p>One of the scariest worries that may unnerve businesspeople around the world is the prospect of an economic slowdown. As one of the top accounting firms in Dubai, we can attest that the majority of small business owners don't have a reliable plan in place to deal with potential downturns in the economy. You need to plan ahead for your finances in case of inflation, rising interest rates, or major world events that could affect your supply chain (remember the pandemic). So let's look at what you can do to get ready for an economic slowdown.</p>

<h2>1. Monitor Client and Partner Needs</h2>

<p>You must pay close attention to the needs of your clients and partners during uncertain times. It's not as difficult as you may think — calling your most significant clients over the phone will help you do this. These discussions will assist you in understanding how the market for your products or services is evolving and the necessary steps to be taken.</p>

<p>You must also discover the solutions to the following important questions:</p>

<ul>
  <li>Do your customers reduce or change their orders?</li>
  <li>Is it necessary to investigate new markets?</li>
  <li>Exists a danger to your suppliers that could have an impact on your purchases?</li>
</ul>

<h2>2. Examine Your Production Schedule and Concentrate on Efficiency</h2>

<p>You may decide to review your production plan as a result of the discussions you have with your clients and suppliers. It will assist you in ensuring that the products or services you create will find a market. Additionally, you should be careful to maximise output while reducing unnecessary costs.</p>

<p>You should also compare the success of your business to internal benchmarks or goals, such as industry standards. Business owners can increase their output by cutting down on delays, enhancing quality, and eliminating other wasteful practices. You can consult accounting firms in Dubai to evaluate the performance of your company using important financial parameters.</p>

<h2>3. Streamline Your Financial Operations</h2>

<p>Entrepreneurs need to have a firm understanding of how their company is performing at any one time throughout economic downturns. This understanding shouldn't be arrived at based on speculation or an intuitive sensation. In order to track the financial success of your company and identify any issues that may need to be resolved, it is critical to have genuine data and a method that explains how the results change over time. Utilise accounting services in Dubai to get reliable financial information.</p>

<h2>4. Budget and Make Financial Estimates</h2>

<p>The data you gathered can be used to make a forecast in the following step. One essential component of sound financial management techniques is the creation of an exhaustive annual budget. Only if the budget includes an income statement, a cash flow statement, and a balance sheet will it be considered comprehensive. Most importantly, there must be a connection between all three statements.</p>

<p>As your projections represent predictions of future income, cash flows, and financial status, this is significant for the company. These predictions can serve as an early warning system that enables you to get ready for fluctuations in cash flow, probable decreases in investments, or increases in operational expenses.</p>

<h2>How HMA Auditing of Accounts Can Help</h2>

<p>You just went over some of the crucial steps you need to take as soon as you sense the economy is shifting. To carry out any of these tasks effectively, you could need the help of accounting firms in Dubai like <strong>HMA Auditing of Accounts</strong>.</p>

<p>In the UAE, HMA has a team of highly qualified chartered accountants who can help business owners with their accounting needs, including keeping financial records, planning for UAE corporate tax, registering for VAT, completing VAT returns, ESR, AML, and UBO, among other things. Entrepreneurs can successfully accomplish their business objectives while feeling at ease by utilising HMA's reliable accounting services in Dubai.</p>`,
  },

  // ── 2 ────────────────────────────────────────────────────────────────────────
  {
    title: "8 Qualities of a Good Accountant You Should Always Remember",
    slug: "8-qualities-of-a-good-accountant-you-should-always-remember",
    excerpt:
      "A competent accountant possesses a diverse set of abilities that enable them to profit from even the most complex accounting systems. Here are the 8 key qualities to look for.",
    author: "HMA Auditing of Accounts",
    tags: ["Accounting", "Professional Skills", "Chartered Accountancy", "UAE"],
    published: true,
    featured: false,
    coverImage: "",
    content: `<h1>8 Qualities of a Good Accountant You Should Always Remember</h1>

<p>A competent accountant possesses a diverse set of abilities that enable him or her to profit from even the most complex accounting systems. Identifying the right accounting professional requires understanding the specific traits that lead to quality service delivery. Here are the eight key qualities you should always look for.</p>

<h2>1. Well-Organised</h2>

<p>A skilled accountant should maintain current accounting records and demonstrate monthly financial performance. Their organisational abilities ensure you obtain financial records whenever you need them, ensuring that your company does not incur fines as a result of misplaced or missing documents. Organisation also means delivering reports on time and maintaining a systematic approach to every engagement.</p>

<h2>2. Up-to-Date with Accounting's Latest Trends</h2>

<p>Staying current with industry developments represents a critical competency. Tax laws, IFRS standards, UAE VAT regulations, and corporate tax rules change regularly. An accountant who knows the current trends in accounting can give unbiased advice that will help your business improve and flourish — and keep you on the right side of the Federal Tax Authority.</p>

<h2>3. Patient</h2>

<p>Patience is essential when handling client interactions and complex financial data. Accounting professionals must remain patient throughout explanations and task completion. Without this quality, it will be difficult for you to get your business's bookkeeping properly recorded and your questions answered clearly.</p>

<h2>4. Strong Analytical Skills</h2>

<p>Good accountants don't just record numbers — they interpret them. Analytical thinking allows an accountant to spot trends, identify anomalies, and provide forward-looking advice. This skill is especially important during audits, financial reviews, and tax planning exercises.</p>

<h2>5. Excellent Communicator</h2>

<p>Financial information must be communicated clearly to business owners, management, investors, and regulators. A good accountant translates complex accounting language into simple, actionable insights that enable better decision-making at every level of your organisation.</p>

<h2>6. Integrity and Ethical Standards</h2>

<p>Accountants handle sensitive financial information. Integrity is non-negotiable. Professional bodies such as ICAEW, ACCA, and AICPA require their members to adhere to strict codes of ethics. Always choose an accountant who places transparency and ethical conduct above all else.</p>

<h2>7. Technologically Proficient</h2>

<p>Modern accounting relies on cloud platforms such as Zoho Books, QuickBooks, Xero, and FTA e-Services. A tech-savvy accountant improves efficiency, reduces errors, and gives you real-time visibility into your finances — from anywhere in the world.</p>

<h2>8. Attention to Detail</h2>

<p>Even a small numerical error can lead to significant financial or compliance consequences. The best accountants review every figure, cross-check every reconciliation, and never rush through a balance sheet. Attention to detail is what separates an average accountant from an excellent one.</p>

<h2>Find a Qualified Accountant in Dubai</h2>

<p>At <strong>HMA Auditing of Accounts</strong>, our team is qualified from world-class professional accountancy bodies including ICAEW, ACCA, AICPA, PICPA, IPA (Australia) and CIA. We bring all eight of these qualities to every client engagement. Contact us today to find out how we can support your business.</p>`,
  },

  // ── 3 ────────────────────────────────────────────────────────────────────────
  {
    title: "How Do Islamic Banks Work?",
    slug: "how-do-islamic-banks-work",
    excerpt:
      "Islamic banking is a financial system rooted in Shari'ah principles that prohibits interest-based transactions. Learn how Islamic banks generate profit through Ijara, Murabaha, Wakala and Salam structures.",
    author: "HMA Auditing of Accounts",
    tags: ["Islamic Banking", "Finance", "UAE", "Shari'ah"],
    published: true,
    featured: false,
    coverImage: "",
    content: `<h1>How Do Islamic Banks Work?</h1>

<h2>What Is Islamic Banking?</h2>

<p>Islamic banking constitutes a financial system rooted in Shari'ah principles, prohibiting interest-based transactions. Under this system, money is only a medium of exchange — it has no value in itself and therefore cannot generate additional funds through fixed interest alone. Instead of charging interest, Islamic banks engage in profit-sharing arrangements, trading in Shari'ah-compliant investments with the money deposited by customers and sharing the risks and the profits between them.</p>

<p>Islamic banking principles are gaining global adoption, with consumers increasingly valuing this ethical and alternative financial approach. In the UAE, Islamic banks play a significant role in the national financial system.</p>

<h2>Four Primary Profit Structures in Islamic Banking</h2>

<h3>1. Ijara (Leasing)</h3>

<p>In an Ijara arrangement, the bank purchases an asset on behalf of the customer and then leases it back to them while retaining ownership. The customer makes regular lease payments over an agreed period. Upon completion of the lease, ownership of the asset transfers to the customer. This structure is commonly used for property and equipment financing.</p>

<h3>2. Murabaha (Cost-Plus Sales)</h3>

<p>Under Murabaha, the bank facilitates an asset purchase by buying the item itself and then reselling it to the customer at cost plus an agreed profit margin. The profit amount is known and agreed upon upfront, and the customer repays via installments. This is one of the most widely used structures for trade and working capital financing.</p>

<h3>3. Wakala (Agency)</h3>

<p>In a Wakala arrangement, the bank acts as an investment manager or agent on behalf of the client. The bank applies its expertise to generate an agreed-upon profit return for clients over a specified period. The bank earns a fee for its agency services rather than interest, keeping the arrangement fully Shari'ah-compliant.</p>

<h3>4. Salam (Commodity Forward Purchase)</h3>

<p>Salam is a forward sale agreement in which the bank provides upfront payment for commodities with deferred delivery. The bank then utilises commodity brokers for purchasing and resale. This structure is particularly relevant for agricultural and commodity-based transactions.</p>

<h2>Islamic Banking and Accounting in the UAE</h2>

<p>For businesses operating with Islamic financial institutions, it is essential to have accountants who understand the specific treatment of these instruments under IFRS and UAE accounting standards. <strong>HMA Auditing of Accounts</strong> has extensive experience working with clients who operate within Islamic finance frameworks, ensuring accurate financial reporting and full regulatory compliance.</p>`,
  },

  // ── 4 ────────────────────────────────────────────────────────────────────────
  {
    title: "VAT on Oil & Gas Sector in United Arab Emirates",
    slug: "vat-on-oil-gas-sector-in-united-arab-emirates",
    excerpt:
      "The oil and gas industry in the UAE presents intricate VAT challenges. Learn how the 5% standard rate and 0% zero-rate apply to crude oil, natural gas, exports, and the Reverse Charge Mechanism.",
    author: "HMA Auditing of Accounts",
    tags: ["VAT", "Oil & Gas", "UAE Tax", "FTA", "Tax Consultancy"],
    published: true,
    featured: false,
    coverImage: "",
    content: `<h1>VAT on Oil &amp; Gas Sector in United Arab Emirates</h1>

<p>The oil and gas industry in the UAE presents intricate VAT challenges. Key distinctions include crude versus non-crude products and whether customers are registered or unregistered entities. The framework hinges on determining whether transactions constitute local supplies or export sales — each carrying different VAT implications.</p>

<h2>UAE VAT Rate Structure</h2>

<p>The UAE employs two distinct VAT rates:</p>

<ul>
  <li><strong>5% Standard Rate</strong> — applied to most taxable supplies</li>
  <li><strong>0% Zero-Rate</strong> — applied to specific supplies including certain oil and gas products and exports</li>
</ul>

<h2>Export Sales</h2>

<p>Article 45(1) of the UAE VAT Law states that export sales of oil and gas products are zero-rated. This means that businesses exporting crude oil, refined products, or natural gas outside the UAE will apply 0% VAT to their invoices, though they may still recover input VAT incurred on related costs.</p>

<h2>Local Supply Taxation</h2>

<p>For supplies made within the UAE, the treatment depends on the type of product:</p>

<ul>
  <li><strong>Non-crude oil and natural gas</strong> delivered locally incur the standard 5% VAT rate.</li>
  <li><strong>Crude oil and natural gas</strong> supplies receive zero-rating treatment under Article 45(12) of the UAE VAT Law.</li>
</ul>

<h2>Reverse Charge Mechanism (RCM)</h2>

<p>In the UAE oil and gas sector, recipients typically bear VAT recording obligations through the Reverse Charge Mechanism — unless the buyer is unregistered or non-commercial. This applies equally to both zero-rated and standard-rated supplies when delivered to registered recipients engaged in resale or energy production.</p>

<p>Under the RCM, the buyer accounts for both the output VAT and the recoverable input VAT in their own VAT return, rather than the supplier charging VAT on the invoice.</p>

<h2>Seller Obligations</h2>

<p>Sellers in the oil and gas sector must:</p>

<ul>
  <li>Verify the buyer's VAT registration status with the FTA</li>
  <li>Obtain written confirmation of the buyer's intended use of the goods</li>
  <li>Apply the correct VAT treatment to avoid potential VAT liability and penalties</li>
</ul>

<h2>How HMA Can Help</h2>

<p><strong>HMA Auditing of Accounts</strong> is an FTA-approved tax agent with deep expertise in UAE VAT compliance across all sectors, including oil and gas. Our tax consultancy team can review your VAT position, ensure correct application of the standard and zero rates, and represent you in any FTA correspondence or audit. Contact us today for a free consultation.</p>`,
  },

  // ── 5 ────────────────────────────────────────────────────────────────────────
  {
    title: "How to Use GIBAN to Make VAT Payments",
    slug: "how-to-use-giban-to-make-vat-payments",
    excerpt:
      "The FTA introduced GIBAN — a Generated International Bank Account Number — to simplify VAT payments for registered taxpayers in the UAE. Here's everything you need to know.",
    author: "HMA Auditing of Accounts",
    tags: ["VAT", "FTA", "GIBAN", "UAE Tax", "Tax Payments"],
    published: true,
    featured: false,
    coverImage: "",
    content: `<h1>How to Use GIBAN to Make VAT Payments</h1>

<p>The Federal Tax Authority (FTA) introduced GIBAN as a new payment method to streamline VAT payments for registered taxpayers, complementing existing options like e-Dirham and credit cards. This article explains what GIBAN is, how to obtain it, and how to use it to settle your UAE tax obligations.</p>

<h2>What Is GIBAN?</h2>

<p>GIBAN stands for <strong>Generated International Bank Account Number</strong> — a unique IBAN assigned to each VAT-registered individual or entity. A taxable person can use the GIBAN to transfer funds from specific UAE financial institutions, enabling faster processing of fund transfers between accounts.</p>

<h2>How to Obtain Your GIBAN</h2>

<p>Each taxpayer receives a GIBAN assignment based on their <strong>Tax Registration Number (TRN)</strong>. The GIBAN will be presented in the person's dashboard within the FTA e-Services portal, making it readily accessible to all registered users. Simply log in to your FTA e-Services account and navigate to your dashboard to find your unique GIBAN.</p>

<h2>What Tax Obligations Can GIBAN Cover?</h2>

<p>GIBAN payments cover the following tax obligations:</p>

<ul>
  <li>Unpaid VAT amounts</li>
  <li>Excise Tax liabilities</li>
  <li>Associated penalties and surcharges</li>
</ul>

<p>This provides comprehensive tax settlement options, allowing businesses to resolve all their FTA liabilities through a single bank transfer.</p>

<h2>Key Benefits of Using GIBAN</h2>

<h3>Avoid Credit Card Processing Fees</h3>

<p>One of the most significant advantages of GIBAN is that it helps taxpayers avoid credit card processing fees. Standard card payments to the FTA typically carry a 2–3% processing charge, which can add up significantly for businesses with large VAT liabilities. GIBAN transfers eliminate this cost entirely.</p>

<h3>Timely Fund Transmission</h3>

<p>Utilising GIBAN ensures timely transmission of funds to the FTA, reducing the risk of late payment penalties. Bank transfers via GIBAN are processed efficiently and are reflected in your FTA account faster than some alternative payment methods.</p>

<h2>Step-by-Step: Making a VAT Payment via GIBAN</h2>

<ol>
  <li>Log in to your <strong>FTA e-Services portal</strong> account.</li>
  <li>Navigate to your <strong>dashboard</strong> and locate your unique GIBAN.</li>
  <li>Log in to your <strong>UAE bank's online portal</strong> or visit a branch.</li>
  <li>Initiate a <strong>local bank transfer (IBAN transfer)</strong> using your GIBAN as the beneficiary account number.</li>
  <li>Enter the exact amount due as shown on your FTA account.</li>
  <li>Complete the transfer — funds will be allocated to your FTA account automatically.</li>
</ol>

<h2>Need Help with VAT Compliance?</h2>

<p><strong>HMA Auditing of Accounts</strong> is a registered FTA tax agent providing end-to-end VAT compliance services in the UAE — including VAT registration, return filing, and payment management. If you need assistance with your VAT obligations or understanding the GIBAN system, contact our team today for a free consultation.</p>`,
  },

  // ── 6 ────────────────────────────────────────────────────────────────────────
  {
    title: "Businesses Are Increasingly Susceptible to Cyber-Attacks",
    slug: "businesses-are-increasingly-susceptible-to-cyber-attacks",
    excerpt:
      "Financial institutions are nearly 30% more likely to experience cyber-attacks than other sectors. Accountants must now consider cybersecurity as part of their day-to-day work.",
    author: "HMA Auditing of Accounts",
    tags: ["Cybersecurity", "Business Risk", "Accounting", "Financial Security"],
    published: true,
    featured: false,
    coverImage: "",
    content: `<h1>Businesses Are Increasingly Susceptible to Cyber-Attacks</h1>

<blockquote>
  <p>"Cybersecurity extends beyond just technology and computers — it also encompasses people, information, systems, processes, and organisational culture." — John Berriman, PwC</p>
</blockquote>

<p>Accountants must now consider cybersecurity as part of their day-to-day work. Cybersecurity breaches occur with alarming frequency globally, and financial organisations face a disproportionate level of risk.</p>

<h2>The Growing Threat Landscape</h2>

<p>PwC's research shows that midsize companies experienced a <strong>64% increase</strong> in reported attacks between 2013 and 2014. The financial impact is severe, with single breaches costing US businesses over <strong>$500,000 on average</strong>. For major incidents affecting large organisations, costs begin at approximately <strong>£1.46 million</strong>, excluding reputational damage.</p>

<p>Smaller enterprises face significant vulnerability too, with UK breach costs ranging from £65,000 to £115,000 per incident.</p>

<h2>Why Financial Sector Targets Matter</h2>

<p>Financial institutions face heightened risk, being nearly <strong>30% more likely</strong> to experience attacks than other sectors. These organisations handle high-value data and sensitive financial information on a daily basis. Recent notable incidents include:</p>

<ul>
  <li>The Morgan Stanley breach that exposed details of 900 wealthy clients</li>
  <li>A massive coordinated attack affecting over 100 financial institutions across 30 countries, resulting in <strong>£645.6 million</strong> in direct theft</li>
</ul>

<h2>Common Attack Methods</h2>

<h3>Phishing and Email-Based Threats</h3>

<p>Employees clicking suspicious email links trigger many hacking incidents. Malicious attachments in Word, Excel, and PDF documents can embed harmful code for later exploitation. Training staff to identify phishing attempts is one of the most cost-effective defences available.</p>

<h3>The Human Factor</h3>

<p>Employee awareness gaps remain the leading cause of security breaches. Key statistics:</p>

<ul>
  <li>90% of employee passwords are compromisable within six hours</li>
  <li>18% of workers share passwords with colleagues</li>
  <li>Forwarding work emails to personal accounts exposes sensitive data, as personal email services lack corporate-grade security protections</li>
</ul>

<h2>What Is Cyber Security?</h2>

<p>Data protection encompasses storage, transfer, access control, and protection mechanisms. Given varying international policies and cross-border service operations, solutions require complexity and coordination across people, technology, and processes.</p>

<h2>The Accountant's Role in Cybersecurity</h2>

<p>Accounting professionals occupy unique positions for advising clients on protective measures. Their expertise should extend beyond technology to include people, processes, information systems, and organisational culture. Accountants who understand cybersecurity can help clients:</p>

<ul>
  <li>Assess the financial exposure from potential breaches</li>
  <li>Review IT security policies and recommend improvements</li>
  <li>Ensure data protection is embedded in business continuity planning</li>
  <li>Report cyber incidents to the appropriate authorities promptly</li>
</ul>

<h2>Protective Measures for Businesses</h2>

<p>Accountants and business owners should familiarise themselves with their firm's IT security policies, safe online practices, and breach reporting procedures. Ongoing cyber awareness training strengthens defences significantly — prevention consistently outperforms remediation in both cost and effectiveness.</p>

<h2>Conclusion</h2>

<p>As cyberattacks become more sophisticated and frequent, businesses of all sizes in the UAE must treat cybersecurity as a core business risk — not just an IT concern. <strong>HMA Auditing of Accounts</strong> helps clients identify financial risk exposures, maintain strong internal controls, and implement governance frameworks that protect against both financial and cyber threats. Contact us today to discuss how we can support your business.</p>`,
  },
];

// ─── Seed function ─────────────────────────────────────────────────────────────
async function seedBlogs() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✓ Connected to MongoDB");

    const BlogPost =
      mongoose.models.BlogPost ||
      mongoose.model("BlogPost", BlogPostSchema);

    let created = 0;
    let skipped = 0;

    for (const post of posts) {
      const exists = await BlogPost.findOne({ slug: post.slug });
      if (exists) {
        console.log(`  skip  "${post.title}" (already exists)`);
        skipped++;
        continue;
      }
      await BlogPost.create(post);
      console.log(`  ✓     "${post.title}"`);
      created++;
    }

    console.log(`\nDone — ${created} created, ${skipped} skipped.`);
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seedBlogs();
