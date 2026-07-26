import React, { useState } from 'react';
import { 
  HardDrive, 
  Folder, 
  File, 
  Upload, 
  Trash2, 
  Eye, 
  Download, 
  ShieldAlert, 
  Clock, 
  Plus, 
  Lock, 
  CheckCircle2,
  FileText,
  Video,
  Image as ImageIcon,
  History,
  Cloud,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { CloudFile, CloudFolder, DeletionRequest, ClientDownloadLog, RoleType, DriveSubscriptionState } from '../types/pbos';
import { InpbosDriveModal } from './InpbosDriveModal';

interface CloudStorageViewProps {
  folders: CloudFolder[];
  files: CloudFile[];
  downloadLogs: ClientDownloadLog[];
  currentRole: RoleType;
  driveSubscription: DriveSubscriptionState;
  onUploadFile: (folderId: string, fileName: string) => void;
  onRequestDelete: (fileId: string, reason: string) => void;
  onUpdateDriveSubscription: (newSub: DriveSubscriptionState) => void;
}

export const CloudStorageView: React.FC<CloudStorageViewProps> = ({
  folders,
  files,
  downloadLogs,
  currentRole,
  driveSubscription,
  onUploadFile,
  onRequestDelete,
  onUpdateDriveSubscription
}) => {
  const [selectedFolderId, setSelectedFolderId] = useState<string>(folders[0]?.id || 'fld-1');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDriveModal, setShowDriveModal] = useState(false);
  const [showLimitReachedModal, setShowLimitReachedModal] = useState(false);

  const [newFileName, setNewFileName] = useState('');
  const [deleteReason, setDeleteReason] = useState('');
  const [targetFileToDelete, setTargetFileToDelete] = useState<CloudFile | null>(null);

  const selectedFolder = folders.find(f => f.id === selectedFolderId) || folders[0];
  const currentFiles = files.filter(f => f.folderId === selectedFolderId);

  const canDeleteDirectly = currentRole === 'Company Head' || currentRole === 'Operations Manager';
  const isStorageFull = driveSubscription.usedGB >= driveSubscription.capacityGB;

  const handleOpenUpload = () => {
    if (isStorageFull) {
      setShowLimitReachedModal(true);
    } else {
      setShowUploadModal(true);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName) return;

    if (isStorageFull) {
      setShowUploadModal(false);
      setShowLimitReachedModal(true);
      return;
    }

    onUploadFile(selectedFolderId, newFileName);
    setShowUploadModal(false);
    setNewFileName('');
  };

  const handleConfirmDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetFileToDelete || !deleteReason) return;
    onRequestDelete(targetFileToDelete.id, deleteReason);
    setTargetFileToDelete(null);
    setDeleteReason('');
  };

  return (
    <div id="pbos-storage-module" className="space-y-6 pb-12">
      
      {/* Top Banner & INPBOS Drive Dedicated Subscription Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-sky-600 text-white text-xs font-black px-2.5 py-0.5 rounded flex items-center space-x-1">
                <Cloud className="w-3.5 h-3.5" />
                <span>INPBOS Drive</span>
              </span>
              <h1 className="text-xl font-bold text-slate-900">Cloud Storage & Workspace Vault</h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Standalone workspace cloud storage subscription. Photos, videos, RAW files, albums, and legal documents.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowDriveModal(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3.5 py-2 rounded-lg text-xs flex items-center space-x-1.5 shadow-xs cursor-pointer transition-all"
            >
              <HardDrive className="w-4 h-4 text-sky-400" />
              <span>INPBOS Drive Subscription Plans</span>
            </button>

            <button
              onClick={handleOpenUpload}
              className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center space-x-1.5 shadow-md shadow-sky-600/20 transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload File to Folder</span>
            </button>
          </div>
        </div>

        {/* Storage Capacity Bar & Subscription Indicator */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-bold text-slate-700 gap-2">
            <div className="flex items-center space-x-2">
              <span>Plan: <strong className="text-slate-900 font-extrabold">{driveSubscription.planName}</strong> ({driveSubscription.billingCycle})</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">Renewal: {driveSubscription.renewalDate}</span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="font-mono text-slate-900">
                {(driveSubscription?.usedGB ?? 0).toLocaleString()} GB / {(driveSubscription?.capacityGB ?? 0).toLocaleString()} GB Used ({Math.round(((driveSubscription?.usedGB ?? 0) / (driveSubscription?.capacityGB ?? 1)) * 100)}%)
              </span>
              <button
                onClick={() => setShowDriveModal(true)}
                className="text-sky-700 hover:text-sky-800 font-bold underline text-[11px] cursor-pointer"
              >
                Upgrade Plan →
              </button>
            </div>
          </div>

          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all ${
                isStorageFull 
                  ? 'bg-rose-600' 
                  : (driveSubscription.usedGB / driveSubscription.capacityGB) > 0.8 
                    ? 'bg-amber-500' 
                    : 'bg-sky-600'
              }`}
              style={{ width: `${Math.min(100, Math.round((driveSubscription.usedGB / driveSubscription.capacityGB) * 100))}%` }}
            />
          </div>

          {isStorageFull && (
            <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-lg flex items-center justify-between text-xs text-rose-800 mt-2">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="font-bold">INPBOS Drive Storage Limit Reached! New uploads disabled until upgraded. Existing files remain accessible.</span>
              </div>
              <button
                onClick={() => setShowDriveModal(true)}
                className="bg-rose-600 text-white text-[11px] font-bold px-3 py-1 rounded shadow-xs hover:bg-rose-500 cursor-pointer"
              >
                Upgrade Now
              </button>
            </div>
          )}
        </div>
      </div>


      {/* Main Grid: Folders vs File Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Folder Tree Sidebar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
            <Folder className="w-4 h-4 text-sky-600" />
            <span>Project Folders</span>
          </h3>

          <div className="space-y-1">
            {folders.map(fld => {
              const isSelected = fld.id === selectedFolderId;
              return (
                <button
                  key={fld.id}
                  onClick={() => setSelectedFolderId(fld.id)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-50 text-sky-700 border border-sky-200 shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    <Folder className={`w-4 h-4 ${isSelected ? 'text-sky-600' : 'text-slate-400'}`} />
                    <span className="truncate">{fld.name}</span>
                  </div>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-bold">
                    {fld.fileCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* File List & Details */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-mono text-slate-400 block">Current Path</span>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
                <Folder className="w-5 h-5 text-sky-600" />
                <span>{selectedFolder?.path}</span>
              </h3>
            </div>

            <div className="text-right text-xs text-slate-500">
              <span>{currentFiles.length} Files</span>
            </div>
          </div>

          {/* Files Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <th className="p-3">File Name</th>
                  <th className="p-3">Version</th>
                  <th className="p-3">Size</th>
                  <th className="p-3">Uploaded By</th>
                  <th className="p-3">Watermarked</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {currentFiles.map(file => (
                  <tr key={file.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 border border-sky-200 shrink-0">
                          {file.fileType === 'video' ? <Video className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                        </div>
                        <span className="font-bold text-slate-900 truncate max-w-xs">{file.fileName}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="bg-sky-50 text-sky-700 font-mono text-[10px] px-2 py-0.5 rounded border border-sky-200 font-bold">
                        v{file.version}.0
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-700">{file.sizeFormatted}</td>
                    <td className="p-3 text-slate-600">{file.uploadedBy}</td>
                    <td className="p-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        file.isWatermarked ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {file.isWatermarked ? 'Watermarked' : 'Original High-Res'}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => setTargetFileToDelete(file)}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                        title="Delete File (Governance Log)"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Client Download History Audit Section */}
          <div className="pt-6 border-t border-slate-100 space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <History className="w-4 h-4 text-emerald-600" />
              <span>Client Portal Download History</span>
            </h4>

            <div className="space-y-2 text-xs">
              {downloadLogs.map(log => (
                <div key={log.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-slate-700">
                  <div>
                    <span className="font-bold text-slate-900">{log.clientName}</span> downloaded <strong className="text-sky-700">{log.fileName}</strong>
                    <div className="text-[10px] text-slate-400 mt-0.5">{log.device} • IP: {log.ipAddress}</div>
                  </div>
                  <div className="text-right font-mono text-slate-500 text-[11px]">
                    {log.downloadedAt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* UPLOAD FILE MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Upload New Project Asset</h3>

            <form onSubmit={handleUpload} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">File Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wedding_Film_Master_v2.mp4"
                  value={newFileName}
                  onChange={e => setNewFileName(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-500">
                <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                <span>Simulated Drag & Drop or Click to Select File</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold cursor-pointer hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-sky-600 text-white font-bold cursor-pointer hover:bg-sky-500 shadow-xs"
                >
                  Confirm Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETION GOVERNANCE REASON MODAL */}
      {targetFileToDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 text-rose-600 font-bold">
              <ShieldAlert className="w-5 h-5" />
              <span>Deletion Governance Rule Enforcer</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              INPBOS policy requires an explicit reason for deleting file <strong>{targetFileToDelete.fileName}</strong>. This request will be logged to the immutable Audit Trail.
            </p>

            <form onSubmit={handleConfirmDelete} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">Reason for Deletion Request *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Duplicate upload, superseded by version 2.0"
                  value={deleteReason}
                  onChange={e => setDeleteReason(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setTargetFileToDelete(null)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold cursor-pointer hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold cursor-pointer shadow-xs"
                >
                  Submit Deletion & Log Audit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STORAGE LIMIT REACHED MODAL */}
      {showLimitReachedModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-slate-900">Upload Restricted: Storage Limit Reached!</h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Your INPBOS Drive workspace has reached its allocated capacity limit of <strong>{(driveSubscription?.capacityGB ?? 0).toLocaleString()} GB</strong> ({(driveSubscription?.usedGB ?? 0).toLocaleString()} GB used).
            </p>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 text-left space-y-1">
              <div className="font-bold text-slate-900">INPBOS Drive Storage Policy:</div>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-600">
                <li>New file uploads are blocked until storage capacity is expanded.</li>
                <li><strong>All existing files remain 100% available</strong> for viewing and downloading.</li>
                <li>Upgrades take effect immediately upon payment.</li>
              </ul>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowLimitReachedModal(false);
                  setShowDriveModal(true);
                }}
                className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2.5 rounded-lg text-xs shadow-md shadow-sky-600/20 cursor-pointer transition-all"
              >
                Upgrade INPBOS Drive Storage Plan
              </button>

              <button
                onClick={() => setShowLimitReachedModal(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-lg text-xs cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INPBOS DRIVE SUBSCRIPTION MODAL */}
      {showDriveModal && (
        <InpbosDriveModal
          subscription={driveSubscription}
          onClose={() => setShowDriveModal(false)}
          onUpdateSubscription={(newSub) => {
            onUpdateDriveSubscription(newSub);
          }}
        />
      )}

    </div>
  );
};

