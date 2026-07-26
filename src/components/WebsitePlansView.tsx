import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  Zap, 
  Crown, 
  ShieldCheck, 
  Building2, 
  HardDrive, 
  Users, 
  CalendarDays, 
  Receipt, 
  Bot, 
  ArrowRight, 
  Search, 
  HelpCircle, 
  Star, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  Sliders,
  DollarSign
} from 'lucide-react';
import { SubscriptionInfo } from '../types/pbos';

interface WebsitePlansViewProps {
  subscription: SubscriptionInfo;
  onUpdatePlan: (planId: string, planName: string, price: number) => void;
  onNavigateToTab: (tabId: string) => void;
  onOpenContactUs?: () => void;
}

export interface SystemPlan {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  monthlyPrice: number;
  annualPriceMonthly: number;
  description: string;
  targetAudience: string;
  branchesAllowed: string;
  storageGB: number;
  leadsLimit: string;
  features: { title: string; included: boolean }[];
  highlightColor: string;
  btnBg: string;
}

export const WEBSITE_PLANS: SystemPlan[] = [
  {
    id: 'basic',
    name: 'Basic Starter Plan',
    badge: 'Solo & Freelancer',
    monthlyPrice: 1499,
    annualPriceMonthly: 1199,
    description: 'Essential client CRM and quotation tools for solo wedding photographers. INPBOS Drive Cloud storage is billed separately per company requirements.',
    targetAudience: 'Solo Photographers, Freelancers & Single Shooters',
    branchesAllowed: '1 Studio Branch',
    storageGB: 0,
    leadsLimit: '50 Active Leads / mo',
    highlightColor: 'border-slate-200 bg-white',
    btnBg: 'bg-slate-900 hover:bg-slate-800 text-white',
    features: [
      { title: '1 Studio Branch Management', included: true },
      { title: 'Up to 50 Active CRM Inquiries / Mo', included: true },
      { title: 'INPBOS Drive Storage: Separately Billed Add-On (Not included in pack, charged per company volume requirement)', included: true },
      { title: 'Instant Professional Quotation Builder', included: true },
      { title: 'Shoot & Booking Calendar', included: true },
      { title: 'Client Password Portal', included: true },
      { title: 'Automated 18% GST Invoices', included: false },
      { title: 'HR, Staff Clock-In & Payroll', included: false },
      { title: 'KIMJIKOIN 24/7 AI Director Assistant', included: false },
      { title: 'Custom Domain White-Labeling', included: false }
    ]
  },
  {
    id: 'standard',
    name: 'Standard Growth Plan',
    badge: 'Most Popular Studio Choice',
    isPopular: true,
    monthlyPrice: 3999,
    annualPriceMonthly: 3199,
    description: 'Complete studio management with multi-branch calendar, automated GST invoices & client gallery portal. Drive Cloud storage billed separately.',
    targetAudience: 'Growing Photography & Film Studios with 2-5 Crew Members',
    branchesAllowed: '2 Studio Branches',
    storageGB: 0,
    leadsLimit: 'Unlimited CRM Inquiries',
    highlightColor: 'border-sky-500 bg-sky-50/20 shadow-xl ring-2 ring-sky-500/20',
    btnBg: 'bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20',
    features: [
      { title: '2 Studio Branches Management', included: true },
      { title: 'Unlimited Active CRM Inquiries', included: true },
      { title: 'INPBOS Drive Storage: Separately Billed Add-On (Choose 100 GB to 100 TB as needed)', included: true },
      { title: 'Instant Quotations & 18% GST Invoicing', included: true },
      { title: 'Shoot Calendar + Crew & Gear Checklist', included: true },
      { title: 'Client Password Portal with Pin Security', included: true },
      { title: 'Basic Expense & Income Tracker', included: true },
      { title: 'KIMJIKOIN AI Support Assistant', included: true },
      { title: 'HR & Staff Clock-In Attendance', included: false },
      { title: 'Custom Domain White-Labeling', included: false }
    ]
  },
  {
    id: 'premium',
    name: 'Premium Media Agency',
    badge: 'High-Volume Agencies',
    monthlyPrice: 7999,
    annualPriceMonthly: 6399,
    description: 'Full-suite ERP with HR attendance, monthly salary payroll, financial tax ledgers & 24/7 AI Director. Storage billed separately as per studio usage.',
    targetAudience: 'Established Production Houses, Multi-Team Agencies & Commercial Studios',
    branchesAllowed: '5 Studio Branches',
    storageGB: 0,
    leadsLimit: 'Unlimited CRM & Event Taxonomies',
    highlightColor: 'border-amber-400 bg-amber-50/10 shadow-lg',
    btnBg: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-500/20',
    features: [
      { title: '5 Studio Branches Management', included: true },
      { title: 'Unlimited CRM Inquiries & 13 Categories', included: true },
      { title: 'INPBOS Drive Storage: Separately Billed Add-On (Flexible GB/TB Tiers Billed Independently)', included: true },
      { title: 'Automated GST Tax Invoices & Itemized Quotations', included: true },
      { title: 'Multi-Crew Scheduling & Equipment Dispatch', included: true },
      { title: 'Client Portal with Download Logs & Expiry', included: true },
      { title: 'HR, Staff Clock-In & Automated Payroll', included: true },
      { title: 'GST Tax Ledgers & Profit/Loss Analytics', included: true },
      { title: 'KIMJIKOIN 24/7 AI Director & Audit Engine', included: true },
      { title: 'Custom Domain White-Labeling', included: false }
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise Network',
    badge: 'Franchise & Chains',
    monthlyPrice: 14999,
    annualPriceMonthly: 11999,
    description: 'Custom multi-city studio operating system with white-labeling & dedicated manager. Dedicated Cloud Storage is billed as an independent enterprise add-on.',
    targetAudience: 'National Photography Chains, Franchise Networks & International Agencies',
    branchesAllowed: 'Unlimited Studio Branches',
    storageGB: 0,
    leadsLimit: 'Unlimited Global Inquiries',
    highlightColor: 'border-slate-800 bg-slate-900 text-white shadow-2xl',
    btnBg: 'bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/30 font-black',
    features: [
      { title: 'Unlimited Studio Branches Nationwide', included: true },
      { title: 'Unlimited Global Inquiries & Custom Pipelines', included: true },
      { title: 'INPBOS Drive Storage: Separately Billed Add-On (Custom Dedicated Enterprise Storage Server)', included: true },
      { title: 'Full GST Tax Automation & ERP Accounting', included: true },
      { title: 'Custom Gear Checklists & Crew Dispatching', included: true },
      { title: 'Client Portal White-Labeling & Custom Subdomains', included: true },
      { title: 'Full HR, Clock-In Attendance & Salary Sheets', included: true },
      { title: 'Dedicated 24/7 AI Director Engine', included: true },
      { title: 'Custom API Integrations & Webhooks', included: true },
      { title: 'Dedicated Account Manager & Priority Phone SLA', included: true }
    ]
  }
];

export const WebsitePlansView: React.FC<WebsitePlansViewProps> = ({
  subscription,
  onUpdatePlan,
  onNavigateToTab,
  onOpenContactUs
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<SystemPlan | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const calculateGst = (amount: number) => Math.round(amount * 0.18);

  const handleSelectPlan = (plan: SystemPlan) => {
    setSelectedPlanForModal(plan);
    setCheckoutSuccess(false);
  };

  const handleConfirmSubscription = () => {
    if (!selectedPlanForModal) return;

    const price = billingCycle === 'annual' ? selectedPlanForModal.annualPriceMonthly : selectedPlanForModal.monthlyPrice;
    onUpdatePlan(selectedPlanForModal.id, selectedPlanForModal.name, price);

    setCheckoutSuccess(true);
    setTimeout(() => {
      setSelectedPlanForModal(null);
      setCheckoutSuccess(false);
    }, 1800);
  };

  // Demo lookup feature list
  const LOOKUP_FEATURES = [
    { title: 'CRM & Lead Categories', category: 'crm', basic: true, standard: true, premium: true, enterprise: true, tab: 'crm' },
    { title: 'Instant GST Quotation Builder', category: 'finance', basic: true, standard: true, premium: true, enterprise: true, tab: 'crm' },
    { title: 'Multi-Branch Studio Switching', category: 'ops', basic: false, standard: true, premium: true, enterprise: true, tab: 'dashboard' },
    { title: 'INPBOS Drive Cloud Storage', category: 'storage', basic: 'Separate Add-On', standard: 'Separate Add-On', premium: 'Separate Add-On', enterprise: 'Separate Add-On (Custom TB)', tab: 'storage' },
    { title: 'Shoot & Booking Calendar', category: 'ops', basic: true, standard: true, premium: true, enterprise: true, tab: 'bookings' },
    { title: 'Equipment & Gear Checklists', category: 'ops', basic: false, standard: true, premium: true, enterprise: true, tab: 'bookings' },
    { title: 'Client Password Portal', category: 'portal', basic: true, standard: true, premium: true, enterprise: true, tab: 'portal' },
    { title: 'Staff Attendance Clock-In', category: 'hr', basic: false, standard: false, premium: true, enterprise: true, tab: 'hr' },
    { title: 'Automated Monthly Salary Payroll', category: 'hr', basic: false, standard: false, premium: true, enterprise: true, tab: 'hr' },
    { title: 'GST Tax Ledgers & P&L Analytics', category: 'finance', basic: false, standard: false, premium: true, enterprise: true, tab: 'finance' },
    { title: 'KIMJIKOIN 24/7 AI Support & Director', category: 'ai', basic: false, standard: true, premium: true, enterprise: true, tab: 'dashboard' },
    { title: 'Client Media Download Logs', category: 'portal', basic: false, standard: true, premium: true, enterprise: true, tab: 'portal' }
  ];

  const filteredLookupFeatures = LOOKUP_FEATURES.filter(f => {
    const matchesSearch = searchQuery === '' || f.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div id="inpbos-website-plans" className="space-y-8 pb-16 max-w-[1600px] mx-auto">
      
      {/* Hero Banner & Plan Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-2xl p-6 sm:p-10 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Official INPBOS Operating System Plans</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Website & System Plans for Every Creative Photography Studio
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Scale your media business from solo wedding photography to national multi-branch production houses. Every plan comes with instant quotation generation, shoot scheduling, client gallery access, and INPBOS Drive cloud storage!
            </p>
          </div>

          {/* Quick Demo Lookup Search Input */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl max-w-md w-full shrink-0 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-sky-200">
              <span className="flex items-center gap-1.5">
                <Search className="w-4 h-4 text-amber-300" />
                <span>Instant Demo Lookup</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px]">
                Live Preview
              </span>
            </div>

            <input
              type="text"
              placeholder="Lookup feature (e.g. GST, Drive, AI, HR)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 text-white placeholder-slate-400 px-3.5 py-2 rounded-lg border border-slate-700 text-xs focus:outline-none focus:border-sky-400 font-medium"
            />

            <p className="text-[11px] text-slate-300">
              Type any feature or scroll down to test interactive system tools immediately!
            </p>
          </div>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <span>Currently Active Plan:</span>
            <strong className="text-white font-extrabold bg-sky-500/20 text-sky-300 px-2.5 py-1 rounded border border-sky-400/30">
              {subscription.planName || subscription.tier || 'Standard Growth Plan'} (₹{(subscription.amount ?? 3999).toLocaleString()}/mo)
            </strong>
          </div>

          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs font-bold">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded font-black uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Storage Policy Clarification Notice */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 border border-amber-500/30 rounded-2xl p-5 text-amber-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-bold shrink-0 mt-0.5">
            <HardDrive className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-extrabold text-white text-sm sm:text-base">
                INPBOS Drive Cloud Storage Policy
              </h4>
              <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                Separate Add-On
              </span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Cloud Storage is <strong>NOT bundled</strong> into the WebApp software subscription packages. INPBOS Drive Storage is totally separate charges as required by individual photography companies (from 100 GB to 100 TB dedicated servers).
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateToTab?.('storage')}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-xl transition-all shrink-0 text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-amber-400/20"
        >
          <HardDrive className="w-4 h-4" />
          <span>Configure Storage Add-On</span>
        </button>
      </div>

      {/* Plans Grid (Basic, Standard, Premium, Enterprise) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {WEBSITE_PLANS.map((plan) => {
          const isCurrent = (subscription.planName || subscription.tier || '').toLowerCase().includes(plan.id);
          const price = billingCycle === 'annual' ? plan.annualPriceMonthly : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all relative ${
                plan.id === 'enterprise' 
                  ? 'bg-slate-900 text-white border-slate-800 shadow-xl' 
                  : plan.isPopular
                  ? 'bg-white border-sky-500 shadow-xl ring-2 ring-sky-500/20'
                  : 'bg-white border-slate-200 text-slate-900 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Popular / Badge Banner */}
              {plan.badge && (
                <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm shrink-0 whitespace-nowrap ${
                  plan.isPopular 
                    ? 'bg-sky-600 text-white shadow-sky-600/30' 
                    : plan.id === 'enterprise'
                    ? 'bg-amber-400 text-slate-950 font-extrabold'
                    : 'bg-slate-100 text-slate-700 border border-slate-300'
                }`}>
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-black text-lg ${plan.id === 'enterprise' ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h3>
                  {isCurrent && (
                    <span className="bg-emerald-500/20 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-400/30">
                      Active
                    </span>
                  )}
                </div>

                <p className={`text-xs mb-4 min-h-[36px] ${plan.id === 'enterprise' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mb-4 pb-4 border-b border-slate-200/40">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-black font-mono">
                      ₹{price.toLocaleString()}
                    </span>
                    <span className={`text-xs ${plan.id === 'enterprise' ? 'text-slate-400' : 'text-slate-500'}`}>
                      / month
                    </span>
                  </div>
                  {billingCycle === 'annual' && (
                    <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                      Billed annually (save ₹{((plan.monthlyPrice - plan.annualPriceMonthly) * 12).toLocaleString()}/yr)
                    </span>
                  )}
                </div>

                {/* Highlights */}
                <div className="space-y-2 mb-6 text-xs">
                  <div className={`flex items-center space-x-2 font-semibold ${plan.id === 'enterprise' ? 'text-sky-300' : 'text-sky-800'}`}>
                    <Building2 className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>{plan.branchesAllowed}</span>
                  </div>
                  <div className={`flex items-center space-x-2 font-semibold ${plan.id === 'enterprise' ? 'text-sky-300' : 'text-sky-800'}`}>
                    <HardDrive className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>Drive Storage: Billed Separately (Add-On)</span>
                  </div>
                  <div className={`flex items-center space-x-2 font-semibold ${plan.id === 'enterprise' ? 'text-sky-300' : 'text-sky-800'}`}>
                    <Users className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>{plan.leadsLimit}</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 text-xs mb-6">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                        feat.included 
                          ? plan.id === 'enterprise' ? 'text-sky-400' : 'text-sky-600' 
                          : 'text-slate-300'
                      }`} />
                      <span className={
                        feat.included 
                          ? plan.id === 'enterprise' ? 'text-slate-200' : 'text-slate-800 font-medium'
                          : 'text-slate-400 line-through'
                      }>
                        {feat.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${plan.btnBg}`}
              >
                <span>{isCurrent ? 'Current Active Plan' : `Select ${plan.name}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Interactive Feature Lookup Matrix & Demo Shortcuts */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center space-x-2">
              <Search className="w-5 h-5 text-sky-600" />
              <span>Interactive Feature Lookup & System Comparison</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Look up any operational capability and test the live demo module instantly!
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All Features' },
              { id: 'crm', label: 'CRM & Leads' },
              { id: 'storage', label: 'Drive Cloud' },
              { id: 'ops', label: 'Calendar & Gear' },
              { id: 'hr', label: 'HR & Payroll' },
              { id: 'finance', label: 'Invoices & Tax' },
              { id: 'ai', label: 'KIMJIKOIN AI' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Lookup Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-200 text-slate-700 font-extrabold uppercase tracking-wider text-[11px]">
                <th className="p-3">Operational Feature</th>
                <th className="p-3 text-center">Basic Starter</th>
                <th className="p-3 text-center">Standard Growth</th>
                <th className="p-3 text-center">Premium Agency</th>
                <th className="p-3 text-center">Enterprise</th>
                <th className="p-3 text-right">Demo Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredLookupFeatures.map((feat, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-900 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>{feat.title}</span>
                  </td>

                  <td className="p-3 text-center">
                    {typeof feat.basic === 'boolean' ? (
                      feat.basic ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-slate-300">—</span>
                    ) : (
                      <span className="font-bold text-slate-700">{feat.basic}</span>
                    )}
                  </td>

                  <td className="p-3 text-center">
                    {typeof feat.standard === 'boolean' ? (
                      feat.standard ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-slate-300">—</span>
                    ) : (
                      <span className="font-bold text-slate-700">{feat.standard}</span>
                    )}
                  </td>

                  <td className="p-3 text-center">
                    {typeof feat.premium === 'boolean' ? (
                      feat.premium ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-slate-300">—</span>
                    ) : (
                      <span className="font-bold text-slate-700">{feat.premium}</span>
                    )}
                  </td>

                  <td className="p-3 text-center">
                    {typeof feat.enterprise === 'boolean' ? (
                      feat.enterprise ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-slate-300">—</span>
                    ) : (
                      <span className="font-bold text-slate-700">{feat.enterprise}</span>
                    )}
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => onNavigateToTab(feat.tab)}
                      className="bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 px-3 py-1 rounded-lg font-bold text-[11px] inline-flex items-center space-x-1 cursor-pointer transition-all"
                    >
                      <span>Demo Lookup</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Checkout / Selection Modal */}
      {selectedPlanForModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full shadow-2xl p-6 space-y-4">
            
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Confirm Plan Selection</span>
                <h3 className="text-xl font-black text-slate-900">{selectedPlanForModal.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedPlanForModal(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {checkoutSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-900 text-xs font-bold flex items-center space-x-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 animate-bounce" />
                <div>
                  <p className="text-sm font-black">Plan Activated Successfully!</p>
                  <p className="font-normal text-slate-600 mt-0.5">Your studio workspace is now upgraded to {selectedPlanForModal.name}.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Selected Billing:</span>
                    <strong className="text-slate-900 capitalize font-bold">{billingCycle} Billing</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Monthly Rate:</span>
                    <strong className="font-mono text-slate-900">
                      ₹{(billingCycle === 'annual' ? selectedPlanForModal.annualPriceMonthly : selectedPlanForModal.monthlyPrice).toLocaleString()}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">GST (18%):</span>
                    <strong className="font-mono text-slate-900">
                      ₹{calculateGst(billingCycle === 'annual' ? selectedPlanForModal.annualPriceMonthly : selectedPlanForModal.monthlyPrice).toLocaleString()}
                    </strong>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
                    <span>Total Monthly Charge:</span>
                    <span className="font-mono text-sky-700">
                      ₹{((billingCycle === 'annual' ? selectedPlanForModal.annualPriceMonthly : selectedPlanForModal.monthlyPrice) + calculateGst(billingCycle === 'annual' ? selectedPlanForModal.annualPriceMonthly : selectedPlanForModal.monthlyPrice)).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <button
                    onClick={() => setSelectedPlanForModal(null)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmSubscription}
                    className="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-extrabold py-2.5 rounded-xl text-xs shadow-md cursor-pointer"
                  >
                    Confirm & Activate
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
