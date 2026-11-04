import { Project, ServiceItem, IndustryItem, ClientProposal, ClientInquiry } from '../types';
import schoolErpImage from '../assets/images/project_school_erp_1793783480375.jpg';
import restaurantPosImage from '../assets/images/project_restaurant_pos_1793783480470.jpg';
import fintechMvpImage from '../assets/images/project_fintech_mvp_1793783481189.jpg';
import heroStudioImage from '../assets/images/hero_digital_studio_1793783480039.jpg';

export const SCHOOL_ERP_IMAGE = schoolErpImage;
export const HERO_STUDIO_IMAGE = heroStudioImage;

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-01',
    slug: 'oakwood-academic-cloud',
    title: 'Oakwood Academic Cloud (EduTrack)',
    clientName: 'Oakwood Preparatory Academy',
    industry: 'Education & Schools',
    category: 'School & Education',
    summary: 'A unified campus management platform centralizing student admissions, daily attendance, gradebook grading, fee collections, and parent-teacher communication for 1,480+ enrolled students.',
    businessProblem: 'Oakwood Academy operated on three disconnected legacy software packages and paper logs. Attendance reporting took faculty 45 minutes each morning, fee reconciliation lagged by 3 weeks, and parents lacked real-time visibility into student performance.',
    solutionDelivered: 'Architected a modern responsive web portal with role-based access for school principals, teachers, finance directors, students, and parents. Features automated SMS/email attendance notifications, Stripe fee processing, and a visual analytics dashboard.',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Stripe Billing', 'SendGrid'],
    keyFeatures: [
      'Single-click daily classroom attendance with automated absence alerts',
      'Term gradebook engine with GPA calculation and PDF report card generation',
      'Digital fee invoicing and online tuition payment portal',
      'Encrypted parent-teacher messaging and scheduled consultation booking',
      'Executive campus telemetry tracking enrollment, retention, and staffing'
    ],
    outcomes: [
      { metric: '91% Reduction', context: 'in administrative report generation time (from 4 hours to 22 minutes weekly)' },
      { metric: '100% On-time', context: 'tuition fee reconciliation with zero manual ledger discrepancies' },
      { metric: '1,480 Students', context: 'actively managed across 62 faculty members with 99.98% platform uptime' }
    ],
    image: schoolErpImage,
    featured: true,
    year: '2026',
    duration: '10 Weeks'
  },
  {
    id: 'proj-02',
    slug: 'velvet-vine-hospitality-suite',
    title: 'Velvet & Vine Hospitality Suite',
    clientName: 'Velvet & Vine Dining Group',
    industry: 'Restaurants & Hospitality',
    category: 'Restaurant & Hospitality',
    summary: 'An integrated omnichannel dining platform combining contactless QR table ordering, real-time Kitchen Display System (KDS) synchronization, and reservation management across 4 metropolitan locations.',
    businessProblem: 'During peak Friday-Saturday service, table turn times averaged 82 minutes due to waitstaff order entry delays. Disconnected 3rd-party delivery tablets caused 8% kitchen order error rates and cost $14,000/month in commission fees.',
    solutionDelivered: 'Deployed a sub-second tableside digital ordering Progressive Web App paired with a unified web-based KDS tablet station. Synchronized with existing Toast POS hardware, eliminating third-party delivery aggregation lag.',
    techStack: ['React', 'TypeScript', 'WebSockets', 'Express', 'Redis', 'Tailwind CSS', 'Toast POS API'],
    keyFeatures: [
      'Mobile web contactless table ordering with split-bill Apple Pay/Google Pay checkout',
      'Real-time color-coded Kitchen Display System with prep-station routing',
      'Floor plan visual table reservation calendar with SMS booking reminders',
      'Dynamic modifier pricing & 86-item instant inventory blackout sync',
      'Multi-unit operational revenue and table turn analytics'
    ],
    outcomes: [
      { metric: '18 Min Faster', context: 'average table turn time during high-volume dinner services' },
      { metric: '0.4% Order Errors', context: 'reduced down from 8.2% across 4 restaurant locations' },
      { metric: '+$42,000 / Mo', context: 'in direct digital commission savings recaptured from aggregator apps' }
    ],
    image: restaurantPosImage,
    featured: true,
    year: '2026',
    duration: '6 Weeks'
  },
  {
    id: 'proj-03',
    slug: 'finflow-institutional-saas-mvp',
    title: 'Finflow Institutional Analytics MVP',
    clientName: 'FinFlow Technologies',
    industry: 'Startups & Venture MVPs',
    category: 'AI & Automation',
    summary: 'A high-frequency algorithmic portfolio analytics and workflow orchestration MVP built for an early-stage fintech team that secured $3.2M Seed funding.',
    businessProblem: 'The founders needed an enterprise-grade prototype to demonstrate real-time risk simulation and automated trade reconciliation to tier-1 institutional venture capital partners within a strict 8-week timeline.',
    solutionDelivered: 'Engineered an ultra-fast data dashboard featuring WebSocket-driven market data streaming, customizable financial widgets, automated CSV batch normalization, and investor-ready export tools.',
    techStack: ['React', 'TypeScript', 'FastAPI / Python', 'ClickHouse', 'Tailwind CSS', 'WebSockets', 'Chart.js'],
    keyFeatures: [
      'Sub-50ms latency streaming trade book and risk telemetry canvas',
      'Multi-currency value-at-risk (VaR) Monte Carlo scenario calculations',
      'Interactive cohort performance heatmaps with tabular number alignment',
      'Encrypted enterprise RBAC access with audit trail compliance logs'
    ],
    outcomes: [
      { metric: '$3.2M Seed', context: 'capital successfully raised following live investor demonstration' },
      { metric: '6 Weeks to Demo', context: 'shipped from kickoff to production staging 2 weeks ahead of target' },
      { metric: '<45ms Latency', context: 'real-time telemetry rendering across 500,000 tick events' }
    ],
    image: fintechMvpImage,
    featured: true,
    year: '2026',
    duration: '8 Weeks'
  },
  {
    id: 'proj-04',
    slug: 'nexus-supply-chain-automation',
    title: 'Nexus Freight Pipeline Orchestrator',
    clientName: 'Nexus Global Logistics',
    industry: 'Corporate & Enterprise',
    category: 'Business Applications',
    summary: 'An automated supply chain logistics orchestrator handling dispatch scheduling, customs compliance validation, and bill-of-lading digitization.',
    businessProblem: 'Logistics coordinators manually copied consignee data across four separate shipping systems, leading to customs border delays of 48-72 hours and costly demurrage fees.',
    solutionDelivered: 'Built an event-driven workflow engine with optical document parsing and carrier API connectors, reducing dispatch prep time from 40 minutes per container to under 90 seconds.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'AWS SQS', 'OCR Engine'],
    keyFeatures: [
      'Automated bill-of-lading data extraction and customs filing validation',
      'Interactive multi-carrier freight booking rate comparison',
      'Driver mobile portal for electronic proof of delivery with geofencing',
      'Proactive delayed shipment exception alerts and customer status links'
    ],
    outcomes: [
      { metric: '94% Faster', context: 'shipping document verification and customs pre-clearance turnaround' },
      { metric: '$180,000/yr', context: 'saved in demurrage penalties and overtime administrative overhead' },
      { metric: '14,000 Shipments', context: 'processed monthly without requiring additional operations headcount' }
    ],
    image: heroStudioImage,
    featured: false,
    year: '2025',
    duration: '12 Weeks'
  }
];

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'srv-01',
    slug: 'web-design-dev',
    number: '01',
    title: 'Website Design & Development',
    shortDesc: 'Award-grade, high-converting digital storefronts and marketing platforms engineered with sub-second page loads and bespoke editorial visual identities.',
    businessProblem: 'Generic corporate websites fail to convey technical authority, suffer from poor Core Web Vitals, and convert less than 1.2% of visitor traffic into qualified inquiries.',
    solution: 'We construct bespoke web architectures using React, Vite, and modern styling constitutions. Every page is structured as a persuasive business narrative with responsive precision.',
    deliverables: ['Custom UI/UX & Responsive Layouts', 'SEO & Core Web Vitals Optimization', 'Content Management Integration', 'Lead Conversion Forms & Tracking'],
    targetClients: ['B2B Enterprises', 'Venture Startups', 'Professional Services Firms', 'High-Growth Brands'],
    typicalTimeline: '3–6 Weeks',
    iconName: 'Layout'
  },
  {
    id: 'srv-02',
    slug: 'fullstack-apps',
    number: '02',
    title: 'Full-Stack Application Development',
    shortDesc: 'Scalable, secure web software engineered with robust database schemas, transactional reliability, and intuitive desktop/mobile interfaces.',
    businessProblem: 'Off-the-shelf software forces businesses to reshape their operations around rigid third-party workflows and escalating per-seat monthly subscriptions.',
    solution: 'We architect purpose-built SaaS and internal business portals using modern TypeScript stacks, relational databases, and enterprise role-based security.',
    deliverables: ['Full System Architecture & DB Design', 'REST / GraphQL & WebSocket APIs', 'RBAC & Audit Logging', 'Production Deployment & CI/CD'],
    targetClients: ['SaaS Founders', 'Mid-Market Businesses', 'Tech Scale-ups'],
    typicalTimeline: '6–12 Weeks',
    iconName: 'Layers'
  },
  {
    id: 'srv-03',
    slug: 'ai-automation',
    number: '03',
    title: 'AI & Intelligent Automation',
    shortDesc: 'Practical, high-ROI AI pipelines, LLM-grounded document processors, and automated workflow agents that eliminate repetitive business labor.',
    businessProblem: 'Knowledge workers waste 35% of their workday transcribing invoices, sorting customer inquiries, and cross-referencing internal company databases.',
    solution: 'We deploy secure AI pipelines that ingest unstructured business files, perform accurate entity extraction, and route clean structured data directly into core databases.',
    deliverables: ['Document Processing & OCR Pipelines', 'Internal Knowledge Retrieval (RAG)', 'Customer Routing & Auto-Drafting', 'Security & Privacy Compliance Audits'],
    targetClients: ['Logistics Operators', 'Legal & Accounting Practices', 'Healthcare Facilities', 'Customer Support Hubs'],
    typicalTimeline: '4–8 Weeks',
    iconName: 'Cpu'
  },
  {
    id: 'srv-04',
    slug: 'mobile-apps',
    number: '04',
    title: 'Mobile App Development',
    shortDesc: 'High-performance iOS, Android, and Progressive Web Applications designed for seamless thumb navigation, offline operation, and instant push updates.',
    businessProblem: 'Mobile web experiences that are slow or unresponsive lead to 70%+ bounce rates on mobile search and prevent direct customer engagement.',
    solution: 'We develop cross-platform mobile apps with native fluid gestures, camera and geolocation integration, and offline-first cache syncing.',
    deliverables: ['Cross-Platform Mobile App (iOS / Android / PWA)', 'Offline-First Sync Engine', 'Push Notification Service', 'App Store / Play Store Deployment'],
    targetClients: ['Direct-to-Consumer Brands', 'Field Operations Teams', 'Service Providers'],
    typicalTimeline: '6–10 Weeks',
    iconName: 'Smartphone'
  },
  {
    id: 'srv-05',
    slug: 'process-automation',
    number: '05',
    title: 'Business Process Automation',
    shortDesc: 'End-to-end integration of CRMs, ERPs, accounting tools, and communication channels into a seamless, automated operational pipeline.',
    businessProblem: 'Data silos between sales CRM, accounting software, and fulfillment spreadsheets introduce human errors and stall order fulfillment cycles.',
    solution: 'We build custom middleware webhooks, Zapier/Make orchestrations, and scheduled background daemons that sync data across tools in real time.',
    deliverables: ['Systems Integration Mapping', 'Custom API Connectors & Webhooks', 'Automated Invoicing & CRM Sync', 'Error Handling & Retry Monitoring'],
    targetClients: ['E-commerce Merchants', 'Wholesale Distributors', 'Agencies & Consultancies'],
    typicalTimeline: '2–5 Weeks',
    iconName: 'Workflow'
  },
  {
    id: 'srv-06',
    slug: 'school-management',
    number: '06',
    title: 'School Management Solutions',
    shortDesc: 'Comprehensive Student Information Systems (SIS), admissions portals, gradebooks, and tuition billing tailored to primary, secondary, and higher-ed campuses.',
    businessProblem: 'Educational institutions struggle with fragmented student databases, delayed fee payments, and manual report card compilation.',
    solution: 'We deliver intuitive campus portals that give administrators real-time governance over enrollments, timetable scheduling, tuition collections, and parent engagement.',
    deliverables: ['Student & Staff Roster Portals', 'Automated Attendance Tracking', 'Tuition Billing & Stripe Gateway', 'Gradebook & Digital Report Cards'],
    targetClients: ['Private K-12 Schools', 'Colleges & Academies', 'Tutoring Centers', 'Vocational Training Institutes'],
    typicalTimeline: '8–14 Weeks',
    iconName: 'GraduationCap'
  },
  {
    id: 'srv-07',
    slug: 'restaurant-solutions',
    number: '07',
    title: 'Restaurant Management & Digital Solutions',
    shortDesc: 'Custom contactless QR ordering, live Kitchen Display Systems, digital reservation floors, and inventory controls that cut aggregator commissions.',
    businessProblem: 'Restaurants lose 20-30% of margin to third-party delivery apps and suffer long table turn times during peak weekend seatings.',
    solution: 'We implement direct guest ordering portals, table reservation maps, and real-time kitchen screens that integrate seamlessly with your POS.',
    deliverables: ['Contactless Mobile Ordering PWA', 'Kitchen Display Station (KDS)', 'Table Reservation & SMS Booking', 'Inventory & Ingredient Depletion Tracking'],
    targetClients: ['Independent Fine Dining', 'Casual Restaurant Chains', 'Cafes & Bakeries', 'Hospitality Groups'],
    typicalTimeline: '4–8 Weeks',
    iconName: 'UtensilsCrossed'
  },
  {
    id: 'srv-08',
    slug: 'ecommerce-dev',
    number: '08',
    title: 'E-commerce Architecture & Stores',
    shortDesc: 'Headless storefronts, custom checkout flows, and high-conversion catalog experiences engineered for maximum average order value.',
    businessProblem: 'Standard theme templates load slowly, offer generic checkout flows, and cannot handle complex product bundles or custom business rules.',
    solution: 'We engineer blazing-fast headless commerce frontends connected to Shopify Plus, Medusa, or custom backends with sub-second checkout.',
    deliverables: ['Headless Storefront Frontend', 'Custom Product Configurators', 'Payment Gateway & Tax Engine Integration', 'Abandoned Cart & Analytics Tracking'],
    targetClients: ['DTC Retailers', 'B2B Wholesale Portals', 'Subscription Brands'],
    typicalTimeline: '4–8 Weeks',
    iconName: 'ShoppingBag'
  },
  {
    id: 'srv-09',
    slug: 'ui-ux-design-systems',
    number: '09',
    title: 'UI/UX & Design Systems',
    shortDesc: 'Enterprise component libraries, interaction design specifications, and user journeys created with pixel-level typography, spacing, and accessibility.',
    businessProblem: 'Inconsistent design across legacy interfaces confuses users, inflates frontend tech debt, and slows down sprint feature delivery.',
    solution: 'We craft comprehensive Figma design systems and production-ready React component codebases with dark/light themes and strict accessibility standards.',
    deliverables: ['Figma Design System & Token Architecture', 'High-Fidelity Interactive Prototypes', 'Production React Component Library', 'Accessibility (WCAG AA) Compliance'],
    targetClients: ['Product Teams', 'Enterprise Software Companies', 'Startups Rebranding'],
    typicalTimeline: '3–6 Weeks',
    iconName: 'Palette'
  },
  {
    id: 'srv-10',
    slug: 'startup-mvp',
    number: '10',
    title: 'MVP Development for Startups',
    shortDesc: 'Rapid 6 to 8-week 0-to-1 engineering sprints designed to launch investor-ready software products without technical debt.',
    businessProblem: 'Founders often get stuck spending 9 months and $100K+ with traditional agencies only to end up with bloated software that misses product-market fit.',
    solution: 'We run disciplined, lean build cycles focusing strictly on the core differentiation required to validate users and secure venture funding.',
    deliverables: ['Scoping & Technical Blueprint', 'Full Core Product Build (Web / Mobile)', 'Auth, Payments & Analytics Setup', 'Investor Demo & Launch Playbook'],
    targetClients: ['Pre-seed & Seed Founders', 'Corporate Venture Incubators', 'Domain Experts Building SaaS'],
    typicalTimeline: '6–8 Weeks',
    iconName: 'Rocket'
  },
  {
    id: 'srv-11',
    slug: 'custom-software',
    number: '11',
    title: 'Custom Enterprise Software',
    shortDesc: 'Tailored ERP extensions, client extranets, compliance auditing portals, and high-throughput data processing engines.',
    businessProblem: 'Complex enterprise operational workflows across departments cannot be solved with cookie-cutter SaaS tools.',
    solution: 'We build proprietary software assets owned entirely by your organization, with full IP transfer, zero recurring license fees, and enterprise SLA.',
    deliverables: ['Requirements Specification & Architecture', 'Custom Database & Backend Services', 'Enterprise Security & SSO Integration', 'Complete Source Code & IP Handover'],
    targetClients: ['Mid-Market Enterprises', 'Industrial Operators', 'Financial Institutions'],
    typicalTimeline: '8–16 Weeks',
    iconName: 'ShieldCheck'
  },
  {
    id: 'srv-12',
    slug: 'maintenance-support',
    number: '12',
    title: 'Maintenance, DevOps & Technical Support',
    shortDesc: 'Proactive 24/7 uptime monitoring, security patching, cloud infrastructure scaling, and monthly feature iteration retainers.',
    businessProblem: 'Software deployments left unmaintained degrade over time with security vulnerabilities, outdated libraries, and unmonitored server crashes.',
    solution: 'We provide dedicated engineering retainers covering cloud infrastructure optimization, guaranteed response SLAs, and regular feature updates.',
    deliverables: ['Guaranteed Response SLA (<2 hours)', 'Automated Cloud Backups & Vulnerability Scans', 'Monthly Dependency & Security Updates', 'Dedicated Developer Hours for Feature Enhancements'],
    targetClients: ['Existing Agency Clients', 'Growing Businesses', 'Mission-Critical Platforms'],
    typicalTimeline: 'Ongoing Retainer',
    iconName: 'Wrench'
  }
];

