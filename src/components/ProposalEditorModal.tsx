import React, { useState } from 'react';
import { ClientProposal } from '../types';
import { useAgency } from '../context/AgencyContext';
import { X, Plus, Trash2, Save } from 'lucide-react';

interface ProposalEditorModalProps {
  proposalToEdit?: ClientProposal | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProposalEditorModal: React.FC<ProposalEditorModalProps> = ({
  proposalToEdit,
  isOpen,
  onClose
}) => {
  const { addProposal, updateProposal, setSelectedProposalId } = useAgency();

  const [formData, setFormData] = useState<Partial<ClientProposal>>(() => {
    if (proposalToEdit) return { ...proposalToEdit };
    return {
      proposalNumber: `PROP-2026-${Math.floor(100 + Math.random() * 900)}`,
      clientName: '',
      clientCompany: '',
      clientEmail: '',
      clientPhone: '',
      projectTitle: '',
      industry: 'Education & Schools',
      status: 'Draft',
      validUntil: '2026-12-31',
      budgetTotal: 15000,
      currency: 'USD',
      executiveSummary: '',
      businessRequirements: ['Seamless system integration', 'Role-based access control', 'Automated cloud backups'],
      existingChallenges: ['Manual disconnected data entry', 'Legacy software maintenance costs'],
      proposedArchitecture: 'Modern React/TypeScript web application backed by PostgreSQL and encrypted cloud edge APIs.',
      projectScope: [
        {
          phase: 'Phase 1: Architecture & UI Wireframes',
          duration: 'Weeks 1–2',
          items: ['Stakeholder alignment', 'Database schema modeling', 'Figma prototypes']
        },
        {
          phase: 'Phase 2: Core Engineering',
          duration: 'Weeks 3–5',
          items: ['API development', 'Frontend interface build', 'Authentication & RBAC']
        },
        {
          phase: 'Phase 3: QA, Training & Production Launch',
          duration: 'Weeks 6–8',
          items: ['Stress testing', 'Staff handover', 'Production cutover']
        }
      ],
      deliverables: [
        'Production web application on custom client domain',
        'Full source code repository ownership',
        'Staff operating manual and documentation',
        '60-day post-launch warranty support'
      ],
      techStack: {
        frontend: ['React 19', 'TypeScript', 'Tailwind CSS'],
        backend: ['Node.js', 'Express', 'JWT Auth'],
        database: ['PostgreSQL'],
        infrastructure: ['Hardened Cloud Container', 'SSL & CDN']
      },
      milestones: [
        {
          id: 'm1',
          title: 'Milestone 1: Project Kickoff & UI Prototype',
          percentage: 40,
          amount: 6000,
          duration: 'Weeks 1–2',
          deliverables: ['Approved UI mockups', 'Architecture sign-off']
        },
        {
          id: 'm2',
          title: 'Milestone 2: Functional Staging Alpha',
          percentage: 40,
          amount: 6000,
          duration: 'Weeks 3–5',
          deliverables: ['Working core workflows', 'API integration']
        },
        {
          id: 'm3',
          title: 'Milestone 3: Production Handover & Training',
          percentage: 20,
          amount: 3000,
          duration: 'Weeks 6–8',
          deliverables: ['Live domain launch', 'IP handover']
        }
      ],
      assumptions: [
        'Client will designate a single product contact person.',
        'Assets and content provided within agreed timelines.'
      ],
      outOfScope: ['Third-party external hardware supply.', 'Unspecified third-party ERP connectors.'],
      supportSla: {
        warrantyPeriod: '60 Days Comprehensive Warranty',
        slaResponseHours: 4,
        maintenanceDetails: 'Optional post-warranty maintenance retainer available at $450/month.'
      },
      terms: [
        '14-day payment terms upon milestone approval.',
        'Full source code and IP transfers to client upon final milestone payment.'
      ],
      approval: { approved: false }
    };
  });

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientCompany || !formData.projectTitle) return;

