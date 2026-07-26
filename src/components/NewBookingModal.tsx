import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  User, 
  DollarSign, 
  CheckCircle2, 
  Camera, 
  Sparkles, 
  Users, 
  Phone, 
  Mail, 
  Building,
  Plus,
  Shield,
  Film,
  Video
} from 'lucide-react';
import { PBOSProject, BranchLocation, Employee, EventCategory } from '../types/pbos';
import { CATEGORY_EVENT_MAPPING } from '../data/taxonomy';

interface NewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (projectData: Partial<PBOSProject>) => void;
  currentBranch: BranchLocation;
  employees: Employee[];
}

const ALL_CATEGORIES = Object.keys(CATEGORY_EVENT_MAPPING) as EventCategory[];

export const NewBookingModal: React.FC<NewBookingModalProps> = ({
  isOpen,
  onClose,
  onAddProject,
  currentBranch,
  employees
}) => {
  if (!isOpen) return null;

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  
  const [category, setCategory] = useState<EventCategory>('Wedding & Marriage');
  const [eventType, setEventType] = useState<string>('Wedding');
  const [eventDate, setEventDate] = useState('2026-11-20');
  const [venue, setVenue] = useState('');
  const [branch, setBranch] = useState<BranchLocation>(currentBranch);

  const [totalBudget, setTotalBudget] = useState('150000');
  const [advancePaid, setAdvancePaid] = useState('50000');

  // Crew Selection State
  const [selectedPhotographers, setSelectedPhotographers] = useState<string[]>(['Siddharth Rao']);
  const [selectedEditors, setSelectedEditors] = useState<string[]>(['Neha Gupta']);

  // Requirements State
  const [hasDrone, setHasDrone] = useState(true);
  const [isCinematicFilm, setIsCinematicFilm] = useState(true);
  const [isTraditionalVideo, setIsTraditionalVideo] = useState(true);
  const [requiresInterviews, setRequiresInterviews] = useState(false);
  const [specialMomentsInput, setSpecialMomentsInput] = useState('Couple Entry, Stage Shots, Family Portraits');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Auto update event types when category changes
  useEffect(() => {
    const available = CATEGORY_EVENT_MAPPING[category] || [];
    if (available.length > 0) {
      setEventType(available[0]);
    }
  }, [category]);

  const availablePhotographers = employees.filter(e => 
    e.role === 'Photographer' || e.role === 'Cinematographer' || e.role === 'Drone Pilot' || e.role === 'Lead Shooter'
  );

  const availableEditors = employees.filter(e => 
    e.role === 'Video Editor' || e.role === 'Album Designer' || e.role === 'Colorist' || e.role === 'Senior Editor'
  );

  const togglePhotographer = (name: string) => {
    if (selectedPhotographers.includes(name)) {
      if (selectedPhotographers.length > 1) {
        setSelectedPhotographers(selectedPhotographers.filter(p => p !== name));
      }
    } else {
      setSelectedPhotographers([...selectedPhotographers, name]);
    }
  };

  const toggleEditor = (name: string) => {
    if (selectedEditors.includes(name)) {
      if (selectedEditors.length > 1) {
        setSelectedEditors(selectedEditors.filter(e => e !== name));
      }
    } else {
      setSelectedEditors([...selectedEditors, name]);
    }
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!clientName.trim()) errors.clientName = 'Client name is required';
    if (!clientPhone.trim()) errors.clientPhone = 'Phone number is required';
    if (!venue.trim()) errors.venue = 'Venue location is required';
    if (!eventDate) errors.eventDate = 'Event date is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const budgetNum = Number(totalBudget) || 100000;
    const advanceNum = Number(advancePaid) || 0;
    const balance = Math.max(0, budgetNum - advanceNum);

    const momentsArray = specialMomentsInput
      .split(',')
      .map(m => m.trim())
      .filter(m => m.length > 0);

    onAddProject({
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim() || `${clientName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      category,
      eventType,
      eventDate,
      venue: venue.trim(),
      branch,
      totalBudget: budgetNum,
      advancePaid: advanceNum,
      balanceDue: balance,
      stage: 'Booking Confirmed',
      progressPercent: 10,
      team: {
        photographers: selectedPhotographers,
        videographers: selectedPhotographers,
        droneOperators: hasDrone ? ['Deepak Kumar'] : [],
        editors: selectedEditors,
        albumDesigners: ['Manish Hegde'],
        deliveryAgent: 'Karthik Raja',
        equipmentAssigned: ['Sony A7IV', 'FX3 Cinema Line', ...(hasDrone ? ['DJI Mavic 3 Pro'] : [])]
      },
      requirements: {
        specialMoments: momentsArray.length > 0 ? momentsArray : ['Couple Entry', 'Stage Shots'],
        hasDrone,
        hasSlowMotion: isCinematicFilm,
        isTraditionalVideo,
        isCinematicFilm,
        requiresInterviews,
        familyPhotoChecklist: ['Parents', 'Siblings'],
        shootingStyle: isCinematicFilm ? 'Cinematic Storytelling' : 'Standard Traditional',
        musicPreferences: ['Acoustic Instrumental', 'Romantic Strings'],
        moodboardLinks: [],
        deliverablesList: [
          { id: `del-1-${Date.now()}`, title: 'High-Res Photo Gallery', type: 'Gallery', status: 'Pending', assignee: selectedPhotographers[0] || 'Lead Shooter' },
          { id: `del-2-${Date.now()}`, title: isCinematicFilm ? 'Cinematic Teaser (60s)' : 'Highlights Video', type: 'Reel', status: 'Pending', assignee: selectedEditors[0] || 'Senior Editor' },
          { id: `del-3-${Date.now()}`, title: 'Traditional Full Film', type: 'Video', status: 'Pending', assignee: selectedEditors[0] || 'Senior Editor' }
        ]
      }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-xs z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full p-5 sm:p-6 shadow-2xl space-y-5 my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-md shadow-sky-600/30">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">New Project Booking</h2>
              <p className="text-xs text-slate-500">Create a new confirmed project booking in INPBOS workflow</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-all cursor-pointer font-bold text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Section 1: Client Information */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 text-sky-800">
              <User className="w-3.5 h-3.5 text-sky-600" />
              <span>Client Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Client Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aarav & Ananya"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className={`w-full bg-white text-slate-900 px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                    formErrors.clientName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-sky-500'
                  }`}
                />
                {formErrors.clientName && <span className="text-rose-500 text-[10px] font-bold mt-0.5 block">{formErrors.clientName}</span>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={clientPhone}
                  onChange={e => setClientPhone(e.target.value)}
                  className={`w-full bg-white text-slate-900 px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                    formErrors.clientPhone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-sky-500'
                  }`}
                />
                {formErrors.clientPhone && <span className="text-rose-500 text-[10px] font-bold mt-0.5 block">{formErrors.clientPhone}</span>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="client@example.com"
                  value={clientEmail}
                  onChange={e => setClientEmail(e.target.value)}
                  className="w-full bg-white text-slate-900 px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Event Details */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 text-sky-800">
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              <span>Event & Venue Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Event Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as EventCategory)}
                  className="w-full bg-white text-slate-900 px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                >
                  {ALL_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Specific Event Type</label>
                <select
                  value={eventType}
                  onChange={e => setEventType(e.target.value)}
                  className="w-full bg-white text-slate-900 px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                >
                  {(CATEGORY_EVENT_MAPPING[category] || ['General Shoot']).map(evt => (
                    <option key={evt} value={evt}>{evt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Event Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={e => setEventDate(e.target.value)}
                  className={`w-full bg-white text-slate-900 px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                    formErrors.eventDate ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-sky-500'
                  }`}
                />
                {formErrors.eventDate && <span className="text-rose-500 text-[10px] font-bold mt-0.5 block">{formErrors.eventDate}</span>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Venue Location <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Palace Grounds, Bangalore"
                  value={venue}
                  onChange={e => setVenue(e.target.value)}
                  className={`w-full bg-white text-slate-900 px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                    formErrors.venue ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-sky-500'
                  }`}
                />
                {formErrors.venue && <span className="text-rose-500 text-[10px] font-bold mt-0.5 block">{formErrors.venue}</span>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Studio Branch</label>
                <select
                  value={branch}
                  onChange={e => setBranch(e.target.value as BranchLocation)}
                  className="w-full bg-white text-slate-900 px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                >
                  <option value="Bangalore (HQ)">Bangalore (HQ)</option>
                  <option value="Mysore Branch">Mysore Branch</option>
                  <option value="Hyderabad Branch">Hyderabad Branch</option>
                  <option value="Mangalore Branch">Mangalore Branch</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Financials */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 text-emerald-800">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Project Budget & Advance</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Total Project Budget (₹)</label>
                <input
                  type="number"
                  placeholder="150000"
                  value={totalBudget}
                  onChange={e => setTotalBudget(e.target.value)}
                  className="w-full bg-white text-slate-900 px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-sky-500 font-bold text-emerald-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Advance Received (₹)</label>
                <input
                  type="number"
                  placeholder="50000"
                  value={advancePaid}
                  onChange={e => setAdvancePaid(e.target.value)}
                  className="w-full bg-white text-slate-900 px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-sky-500 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Calculated Balance Due (₹)</label>
                <div className="bg-white px-3 py-2 rounded-lg border border-slate-200 text-xs font-black text-rose-600">
                  ₹{Math.max(0, (Number(totalBudget) || 0) - (Number(advancePaid) || 0)).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Crew & Shoot Options */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 text-sky-800">
              <Users className="w-3.5 h-3.5 text-sky-600" />
              <span>Assigned Studio Crew</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Lead Photographers / Shooters</label>
                <div className="flex flex-wrap gap-1.5 bg-white p-2.5 rounded-lg border border-slate-200 max-h-24 overflow-y-auto">
                  {(availablePhotographers.length > 0 ? availablePhotographers : employees).map(emp => {
                    const isSel = selectedPhotographers.includes(emp.name);
                    return (
                      <button
                        type="button"
                        key={emp.id}
                        onClick={() => togglePhotographer(emp.name)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-all ${
                          isSel ? 'bg-sky-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        📸 {emp.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Editors & Colorists</label>
                <div className="flex flex-wrap gap-1.5 bg-white p-2.5 rounded-lg border border-slate-200 max-h-24 overflow-y-auto">
                  {(availableEditors.length > 0 ? availableEditors : employees).map(emp => {
                    const isSel = selectedEditors.includes(emp.name);
                    return (
                      <button
                        type="button"
                        key={emp.id}
                        onClick={() => toggleEditor(emp.name)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-all ${
                          isSel ? 'bg-sky-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        🎬 {emp.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-bold">
              <label className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasDrone}
                  onChange={e => setHasDrone(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500"
                />
                <span>Drone Coverage</span>
              </label>

              <label className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCinematicFilm}
                  onChange={e => setIsCinematicFilm(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500"
                />
                <span>Cinematic Teaser</span>
              </label>

              <label className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isTraditionalVideo}
                  onChange={e => setIsTraditionalVideo(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500"
                />
                <span>Traditional Film</span>
              </label>

              <label className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={requiresInterviews}
                  onChange={e => setRequiresInterviews(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500"
                />
                <span>Guest Interviews</span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-sky-600/20 flex items-center space-x-2 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Project Booking</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