export const INDUSTRIES_SERVED: IndustryItem[] = [
  {
    id: 'ind-education',
    name: 'Education & Schools',
    tagline: 'Modernizing campus operations, enrollment funnels, and academic portals for modern learning institutions.',
    challenge: 'Institutions suffer from fragmented student information systems, manual paper grading, and lack of real-time parent communication.',
    agencySolution: 'We deliver integrated School Information Systems (SIS), student portals, automated attendance, fee collection gateways, and secure examination results reporting.',
    keyDifferentiators: ['FERPA/GDPR student privacy compliance', 'Multi-campus role permissions (Admin, Faculty, Student, Parent)', 'Automated SMS/Email broadcast notifications'],
    exampleProjects: ['Oakwood Academic Cloud (EduTrack)', 'Global Scholars Admissions Portal'],
    iconName: 'GraduationCap'
  },
  {
    id: 'ind-restaurants',
    name: 'Restaurants & Hospitality',
    tagline: 'Recapturing digital margins with direct guest ordering, kitchen display workflows, and seamless table bookings.',
    challenge: 'High third-party delivery commission fees (20-30%) and inefficient front-of-house order communication cause table turn bottlenecks.',
    agencySolution: 'We build custom branded contactless ordering PWAs, real-time Kitchen Display Systems, floor-map reservation managers, and POS connectors.',
    keyDifferentiators: ['Sub-second order dispatch to kitchen stations', 'Direct zero-commission customer payments', 'Offline resilient order buffering'],
    exampleProjects: ['Velvet & Vine Hospitality Suite', 'Metro Roasters Cafe Quick-Order App'],
    iconName: 'UtensilsCrossed'
  },
  {
    id: 'ind-startups',
    name: 'Startups & Venture MVPs',
    tagline: 'Accelerating early-stage founders from concept to working product and investor validation in 6-8 weeks.',
    challenge: 'Founders have limited runway and cannot afford multi-month delays or bloated technical architectures that fail to demonstrate traction.',
    agencySolution: 'We run fixed-timeline, fixed-budget engineering sprints building production-ready MVPs with robust authentication, billing, and analytics.',
    keyDifferentiators: ['Lean scope prioritization focusing on core value', 'Clean scalable codebases ready for Series A due diligence', 'Full intellectual property and repository handover'],
    exampleProjects: ['Finflow Institutional Analytics MVP', 'Lumina Health Habit Tracker'],
    iconName: 'Rocket'
  },
  {
    id: 'ind-healthcare',
    name: 'Healthcare & Life Sciences',
    tagline: 'Secure, accessible patient intake, telemedicine scheduling, and clinical workflow platforms.',
    challenge: 'Strict regulatory privacy compliance and complex clinician workflows make digital modernization daunting.',
    agencySolution: 'We design patient-friendly web portals with encrypted audit logging, appointment scheduling, and automated lab results distribution.',
    keyDifferentiators: ['HIPAA & data encryption standards', 'Intuitive non-technical patient UX', 'Secure EHR/EMR API integrations'],
    exampleProjects: ['CarePulse Clinical Intake Suite', 'Apex Diagnostics Patient Portal'],
    iconName: 'HeartPulse'
  },
  {
    id: 'ind-retail',
    name: 'Retail & E-commerce',
    tagline: 'High-speed headless commerce architectures that maximize conversions and average order value.',
    challenge: 'Sluggish template-based storefronts suffer from high cart abandonment and inability to support custom pricing or bundles.',
    agencySolution: 'We build headless storefronts with instant page transitions, bespoke 3D configurators, and streamlined single-page checkouts.',
    keyDifferentiators: ['Sub-second page load times', 'Custom inventory & warehouse ERP sync', 'Omnichannel customer loyalty engines'],
    exampleProjects: ['Meridian Luxury Commerce', 'Artisan Coffee Roasters Headless Shop'],
    iconName: 'ShoppingBag'
  },
  {
    id: 'ind-smb',
    name: 'Small & Medium Businesses',
    tagline: 'Digitizing manual spreadsheets, customer quotes, and scheduling for local service leaders.',
    challenge: 'Business owners spend hours on manual invoicing, scheduling, and tracking customer inquiries across phone and text messages.',
    agencySolution: 'We deploy streamlined customer portals, automated quote generators, and automated dispatch workflows that save 15+ hours weekly.',
    keyDifferentiators: ['Cost-effective fixed pricing with immediate ROI', 'Intuitive tools designed for non-technical staff', 'WhatsApp and SMS automated notifications'],
    exampleProjects: ['Summit HVAC Dispatch & Billing', 'Apex Dental Online Scheduling'],
    iconName: 'Briefcase'
  },
  {
    id: 'ind-corporate',
    name: 'Corporate & Enterprise',
    tagline: 'Enterprise-grade custom workflow software, employee extranets, and legacy database modernizations.',
    challenge: 'Decades-old legacy systems slow down cross-departmental operations and pose ongoing security and maintenance risks.',
    agencySolution: 'We modernize legacy business applications into responsive cloud-native platforms with strict enterprise SSO and compliance.',
    keyDifferentiators: ['Enterprise Single Sign-On (SAML/OAuth)', 'Rigorous automated testing and CI/CD pipelines', 'Dedicated SLA and disaster recovery architecture'],
    exampleProjects: ['Nexus Logistics Pipeline Orchestrator', 'Vanguard Enterprise Extranet'],
    iconName: 'Building2'
  },
  {
    id: 'ind-professional',
    name: 'Professional Services',
    tagline: 'Elevating legal, accounting, and advisory firms with digital client onboarding and secure document vaults.',
    challenge: 'Firms handle confidential client documents through insecure email attachments and face protracted onboarding intake delays.',
    agencySolution: 'We build encrypted client portals with digital document signing, automated intake questionnaires, and milestone billings.',
    keyDifferentiators: ['Zero-knowledge client document encryption', 'Integrated e-signatures and invoice payments', 'Bespoke high-end editorial brand presentation'],
    exampleProjects: ['Vanguard Legal Vault & Client Portal', 'Sterling Advisory Proposal Engine'],
    iconName: 'Award'
  }
];

