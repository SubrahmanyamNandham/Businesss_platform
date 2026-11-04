import React, { useEffect } from 'react';
import { Project } from '../types';
import { useAgency } from '../context/AgencyContext';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const { startProjectWithContext } = useAgency();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleRequestSimilar = () => {
    onClose();
    startProjectWithContext(project.category, project.industry);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden text-neutral-100 my-8">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>Case Study</span>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-200">{project.industry}</span>
            <span aria-hidden="true">·</span>
            <span>Completed {project.year}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors cursor-pointer"
            aria-label="Close case study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          
          {/* Title & Client Lockup */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              {project.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              <span className="text-neutral-300 font-medium">{project.clientName}</span>
              <span aria-hidden="true">·</span>
              <span>Timeline: {project.duration}</span>
              <span aria-hidden="true">·</span>
              <span>{project.category}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback container
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          {/* Executive Summary */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Project Overview</h3>
            <p className="text-neutral-200 text-base leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Quantitative Outcomes Strip */}
          <div className="p-5 bg-neutral-950/60 border border-neutral-800 rounded-lg">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Verified Project Outcomes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.outcomes.map((outcome, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-2xl font-bold text-white font-mono tabular-nums tracking-tight">
                    {outcome.metric}
                  </div>
                  <p className="text-xs text-neutral-400 leading-normal">
                    {outcome.context}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Problem vs Solution Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-lg border border-neutral-800 bg-neutral-900/40 space-y-2.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                The Business Challenge
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.businessProblem}
              </p>
            </div>

            <div className="p-5 rounded-lg border border-neutral-800 bg-neutral-900/40 space-y-2.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                The Architectural Solution
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.solutionDelivered}
              </p>
            </div>
          </div>

          {/* Key Deliverables */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Core Capabilities Delivered
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Architecture */}
          <div className="space-y-2.5 pt-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2 text-xs text-neutral-300 font-mono">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer inside Modal */}
          <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-400">
              Need a similar solution for your organization?
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white border border-neutral-700 rounded transition-colors cursor-pointer"
              >
                Close Case Study
              </button>
              <button
                onClick={handleRequestSimilar}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
              >
                <span>Request Similar Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
