import React, { useState } from 'react';
import { Header } from './components/Header';
import { NavigationTabs } from './components/NavigationTabs';
import { DashboardView } from './components/DashboardView';
import { CrmLeadView } from './components/CrmLeadView';
import { QuotationBuilderModal } from './components/QuotationBuilderModal';
import { BookingsProjectView } from './components/BookingsProjectView';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { EmployeeOperationsView } from './components/EmployeeOperationsView';
import { CloudStorageView } from './components/CloudStorageView';
import { ClientPortalView } from './components/ClientPortalView';
import { FinanceView } from './components/FinanceView';
import { CompanyAdminView } from './components/CompanyAdminView';
import { EventTaxonomyView } from './components/EventTaxonomyView';
import { ContactUsModal } from './components/ContactUsModal';
import { WebsitePlansView } from './components/WebsitePlansView';
import { AuthLoginModal, UserProfile } from './components/AuthLoginModal';
import { DomainSplashScreen } from './components/DomainSplashScreen';
import { NewBookingModal } from './components/NewBookingModal';

import { 
  BranchLocation, 
  RoleType, 
  Lead, 
  PBOSProject, 
  Employee, 
  AttendanceRecord, 
  DailyWorkReport, 
  CloudFolder, 
  CloudFile, 
  Invoice, 
  Expense, 
  ClientDownloadLog,
  SubscriptionInfo,
  DriveSubscriptionState
} from './types/pbos';

import { 
  INITIAL_LEADS, 
  INITIAL_PROJECTS, 
  INITIAL_EMPLOYEES, 
  INITIAL_ATTENDANCE, 
  INITIAL_DAILY_REPORTS, 
  INITIAL_CLOUD_FOLDERS, 
  INITIAL_CLOUD_FILES, 
  INITIAL_INVOICES, 
  INITIAL_EXPENSES, 
  INITIAL_DOWNLOAD_LOGS,
  INITIAL_SUBSCRIPTION 
} from './data/mockData';

import { INITIAL_DRIVE_SUBSCRIPTION } from './data/drivePlans';