export const INITIAL_PROPOSALS: ClientProposal[] = [
  {
    id: 'prop-01',
    proposalNumber: 'PROP-2026-081',
    clientName: 'Dr. Eleanor Vance',
    clientCompany: 'Oakwood Preparatory Academy',
    clientEmail: 'e.vance@oakwood-academy.edu',
    clientPhone: '+1 (555) 492-1104',
    projectTitle: 'Integrated Campus ERP & Student Information Portal',
    industry: 'Education & Schools',
    status: 'Approved',
    createdAt: '2026-10-15',
    validUntil: '2026-11-30',
    budgetTotal: 18500,
    currency: 'USD',
    executiveSummary: 'Vanguard Systems has been engaged by Oakwood Preparatory Academy to design, engineer, and deploy a bespoke, modern Campus Information System. This platform consolidates student admissions, attendance logging, term gradebooks, tuition payments, and parent notifications into a single secure web portal.',
    businessRequirements: [
      'Eliminate 3 disconnected legacy software platforms into one unified database',
      'Provide instant mobile attendance logging for 62 classroom teachers',
      'Deploy automated tuition invoicing with credit card & ACH payment processing',
      'Establish a secure parent communication portal with multi-language support'
    ],
    existingChallenges: [
      'Morning attendance recording currently requires paper sheets and 45 minutes of manual office entry',
      'Tuition payments suffer from a 3-week reconciliation lag with paper checks and wire slips',
      'Parents report frustration with delayed grade reporting and missed circulars'
    ],
    proposedArchitecture: 'A modern cloud-native web application built with React, TypeScript, and a scalable relational PostgreSQL database on hardened cloud infrastructure. Features AES-256 data encryption at rest, role-based access control, Stripe Connect payment gateway, and transactional email/SMS delivery via Twilio and SendGrid.',
    projectScope: [
      {
        phase: 'Phase 1: Discovery, Wireframing & Database Architecture',
        duration: 'Weeks 1–2',
        items: [
          'Stakeholder interviews with Principal, Academic Dean, and Finance Director',
          'Database schema mapping for 1,500 students, faculty rosters, and billing classes',
          'High-fidelity interactive UI/UX wireframes for Admin, Teacher, and Parent views',
          'Security & student data privacy compliance blueprint'
        ]
      },
      {
        phase: 'Phase 2: Core Engineering & Role-Based Access Engine',
        duration: 'Weeks 3–6',
        items: [
          'Authentication & authorization engine with Google Workspace & email SSO',
          'Classroom daily attendance module with automated absent SMS triggers',
          'Academic gradebook with custom GPA weighting and PDF report generation',
          'Tuition billing engine with Stripe checkout and automated receipting'
        ]
      },
      {
        phase: 'Phase 3: Parent Portal, Testing & Data Migration',
        duration: 'Weeks 7–8',
        items: [
          'Parent-teacher messaging module and conference scheduler',
          'Migration of 5 years of historical student records from legacy spreadsheets',
          'Automated end-to-end testing and load testing for 500 concurrent users',
          'Accessibility and responsive tablet/mobile optimization'
        ]
      },
      {
        phase: 'Phase 4: Staff Training, Deployment & Campus Launch',
        duration: 'Weeks 9–10',
        items: [
          'Faculty video walkthroughs and interactive staff training session',
          'Production domain cutover and DNS provisioning with SSL certification',
          'Go-live supervision during first full school week',
          'System handover documentation and administrator credentials delivery'
        ]
      }
    ],
    deliverables: [
      'Complete production-ready web application hosted on custom school domain',
      'Full TypeScript / React source code repository with CI/CD deployment pipeline',
      'Administrative documentation manual and faculty quick-start training guides',
      'Stripe billing integration with automated reconciliation exports',
      '90-day comprehensive post-launch warranty and bug-fix coverage'
    ],
    techStack: {
      frontend: ['React 19', 'TypeScript', 'Tailwind CSS', 'Lucide React Icons'],
      backend: ['Node.js', 'Express', 'JWT Authentication', 'Zod Validation'],
      database: ['PostgreSQL', 'Connection Pooling', 'Automated Daily Snapshots'],
      infrastructure: ['Hardened Cloud Container', 'Cloudflare SSL/CDN', 'Stripe Payments', 'SendGrid / Twilio']
    },
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Project Kickoff & Technical Architecture Blueprint',
        percentage: 30,
        amount: 5550,
        duration: 'Weeks 1–2',
        deliverables: ['Approved UI wireframes', 'Final database schema', 'Project schedule sign-off']
      },
      {
        id: 'm2',
        title: 'Milestone 2: Core SIS & Attendance Beta Deployment',
        percentage: 40,
        amount: 7400,
        duration: 'Weeks 3–6',
        deliverables: ['Working teacher attendance module', 'Gradebook calculations engine', 'Staging environment demo']
      },
      {
        id: 'm3',
        title: 'Milestone 3: Billing, Parent Portal & Final Handover',
        percentage: 30,
        amount: 5550,
        duration: 'Weeks 7–10',
        deliverables: ['Production deployment', 'Staff training completion', 'Final code & IP handover']
      }
    ],
    assumptions: [
      'School administration will provide historical student data in CSV/Excel format within Week 2',
      'School will maintain its own Stripe business account for tuition fee disbursements',
      'One designated school project lead will provide milestone reviews within 3 business days'
    ],
    outOfScope: [
      'On-premise hardware server installation (cloud deployment is provided)',
      'Custom hardware card readers for physical gate turnstiles (can be added as Phase 2 add-on)',
      'Development of native iOS/Android App Store binaries (mobile PWA web app is included)'
    ],
    supportSla: {
      warrantyPeriod: '90 Days Post-Deployment Warranty at Zero Additional Cost',
      slaResponseHours: 4,
      maintenanceDetails: 'Optional post-warranty maintenance retainer available at $450/month covering weekly database backups, security patches, and 4 hours of monthly feature enhancements.'
    },
    terms: [
      'Payment terms are strictly 14 calendar days upon milestone completion and deliverable approval.',
      'All bespoke code, database scripts, and intellectual property transfer 100% to Oakwood Preparatory Academy upon receipt of final milestone payment.',
      'Either party may terminate with 14 days written notice, with payment due only for verified work delivered to date.'
    ],
    approval: {
      approved: true,
      approvedBy: 'Dr. Eleanor Vance, Head of School',
      approvedAt: '2026-10-18T14:32:00Z',
      clientSignature: 'Eleanor Vance',
      notes: 'Approved by School Board of Trustees unanimously. Looking forward to kickoff.'
    }
  },
  {
    id: 'prop-02',
    proposalNumber: 'PROP-2026-094',
    clientName: 'Marcus Sterling',
    clientCompany: 'Velvet & Vine Dining Group',
    clientEmail: 'marcus@velvetvine.com',
    clientPhone: '+1 (555) 782-9901',
    projectTitle: 'Omnichannel Digital Ordering & Kitchen Display Suite',
    industry: 'Restaurants & Hospitality',
    status: 'Sent',
    createdAt: '2026-10-28',
    validUntil: '2026-11-20',
    budgetTotal: 13500,
    currency: 'USD',
    executiveSummary: 'Proposal to architect and roll out a custom contactless QR dining and Kitchen Display System across Velvet & Vine’s flagship downtown restaurant and upcoming uptown lounge. The platform eliminates third-party delivery aggregation fees and speeds up table turnover.',
    businessRequirements: [
      'Sub-second contactless table ordering via mobile web without requiring app downloads',
      'Unified tablet-based Kitchen Display System (KDS) replacing paper order tickets',
      'Direct Apple Pay & credit card checkout with automatic tip calculations',
      'Integration with existing point-of-sale inventory depletion'
    ],
    existingChallenges: [
      'Peak weekend order entry delays cause long kitchen ticket backlogs and customer wait times',
      'High 3rd-party delivery commission fees cannibalize restaurant margins',
      'Frequent kitchen miscommunications regarding item modifications and allergies'
    ],
    proposedArchitecture: 'High-speed WebSocket-connected frontend paired with a real-time message broker backend. Orders placed on guest phones instantly ping the appropriate bar or kitchen station tablet in under 200 milliseconds.',
    projectScope: [
      {
        phase: 'Phase 1: Architecture, Menu Modeling & UI Prototyping',
        duration: 'Weeks 1–2',
        items: [
          'Digitization and modifier configuration for 85 menu items',
          'Fast tableside ordering UX with high-contrast food photography display',
          'Station routing logic (Bar, Cold Prep, Hot Line, Dessert)'
        ]
      },
      {
        phase: 'Phase 2: WebSocket KDS & Payment Engine',
        duration: 'Weeks 3–4',
        items: [
          'Kitchen Display System screen with countdown timers and order status alerts',
          'Split-bill mobile checkout with Apple Pay / Google Pay',
          '86-list instant ingredient blackout control for floor managers'
        ]
      },
      {
        phase: 'Phase 3: Hardware Bench Testing & Go-Live',
        duration: 'Weeks 5–6',
        items: [
          'On-site staging and kitchen tablet mounting configuration',
          'Staff training during lunch dry-run service',
          'Launch weekend live monitoring'
        ]
      }
    ],
    deliverables: [
      'Contactless Mobile Ordering Web App with custom branded domain',
      'Kitchen Display System (KDS) application for Android/iPad tablets',
      'Management analytics dashboard for average ticket size and prep times',
      'Staff operating guide and 60 days warranty support'
    ],
    techStack: {
      frontend: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Node.js', 'WebSockets', 'Redis Pub/Sub'],
      database: ['PostgreSQL', 'Redis Cache'],
      infrastructure: ['Low-latency Cloud Edge', 'Stripe Terminal / Web Payments']
    },
    milestones: [
      {
        id: 'm1',
        title: 'Deposit & UX Wireframing',
        percentage: 40,
        amount: 5400,
        duration: 'Weeks 1–2',
        deliverables: ['Complete menu database', 'Validated ordering prototype']
      },
      {
        id: 'm2',
        title: 'KDS & Payment Staging',
        percentage: 40,
        amount: 5400,
        duration: 'Weeks 3–4',
        deliverables: ['Real-time WebSocket order dispatch demonstration']
      },
      {
        id: 'm3',
        title: 'Launch & Final Handover',
        percentage: 20,
        amount: 2700,
        duration: 'Weeks 5–6',
        deliverables: ['Successful live weekend dinner service', 'Handover documentation']
      }
    ],
    assumptions: [
      'Client will provide iPad or Android tablets for kitchen stations with stable Wi-Fi',
      'High-resolution food imagery provided by client by Week 2'
    ],
    outOfScope: [
      'Physical tablet hardware procurement (recommended models provided)',
      'Third-party courier dispatch integration (Phase 2 extension)'
    ],
    supportSla: {
      warrantyPeriod: '60 Days Priority Warranty',
      slaResponseHours: 2,
      maintenanceDetails: 'Weekend on-call emergency support available.'
    },
    terms: [
      'Standard 14-day payment terms.',
      'Full source code ownership transfers upon completion.'
    ],
    approval: {
      approved: false
    }
  },
  {
    id: 'prop-03',
    proposalNumber: 'PROP-2026-102',
    clientName: 'Siddharth Nair',
    clientCompany: 'FinFlow Technologies Inc.',
    clientEmail: 'sid@finflow-tech.io',
    clientPhone: '+1 (555) 901-4432',
    projectTitle: 'Institutional Portfolio Risk & Execution SaaS MVP',
    industry: 'Startups & Venture MVPs',
    status: 'Under Review',
    createdAt: '2026-11-01',
    validUntil: '2026-11-25',
    budgetTotal: 26000,
    currency: 'USD',
    executiveSummary: 'End-to-end technical sprint to design, build, and deliver an investor-ready algorithmic portfolio analytics platform within 8 weeks, positioned for FinFlow’s $3M Seed fundraising roadshow.',
    businessRequirements: [
      'Sub-50ms streaming order book & risk calculations',
      'Scenario-based Monte Carlo Value-at-Risk modeling',
      'Role-based permissioning for asset managers and compliance officers',
      'Investor-ready demo mode with pre-seeded hedge fund portfolio scenarios'
    ],
    existingChallenges: [
      'Current Python prototype lacks an intuitive frontend and crashes under concurrent users',
      'Venture capital partners expect institutional UI polish before committing term sheets'
    ],
    proposedArchitecture: 'High-throughput React frontend utilizing WebGL/Canvas rendering where needed, paired with high-performance backend pipelines and ClickHouse time-series data storage.',
    projectScope: [
      {
        phase: 'Sprint 1: Architecture & High-Density UI Blueprint',
        duration: 'Weeks 1–2',
        items: [
          'Design of Bloomberg/Linear inspired financial dashboard',
          'Tabular numeric formatting and high-density risk grids',
          'API contract definition with financial data feeds'
        ]
      },
      {
        phase: 'Sprint 2: Streaming Telemetry & Monte Carlo Engine',
        duration: 'Weeks 3–5',
        items: [
          'Real-time WebSocket telemetry rendering',
          'Interactive scenario sliders and risk distribution charts',
          'CSV portfolio upload and validation engine'
        ]
      },
      {
        phase: 'Sprint 3: Enterprise Auth, Demo Mode & Pitch Prep',
        duration: 'Weeks 6–8',
        items: [
          'Multi-tenant workspace architecture with audit logs',
          '1-click Investor Demo Sandbox with sample portfolio data',
          'Final performance profiling and cloud deployment'
        ]
      }
    ],
    deliverables: [
      'Production SaaS application hosted on dedicated AWS infrastructure',
      'Clean modular TypeScript/React codebase with test suite',
      'Investor pitch demo script and recording',
      '90-day technical warranty'
    ],
    techStack: {
      frontend: ['React 19', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Lucide React'],
      backend: ['Node.js / Python FastAPI', 'WebSockets', 'ClickHouse'],
      database: ['PostgreSQL', 'Redis'],
      infrastructure: ['AWS ECS / Docker', 'Cloudflare DDoS Protection']
    },
    milestones: [
      {
        id: 'm1',
        title: 'Sprint 1: Architecture & UI Prototype Signoff',
        percentage: 35,
        amount: 9100,
        duration: 'Weeks 1–2',
        deliverables: ['Complete UI design system', 'Interactive prototype']
      },
      {
        id: 'm2',
        title: 'Sprint 2: Real-time Telemetry & Risk Engine Alpha',
        percentage: 40,
        amount: 10400,
        duration: 'Weeks 3–5',
        deliverables: ['Streaming data dashboard', 'Working Monte Carlo simulation']
      },
      {
        id: 'm3',
        title: 'Sprint 3: Demo Mode, Hardening & Seed Launch',
        percentage: 25,
        amount: 6500,
        duration: 'Weeks 6–8',
        deliverables: ['Production deployment', 'Investor demo rehearsal']
      }
    ],
    assumptions: [
      'Client will provide sample financial data schemas by end of Week 1',
      'Client will designate tech lead for twice-weekly sprint standups'
    ],
    outOfScope: [
      'Direct SEC regulatory broker-dealer registration filings',
      'Live execution broker trading connections (simulated execution included)'
    ],
    supportSla: {
      warrantyPeriod: '90 Days Post-Launch Support',
      slaResponseHours: 1,
      maintenanceDetails: 'Emergency standup access during investor pitch weeks.'
    },
    terms: [
      '14-day milestone payment terms.',
      'Full IP assignment upon payment.'
    ],
    approval: {
      approved: false
    }
  }
];

