import React, { useState } from 'react';
import { ClientProposal } from '../types';
import { useAgency } from '../context/AgencyContext';
import { Printer, Check, CheckCircle, FileText, ArrowLeft, Shield, Calendar, Building, Mail, Phone, Clock } from 'lucide-react';

interface ProposalViewerProps {
  proposal: ClientProposal;
  onBack?: () => void;
  isStandaloneClientView?: boolean;
}

export const ProposalViewer: React.FC<ProposalViewerProps> = ({
  proposal,
  onBack,
  isStandaloneClientView = false
}) => {
  const { approveProposal, proposals, setSelectedProposalId, isAdmin, setCurrentView } = useAgency();
  const [signatureInput, setSignatureInput] = useState('');
  const [signerNameInput, setSignerNameInput] = useState('');
  const [approvalNotes, setApprovalNotes] = useState('');
  const [showApprovalForm, setShowApprovalForm] = useState(false);
  const [approvalSuccessMessage, setApprovalSuccessMessage] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleSignProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signatureInput.trim() || !signerNameInput.trim()) return;
    
    approveProposal(proposal.id, signatureInput.trim(), signerNameInput.trim(), approvalNotes.trim());
    setApprovalSuccessMessage(true);
    setShowApprovalForm(false);
    setTimeout(() => setApprovalSuccessMessage(false), 5000);
  };

  const formatCurrency = (amt: number, curr: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr,
      maximumFractionDigits: 0
    }).format(amt);
  };

  return (
    <div className="w-full text-neutral-100">
      
      {/* Top Action Utility Bar (hidden when printing) */}
      <div className="no-print bg-neutral-900 border-b border-neutral-800 py-3 px-4 sm:px-6 lg:px-8 mb-8 sticky top-18 z-30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer py-1 px-2 rounded hover:bg-neutral-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Proposals</span>
            </button>
          )}

          {/* Quick proposal selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 hidden sm:inline">Active Proposal:</span>
            <select
              value={proposal.id}
              onChange={(e) => setSelectedProposalId(e.target.value)}
              className="bg-neutral-950 border border-neutral-700 text-xs text-neutral-200 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-white"
            >
              {proposals.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.proposalNumber} — {p.clientCompany}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <button
              onClick={() => setCurrentView('admin')}
              className="text-xs text-neutral-400 hover:text-white border border-neutral-700 px-3 py-1.5 rounded transition-colors"
            >
              Edit in Admin
            </button>
          )}

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded transition-colors cursor-pointer"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Export PDF</span>
          </button>

          {!proposal.approval.approved && (
            <button
              onClick={() => setShowApprovalForm(!showApprovalForm)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Client Sign-Off</span>
            </button>
          )}
        </div>
      </div>

      {/* Approval Success Banner */}
      {approvalSuccessMessage && (
        <div className="no-print max-w-4xl mx-auto mb-6 p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-lg flex items-center gap-3 text-emerald-200 text-sm">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <p className="font-semibold">Proposal Successfully Accepted & Approved!</p>
            <p className="text-xs text-emerald-300">The digital sign-off record has been recorded and locked.</p>
          </div>
        </div>
      )}

      {/* Interactive Approval Form Drawer (when opened) */}
      {showApprovalForm && !proposal.approval.approved && (
        <div className="no-print max-w-4xl mx-auto mb-8 p-6 bg-neutral-900 border border-emerald-500/40 rounded-xl shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Client Proposal Acceptance & Sign-off</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Authorize project kickoff for {proposal.projectTitle} at {formatCurrency(proposal.budgetTotal, proposal.currency)}.
              </p>
            </div>
            <button
              onClick={() => setShowApprovalForm(false)}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSignProposal} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Authorized Signer Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={signerNameInput}
                  onChange={(e) => setSignerNameInput(e.target.value)}
                  placeholder="e.g. Dr. Eleanor Vance"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Type Your Signature (Legal Equivalent) *
                </label>
                <input
                  type="text"
                  required
                  value={signatureInput}
                  onChange={(e) => setSignatureInput(e.target.value)}
                  placeholder="Type Full Name / Signature"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-sm text-white font-serif italic focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Optional Project Notes or PO Number
              </label>
              <textarea
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                placeholder="Include purchase order number, special billing instructions, or kickoff preferences..."
                rows={2}
                className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <p className="text-[11px] text-neutral-400">
                By clicking below, you confirm authorization on behalf of {proposal.clientCompany}.
              </p>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Sign & Authorize Project
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Document Canvas (Print Page) */}
      <div className="print-page max-w-4xl mx-auto bg-neutral-900/90 border border-neutral-800 rounded-xl p-6 sm:p-10 lg:p-12 shadow-2xl space-y-10">
        
        {/* Document Header */}
        <div className="border-b border-neutral-800 pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
              EVOLVEX AI · EXECUTIVE CLIENT PROPOSAL
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {proposal.projectTitle}
            </h1>
            <p className="text-xs text-neutral-400">
              Prepared exclusively for <span className="text-neutral-200 font-medium">{proposal.clientCompany}</span>
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-neutral-400">Ref: {proposal.proposalNumber}</span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider ${
                  proposal.approval.approved
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : proposal.status === 'Sent'
                    ? 'bg-blue-950 text-blue-300 border border-blue-800'
                    : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                }`}
              >
                {proposal.approval.approved ? 'Approved & Locked' : proposal.status}
              </span>
            </div>
            <div className="text-xs text-neutral-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Date: {proposal.createdAt} · Valid Until: {proposal.validUntil}</span>
            </div>
          </div>
        </div>

        {/* Client & Studio Information Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 bg-neutral-950/70 border border-neutral-800 rounded-lg text-xs">
          <div className="space-y-2">
            <h3 className="font-semibold uppercase tracking-wider text-neutral-400 text-[11px]">Client Stakeholder</h3>
            <div className="space-y-1 text-neutral-300">
              <div className="flex items-center gap-2 font-medium text-white text-sm">
                <Building className="w-3.5 h-3.5 text-neutral-400" />
                <span>{proposal.clientCompany}</span>
              </div>
              <div className="pl-5.5 text-neutral-300">{proposal.clientName}</div>
              <div className="pl-5.5 flex items-center gap-2 text-neutral-400">
                <Mail className="w-3 h-3" />
                <span>{proposal.clientEmail}</span>
              </div>
              <div className="pl-5.5 flex items-center gap-2 text-neutral-400">
                <Phone className="w-3 h-3" />
                <span>{proposal.clientPhone}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 sm:border-l sm:border-neutral-800 sm:pl-6">
            <h3 className="font-semibold uppercase tracking-wider text-neutral-400 text-[11px]">Executing Partner</h3>
            <div className="space-y-1 text-neutral-300">
              <div className="font-medium text-white text-sm">Evolvex AI</div>
              <div>Principal Engineering & Product Advisory</div>
              <div className="text-neutral-400">evolvexai@gmail.com</div>
              <div className="text-neutral-400">+91 89192 90366</div>
            </div>
          </div>
        </div>

        {/* 1. Executive Summary */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 border-b border-neutral-800 pb-2">
            01. Executive Summary
          </h2>
          <p className="text-sm text-neutral-200 leading-relaxed">
            {proposal.executiveSummary}
          </p>
        </div>

        {/* 2. Business Requirements & Current Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 p-4 bg-neutral-950/40 border border-neutral-800/80 rounded-lg">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Existing Operational Challenges
            </h3>
            <ul className="space-y-2 text-xs text-neutral-300">
              {proposal.existingChallenges.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-mono text-[10px] mt-0.5">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 p-4 bg-neutral-950/40 border border-neutral-800/80 rounded-lg">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Target Business Requirements
            </h3>
            <ul className="space-y-2 text-xs text-neutral-300">
              {proposal.businessRequirements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono text-[10px] mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Proposed Technical Architecture */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 border-b border-neutral-800 pb-2">
            02. Technical Architecture & Engineering Strategy
          </h2>
          <p className="text-sm text-neutral-200 leading-relaxed">
            {proposal.proposedArchitecture}
          </p>

          {/* Tech Stack Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="p-3 bg-neutral-950 border border-neutral-800 rounded">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">Frontend Layer</span>
              <ul className="space-y-1 text-neutral-300 font-medium">
                {proposal.techStack.frontend.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 bg-neutral-950 border border-neutral-800 rounded">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">Backend & API</span>
              <ul className="space-y-1 text-neutral-300 font-medium">
                {proposal.techStack.backend.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 bg-neutral-950 border border-neutral-800 rounded">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">Database & Storage</span>
              <ul className="space-y-1 text-neutral-300 font-medium">
                {proposal.techStack.database.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 bg-neutral-950 border border-neutral-800 rounded">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">Infra & Security</span>
              <ul className="space-y-1 text-neutral-300 font-medium">
                {proposal.techStack.infrastructure.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Detailed Project Scope & Workstreams */}
        <div className="space-y-4 print-break-inside-avoid">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 border-b border-neutral-800 pb-2">
            03. Detailed Project Scope & Workstreams
          </h2>
          <div className="space-y-3">
            {proposal.projectScope.map((scope, idx) => (
              <div key={idx} className="p-4 bg-neutral-950/50 border border-neutral-800 rounded-lg space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="font-semibold text-white">{scope.phase}</span>
                  <span className="text-neutral-400 font-mono text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{scope.duration}</span>
                  </span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-neutral-300">
                  {scope.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span className="text-neutral-500 font-mono text-[10px] mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Key Deliverables */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 border-b border-neutral-800 pb-2">
            04. Formal Deliverables Handover
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-neutral-300">
            {proposal.deliverables.map((deliv, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-2.5 bg-neutral-950/30 border border-neutral-800 rounded">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{deliv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 6. Pricing & Milestone Investment Schedule */}
        <div className="space-y-4 print-break-inside-avoid">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              05. Investment & Payment Milestones
            </h2>
            <div className="text-right">
              <span className="text-xs text-neutral-400 mr-2">Fixed Engagement Fee:</span>
              <span className="text-lg font-bold text-white font-mono tabular-nums">
                {formatCurrency(proposal.budgetTotal, proposal.currency)}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 font-mono text-[11px] uppercase">
                  <th className="py-2.5 font-medium">Milestone Phase</th>
                  <th className="py-2.5 font-medium">Duration</th>
                  <th className="py-2.5 font-medium text-right">Share (%)</th>
                  <th className="py-2.5 font-medium text-right">Investment ({proposal.currency})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {proposal.milestones.map((m) => (
                  <tr key={m.id} className="hover:bg-neutral-950/30">
                    <td className="py-3 pr-4">
                      <div className="font-medium text-white">{m.title}</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        {m.deliverables.join(' · ')}
                      </div>
                    </td>
                    <td className="py-3 font-mono text-neutral-400">{m.duration}</td>
                    <td className="py-3 text-right font-mono tabular-nums text-neutral-300">{m.percentage}%</td>
                    <td className="py-3 text-right font-mono tabular-nums font-semibold text-white">
                      {formatCurrency(m.amount, proposal.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-neutral-800 font-bold text-white text-xs">
                  <td colSpan={2} className="py-3">Total Guaranteed Fixed Fee</td>
                  <td className="py-3 text-right font-mono tabular-nums">100%</td>
                  <td className="py-3 text-right font-mono tabular-nums text-emerald-400">
                    {formatCurrency(proposal.budgetTotal, proposal.currency)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* 7. Assumptions, Boundaries & SLA Warranty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print-break-inside-avoid">
          <div className="space-y-2 text-xs">
            <h3 className="font-semibold uppercase tracking-wider text-neutral-400 text-[11px]">
              Assumptions & Working Requirements
            </h3>
            <ul className="space-y-1.5 text-neutral-300">
              {proposal.assumptions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-neutral-500 font-mono text-[10px] mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <h3 className="font-semibold uppercase tracking-wider text-neutral-400 text-[11px]">
              Out-of-Scope Boundaries
            </h3>
            <ul className="space-y-1.5 text-neutral-300">
              {proposal.outOfScope.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-neutral-500 font-mono text-[10px] mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Support & Warranty SLA */}
        <div className="p-4 bg-neutral-950/60 border border-neutral-800 rounded-lg text-xs space-y-1.5 print-break-inside-avoid">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">
            <Shield className="w-4 h-4" />
            <span>Service Level Agreement & Post-Deployment Warranty</span>
          </div>
          <p className="text-neutral-200">
            <strong>Warranty Period:</strong> {proposal.supportSla.warrantyPeriod}
          </p>
          <p className="text-neutral-300">
            <strong>Incident Response SLA:</strong> Maximum guaranteed {proposal.supportSla.slaResponseHours} hours initial engineering response time for critical production defects.
          </p>
          <p className="text-neutral-400 text-[11px]">
            {proposal.supportSla.maintenanceDetails}
          </p>
        </div>

        {/* 8. Terms & Conditions */}
        <div className="space-y-2 text-xs print-break-inside-avoid">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 border-b border-neutral-800 pb-2">
            06. Engagement Terms & Intellectual Property
          </h2>
          <ol className="space-y-1.5 text-neutral-300 list-decimal list-inside text-[11px]">
            {proposal.terms.map((term, idx) => (
              <li key={idx} className="leading-relaxed">{term}</li>
            ))}
          </ol>
        </div>

        {/* 9. Acceptance & Approval Section */}
        <div className="border-t border-neutral-800 pt-6 space-y-4 print-break-inside-avoid">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            07. Proposal Acceptance & Authorization
          </h2>

          {proposal.approval.approved ? (
            <div className="p-5 bg-emerald-950/40 border border-emerald-800/80 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                  <CheckCircle className="w-4 h-4" />
                  <span>Officially Accepted & Legally Authorized</span>
                </div>
                <p className="text-xs text-neutral-300">
                  Approved by <strong className="text-white">{proposal.approval.approvedBy}</strong>
                </p>
                <p className="text-[11px] text-neutral-400 font-mono">
                  Timestamp: {proposal.approval.approvedAt ? new Date(proposal.approval.approvedAt).toUTCString() : 'Recorded'}
                </p>
                {proposal.approval.notes && (
                  <p className="text-xs text-neutral-300 italic pt-1">
                    "{proposal.approval.notes}"
                  </p>
                )}
              </div>
              <div className="text-right sm:border-l sm:border-neutral-800 sm:pl-6">
                <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-0.5">Digital Signature Stamp</span>
                <span className="font-serif italic text-lg text-emerald-300 tracking-wide">
                  {proposal.approval.clientSignature}
                </span>
                <div className="text-[10px] text-neutral-400 font-mono mt-1">Status: Locked</div>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-xs">
                <p className="font-semibold text-white">Pending Client Signature</p>
                <p className="text-neutral-400">
                  This proposal is active and valid until <span className="text-neutral-200">{proposal.validUntil}</span>.
                </p>
              </div>
              <button
                onClick={() => setShowApprovalForm(true)}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer shadow-md"
              >
                Sign & Authorize Proposal
              </button>
            </div>
          )}
        </div>

        {/* Document Footer Signatures */}
        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-neutral-800/80 text-xs">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono text-neutral-400 block">Prepared by Evolvex AI</span>
            <div className="h-10 border-b border-neutral-700 flex items-end pb-1 font-serif italic text-neutral-200">
              Alexander Thorne, Principal Partner
            </div>
            <div className="text-[11px] text-neutral-400">Managing Director</div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono text-neutral-400 block">For {proposal.clientCompany}</span>
            <div className="h-10 border-b border-neutral-700 flex items-end pb-1 font-serif italic text-neutral-200">
              {proposal.approval.clientSignature || '(Pending Signature)'}
            </div>
            <div className="text-[11px] text-neutral-400">{proposal.clientName}</div>
          </div>
        </div>

      </div>
    </div>
  );
};
