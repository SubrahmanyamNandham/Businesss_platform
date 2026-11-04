export type ProjectCategory =
  | 'All'
  | 'Web Development'
  | 'Mobile Applications'
  | 'AI & Automation'
  | 'School & Education'
  | 'Restaurant & Hospitality'
  | 'Business Applications'
  | 'E-commerce'
  | 'Enterprise Solutions';

export interface ProjectOutcome {
  metric: string;
  context: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  category: ProjectCategory;
  summary: string;
  businessProblem: string;
  solutionDelivered: string;
  techStack: string[];
  keyFeatures: string[];
  outcomes: ProjectOutcome[];
  image: string;
  featured: boolean;
  year: string;
  liveUrl?: string;
  duration: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDesc: string;
  businessProblem: string;
  solution: string;
  deliverables: string[];
  targetClients: string[];
  typicalTimeline: string;
  iconName: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  tagline: string;
  challenge: string;
  agencySolution: string;
  keyDifferentiators: string[];
  exampleProjects: string[];
  iconName: string;
}

export interface ProposalMilestone {
  id: string;
  title: string;
  percentage: number;
  amount: number;
  duration: string;
  deliverables: string[];
}

export interface ProposalScopeItem {
  phase: string;
  duration: string;
  items: string[];
}

export type ProposalStatus = 'Draft' | 'Sent' | 'Under Review' | 'Approved' | 'Declined';

export interface ClientProposal {
  id: string;
  proposalNumber: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  projectTitle: string;
  industry: string;
  status: ProposalStatus;
  createdAt: string;
  validUntil: string;
  budgetTotal: number;
  currency: string;
  executiveSummary: string;
  businessRequirements: string[];
  existingChallenges: string[];
  proposedArchitecture: string;
  projectScope: ProposalScopeItem[];
  deliverables: string[];
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    infrastructure: string[];
  };
  milestones: ProposalMilestone[];
  assumptions: string[];
  outOfScope: string[];
  supportSla: {
    warrantyPeriod: string;
    slaResponseHours: number;
    maintenanceDetails: string;
  };
  terms: string[];
  approval: {
    approved: boolean;
    approvedBy?: string;
    approvedAt?: string;
    clientSignature?: string;
    notes?: string;
  };
}

export type InquiryStatus = 'New' | 'In Discovery' | 'Proposal Sent' | 'Won' | 'Archived';

export interface ClientInquiry {
  id: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  projectType: string;
  description: string;
  budgetRange: string;
  expectedTimeline: string;
  createdAt: string;
  status: InquiryStatus;
  notes?: string;
}
