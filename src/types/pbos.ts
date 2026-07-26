export type RoleType = 
  | 'Company Head'
  | 'HR Manager'
  | 'CRM Executive'
  | 'Sales Executive'
  | 'Operations Manager'
  | 'Photographer'
  | 'Videographer'
  | 'Drone Operator'
  | 'Editor'
  | 'Album Designer'
  | 'Marketing Executive'
  | 'Accounts Manager'
  | 'Delivery Team'
  | 'Client';

export type DepartmentType = 
  | 'Executive'
  | 'HR'
  | 'CRM'
  | 'Sales'
  | 'Operations'
  | 'Photography'
  | 'Videography'
  | 'Post-Production'
  | 'Album & Print'
  | 'Marketing'
  | 'Accounts'
  | 'Logistics & Delivery';

export type BranchLocation = 'Bangalore (HQ)' | 'Mysore Branch' | 'Hyderabad Branch' | 'Mangalore Branch';

export type EventCategory = 
  | 'Wedding & Marriage'
  | 'Baby & Family'
  | 'Religious Events'
  | 'School & College'
  | 'Corporate Events'
  | 'Entertainment Events'
  | 'Sports Events'
  | 'Government & Public Events'
  | 'Business & Commercial Events'
  | 'Social & Lifestyle Events'
  | 'Personal Shoots'
  | 'Food, Hospitality & Real Estate'
  | 'Cultural Events';

export interface SmartEventType {
  id: string;
  name: string;
  category: EventCategory;
  defaultDeliverables: string[];
  suggestedGear: string[];
  popularAddons: string[];
}

export type LeadStatus = 'New Lead' | 'Contacted' | 'Quotation Sent' | 'Confirmed' | 'Lost';

