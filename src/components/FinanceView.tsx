import React, { useState } from 'react';
import { 
  Receipt, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Printer, 
  CheckCircle2, 
  Clock, 
  FileText, 
  UserCheck,
  Building2,
  Calendar
} from 'lucide-react';
import { Invoice, Expense, Employee, BranchLocation } from '../types/pbos';

interface FinanceViewProps {
  invoices: Invoice[];
  expenses: Expense[];
  employees: Employee[];
  currentBranch: BranchLocation;
  onAddInvoice: (inv: Omit<Invoice, 'id'>) => void;
  onAddExpense: (exp: Omit<Expense, 'id'>) => void;
}

export const FinanceView: React.FC<FinanceViewProps> = ({
  invoices,
  expenses,
  employees,
  currentBranch,
  onAddInvoice,
  onAddExpense
}) => {
  const [subTab, setSubTab] = useState<'invoices' | 'expenses' | 'payroll'>('invoices');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  // New Invoice Form
  const [invClientName, setInvClientName] = useState('');
  const [invAmount, setInvAmount] = useState('150000');
  const [invGst, setInvGst] = useState('29ABCDE1234F1Z5');

  // New Expense Form
  const [expCategory, setExpCategory] = useState<Expense['category']>('Fuel & Travel');
  const [expDesc, setExpDesc] = useState('');
  const [expAmount, setExpAmount] = useState('5000');

  const filteredInvoices = invoices.filter(i => true);
  const filteredExpenses = expenses.filter(e => currentBranch === 'Bangalore (HQ)' || e.branch === currentBranch);

  const totalCollected = invoices.reduce((sum, i) => sum + i.amountPaid, 0);
  const totalDue = invoices.reduce((sum, i) => sum + i.balanceDue, 0);
  const totalSpent = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalCollected - totalSpent;

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invClientName) return;

    const sub = Number(invAmount) || 100000;
    const gstAmt = (sub * 18) / 100;
    const tot = sub + gstAmt;

    onAddInvoice({
      invoiceNumber: `INV-2026-00${invoices.length + 1}`,
      projectId: 'proj-1',
      clientName: invClientName,
      clientEmail: `${invClientName.toLowerCase().replace(' ', '')}@gmail.com`,
      clientGst: invGst,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '2026-09-01',
      items: [{ description: 'Photography & Videography Package Services', amount: sub }],
      subtotal: sub,
      gstPercent: 18,
      gstAmount: gstAmt,
      totalAmount: tot,
      amountPaid: tot * 0.5,
      balanceDue: tot * 0.5,
      paymentStatus: 'Partial',
      paymentMode: 'Bank Transfer'
    });

    setShowInvoiceModal(false);
    setInvClientName('');
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expDesc) return;

    onAddExpense({
      category: expCategory,
      description: expDesc,
      amount: Number(expAmount) || 1000,
      date: new Date().toISOString().split('T')[0],
      branch: currentBranch,
      paidBy: 'Rohan Deshmukh (Accounts)'
    });

    setShowExpenseModal(false);
    setExpDesc('');
  };

  return (
    <div id="pbos-finance-module" className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-slate-900">Finance, GST Invoicing & Payroll</h1>
            <span className="bg-sky-50 text-sky-700 text-xs font-bold px-2.5 py-0.5 rounded border border-sky-200">
              Tax Compliant GST
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Studio accounts, receivables, expense tracking, and monthly staff payroll payslips.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowInvoiceModal(true)}
            className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-3.5 py-2 rounded-lg text-xs flex items-center space-x-1.5 cursor-pointer shadow-md shadow-sky-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Generate GST Invoice</span>
          </button>

          <button
            onClick={() => setShowExpenseModal(true)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3.5 py-2 rounded-lg text-xs flex items-center space-x-1.5 cursor-pointer border border-slate-200"
          >
            <Plus className="w-4 h-4 text-sky-600" />
            <span>Log Expense</span>
          </button>
        </div>
      </div>

      {/* Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Total Collections</span>
          <div className="text-2xl font-black text-emerald-600 font-mono">₹{(totalCollected ?? 0).toLocaleString()}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Receivables Due</span>
          <div className="text-2xl font-black text-rose-600 font-mono">₹{(totalDue ?? 0).toLocaleString()}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Studio Operating Expenses</span>
          <div className="text-2xl font-black text-amber-600 font-mono">₹{(totalSpent ?? 0).toLocaleString()}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Estimated Net Profit</span>
          <div className="text-2xl font-black text-sky-600 font-mono">₹{(netProfit ?? 0).toLocaleString()}</div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2 text-xs">
        <button
          onClick={() => setSubTab('invoices')}
          className={`px-4 py-2 rounded-lg font-bold cursor-pointer transition-all ${
            subTab === 'invoices' ? 'bg-sky-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          Invoices & Tax Records ({invoices.length})
        </button>

        <button
          onClick={() => setSubTab('expenses')}
          className={`px-4 py-2 rounded-lg font-bold cursor-pointer transition-all ${
            subTab === 'expenses' ? 'bg-sky-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          Expense Register ({expenses.length})
        </button>

        <button
          onClick={() => setSubTab('payroll')}
          className={`px-4 py-2 rounded-lg font-bold cursor-pointer transition-all ${
            subTab === 'payroll' ? 'bg-sky-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          Staff Payroll & Payslips
        </button>
      </div>

      {/* SUB TAB 1: INVOICES */}
      {subTab === 'invoices' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Tax Invoices Register</h3>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <th className="p-3">Invoice #</th>
                <th className="p-3">Client Name</th>
                <th className="p-3">Total (incl. GST)</th>
                <th className="p-3">Amount Paid</th>
                <th className="p-3">Balance Due</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-sky-700">{inv.invoiceNumber}</td>
                  <td className="p-3 font-bold text-slate-900">{inv.clientName}</td>
                  <td className="p-3 font-mono text-slate-700">₹{(inv.totalAmount ?? 0).toLocaleString()}</td>
                  <td className="p-3 font-mono text-emerald-600 font-bold">₹{(inv.amountPaid ?? 0).toLocaleString()}</td>
                  <td className="p-3 font-mono text-rose-600 font-bold">₹{(inv.balanceDue ?? 0).toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      inv.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}>
                      {inv.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => window.print()} className="text-slate-400 hover:text-slate-800 cursor-pointer">
                      <Printer className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SUB TAB 2: EXPENSES */}
      {subTab === 'expenses' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Studio Expense Register</h3>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <th className="p-3">Category</th>
                <th className="p-3">Description</th>
                <th className="p-3">Date</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Paid By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredExpenses.map(exp => (
                <tr key={exp.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-sky-700">{exp.category}</td>
                  <td className="p-3 text-slate-800">{exp.description}</td>
                  <td className="p-3 text-slate-500">{exp.date}</td>
                  <td className="p-3 font-mono font-bold text-rose-600">₹{exp.amount.toLocaleString()}</td>
                  <td className="p-3 text-slate-600">{exp.paidBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SUB TAB 3: PAYROLL */}
      {subTab === 'payroll' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Monthly Staff Payroll & Payslip Dispatch</h3>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <th className="p-3">Staff Name</th>
                <th className="p-3">Department</th>
                <th className="p-3">Base Salary</th>
                <th className="p-3">Performance Bonus</th>
                <th className="p-3">Net Payable</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {employees.map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{emp.name}</td>
                  <td className="p-3 text-slate-500">{emp.department}</td>
                  <td className="p-3 font-mono text-slate-700">₹{emp.salary.toLocaleString()}</td>
                  <td className="p-3 font-mono text-emerald-600">+₹5,000</td>
                  <td className="p-3 font-mono font-bold text-emerald-700">₹{(emp.salary + 5000).toLocaleString()}</td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => alert(`Generated PDF Payslip for ${emp.name}`)}
                      className="bg-sky-600 hover:bg-sky-500 text-white px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer shadow-xs"
                    >
                      Payslip PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* INVOICE MODAL */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Generate Tax Invoice</h3>

            <form onSubmit={handleCreateInvoice} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Client Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zenith Tech Solutions"
                  value={invClientName}
                  onChange={e => setInvClientName(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Subtotal Amount (₹)</label>
                <input
                  type="number"
                  value={invAmount}
                  onChange={e => setInvAmount(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Client GST Number</label>
                <input
                  type="text"
                  value={invGst}
                  onChange={e => setInvGst(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowInvoiceModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold cursor-pointer hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold cursor-pointer hover:bg-emerald-500 shadow-xs"
                >
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EXPENSE MODAL */}
      {showExpenseModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Log Studio Expense</h3>

            <form onSubmit={handleCreateExpense} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Expense Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fuel for Bangalore outstation shoot"
                  value={expDesc}
                  onChange={e => setExpDesc(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Expense Category</label>
                <select
                  value={expCategory}
                  onChange={e => setExpCategory(e.target.value as any)}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 cursor-pointer"
                >
                  <option value="Fuel & Travel">Fuel & Travel</option>
                  <option value="Equipment Maintenance">Equipment Maintenance</option>
                  <option value="Food">Food & Catering</option>
                  <option value="Software & Cloud">Software & Cloud</option>
                  <option value="Office Rent">Office Rent</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Amount (₹)</label>
                <input
                  type="number"
                  value={expAmount}
                  onChange={e => setExpAmount(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowExpenseModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold cursor-pointer hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-rose-600 text-white font-bold cursor-pointer hover:bg-rose-500 shadow-xs"
                >
                  Record Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
