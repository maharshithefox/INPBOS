import React, { useState } from 'react';
import { 
  Kanban, 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  UserCheck, 
  Camera, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Plus,
  RefreshCw
} from 'lucide-react';
import { PBOSProject, ProjectStage, BranchLocation } from '../types/pbos';

interface BookingsProjectViewProps {
  projects: PBOSProject[];
  currentBranch: BranchLocation;
  onOpenProjectDetail: (projectId: string) => void;
  onOpenNewBookingModal: () => void;
}

const ALL_STAGES: ProjectStage[] = [
  'Booking Confirmed',
  'Pre-Production & Briefing',
  'On-Shoot Production',
  'RAW Backup & Ingestion',
  'Photo Selection',
  'Editing & Color Grading',
  'Album Design',
  'Quality Check (QC)',
  'Client Review & Feedback',
  'Final Corrections',
  'Digital Delivery',
  'Archived'
];

export const BookingsProjectView: React.FC<BookingsProjectViewProps> = ({
  projects,
  currentBranch,
  onOpenProjectDetail,
  onOpenNewBookingModal
}) => {
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = projects.filter(p => {
    const matchesBranch = currentBranch === 'Bangalore (HQ)' || p.branch === currentBranch;
    const matchesStage = selectedStage === 'All' || p.stage === selectedStage;
    const matchesSearch = p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.projectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBranch && matchesStage && matchesSearch;
  });

  return (
    <div id="pbos-production-module" className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-slate-900">Bookings & Production Workflow</h1>
            <span className="bg-sky-50 text-sky-700 text-xs font-bold px-2.5 py-0.5 rounded border border-sky-200">
              {filteredProjects.length} Active Projects
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            End-to-end studio pipeline from shoot day to secure client portal delivery.
          </p>
        </div>

        <button
          onClick={onOpenNewBookingModal}
          className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-2.5 rounded-lg text-xs flex items-center space-x-2 shadow-md shadow-sky-600/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Project Booking</span>
        </button>
      </div>

      {/* Stage pipeline pills & filters */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedStage('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
              selectedStage === 'All'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            All Stages ({projects.length})
          </button>
          {ALL_STAGES.map(stg => {
            const count = projects.filter(p => p.stage === stg).length;
            return (
              <button
                key={stg}
                onClick={() => setSelectedStage(stg)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer ${
                  selectedStage === stg
                    ? 'bg-sky-600 text-white font-bold shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {stg} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search project code, client, venue..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-900 placeholder-slate-400 text-xs pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
            />
          </div>

          {(selectedStage !== 'All' || searchQuery !== '') && (
            <button
              onClick={() => { setSelectedStage('All'); setSearchQuery(''); }}
              className="text-xs text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-3">
          <Camera className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Bookings Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No projects match your stage filter or search criteria.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => { setSelectedStage('All'); setSearchQuery(''); }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3.5 py-2 rounded-lg text-xs cursor-pointer"
            >
              Reset Filters
            </button>
            <button
              onClick={onOpenNewBookingModal}
              className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-3.5 py-2 rounded-lg text-xs flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Project Booking</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              onClick={() => onOpenProjectDetail(proj.id)}
              className="bg-white border border-slate-200 hover:border-sky-500 rounded-xl p-5 shadow-xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-bold">
                      {proj.projectCode}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1 group-hover:text-sky-600 transition-colors">
                      {proj.clientName}
                    </h3>
                  </div>

                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                    {proj.eventType}
                  </span>
                </div>

                {/* Event Metadata */}
                <div className="space-y-2 text-xs text-slate-500 mt-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span className="text-slate-800 font-medium">{proj.eventDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{proj.venue}</span>
                  </div>
                </div>

                {/* Assigned Team */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-xs">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Assigned Crew
                  </div>
                  <div className="flex flex-wrap gap-1 text-[11px]">
                    {proj.team.photographers.map(p => (
                      <span key={p} className="bg-slate-50 text-blue-700 px-2 py-0.5 rounded border border-slate-200">
                        📸 {p}
                      </span>
                    ))}
                    {proj.team.editors.map(e => (
                      <span key={e} className="bg-slate-50 text-sky-700 px-2 py-0.5 rounded border border-slate-200">
                        🎬 {e}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Status & Progress */}
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Current Stage</span>
                  <span className="font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
                    {proj.stage}
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>Production Progress</span>
                    <span className="font-bold text-slate-900">{proj.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-sky-600 h-1.5 rounded-full"
                      style={{ width: `${proj.progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500">
                    Balance: <strong className="text-rose-600">₹{(proj.balanceDue ?? 0).toLocaleString()}</strong>
                  </span>

                  <span className="text-xs font-bold text-sky-600 group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                    <span>Open Workspace</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
