import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { ProposalViewer } from '../components/ProposalViewer';
import { ProposalEditorModal } from '../components/ProposalEditorModal';
import { Plus, FileText, CheckCircle, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const ProposalsView: React.FC = () => {
  const { proposals, selectedProposalId, setSelectedProposalId, activeProposal, startProjectWithContext } = useAgency();
  const [editorModalOpen, setEditorModalOpen] = useState(false);

  const formatCurrency = (amt: number, curr: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr,
      maximumFractionDigits: 0
    }).format(amt);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-neutral-100">
      
      {/* Platform Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800 pb-8 no-print">
        <div className="space-y-4 max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            Client Proposal & Agreement Platform
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Client Project Proposals
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Every Evolvex AI engagement begins with complete clarity. Explore sample client proposals below to see transparent milestone schedules, fixed pricing, architecture blueprints, and digital approval sign-off.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setEditorModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs font-semibold rounded transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Create New Proposal</span>
          </button>

          <button
            onClick={() => startProjectWithContext()}
            className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
          >
            <span>Request Your Custom Proposal</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Available Proposals Carousel/Grid (Hidden when printing document) */}
      <div className="space-y-4 no-print">
        <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
          <span>ACTIVE PROPOSALS ARCHIVE ({proposals.length})</span>
          <span>SELECT TO INSPECT COMPLETE AGREEMENT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {proposals.map((prop) => {
            const isSelected = prop.id === selectedProposalId;
            return (
              <button
                key={prop.id}
                onClick={() => setSelectedProposalId(prop.id)}
                className={`text-left p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'bg-neutral-900 border-white/60 shadow-lg ring-1 ring-white/20'
                    : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-neutral-400">{prop.proposalNumber}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider ${
                        prop.approval.approved
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : prop.status === 'Sent'
                          ? 'bg-blue-950 text-blue-300 border border-blue-800'
                          : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                      }`}
                    >
                      {prop.approval.approved ? 'Approved' : prop.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white line-clamp-1">
                    {prop.projectTitle}
                  </h3>
                  <div className="text-xs text-neutral-400">
                    {prop.clientCompany} · {prop.industry}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                  <span className="font-mono tabular-nums font-bold text-white">
                    {formatCurrency(prop.budgetTotal, prop.currency)}
                  </span>
                  <span className="text-neutral-400 text-[11px]">
                    Valid: {prop.validUntil}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Proposal Full Document View */}
      {activeProposal ? (
        <ProposalViewer proposal={activeProposal} />
      ) : (
        <div className="p-12 text-center text-neutral-400 bg-neutral-900/40 border border-neutral-800 rounded-xl">
          <p>No proposal selected. Please select a proposal above or create a new one.</p>
        </div>
      )}

      {/* Proposal Editor Modal */}
      <ProposalEditorModal
        isOpen={editorModalOpen}
        onClose={() => setEditorModalOpen(false)}
      />

    </div>
  );
};
