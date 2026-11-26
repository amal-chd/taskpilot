export interface CompetitorComparison {
  slug: string;
  competitorName: string;
  tagline: string;
  category: string;
  heroSummary: string;
  competitorAudience: string;
  taskPilotAudience: string;
  pricingComparison: {
    competitorModel: string;
    competitorEstimatedCost: string;
    taskPilotModel: string;
    taskPilotEstimatedCost: string;
    pricingVerdict: string;
  };
  matrix: {
    feature: string;
    taskPilot: boolean | string;
    competitor: boolean | string;
    note: string;
  }[];
  competitorStrengths: string[];
  competitorLimitations: string[];
  taskPilotStrengths: string[];
  bestForCompetitor: string[];
  bestForTaskPilot: string[];
  verdict: string;
  faqs: { q: string; a: string }[];
}

export const COMPETITORS: Record<string, CompetitorComparison> = {
  'sitecommons-vs-procore': {
    slug: 'sitecommons-vs-procore',
    competitorName: 'Procore',
    tagline: 'Enterprise suite vs focused construction platform',
    category: 'Construction Management Software',
    heroSummary: 'Procore is the undisputed heavyweight for billion-dollar global general contractors with massive annual construction volume. SiteCommons is engineered for small and mid-market builders who need fast jobsite control without six-figure annual contracts or 6-month IT deployments.',
    competitorAudience: 'Tier-1 enterprise EPCs, ENR 400 global general contractors with annual construction volume exceeding $50M–$500M.',
    taskPilotAudience: 'SMB and mid-market general contractors, residential developers, and trade contractors running 1 to 25 active project sites.',
    pricingComparison: {
      competitorModel: 'Annual construction volume percentage (quote-only, no public price list).',
      competitorEstimatedCost: 'Typically $10,000 to $100,000+ per year locked into multi-year contracts with implementation consulting fees.',
      taskPilotModel: 'Transparent flat monthly or annual team tiers in your local currency.',
      taskPilotEstimatedCost: 'Starts at $19/mo (₹1,499/mo) up to $99/mo (₹7,999/mo) flat for up to 100 users with zero per-seat penalty.',
      pricingVerdict: 'SiteCommons costs 85% to 95% less than Procore with 100% self-serve transparency and a 14-day free trial without a sales rep.',
    },
    matrix: [
      { feature: 'Location-Verified GPS Geofenced Attendance', taskPilot: true, competitor: 'Add-on ($$$)', note: 'SiteCommons includes native point-in-time perimeter check-ins with zero battery drain.' },
      { feature: 'Daily Site Diary / DPR with Weather & Trade Mustering', taskPilot: true, competitor: true, note: 'Both capture daily logs; SiteCommons enables 3-minute completion on mobile.' },
      { feature: 'BOQ Import & Earned Value (EV / CPI) Cost Control', taskPilot: true, competitor: 'Custom / High Tier', note: 'SiteCommons tracks Planned Value vs Earned Value dynamically.' },
      { feature: 'Pre-Pour Inspection Hold Points & Snag Lists', taskPilot: true, competitor: true, note: 'Both enforce rigorous quality checklists and defect photo annotations.' },
      { feature: 'Petty Cash Site Expenses & Payroll Salary Slips', taskPilot: true, competitor: false, note: 'SiteCommons includes integrated site expenses, leave, and staff payslips.' },
      { feature: 'Self-Serve Onboarding (Live in under 10 minutes)', taskPilot: true, competitor: false, note: 'Procore requires dedicated implementation consultants and months of setup.' },
      { feature: 'Public Flat Team Pricing (No Per-Seat or Volume Tax)', taskPilot: true, competitor: false, note: 'SiteCommons never penalizes you for adding field supervisors and site engineers.' },
      { feature: 'Multi-Currency & Regional Tax (USD, INR with GST, AED, EUR)', taskPilot: true, competitor: 'USD Only (custom)', note: 'SiteCommons generates compliant GST/VAT corporate invoices in local currencies.' },
    ],
    competitorStrengths: [
      'Extensive integration marketplace with 400+ enterprise ERPs and accounting systems (SAP, Oracle, Sage 300)',
      'Sophisticated BIM 3D model viewers and submittal coordination tools for massive megaprojects',
      'Decades of market maturity and widespread brand recognition among institutional developers',
    ],
    competitorLimitations: [
      'Prohibitively expensive for SMB builders and regional contracting companies',
      'No public pricing; forces buyers through lengthy enterprise sales pipelines',
      'Extremely complex UI requiring dedicated software champions and staff training',
      'Requires substantial annual contract commitments with no self-serve free trial',
    ],
    taskPilotStrengths: [
      'Ready to use immediately: create a workspace and invite site crews in under 10 minutes',
      'Rugged, high-contrast mobile apps designed for sunlight and spotty 3G/4G site connections',
      'Flat predictable team tiers with zero per-seat or annual construction volume penalties',
      'Native GPS geofencing, daily site diaries, and BOQ earned value management included out of the box',
    ],
    bestForCompetitor: [
      'Multi-national EPC contractors managing airport terminals, highways, and mega-hospitals',
      'Firms that strictly require 3D BIM model coordination and deep SAP/Sage 300 ERP sync',
    ],
    bestForTaskPilot: [
      'General contractors, builders, and interior fit-out firms managing 1 to 25 sites',
      'Teams that want to eliminate WhatsApp chaos and paper muster without six-figure software budgets',
      'Contractors in India, the Middle East, and emerging markets needing INR/AED/USD billing with local tax compliance',
    ],
    verdict: 'If you are building a $200M airport and have a dedicated IT department, Procore is the industry standard. But if you are a growing contractor or builder who wants clean task verification, GPS attendance, daily DPRs, and BOQ cost control without spending a fortune, SiteCommons delivers 90% of the field value at a fraction of the cost.',
    faqs: [
      { q: 'Can we migrate from Procore or Excel to SiteCommons?', a: 'Yes. You can import projects, staff rosters, and Bill of Quantities (BOQ) line items via standard Excel templates. Our onboarding team can assist in migrating active sites within 48 hours.' },
      { q: 'Why is SiteCommons so much more affordable than Procore?', a: 'Procore prices its software as a percentage of your total construction volume and maintains thousands of enterprise sales staff. SiteCommons operates on a lean, product-led model with flat team pricing designed for high adoption.' },
    ],
  },
  'sitecommons-vs-fieldwire': {
    slug: 'sitecommons-vs-fieldwire',
    competitorName: 'Fieldwire',
    tagline: 'Flat Team Pricing vs Per-Seat Penalty',
    category: 'Field Management Software',
    heroSummary: 'Fieldwire by Hilti is a widely respected mobile tool for plan viewing and basic task punch lists. However, Fieldwire charges steep per-user monthly fees that penalize you for adding foremen and supervisors, and lacks native BOQ cost control and payroll tools.',
    competitorAudience: 'Specialty trade subcontractors and field managers looking primarily for mobile blueprint viewing and punch lists.',
    taskPilotAudience: 'General contractors, civil builders, and developer project teams needing an end-to-end office-to-field operating system with flat team pricing.',
    pricingComparison: {
      competitorModel: 'Strict per-user monthly seat licensing ($39 to $89 per user per month on Pro/Business tiers).',
      competitorEstimatedCost: 'A team of 25 field engineers and supervisors costs $975 to $2,225 every single month.',
      taskPilotModel: 'Flat team pricing with generous user bundles (no per-seat penalties).',
      taskPilotEstimatedCost: 'SiteCommons Professional costs only $49/mo (or ₹3,999/mo) flat for up to 30 users with all modules included.',
      pricingVerdict: 'For a 25-person team, SiteCommons saves you over $900 per month ($10,800+ annually) while providing deeper commercial and attendance features.',
    },
    matrix: [
      { feature: 'Location-Verified GPS Geofenced Attendance', taskPilot: true, competitor: false, note: 'Fieldwire does not include geofenced check-in or muster tracking.' },
      { feature: 'Daily Site Diary (DPR) with Manpower Headcounts', taskPilot: true, competitor: 'Form Builder ($$$)', note: 'Fieldwire requires higher-tier custom forms; SiteCommons includes native DPRs.' },
      { feature: 'BOQ Import & Earned Value (EV / CPI) Tracking', taskPilot: true, competitor: false, note: 'Fieldwire has no native Bill of Quantities or Earned Value cost module.' },
      { feature: 'Blueprint & Drawing Revision Control', taskPilot: true, competitor: true, note: 'Both offer drawing management; Fieldwire has strong vector markup.' },
      { feature: 'Petty Cash Expenses & Monthly Salary Slips', taskPilot: true, competitor: false, note: 'SiteCommons unifies field expenses, leave requests, and staff payslips.' },
      { feature: 'Predictable Flat Team Pricing (No Per-Seat Tax)', taskPilot: true, competitor: false, note: 'Fieldwire charges $39–$89 for every single user invited.' },
      { feature: '8-Tier Pre-Configured Construction Hierarchy', taskPilot: true, competitor: false, note: 'SiteCommons features custom roles from Director down to Site Labour.' },
    ],
    competitorStrengths: [
      'Very polished blueprint drawing viewer with offline plan comparison tools',
      'Strong adoption among electrical and mechanical specialty subcontractors in the US and Europe',
      'Backed by the global tool manufacturing brand Hilti',
    ],
    competitorLimitations: [
      'Steep per-user pricing discourages companies from adding all site supervisors and foremen',
      'No native GPS geofencing or labor attendance verification',
      'No financial management, BOQ tracking, or earned value metrics',
      'No site petty cash, leave, or payroll salary slip generation',
    ],
    taskPilotStrengths: [
      'One flat monthly fee covers your entire site crew without counting seats',
      'Native GPS geofencing ensures workers are physically on site with zero battery drain',
      'Integrated commercial control: BOQ earned value management and daily progress reporting (DPR)',
      'Multi-currency billing in USD, INR (with GST), EUR, GBP, and AED',
    ],
    bestForCompetitor: [
      'Specialty trade contractors who only need drawing markup and simple punch lists on US jobsites',
    ],
    bestForTaskPilot: [
      'General contractors and builders who want full operational visibility from attendance to BOQ spend',
      'Firms that refuse to pay $50/month per seat just to let a site supervisor view tasks',
    ],
    verdict: 'Fieldwire is a good blueprint viewer, but its per-seat pricing model punishes construction companies for growing their field crews. SiteCommons delivers a complete office-and-field operating system with GPS attendance, DPRs, and BOQ cost control at a predictable flat team rate.',
    faqs: [
      { q: 'Can field workers view drawings offline in SiteCommons like in Fieldwire?', a: 'Yes. SiteCommons caches drawings and project documents locally on Android and iOS devices so engineers can inspect blueprints even in deep basements or remote work fronts.' },
      { q: 'Why does SiteCommons include attendance and payroll tools while Fieldwire does not?', a: 'We believe construction management should connect the physical jobsite directly to head office commercials. Tracking attendance, expenses, and DPRs in the same system eliminates double data entry.' },
    ],
  },
  'sitecommons-vs-asana': {
    slug: 'sitecommons-vs-asana',
    competitorName: 'Asana',
    tagline: 'Purpose-Built Construction OS vs Generic Desk Productivity',
    category: 'Work Management Software',
    heroSummary: 'Asana is a brilliant productivity tool for marketing teams, software startups, and corporate desks. But taking Asana onto an active construction site with safety boots and concrete dust reveals its fundamental limitations: no GPS geofenced attendance, no Daily Progress Reports (DPR), no pre-pour structural checklists, and no BOQ cost control.',
    competitorAudience: 'Tech companies, marketing agencies, creative teams, and corporate desk-based knowledge workers.',
    taskPilotAudience: 'Civil contractors, EPCs, real estate developers, and field crews who work boots on the ground.',
    pricingComparison: {
      competitorModel: 'Per-seat pricing ($10.99 to $24.99 per user per month billed annually).',
      competitorEstimatedCost: 'A team of 30 costs $330 to $750 per month, penalizing firms for adding field workers.',
      taskPilotModel: 'Flat predictable team tiers.',
      taskPilotEstimatedCost: '$19/mo (₹1,499) for 10 users, $49/mo (₹3,999) for 30 users, $99/mo (₹7,999) for 100 users.',
      pricingVerdict: 'SiteCommons is purpose-built for jobsites, includes field-specific features Asana will never build, and costs substantially less.',
    },
    matrix: [
      { feature: 'Location-Verified GPS Geofenced Attendance', taskPilot: true, competitor: false, note: 'Asana has no mobile GPS geofencing or site radius verification.' },
      { feature: 'Daily Site Diary / DPR (Weather, Trade Muster, Photos)', taskPilot: true, competitor: false, note: 'Asana has no structured construction daily reporting format.' },
      { feature: 'BOQ Import & Earned Value (EV / CPI) Cost Tracking', taskPilot: true, competitor: false, note: 'Asana cannot link physical tasks to Bill of Quantities financial line items.' },
      { feature: '3-Step Inspection Sign-Offs (In Progress → Review → Done)', taskPilot: true, competitor: 'Partial', note: 'Asana tasks close with 1 click; SiteCommons enforces manager digital approvals.' },
      { feature: 'Pre-Pour Concrete Hold Points & Snag Checklists', taskPilot: true, competitor: false, note: 'SiteCommons includes standardized construction quality checklists.' },
      { feature: 'Plant, Machinery & Heavy Equipment Allocation', taskPilot: true, competitor: false, note: 'SiteCommons registers cranes, excavators, and generators across sites.' },
      { feature: 'Site Channels with @Role Mentioning (@SiteEngineer)', taskPilot: true, competitor: false, note: 'SiteCommons features built-in construction team chat and broadcasts.' },
    ],
    competitorStrengths: [
      'Extremely polished UI and workflow automation builder for corporate desk environments',
      'Deep integrations with Slack, Google Drive, Jira, and GitHub for tech companies',
      'Flexible custom fields and board views for creative campaign management',
    ],
    competitorLimitations: [
      'Has zero awareness of construction field realities: weather, trades, concrete, BOQs, GPS',
      'Tasks can be marked "completed" by anyone without supervisory inspection or photo proof',
      'Per-seat pricing makes it cost-prohibitive to invite site foremen, laborers, or subcontractors',
      'Poor usability on mobile in high-glare sunlight or with dusty gloves',
    ],
    taskPilotStrengths: [
      'Pre-configured out of the box for construction: roles, DPRs, inspections, and BOQs',
      'Enforced 3-step verification gates prevent tasks from closing without engineer sign-offs',
      'Native GPS geofenced attendance eliminates ghost workers and buddy punching',
      'Flat team pricing allows you to give accounts to all site supervisors without extra fees',
    ],
    bestForCompetitor: [
      'Software engineering sprints, corporate marketing agencies, and remote knowledge workers',
    ],
    bestForTaskPilot: [
      'Any company that builds physical infrastructure, buildings, interiors, or installations',
      'Builders tired of forcing a generic to-do app onto site engineers who refuse to use it',
    ],
    verdict: 'Asana is built for laptops and office chairs. SiteCommons is built for hard hats and jobsite boots. If your business executes physical work on real properties, using a generic tool like Asana creates communication gaps that SiteCommons completely eliminates.',
    faqs: [
      { q: 'Can we use Asana for office tasks and SiteCommons for field sites?', a: 'Many contractors initially try this, but quickly consolidate onto SiteCommons because SiteCommons handles both executive planning (Gantt, milestones, documents, leave) and jobsite execution in one unified system.' },
    ],
  },
  'sitecommons-vs-monday': {
    slug: 'sitecommons-vs-monday',
    competitorName: 'Monday.com',
    tagline: 'Configured Construction OS vs Complex Spreadsheet Builder',
    category: 'Work Operating System',
    heroSummary: 'Monday.com is a highly customizable spreadsheet-based work platform. However, making Monday.com work for construction requires weeks of manual template design, expensive consultants, and steep per-seat fees, while still lacking native GPS geofencing, trade muster rolls, and BOQ earned value calculations.',
    competitorAudience: 'Operations teams, sales pipelines, HR departments, and marketing teams who want to build custom database tables.',
    taskPilotAudience: 'Builders, contractors, and project managers who want a working construction operating system ready on Day 1.',
    pricingComparison: {
      competitorModel: 'Per-seat pricing with strict minimum user blocks ($9 to $19 per user per month).',
      competitorEstimatedCost: 'A 25-person team costs $350 to $650 per month on Monday.com.',
      taskPilotModel: 'Flat team pricing with full module access.',
      taskPilotEstimatedCost: '$19 to $99 per month flat (₹1,499 to ₹7,999/mo) with zero per-user penalties.',
      pricingVerdict: 'SiteCommons eliminates the per-seat tax and delivers pre-built construction logic without weeks of setup consulting.',
    },
    matrix: [
      { feature: 'Ready to Run on Day 1 (Zero Custom Configuration)', taskPilot: true, competitor: false, note: 'Monday requires custom column and board building; SiteCommons is pre-configured.' },
      { feature: 'Location-Verified GPS Geofenced Attendance', taskPilot: true, competitor: false, note: 'Monday has no point-in-time perimeter check-in engine.' },
      { feature: 'Daily Site Diary / DPR with Trade Muster', taskPilot: true, competitor: 'Custom Form', note: 'SiteCommons includes native weather, trade headcounts, and PDF export.' },
      { feature: 'BOQ Earned Value Management (PV, EV, AC, CPI)', taskPilot: true, competitor: false, note: 'Monday cannot calculate construction earned value indexes natively.' },
      { feature: 'Mandatory Engineer Approval Gates', taskPilot: true, competitor: 'Complex Rule', note: 'SiteCommons enforces 3-step sign-offs natively.' },
      { feature: 'Heavy Plant & Machinery Asset Register', taskPilot: true, competitor: 'Custom Board', note: 'SiteCommons registers equipment, maintenance logs, and site allocations.' },
    ],
    competitorStrengths: [
      'Highly flexible visual table views with colorful status labels and automations',
      'Broad general-purpose capabilities across CRM, marketing, and internal operations',
      'Large ecosystem of integrations with office tools',
    ],
    competitorLimitations: [
      'Requires substantial setup time and ongoing maintenance to create workable boards',
      'No native construction features (GPS attendance, DPR format, BOQ earned value, pre-pour checklists)',
      'Steep per-seat pricing with rigid minimum user tiers',
      'Mobile interface feels like a condensed desktop spreadsheet, making it awkward for field supervisors',
    ],
    taskPilotStrengths: [
      'Zero configuration required: login, create a site, and start assigning tasks immediately',
      'Rugged field mobile app designed specifically for site supervisors and engineers',
      'Integrated commercial control: BOQ earned value, material indents, and attendance',
      'Flat pricing in INR, USD, EUR, GBP, and AED with compliant tax invoices',
    ],
    bestForCompetitor: [
      'Teams that want a generic flexible spreadsheet tool for office management and marketing campaigns',
    ],
    bestForTaskPilot: [
      'Construction contractors who need verified field execution without spending weeks building custom databases',
    ],
    verdict: 'Monday.com is a blank canvas that requires you to build your own construction tool from scratch. SiteCommons is a purpose-built operating system engineered by construction veterans, ready to coordinate your jobsites ten minutes after sign-up.',
    faqs: [
      { q: 'Why shouldn’t we just customize Monday.com for our construction company?', a: 'Customizing Monday requires dozens of custom columns, automations, and third-party integrations, and you will still lack GPS geofenced attendance, native daily DPRs, and BOQ earned value tracking.' },
    ],
  },
  'sitecommons-vs-clickup': {
    slug: 'sitecommons-vs-clickup',
    competitorName: 'ClickUp',
    tagline: 'High-Performance Field Simplicity vs Feature-Bloated Overkill',
    category: 'Productivity Platform',
    heroSummary: 'ClickUp promises "one app to replace them all," packing hundreds of features into a complex web interface. But on an active jobsite with bright sunlight and spotty 4G, ClickUp is slow, cluttered, and confusing for site crews, while lacking essential construction hold points and GPS attendance.',
    competitorAudience: 'Agile software teams, startup founders, and digital agencies managing complex digital backlogs.',
    taskPilotAudience: 'Construction project managers, site engineers, and foremen who need fast, uncluttered execution.',
    pricingComparison: {
      competitorModel: 'Per-user seat fees ($7 to $12 per user per month billed annually).',
      competitorEstimatedCost: 'A 30-person crew costs $210 to $360 per month on ClickUp.',
      taskPilotModel: 'Flat predictable team tiers.',
      taskPilotEstimatedCost: '$19/mo (₹1,499) to $49/mo (₹3,999) flat with all construction modules.',
      pricingVerdict: 'SiteCommons provides a clean, fast field experience with flat pricing and native construction tools.',
    },
    matrix: [
      { feature: 'High-Speed Mobile App for Low-Bandwidth 3G/4G Sites', taskPilot: true, competitor: false, note: 'ClickUp mobile is notoriously sluggish; SiteCommons is lightweight and fast.' },
      { feature: 'GPS Geofenced Attendance Engine', taskPilot: true, competitor: false, note: 'ClickUp has no geolocation perimeter verification.' },
      { feature: 'Daily Site Diary (DPR) with Weather & Photos', taskPilot: true, competitor: false, note: 'SiteCommons standardizes DPRs with client-ready PDF exports.' },
      { feature: 'Pre-Pour Structural Hold Points & Snag Lists', taskPilot: true, competitor: 'Basic Checklist', note: 'SiteCommons requires photographic evidence and engineer sign-offs.' },
      { feature: 'BOQ Earned Value Management (EVM)', taskPilot: true, competitor: false, note: 'ClickUp has no civil engineering BOQ or earned value engine.' },
      { feature: '8-Tier Pre-Configured Construction Hierarchy', taskPilot: true, competitor: false, note: 'SiteCommons includes Director down to Site Labour roles.' },
    ],
    competitorStrengths: [
      'Huge variety of digital views: Mind maps, whiteboards, Gantt, and docs in one tool',
      'Affordable per-seat entry tier for small tech teams',
      'Highly customizable nested folder and list hierarchy',
    ],
    competitorLimitations: [
      'Notoriously slow loading times and complex cluttered interface',
      'No native construction features: no GPS attendance, no DPRs, no BOQ, no trade muster',
      'Too complex for field supervisors and subcontractors to adopt reliably',
      'Lacks offline resilience when working in basements or remote work fronts',
    ],
    taskPilotStrengths: [
      'Fast, intuitive, and uncluttered interface that site supervisors learn in under 15 minutes',
      'Dedicated construction capabilities: GPS attendance, daily DPRs, BOQ cost tracking, and drawings',
      'Local offline cache ensures actions sync automatically once connectivity returns',
      'Flat team pricing with no per-user penalties',
    ],
    bestForCompetitor: [
      'Digital startups and software developers managing code sprints and creative design tasks',
    ],
    bestForTaskPilot: [
      'Contractors, builders, and field operations teams who need software that site crews will actually use',
    ],
    verdict: 'ClickUp tries to do everything for every industry, making it bloated and slow for construction sites. SiteCommons does exactly what builders need: fast task sign-offs, GPS attendance, daily progress reports, and BOQ cost control.',
    faqs: [
      { q: 'Will our site engineers actually use SiteCommons?', a: 'Yes. We designed SiteCommons directly with site personnel. Large tap targets, high contrast, fast camera capture, and offline support make it as easy to use as consumer apps.' },
    ],
  },
  'sitecommons-vs-powerplay': {
    slug: 'sitecommons-vs-powerplay',
    competitorName: 'Powerplay',
    tagline: 'Complete Office-and-Field Operating System vs Simple Mobile App',
    category: 'Construction Mobile Apps',
    heroSummary: 'Powerplay is an Indian mobile-first app designed for basic site updates and chat. However, growing contractors outgrow Powerplay because it lacks a comprehensive desktop management dashboard, Earned Value BOQ cost control, objective OPI performance scoring, formal salary slips, and multi-currency billing.',
    competitorAudience: 'Small sub-contractors and single-site builders looking for a basic WhatsApp alternative in India.',
    taskPilotAudience: 'Professional contractors, builders, and developer project teams who need executive-grade control across multiple sites.',
    pricingComparison: {
      competitorModel: 'Mobile quote-based subscription.',
      competitorEstimatedCost: 'Opaque pricing varying by sales representative.',
      taskPilotModel: '100% transparent flat team tiers in INR and international currencies.',
      taskPilotEstimatedCost: 'Starts at ₹1,499/mo ($19/mo) with full self-serve trial and instant activation.',
      pricingVerdict: 'SiteCommons offers public pricing, self-serve sign-up, and much deeper desktop and commercial depth.',
    },
    matrix: [
      { feature: 'Enterprise Desktop Web Management Console', taskPilot: true, competitor: 'Limited', note: 'SiteCommons provides a full-featured desktop command center for head office.' },
      { feature: 'Earned Value Management (EVM) & Real-Time CPI Tracking', taskPilot: true, competitor: false, note: 'SiteCommons tracks Planned Value vs Earned Value against tender BOQs.' },
      { feature: 'Objective Performance & OPI Engine (Merit Scoring)', taskPilot: true, competitor: false, note: 'SiteCommons measures on-time task delivery, streaks, and attendance reliability.' },
      { feature: 'Formal Monthly Salary Slips & Payroll Records', taskPilot: true, competitor: false, note: 'SiteCommons generates printable payslips with earnings and deductions.' },
      { feature: 'Multi-Currency Global Billing (USD, INR, AED, EUR, GBP)', taskPilot: true, competitor: 'INR Only', note: 'SiteCommons serves international contractors and overseas projects.' },
      { feature: '8-Tier Granular Construction Role Permission Model', taskPilot: true, competitor: 'Basic', note: 'SiteCommons protects commercial rates and profits from field view.' },
    ],
    competitorStrengths: [
      'Simple mobile app with Hindi and regional Indian language support',
      'Familiar chat-like interface for small local contractors in Tier 2/3 Indian cities',
    ],
    competitorLimitations: [
      'Weak desktop web dashboard for managing directors and commercial heads',
      'No earned value cost control or BOQ tracking',
      'No objective employee performance scoring (OPI) or merit metrics',
      'Lacks international billing and multi-currency options for overseas operations',
    ],
    taskPilotStrengths: [
      'Full office-and-field parity: powerful desktop web console + native mobile apps',
      'Complete financial and commercial depth: BOQ EVM, material indents, petty cash, and salary slips',
      'Objective employee performance indexing (OPI) based on real execution data',
      'Global multi-currency support with full Indian GST compliance',
    ],
    bestForCompetitor: [
      'Very small local subcontractors managing a single site who only need a mobile chat app',
    ],
    bestForTaskPilot: [
      'Growing contractors, builders, and developers who need real-time multi-site control from the office desk to the jobsite trench',
    ],
    verdict: 'Powerplay is an entry-level mobile app. SiteCommons is a complete, enterprise-grade construction operating system connecting your site supervisors on mobile to executive leadership on desktop.',
    faqs: [
      { q: 'Can SiteCommons handle GST invoicing in India?', a: 'Yes. SiteCommons provides GST-compliant tax invoices with CGST/SGST/IGST breakdowns for all Indian plans, as well as international tax invoicing in USD, EUR, GBP, and AED.' },
    ],
  },
};
