import React, { useState } from 'react';
import { 
  UserPlus, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Building2,
  Lock,
  MessageSquare,
  Plus,
  Search
} from 'lucide-react';
import { Employee, AttendanceRecord, DailyWorkReport, DepartmentType, RoleType, BranchLocation } from '../types/pbos';

interface EmployeeOperationsViewProps {
  employees: Employee[];
  attendance: AttendanceRecord[];
  reports: DailyWorkReport[];
  currentBranch: BranchLocation;
  currentRole: RoleType;
  onClockInToggle: () => void;
  onAddEmployee: (emp: Omit<Employee, 'id'>) => void;
  onSubmitDailyReport: (dwr: Omit<DailyWorkReport, 'id' | 'submittedAt'>) => void;
  onUpdatePermissions: (empId: string, perms: Employee['permissions']) => void;
}

export const EmployeeOperationsView: React.FC<EmployeeOperationsViewProps> = ({
  employees,
  attendance,
  reports,
  currentBranch,
  currentRole,
  onClockInToggle,
  onAddEmployee,
  onSubmitDailyReport,
  onUpdatePermissions
}) => {
  const [subTab, setSubTab] = useState<'directory' | 'attendance' | 'dwr' | 'permissions'>('directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddEmpModal, setShowAddEmpModal] = useState(false);

  // Form states for new employee
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dept, setDept] = useState<DepartmentType>('Photography');
  const [role, setRole] = useState<RoleType>('Photographer');
  const [salary, setSalary] = useState('45000');

  // Daily Work Report state
  const [dwrCompleted, setDwrCompleted] = useState('');
  const [dwrPending, setDwrPending] = useState('');
  const [dwrHours, setDwrHours] = useState('8');

  const filteredEmployees = employees.filter(e => {
    const matchesBranch = currentBranch === 'Bangalore (HQ)' || e.branch === currentBranch;
    const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBranch && matchesSearch;
  });

  const handleCreateEmp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    onAddEmployee({
      empId: `PBOS-0${employees.length + 1}`,
      name,
      email: email || `${name.toLowerCase().replace(' ', '.')}@millionsphoto.com`,
      phone: phone || '+91 98000 11111',
      department: dept,
      designation: role,
      role: role,
      branch: currentBranch,
      joiningDate: new Date().toISOString().split('T')[0],
      salary: Number(salary) || 40000,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200`,
      emergencyContact: '+91 98000 00000',
      status: 'Active',
      todayStatus: 'Online',
      todayClockIn: '09:00 AM',
      permissions: { canUploadFiles: true, canDeleteFiles: false, canApproveDeliverables: false, canEditFinance: false, canCreateProject: false, canOverrideAttendance: false }
    });

    setShowAddEmpModal(false);
    setName('');
  };

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dwrCompleted) return;

    onSubmitDailyReport({
      empId: 'PBOS-001',
      empName: 'Logged Employee',
      date: new Date().toISOString().split('T')[0],
      department: 'Post-Production',
      tasksCompleted: [dwrCompleted],
      pendingTasks: [dwrPending || 'None'],
      filesUploadedCount: 12,
      hoursWorked: Number(dwrHours) || 8,
      managerRating: 5,
      managerReviewNotes: 'Good productivity today.'
    });

    setDwrCompleted('');
    setDwrPending('');
  };

  return (
    <div id="pbos-hr-operations-module" className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-extrabold text-slate-900">Employee & Office Operations</h1>
            <span className="bg-sky-50 text-sky-700 text-xs font-bold px-2.5 py-0.5 rounded border border-sky-200">
              {filteredEmployees.length} Staff Members
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage staff lifecycle, daily work reports, permissions, and attendance logs.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddEmpModal(true)}
            className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center space-x-1.5 cursor-pointer shadow-md shadow-sky-600/20 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Employee</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2 text-xs">
        <button
          onClick={() => setSubTab('directory')}
          className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
            subTab === 'directory' ? 'bg-sky-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          Staff Directory ({filteredEmployees.length})
        </button>

        <button
          onClick={() => setSubTab('attendance')}
          className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
            subTab === 'attendance' ? 'bg-sky-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          Live Attendance Log ({attendance.length})
        </button>

        <button
          onClick={() => setSubTab('dwr')}
          className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
            subTab === 'dwr' ? 'bg-sky-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          Daily Work Reports (DWR)
        </button>

        <button
          onClick={() => setSubTab('permissions')}
          className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
            subTab === 'permissions' ? 'bg-sky-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          Roles & Permissions Matrix
        </button>
      </div>

      {/* SUB TAB 1: DIRECTORY */}
      {subTab === 'directory' && (
        <div className="space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search staff by name, ID, department..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-900 text-xs pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEmployees.map(emp => (
              <div key={emp.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center space-x-3">
                  <img src={emp.avatar} alt={emp.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-sm text-slate-900">{emp.name}</span>
                      <span className="text-[10px] font-mono bg-sky-50 text-sky-700 px-2 py-0.5 rounded border border-sky-200 font-bold">
                        {emp.empId}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 block">{emp.designation}</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-700 pt-2 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Department:</span>
                    <span className="font-semibold">{emp.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Monthly Salary:</span>
                    <span className="font-mono text-emerald-600 font-bold">₹{(emp.salary ?? 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status Today:</span>
                    <span className={`font-bold ${
                      emp.todayStatus === 'Field Work' ? 'text-amber-600' : 'text-emerald-600'
                    }`}>{emp.todayStatus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB TAB 2: ATTENDANCE */}
      {subTab === 'attendance' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Today's Attendance Stream</h3>
            <button
              onClick={onClockInToggle}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer shadow-xs"
            >
              Simulate Clock In / Out
            </button>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <th className="p-3">Employee ID</th>
                <th className="p-3">Staff Name</th>
                <th className="p-3">Clock In Time</th>
                <th className="p-3">Active Hours</th>
                <th className="p-3">Status</th>
                <th className="p-3">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {attendance.map(att => (
                <tr key={att.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-sky-700 font-bold">{att.empId}</td>
                  <td className="p-3 font-bold text-slate-900">{att.empName}</td>
                  <td className="p-3 text-slate-600">{att.clockIn}</td>
                  <td className="p-3 font-mono font-bold text-emerald-600">{att.activeHours} hrs</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 text-[10px] font-bold">
                      {att.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">{att.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SUB TAB 3: DWR */}
      {subTab === 'dwr' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submit DWR */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Submit Daily Work Report (DWR)</h3>
            
            <form onSubmit={handleSendReport} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Tasks Completed Today</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Completed color grading for 15 portraits, edited 60s teaser reel."
                  value={dwrCompleted}
                  onChange={e => setDwrCompleted(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Pending / Blocked Tasks</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Audio sync waiting for client song feedback."
                  value={dwrPending}
                  onChange={e => setDwrPending(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Total Hours Worked</label>
                <input
                  type="number"
                  value={dwrHours}
                  onChange={e => setDwrHours(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2.5 rounded-lg cursor-pointer shadow-xs"
              >
                Submit DWR Report
              </button>
            </form>
          </div>

          {/* DWR Log Stream */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Submitted Reports & Manager Ratings</h3>

            <div className="space-y-3">
              {reports.map(rep => (
                <div key={rep.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{rep.empName}</span>
                      <span className="text-slate-500 ml-2">({rep.department})</span>
                    </div>
                    <div className="flex items-center text-amber-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
                      <span>{rep.managerRating} / 5 Stars</span>
                    </div>
                  </div>

                  <div className="text-slate-800">
                    <strong>Tasks Completed:</strong>
                    <ul className="list-disc pl-4 mt-1 text-slate-600 space-y-0.5">
                      {rep.tasksCompleted.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                  </div>

                  {rep.managerReviewNotes && (
                    <div className="bg-white p-2 rounded border border-slate-200 text-slate-700 text-[11px]">
                      <strong>Manager Feedback:</strong> {rep.managerReviewNotes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 4: PERMISSIONS */}
      {subTab === 'permissions' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Role-Based Granular Access Control</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <th className="p-3">Staff Member</th>
                  <th className="p-3">Role</th>
                  <th className="p-3 text-center">Can Upload</th>
                  <th className="p-3 text-center">Can Delete Files</th>
                  <th className="p-3 text-center">Can Approve QC</th>
                  <th className="p-3 text-center">Can Edit Finance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {employees.map(emp => (
                  <tr key={emp.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{emp.name}</td>
                    <td className="p-3 text-sky-700 font-semibold">{emp.role}</td>
                    <td className="p-3 text-center font-bold text-emerald-600">
                      {emp.permissions.canUploadFiles ? 'YES ✓' : 'NO ✕'}
                    </td>
                    <td className="p-3 text-center font-bold text-rose-600">
                      {emp.permissions.canDeleteFiles ? 'YES ✓' : 'NO ✕'}
                    </td>
                    <td className="p-3 text-center font-bold text-sky-600">
                      {emp.permissions.canApproveDeliverables ? 'YES ✓' : 'NO ✕'}
                    </td>
                    <td className="p-3 text-center font-bold text-slate-700">
                      {emp.permissions.canEditFinance ? 'YES ✓' : 'NO ✕'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD EMPLOYEE MODAL */}
      {showAddEmpModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Register New Employee</h3>

            <form onSubmit={handleCreateEmp} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Varun Reddy"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Department & Role</label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value as RoleType)}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 cursor-pointer"
                >
                  <option value="Photographer">Photographer</option>
                  <option value="Videographer">Videographer</option>
                  <option value="Editor">Editor</option>
                  <option value="Album Designer">Album Designer</option>
                  <option value="Sales Executive">Sales Executive</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Monthly Salary (₹)</label>
                <input
                  type="number"
                  value={salary}
                  onChange={e => setSalary(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddEmpModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold cursor-pointer hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-sky-600 text-white font-bold cursor-pointer hover:bg-sky-500 shadow-xs"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
