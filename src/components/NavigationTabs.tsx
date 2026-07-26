import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarDays, 
  Kanban, 
  UserPlus, 
  HardDrive, 
  ExternalLink, 
  Receipt, 
  ShieldCheck,
  Headphones,
  Globe,
  Zap
} from 'lucide-react';

export type ActiveTab = 
  | 'plans'
  | 'dashboard' 
  | 'crm' 
  | 'bookings' 
  | 'production' 
  | 'employees' 
  | 'storage' 
  | 'client-portal' 
  | 'finance' 
  | 'audit-logs';

export interface NavigationTabsProps {
  activeTab: string;
  onSelectTab?: (tab: string) => void;
  setActiveTab?: (tab: ActiveTab) => void;
  pendingDeliveriesCount?: number;
  pendingPaymentsCount?: number;
  unreadLogsCount?: number;
  onOpenContactUs?: () => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onSelectTab,
  setActiveTab,
  pendingDeliveriesCount = 0,
  pendingPaymentsCount = 0,
  unreadLogsCount = 0,
  onOpenContactUs
}) => {
  const handleTabClick = (id: string) => {
    if (onSelectTab) onSelectTab(id);
    if (setActiveTab) setActiveTab(id as ActiveTab);
  };

  const tabs = [
    { id: 'plans', label: 'Website Plans & Pricing', icon: Zap, highlight: true },
    { id: 'dashboard', label: 'Company Dashboard', icon: LayoutDashboard },
    { id: 'crm', label: 'CRM & Leads', icon: Users },
    { id: 'bookings', label: 'Bookings & Events', icon: CalendarDays },
    { id: 'storage', label: 'Cloud Storage & Files', icon: HardDrive },
    { id: 'hr', label: 'Employees & Operations', icon: UserPlus },
    { id: 'portal', label: 'Client Portal Simulator', icon: ExternalLink },
    { id: 'finance', label: 'Finance & Invoices', icon: Receipt, badge: pendingPaymentsCount },
    { id: 'admin', label: 'Company Admin', icon: ShieldCheck, badge: unreadLogsCount }
  ];

  return (
    <nav id="pbos-nav-tabs" className="bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 sticky top-[100px] lg:top-[64px] z-30 overflow-x-auto scrollbar-none shadow-xs">
      <div className="w-full max-w-[2200px] mx-auto px-3 sm:px-6 lg:px-8 2xl:px-12">
        <div className="flex items-center justify-start py-2 space-x-1.5 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20 border border-sky-600'
                    : tab.highlight
                    ? 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : tab.highlight ? 'text-sky-600' : 'text-slate-500'}`} />
                <span>{tab.label}</span>

                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive 
                      ? 'bg-sky-800/50 text-white' 
                      : 'bg-sky-100 text-sky-700 border border-sky-200'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Contact Us Auto Bot Button */}
          {onOpenContactUs && (
            <button
              onClick={onOpenContactUs}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-3.5 py-2 rounded-lg text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-600/20 cursor-pointer transition-all shrink-0 whitespace-nowrap ml-2"
            >
              <Headphones className="w-4 h-4 shrink-0" />
              <span>Contact Us</span>
              <span className="bg-emerald-800/60 text-emerald-100 text-[10px] px-1.5 py-0.2 rounded font-bold">Auto Bot</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
