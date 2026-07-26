import React, { useState } from 'react';
import { 
  Camera, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Clock, 
  Users, 
  FileText, 
  Music, 
  Video, 
  Image as ImageIcon, 
  ShieldCheck, 
  ExternalLink, 
  Lock, 
  Send, 
  Sparkles,
  ChevronRight,
  HardDrive,
  UserCheck,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
  Save,
  X
} from 'lucide-react';
import { PBOSProject, ProjectStage, Employee } from '../types/pbos';

interface ProjectDetailModalProps {
  project: PBOSProject | null;
  employees: Employee[];
  onClose: () => void;
  onUpdateProject: (updated: PBOSProject) => void;
  onOpenClientPortal: (projectId: string) => void;
}

const STAGES: ProjectStage[] = [
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

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  employees,
  onClose,
  onUpdateProject,
  onOpenClientPortal
}) => {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'crew' | 'deliverables' | 'portal' | 'notes'>('overview');
  
  // Overview Edit Mode
  const [isEditingOverview, setIsEditingOverview] = useState(false);
  const [editVenue, setEditVenue] = useState(project.venue);
  const [editEventDate, setEditEventDate] = useState(project.eventDate);
  const [editTotalBudget, setEditTotalBudget] = useState(project.totalBudget.toString());
  const [editAdvancePaid, setEditAdvancePaid] = useState(project.advancePaid.toString());
  const [editPhone, setEditPhone] = useState(project.clientPhone);
  const [editEmail, setEditEmail] = useState(project.clientEmail);

  // New Deliverable state
  const [showAddDel, setShowAddDel] = useState(false);
  const [newDelTitle, setNewDelTitle] = useState('');
  const [newDelType, setNewDelType] = useState('Gallery');
  const [newDelAssignee, setNewDelAssignee] = useState(project.team.photographers[0] || 'Lead Shooter');

  // Crew & Gear adding
  const [newCrewName, setNewCrewName] = useState('');
  const [newCrewType, setNewCrewType] = useState<'photographers' | 'editors' | 'equipment'>('photographers');

  const [comments, setComments] = useState<Array<{ user: string; text: string; time: string }>>([
    { user: 'Vikram Million (Head)', text: 'Destination shoot completed at Palace Grounds. Ensure RAW files are backed up to Cloud Server 01.', time: 'Yesterday 08:30 PM' },
    { user: 'Neha Gupta (Editor)', text: 'Teaser Reel color grading complete. Video exported in 4K ProRes.', time: 'Today 10:15 AM' }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment) return;
    setComments([...comments, { user: 'Logged Employee', text: newComment, time: 'Just now' }]);
    setNewComment('');
  };

  const handleStageChange = (newStage: ProjectStage) => {
    let progress = project.progressPercent;
    if (newStage === 'Booking Confirmed') progress = 10;
    else if (newStage === 'Pre-Production & Briefing') progress = 25;
    else if (newStage === 'On-Shoot Production') progress = 40;
    else if (newStage === 'RAW Backup & Ingestion') progress = 50;
    else if (newStage === 'Editing & Color Grading') progress = 65;
    else if (newStage === 'Quality Check (QC)') progress = 80;
    else if (newStage === 'Digital Delivery') progress = 100;

    onUpdateProject({
      ...project,
      stage: newStage,
      progressPercent: progress
    });
  };

  const handleSaveOverview = () => {
    const budgetNum = Number(editTotalBudget) || project.totalBudget;
    const advanceNum = Number(editAdvancePaid) || project.advancePaid;
    const balanceNum = Math.max(0, budgetNum - advanceNum);

    onUpdateProject({
      ...project,
      venue: editVenue,
      eventDate: editEventDate,
      totalBudget: budgetNum,
      advancePaid: advanceNum,
      balanceDue: balanceNum,
      clientPhone: editPhone,
      clientEmail: editEmail
    });
    setIsEditingOverview(false);
  };

  const toggleDeliverableStatus = (delId: string) => {
    const updatedDeliverables = project.requirements.deliverablesList.map(d => {
      if (d.id === delId) {
        const nextStatus: 'Pending' | 'In Progress' | 'Completed' = 
          d.status === 'Pending' ? 'In Progress' : d.status === 'In Progress' ? 'Completed' : 'Pending';
        return { ...d, status: nextStatus };
      }
      return d;
    });

    onUpdateProject({
      ...project,
      requirements: {
        ...project.requirements,
        deliverablesList: updatedDeliverables
      }
    });
  };

  const handleAddDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDelTitle.trim()) return;

    const newDel = {
      id: `del-${Date.now()}`,
      title: newDelTitle.trim(),
      type: newDelType,
      status: 'Pending' as const,
      assignee: newDelAssignee
    };

    onUpdateProject({
      ...project,
      requirements: {
        ...project.requirements,
        deliverablesList: [...project.requirements.deliverablesList, newDel]
      }
    });

    setNewDelTitle('');
    setShowAddDel(false);
  };

  const handleDeleteDeliverable = (delId: string) => {
    onUpdateProject({
      ...project,
      requirements: {
        ...project.requirements,
        deliverablesList: project.requirements.deliverablesList.filter(d => d.id !== delId)
      }
    });
  };

  const handleAddCrewOrGear = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCrewName.trim()) return;

    if (newCrewType === 'photographers') {
      onUpdateProject({
        ...project,
        team: {
          ...project.team,
          photographers: [...project.team.photographers, newCrewName.trim()]
        }
      });
    } else if (newCrewType === 'editors') {
      onUpdateProject({
        ...project,
        team: {
          ...project.team,
          editors: [...project.team.editors, newCrewName.trim()]
        }
      });
    } else {
      onUpdateProject({
        ...project,
        team: {
          ...project.team,
          equipmentAssigned: [...project.team.equipmentAssigned, newCrewName.trim()]
        }
      });
    }

    setNewCrewName('');
  };

  const handleRemoveCrewMember = (type: 'photographers' | 'editors' | 'equipment', name: string) => {
    if (type === 'photographers') {
      onUpdateProject({
        ...project,
        team: {
          ...project.team,
          photographers: project.team.photographers.filter(p => p !== name)
        }
      });
    } else if (type === 'editors') {
      onUpdateProject({
        ...project,
        team: {
          ...project.team,
          editors: project.team.editors.filter(e => e !== name)
        }
      });
    } else {
      onUpdateProject({
        ...project,
        team: {
          ...project.team,
          equipmentAssigned: project.team.equipmentAssigned.filter(eq => eq !== name)
        }
      });
    }
  };

  const toggleQcPass = () => {
    onUpdateProject({
      ...project,
      qcPassed: !project.qcPassed
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-5xl w-full p-5 sm:p-6 shadow-xl space-y-6 my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
                {project.projectCode}
              </span>
              <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded border border-slate-200 font-medium">
                {project.branch}
              </span>
              <span className="text-xs bg-sky-50 text-sky-800 px-2 py-0.5 rounded border border-sky-200 font-semibold">
                {project.eventType}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {project.clientName}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onOpenClientPortal(project.id)}
              className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center space-x-1.5 shadow-md shadow-sky-600/20 cursor-pointer transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Client Portal</span>
            </button>

            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer p-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Stage Stepper Selector */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-slate-600">Current Production Stage</span>
            <span className="font-bold text-sky-700">{project.stage} ({project.progressPercent}%)</span>
          </div>

          <div className="flex items-center space-x-1 overflow-x-auto pb-2 scrollbar-none">
            {STAGES.map(stg => {
              const isCurrent = project.stage === stg;
              return (
                <button
                  key={stg}
                  onClick={() => handleStageChange(stg)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold shrink-0 cursor-pointer transition-all ${
                    isCurrent
                      ? 'bg-sky-600 text-white font-black shadow-xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {stg}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex space-x-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs">
          {[
            { id: 'overview', label: 'Overview & Info' },
            { id: 'requirements', label: 'Requirements & Moodboard' },
            { id: 'crew', label: 'Crew & Gear Assignment' },
            { id: 'deliverables', label: 'Deliverables & QC' },
            { id: 'portal', label: 'Client Portal Credentials' },
            { id: 'notes', label: 'Internal Notes & History' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === tab.id
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">Project Specification Overview</h4>
              <button
                onClick={() => {
                  if (isEditingOverview) {
                    handleSaveOverview();
                  } else {
                    setIsEditingOverview(true);
                  }
                }}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center space-x-1 transition-all cursor-pointer ${
                  isEditingOverview
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {isEditingOverview ? (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </>
                ) : (
                  <>
                    <Edit2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>Edit Project Info</span>
                  </>
                )}
              </button>
            </div>

            {isEditingOverview ? (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Venue Location</label>
                    <input
                      type="text"
                      value={editVenue}
                      onChange={e => setEditVenue(e.target.value)}
                      className="w-full bg-white text-slate-900 p-2 rounded-lg border border-slate-200 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Event Date</label>
                    <input
                      type="date"
                      value={editEventDate}
                      onChange={e => setEditEventDate(e.target.value)}
                      className="w-full bg-white text-slate-900 p-2 rounded-lg border border-slate-200 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Total Budget (₹)</label>
                    <input
                      type="number"
                      value={editTotalBudget}
                      onChange={e => setEditTotalBudget(e.target.value)}
                      className="w-full bg-white text-slate-900 p-2 rounded-lg border border-slate-200 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Advance Received (₹)</label>
                    <input
                      type="number"
                      value={editAdvancePaid}
                      onChange={e => setEditAdvancePaid(e.target.value)}
                      className="w-full bg-white text-slate-900 p-2 rounded-lg border border-slate-200 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Client Phone</label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={e => setEditPhone(e.target.value)}
                      className="w-full bg-white text-slate-900 p-2 rounded-lg border border-slate-200 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Client Email</label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={e => setEditEmail(e.target.value)}
                      className="w-full bg-white text-slate-900 p-2 rounded-lg border border-slate-200 font-medium"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleSaveOverview}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg text-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-medium">Event Date & Venue</span>
                  <div className="font-bold text-slate-900 text-sm">{project.eventDate}</div>
                  <div className="text-slate-600 truncate">{project.venue}</div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-medium">Financial Budget</span>
                  <div className="font-bold text-emerald-600 text-sm">₹{(project.totalBudget ?? 0).toLocaleString()}</div>
                  <div className="text-slate-600">
                    Paid: ₹{(project.advancePaid ?? 0).toLocaleString()} | Due: <strong className="text-rose-600">₹{(project.balanceDue ?? 0).toLocaleString()}</strong>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-medium">Client Contact</span>
                  <div className="font-bold text-slate-900 text-sm">{project.clientPhone}</div>
                  <div className="text-slate-600 truncate">{project.clientEmail}</div>
                </div>
              </div>
            )}

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm mb-2">Style & Shoot Configuration</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-700">
                <div>Drone Required: <strong className={project.requirements.hasDrone ? 'text-emerald-600' : 'text-slate-400'}>{project.requirements.hasDrone ? 'YES' : 'NO'}</strong></div>
                <div>Cinematic Film: <strong className={project.requirements.isCinematicFilm ? 'text-emerald-600' : 'text-slate-400'}>{project.requirements.isCinematicFilm ? 'YES' : 'NO'}</strong></div>
                <div>Interviews: <strong className={project.requirements.requiresInterviews ? 'text-emerald-600' : 'text-slate-400'}>{project.requirements.requiresInterviews ? 'YES' : 'NO'}</strong></div>
                <div>Style: <strong className="text-sky-700">{project.requirements.shootingStyle}</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CLIENT REQUIREMENTS & MOODBOARD */}
        {activeTab === 'requirements' && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Special Moments Checklist</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.requirements.specialMoments.map((moment, idx) => (
                  <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-800 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{moment}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                  <Music className="w-4 h-4 text-sky-600" />
                  <span>Client Song Preferences</span>
                </h4>
                <ul className="list-disc pl-4 text-slate-700 space-y-1">
                  {project.requirements.musicPreferences.map((song, i) => (
                    <li key={i}>{song}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  <span>Creative References & Moodboards</span>
                </h4>
                <div className="space-y-1 text-sky-700 font-mono underline">
                  {project.requirements.moodboardLinks.length > 0 ? (
                    project.requirements.moodboardLinks.map((link, i) => (
                      <a key={i} href={link} target="_blank" rel="noreferrer" className="block truncate hover:text-sky-800">
                        {link}
                      </a>
                    ))
                  ) : (
                    <span className="text-slate-400 no-underline font-sans text-xs">No external moodboard links provided yet</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CREW & GEAR ASSIGNMENT */}
        {activeTab === 'crew' && (
          <div className="space-y-4 text-xs">
            
            {/* Quick Add Form */}
            <form onSubmit={handleAddCrewOrGear} className="bg-sky-50 border border-sky-200 p-3 rounded-xl flex flex-wrap items-center gap-2">
              <span className="font-bold text-sky-900 text-xs">Assign Member/Gear:</span>
              <select
                value={newCrewType}
                onChange={e => setNewCrewType(e.target.value as any)}
                className="bg-white text-slate-800 p-1.5 rounded-lg border border-sky-300 font-semibold"
              >
                <option value="photographers">Photographer / Shooter</option>
                <option value="editors">Editor / Colorist</option>
                <option value="equipment">Equipment Item</option>
              </select>
              <input
                type="text"
                placeholder="Name or equipment label..."
                value={newCrewName}
                onChange={e => setNewCrewName(e.target.value)}
                className="flex-1 bg-white text-slate-800 p-1.5 rounded-lg border border-sky-300 font-medium"
              />
              <button
                type="submit"
                className="bg-sky-600 hover:bg-sky-500 text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                  <Users className="w-4 h-4 text-sky-600" />
                  <span>Assigned Photographers & Cinematographers</span>
                </h4>
                <div>
                  <span className="text-slate-500 block mb-1">Photographers</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.team.photographers.map(p => (
                      <span key={p} className="bg-white text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 font-semibold flex items-center gap-1">
                        <span>📸 {p}</span>
                        {project.team.photographers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCrewMember('photographers', p)}
                            className="text-slate-400 hover:text-rose-600 ml-1 cursor-pointer"
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1">Editors & Colorists</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.team.editors.map(e => (
                      <span key={e} className="bg-white text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 font-semibold flex items-center gap-1">
                        <span>🎬 {e}</span>
                        {project.team.editors.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCrewMember('editors', e)}
                            className="text-slate-400 hover:text-rose-600 ml-1 cursor-pointer"
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                  <Camera className="w-4 h-4 text-sky-600" />
                  <span>Equipment Inventory Checklist</span>
                </h4>
                <div className="grid grid-cols-1 gap-1.5 text-slate-700">
                  {project.team.equipmentAssigned.map((eq, i) => (
                    <div key={i} className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                        <span>{eq}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCrewMember('equipment', eq)}
                        className="text-slate-400 hover:text-rose-600 cursor-pointer font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DELIVERABLES & QC */}
        {activeTab === 'deliverables' && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Project Deliverables Status</h4>
                  <p className="text-slate-500 text-xs">Click status pill to toggle (Pending → In Progress → Completed)</p>
                </div>

                <button
                  onClick={() => setShowAddDel(!showAddDel)}
                  className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Deliverable</span>
                </button>
              </div>

              {/* Add Deliverable Form */}
              {showAddDel && (
                <form onSubmit={handleAddDeliverable} className="bg-white p-3 rounded-xl border border-sky-300 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Deliverable Title (e.g. Traditional Film 4K)"
                      value={newDelTitle}
                      onChange={e => setNewDelTitle(e.target.value)}
                      className="bg-slate-50 text-slate-800 p-2 rounded-lg border border-slate-200 font-semibold"
                    />
                    <select
                      value={newDelType}
                      onChange={e => setNewDelType(e.target.value)}
                      className="bg-slate-50 text-slate-800 p-2 rounded-lg border border-slate-200 font-semibold"
                    >
                      <option value="Gallery">Gallery</option>
                      <option value="Reel">Reel / Teaser</option>
                      <option value="Video">Full Film Video</option>
                      <option value="Album">Printed Album</option>
                      <option value="RAW Drive">RAW Hard Drive</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Assignee Name"
                      value={newDelAssignee}
                      onChange={e => setNewDelAssignee(e.target.value)}
                      className="bg-slate-50 text-slate-800 p-2 rounded-lg border border-slate-200 font-semibold"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowAddDel(false)}
                      className="px-3 py-1 rounded-lg text-slate-500 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-sky-600 hover:bg-sky-500 text-white px-3 py-1 rounded-lg font-bold"
                    >
                      Save Deliverable
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2">
                {project.requirements.deliverablesList.map(del => (
                  <div
                    key={del.id}
                    className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs hover:border-sky-300 transition-all"
                  >
                    <div>
                      <span className="font-bold text-slate-900">{del.title}</span>
                      <span className="text-slate-500 ml-2">({del.type})</span>
                      <div className="text-[10px] text-slate-500 mt-0.5">Assigned: {del.assignee}</div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => toggleDeliverableStatus(del.id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                          del.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                          del.status === 'In Progress' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                          'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {del.status}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteDeliverable(del.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                        title="Delete Deliverable"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QC Pass Toggle */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Quality Check (QC) Approval</h4>
                <p className="text-slate-500 text-xs">Ensure audio sync, color grading, and framing pass studio standards.</p>
              </div>

              <button
                onClick={toggleQcPass}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
                  project.qcPassed
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{project.qcPassed ? 'QC Approved ✓' : 'Mark QC Passed'}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: CLIENT PORTAL CREDENTIALS */}
        {activeTab === 'portal' && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                    <Lock className="w-4 h-4 text-sky-600" />
                    <span>Secure Client Download Credentials</span>
                  </h4>
                  <p className="text-slate-500 mt-0.5">Share these details with the client for high-res downloads.</p>
                </div>

                <button
                  onClick={() => onOpenClientPortal(project.id)}
                  className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1 cursor-pointer transition-all"
                >
                  <span>Test Client Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Portal Link</span>
                  <span className="font-mono text-sky-700 truncate block mt-1">{project.portalLink || 'Generated on delivery'}</span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Private 6-Digit PIN</span>
                  <span className="font-mono text-2xl font-black text-sky-700 block mt-1">{project.portalPin || '884210'}</span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block">Link Expiry Date</span>
                  <span className="font-mono text-slate-800 block mt-1">{project.portalExpiry || '2027-01-15'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: INTERNAL NOTES & HISTORY */}
        {activeTab === 'notes' && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Internal Project Discussion</h4>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {comments.map((c, i) => (
                  <div key={i} className="bg-white p-3 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between text-slate-500 text-[10px] mb-1">
                      <span className="font-bold text-sky-700">{c.user}</span>
                      <span>{c.time}</span>
                    </div>
                    <p className="text-slate-800">{c.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddComment} className="flex gap-2 pt-2 border-t border-slate-200">
                <input
                  type="text"
                  placeholder="Add internal project comment..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  className="flex-1 bg-white text-slate-900 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                />
                <button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-2 rounded-lg flex items-center space-x-1 cursor-pointer transition-all shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
