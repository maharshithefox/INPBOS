import React from 'react';
import { 
  Camera, 
  Building2, 
  UserCheck, 
  Bot, 
  Plus, 
  ShieldAlert, 
  Sparkles,
  Clock,
  HardDrive,
  MapPin,
  Headphones,
  User,
  LogIn,
  Globe
} from 'lucide-react';
import { BranchLocation, RoleType, SubscriptionInfo } from '../types/pbos';
import { UserProfile } from './AuthLoginModal';

import { INITIAL_SUBSCRIPTION } from '../data/mockData';

interface HeaderProps {
  currentBranch: BranchLocation;
  setCurrentBranch?: (b: BranchLocation) => void;
  onSelectBranch?: (b: BranchLocation) => void;
  currentRole: RoleType;
  setCurrentRole?: (r: RoleType) => void;
  onSelectRole?: (r: RoleType) => void;
  onOpenAiBrain?: () => void;
  onOpenContactUs?: () => void;
  onOpenAuth?: () => void;
  onOpenDomainSplash?: () => void;
  userProfile?: UserProfile | null;
  onNewLead?: () => void;
  onNewBooking?: () => void;
  subscription?: SubscriptionInfo;
  isClockedIn?: boolean;
  onToggleClockIn?: () => void;
  activeView?: string;
}

const ROLES: RoleType[] = [
  'Company Head',
  'HR Manager',
  'CRM Executive',
  'Sales Executive',
  'Operations Manager',
  'Photographer',
  'Videographer',
  'Editor',
  'Album Designer',
  'Accounts Manager',
  'Delivery Team',
  'Client'
];

const BRANCHES: BranchLocation[] = [
  'Bangalore (HQ)',
  'Mysore Branch',
  'Hyderabad Branch',
  'Mangalore Branch'
];

