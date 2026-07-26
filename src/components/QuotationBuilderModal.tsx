import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Printer, 
  ArrowRight, 
  Percent, 
  Sparkles,
  Building2,
  DollarSign
} from 'lucide-react';
import { Lead, QuotationItem, PBOSProject } from '../types/pbos';
import { TAXONOMY_EVENTS } from '../data/taxonomy';

interface QuotationBuilderModalProps {
  lead: Lead | null;
  onClose: () => void;
  onConvertToBooking: (projectData: Partial<PBOSProject>) => void;
}

export const QuotationBuilderModal: React.FC<QuotationBuilderModalProps> = ({
  lead,
  onClose,
  onConvertToBooking
}) => {
  if (!lead) return null;

  // Search taxonomy for default items
  const matchedTaxonomy = TAXONOMY_EVENTS.find(t => t.name.toLowerCase().includes(lead.eventType.toLowerCase())) || TAXONOMY_EVENTS[0];

  const [items, setItems] = useState<QuotationItem[]>([
    { description: `${lead.eventType} Photography & Cinematography Main Package`, qty: 1, rate: lead.budgetEstimate * 0.8, amount: lead.budgetEstimate * 0.8 },
    { description: 'Aerial Drone 4K Coverage & Teaser Reel', qty: 1, rate: lead.budgetEstimate * 0.12, amount: lead.budgetEstimate * 0.12 },
    { description: 'High Gloss Flush Mount Photo Album (40 Pages)', qty: 1, rate: lead.budgetEstimate * 0.08, amount: lead.budgetEstimate * 0.08 }
  ]);

  const [discount, setDiscount] = useState<number>(0);
  const [gstPercent, setGstPercent] = useState<number>(18);
  const [terms, setTerms] = useState<string[]>([
    '50% Advance booking deposit required to confirm dates.',
    '40% Due on the completion of shooting days.',
    '10% Final balance due before final high-res digital deliverable release.',
    'RAW files will be preserved on cloud for 180 days post-delivery.'
  ]);

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const afterDiscount = Math.max(0, subtotal - discount);
  const gstAmount = (afterDiscount * gstPercent) / 100;
  const grandTotal = afterDiscount + gstAmount;

  const handleAddItem = () => {
    setItems([...items, { description: 'Additional Photography / Deliverable Item', qty: 1, rate: 10000, amount: 10000 }]);
  };

  const handleUpdateItem = (index: number, field: keyof QuotationItem, value: any) => {
    const updated = [...items];
    const item = { ...updated[index], [field]: value };
    if (field === 'qty' || field === 'rate') {
      item.amount = Number(item.qty) * Number(item.rate);
    }
    updated[index] = item;
    setItems(updated);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleConvert = () => {
    onConvertToBooking({
      clientName: lead.clientName,
      clientPhone: lead.phone,
      clientEmail: lead.email,
      category: lead.category,
      eventType: lead.eventType,
      eventDate: lead.fromDate === lead.toDate ? lead.fromDate : `${lead.fromDate} to ${lead.toDate}`,
      venue: lead.venue,
      branch: lead.branch,
      totalBudget: grandTotal,
      advancePaid: grandTotal * 0.5,
      balanceDue: grandTotal * 0.5,
      stage: 'Booking Confirmed',
      progressPercent: 10,
      qcPassed: false,
      team: {
        photographers: ['Siddharth Rao'],
        videographers: ['Deepak Kumar'],
        droneOperators: ['Deepak Kumar'],
        editors: ['Neha Gupta'],
        albumDesigners: ['Manish Hegde'],
        deliveryAgent: 'Karthik Raja',
        equipmentAssigned: ['Sony A7IV', 'DJI Drone']
      },
      requirements: {
        specialMoments: ['Couple Entry', 'Family Stage Shots'],
        hasDrone: true,
        hasSlowMotion: true,
        isTraditionalVideo: true,
        isCinematicFilm: true,
        requiresInterviews: true,
        familyPhotoChecklist: ['Parents', 'Siblings'],
        shootingStyle: 'Cinematic',
        musicPreferences: ['Acoustic Instrumental'],
        moodboardLinks: [],
        deliverablesList: [
          { id: 'd1', title: 'Cinematic Teaser (60s)', type: 'Reel', status: 'Pending', assignee: 'Neha Gupta' },
          { id: 'd2', title: 'Main Highlights Film', type: 'Video', status: 'Pending', assignee: 'Neha Gupta' },
          { id: 'd3', title: 'Photo Album (40 Pages)', type: 'Album', status: 'Pending', assignee: 'Manish Hegde' }
        ]
      }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full p-6 shadow-xl space-y-6 my-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-sky-50 text-sky-700 text-xs font-bold px-2.5 py-0.5 rounded border border-sky-200">
                PBOS Quotation Builder
              </span>
              <span className="text-slate-500 text-xs font-mono">
                REF-QUOTE-{lead.id.toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              Quotation for {lead.clientName} ({lead.eventType})
            </h2>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer p-1"
          >
            ✕
          </button>
        </div>

        {/* Lead Summary Header */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 block">Client Phone</span>
            <span className="font-bold text-slate-900">{lead.phone}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Event Duration</span>
            <span className="font-bold text-sky-700">
              {lead.fromDate === lead.toDate ? lead.fromDate : `${lead.fromDate} to ${lead.toDate}`}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Venue</span>
            <span className="font-bold text-slate-700 truncate block">{lead.venue}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Estimated Budget</span>
            <span className="font-bold text-emerald-600">₹{lead.budgetEstimate.toLocaleString()}</span>
          </div>
        </div>

        {/* Items Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Itemized Services & Packages</h3>
            <button
              onClick={handleAddItem}
              className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Package Item</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <th className="py-2.5 px-3">Service Description</th>
                  <th className="py-2.5 px-3 w-20">Qty</th>
                  <th className="py-2.5 px-3 w-32">Rate (₹)</th>
                  <th className="py-2.5 px-3 w-32">Amount (₹)</th>
                  <th className="py-2.5 px-3 w-12 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <input
                        type="text"
                        value={item.description}
                        onChange={e => handleUpdateItem(index, 'description', e.target.value)}
                        className="w-full bg-slate-50 text-slate-900 px-2 py-1.5 rounded border border-slate-200 focus:outline-none focus:border-sky-500"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={item.qty}
                        onChange={e => handleUpdateItem(index, 'qty', Number(e.target.value))}
                        className="w-full bg-slate-50 text-slate-900 px-2 py-1.5 rounded border border-slate-200 focus:outline-none focus:border-sky-500"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={item.rate}
                        onChange={e => handleUpdateItem(index, 'rate', Number(e.target.value))}
                        className="w-full bg-slate-50 text-slate-900 px-2 py-1.5 rounded border border-slate-200 focus:outline-none focus:border-sky-500 font-mono"
                      />
                    </td>
                    <td className="p-2 font-mono font-bold text-sky-800">
                      ₹{(item.amount ?? 0).toLocaleString()}
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="text-slate-400 hover:text-rose-600 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calculations Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          
          {/* Terms & Conditions */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <h4 className="font-bold text-slate-900 mb-2">Terms & Conditions</h4>
            <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
              {terms.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          </div>

          {/* Pricing Summary */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-mono font-bold text-slate-900">₹{(subtotal ?? 0).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-slate-600">
              <span>Discount (₹)</span>
              <input
                type="number"
                value={discount}
                onChange={e => setDiscount(Number(e.target.value))}
                className="w-24 bg-white text-right px-2 py-1 rounded border border-slate-200 font-mono text-slate-900"
              />
            </div>

            <div className="flex justify-between items-center text-slate-600">
              <span>GST ({gstPercent}%)</span>
              <span className="font-mono text-sky-700">₹{(gstAmount ?? 0).toLocaleString()}</span>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm">
              <span className="font-extrabold text-slate-900">Grand Total</span>
              <span className="font-black font-mono text-emerald-600 text-base">
                ₹{(grandTotal ?? 0).toLocaleString()}
              </span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => window.print()}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-lg font-semibold text-xs flex items-center space-x-2 cursor-pointer w-full sm:w-auto justify-center border border-slate-200 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Export PDF</span>
          </button>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 border border-slate-200 cursor-pointer transition-all"
            >
              Save Draft
            </button>

            <button
              onClick={handleConvert}
              className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold px-5 py-2.5 rounded-lg text-xs flex items-center space-x-2 shadow-md shadow-sky-600/20 cursor-pointer transition-all"
            >
              <span>Convert to Confirmed Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
