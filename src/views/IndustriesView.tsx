import React from 'react';
import { useAgency } from '../context/AgencyContext';
import { ArrowUpRight, CheckCircle2, Building, GraduationCap, UtensilsCrossed, Rocket, HeartPulse, ShoppingBag, Briefcase, Building2 } from 'lucide-react';

export const IndustriesView: React.FC = () => {
  const { industries, startProjectWithContext, setCurrentView } = useAgency();

  const getIndustryIcon = (name: string) => {
    switch (name) {
      case 'Education & Schools': return <GraduationCap className="w-5 h-5 text-neutral-300" />;
      case 'Restaurants & Hospitality': return <UtensilsCrossed className="w-5 h-5 text-neutral-300" />;
      case 'Healthcare & Life Sciences': return <HeartPulse className="w-5 h-5 text-neutral-300" />;
      case 'Startups & Venture MVPs': return <Rocket className="w-5 h-5 text-neutral-300" />;
      case 'Retail & E-commerce': return <ShoppingBag className="w-5 h-5 text-neutral-300" />;
      case 'Small & Medium Businesses': return <Briefcase className="w-5 h-5 text-neutral-300" />;
      case 'Corporate & Enterprise': return <Building2 className="w-5 h-5 text-neutral-300" />;
      default: return <Building className="w-5 h-5 text-neutral-300" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-neutral-100">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
          Industry-Specific Engineering
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Industries We Transform
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          Off-the-shelf software rarely fits industry realities. We build tailored digital systems designed around your sector's specific regulatory requirements, operational models, and customer workflows.
        </p>
      </div>

      {/* Industries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {industries.map((ind) => (
          <div
            key={ind.id}
            className="p-8 bg-neutral-900/50 border border-neutral-800 rounded-xl space-y-6 hover:border-neutral-700 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg">
                  {getIndustryIcon(ind.name)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{ind.name}</h2>
                  <p className="text-xs text-neutral-400">{ind.tagline}</p>
                </div>
              </div>

              {/* Challenge vs Solution */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3.5 bg-neutral-950/60 border border-neutral-800/80 rounded space-y-1">
                  <span className="text-[10px] uppercase font-mono text-amber-400 tracking-wider block font-semibold">
                    Common Operational Hurdle
                  </span>
                  <p className="text-neutral-300 leading-relaxed">
                    {ind.challenge}
                  </p>
                </div>

                <div className="p-3.5 bg-neutral-950/60 border border-neutral-800/80 rounded space-y-1">
                  <span className="text-[10px] uppercase font-mono text-emerald-400 tracking-wider block font-semibold">
                    Our Tailored Architecture
                  </span>
                  <p className="text-neutral-300 leading-relaxed">
                    {ind.agencySolution}
                  </p>
                </div>
              </div>

              {/* Key Differentiators */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono text-neutral-400 tracking-wider block">
                  Domain Standards & Compliance
                </span>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {ind.keyDifferentiators.map((diff, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{diff}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3">
              <button
                onClick={() => startProjectWithContext(undefined, ind.name)}
                className="text-xs font-semibold text-white hover:text-neutral-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Request {ind.name} Proposal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setCurrentView('work')}
                className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                View Case Studies →
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
