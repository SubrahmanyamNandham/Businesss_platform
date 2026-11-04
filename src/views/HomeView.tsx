import React from 'react';
import { motion } from 'motion/react';
import { useAgency } from '../context/AgencyContext';
import { ArrowUpRight, CheckCircle2, ChevronRight, Layers, Cpu, GraduationCap, UtensilsCrossed, FileCheck2 } from 'lucide-react';
import { HERO_STUDIO_IMAGE } from '../data/initialData';

export const HomeView: React.FC = () => {
  const { setCurrentView, projects, setSelectedProject, startProjectWithContext, setSelectedProposalId } = useAgency();

  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <div className="w-full text-neutral-100 space-y-24 sm:space-y-32 py-8 sm:py-12">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch"
        >
          
          {/* Left Column: Typographic Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono tracking-wider uppercase">
                <span>Enterprise Product Studio</span>
                <span aria-hidden="true">·</span>
                <span>Full-Stack & Systems Engineering</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] text-balance">
                We Build Digital Experiences That Move Businesses Forward.
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
                From ambitious startups to established campuses and multi-unit hospitality brands — we architect high-performance web applications, intelligent automation, and custom software systems with zero technical debt.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setCurrentView('contact')}
                className="flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-sm uppercase tracking-wider rounded transition-all active:scale-95 cursor-pointer shadow-lg"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentView('work')}
                className="flex items-center gap-2 px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-neutral-700 font-medium text-sm rounded transition-colors cursor-pointer"
              >
                <span>Explore Our Work</span>
              </button>

              <button
                onClick={() => {
                  setSelectedProposalId('prop-01');
                  setCurrentView('proposals');
                }}
                className="flex items-center gap-1.5 px-4 py-3.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>View Sample Client Proposal</span>
              </button>
            </motion.div>

            {/* Trust Signal Line */}
            <motion.div variants={itemVariants} className="pt-4 border-t border-neutral-900 flex flex-wrap items-center gap-6 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Fixed Timelines & Deliverables
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                100% Client Code & IP Ownership
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Dedicated Senior Engineers Only
              </span>
            </motion.div>
          </div>

          {/* Right Column: Studio Focal Image */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex items-stretch"
          >
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full min-h-[340px] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
              <img
                src={HERO_STUDIO_IMAGE}
                alt="Vanguard Digital Agency Studio Workspace"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-xs text-neutral-300 font-mono">
                  <span className="text-white font-medium">Vanguard Collaborative Hub</span>
                  <span className="mx-2">·</span>
                  <span>Creative Direction & Systems Architecture</span>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Full-width KPI strip below hero split */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-14 pt-8 border-t border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums tracking-tight">
              99.98%
            </div>
            <div className="text-xs text-neutral-400">
              Production platform uptime SLA
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums tracking-tight">
              6–8 Wks
            </div>
            <div className="text-xs text-neutral-400">
              Average 0-to-1 MVP launch sprint
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums tracking-tight">
              100%
            </div>
            <div className="text-xs text-neutral-400">
              Complete source code & IP handover
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums tracking-tight">
              &lt; 6 Hours
            </div>
            <div className="text-xs text-neutral-400">
              Guaranteed initial inquiry response
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. FEATURED CASE STUDIES / PORTFOLIO SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Selected Deployments
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Proven Business Impact
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('work')}
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer group"
          >
            <span>View All Projects in Archive</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Featured Project Cards with subtle entrance & hover motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
              whileHover={{ y: -3 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-colors flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <span>{project.industry}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.duration}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-neutral-200 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Primary Metric Strip */}
                <div className="pt-4 border-t border-neutral-800/80">
                  <div className="text-xl font-bold text-white font-mono tabular-nums">
                    {project.outcomes[0]?.metric}
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    {project.outcomes[0]?.context}
                  </div>
                </div>

                {/* Card Action */}
                <div className="flex items-center justify-between text-xs font-medium text-neutral-300 pt-1">
                  <span>Read Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 3. CORE CAPABILITIES / SERVICES MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Technical Capabilities
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Engineered for Real Business Growth
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('services')}
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Explore All 12 Services</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 4 Flagship Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-neutral-900/50 border border-neutral-800 rounded-xl space-y-4 hover:border-neutral-700 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-2 text-white font-semibold">
                <Layers className="w-4 h-4 text-neutral-400" />
                01. High-Performance Web Engineering
              </span>
              <span>3–6 Wks</span>
            </div>
            <h3 className="text-xl font-bold text-white">Bespoke Web Platforms & Applications</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              We design and construct lightning-fast web systems built with React, TypeScript, and robust database architectures. No bloated templates, just tailored, high-converting digital interfaces.
            </p>
            <ul className="space-y-1.5 text-xs text-neutral-400 pt-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full" />
                Full-stack React & TypeScript frontends
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full" />
                Database schemas & REST/GraphQL API design
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full" />
                Core Web Vitals sub-second page performance
              </li>
            </ul>
            <button
              onClick={() => startProjectWithContext('Full-Stack Application Development')}
              className="pt-2 text-xs font-semibold text-white flex items-center gap-1 hover:text-neutral-300 cursor-pointer"
            >
              <span>Request Web Engineering Proposal</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-8 bg-neutral-900/50 border border-neutral-800 rounded-xl space-y-4 hover:border-neutral-700 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-2 text-white font-semibold">
                <GraduationCap className="w-4 h-4 text-neutral-400" />
                02. School & Educational Campuses
              </span>
              <span>8–12 Wks</span>
            </div>
            <h3 className="text-xl font-bold text-white">Campus Information & ERP Solutions</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Consolidated portals that eliminate paper records and disjointed software. We connect student admissions, real-time attendance, digital gradebooks, and automated fee processing into one secure system.
            </p>
            <ul className="space-y-1.5 text-xs text-neutral-400 pt-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full" />
                Instant classroom attendance & parent notifications
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full" />
                Integrated online tuition fee gateway (Stripe/ACH)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full" />
                Digital report cards & GPA calculation engines
              </li>
            </ul>
            <button
              onClick={() => startProjectWithContext('School Management Solutions', 'Education & Schools')}
              className="pt-2 text-xs font-semibold text-white flex items-center gap-1 hover:text-neutral-300 cursor-pointer"
            >
              <span>Request School ERP Proposal</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-8 bg-neutral-900/50 border border-neutral-800 rounded-xl space-y-4 hover:border-neutral-700 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-2 text-white font-semibold">
                <UtensilsCrossed className="w-4 h-4 text-neutral-400" />
                03. Restaurants & Hospitality Tech
              </span>
              <span>4–8 Wks</span>
            </div>
            <h3 className="text-xl font-bold text-white">Contactless Table Ordering & KDS Suites</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Recapture dining margins from third-party delivery apps. We build direct tableside QR ordering PWAs, low-latency Kitchen Display Systems, and floor reservation engines tailored to modern dining rooms.
            </p>
            <ul className="space-y-1.5 text-xs text-neutral-400 pt-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full" />
                Zero-app-download mobile web contactless ordering
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full" />
                Real-time WebSocket kitchen station routing
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full" />
                POS integration & instant 86-item blackout control
              </li>
            </ul>
            <button
              onClick={() => startProjectWithContext('Restaurant Management & Digital Solutions', 'Restaurants & Hospitality')}
              className="pt-2 text-xs font-semibold text-white flex items-center gap-1 hover:text-neutral-300 cursor-pointer"
            >
              <span>Request Hospitality Tech Proposal</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-8 bg-neutral-900/50 border border-neutral-800 rounded-xl space-y-4 hover:border-neutral-700 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-2 text-white font-semibold">
                <Cpu className="w-4 h-4 text-neutral-400" />
                04. AI & Intelligent Automation
              </span>
              <span>4–8 Wks</span>
            </div>
            <h3 className="text-xl font-bold text-white">Workflow Automation & Intelligent Data Pipelines</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Practical, production-hardened automation pipelines that eliminate manual document processing, sort incoming customer requests, and synchronize enterprise CRM data in real time.
            </p>
            <ul className="space-y-1.5 text-xs text-neutral-400 pt-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full" />
                Automated invoice & document OCR entity extraction
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full" />
                Custom enterprise middleware webhooks & queues
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full" />
                Secure role-based audit trail logging
              </li>
            </ul>
            <button
              onClick={() => startProjectWithContext('AI & Intelligent Automation')}
              className="pt-2 text-xs font-semibold text-white flex items-center gap-1 hover:text-neutral-300 cursor-pointer"
            >
              <span>Request Automation Proposal</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. OUR 7-STAGE ENGINEERING PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-neutral-800 pb-6 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            How We Deliver
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            A Disciplined, Transparent Project Lifecycle
          </h2>
          <p className="text-xs text-neutral-400 max-w-xl">
            Every engagement follows a clear sequence with measurable milestones, weekly demos, and guaranteed deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-neutral-500">Phase 01</span>
            <h3 className="text-base font-bold text-white">Discovery & Scope</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Deep stakeholder requirements audit, operational bottleneck analysis, and fixed-fee proposal definition.
            </p>
          </div>

          <div className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-neutral-500">Phase 02</span>
            <h3 className="text-base font-bold text-white">Architecture & UI/UX</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Database schema mapping, system architecture blueprint, and high-fidelity interactive Figma prototypes.
            </p>
          </div>

          <div className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-neutral-500">Phase 03</span>
            <h3 className="text-base font-bold text-white">Agile Engineering</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Disciplined 2-week development sprints with live staging URLs and end-to-end unit and integration tests.
            </p>
          </div>

          <div className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-xl space-y-2">
            <span className="text-xs font-mono text-neutral-500">Phase 04</span>
            <h3 className="text-base font-bold text-white">Launch & SLA Warranty</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Production DNS cutover, team onboarding, full IP code handover, and 60-to-90 days included warranty.
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setCurrentView('process')}
            className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            Review the full 7-stage engineering methodology →
          </button>
        </div>
      </section>

      {/* 5. CLIENT PROPOSAL PLATFORM CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <FileCheck2 className="w-4 h-4" />
              <span>Transparent Client Engagements</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Explore Our Live Client Proposal Platform
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              We believe in complete pricing and timeline transparency before you commit a single dollar. Review our interactive consulting proposals with detailed milestone schedules, technology architectures, and legal approval workflows.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => {
                setSelectedProposalId('prop-01');
                setCurrentView('proposals');
              }}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer text-center"
            >
              Interactive Proposal Demo
            </button>
            <button
              onClick={() => setCurrentView('contact')}
              className="w-full sm:w-auto px-5 py-3 border border-neutral-700 hover:border-neutral-600 text-neutral-200 text-xs font-medium rounded transition-colors cursor-pointer text-center"
            >
              Request Custom Proposal
            </button>
          </div>
        </div>
      </section>

      {/* 6. CONVERSION / INQUIRY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-b border-neutral-800 py-16 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white max-w-2xl mx-auto text-balance">
            Ready to Build a High-Performance Digital Solution?
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Discuss your requirements directly with our principal engineers. Receive a tailored feasibility review and detailed proposal within 48 hours.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setCurrentView('contact')}
              className="flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-sm uppercase tracking-wider rounded transition-all active:scale-95 cursor-pointer shadow-lg"
            >
              <span>Schedule Discovery & Proposal</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/15550192834?text=Hello%20Vanguard%20Team%2C%20I%20would%20like%20to%20discuss%20a%20new%20project."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-emerald-400 border border-neutral-800 text-sm font-medium rounded transition-colors"
            >
              Direct WhatsApp Hotline: +1 (555) 019-2834
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
