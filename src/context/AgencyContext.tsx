import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, ClientProposal, ClientInquiry, ServiceItem, IndustryItem } from '../types';
import { INITIAL_PROJECTS, INITIAL_PROPOSALS, INITIAL_INQUIRIES, SERVICES_CATALOG, INDUSTRIES_SERVED } from '../data/initialData';

export type AppView = 'home' | 'work' | 'services' | 'industries' | 'process' | 'proposals' | 'contact' | 'admin';

interface AgencyContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  selectedProposalId: string | null;
  setSelectedProposalId: (id: string | null) => void;
  activeProposal: ClientProposal | null;
  projects: Project[];
  proposals: ClientProposal[];
  inquiries: ClientInquiry[];
  services: ServiceItem[];
  industries: IndustryItem[];
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  inquiryPrefill: { projectType?: string; industry?: string; description?: string } | null;
  setInquiryPrefill: (data: { projectType?: string; industry?: string; description?: string } | null) => void;
  
  // Actions
  addInquiry: (inquiry: Omit<ClientInquiry, 'id' | 'createdAt' | 'status'>) => ClientInquiry;
  updateInquiryStatus: (id: string, status: ClientInquiry['status'], notes?: string) => void;
  deleteInquiry: (id: string) => void;
  
  addProposal: (proposal: Omit<ClientProposal, 'id' | 'createdAt'>) => ClientProposal;
  updateProposal: (id: string, proposal: Partial<ClientProposal>) => void;
  approveProposal: (id: string, signature: string, signerName: string, notes?: string) => void;
  deleteProposal: (id: string) => void;
  
  addProject: (project: Omit<Project, 'id'>) => Project;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  resetToDefaults: () => void;
  startProjectWithContext: (projectType?: string, industry?: string) => void;
}

const AgencyContext = createContext<AgencyContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROJECTS: 'vanguard_projects_v1',
  PROPOSALS: 'vanguard_proposals_v1',
  INQUIRIES: 'vanguard_inquiries_v1',
  ADMIN: 'vanguard_is_admin_v1'
};

export const AgencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>('prop-01');
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN) === 'true';
  });
  const [inquiryPrefill, setInquiryPrefill] = useState<{ projectType?: string; industry?: string; description?: string } | null>(null);

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [proposals, setProposals] = useState<ClientProposal[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROPOSALS);
      return saved ? JSON.parse(saved) : INITIAL_PROPOSALS;
    } catch {
      return INITIAL_PROPOSALS;
    }
  });

  const [inquiries, setInquiries] = useState<ClientInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(proposals));
  }, [proposals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN, String(isAdmin));
  }, [isAdmin]);

  // Handle URL hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'work', 'services', 'industries', 'process', 'proposals', 'contact', 'admin'].includes(hash)) {
        setCurrentView(hash as AppView);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSetCurrentView = (view: AppView) => {
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeProposal = proposals.find(p => p.id === selectedProposalId) || proposals[0] || null;

  const startProjectWithContext = (projectType?: string, industry?: string) => {
    setInquiryPrefill({ projectType, industry });
    handleSetCurrentView('contact');
  };

  const addInquiry = (inquiryData: Omit<ClientInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: ClientInquiry = {
      ...inquiryData,
      id: `inq-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    setInquiries(prev => [newInquiry, ...prev]);
    return newInquiry;
  };

  const updateInquiryStatus = (id: string, status: ClientInquiry['status'], notes?: string) => {
    setInquiries(prev =>
      prev.map(item => (item.id === id ? { ...item, status, ...(notes !== undefined ? { notes } : {}) } : item))
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(item => item.id !== id));
  };

  const addProposal = (propData: Omit<ClientProposal, 'id' | 'createdAt'>) => {
    const newProposal: ClientProposal = {
      ...propData,
      id: `prop-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProposals(prev => [newProposal, ...prev]);
    setSelectedProposalId(newProposal.id);
    return newProposal;
  };

  const updateProposal = (id: string, updated: Partial<ClientProposal>) => {
    setProposals(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const approveProposal = (id: string, signature: string, signerName: string, notes?: string) => {
    setProposals(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status: 'Approved',
            approval: {
              approved: true,
              approvedBy: signerName,
              approvedAt: new Date().toISOString(),
              clientSignature: signature,
              notes: notes || item.approval.notes
            }
          };
        }
        return item;
      })
    );
  };

  const deleteProposal = (id: string) => {
    setProposals(prev => prev.filter(item => item.id !== id));
    if (selectedProposalId === id) {
      const remaining = proposals.filter(item => item.id !== id);
      setSelectedProposalId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const addProject = (projData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projData,
      id: `proj-${Date.now().toString(36)}`
    };
    setProjects(prev => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(item => item.id !== id));
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }
  };

  const resetToDefaults = () => {
    setProjects(INITIAL_PROJECTS);
    setProposals(INITIAL_PROPOSALS);
    setInquiries(INITIAL_INQUIRIES);
    setSelectedProposalId('prop-01');
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.PROPOSALS);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
  };

  return (
    <AgencyContext.Provider
      value={{
        currentView,
        setCurrentView: handleSetCurrentView,
        selectedProject,
        setSelectedProject,
        selectedProposalId,
        setSelectedProposalId,
        activeProposal,
        projects,
        proposals,
        inquiries,
        services: SERVICES_CATALOG,
        industries: INDUSTRIES_SERVED,
        isAdmin,
        setIsAdmin,
        inquiryPrefill,
        setInquiryPrefill,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        addProposal,
        updateProposal,
        approveProposal,
        deleteProposal,
        addProject,
        updateProject,
        deleteProject,
        resetToDefaults,
        startProjectWithContext
      }}
    >
      {children}
    </AgencyContext.Provider>
  );
};

export const useAgency = () => {
  const context = useContext(AgencyContext);
  if (!context) {
    throw new Error('useAgency must be used within an AgencyProvider');
  }
  return context;
};
