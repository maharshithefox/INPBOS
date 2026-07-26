import { DriveStoragePlan, DriveSubscriptionState } from '../types/pbos';

export const INPBOS_DRIVE_PLANS: DriveStoragePlan[] = [
  {
    id: 'plan-10gb',
    name: '10 GB Trial',
    capacityGB: 10,
    monthlyPrice: 0,
    isTrial: true,
    features: ['Single-project trial', 'Basic file sharing', 'Standard speed']
  },
  {
    id: 'plan-50gb',
    name: '50 GB Plan',
    capacityGB: 50,
    monthlyPrice: 199,
    features: ['Small studio projects', 'RAW photo ingestion', '24/7 File viewing']
  },
  {
    id: 'plan-100gb',
    name: '100 GB Plan',
    capacityGB: 100,
    monthlyPrice: 399,
    features: ['Ideal for boutique photographers', 'Full client portal streaming', 'Automated version control']
  },
  {
    id: 'plan-250gb',
    name: '250 GB Plan',
    capacityGB: 250,
    monthlyPrice: 999,
    features: ['High-res RAW preservation', 'Fast multi-user uploads', 'Encrypted cloud backup']
  },
  {
    id: 'plan-500gb',
    name: '500 GB Plan',
    capacityGB: 500,
    monthlyPrice: 1999,
    features: ['Multiple active wedding projects', '4K video proxy storage', 'Dedicated workspace bucket']
  },
  {
    id: 'plan-1tb',
    name: '1 TB Plan',
    capacityGB: 1000,
    monthlyPrice: 3000,
    features: ['1,000 GB dedicated storage', '4K master video delivery', 'Immutable audit trails']
  },
  {
    id: 'plan-2tb',
    name: '2 TB Plan',
    capacityGB: 2000,
    monthlyPrice: 4999,
    features: ['2,000 GB high-speed vault', 'Unlimited client downloads', 'Multi-editor sync']
  },
  {
    id: 'plan-5tb',
    name: '5 TB Plan',
    capacityGB: 5000,
    monthlyPrice: 9999,
    features: ['5,000 GB studio capacity', 'Priority bandwidth', 'Custom watermark rendering']
  },
  {
    id: 'plan-10tb',
    name: '10 TB Plan',
    capacityGB: 10000,
    monthlyPrice: 20999,
    features: ['10,000 GB massive vault', 'Maximum speed ingress/egress', 'Dedicated account manager']
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise Custom Storage',
    capacityGB: 20000,
    monthlyPrice: -1,
    isCustom: true,
    features: [
      'Custom Storage Capacity (> 10 TB)',
      'Dedicated Pricing & Terms',
      'Priority 24/7 VIP Support',
      'Enterprise SLA (99.99% Uptime)',
      'Optional Dedicated Infrastructure',
      'Multi-Region Backup',
      'Custom Integrations & API Access'
    ]
  }
];

export const INITIAL_DRIVE_SUBSCRIPTION: DriveSubscriptionState = {
  currentPlanId: 'plan-5tb',
  planName: '5 TB Plan',
  capacityGB: 5000,
  usedGB: 1840,
  billingCycle: 'Yearly',
  renewalDate: '2027-08-15',
  status: 'Active',
  invoices: [
    {
      id: 'inv-drive-2026-001',
      invoiceNumber: 'INV-DRIVE-2026-881',
      planId: 'plan-5tb',
      planName: '5 TB Plan',
      capacityGB: 5000,
      billingCycle: 'Yearly',
      subtotal: 107989, // ₹9,999 * 12 with yearly discount
      gstPercent: 18,
      gstAmount: 19438,
      totalAmount: 127427,
      issuedDate: '2026-08-15',
      paymentMode: 'Net Banking',
      status: 'Paid',
      companyName: 'INPBOS International Pvt. Ltd.',
      gstin: '29ABCDE1234F1Z5'
    },
    {
      id: 'inv-drive-2025-002',
      invoiceNumber: 'INV-DRIVE-2025-412',
      planId: 'plan-2tb',
      planName: '2 TB Plan',
      capacityGB: 2000,
      billingCycle: 'Monthly',
      subtotal: 4999,
      gstPercent: 18,
      gstAmount: 900,
      totalAmount: 5899,
      issuedDate: '2025-08-15',
      paymentMode: 'UPI AutoPay',
      status: 'Paid',
      companyName: 'INPBOS International Pvt. Ltd.',
      gstin: '29ABCDE1234F1Z5'
    }
  ]
};
