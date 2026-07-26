import { 
  Employee, 
  Lead, 
  PBOSProject, 
  AttendanceRecord, 
  Invoice, 
  Expense, 
  AuditLog, 
  CloudFile, 
  CloudFolder,
  DailyWorkReport,
  SubscriptionInfo,
  ClientDownloadLog
} from '../types/pbos';

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    empId: 'PBOS-001',
    name: 'Vikram Million',
    email: 'vikram@millionsphoto.com',
    phone: '+91 98765 43210',
    department: 'Executive',
    designation: 'Managing Director & Founder',
    role: 'Company Head',
    branch: 'Bangalore (HQ)',
    joiningDate: '2019-01-15',
    salary: 150000,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    emergencyContact: '+91 98765 00001',
    status: 'Active',
    todayStatus: 'Online',
    todayClockIn: '08:45 AM',
    permissions: { canUploadFiles: true, canDeleteFiles: true, canApproveDeliverables: true, canEditFinance: true, canCreateProject: true, canOverrideAttendance: true }
  },
  {
    id: 'emp-2',
    empId: 'PBOS-002',
    name: 'Priya Sharma',
    email: 'priya.hr@millionsphoto.com',
    phone: '+91 98765 43211',
    department: 'HR',
    designation: 'Lead HR Manager',
    role: 'HR Manager',
    branch: 'Bangalore (HQ)',
    joiningDate: '2020-03-01',
    salary: 65000,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    emergencyContact: '+91 98765 00002',
    status: 'Active',
    todayStatus: 'Online',
    todayClockIn: '09:00 AM',
    permissions: { canUploadFiles: true, canDeleteFiles: false, canApproveDeliverables: false, canEditFinance: false, canCreateProject: false, canOverrideAttendance: true }
  },
  {
    id: 'emp-3',
    empId: 'PBOS-003',
    name: 'Rahul Verma',
    email: 'rahul.crm@millionsphoto.com',
    phone: '+91 98765 43212',
    department: 'CRM',
    designation: 'Senior CRM Lead',
    role: 'CRM Executive',
    branch: 'Bangalore (HQ)',
    joiningDate: '2021-06-10',
    salary: 50000,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    emergencyContact: '+91 98765 00003',
    status: 'Active',
    todayStatus: 'Online',
    todayClockIn: '09:12 AM',
    permissions: { canUploadFiles: true, canDeleteFiles: false, canApproveDeliverables: true, canEditFinance: false, canCreateProject: true, canOverrideAttendance: false }
  },
  {
    id: 'emp-4',
    empId: 'PBOS-004',
    name: 'Anish Nambiar',
    email: 'anish.sales@millionsphoto.com',
    phone: '+91 98765 43213',
    department: 'Sales',
    designation: 'Sales Lead',
    role: 'Sales Executive',
    branch: 'Bangalore (HQ)',
    joiningDate: '2021-08-01',
    salary: 55000,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    emergencyContact: '+91 98765 00004',
    status: 'Active',
    todayStatus: 'Online',
    todayClockIn: '09:05 AM',
    permissions: { canUploadFiles: true, canDeleteFiles: false, canApproveDeliverables: true, canEditFinance: false, canCreateProject: true, canOverrideAttendance: false }
  },
  {
    id: 'emp-5',
    empId: 'PBOS-005',
    name: 'Karthik Raja',
    email: 'karthik.ops@millionsphoto.com',
    phone: '+91 98765 43214',
    department: 'Operations',
    designation: 'Chief Operations Officer',
    role: 'Operations Manager',
    branch: 'Bangalore (HQ)',
    joiningDate: '2020-01-10',
    salary: 75000,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    emergencyContact: '+91 98765 00005',
    status: 'Active',
    todayStatus: 'Online',
    todayClockIn: '08:50 AM',
    permissions: { canUploadFiles: true, canDeleteFiles: true, canApproveDeliverables: true, canEditFinance: false, canCreateProject: true, canOverrideAttendance: false }
  },
  {
    id: 'emp-6',
    empId: 'PBOS-006',
    name: 'Siddharth Rao',
    email: 'siddharth.photo@millionsphoto.com',
    phone: '+91 98765 43215',
    department: 'Photography',
    designation: 'Senior Candid Photographer',
    role: 'Photographer',
    branch: 'Bangalore (HQ)',
    joiningDate: '2022-02-15',
    salary: 48000,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    emergencyContact: '+91 98765 00006',
    status: 'Active',
    todayStatus: 'Field Work',
    todayClockIn: '07:30 AM',
    permissions: { canUploadFiles: true, canDeleteFiles: false, canApproveDeliverables: false, canEditFinance: false, canCreateProject: false, canOverrideAttendance: false }
  },
  {
    id: 'emp-7',
    empId: 'PBOS-007',
    name: 'Deepak Kumar',
    email: 'deepak.video@millionsphoto.com',
    phone: '+91 98765 43216',
    department: 'Videography',
    designation: 'Lead Cinematographer',
    role: 'Videographer',
    branch: 'Bangalore (HQ)',
    joiningDate: '2022-05-01',
    salary: 52000,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
    emergencyContact: '+91 98765 00007',
    status: 'Active',
    todayStatus: 'Field Work',
    todayClockIn: '07:30 AM',
    permissions: { canUploadFiles: true, canDeleteFiles: false, canApproveDeliverables: false, canEditFinance: false, canCreateProject: false, canOverrideAttendance: false }
  },
  {
    id: 'emp-8',
    empId: 'PBOS-008',
    name: 'Neha Gupta',
    email: 'neha.editor@millionsphoto.com',
    phone: '+91 98765 43217',
    department: 'Post-Production',
    designation: 'Senior Video & Color Editor',
    role: 'Editor',
    branch: 'Bangalore (HQ)',
    joiningDate: '2021-11-20',
    salary: 45000,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    emergencyContact: '+91 98765 00008',
    status: 'Active',
    todayStatus: 'Online',
    todayClockIn: '09:30 AM',
    permissions: { canUploadFiles: true, canDeleteFiles: false, canApproveDeliverables: true, canEditFinance: false, canCreateProject: false, canOverrideAttendance: false }
  },
  {
    id: 'emp-9',
    empId: 'PBOS-009',
    name: 'Manish Hegde',
    email: 'manish.album@millionsphoto.com',
    phone: '+91 98765 43218',
    department: 'Album & Print',
    designation: 'Lead Album Designer',
    role: 'Album Designer',
    branch: 'Bangalore (HQ)',
    joiningDate: '2023-01-10',
    salary: 42000,
    avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&q=80&w=200',
    emergencyContact: '+91 98765 00009',
    status: 'Active',
    todayStatus: 'Online',
    todayClockIn: '09:15 AM',
    permissions: { canUploadFiles: true, canDeleteFiles: false, canApproveDeliverables: true, canEditFinance: false, canCreateProject: false, canOverrideAttendance: false }
  },
  {
    id: 'emp-10',
    empId: 'PBOS-010',
    name: 'Rohan Deshmukh',
    email: 'rohan.acc@millionsphoto.com',
    phone: '+91 98765 43219',
    department: 'Accounts',
    designation: 'Finance & Tax Accountant',
    role: 'Accounts Manager',
    branch: 'Bangalore (HQ)',
    joiningDate: '2021-04-12',
    salary: 60000,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200',
    emergencyContact: '+91 98765 00010',
    status: 'Active',
    todayStatus: 'Online',
    todayClockIn: '09:00 AM',
    permissions: { canUploadFiles: true, canDeleteFiles: false, canApproveDeliverables: false, canEditFinance: true, canCreateProject: false, canOverrideAttendance: false }
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-101',
    clientName: 'Aarav & Ananya',
    phone: '+91 98111 22334',
    email: 'aarav.wedding2026@gmail.com',
    category: 'Wedding & Marriage',
    eventType: 'Destination Wedding',
    fromDate: '2026-12-15',
    toDate: '2026-12-17',
    venue: 'Palace Grounds, Bangalore',
    budgetEstimate: 350000,
    status: 'Confirmed',
    branch: 'Bangalore (HQ)',
    assignedSalesPerson: 'Anish Nambiar',
    notes: 'Requires 4K Drone, Cinematic Teaser, 2 Candid Photographers, 30s Instagram Reel.',
    createdAt: '2026-06-10',
    updatedAt: '2026-06-12'
  },
  {
    id: 'lead-102',
    clientName: 'Zenith Tech Solutions',
    phone: '+91 98222 33445',
    email: 'events@zenithtech.io',
    category: 'Corporate Events',
    eventType: 'Product Launch',
    fromDate: '2026-08-05',
    toDate: '2026-08-06',
    venue: 'JW Marriott, Bangalore',
    budgetEstimate: 180000,
    status: 'Quotation Sent',
    branch: 'Bangalore (HQ)',
    assignedSalesPerson: 'Anish Nambiar',
    notes: 'Keynote speech video, executive headshots, press kit photo delivery within 24h.',
    createdAt: '2026-07-20',
    updatedAt: '2026-07-22'
  },
  {
    id: 'lead-103',
    clientName: 'Dr. Meera Patel',
    phone: '+91 98333 44556',
    email: 'meera.patel@patelclinic.com',
    category: 'Baby & Family',
    eventType: 'First Birthday',
    fromDate: '2026-08-12',
    toDate: '2026-08-12',
    venue: 'The Leela Palace, Mysuru',
    budgetEstimate: 75000,
    status: 'Contacted',
    branch: 'Mysore Branch',
    assignedSalesPerson: 'Rahul Verma',
    notes: 'Cake smash photography theme: Jungle Safari. Needs 20 page mini photo album.',
    createdAt: '2026-07-24',
    updatedAt: '2026-07-25'
  }
];