export const INITIAL_INQUIRIES: ClientInquiry[] = [
  {
    id: 'inq-01',
    fullName: 'David Sterling',
    company: 'Westlake Grammar School',
    email: 'dsterling@westlake.edu',
    phone: '+1 (555) 302-8819',
    industry: 'Education & Schools',
    projectType: 'School Management Solutions',
    description: 'We are looking to replace our 12-year-old on-premise SIS with a modern cloud portal for 950 students. We need attendance, report cards, parent portal, and automated SMS announcements.',
    budgetRange: '$15,000 – $25,000',
    expectedTimeline: '2–3 Months',
    createdAt: '2026-11-02T10:15:00Z',
    status: 'In Discovery',
    notes: 'Discovery call held on Nov 3. Discussed custom GPA calculation formulas. Proposal draft in progress.'
  },
  {
    id: 'inq-02',
    fullName: 'Elena Rostova',
    company: 'Artisan Bistro Collective',
    email: 'elena@artisanbistro.com',
    phone: '+1 (555) 714-2290',
    industry: 'Restaurants & Hospitality',
    projectType: 'Restaurant Management & Digital Solutions',
    description: 'Operating 3 busy bistro locations in Chicago. We need a tableside QR ordering setup that syncs with our kitchen printers and allows guests to split bills without waiting for waitstaff.',
    budgetRange: '$10,000 – $15,000',
    expectedTimeline: '4–6 Weeks',
    createdAt: '2026-11-03T14:40:00Z',
    status: 'New',
    notes: 'High priority lead. Reached out via website inquiry.'
  },
  {
    id: 'inq-03',
    fullName: 'Kavita Patel',
    company: 'Novus MedTech',
    email: 'k.patel@novusmed.io',
    phone: '+1 (555) 890-3412',
    industry: 'Healthcare & Life Sciences',
    projectType: 'Full-Stack Application Development',
    description: 'Need a HIPAA-compliant web intake portal where patients can complete clinical questionnaires, upload ID/insurance documents, and schedule telehealth appointments.',
    budgetRange: '$25,000 – $40,000',
    expectedTimeline: '2–3 Months',
    createdAt: '2026-11-03T18:22:00Z',
    status: 'New',
    notes: 'Requested security compliance questionnaire.'
  },
  {
    id: 'inq-04',
    fullName: 'Liam Thorne',
    company: 'Verve Logistics Group',
    email: 'lthorne@vervelogistics.com',
    phone: '+1 (555) 431-7729',
    industry: 'Corporate & Enterprise',
    projectType: 'Business Process Automation',
    description: 'We process 400 bills-of-lading daily by hand. We want an automated OCR and data pipeline to extract consignee details, validate customs codes, and push to our SAP ERP.',
    budgetRange: '$20,000 – $35,000',
    expectedTimeline: '1–2 Months',
    createdAt: '2026-11-01T09:05:00Z',
    status: 'Proposal Sent',
    notes: 'Proposal PROP-2026-079 sent on Nov 2. Client reviewing with operations VP.'
  }
];
