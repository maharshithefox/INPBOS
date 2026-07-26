import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  DollarSign, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  ArrowRight,
  Clock,
  Tag,
  AlertCircle,
  HelpCircle,
  Building,
  Info
} from 'lucide-react';
import { Lead, LeadStatus, EventCategory, BranchLocation } from '../types/pbos';
import { ALL_EVENT_CATEGORIES, CATEGORY_EVENT_MAPPING } from '../data/taxonomy';

interface CrmLeadViewProps {
  leads: Lead[];
  currentBranch: BranchLocation;
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateLeadStatus: (leadId: string, status: LeadStatus) => void;
  onOpenQuotationBuilder: (lead: Lead) => void;
}

const KANBAN_STAGES: LeadStatus[] = ['New Lead', 'Contacted', 'Quotation Sent', 'Confirmed', 'Lost'];

export const CrmLeadView: React.FC<CrmLeadViewProps> = ({
  leads,
  currentBranch,
  onAddLead,
  onUpdateLeadStatus,
  onOpenQuotationBuilder
}) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);

  // New Lead Form State
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadCategory, setNewLeadCategory] = useState<EventCategory>('Wedding & Marriage');
  const [newLeadEventType, setNewLeadEventType] = useState('Wedding');
  const [specificEventSearch, setSpecificEventSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Event Duration Dates
  const [newLeadFromDate, setNewLeadFromDate] = useState('2026-11-20');
  const [newLeadToDate, setNewLeadToDate] = useState('2026-11-22');

  const [newLeadVenue, setNewLeadVenue] = useState('Bangalore Palace');
  const [newLeadBudget, setNewLeadBudget] = useState('250000');
  const [newLeadNotes, setNewLeadNotes] = useState('');

  // Form Validation State
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Auto-update default event when category changes
  useEffect(() => {
    const availableEvents = CATEGORY_EVENT_MAPPING[newLeadCategory] || [];
    if (availableEvents.length > 0) {
      setNewLeadEventType(availableEvents[0]);
    }
    setSpecificEventSearch('');
  }, [newLeadCategory]);

  const filteredLeads = leads.filter(lead => {
    const matchesBranch = currentBranch === 'Bangalore (HQ)' || lead.branch === currentBranch;
    const matchesCategory = selectedCategory === 'All' || lead.category === selectedCategory;
    const matchesSearch = lead.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.phone.includes(searchQuery);
    return matchesBranch && matchesCategory && matchesSearch;
  });

  const availableSpecificEvents = (CATEGORY_EVENT_MAPPING[newLeadCategory] || []).filter(evt =>
    evt.toLowerCase().includes(specificEventSearch.toLowerCase())
  );

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!newLeadName.trim()) errors.clientName = 'Client name is required';
    if (!newLeadPhone.trim()) errors.phone = 'Phone number is required';
    if (!newLeadFromDate) errors.fromDate = 'Start date is required';
    if (!newLeadToDate) errors.toDate = 'End date is required';
    if (newLeadFromDate && newLeadToDate && new Date(newLeadToDate) < new Date(newLeadFromDate)) {
      errors.toDate = 'To Date cannot be earlier than From Date';
    }
    if (!newLeadVenue.trim()) errors.venue = 'Venue location is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onAddLead({
      clientName: newLeadName,
      phone: newLeadPhone,
      email: newLeadEmail || `${newLeadName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      category: newLeadCategory,
      eventType: newLeadEventType,
      fromDate: newLeadFromDate,
      toDate: newLeadToDate,
      venue: newLeadVenue,
      budgetEstimate: Number(newLeadBudget) || 100000,
      status: 'New Lead',
      branch: currentBranch,
      assignedSalesPerson: 'Anish Nambiar',
      notes: newLeadNotes
    });

    setShowNewLeadModal(false);
    // Reset Form
    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadEmail('');
    setNewLeadNotes('');
    setFormErrors({});
  };

  const formatCurrencyInINR = (amountStr: string) => {
    const num = Number(amountStr);
    if (isNaN(num) || num <= 0) return '₹ 0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div id="pbos-crm-module" className="space-y-6 pb-12">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">CRM & Lead Pipeline</h1>
            <span className="bg-sky-50 text-sky-700 text-xs font-bold px-2.5 py-0.5 rounded border border-sky-200">
              {filteredLeads.length} Total Leads
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Comprehensive Lead Management for all Photography, Videography, Corporate & Cultural Events.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* View toggle */}
          <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex items-center space-x-1 text-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-md font-semibold cursor-pointer ${
                viewMode === 'kanban' ? 'bg-sky-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kanban Board
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-md font-semibold cursor-pointer ${
                viewMode === 'table' ? 'bg-sky-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              List Table
            </button>
          </div>

          <button
            onClick={() => setShowNewLeadModal(true)}
            className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center space-x-1.5 shadow-md shadow-sky-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Client Lead</span>
          </button>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client name, event type, venue or phone..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 text-xs pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 font-medium"
          />
        </div>

        {/* Category filter */}
        <div className="flex items-center space-x-2 text-xs">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-slate-500 font-semibold">Category:</span>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-slate-50 text-slate-800 text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none cursor-pointer font-semibold"
          >
            <option value="All">All 13 Categories</option>
            {ALL_EVENT_CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {KANBAN_STAGES.map(stage => {
            const stageLeads = filteredLeads.filter(l => l.status === stage);

            return (
              <div key={stage} className="bg-slate-100/80 rounded-xl p-3.5 border border-slate-200 min-w-[280px] flex flex-col">
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-xs text-slate-800">{stage}</span>
                    <span className="bg-white text-slate-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-slate-200">
                      {stageLeads.length}
                    </span>
                  </div>
                </div>

                {/* Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[650px] pr-1">
                  {stageLeads.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs border border-dashed border-slate-300 rounded-xl bg-white/50 font-medium">
                      No leads in {stage}
                    </div>
                  ) : (
                    stageLeads.map(lead => (
                      <div 
                        key={lead.id}
                        className="bg-white p-4 rounded-xl border border-slate-200 hover:border-sky-500 transition-all shadow-xs hover:shadow-sm space-y-2.5"
                      >
                        {/* 1. Client Name & Budget */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Client</span>
                            <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                              {lead.clientName}
                            </h3>
                          </div>
                          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                            ₹{lead.budgetEstimate.toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* 2. Event / Specific Event */}
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Event Type</span>
                          <div className="flex items-center space-x-1.5 mt-0.5">
                            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                              {lead.eventType}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium truncate">
                              ({lead.category})
                            </span>
                          </div>
                        </div>

                        {/* 3. Venue / Location */}
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Venue / Location</span>
                          <div className="flex items-center space-x-1 text-xs text-slate-700 font-semibold mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                            <span className="truncate">{lead.venue}</span>
                          </div>
                        </div>

                        {/* 4. Special Notes */}
                        {lead.notes && (
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Special Notes</span>
                            <p className="text-[11px] text-slate-600 font-medium line-clamp-2 mt-0.5">
                              {lead.notes}
                            </p>
                          </div>
                        )}

                        {/* Event Duration & Phone */}
                        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                          <div className="flex items-center space-x-1.5 font-medium text-slate-700">
                            <Calendar className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                            <span>
                              {lead.fromDate === lead.toDate 
                                ? lead.fromDate 
                                : `${lead.fromDate} → ${lead.toDate}`}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1.5 text-slate-600">
                            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{lead.phone}</span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => onOpenQuotationBuilder(lead)}
                            className="bg-sky-50 hover:bg-sky-100 text-sky-700 text-[11px] font-bold px-2.5 py-1 rounded border border-sky-200 flex items-center space-x-1 cursor-pointer"
                          >
                            <FileText className="w-3 h-3" />
                            <span>Quote</span>
                          </button>

                          {stage !== 'Confirmed' && (
                            <button
                              onClick={() => onUpdateLeadStatus(lead.id, 'Confirmed')}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded flex items-center space-x-1 transition-all cursor-pointer shadow-xs"
                            >
                              <span>Confirm</span>
                              <CheckCircle2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW (Strict Info Order: Client Name -> Event Name -> Venue -> Special Notes -> Duration -> Budget -> Actions) */
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 text-xs font-bold border-b border-slate-200">
                  <th className="py-3 px-4">1. Client Name</th>
                  <th className="py-3 px-4">2. Event / Specific Event</th>
                  <th className="py-3 px-4">3. Venue / Location</th>
                  <th className="py-3 px-4">4. Special Client Notes</th>
                  <th className="py-3 px-4">Event Duration</th>
                  <th className="py-3 px-4">Budget Estimate</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {filteredLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    {/* 1. Client Name */}
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div>{lead.clientName}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{lead.phone}</div>
                    </td>

                    {/* 2. Event Name */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-sky-700">{lead.eventType}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{lead.category}</div>
                    </td>

                    {/* 3. Venue / Location */}
                    <td className="py-3.5 px-4 text-slate-800 font-semibold">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>{lead.venue}</span>
                      </div>
                    </td>

                    {/* 4. Special Notes */}
                    <td className="py-3.5 px-4 max-w-xs text-slate-600 font-medium">
                      <div className="truncate" title={lead.notes || 'No special notes'}>
                        {lead.notes || <span className="text-slate-300 italic">None</span>}
                      </div>
                    </td>

                    {/* Event Duration */}
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {lead.fromDate === lead.toDate 
                        ? lead.fromDate 
                        : `${lead.fromDate} to ${lead.toDate}`}
                    </td>

                    {/* Budget */}
                    <td className="py-3.5 px-4 text-emerald-700 font-bold font-mono">
                      ₹{lead.budgetEstimate.toLocaleString('en-IN')}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right space-x-2 shrink-0">
                      <button
                        onClick={() => onOpenQuotationBuilder(lead)}
                        className="bg-sky-50 text-sky-700 hover:bg-sky-100 px-2.5 py-1 rounded border border-sky-200 font-bold cursor-pointer"
                      >
                        Quotation
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE NEW CLIENT LEAD MODAL */}
      {showNewLeadModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-sky-600" />
                  <span>Create New Client Lead</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Complete lead capture form with multi-day duration & 13 category event taxonomy.
                </p>
              </div>
              <button 
                onClick={() => setShowNewLeadModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 font-bold text-sm cursor-pointer transition-all"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              
              {/* Client Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-extrabold flex items-center justify-between">
                    <span>Client Name *</span>
                    {formErrors.clientName && <span className="text-rose-500 text-[10px] font-bold">{formErrors.clientName}</span>}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan & Kavya / Zenith Corp"
                    value={newLeadName}
                    onChange={e => setNewLeadName(e.target.value)}
                    className={`w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border ${
                      formErrors.clientName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                    } focus:outline-none focus:border-sky-500 font-semibold`}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-extrabold flex items-center justify-between">
                    <span>Phone Number *</span>
                    {formErrors.phone && <span className="text-rose-500 text-[10px] font-bold">{formErrors.phone}</span>}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210"
                    value={newLeadPhone}
                    onChange={e => setNewLeadPhone(e.target.value)}
                    className={`w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border ${
                      formErrors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                    } focus:outline-none focus:border-sky-500 font-semibold`}
                  />
                </div>
              </div>

              {/* Event Category & Specific Event Dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* 1. Event Category Dropdown */}
                <div>
                  <label className="block text-slate-700 mb-1 font-extrabold">
                    Event Category *
                  </label>
                  <select
                    value={newLeadCategory}
                    onChange={e => setNewLeadCategory(e.target.value as EventCategory)}
                    className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 font-bold cursor-pointer"
                  >
                    {ALL_EVENT_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* 2. Specific Event Dropdown with Search */}
                <div className="relative">
                  <label className="block text-slate-700 mb-1 font-extrabold flex items-center justify-between">
                    <span>Specific Event *</span>
                    <span className="text-[10px] text-sky-600 font-bold">Filtered by Category</span>
                  </label>
                  
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-200 flex items-center justify-between cursor-pointer font-bold focus-within:border-sky-500"
                  >
                    <span className="truncate">{newLeadEventType}</span>
                    <span className="text-slate-400 text-[10px]">▼</span>
                  </div>

                  {/* Searchable Options Popover */}
                  {isDropdownOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 space-y-2 max-h-60 overflow-hidden flex flex-col">
                      <input
                        type="text"
                        placeholder="Search specific event..."
                        value={specificEventSearch}
                        onChange={e => setSpecificEventSearch(e.target.value)}
                        className="w-full bg-slate-50 text-slate-900 px-2.5 py-1.5 text-xs rounded-md border border-slate-200 focus:outline-none focus:border-sky-500 font-medium"
                        autoFocus
                      />

                      <div className="overflow-y-auto flex-1 space-y-0.5 pr-1">
                        {availableSpecificEvents.length === 0 ? (
                          <div 
                            onClick={() => {
                              if (specificEventSearch.trim()) {
                                setNewLeadEventType(specificEventSearch.trim());
                                setIsDropdownOpen(false);
                              }
                            }}
                            className="p-2 text-slate-500 hover:bg-sky-50 hover:text-sky-700 rounded cursor-pointer font-medium"
                          >
                            Use custom event: "{specificEventSearch}"
                          </div>
                        ) : (
                          availableSpecificEvents.map(evt => (
                            <div
                              key={evt}
                              onClick={() => {
                                setNewLeadEventType(evt);
                                setIsDropdownOpen(false);
                              }}
                              className={`p-2 rounded cursor-pointer text-xs font-semibold flex items-center justify-between ${
                                newLeadEventType === evt 
                                  ? 'bg-sky-600 text-white font-bold' 
                                  : 'hover:bg-slate-100 text-slate-800'
                              }`}
                            >
                              <span>{evt}</span>
                              {newLeadEventType === evt && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Event Duration: From Date & To Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-slate-700 mb-1 font-extrabold flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-600" />
                    <span>From Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={newLeadFromDate}
                    onChange={e => {
                      setNewLeadFromDate(e.target.value);
                      if (new Date(newLeadToDate) < new Date(e.target.value)) {
                        setNewLeadToDate(e.target.value);
                      }
                    }}
                    className="w-full bg-white text-slate-900 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 font-bold"
                  />
                  {formErrors.fromDate && <span className="text-rose-500 text-[10px] font-bold block mt-0.5">{formErrors.fromDate}</span>}
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-extrabold flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-600" />
                    <span>To Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={newLeadToDate}
                    onChange={e => setNewLeadToDate(e.target.value)}
                    className="w-full bg-white text-slate-900 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 font-bold"
                  />
                  {formErrors.toDate && <span className="text-rose-500 text-[10px] font-bold block mt-0.5">{formErrors.toDate}</span>}
                </div>
              </div>

              {/* Budget Estimate & Venue */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-extrabold flex items-center justify-between">
                    <span>Budget Estimate (₹) *</span>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold">
                      {formatCurrencyInINR(newLeadBudget)}
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-400 font-bold">₹</span>
                    <input
                      type="number"
                      required
                      placeholder="250000"
                      value={newLeadBudget}
                      onChange={e => setNewLeadBudget(e.target.value)}
                      className="w-full bg-slate-50 text-slate-900 pl-7 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-extrabold flex items-center justify-between">
                    <span>Venue / Location *</span>
                    {formErrors.venue && <span className="text-rose-500 text-[10px] font-bold">{formErrors.venue}</span>}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bangalore Palace / JW Marriott"
                    value={newLeadVenue}
                    onChange={e => setNewLeadVenue(e.target.value)}
                    className={`w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border ${
                      formErrors.venue ? 'border-rose-400' : 'border-slate-200'
                    } focus:outline-none focus:border-sky-500 font-semibold`}
                  />
                </div>
              </div>

              {/* Special Client Notes (Expanded Textarea) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 font-extrabold">
                    Special Client Notes
                  </label>
                  <span className={`text-[10px] font-bold ${
                    newLeadNotes.length > 500 ? 'text-amber-600' : 'text-slate-400'
                  }`}>
                    {newLeadNotes.length} / 1000 chars (Min capacity 500+)
                  </span>
                </div>
                <textarea
                  rows={3}
                  maxLength={1000}
                  placeholder="e.g. Couple prefers cinematic warm color grade, 4K Drone coverage requested, LED live wall stream for reception..."
                  value={newLeadNotes}
                  onChange={e => setNewLeadNotes(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 p-3 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 font-medium leading-relaxed"
                />
              </div>

              {/* Submit / Cancel Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] text-slate-500 flex items-center space-x-1">
                  <Info className="w-3.5 h-3.5 text-sky-600" />
                  <span>Lead will be saved under current branch: <strong>{currentBranch}</strong></span>
                </div>

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowNewLeadModal(false)}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-black cursor-pointer shadow-md shadow-sky-600/20 transition-all"
                  >
                    Save Lead
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
