import React, { useState } from 'react';
import { 
  Camera, 
  Layers, 
  Film, 
  Video, 
  CheckCircle2, 
  Plus, 
  Search, 
  Sparkles,
  Users
} from 'lucide-react';
import { TAXONOMY_EVENTS } from '../data/taxonomy';

export const EventTaxonomyView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(TAXONOMY_EVENTS[0].category);
  const [selectedEvent, setSelectedEvent] = useState(TAXONOMY_EVENTS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = TAXONOMY_EVENTS.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="pbos-taxonomy-module" className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-extrabold text-slate-900">Event Taxonomy & Deliverables Engine</h1>
            <span className="bg-sky-50 text-sky-700 text-xs font-bold px-2.5 py-0.5 rounded border border-sky-200">
              Standard Taxonomy
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Standardized company taxonomy mapping categories, sub-events, deliverables, and mandatory crew blueprints.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left List of Event Taxonomies */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search taxonomy..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredEvents.map(evt => {
              const isSelected = selectedEvent.id === evt.id;
              return (
                <button
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  className={`w-full text-left p-3.5 rounded-lg text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-50 text-sky-800 border border-sky-200 font-bold'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <div className="font-bold text-slate-900 text-sm">{evt.name}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{evt.category}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Event Blueprint View */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-mono text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200 font-bold">
              {selectedEvent.category}
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">{selectedEvent.name}</h2>
            <p className="text-xs text-slate-500 mt-1">{selectedEvent.description}</p>
          </div>

          {/* Sub Events */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-sky-600" />
              <span>Sub-Events Breakdown</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedEvent.subEvents.map((sub, i) => (
                <span key={i} className="bg-slate-50 text-sky-800 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold">
                  • {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Default Deliverables */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
              <Film className="w-4 h-4 text-sky-600" />
              <span>Standard Deliverables Package</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {selectedEvent.defaultDeliverables.map((del, i) => (
                <div key={i} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center space-x-2 text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Crew */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Recommended Operational Crew Deployment</span>
            </h3>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                <span className="text-slate-500 block">Photographers</span>
                <span className="text-lg font-black text-slate-900">{selectedEvent.recommendedCrew.photographers}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                <span className="text-slate-500 block">Videographers</span>
                <span className="text-lg font-black text-slate-900">{selectedEvent.recommendedCrew.videographers}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                <span className="text-slate-500 block">Drone Pilots</span>
                <span className="text-lg font-black text-slate-900">{selectedEvent.recommendedCrew.droneOperators}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
