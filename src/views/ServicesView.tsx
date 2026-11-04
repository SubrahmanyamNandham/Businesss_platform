import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAgency } from '../context/AgencyContext';
import { ArrowUpRight, CheckCircle2, Clock, Users, ShieldAlert } from 'lucide-react';

export const ServicesView: React.FC = () => {
  const { services, startProjectWithContext } = useAgency();
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0].id);

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-neutral-100">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] as const }}
        className="space-y-4 max-w-3xl"
      >
        <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
          Core Capabilities Directory
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Services & Technical Solutions
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          We combine senior engineering discipline with modern design execution. From full-scale campus ERPs and hospitality ordering suites to early-stage MVP launches and workflow automation — review our specialized service offerings below.
        </p>
      </motion.div>

      {/* Interactive Service Grid / Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Service Selector List */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.06, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:col-span-5 space-y-2 bg-neutral-900/30 border border-neutral-800 rounded-xl p-3"
        >
          <div className="px-3 py-2 text-[11px] font-mono uppercase text-neutral-400 border-b border-neutral-800/80 mb-2">
            Select Service Offering (12 Disciplines)
          </div>

          <div className="space-y-1 max-h-[640px] overflow-y-auto pr-1">
            {services.map((service) => {
              const isSelected = service.id === selectedServiceId;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-800/90 text-white border border-neutral-700 shadow-sm'
                      : 'hover:bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 border border-transparent'
                  }`}
                >
                  <span className="font-mono text-xs text-neutral-500 shrink-0 mt-0.5">
                    {service.number}
                  </span>
                  <div className="space-y-1 min-w-0">
                    <div className="text-xs font-semibold text-white truncate">
                      {service.title}
                    </div>
                    <div className="text-[11px] text-neutral-400 truncate">
                      {service.typicalTimeline} · {service.targetClients[0]}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: Active Service Deep Dive with Smooth Transition */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.08, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:col-span-7 bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 sm:p-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedService.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="space-y-8"
            >
              
              {/* Header */}
              <div className="space-y-2 border-b border-neutral-800 pb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <span>Discipline {selectedService.number}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-neutral-300">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Typical Delivery: {selectedService.typicalTimeline}</span>
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {selectedService.title}
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed pt-1">
                  {selectedService.shortDesc}
                </p>
              </div>

              {/* Problem & Solution Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 bg-neutral-950/60 border border-neutral-800 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
                    <ShieldAlert className="w-4 h-4" />
                    <span>The Business Problem</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {selectedService.businessProblem}
                  </p>
                </div>

                <div className="p-5 bg-neutral-950/60 border border-neutral-800 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>The Architectural Solution</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {selectedService.solution}
                  </p>
                </div>
              </div>

              {/* Key Deliverables */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Key Deliverables & Specifications
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-neutral-300">
                  {selectedService.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-2.5 bg-neutral-950/40 border border-neutral-800/80 rounded">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target Clients */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  <Users className="w-3.5 h-3.5" />
                  <span>Target Organizations & Teams</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-neutral-300">
                  {selectedService.targetClients.map((client, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded"
                    >
                      {client}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Row */}
              <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-neutral-400">
                  Need this capability for your organization?
                </div>
                <button
                  onClick={() => startProjectWithContext(selectedService.title)}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  <span>Request {selectedService.title} Proposal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>

    </div>
  );
};
