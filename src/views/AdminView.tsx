import React, { useState } from 'react';
import { useAgency } from '../context/AgencyContext';
import { ClientInquiry, ClientProposal, Project } from '../types';
import { ProposalEditorModal } from '../components/ProposalEditorModal';
import { SCHOOL_ERP_IMAGE } from '../data/initialData';
import {
  Inbox,
  FileText,
  Briefcase,
  Database,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  FileCheck2,
  Clock,
  Download,
  Upload,
  RefreshCw,
  LogOut,
  ExternalLink,
  Building
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    proposals,
    deleteProposal,
    updateProposal,
    projects,
    deleteProject,
    updateProject,
    addProject,
    setSelectedProposalId,
    setCurrentView,
    setIsAdmin,
    resetToDefaults
  } = useAgency();

  const [activeTab, setActiveTab] = useState<'inquiries' | 'proposals' | 'projects' | 'data'>('inquiries');
  const [selectedInquiry, setSelectedInquiry] = useState<ClientInquiry | null>(null);
  const [inquiryNotesInput, setInquiryNotesInput] = useState('');
  
  // Proposal editor
  const [proposalEditorOpen, setProposalEditorOpen] = useState(false);
  const [proposalToEdit, setProposalToEdit] = useState<ClientProposal | null>(null);

  // New project modal
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [newProjectData, setNewProjectData] = useState<Partial<Project>>({
    title: '',
    clientName: '',
    industry: 'Education & Schools',
    category: 'School & Education',
    summary: '',
    businessProblem: '',
    solutionDelivered: '',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    keyFeatures: ['Feature 1', 'Feature 2'],
    outcomes: [{ metric: '+100%', context: 'Operational efficiency increase' }],
    image: SCHOOL_ERP_IMAGE,
    featured: true,
    year: '2026',
    duration: '8 Weeks'
  });

  // Calculate metrics
  const newInquiriesCount = inquiries.filter((i) => i.status === 'New').length;
  const totalPipeline = proposals.reduce((acc, p) => acc + p.budgetTotal, 0);

  const formatCurrency = (amt: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amt);
  };

  const handleOpenInquiry = (inq: ClientInquiry) => {
    setSelectedInquiry(inq);
    setInquiryNotesInput(inq.notes || '');
  };

  const handleSaveInquiryNotes = () => {
    if (!selectedInquiry) return;
    updateInquiryStatus(selectedInquiry.id, selectedInquiry.status, inquiryNotesInput);
    setSelectedInquiry({ ...selectedInquiry, notes: inquiryNotesInput });
  };

  const handleConvertToProposal = (inq: ClientInquiry) => {
    setProposalToEdit({
      id: '',
      proposalNumber: `PROP-2026-${Math.floor(100 + Math.random() * 900)}`,
      clientName: inq.fullName,
      clientCompany: inq.company,
      clientEmail: inq.email,
      clientPhone: inq.phone,
      projectTitle: `${inq.projectType} for ${inq.company}`,
      industry: inq.industry,
      status: 'Draft',
      createdAt: new Date().toISOString().split('T')[0],
      validUntil: '2026-12-31',
      budgetTotal: inq.budgetRange.includes('25,000') ? 22000 : 16000,
      currency: 'USD',
      executiveSummary: `Project proposal prepared for ${inq.company} following initial discovery inquiry. Focus on delivering: ${inq.description}`,
      businessRequirements: ['Core system implementation', 'Data migration', 'Role-based access'],
      existingChallenges: [inq.description],
      proposedArchitecture: 'Scalable modern web application on cloud edge.',
      projectScope: [
        { phase: 'Phase 1: Architecture & Prototyping', duration: 'Weeks 1–2', items: ['Requirements validation'] },
        { phase: 'Phase 2: Core Engineering', duration: 'Weeks 3–6', items: ['Full system build'] }
      ],
      deliverables: ['Production software application', 'Source code repository', '60-day warranty'],
      techStack: {
        frontend: ['React 19', 'TypeScript', 'Tailwind CSS'],
        backend: ['Node.js', 'Express'],
        database: ['PostgreSQL'],
        infrastructure: ['Cloud Edge Container']
      },
      milestones: [
        { id: 'm1', title: 'Milestone 1: Deposit & Architecture', percentage: 50, amount: 8000, duration: 'Weeks 1–2', deliverables: ['Architecture plan'] },
        { id: 'm2', title: 'Milestone 2: Final Launch & Handover', percentage: 50, amount: 8000, duration: 'Weeks 3–6', deliverables: ['Production cutover'] }
      ],
      assumptions: ['Client delivers required assets on time'],
      outOfScope: ['Third-party hardware costs'],
      supportSla: {
        warrantyPeriod: '60 Days Included Warranty',
        slaResponseHours: 4,
        maintenanceDetails: 'Optional maintenance available'
      },
      terms: ['14-day payment terms', '100% IP transfer upon full payment'],
      approval: { approved: false }
    });
    setProposalEditorOpen(true);
    updateInquiryStatus(inq.id, 'Proposal Sent');
  };

  const handleExportData = () => {
    const data = {
      projects,
      proposals,
      inquiries,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vanguard_studio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const handleSaveNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectData.title || !newProjectData.clientName) return;

    addProject({
      slug: newProjectData.title!.toLowerCase().replace(/\s+/g, '-'),
      title: newProjectData.title!,
      clientName: newProjectData.clientName!,
      industry: newProjectData.industry || 'Education & Schools',
      category: newProjectData.category || 'School & Education',
      summary: newProjectData.summary || 'Custom software solution built for enterprise client.',
      businessProblem: newProjectData.businessProblem || 'Manual operational delays.',
      solutionDelivered: newProjectData.solutionDelivered || 'Modern high-performance web platform.',
      techStack: newProjectData.techStack || ['React', 'TypeScript', 'Node.js'],
      keyFeatures: newProjectData.keyFeatures || ['Core workflow optimization'],
      outcomes: newProjectData.outcomes || [{ metric: '99.9%', context: 'Operational uptime' }],
      image: newProjectData.image || SCHOOL_ERP_IMAGE,
      featured: newProjectData.featured ?? true,
      year: newProjectData.year || '2026',
      duration: newProjectData.duration || '8 Weeks'
    });
    setNewProjectModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-neutral-100">
      
      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Studio Command Center · Authenticated</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Studio Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-300 hover:text-white border border-neutral-700 rounded transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </button>

          <button
            onClick={() => {
              setIsAdmin(false);
              setCurrentView('home');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-300 hover:text-rose-200 border border-rose-900 bg-rose-950/40 rounded transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Admin</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-1">
          <div className="text-[11px] font-mono text-neutral-400 uppercase">Incoming Inquiries</div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">
            {inquiries.length}
            {newInquiriesCount > 0 && (
              <span className="text-xs text-emerald-400 ml-2 font-normal">
                ({newInquiriesCount} New)
              </span>
            )}
          </div>
        </div>

        <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-1">
          <div className="text-[11px] font-mono text-neutral-400 uppercase">Active Proposals</div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">
            {proposals.length}
          </div>
        </div>

        <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-1">
          <div className="text-[11px] font-mono text-neutral-400 uppercase">Total Quoted Pipeline</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">
            {formatCurrency(totalPipeline)}
          </div>
        </div>

        <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-1">
          <div className="text-[11px] font-mono text-neutral-400 uppercase">Published Case Studies</div>
          <div className="text-2xl font-bold text-white font-mono tabular-nums">
            {projects.length}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'inquiries'
              ? 'bg-white text-neutral-950 font-semibold shadow'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Client Inquiries ({inquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('proposals')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'proposals'
              ? 'bg-white text-neutral-950 font-semibold shadow'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Proposals & Agreements ({proposals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'projects'
              ? 'bg-white text-neutral-950 font-semibold shadow'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Portfolio Projects ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('data')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'data'
              ? 'bg-white text-neutral-950 font-semibold shadow'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Backup & System Tools</span>
        </button>
      </div>

      {/* TAB 1: INQUIRIES MANAGEMENT */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>INCOMING CLIENT LEADS</span>
            <span>CLICK INQUIRY TO REVIEW DETAILS OR CONVERT TO PROPOSAL</span>
          </div>

          <div className="overflow-x-auto bg-neutral-900/40 border border-neutral-800 rounded-xl">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 font-mono text-[11px] uppercase bg-neutral-950/40">
                  <th className="p-3">Client & Company</th>
                  <th className="p-3">Project Type & Industry</th>
                  <th className="p-3">Budget Range</th>
                  <th className="p-3">Timeline</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-neutral-800/40 cursor-pointer transition-colors"
                    onClick={() => handleOpenInquiry(inq)}
                  >
                    <td className="p-3">
                      <div className="font-semibold text-white">{inq.fullName}</div>
                      <div className="text-[11px] text-neutral-400">{inq.company}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-neutral-200">{inq.projectType}</div>
                      <div className="text-[11px] text-neutral-400">{inq.industry}</div>
                    </td>
                    <td className="p-3 font-mono text-neutral-300">{inq.budgetRange}</td>
                    <td className="p-3 text-neutral-400">{inq.expectedTimeline}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                          inq.status === 'New'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : inq.status === 'In Discovery'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : inq.status === 'Proposal Sent'
                            ? 'bg-blue-950 text-blue-300 border border-blue-800'
                            : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConvertToProposal(inq);
                        }}
                        className="px-2.5 py-1 bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-[11px] rounded transition-colors mr-2 cursor-pointer"
                        title="Create Proposal for this client"
                      >
                        Convert to Proposal
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete inquiry from ${inq.fullName}?`)) deleteInquiry(inq.id);
                        }}
                        className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Selected Inquiry Detail Drawer / Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl p-6 text-neutral-100 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Inquiry Details</span>
                <h3 className="text-xl font-bold text-white">{selectedInquiry.fullName}</h3>
                <p className="text-xs text-neutral-400">{selectedInquiry.company} · {selectedInquiry.industry}</p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-neutral-950 p-4 rounded-lg border border-neutral-800">
              <div>
                <span className="text-neutral-500 block">Email:</span>
                <a href={`mailto:${selectedInquiry.email}`} className="text-neutral-200 hover:underline">
                  {selectedInquiry.email}
                </a>
              </div>
              <div>
                <span className="text-neutral-500 block">Phone / WhatsApp:</span>
                <span className="text-neutral-200">{selectedInquiry.phone}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Budget Range:</span>
                <span className="text-emerald-400 font-mono font-medium">{selectedInquiry.budgetRange}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Expected Timeline:</span>
                <span className="text-neutral-200">{selectedInquiry.expectedTimeline}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="font-semibold text-neutral-300 uppercase tracking-wider text-[10px]">
                Project Scope / Client Description
              </span>
              <p className="p-3 bg-neutral-950 border border-neutral-800 rounded text-neutral-200 leading-relaxed">
                {selectedInquiry.description}
              </p>
            </div>

            {/* Status & Notes */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-medium text-neutral-300">Lead Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as any;
                    updateInquiryStatus(selectedInquiry.id, newStatus);
                    setSelectedInquiry({ ...selectedInquiry, status: newStatus });
                  }}
                  className="bg-neutral-950 border border-neutral-700 text-white rounded px-2.5 py-1"
                >
                  <option value="New">New</option>
                  <option value="In Discovery">In Discovery</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Won">Won / Active Client</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Internal Team Notes</label>
                <textarea
                  rows={2}
                  value={inquiryNotesInput}
                  onChange={(e) => setInquiryNotesInput(e.target.value)}
                  placeholder="Notes from discovery call, special requirements, pricing thoughts..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
                />
                <button
                  onClick={handleSaveInquiryNotes}
                  className="mt-1 px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded text-[11px]"
                >
                  Save Internal Notes
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <button
                onClick={() => {
                  deleteInquiry(selectedInquiry.id);
                  setSelectedInquiry(null);
                }}
                className="text-xs text-rose-400 hover:text-rose-300"
              >
                Delete Inquiry
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 border border-neutral-700 text-xs rounded text-neutral-300"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleConvertToProposal(selectedInquiry);
                    setSelectedInquiry(null);
                  }}
                  className="px-4 py-2 bg-white text-neutral-950 font-semibold text-xs rounded hover:bg-neutral-200"
                >
                  Create Proposal from Lead
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: PROPOSALS MANAGEMENT */}
      {activeTab === 'proposals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>CLIENT PROPOSALS ({proposals.length})</span>
            <button
              onClick={() => {
                setProposalToEdit(null);
                setProposalEditorOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-neutral-950 font-semibold text-xs rounded hover:bg-neutral-200 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Proposal</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposals.map((prop) => (
              <div
                key={prop.id}
                className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-4 flex flex-col justify-between"
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

                  <h3 className="text-base font-bold text-white">
                    {prop.projectTitle}
                  </h3>
                  <div className="text-xs text-neutral-400">
                    Client: <strong className="text-neutral-200">{prop.clientCompany}</strong> ({prop.clientName})
                  </div>
                  <div className="text-xs text-neutral-400">
                    Valid Until: {prop.validUntil}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Fixed Fee:</span>
                    <span className="font-mono text-base font-bold text-white tabular-nums">
                      {formatCurrency(prop.budgetTotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                    <button
                      onClick={() => {
                        setSelectedProposalId(prop.id);
                        setCurrentView('proposals');
                      }}
                      className="flex items-center gap-1 text-neutral-300 hover:text-white"
                      title="Inspect full client proposal"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => {
                        setProposalToEdit(prop);
                        setProposalEditorOpen(true);
                      }}
                      className="flex items-center gap-1 text-neutral-300 hover:text-white"
                      title="Edit Proposal"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        updateProposal(prop.id, {
                          approval: {
                            approved: !prop.approval.approved,
                            approvedBy: !prop.approval.approved ? 'Admin Override' : undefined,
                            approvedAt: !prop.approval.approved ? new Date().toISOString() : undefined,
                            clientSignature: !prop.approval.approved ? 'Authorized By Agency' : undefined
                          },
                          status: !prop.approval.approved ? 'Approved' : 'Sent'
                        });
                      }}
                      className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
                      title="Toggle Approved"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{prop.approval.approved ? 'Unlock' : 'Approve'}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete proposal ${prop.proposalNumber}?`)) deleteProposal(prop.id);
                      }}
                      className="p-1 text-neutral-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PORTFOLIO PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>PORTFOLIO CASE STUDIES ({projects.length})</span>
            <button
              onClick={() => setNewProjectModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-neutral-950 font-semibold text-xs rounded hover:bg-neutral-200 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-24 h-16 rounded overflow-hidden bg-neutral-950 shrink-0 border border-neutral-800">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">{proj.title}</h3>
                    <p className="text-xs text-neutral-400">{proj.clientName} · {proj.industry}</p>
                    <div className="text-[11px] font-mono text-neutral-500">
                      Duration: {proj.duration} · Year: {proj.year}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
                    <input
                      type="checkbox"
                      checked={proj.featured}
                      onChange={(e) => updateProject(proj.id, { featured: e.target.checked })}
                      className="rounded bg-neutral-950 border-neutral-700"
                    />
                    <span>Featured on Home</span>
                  </label>

                  <button
                    onClick={() => {
                      if (confirm(`Delete project "${proj.title}"?`)) deleteProject(proj.id);
                    }}
                    className="p-1 text-neutral-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: BACKUP & DATA */}
      {activeTab === 'data' && (
        <div className="max-w-2xl space-y-6">
          <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-white">Export & Backup Studio State</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Export all proposals, client inquiries, and portfolio projects to a single portable JSON file.
            </p>
            <button
              onClick={handleExportData}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-xs font-semibold"
            >
              <Download className="w-4 h-4" />
              <span>Download Studio JSON Backup</span>
            </button>
          </div>

          <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-white">Reset Default Demonstration Data</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Restore initial seed proposals (Oakwood Academy, Velvet & Vine, Finflow MVP), projects, and inquiries.
            </p>
            <button
              onClick={() => {
                if (confirm('Reset all local changes and reload initial seed data?')) {
                  resetToDefaults();
                  alert('Studio data reset to defaults.');
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800 text-rose-300 rounded text-xs font-semibold"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset to Factory Defaults</span>
            </button>
          </div>
        </div>
      )}

      {/* Proposal Editor Modal */}
      <ProposalEditorModal
        proposalToEdit={proposalToEdit}
        isOpen={proposalEditorOpen}
        onClose={() => setProposalEditorOpen(false)}
      />

      {/* New Project Modal */}
      {newProjectModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl p-6 text-neutral-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base font-bold text-white">Add Portfolio Project</h3>
              <button onClick={() => setNewProjectModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveNewProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-neutral-300">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={newProjectData.title || ''}
                    onChange={(e) => setNewProjectData({ ...newProjectData, title: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-neutral-300">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newProjectData.clientName || ''}
                    onChange={(e) => setNewProjectData({ ...newProjectData, clientName: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-neutral-300">Executive Summary</label>
                <textarea
                  rows={2}
                  value={newProjectData.summary || ''}
                  onChange={(e) => setNewProjectData({ ...newProjectData, summary: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-neutral-300">Industry</label>
                  <select
                    value={newProjectData.industry}
                    onChange={(e) => setNewProjectData({ ...newProjectData, industry: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white"
                  >
                    <option value="Education & Schools">Education & Schools</option>
                    <option value="Restaurants & Hospitality">Restaurants & Hospitality</option>
                    <option value="Startups & Venture MVPs">Startups & Venture MVPs</option>
                    <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
                    <option value="Corporate & Enterprise">Corporate & Enterprise</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-neutral-300">Duration</label>
                  <input
                    type="text"
                    value={newProjectData.duration || '8 Weeks'}
                    onChange={(e) => setNewProjectData({ ...newProjectData, duration: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewProjectModalOpen(false)}
                  className="px-3 py-1.5 border border-neutral-700 rounded text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-white text-neutral-950 font-semibold rounded"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
