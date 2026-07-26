import React, { useState } from 'react';
import { 
  Camera, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  HardDrive, 
  Sparkles, 
  ArrowUpRight, 
  Bot, 
  Calendar,
  DollarSign,
  FileText,
  MapPin,
  ChevronRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { 
  PBOSProject, 
  Employee, 
  Lead, 
  Invoice, 
  SubscriptionInfo, 
  BranchLocation 
} from '../types/pbos';

import { INITIAL_SUBSCRIPTION } from '../data/mockData';

interface DashboardViewProps {
  currentBranch: BranchLocation;
  projects?: PBOSProject[];
  employees?: Employee[];
  leads?: Lead[];
  invoices?: Invoice[];
  subscription?: SubscriptionInfo;
  onOpenProject?: (projectId: string) => void;
  onOpenAiBrain?: () => void;
  onNavigateTab?: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentBranch,
  projects = [],
  employees = [],
  leads = [],
  invoices = [],
  subscription,
  onOpenProject,
  onOpenAiBrain,
  onNavigateTab
}) => {
  const sub = subscription || INITIAL_SUBSCRIPTION;
  const [aiHealthLoading, setAiHealthLoading] = useState(false);
  const [aiHealthScore, setAiHealthScore] = useState<number>(92);
  const [aiSummary, setAiSummary] = useState<string>(
    "PBOS Operations normal across Bangalore HQ. 1 major destination wedding in editing stage. Payment follow-up needed for Project PBOS-2026-001."
  );
  const [actionItems, setActionItems] = useState<string[]>([
    "Follow up on ₹2,36,000 pending balance for Aarav & Ananya wedding before final deliverable dispatch.",
    "Verify raw backup hard drive status for today's field shoot at Palace Grounds.",
    "Review editor Neha's daily work report for Color Grading quality check."
  ]);

  // Derived metrics
  const filteredProjects = projects.filter(p => currentBranch === 'Bangalore (HQ)' || p.branch === currentBranch);
  const filteredEmployees = employees.filter(e => currentBranch === 'Bangalore (HQ)' || e.branch === currentBranch);
  const filteredLeads = leads.filter(l => currentBranch === 'Bangalore (HQ)' || l.branch === currentBranch);

  const activeProjectsCount = filteredProjects.filter(p => p.stage !== 'Archived' && p.stage !== 'Digital Delivery').length;
  const onlineEmployeesCount = filteredEmployees.filter(e => e.todayStatus === 'Online' || e.todayStatus === 'Field Work').length;
  
  const totalPendingPayments = invoices
    .filter(i => i.paymentStatus !== 'Paid')
    .reduce((sum, inv) => sum + inv.balanceDue, 0);

  const totalMonthlyRevenue = invoices
    .reduce((sum, inv) => sum + inv.amountPaid, 0);

  const runAiRiskAnalysis = async () => {
    setAiHealthLoading(true);
    try {
      const res = await fetch("/api/ai/business-health", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projects: filteredProjects,
          financeSummary: { totalPendingPayments, totalMonthlyRevenue },
          leadsCount: filteredLeads.length,
          employeeCount: filteredEmployees.length
        })
      });
      const data = await res.json();
      if (data.healthScore) setAiHealthScore(data.healthScore);
      if (data.summary) setAiSummary(data.summary);
      if (data.actionItems) setActionItems(data.actionItems);
    } catch (e) {
      console.error(e);
    } finally {
      setAiHealthLoading(false);
    }
  };

  return (
    <div id="pbos-dashboard" className="space-y-6 pb-12">
      
      {/* Top Banner & Quick Stat Grid */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 sm:p-6 rounded-xl border border-slate-800 shadow-md">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-3xl font-black tracking-tight text-white">
            INPBOS
          </h1>
          <p className="text-sky-400 text-[11px] sm:text-xs md:text-sm font-extrabold mt-1 leading-snug break-words">
            INTER NATIONAL PHOTOGRAPHY BUSINESS OPERATING SYSTEM
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={runAiRiskAnalysis}
            disabled={aiHealthLoading}
            className="bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-semibold text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-sm"
          >
            <Bot className={`w-4 h-4 text-sky-400 shrink-0 ${aiHealthLoading ? 'animate-spin' : ''}`} />
            <span>{aiHealthLoading ? 'Analyzing...' : 'Run AI Audit'}</span>
          </button>

          <button
            onClick={onOpenAiBrain}
            className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs flex items-center space-x-2 shadow-md shadow-sky-600/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>+ Ask AI Director</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Active Projects */}
        <div 
          onClick={() => onNavigateTab('bookings')}
          className="bg-white p-5 rounded-xl border border-slate-200 hover:border-sky-500/50 transition-all cursor-pointer group shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Projects</span>
            <div className="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all">
              <Camera className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900">{activeProjectsCount}</span>
            <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-sky-600 w-[65%]"></div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-sky-600 font-semibold">
            <span>1 Field Shoot Today</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Staff Online / On Shoot */}
        <div 
          onClick={() => onNavigateTab('hr')}
          className="bg-white p-5 rounded-xl border border-slate-200 hover:border-sky-500/50 transition-all cursor-pointer group shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Staff Online</span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900">{onlineEmployeesCount}<span className="text-sm font-normal text-slate-500"> / {filteredEmployees.length}</span></span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-emerald-600 font-semibold">
            <span>2 Photographers On Field</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Pending Client Payments */}
        <div 
          onClick={() => onNavigateTab('finance')}
          className="bg-white p-5 rounded-xl border border-slate-200 hover:border-amber-500/50 transition-all cursor-pointer group shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pending Revenue</span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900">₹{(totalPendingPayments / 1000).toFixed(0)}k</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-amber-600 font-semibold">
            <span>1 Overdue Invoice</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Cloud Storage Capacity */}
        <div 
          onClick={() => onNavigateTab?.('storage')}
          className="bg-white p-5 rounded-xl border border-slate-200 hover:border-sky-500/50 transition-all cursor-pointer group shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Storage Health</span>
            <div className="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all">
              <HardDrive className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900">{sub.storageUsedGB}<span className="text-sm font-normal text-slate-500"> / {sub.storageLimitGB} GB</span></span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-sky-600 font-semibold">
            <span>{((sub.storageUsedGB / sub.storageLimitGB) * 100).toFixed(0)}% Capacity Used</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

      {/* AI Business Intelligence Feature Card (Dark Navy & Sky Accent) */}
      <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-xl bg-sky-500/20 border border-sky-400/30 flex flex-col items-center justify-center shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-sky-300">Health</span>
              <span className="text-2xl font-black text-sky-400">{aiHealthScore}</span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Bot className="w-5 h-5 text-sky-400" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-sky-400">AI Intelligence & Risk Monitor</h3>
              </div>
              <p className="text-sm font-medium text-slate-200 leading-relaxed max-w-2xl">
                "{aiSummary}"
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAiBrain}
            className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shrink-0 cursor-pointer shadow-md"
          >
            <span>Ask AI Director</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Action Items List */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Priority Action Items</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {actionItems.map((item, idx) => (
              <div key={idx} className="text-xs bg-slate-800/80 p-3 rounded-lg border border-slate-700/80 text-slate-200 flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Shoots Today vs Leads Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Projects Status */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Camera className="w-5 h-5 text-sky-600" />
                <span>Project Pipeline</span>
              </h2>
              <p className="text-xs text-slate-500">Active production shoots & delivery status</p>
            </div>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded border border-slate-200">PRE-PRODUCTION</span>
              <span className="px-2 py-1 bg-sky-50 text-sky-700 text-[10px] font-bold rounded border border-sky-200">POST-PRODUCTION</span>
            </div>
          </div>

          <div className="space-y-3">
            {filteredProjects.map((p) => (
              <div 
                key={p.id}
                onClick={() => onOpenProject(p.id)}
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-sky-500 transition-all cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                        {p.clientName}
                      </span>
                      <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                        {p.projectCode}
                      </span>
                      <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded border border-sky-200">
                        {p.eventType}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-slate-500 mt-1.5">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{p.venue}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1 text-slate-700 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-sky-600" />
                        <span>{p.eventDate}</span>
                      </span>
                    </div>
                  </div>

                  <div className="text-right sm:text-right shrink-0">
                    <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200 block sm:inline-block">
                      Stage: {p.stage}
                    </span>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Balance: <span className="text-rose-600 font-bold">₹{p.balanceDue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 pt-3 border-t border-slate-200/80">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Progress</span>
                    <span className="font-bold text-sky-600">{p.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-sky-600 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${p.progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Pipeline Summary & Security Stream */}
        <div className="space-y-6">
          
          {/* Recent Leads */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Users className="w-5 h-5 text-sky-600" />
                <span>Recent Inquiries</span>
              </h2>
              <button
                onClick={() => onNavigateTab('crm')}
                className="text-xs text-sky-600 font-bold hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <span>Pipeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {filteredLeads.map(lead => (
                <div key={lead.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{lead.clientName}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      lead.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      lead.status === 'Quotation Sent' ? 'bg-sky-100 text-sky-800 border border-sky-200' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                    <span>{lead.eventType}</span>
                    <span className="text-slate-900 font-semibold">Est: ₹{lead.budgetEstimate.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Audit Stream */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Activity Log</span>
              </h2>
              <button 
                onClick={() => onNavigateTab('admin')}
                className="text-[11px] text-sky-600 font-bold hover:underline"
              >
                Audit Trail
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-600">
                <span className="text-emerald-600 font-mono text-[10px] font-bold">11:40 AM</span> • Client downloaded 4K Teaser Video.
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-600">
                <span className="text-sky-600 font-mono text-[10px] font-bold">09:32 AM</span> • Editor Neha uploaded 18 color graded files.
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
