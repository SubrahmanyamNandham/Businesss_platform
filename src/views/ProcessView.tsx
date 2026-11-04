import React from 'react';
import { useAgency } from '../context/AgencyContext';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Users, Code, Terminal, Clock, Sparkles } from 'lucide-react';

export const ProcessView: React.FC = () => {
  const { setCurrentView } = useAgency();

  const stages = [
    {
      step: '01',
      title: 'Discovery & Requirement Analysis',
      duration: 'Week 1',
      summary: 'We conduct rigorous stakeholder interviews and audit your existing operational bottlenecks to define clear success metrics.',
      activities: [
        'Stakeholder alignment sessions with executives and end-users',
        'Data model and systems integration feasibility review',
        'Strict out-of-scope boundaries to protect budget and timeline'
      ],
      output: 'Formal Technical Specification & Milestone Proposal'
    },
    {
      step: '02',
      title: 'Strategy & Technical Architecture',
      duration: 'Week 1–2',
      summary: 'Before touching frontend code, our software architects map database schemas, API contracts, security RBAC, and cloud deployment targets.',
      activities: [
        'PostgreSQL schema modeling and connection topology',
        'Authentication protocols (JWT / Google SSO / SAML)',
        'Cloud infrastructure sizing and cost forecasting'
      ],
      output: 'System Architecture Blueprint & Entity Relationship Diagram'
    },
    {
      step: '03',
      title: 'UI/UX Design & Design Systems',
      duration: 'Weeks 2–3',
      summary: 'We construct high-fidelity interactive Figma prototypes with strict typography hierarchy, zero-pill metadata discipline, and WCAG AA accessibility.',
      activities: [
        'Information architecture and user journey wireframes',
        'Interactive Figma prototypes tested with target users',
        'Design token export into production Tailwind CSS variables'
      ],
      output: 'Validated Figma Design System & Prototype'
    },
    {
      step: '04',
      title: 'Agile Full-Stack Engineering',
      duration: 'Weeks 3–7',
      summary: 'Disciplined bi-weekly development sprints with working staging builds shared every Friday. You test real features throughout the build cycle.',
      activities: [
        'Clean modular TypeScript, React, and backend API engineering',
        'Live password-protected staging environment URL',
        'Bi-weekly video walkthrough demos and sprint reviews'
      ],
      output: 'Feature-Complete Production Release Candidate'
    },
    {
      step: '05',
      title: 'Testing, Security & Quality Assurance',
      duration: 'Weeks 7–8',
      summary: 'Comprehensive end-to-end testing, responsive cross-device validation, load testing under high concurrency, and security vulnerability scans.',
      activities: [
        'Automated unit, integration, and E2E regression testing',
        'Mobile, tablet, and desktop viewport stress testing',
        'OWASP security audit and SQL injection / XSS hardening'
      ],
      output: 'QA Verification & Penetration Audit Report'
    },
    {
      step: '06',
      title: 'Production Deployment & Data Migration',
      duration: 'Week 8–9',
      summary: 'Zero-downtime production cutover, DNS routing with SSL provisioning, automated database snapshots, and legacy CSV data migration.',
      activities: [
        'Historical database migration and schema verification',
        'Production DNS cutover and CDN edge caching configuration',
        'Staff video walkthrough guides and administrative training'
      ],
      output: 'Live Production System & 100% IP Code Handover'
    },
    {
      step: '07',
      title: 'Maintenance & Guaranteed SLA Support',
      duration: 'Post-Launch',
      summary: 'Every build includes 60 to 90 days of comprehensive bug-fix warranty at zero additional cost, backed by guaranteed response SLAs.',
      activities: [
        'Sub-4-hour emergency response SLA for critical defects',
        'Automated database snapshots and cloud uptime telemetry',
        'Optional monthly feature enhancement retainers'
      ],
      output: 'Ongoing Technical Retainer & Active Warranty'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 text-neutral-100">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
          The Engineering Methodology
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Our 7-Stage Project Lifecycle
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          We do not believe in black-box agency development. Every engagement follows a transparent engineering roadmap with measurable deliverables, weekly demos, and complete source code ownership.
        </p>
      </div>

      {/* Visual Timeline */}
      <div className="relative border-l border-neutral-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {stages.map((stage) => (
          <div key={stage.step} className="relative group">
            {/* Timeline marker node */}
            <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-neutral-950 border-2 border-neutral-700 group-hover:border-white transition-colors flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

            {/* Stage Content */}
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-4 hover:border-neutral-700 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-neutral-400 font-semibold">
                    STAGE {stage.step}
                  </span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    {stage.title}
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{stage.duration}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {stage.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono text-neutral-400 tracking-wider block">
                    Key Execution Activities
                  </span>
                  <ul className="space-y-1.5 text-neutral-300">
                    {stage.activities.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded space-y-1 self-start">
                  <span className="text-[10px] uppercase font-mono text-emerald-400 tracking-wider block font-semibold">
                    Verified Deliverable Output
                  </span>
                  <div className="font-medium text-white text-xs">
                    {stage.output}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Engineering Philosophy & Team Rigor */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 sm:p-12 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            About Our Team & Standards
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Engineering Culture & Guarantees
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            We are a lean, senior multidisciplinary team. When you engage Evolvex AI, you work directly with principal software architects and experienced designers — never junior subcontractors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">100% Client Code Ownership</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Upon final milestone completion, all source repositories, database migrations, Figma files, and intellectual property transfer 100% to your organization.
            </p>
          </div>

          <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <Users className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Senior Engineers Only</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every system is architected and coded by senior full-stack engineers with extensive experience across high-load applications and enterprise databases.
            </p>
          </div>

          <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
            <Terminal className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Zero-Slop Production Rigor</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We adhere strictly to clean architectural boundaries, comprehensive test suites, sub-second Core Web Vitals, and WCAG AA accessibility standards.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 bg-neutral-900 border border-neutral-800 rounded-xl text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Ready for a Disciplined Build Cycle?</h3>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
          Share your business goals with our engineering leads. We provide an initial technical scope and fixed-price quote within 48 hours.
        </p>
        <button
          onClick={() => setCurrentView('contact')}
          className="px-6 py-3 bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
        >
          Book a Discovery Session
        </button>
      </div>

    </div>
  );
};