    if (proposalToEdit) {
      updateProposal(proposalToEdit.id, formData);
      setSelectedProposalId(proposalToEdit.id);
    } else {
      const created = addProposal(formData as Omit<ClientProposal, 'id' | 'createdAt'>);
      setSelectedProposalId(created.id);
    }
    onClose();
  };

  const handleTotalBudgetChange = (newTotal: number) => {
    const updatedMilestones = (formData.milestones || []).map(m => ({
      ...m,
      amount: Math.round((newTotal * m.percentage) / 100)
    }));
    setFormData({
      ...formData,
      budgetTotal: newTotal,
      milestones: updatedMilestones
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden text-neutral-100 my-8">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900 sticky top-0 z-10">
          <div>
            <h3 className="text-base font-bold text-white">
              {proposalToEdit ? `Edit Proposal: ${proposalToEdit.proposalNumber}` : 'Create New Client Proposal'}
            </h3>
            <p className="text-xs text-neutral-400">Configure client details, deliverables, timeline, and milestone payments.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto text-xs">
          
          {/* General Information */}
          <div className="space-y-4">
            <h4 className="font-semibold uppercase tracking-wider text-neutral-400 text-[11px] border-b border-neutral-800 pb-1">
              Client & Project Core
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-neutral-300 mb-1">Client Company / Organization *</label>
                <input
                  type="text"
                  required
                  value={formData.clientCompany || ''}
                  onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                  placeholder="e.g. Apex Hospital Group"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-300 mb-1">Primary Stakeholder Name *</label>
                <input
                  type="text"
                  required
                  value={formData.clientName || ''}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="e.g. Dr. Arthur Evans"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-300 mb-1">Client Email Address</label>
                <input
                  type="email"
                  value={formData.clientEmail || ''}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  placeholder="contact@client.org"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-300 mb-1">Client Phone / WhatsApp</label>
                <input
                  type="text"
                  value={formData.clientPhone || ''}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block font-medium text-neutral-300 mb-1">Project Proposal Title *</label>
                <input
                  type="text"
                  required
                  value={formData.projectTitle || ''}
                  onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                  placeholder="e.g. Clinical Telehealth Intake Portal"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-300 mb-1">Industry Sector</label>
                <select
                  value={formData.industry || 'Education & Schools'}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white"
                >
                  <option value="Education & Schools">Education & Schools</option>
                  <option value="Restaurants & Hospitality">Restaurants & Hospitality</option>
                  <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
                  <option value="Startups & Venture MVPs">Startups & Venture MVPs</option>
                  <option value="Retail & E-commerce">Retail & E-commerce</option>
                  <option value="Small & Medium Businesses">Small & Medium Businesses</option>
                  <option value="Corporate & Enterprise">Corporate & Enterprise</option>
                  <option value="Professional Services">Professional Services</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing & Budget */}
          <div className="space-y-4">
            <h4 className="font-semibold uppercase tracking-wider text-neutral-400 text-[11px] border-b border-neutral-800 pb-1">
              Pricing & Milestones
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium text-neutral-300 mb-1">Total Fixed Investment (USD) *</label>
                <input
                  type="number"
                  required
                  min="1000"
                  step="500"
                  value={formData.budgetTotal || 15000}
                  onChange={(e) => handleTotalBudgetChange(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white font-mono text-sm focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-300 mb-1">Proposal Status</label>
                <select
                  value={formData.status || 'Draft'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white"
                >
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-neutral-300 mb-1">Valid Until Date</label>
                <input
                  type="date"
                  value={formData.validUntil || '2026-12-31'}
                  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <label className="block font-medium text-neutral-300">Executive Summary & Problem Context</label>
            <textarea
              rows={3}
              value={formData.executiveSummary || ''}
              onChange={(e) => setFormData({ ...formData, executiveSummary: e.target.value })}
              placeholder="Concise consulting summary of the engagement, objectives, and value delivered..."
              className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white leading-relaxed"
            />
          </div>

          {/* Technical Architecture */}
          <div className="space-y-2">
            <label className="block font-medium text-neutral-300">Proposed Technical Solution & Architecture</label>
            <textarea
              rows={2}
              value={formData.proposedArchitecture || ''}
              onChange={(e) => setFormData({ ...formData, proposedArchitecture: e.target.value })}
              placeholder="High-level engineering overview of architecture, cloud stack, security protocols..."
              className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white leading-relaxed"
            />
          </div>

          <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-3 sticky bottom-0 bg-neutral-900 py-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-neutral-700 text-neutral-300 hover:text-white rounded transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-white hover:bg-neutral-200 text-neutral-950 font-semibold rounded transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{proposalToEdit ? 'Save Changes' : 'Generate Proposal'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