export function App() {
  // Navigation & Workspace state
  const [activeTab, setActiveTab] = useState<string>('plans');
  const [currentBranch, setCurrentBranch] = useState<BranchLocation>('Bangalore (HQ)');
  const [currentRole, setCurrentRole] = useState<RoleType>('Company Head');
  const [isClockedIn, setIsClockedIn] = useState(true);

  // Authentication & Domain Splash State
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [showDomainSplash, setShowDomainSplash] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Application Data State
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [projects, setProjects] = useState<PBOSProject[]>(INITIAL_PROJECTS);
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [reports, setReports] = useState<DailyWorkReport[]>(INITIAL_DAILY_REPORTS);
  const [folders, setFolders] = useState<CloudFolder[]>(INITIAL_CLOUD_FOLDERS);
  const [files, setFiles] = useState<CloudFile[]>(INITIAL_CLOUD_FILES);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [downloadLogs, setDownloadLogs] = useState<ClientDownloadLog[]>(INITIAL_DOWNLOAD_LOGS);
  const [subscription, setSubscription] = useState<SubscriptionInfo>(INITIAL_SUBSCRIPTION);
  const [driveSubscription, setDriveSubscription] = useState<DriveSubscriptionState>(INITIAL_DRIVE_SUBSCRIPTION);

  // Active Modals & Selection state
  const [selectedLeadForQuote, setSelectedLeadForQuote] = useState<Lead | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showContactUsModal, setShowContactUsModal] = useState(false);
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);

  // Auth & Plan handlers
  const handleLoginSuccess = (user: UserProfile) => {
    setUserProfile(user);
    setShowAuthModal(false);
    setActiveTab('plans'); // Immediately jump to Website Plans page upon login or demo lookup
  };

  const handleUpdateWebsitePlan = (planId: string, planName: string, price: number) => {
    setSubscription({
      ...subscription,
      planName,
      amount: price,
      status: 'Active'
    });
  };

  // Handlers for Leads & Quotations
  const handleAddLead = (newLeadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newLead: Lead = {
      ...newLeadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setLeads([newLead, ...leads]);
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
  };

  const handleConvertToBooking = (projectData: Partial<PBOSProject>) => {
    const newProject: PBOSProject = {
      id: `proj-${Date.now()}`,
      projectCode: `PBOS-2026-00${projects.length + 1}`,
      clientName: projectData.clientName || 'Client Name',
      clientPhone: projectData.clientPhone || '+91 98000 00000',
      clientEmail: projectData.clientEmail || 'client@example.com',
      category: projectData.category || 'Wedding & Marriage',
      eventType: projectData.eventType || 'Wedding',
      eventDate: projectData.eventDate || '2026-11-20',
      venue: projectData.venue || 'Bangalore Venue',
      branch: projectData.branch || currentBranch,
      totalBudget: projectData.totalBudget || 150000,
      advancePaid: projectData.advancePaid ?? 75000,
      balanceDue: projectData.balanceDue ?? (projectData.totalBudget ? Math.max(0, projectData.totalBudget - (projectData.advancePaid || 0)) : 75000),
      stage: 'Booking Confirmed',
      progressPercent: 10,
      qcPassed: false,
      portalPin: Math.floor(100000 + Math.random() * 900000).toString(),
      portalLink: `https://millionsphoto.com/client-portal/pbos-2026-00${projects.length + 1}`,
      portalExpiry: '2027-01-01',
      createdAt: new Date().toISOString().split('T')[0],
      team: projectData.team || {
        photographers: ['Siddharth Rao'],
        videographers: ['Deepak Kumar'],
        droneOperators: ['Deepak Kumar'],
        editors: ['Neha Gupta'],
        albumDesigners: ['Manish Hegde'],
        deliveryAgent: 'Karthik Raja',
        equipmentAssigned: ['Sony A7IV', 'DJI Drone']
      },
      requirements: projectData.requirements || {
        specialMoments: ['Couple Entry', 'Family Stage Shots'],
        hasDrone: true,
        hasSlowMotion: true,
        isTraditionalVideo: true,
        isCinematicFilm: true,
        requiresInterviews: true,
        familyPhotoChecklist: ['Parents', 'Siblings'],
        shootingStyle: 'Cinematic',
        musicPreferences: ['Acoustic Instrumental'],
        moodboardLinks: [],
        deliverablesList: [
          { id: 'd1', title: 'Cinematic Teaser (60s)', type: 'Reel', status: 'Pending', assignee: 'Neha Gupta' },
          { id: 'd2', title: 'Photo Album (40 Pages)', type: 'Album', status: 'Pending', assignee: 'Manish Hegde' }
        ]
      }
    };

    setProjects([newProject, ...projects]);
    setActiveTab('bookings');
  };

  const handleUpdateProject = (updated: PBOSProject) => {
    setProjects(projects.map(p => p.id === updated.id ? updated : p));
  };

  // Handlers for Employees & Operations
  const handleAddEmployee = (empData: Omit<Employee, 'id'>) => {
    const newEmp: Employee = { ...empData, id: `emp-${Date.now()}` };
    setEmployees([...employees, newEmp]);
  };

  const handleSubmitDailyReport = (reportData: Omit<DailyWorkReport, 'id' | 'submittedAt'>) => {
    const newRep: DailyWorkReport = {
      ...reportData,
      id: `dwr-${Date.now()}`,
      submittedAt: 'Just now'
    };
    setReports([newRep, ...reports]);
  };

  // Handlers for Storage
  const handleUploadFile = (folderId: string, fileName: string) => {
    const newFile: CloudFile = {
      id: `file-${Date.now()}`,
      projectId: 'proj-1',
      folderId,
      fileName,
      fileType: fileName.endsWith('.mp4') ? 'video' : 'image',
      sizeFormatted: '45 MB',
      version: 1,
      uploadedBy: 'Vikram Million',
      uploadedAt: 'Just now',
      isWatermarked: false,
      downloadUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'
    };
    setFiles([newFile, ...files]);
  };

  const handleRequestDeleteFile = (fileId: string, reason: string) => {
    setFiles(files.filter(f => f.id !== fileId));
    alert(`File deletion processed. Reason logged to immutable audit trail: "${reason}"`);
  };

  // Handlers for Finance
  const handleAddInvoice = (inv: Omit<Invoice, 'id'>) => {
    const newInv: Invoice = { ...inv, id: `inv-${Date.now()}` };
    setInvoices([newInv, ...invoices]);
  };

  const handleAddExpense = (exp: Omit<Expense, 'id'>) => {
    const newExp: Expense = { ...exp, id: `exp-${Date.now()}` };
    setExpenses([newExp, ...expenses]);
  };

  // Client Portal Navigation
  const handleOpenClientPortal = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveTab('portal');
  };

  const handleClientDownload = (fileName: string) => {
    const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];
    const newLog: ClientDownloadLog = {
      id: `log-${Date.now()}`,
      projectId: activeProject.id,
      clientName: activeProject.clientName,
      downloadedAt: new Date().toLocaleString(),
      fileName,
      ipAddress: '157.48.192.11',
      device: 'MacBook Pro / macOS',
      downloadCount: 1
    };
    setDownloadLogs([newLog, ...downloadLogs]);
  };

  const currentProjectForModal = projects.find(p => p.id === selectedProjectId) || null;
  const currentProjectForPortal = projects.find(p => p.id === selectedProjectId) || projects[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-sky-500 selection:text-white">
      
      {/* Header */}
      <Header
        currentBranch={currentBranch}
        currentRole={currentRole}
        isClockedIn={isClockedIn}
        onSelectBranch={setCurrentBranch}
        onSelectRole={setCurrentRole}
        onToggleClockIn={() => setIsClockedIn(!isClockedIn)}
        onOpenContactUs={() => setShowContactUsModal(true)}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenDomainSplash={() => setShowDomainSplash(true)}
        userProfile={userProfile}
        subscription={subscription}
        activeView={activeTab}
        onNewLead={() => setActiveTab('crm')}
        onNewBooking={() => setShowNewBookingModal(true)}
      />

      {/* Navigation Tabs */}
      <NavigationTabs
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenContactUs={() => setShowContactUsModal(true)}
      />

      {/* Main Workspace Container */}
      <main className="w-full max-w-[2200px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 pt-6 pb-12">
        
        {/* WEBSITE PLANS & PRICING VIEW */}
        {activeTab === 'plans' && (
          <WebsitePlansView
            subscription={subscription}
            onUpdatePlan={handleUpdateWebsitePlan}
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onOpenContactUs={() => setShowContactUsModal(true)}
          />
        )}

        {/* DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <DashboardView
            leads={leads}
            projects={projects}
            employees={employees}
            invoices={invoices}
            subscription={subscription}
            currentBranch={currentBranch}
            onOpenProject={(id) => {
              setSelectedProjectId(id);
              setActiveTab('bookings');
            }}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* CRM & LEADS VIEW */}
        {activeTab === 'crm' && (
          <CrmLeadView
            leads={leads}
            currentBranch={currentBranch}
            onAddLead={handleAddLead}
            onUpdateLeadStatus={handleUpdateLeadStatus}
            onOpenQuotationBuilder={(lead) => setSelectedLeadForQuote(lead)}
          />
        )}

        {/* BOOKINGS & PRODUCTION WORKFLOW VIEW */}
        {activeTab === 'bookings' && (
          <BookingsProjectView
            projects={projects}
            currentBranch={currentBranch}
            onOpenProjectDetail={(projId) => setSelectedProjectId(projId)}
            onOpenNewBookingModal={() => setShowNewBookingModal(true)}
          />
        )}

        {/* CLOUD STORAGE & GOVERNANCE VIEW */}
        {activeTab === 'storage' && (
          <CloudStorageView
            folders={folders}
            files={files}
            downloadLogs={downloadLogs}
            currentRole={currentRole}
            driveSubscription={driveSubscription}
            onUploadFile={handleUploadFile}
            onRequestDelete={handleRequestDeleteFile}
            onUpdateDriveSubscription={setDriveSubscription}
          />
        )}

        {/* HR & EMPLOYEE OPERATIONS VIEW */}
        {activeTab === 'hr' && (
          <EmployeeOperationsView
            employees={employees}
            attendance={attendance}
            reports={reports}
            currentBranch={currentBranch}
            currentRole={currentRole}
            onClockInToggle={() => setIsClockedIn(!isClockedIn)}
            onAddEmployee={handleAddEmployee}
            onSubmitDailyReport={handleSubmitDailyReport}
            onUpdatePermissions={() => {}}
          />
        )}

        {/* CLIENT PORTAL VIEW */}
        {activeTab === 'portal' && (
          <ClientPortalView
            project={currentProjectForPortal}
            files={files}
            onClientDownload={handleClientDownload}
          />
        )}

        {/* FINANCE & PAYROLL VIEW */}
        {activeTab === 'finance' && (
          <FinanceView
            invoices={invoices}
            expenses={expenses}
            employees={employees}
            currentBranch={currentBranch}
            onAddInvoice={handleAddInvoice}
            onAddExpense={handleAddExpense}
          />
        )}

        {/* COMPANY ADMIN VIEW */}
        {activeTab === 'admin' && (
          <CompanyAdminView
            currentBranch={currentBranch}
            currentRole={currentRole}
            driveSubscription={driveSubscription}
            onSelectBranch={setCurrentBranch}
            onUpdateDriveSubscription={setDriveSubscription}
          />
        )}

        {/* EVENT TAXONOMY VIEW */}
        {activeTab === 'taxonomy' && (
          <EventTaxonomyView />
        )}

      </main>

      {/* QUOTATION BUILDER MODAL */}
      {selectedLeadForQuote && (
        <QuotationBuilderModal
          lead={selectedLeadForQuote}
          onClose={() => setSelectedLeadForQuote(null)}
          onConvertToBooking={handleConvertToBooking}
        />
      )}

      {/* PROJECT DETAIL MODAL */}
      {selectedProjectId && activeTab !== 'portal' && (
        <ProjectDetailModal
          project={currentProjectForModal}
          employees={employees}
          onClose={() => setSelectedProjectId(null)}
          onUpdateProject={handleUpdateProject}
          onOpenClientPortal={handleOpenClientPortal}
        />
      )}

      {/* CONTACT US AUTO CHAT BOT MODAL */}
      {showContactUsModal && (
        <ContactUsModal
          onClose={() => setShowContactUsModal(false)}
        />
      )}

      {/* AUTH LOGIN & DEMO LOOKUP MODAL */}
      <AuthLoginModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* DOMAIN LINK BLACK SCREEN SPLASH */}
      <DomainSplashScreen
        isOpen={showDomainSplash}
        onClose={() => setShowDomainSplash(false)}
        onNavigateToPlans={() => setActiveTab('plans')}
        onNavigateToPortal={() => setActiveTab('portal')}
      />

      {/* NEW PROJECT BOOKING MODAL */}
      <NewBookingModal
        isOpen={showNewBookingModal}
        onClose={() => setShowNewBookingModal(false)}
        onAddProject={handleConvertToBooking}
        currentBranch={currentBranch}
        employees={employees}
      />

    </div>
  );
}

export default App;