export const Header: React.FC<HeaderProps> = ({
  currentBranch,
  setCurrentBranch,
  onSelectBranch,
  currentRole,
  setCurrentRole,
  onSelectRole,
  onOpenAiBrain,
  onOpenContactUs,
  onOpenAuth,
  onOpenDomainSplash,
  userProfile,
  onNewLead,
  onNewBooking,
  subscription,
  isClockedIn = true,
  onToggleClockIn
}) => {
  const sub = subscription || INITIAL_SUBSCRIPTION;
  const handleBranchChange = (branch: BranchLocation) => {
    if (setCurrentBranch) setCurrentBranch(branch);
    if (onSelectBranch) onSelectBranch(branch);
  };
  const handleRoleChange = (role: RoleType) => {
    if (setCurrentRole) setCurrentRole(role);
    if (onSelectRole) onSelectRole(role);
  };
  return (
    <header id="pbos-main-header" className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-40 shadow-lg">
      <div className="w-full max-w-[2200px] mx-auto px-3 sm:px-6 lg:px-8 2xl:px-12">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* Logo & Studio Name - Clicking launches Domain Splash */}
          <div 
            onClick={onOpenDomainSplash}
            className="flex items-center space-x-2.5 min-w-0 cursor-pointer hover:opacity-90 transition-opacity"
            title="Click to view Domain Black Screen Landing"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-sky-500 rounded-lg flex items-center justify-center text-white font-bold shadow-md shadow-sky-500/20 shrink-0">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-extrabold text-sm sm:text-lg tracking-tight text-white truncate">
                  INPBOS
                </span>
                <span className="bg-sky-500/20 text-sky-300 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded border border-sky-400/30 uppercase tracking-wider shrink-0">
                  Enterprise
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-[10px] sm:text-[11px] text-slate-400 font-medium truncate">
                <span className="hidden xl:inline">INTER NATIONAL PHOTOGRAPHY BUSINESS OPERATING SYSTEM</span>
                <span className="hidden lg:inline xl:hidden">PHOTOGRAPHY OPERATING SYSTEM</span>
                <span className="hidden lg:inline">•</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1 shrink-0">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {sub.tier} Active
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Branch & Role Selector */}
          <div className="hidden lg:flex items-center space-x-3 shrink-0">
            
            {/* Branch Switcher */}
            <div className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/80 text-xs">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <select 
                value={currentBranch} 
                onChange={(e) => handleBranchChange(e.target.value as BranchLocation)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer font-medium"
              >
                {BRANCHES.map(b => (
                  <option key={b} value={b} className="bg-slate-900 text-slate-200">{b}</option>
                ))}
              </select>
            </div>

            {/* Role Switcher */}
            <div className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/80 text-xs">
              <UserCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="text-slate-400">Role:</span>
              <select 
                value={currentRole} 
                onChange={(e) => handleRoleChange(e.target.value as RoleType)}
                className="bg-transparent text-sky-400 font-semibold focus:outline-none cursor-pointer"
              >
                {ROLES.map(r => (
                  <option key={r} value={r} className="bg-slate-900 text-slate-200">{r}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            
            {/* Domain Link Black Screen Button */}
            {onOpenDomainSplash && (
              <button
                onClick={onOpenDomainSplash}
                className="flex items-center space-x-1.5 bg-black hover:bg-slate-900 text-white border border-slate-700 font-extrabold px-2.5 sm:px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer shadow-md"
                title="Open Domain Link Black Screen View"
              >
                <Globe className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                <span className="hidden sm:inline">Domain Link</span>
              </button>
            )}

            {/* Clock-in Toggle button */}
            <button
              onClick={onToggleClockIn}
              className={`flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isClockedIn 
                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20' 
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">{isClockedIn ? 'Clocked In' : 'Clock In'}</span>
            </button>

            {/* User Auth Account/Login button */}
            {onOpenAuth && (
              <button
                onClick={onOpenAuth}
                className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold px-2.5 sm:px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer"
                title={userProfile ? `Signed in as ${userProfile.email}` : "Login / Account"}
              >
                {userProfile ? (
                  <>
                    <div className="w-4 h-4 rounded-full bg-sky-500 text-white font-extrabold flex items-center justify-center text-[9px] shrink-0">
                      {userProfile.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline max-w-[90px] truncate">{userProfile.name}</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-3.5 h-3.5 text-sky-400" />
                    <span className="hidden sm:inline">Login / Demo</span>
                  </>
                )}
              </button>
            )}

            {/* AI Brain Button */}
            <button
              onClick={onOpenAiBrain}
              className="flex items-center space-x-1.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg text-xs shadow-md shadow-sky-600/20 transition-all cursor-pointer"
            >
              <Bot className="w-4 h-4 text-sky-200" />
              <span className="hidden sm:inline">AI Brain</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
            </button>

            {/* Contact Us Auto Bot Button */}
            {onOpenContactUs && (
              <button
                onClick={onOpenContactUs}
                className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 sm:px-3 py-1.5 rounded-lg text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <Headphones className="w-4 h-4 text-emerald-200" />
                <span className="hidden md:inline">Contact Us</span>
              </button>
            )}

            {/* Quick Add Buttons */}
            {currentRole !== 'Client' && (
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={onNewLead}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs flex items-center space-x-1 border border-slate-700 transition-all cursor-pointer"
                  title="New Lead"
                >
                  <Plus className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden md:inline">Lead</span>
                </button>
                <button
                  onClick={onNewBooking}
                  className="bg-sky-500 hover:bg-sky-400 text-white font-bold px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs flex items-center space-x-1 shadow-sm transition-all cursor-pointer"
                  title="New Booking"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Booking</span>
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Mobile & Tablet Secondary Controls Bar (< lg) */}
        <div className="lg:hidden border-t border-slate-800/80 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Mobile Branch Switcher */}
          <div className="flex items-center space-x-1 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 text-[11px] flex-1 min-w-[130px]">
            <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
            <select 
              value={currentBranch} 
              onChange={(e) => handleBranchChange(e.target.value as BranchLocation)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer font-medium w-full truncate"
            >
              {BRANCHES.map(b => (
                <option key={b} value={b} className="bg-slate-900 text-slate-200">{b}</option>
              ))}
            </select>
          </div>

          {/* Mobile Role Switcher */}
          <div className="flex items-center space-x-1 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 text-[11px] flex-1 min-w-[130px]">
            <UserCheck className="w-3 h-3 text-sky-400 shrink-0" />
            <span className="text-slate-400 shrink-0">Role:</span>
            <select 
              value={currentRole} 
              onChange={(e) => handleRoleChange(e.target.value as RoleType)}
              className="bg-transparent text-sky-400 font-semibold focus:outline-none cursor-pointer w-full truncate"
            >
              {ROLES.map(r => (
                <option key={r} value={r} className="bg-slate-900 text-slate-200">{r}</option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </header>
  );
};
