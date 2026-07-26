import React, { useState } from 'react';
import { 
  HardDrive, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight, 
  CreditCard, 
  FileText, 
  Building2, 
  Sparkles, 
  Send, 
  Lock, 
  Printer, 
  HelpCircle,
  Clock,
  ChevronRight,
  TrendingUp,
  Cloud,
  CheckCircle2
} from 'lucide-react';
import { DriveStoragePlan, DriveSubscriptionState, DriveTaxInvoice } from '../types/pbos';
import { INPBOS_DRIVE_PLANS } from '../data/drivePlans';

interface InpbosDriveModalProps {
  subscription: DriveSubscriptionState;
  onClose: () => void;
  onUpdateSubscription: (newSubscription: DriveSubscriptionState) => void;
}

export const InpbosDriveModal: React.FC<InpbosDriveModalProps> = ({
  subscription,
  onClose,
  onUpdateSubscription
}) => {
  const [activeTab, setActiveTab] = useState<'plans' | 'invoices' | 'enterprise'>('plans');
  const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Yearly'>(subscription.billingCycle);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<DriveStoragePlan | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  // Checkout form state
  const [companyName, setCompanyName] = useState('INPBOS International Pvt. Ltd.');
  const [gstin, setGstin] = useState('29ABCDE1234F1Z5');
  const [paymentMode, setPaymentMode] = useState<'Credit/Debit Card' | 'Net Banking' | 'UPI AutoPay' | 'NEFT/RTGS'>('Net Banking');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Selected Invoice for Print/View Modal
  const [selectedInvoiceForView, setSelectedInvoiceForView] = useState<DriveTaxInvoice | null>(null);

  // Enterprise Contact Sales form state
  const [enterpriseForm, setEnterpriseForm] = useState({
    contactPerson: 'Vikram Million',
    email: 'maharshithefox@gmail.com',
    requiredCapacityTB: '25',
    multiRegionBackup: true,
    dedicatedInfra: true,
    notes: 'Need 25 TB custom storage with high ingress speed for multi-city wedding videography archive.'
  });
  const [enterpriseSubmitted, setEnterpriseSubmitted] = useState(false);

  // Current active plan
  const currentPlan = INPBOS_DRIVE_PLANS.find(p => p.id === subscription.currentPlanId) || INPBOS_DRIVE_PLANS[7];

  // Calculations for checkout
  const getSubtotal = (plan: DriveStoragePlan) => {
    if (plan.isTrial) return 0;
    if (billingCycle === 'Yearly') {
      // 10% annual discount applied to 12 months
      return Math.round(plan.monthlyPrice * 12 * 0.9);
    }
    return plan.monthlyPrice;
  };

  const calculateGst = (subtotal: number) => Math.round(subtotal * 0.18);

  const handleSelectPlan = (plan: DriveStoragePlan) => {
    if (plan.isCustom) {
      setActiveTab('enterprise');
      return;
    }

    // Downgrade check rule: Cannot downgrade if usage exceeds target capacity
    if (subscription.usedGB > plan.capacityGB) {
      alert(`⚠️ Downgrade Restricted!\n\nYour current storage usage (${subscription.usedGB.toLocaleString()} GB) exceeds the capacity of the ${plan.name} (${plan.capacityGB.toLocaleString()} GB).\n\nPlease delete existing files or select a plan with at least ${subscription.usedGB.toLocaleString()} GB capacity.`);
      return;
    }

    if (plan.id === subscription.currentPlanId && billingCycle === subscription.billingCycle) {
      alert(`You are currently on the ${plan.name} with ${billingCycle} billing.`);
      return;
    }

    setSelectedPlanForCheckout(plan);
    setShowCheckout(true);
  };

  const handleConfirmCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanForCheckout) return;

    setIsProcessingPayment(true);

    setTimeout(() => {
      const subtotal = getSubtotal(selectedPlanForCheckout);
      const gstAmount = calculateGst(subtotal);
      const totalAmount = subtotal + gstAmount;

      const newInvoice: DriveTaxInvoice = {
        id: `inv-drive-${Date.now()}`,
        invoiceNumber: `INV-DRIVE-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        planId: selectedPlanForCheckout.id,
        planName: selectedPlanForCheckout.name,
        capacityGB: selectedPlanForCheckout.capacityGB,
        billingCycle,
        subtotal,
        gstPercent: 18,
        gstAmount,
        totalAmount,
        issuedDate: new Date().toISOString().split('T')[0],
        paymentMode,
        status: 'Paid',
        companyName,
        gstin
      };

      const updatedState: DriveSubscriptionState = {
        currentPlanId: selectedPlanForCheckout.id,
        planName: selectedPlanForCheckout.name,
        capacityGB: selectedPlanForCheckout.capacityGB,
        usedGB: subscription.usedGB,
        billingCycle,
        renewalDate: billingCycle === 'Yearly' ? '2027-08-15' : '2026-09-15',
        status: subscription.usedGB >= selectedPlanForCheckout.capacityGB ? 'Limit Exceeded' : 'Active',
        invoices: [newInvoice, ...subscription.invoices]
      };

      onUpdateSubscription(updatedState);
      setIsProcessingPayment(false);
      setShowCheckout(false);
      setSelectedPlanForCheckout(null);
      alert(`🎉 INPBOS Drive Subscription Upgraded Successfully!\n\nYour new storage limit is now ${selectedPlanForCheckout.name} (${selectedPlanForCheckout.capacityGB.toLocaleString()} GB).\nTax Invoice ${newInvoice.invoiceNumber} generated.`);
    }, 1000);
  };

  const handleEnterpriseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnterpriseSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-5xl w-full p-6 shadow-xl space-y-6 my-6 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-sky-600 text-white text-xs font-black px-2.5 py-0.5 rounded flex items-center space-x-1">
                <Cloud className="w-3.5 h-3.5" />
                <span>INPBOS Drive</span>
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                Standalone Cloud Storage Module
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              INPBOS Drive – Cloud Storage Subscriptions & Plans
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Dedicated high-performance cloud storage independent of software licensing. Upgrade, downgrade, or expand capacity anytime.
            </p>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer p-1 self-start sm:self-center"
          >
            ✕
          </button>
        </div>

        {/* Current Storage Meter Summary Banner */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block">Current Active Storage Plan</span>
            <span className="font-extrabold text-slate-900 text-sm flex items-center space-x-1.5 mt-0.5">
              <span>{subscription.planName}</span>
              <span className="bg-sky-100 text-sky-800 text-[10px] px-2 py-0.5 rounded font-semibold border border-sky-200">
                {subscription.billingCycle}
              </span>
            </span>
          </div>

          <div>
            <span className="text-slate-500 block">Workspace Storage Usage</span>
            <div className="mt-1">
              <div className="flex justify-between font-bold text-slate-900 text-xs mb-1">
                <span>{(subscription?.usedGB ?? 0).toLocaleString()} GB / {(subscription?.capacityGB ?? 0).toLocaleString()} GB</span>
                <span>{Math.round(((subscription?.usedGB ?? 0) / (subscription?.capacityGB ?? 1)) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    (subscription?.usedGB ?? 0) >= (subscription?.capacityGB ?? 0)
                      ? 'bg-rose-600' 
                      : ((subscription?.usedGB ?? 0) / (subscription?.capacityGB ?? 1)) > 0.8 
                        ? 'bg-amber-500' 
                        : 'bg-sky-600'
                  }`}
                  style={{ width: `${Math.min(100, Math.round(((subscription?.usedGB ?? 0) / (subscription?.capacityGB ?? 1)) * 100))}%` }}
                />
              </div>
            </div>
          </div>

          <div>
            <span className="text-slate-500 block">Available Space</span>
            <span className="font-mono font-bold text-emerald-600 text-sm mt-0.5 block">
              {Math.max(0, (subscription?.capacityGB ?? 0) - (subscription?.usedGB ?? 0)).toLocaleString()} GB Free
            </span>
          </div>

          <div>
            <span className="text-slate-500 block">Next Storage Renewal</span>
            <span className="font-mono text-slate-900 font-bold text-sm mt-0.5 block">
              {subscription.renewalDate}
            </span>
          </div>
        </div>

        {/* Modal Tabs */}
        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
          <div className="flex space-x-2 text-xs">
            <button
              onClick={() => { setActiveTab('plans'); setShowCheckout(false); }}
              className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'plans' && !showCheckout
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Storage Plans & Rates
            </button>

            <button
              onClick={() => { setActiveTab('invoices'); setShowCheckout(false); }}
              className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'invoices'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Billing History & Tax Invoices ({subscription.invoices.length})
            </button>

            <button
              onClick={() => { setActiveTab('enterprise'); setShowCheckout(false); }}
              className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'enterprise'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Enterprise Custom Storage (&gt;10 TB)
            </button>
          </div>

          {activeTab === 'plans' && !showCheckout && (
            <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg text-xs font-bold border border-slate-200">
              <button
                onClick={() => setBillingCycle('Monthly')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  billingCycle === 'Monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('Yearly')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center space-x-1 ${
                  billingCycle === 'Yearly' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                <span>Yearly Billing</span>
                <span className="bg-emerald-500 text-white text-[9px] px-1 py-0.2 rounded">Save 10%</span>
              </button>
            </div>
          )}
        </div>

        {/* TAB 1: STORAGE PLANS GRID */}
        {activeTab === 'plans' && !showCheckout && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {INPBOS_DRIVE_PLANS.map(plan => {
                const isCurrent = plan.id === subscription.currentPlanId && billingCycle === subscription.billingCycle;
                const isDowngradeImpossible = subscription.usedGB > plan.capacityGB;
                const subtotal = getSubtotal(plan);

                return (
                  <div 
                    key={plan.id}
                    className={`rounded-xl border p-4 flex flex-col justify-between transition-all space-y-3 ${
                      isCurrent
                        ? 'bg-sky-50/70 border-sky-500 ring-2 ring-sky-500/20 shadow-md'
                        : plan.isCustom
                          ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white border-slate-700'
                          : 'bg-white border-slate-200 hover:border-sky-300 shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                            plan.isTrial ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                            plan.isCustom ? 'bg-sky-500 text-white' :
                            'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}>
                            {plan.isTrial ? 'Free Trial' : plan.isCustom ? 'Custom Enterprise' : `${(plan.capacityGB ?? 0).toLocaleString()} GB Workspace`}
                          </span>
                          <h3 className={`text-lg font-black mt-2 ${plan.isCustom ? 'text-white' : 'text-slate-900'}`}>
                            {plan.name}
                          </h3>
                        </div>

                        {isCurrent && (
                          <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Current Plan</span>
                          </span>
                        )}
                      </div>

                      {/* Pricing Display */}
                      <div className="mt-3 pt-3 border-t border-slate-200/60">
                        {plan.isTrial ? (
                          <div className="text-xl font-black text-slate-900">Free <span className="text-xs font-normal text-slate-500">(Trial Only)</span></div>
                        ) : plan.isCustom ? (
                          <div className="text-lg font-black text-sky-400">Custom Enterprise Pricing</div>
                        ) : (
                          <div>
                            <div className="flex items-baseline space-x-1">
                              <span className="text-2xl font-black text-slate-900 font-mono">₹{(plan.monthlyPrice ?? 0).toLocaleString()}</span>
                              <span className="text-slate-500 text-xs">+ 18% GST / mo</span>
                            </div>
                            {billingCycle === 'Yearly' && (
                              <div className="text-[11px] text-emerald-600 font-bold mt-0.5">
                                Billed annually at ₹{(subtotal ?? 0).toLocaleString()} + GST
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <ul className="mt-3 space-y-1.5 text-xs">
                        {plan.features?.map((feat, i) => (
                          <li key={i} className={`flex items-center space-x-2 ${plan.isCustom ? 'text-slate-300' : 'text-slate-600'}`}>
                            <Check className={`w-3.5 h-3.5 shrink-0 ${plan.isCustom ? 'text-sky-400' : 'text-sky-600'}`} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <div className="pt-3">
                      {isCurrent ? (
                        <button 
                          disabled
                          className="w-full bg-emerald-100 text-emerald-800 font-bold py-2 rounded-lg text-xs cursor-not-allowed border border-emerald-200"
                        >
                          Active Plan
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSelectPlan(plan)}
                          className={`w-full font-bold py-2.5 rounded-lg text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                            plan.isCustom
                              ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-md'
                              : isDowngradeImpossible
                                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                                : 'bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20'
                          }`}
                        >
                          <span>{plan.isCustom ? 'Contact Enterprise Sales' : isDowngradeImpossible ? 'Exceeds Usage Capacity' : 'Select Storage Plan'}</span>
                          {!isDowngradeImpossible && <ArrowRight className="w-3.5 h-3.5" />}
                        </button>
                      )}
                      {isDowngradeImpossible && !plan.isCustom && (
                        <p className="text-[10px] text-rose-600 mt-1 text-center font-medium">
                          Usage ({subscription.usedGB} GB) exceeds plan limit ({plan.capacityGB} GB)
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CHECKOUT FLOW */}
        {showCheckout && selectedPlanForCheckout && (
          <form onSubmit={handleConfirmCheckout} className="space-y-5 text-xs bg-slate-50 p-5 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-sky-600" />
                <span>INPBOS Drive Checkout & Payment Confirmation</span>
              </h3>
              <button 
                type="button"
                onClick={() => setShowCheckout(false)}
                className="text-slate-500 hover:text-slate-800 font-bold text-xs cursor-pointer"
              >
                ← Back to Plans
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Order Summary */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Selected Storage Order</h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Storage Plan</span>
                    <span className="font-bold text-slate-900">{selectedPlanForCheckout.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Capacity</span>
                    <span className="font-bold text-slate-900">{selectedPlanForCheckout.capacityGB.toLocaleString()} GB Dedicated Cloud</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Billing Interval</span>
                    <span className="font-bold text-sky-700">{billingCycle}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-100">
                    <span className="text-slate-600">Subtotal Amount</span>
                    <span className="font-mono font-bold text-slate-900">₹{getSubtotal(selectedPlanForCheckout).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">18% GST (Goods & Services Tax)</span>
                    <span className="font-mono text-sky-700">₹{calculateGst(getSubtotal(selectedPlanForCheckout)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-extrabold">
                    <span className="text-slate-900">Total Payable Amount</span>
                    <span className="font-mono text-emerald-600 text-base">
                      ₹{(getSubtotal(selectedPlanForCheckout) + calculateGst(getSubtotal(selectedPlanForCheckout))).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-sky-50 p-3 rounded-lg border border-sky-200 text-[11px] text-sky-800 space-y-1">
                  <div className="font-bold flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                    <span>Instant Activation & Tax Invoice Guarantee</span>
                  </div>
                  <p>Storage capacity will be expanded immediately upon payment. An official tax invoice will be issued to your company profile.</p>
                </div>
              </div>

              {/* Billing & Payment Form */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Company Billing Details</h4>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Company Legal Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">GSTIN Number (for Tax Credit)</label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={e => setGstin(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 font-mono font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Select Payment Gateway / Method</label>
                  <select
                    value={paymentMode}
                    onChange={e => setPaymentMode(e.target.value as any)}
                    className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 font-semibold"
                  >
                    <option value="Net Banking">HDFC / ICICI Net Banking</option>
                    <option value="UPI AutoPay">UPI / GPay / PhonePe</option>
                    <option value="Credit/Debit Card">Corporate Credit / Debit Card</option>
                    <option value="NEFT/RTGS">NEFT / RTGS Wire Transfer</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessingPayment}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 rounded-lg text-xs flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
                  >
                    {isProcessingPayment ? (
                      <span>Activating Cloud Storage...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Pay ₹{(getSubtotal(selectedPlanForCheckout) + calculateGst(getSubtotal(selectedPlanForCheckout))).toLocaleString()} & Activate Storage</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </form>
        )}

        {/* TAB 2: TAX INVOICES & BILLING HISTORY */}
        {activeTab === 'invoices' && (
          <div className="space-y-4 text-xs">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h4 className="font-bold text-slate-900 flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-sky-600" />
                  <span>INPBOS Drive Tax Invoices Register</span>
                </h4>
                <span className="text-slate-500">Every storage purchase generates an official GST Tax Invoice</span>
              </div>

              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                    <th className="p-3">Invoice #</th>
                    <th className="p-3">Plan Name</th>
                    <th className="p-3">Capacity</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Subtotal</th>
                    <th className="p-3">GST (18%)</th>
                    <th className="p-3">Total Paid</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Tax Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {subscription.invoices.map(inv => (
                    <tr key={inv.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-sky-700">{inv.invoiceNumber}</td>
                      <td className="p-3 font-bold text-slate-900">{inv.planName}</td>
                      <td className="p-3 font-semibold text-slate-700">{inv.capacityGB.toLocaleString()} GB</td>
                      <td className="p-3 text-slate-600">{inv.issuedDate}</td>
                      <td className="p-3 font-mono">₹{inv.subtotal.toLocaleString()}</td>
                      <td className="p-3 font-mono text-sky-700">₹{inv.gstAmount.toLocaleString()}</td>
                      <td className="p-3 font-mono font-bold text-emerald-600">₹{inv.totalAmount.toLocaleString()}</td>
                      <td className="p-3">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setSelectedInvoiceForView(inv)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded border border-slate-200 flex items-center space-x-1 cursor-pointer ml-auto"
                        >
                          <Printer className="w-3.5 h-3.5 text-sky-600" />
                          <span>View Tax Invoice</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ENTERPRISE CUSTOM STORAGE */}
        {activeTab === 'enterprise' && (
          <div className="space-y-5 text-xs">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-2xl border border-slate-700 shadow-lg space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-sky-500 text-white font-black text-[10px] px-2.5 py-0.5 rounded uppercase tracking-wider">
                  Enterprise Tier
                </span>
                <span className="text-slate-300 text-xs">For Studios & Networks Requiring &gt;10 TB Cloud Storage</span>
              </div>
              <h3 className="text-2xl font-black text-white">Custom Enterprise Cloud Storage Solutions</h3>
              <p className="text-slate-300 max-w-3xl leading-relaxed">
                Need tens or hundreds of terabytes for high-volume video archives, 8K raw cinema assets, and multi-branch teams? INPBOS Enterprise provides dedicated cloud storage architecture tailored to your business requirements.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <span className="font-bold text-sky-400 block mb-1">Custom Storage Capacity</span>
                  <span className="text-slate-300">Scalable from 15 TB to 500 TB+</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <span className="font-bold text-emerald-400 block mb-1">Dedicated Pricing & Terms</span>
                  <span className="text-slate-300">Volume discounting & flexible billing</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <span className="font-bold text-amber-400 block mb-1">Priority 24/7 SLA</span>
                  <span className="text-slate-300">99.99% Uptime & dedicated engineer</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <span className="font-bold text-indigo-400 block mb-1">Multi-Region Backup</span>
                  <span className="text-slate-300">Geographic redundancy & immutable vault</span>
                </div>
              </div>
            </div>

            {/* Enterprise Form */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2">
                Submit Custom Enterprise Storage Inquiry
              </h4>

              {enterpriseSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h5 className="font-black text-slate-900 text-base">Inquiry Submitted Successfully!</h5>
                  <p className="text-slate-600 max-w-lg mx-auto">
                    Thank you, {enterpriseForm.contactPerson}. Our Enterprise Cloud Architect has received your request for <strong>{enterpriseForm.requiredCapacityTB} TB</strong> custom storage. We will reach out to <strong>{enterpriseForm.email}</strong> within 2 business hours.
                  </p>
                  <button
                    onClick={() => setEnterpriseSubmitted(false)}
                    className="mt-3 bg-sky-600 text-white font-bold px-4 py-2 rounded-lg text-xs cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnterpriseSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Contact Executive Name</label>
                    <input
                      type="text"
                      value={enterpriseForm.contactPerson}
                      onChange={e => setEnterpriseForm({ ...enterpriseForm, contactPerson: e.target.value })}
                      className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 font-semibold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      value={enterpriseForm.email}
                      onChange={e => setEnterpriseForm({ ...enterpriseForm, email: e.target.value })}
                      className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 font-semibold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Support Dispatch Target</label>
                    <div className="w-full bg-slate-100 text-slate-700 px-3 py-2 rounded-lg border border-slate-200 text-xs font-mono font-bold flex items-center justify-between">
                      <span>maharshithefox@gmail.com</span>
                      <span className="text-[10px] text-sky-700 font-sans font-bold bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">Email Routing</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Estimated Storage Capacity Required (TB)</label>
                    <select
                      value={enterpriseForm.requiredCapacityTB}
                      onChange={e => setEnterpriseForm({ ...enterpriseForm, requiredCapacityTB: e.target.value })}
                      className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 font-bold"
                    >
                      <option value="15">15 TB Dedicated Vault</option>
                      <option value="25">25 TB Enterprise Archive</option>
                      <option value="50">50 TB Multi-Branch Network</option>
                      <option value="100">100 TB High-Speed Master Studio</option>
                      <option value="250">250 TB+ Unlimited Custom Grid</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 flex flex-wrap gap-4 pt-1">
                    <label className="flex items-center space-x-2 text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enterpriseForm.dedicatedInfra}
                        onChange={e => setEnterpriseForm({ ...enterpriseForm, dedicatedInfra: e.target.checked })}
                        className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                      />
                      <span>Request Dedicated Cloud Infrastructure Bucket</span>
                    </label>

                    <label className="flex items-center space-x-2 text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enterpriseForm.multiRegionBackup}
                        onChange={e => setEnterpriseForm({ ...enterpriseForm, multiRegionBackup: e.target.checked })}
                        className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                      />
                      <span>Request Multi-Region Automated Cold Backup</span>
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-slate-600 font-semibold mb-1">Specific Workflow Notes / Custom Requirements</label>
                    <textarea
                      rows={3}
                      value={enterpriseForm.notes}
                      onChange={e => setEnterpriseForm({ ...enterpriseForm, notes: e.target.value })}
                      className="w-full bg-slate-50 text-slate-900 p-3 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 text-xs"
                    />
                  </div>

                  <div className="md:col-span-2 pt-2">
                    <button
                      type="submit"
                      className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold px-6 py-3 rounded-lg text-xs flex items-center space-x-2 shadow-md shadow-sky-600/20 cursor-pointer transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Request Custom Enterprise Quote</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* TAX INVOICE PRINT/VIEW MODAL */}
        {selectedInvoiceForView && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 my-6">
              
              <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-slate-900 text-lg">INPBOS Drive Tax Invoice</span>
                    <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-2.5 py-0.5 rounded border border-emerald-200">PAID</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Official GST Tax Invoice for Cloud Storage Subscription</p>
                </div>

                <button 
                  onClick={() => setSelectedInvoiceForView(null)}
                  className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Printable Invoice Body */}
              <div id="printable-tax-invoice" className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-500 block">Issued To (Company)</span>
                    <span className="font-extrabold text-slate-900 block text-sm">{selectedInvoiceForView.companyName}</span>
                    <span className="text-slate-600 font-mono">GSTIN: {selectedInvoiceForView.gstin}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-slate-500 block">Invoice Details</span>
                    <span className="font-mono font-extrabold text-sky-700 block text-sm">{selectedInvoiceForView.invoiceNumber}</span>
                    <span className="text-slate-600 block">Date: {selectedInvoiceForView.issuedDate}</span>
                    <span className="text-slate-600 block">Payment Mode: {selectedInvoiceForView.paymentMode}</span>
                  </div>
                </div>

                {/* Line Item Table */}
                <table className="w-full text-left border border-slate-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-slate-100 font-bold text-slate-700 border-b border-slate-200">
                      <th className="p-2.5">Description</th>
                      <th className="p-2.5">Billing Cycle</th>
                      <th className="p-2.5 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="p-2.5 font-bold text-slate-900">
                        INPBOS Drive Dedicated Cloud Storage – {selectedInvoiceForView.planName} ({selectedInvoiceForView.capacityGB.toLocaleString()} GB)
                      </td>
                      <td className="p-2.5 text-slate-700">{selectedInvoiceForView.billingCycle}</td>
                      <td className="p-2.5 text-right font-mono font-bold">₹{selectedInvoiceForView.subtotal.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Totals */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5 text-right font-mono">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>₹{selectedInvoiceForView.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sky-700">
                    <span>IGST / CGST+SGST ({selectedInvoiceForView.gstPercent}%)</span>
                    <span>₹{selectedInvoiceForView.gstAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-2 border-t border-slate-200">
                    <span>Total Paid Amount</span>
                    <span className="text-emerald-600 text-base">₹{selectedInvoiceForView.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                <button
                  onClick={() => window.print()}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2 rounded-lg text-xs flex items-center space-x-1.5 cursor-pointer border border-slate-200"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Tax Invoice</span>
                </button>

                <button
                  onClick={() => setSelectedInvoiceForView(null)}
                  className="bg-sky-600 text-white font-bold px-4 py-2 rounded-lg text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
