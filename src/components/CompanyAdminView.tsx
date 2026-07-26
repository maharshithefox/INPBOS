import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Plus, 
  CheckCircle2, 
  CreditCard, 
  Users, 
  Sliders,
  Sparkles,
  FileText,
  Cloud,
  HardDrive
} from 'lucide-react';
import { BranchLocation, RoleType, DriveSubscriptionState } from '../types/pbos';
import { InpbosDriveModal } from './InpbosDriveModal';

interface CompanyAdminViewProps {
  currentBranch: BranchLocation;
  currentRole: RoleType;
  driveSubscription: DriveSubscriptionState;
  onSelectBranch: (branch: BranchLocation) => void;
  onUpdateDriveSubscription: (newSub: DriveSubscriptionState) => void;
}

export const CompanyAdminView: React.FC<CompanyAdminViewProps> = ({
  currentBranch,
  currentRole,
  driveSubscription,
  onSelectBranch,
  onUpdateDriveSubscription
}) => {
  const [branches, setBranches] = useState<Array<{ name: BranchLocation; address: string; staffCount: number }>>([
    { name: 'Bangalore (HQ)', address: 'Digital Operations Hub • Online Cloud Studio', staffCount: 14 },
    { name: 'Mysore Branch', address: 'Digital Regional Hub • Online Cloud Studio', staffCount: 6 },
    { name: 'Hyderabad Branch', address: 'Digital Regional Hub • Online Cloud Studio', staffCount: 5 },
    { name: 'Mangalore Branch', address: 'Digital Regional Hub • Online Cloud Studio', staffCount: 4 }
  ]);

  const [newBranchName, setNewBranchName] = useState('');
  const [newBranchAddress, setNewBranchAddress] = useState('');
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showDriveModal, setShowDriveModal] = useState(false);

  const handleAddBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranchName) return;

    setBranches([
      ...branches,
      { name: newBranchName as BranchLocation, address: newBranchAddress || 'City Studio Office Address', staffCount: 2 }
    ]);
    setShowBranchModal(false);
    setNewBranchName('');
  };

  return (
    <div id="pbos-admin-module" className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-extrabold text-slate-900">Company Admin & Subscriptions</h1>
            <span className="bg-sky-50 text-sky-700 text-xs font-bold px-2.5 py-0.5 rounded border border-sky-200">
              Enterprise Suite
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Global studio configuration, legal registration numbers, software licenses, and INPBOS Drive storage billing.
          </p>
        </div>

        <button
          onClick={() => setShowBranchModal(true)}
          className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center space-x-1.5 cursor-pointer shadow-md shadow-sky-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Studio Branch</span>
        </button>
      </div>

      {/* Grid: Company Profile & Subscriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Company Legal Profile */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Building2 className="w-4 h-4 text-sky-600" />
            <span>Registered Legal Business Profile</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 block">Company Registered Name</span>
              <span className="font-extrabold text-slate-900 text-sm">INPBOS International Pvt. Ltd.</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 block">GSTIN Registration #</span>
              <span className="font-mono font-bold text-sky-700 text-sm">29ABCDE1234F1Z5</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 block">Founder & Managing Director</span>
              <span className="font-bold text-slate-800">Vikram Million</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 block">Official Contact Mail ID</span>
              <span className="font-mono font-bold text-sky-800 text-sm">maharshithefox@gmail.com</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">100% Digital OS • No physical address or phone number shared</span>
            </div>
          </div>
        </div>

        {/* Software License Subscription */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>INPBOS Software License</span>
          </h3>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900 text-sm">Enterprise Software Tier</span>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-200">Active License</span>
            </div>
            <p className="text-slate-600">Core PBOS platform license covering multi-branch CRM, shoot scheduling, HR & payroll, client portals, and quotation engine.</p>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-mono text-[11px] text-slate-500">
              <span>Software Renewal:</span>
              <span className="text-sky-700 font-bold">2027-12-31</span>
            </div>
          </div>

          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-900 space-y-1">
            <div className="font-bold">Software vs Storage Policy Notice:</div>
            <p>Cloud storage is <strong>not included</strong> in the software license. Storage is purchased separately as INPBOS Drive.</p>
          </div>
        </div>

        {/* INPBOS Drive Cloud Storage Subscription */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Cloud className="w-4 h-4 text-sky-600" />
              <span>INPBOS Drive Storage Plan</span>
            </h3>
            <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5 rounded">
              Standalone Sub
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-500 block">Dedicated Storage</span>
                <span className="font-extrabold text-slate-900 text-sm">{driveSubscription.planName}</span>
              </div>
              <span className="bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded text-[10px] font-extrabold border border-sky-200">
                {driveSubscription.billingCycle}
              </span>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                <span>Usage: {(driveSubscription?.usedGB ?? 0).toLocaleString()} GB</span>
                <span>Limit: {(driveSubscription?.capacityGB ?? 0).toLocaleString()} GB</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-sky-600 h-full rounded-full"
                  style={{ width: `${Math.min(100, Math.round((driveSubscription.usedGB / driveSubscription.capacityGB) * 100))}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between font-mono text-[11px] text-slate-500">
              <span>Storage Renewal:</span>
              <span className="text-slate-900 font-bold">{driveSubscription.renewalDate}</span>
            </div>
          </div>

          <button
            onClick={() => setShowDriveModal(true)}
            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-sky-600/20 cursor-pointer transition-all"
          >
            <HardDrive className="w-4 h-4" />
            <span>Manage INPBOS Drive Subscription</span>
          </button>
        </div>

      </div>

      {/* Studio Branches Register */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-sky-600" />
          <span>Active Studio Office Locations</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {branches.map(br => (
            <div 
              key={br.name}
              className={`p-4 rounded-xl border transition-all space-y-3 ${
                currentBranch === br.name
                  ? 'bg-sky-50/60 border-sky-500 shadow-xs'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-slate-900 text-sm">{br.name}</h4>
                {currentBranch === br.name && (
                  <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded text-[10px] font-bold border border-sky-200">
                    Selected HQ
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed truncate">{br.address}</p>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500">{br.staffCount} Staff Members</span>
                <button
                  onClick={() => onSelectBranch(br.name)}
                  className="text-sky-700 hover:text-sky-800 font-bold text-[11px] cursor-pointer"
                >
                  Select Office →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INPBOS DRIVE SUBSCRIPTION MODAL */}
      {showDriveModal && (
        <InpbosDriveModal
          subscription={driveSubscription}
          onClose={() => setShowDriveModal(false)}
          onUpdateSubscription={onUpdateDriveSubscription}
        />
      )}

      {/* ADD BRANCH MODAL */}
      {showBranchModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Add Studio Branch Location</h3>

            <form onSubmit={handleAddBranch} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Branch Location Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Goa Branch"
                  value={newBranchName}
                  onChange={e => setNewBranchName(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Address Details</label>
                <input
                  type="text"
                  placeholder="Street address & City"
                  value={newBranchAddress}
                  onChange={e => setNewBranchAddress(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowBranchModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold cursor-pointer hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-sky-600 text-white font-bold cursor-pointer hover:bg-sky-500 shadow-xs"
                >
                  Save Branch Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