export const INITIAL_PROJECTS: PBOSProject[] = [
  {
    id: 'proj-1',
    projectCode: 'PBOS-2026-001',
    clientName: 'Aarav & Ananya',
    clientPhone: '+91 98111 22334',
    clientEmail: 'aarav.wedding2026@gmail.com',
    category: 'Wedding & Marriage',
    eventType: 'Destination Wedding',
    eventDate: '2026-12-15',
    venue: 'Palace Grounds, Bangalore',
    branch: 'Bangalore (HQ)',
    totalBudget: 350000,
    advancePaid: 150000,
    balanceDue: 200000,
    stage: 'Editing & Color Grading',
    progressPercent: 65,
    team: {
      photographers: ['Siddharth Rao', 'Vikram Million'],
      videographers: ['Deepak Kumar'],
      droneOperators: ['Deepak Kumar'],
      editors: ['Neha Gupta'],
      albumDesigners: ['Manish Hegde'],
      deliveryAgent: 'Karthik Raja',
      equipmentAssigned: ['Sony A7IV x2', 'Sony FX3 Cinema', 'DJI Mavic 3 Pro', 'Godox AD600 Pro x2', 'Ronin RS3 Gimbal']
    },
    requirements: {
      specialMoments: ['Grand Bride Entry with Cold Pyros', 'Varmala Firework Sparklers', 'Mangalsutra Close-up Shot', 'Emotional Bidaai Moment'],
      hasDrone: true,
      hasSlowMotion: true,
      isTraditionalVideo: true,
      isCinematicFilm: true,
      requiresInterviews: true,
      familyPhotoChecklist: ['Parents with Couple', 'Groom Siblings', 'Bride Childhood Friends', 'Extended Family Stage Shot'],
      shootingStyle: 'Cinematic',
      musicPreferences: ['Acoustic Instrumental', 'Royal Sangeet Beats', 'Kesha Folk Soft Tone'],
      moodboardLinks: ['https://instagram.com/wedding_ref1', 'https://pinterest.com/pin/wedding_moodboard'],
      deliverablesList: [
        { id: 'del-1', title: 'Wedding Teaser Film (60s Reel)', type: 'Reel', status: 'Completed', assignee: 'Neha Gupta' },
        { id: 'del-2', title: 'Main Cinematic Film (7 mins)', type: 'Video', status: 'In Progress', assignee: 'Neha Gupta' },
        { id: 'del-3', title: '40-Page Flush Mount Leather Album', type: 'Album', status: 'In Progress', assignee: 'Manish Hegde' },
        { id: 'del-4', title: 'RAW Photo & Video Backup Hard Drive', type: 'RAW', status: 'Completed', assignee: 'Karthik Raja' }
      ]
    },
    qcPassed: false,
    qcNotes: 'Video color grading looks rich. Audio clean. Photo selection pending client final approval.',
    portalLink: 'https://millionsphoto.pbos.app/client/p/PBOS-2026-001',
    portalPin: '884210',
    portalExpiry: '2027-01-15',
    createdAt: '2026-06-12'
  },
  {
    id: 'proj-2',
    projectCode: 'PBOS-2026-002',
    clientName: 'Siddharth & Rashmi',
    clientPhone: '+91 98444 55667',
    clientEmail: 'rashmi.siddharth@outlook.com',
    category: 'Wedding & Marriage',
    eventType: 'Pre-Wedding Shoot',
    eventDate: '2026-07-10',
    venue: 'Nandi Hills & Grover Vineyards, Bangalore',
    branch: 'Bangalore (HQ)',
    totalBudget: 95000,
    advancePaid: 95000,
    balanceDue: 0,
    stage: 'Digital Delivery',
    progressPercent: 100,
    team: {
      photographers: ['Siddharth Rao'],
      videographers: ['Deepak Kumar'],
      droneOperators: ['Deepak Kumar'],
      editors: ['Neha Gupta'],
      albumDesigners: ['Manish Hegde'],
      deliveryAgent: 'Karthik Raja',
      equipmentAssigned: ['Sony A7IV', 'DJI Mini 3 Pro', '50mm f1.2 GM', '35mm f1.4 GM']
    },
    requirements: {
      specialMoments: ['Sunrise Golden Hour Embrace', 'Vineyard Walk Hand-in-Hand'],
      hasDrone: true,
      hasSlowMotion: true,
      isTraditionalVideo: false,
      isCinematicFilm: true,
      requiresInterviews: false,
      familyPhotoChecklist: ['Couple Only'],
      shootingStyle: 'High Fashion',
      musicPreferences: ['Acoustic Indie Pop'],
      moodboardLinks: ['https://pinterest.com/pin/prewedding_nandi'],
      deliverablesList: [
        { id: 'del-201', title: 'Pre-Wedding High-Res 50 Edited Photos', type: 'Photos', status: 'Completed', assignee: 'Siddharth Rao' },
        { id: 'del-202', title: 'Save the Date 2-Min Film', type: 'Video', status: 'Completed', assignee: 'Neha Gupta' }
      ]
    },
    qcPassed: true,
    qcNotes: 'Fully approved and delivered to client portal.',
    portalLink: 'https://millionsphoto.pbos.app/client/p/PBOS-2026-002',
    portalPin: '412903',
    portalExpiry: '2026-10-10',
    createdAt: '2026-06-20'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att-1', empId: 'PBOS-001', empName: 'Vikram Million', date: '2026-07-25', clockIn: '08:45 AM', status: 'Present', activeHours: 8.2, breakHours: 0.5, idleHours: 0.2, location: 'HQ Office' },
  { id: 'att-2', empId: 'PBOS-002', empName: 'Priya Sharma', date: '2026-07-25', clockIn: '09:00 AM', status: 'Present', activeHours: 7.8, breakHours: 0.8, idleHours: 0.3, location: 'HQ Office' },
  { id: 'att-3', empId: 'PBOS-003', empName: 'Rahul Verma', date: '2026-07-25', clockIn: '09:12 AM', status: 'Late', activeHours: 7.2, breakHours: 0.7, idleHours: 0.4, location: 'HQ Office' },
  { id: 'att-4', empId: 'PBOS-006', empName: 'Siddharth Rao', date: '2026-07-25', clockIn: '07:30 AM', status: 'Field Work', activeHours: 9.5, breakHours: 1.0, idleHours: 0.0, location: 'Palace Grounds Shoot' },
  { id: 'att-5', empId: 'PBOS-008', empName: 'Neha Gupta', date: '2026-07-25', clockIn: '09:30 AM', status: 'Present', activeHours: 7.5, breakHours: 0.5, idleHours: 0.1, location: 'HQ Editing Suite' }
];

export const INITIAL_DAILY_REPORTS: DailyWorkReport[] = [
  {
    id: 'dwr-1',
    empId: 'PBOS-008',
    empName: 'Neha Gupta',
    date: '2026-07-25',
    department: 'Post-Production',
    tasksCompleted: [
      'Completed Color Grading for Aarav & Ananya Wedding Teaser Reel (60s)',
      'Exported 4K Master Video File and uploaded to project storage',
      'Edited 15 High-res Candid Portraits for Pre-Wedding project'
    ],
    pendingTasks: [
      'Full 7-minute Cinematic Film audio mixing',
      'Client feedback updates for Project PBOS-2026-001'
    ],
    filesUploadedCount: 18,
    hoursWorked: 8.5,
    managerRating: 5,
    managerReviewNotes: 'Outstanding color work on the wedding reel. Approved.',
    submittedAt: '06:15 PM'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1001',
    invoiceNumber: 'INV-2026-001',
    projectId: 'proj-1',
    clientName: 'Aarav & Ananya',
    clientEmail: 'aarav.wedding2026@gmail.com',
    clientGst: '29ABCDE1234F1Z5',
    issueDate: '2026-06-12',
    dueDate: '2026-12-01',
    items: [
      { description: 'Destination Wedding 3-Day Photography & Cinematography Package', amount: 300000 },
      { description: 'Aerial Drone Coverage 4K', amount: 30000 },
      { description: 'Exclusive Leather Flush Mount Album (40 pages)', amount: 20000 }
    ],
    subtotal: 350000,
    gstPercent: 18,
    gstAmount: 63000,
    totalAmount: 413000,
    amountPaid: 177000, // advance incl GST
    balanceDue: 236000,
    paymentStatus: 'Partial',
    paymentMode: 'Bank Transfer'
  }
];

export const INITIAL_EXPENSES: Expense[] = [
  { id: 'exp-1', category: 'Office Rent', description: 'HQ Office Monthly Rent Bangalore', amount: 85000, date: '2026-07-01', branch: 'Bangalore (HQ)', paidBy: 'Rohan Deshmukh' },
  { id: 'exp-2', category: 'Equipment Maintenance', description: 'Sensor Cleaning & Lens Calibration - Sony Service Center', amount: 14500, date: '2026-07-15', branch: 'Bangalore (HQ)', paidBy: 'Karthik Raja' },
  { id: 'exp-3', category: 'Software & Cloud', description: 'PBOS Cloud Storage & Adobe Creative Cloud Enterprise', amount: 22000, date: '2026-07-10', branch: 'Bangalore (HQ)', paidBy: 'Rohan Deshmukh' },
  { id: 'exp-4', category: 'Fuel & Travel', description: 'Outstation Shoot Travel & Cab Allowance', amount: 9800, date: '2026-07-22', branch: 'Bangalore (HQ)', paidBy: 'Siddharth Rao' }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  { id: 'log-1', timestamp: '2026-07-25 08:45:12', user: 'Vikram Million', role: 'Company Head', action: 'Employee Login', category: 'Authentication', details: 'Successful login from HQ Office IP (106.51.22.14)', ip: '106.51.22.14' },
  { id: 'log-2', timestamp: '2026-07-25 09:32:00', user: 'Neha Gupta', role: 'Editor', action: 'File Upload', category: 'File System', details: 'Uploaded 18 edited color files to PBOS-2026-001/03_Edited_Photos', ip: '106.51.22.18' },
  { id: 'log-3', timestamp: '2026-07-25 10:15:45', user: 'Anish Nambiar', role: 'Sales Executive', action: 'Lead Created', category: 'CRM', details: 'Created new lead Zenith Tech Solutions for Corporate Launch', ip: '106.51.22.19' },
  { id: 'log-4', timestamp: '2026-07-25 11:40:10', user: 'Client: Aarav & Ananya', role: 'Client', action: 'Client Portal Download', category: 'File System', details: 'Client accessed portal with PIN 884210 and downloaded Wedding_Teaser_60s_4K.mp4', ip: '157.33.89.102' }
];

export const INITIAL_SUBSCRIPTION: SubscriptionInfo = {
  tier: 'Pro Max',
  planName: 'Standard Growth Plan',
  amount: 3999,
  billingCycle: 'Yearly',
  renewalDate: '2027-01-01',
  storageUsedGB: 1840,
  storageLimitGB: 5000,
  userCount: 10,
  userLimit: 50,
  status: 'Active'
};

export const INITIAL_CLOUD_FOLDERS: CloudFolder[] = [
  { id: 'fld-1', projectId: 'proj-1', name: '01_RAW_Photos', path: '/PBOS-2026-001/01_RAW_Photos', fileCount: 1420, sizeBytes: 128000000000 },
  { id: 'fld-2', projectId: 'proj-1', name: '02_RAW_Videos', path: '/PBOS-2026-001/02_RAW_Videos', fileCount: 85, sizeBytes: 340000000000 },
  { id: 'fld-3', projectId: 'proj-1', name: '03_Edited_Photos', path: '/PBOS-2026-001/03_Edited_Photos', fileCount: 210, sizeBytes: 8500000000 },
  { id: 'fld-4', projectId: 'proj-1', name: '04_Video_Cuts', path: '/PBOS-2026-001/04_Video_Cuts', fileCount: 6, sizeBytes: 24000000000 },
  { id: 'fld-5', projectId: 'proj-1', name: '05_Album_Layouts', path: '/PBOS-2026-001/05_Album_Layouts', fileCount: 40, sizeBytes: 3200000000 },
  { id: 'fld-6', projectId: 'proj-1', name: '06_Final_Deliverables', path: '/PBOS-2026-001/06_Final_Deliverables', fileCount: 4, sizeBytes: 12000000000 }
];

export const INITIAL_CLOUD_FILES: CloudFile[] = [
  {
    id: 'file-101',
    projectId: 'proj-1',
    folderId: 'fld-6',
    fileName: 'Aarav_Ananya_Wedding_Teaser_60s_4K.mp4',
    fileType: 'video',
    sizeFormatted: '1.4 GB',
    version: 2,
    uploadedBy: 'Neha Gupta',
    uploadedAt: '2026-07-24 04:30 PM',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400',
    downloadUrl: '#',
    isWatermarked: false
  },
  {
    id: 'file-102',
    projectId: 'proj-1',
    folderId: 'fld-3',
    fileName: 'Bride_Varmala_Candid_Master_01.jpg',
    fileType: 'image',
    sizeFormatted: '24 MB',
    version: 1,
    uploadedBy: 'Siddharth Rao',
    uploadedAt: '2026-07-23 11:15 AM',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400',
    downloadUrl: '#',
    isWatermarked: true
  },
  {
    id: 'file-103',
    projectId: 'proj-1',
    folderId: 'fld-5',
    fileName: 'Album_Spread_Sheets_Design_Draft_v3.pdf',
    fileType: 'pdf',
    sizeFormatted: '180 MB',
    version: 3,
    uploadedBy: 'Manish Hegde',
    uploadedAt: '2026-07-25 02:00 PM',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400',
    downloadUrl: '#',
    isWatermarked: true
  }
];

export const INITIAL_DOWNLOAD_LOGS: ClientDownloadLog[] = [
  { id: 'dl-1', projectId: 'proj-1', clientName: 'Aarav & Ananya', downloadedAt: '2026-07-25 11:40:10', fileName: 'Aarav_Ananya_Wedding_Teaser_60s_4K.mp4', ipAddress: '157.33.89.102', device: 'Chrome / macOS', downloadCount: 3 },
  { id: 'dl-2', projectId: 'proj-2', clientName: 'Siddharth & Rashmi', downloadedAt: '2026-07-22 09:15:30', fileName: 'PreWedding_50_Edited_Photos_HighRes.zip', ipAddress: '122.172.85.44', device: 'Safari / iPhone', downloadCount: 1 }
];