export interface Lead {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  category: EventCategory;
  eventType: string;
  fromDate: string;
  toDate: string;
  venue: string;
  budgetEstimate: number;
  status: LeadStatus;
  branch: BranchLocation;
  assignedSalesPerson: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuotationItem {
  description: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface Quotation {
  id: string;
  leadId?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: string;
  venue: string;
  items: QuotationItem[];
  subtotal: number;
  gstPercent: number;
  gstAmount: number;
  discount: number;
  totalAmount: number;
  terms: string[];
  validUntil: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Declined';
  createdAt: string;
}

export type ProjectStage = 
  | 'Booking Confirmed'
  | 'Pre-Production & Briefing'
  | 'On-Shoot Production'
  | 'RAW Backup & Ingestion'
  | 'Photo Selection'
  | 'Editing & Color Grading'
  | 'Album Design'
  | 'Quality Check (QC)'
  | 'Client Review & Feedback'
  | 'Final Corrections'
  | 'Digital Delivery'
  | 'Archived';

export interface ProjectRequirements {
  specialMoments: string[];
  hasDrone: boolean;
  hasSlowMotion: boolean;
  isTraditionalVideo: boolean;
  isCinematicFilm: boolean;
  requiresInterviews: boolean;
  familyPhotoChecklist: string[];
  shootingStyle: 'Cinematic' | 'Traditional' | 'Documentary' | 'High Fashion' | 'Minimalist';
  musicPreferences: string[];
  moodboardLinks: string[];
  deliverablesList: {
    id: string;
    title: string;
    type: 'Video' | 'Photos' | 'Album' | 'RAW' | 'Reel';
    status: 'Pending' | 'In Progress' | 'Completed';
    assignee: string;
  }[];
}

export interface TeamAssignment {
  photographers: string[];
  videographers: string[];
  droneOperators: string[];
  editors: string[];
  albumDesigners: string[];
  deliveryAgent: string;
  equipmentAssigned: string[];
}

export interface PBOSProject {
  id: string;
  projectCode: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  category: EventCategory;
  eventType: string;
  eventDate: string;
  venue: string;
  branch: BranchLocation;
  totalBudget: number;
  advancePaid: number;
  balanceDue: number;
  stage: ProjectStage;
  progressPercent: number;
  team: TeamAssignment;
  requirements: ProjectRequirements;
  qcPassed: boolean;
  qcNotes?: string;
  portalLink?: string;
  portalPin?: string;
  portalExpiry?: string;
  createdAt: string;
}

export interface Employee {
  id: string;
  empId: string;
  name: string;
  email: string;
  phone: string;
  department: DepartmentType;
  designation: string;
  role: RoleType;
  branch: BranchLocation;
  joiningDate: string;
  salary: number;
  avatar: string;
  emergencyContact: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  todayStatus: 'Online' | 'Offline' | 'Break' | 'Field Work' | 'Work From Home';
  todayClockIn?: string;
  todayClockOut?: string;
  permissions: {
    canUploadFiles: boolean;
    canDeleteFiles: boolean;
    canApproveDeliverables: boolean;
    canEditFinance: boolean;
    canCreateProject: boolean;
    canOverrideAttendance: boolean;
  };
}

export interface AttendanceRecord {
  id: string;
  empId: string;
  empName: string;
  date: string;
  clockIn: string;
  clockOut?: string;
  status: 'Present' | 'Late' | 'Half Day' | 'On Leave' | 'Work From Home' | 'Field Work';
  activeHours: number;
  breakHours: number;
  idleHours: number;
  location: string;
  manualOverrideBy?: string;
  notes?: string;
}

export interface DailyWorkReport {
  id: string;
  empId: string;
  empName: string;
  date: string;
  department: DepartmentType;
  tasksCompleted: string[];
  pendingTasks: string[];
  filesUploadedCount: number;
  hoursWorked: number;
  managerRating?: number; // 1 to 5
  managerReviewNotes?: string;
  submittedAt: string;
}

export interface CloudFolder {
  id: string;
  projectId: string;
  name: string; // e.g. "01_RAW_Photos", "03_Edited_Photos"
  path: string;
  fileCount: number;
  sizeBytes: number;
}

export interface CloudFile {
  id: string;
  projectId: string;
  folderId: string;
  fileName: string;
  fileType: 'image' | 'video' | 'raw' | 'pdf' | 'zip';
  sizeFormatted: string;
  version: number;
  uploadedBy: string;
  uploadedAt: string;
  thumbnailUrl?: string;
  downloadUrl: string;
  isWatermarked: boolean;
}

export interface DeletionRequest {
  id: string;
  fileId: string;
  fileName: string;
  projectId: string;
  requestedBy: string;
  requestedAt: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  handledBy?: string;
}

export interface ClientDownloadLog {
  id: string;
  projectId: string;
  clientName: string;
  downloadedAt: string;
  fileName: string;
  ipAddress: string;
  device: string;
  downloadCount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId: string;
  clientName: string;
  clientEmail: string;
  clientGst?: string;
  issueDate: string;
  dueDate: string;
  items: { description: string; amount: number }[];
  subtotal: number;
  gstPercent: number;
  gstAmount: number;
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
  paymentStatus: 'Unpaid' | 'Partial' | 'Paid';
  paymentMode?: 'UPI' | 'Bank Transfer' | 'Cash' | 'Credit Card';
}

export interface Expense {
  id: string;
  category: 'Office Rent' | 'Electricity & Internet' | 'Fuel & Travel' | 'Food' | 'Equipment Maintenance' | 'Software & Cloud' | 'Salary' | 'Miscellaneous';
  description: string;
  amount: number;
  date: string;
  branch: BranchLocation;
  paidBy: string;
  receiptRef?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: RoleType;
  action: string;
  category: 'Authentication' | 'Attendance' | 'CRM' | 'Project' | 'File System' | 'Finance' | 'Permissions';
  details: string;
  ip: string;
}

export interface SubscriptionInfo {
  tier: 'Basic' | 'Standard' | 'Premium' | 'Pro Max';
  planName?: string;
  amount?: number;
  billingCycle: 'Monthly' | 'Yearly';
  renewalDate: string;
  storageUsedGB: number;
  storageLimitGB: number;
  userCount: number;
  userLimit: number;
  status: 'Active' | 'Due Soon' | 'Expired';
}

export interface DriveStoragePlan {
  id: string;
  name: string;
  capacityGB: number;
  monthlyPrice: number;
  isTrial?: boolean;
  isCustom?: boolean;
  features?: string[];
}

export interface DriveTaxInvoice {
  id: string;
  invoiceNumber: string;
  planId: string;
  planName: string;
  capacityGB: number;
  billingCycle: 'Monthly' | 'Yearly';
  subtotal: number;
  gstPercent: number;
  gstAmount: number;
  totalAmount: number;
  issuedDate: string;
  paymentMode: 'Credit/Debit Card' | 'Net Banking' | 'UPI AutoPay' | 'NEFT/RTGS';
  status: 'Paid';
  companyName: string;
  gstin: string;
}

export interface DriveSubscriptionState {
  currentPlanId: string;
  planName: string;
  capacityGB: number;
  usedGB: number;
  billingCycle: 'Monthly' | 'Yearly';
  renewalDate: string;
  status: 'Active' | 'Near Capacity' | 'Limit Exceeded';
  invoices: DriveTaxInvoice[];
}
