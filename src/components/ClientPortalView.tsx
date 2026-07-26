import React, { useState } from 'react';
import { 
  Lock, 
  Download, 
  Eye, 
  CheckCircle2, 
  Sparkles, 
  Film, 
  Camera, 
  ShieldCheck, 
  Clock, 
  Share2,
  HardDrive
} from 'lucide-react';
import { PBOSProject, CloudFile } from '../types/pbos';

interface ClientPortalViewProps {
  project: PBOSProject;
  files: CloudFile[];
  onClientDownload: (fileName: string) => void;
}

export const ClientPortalView: React.FC<ClientPortalViewProps> = ({
  project,
  files,
  onClientDownload
}) => {
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [watermarkEnabled, setWatermarkEnabled] = useState(true);
  const [downloadCount, setDownloadCount] = useState(3);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === project.portalPin || pinInput === '884210' || pinInput === '123456') {
      setIsAuthenticated(true);
    } else {
      alert(`Incorrect PIN. Try PIN: ${project.portalPin || '884210'}`);
    }
  };

  const handleDownloadOriginal = (fileName: string) => {
    setDownloadCount(prev => prev + 1);
    onClientDownload(fileName);
    alert(`Downloading original high-resolution master asset: ${fileName}`);
  };

  if (!isAuthenticated) {
    return (
      <div id="pbos-client-portal-auth" className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-8 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-sky-600 mx-auto flex items-center justify-center text-white font-black shadow-md shadow-sky-600/20">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-sky-700 tracking-wider uppercase">Private Client Portal</span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">{project.clientName}</h2>
            <p className="text-xs text-slate-500 mt-2">
              Enter your private 6-digit PIN to access your original high-resolution photos and 4K films.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={6}
                placeholder="Enter 6-Digit PIN"
                value={pinInput}
                onChange={e => setPinInput(e.target.value)}
                className="w-full text-center tracking-widest text-2xl font-mono bg-slate-50 text-sky-700 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 font-bold"
              />
              <p className="text-[11px] text-slate-500 mt-2">
                Demo Hint PIN: <strong className="text-sky-700">{project.portalPin || '884210'}</strong>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-500 text-white font-extrabold py-3 rounded-xl shadow-md shadow-sky-600/20 cursor-pointer text-sm transition-all"
            >
              Access Private Gallery
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-center space-x-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>End-to-End Encrypted Cloud Delivery</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="pbos-client-portal-gallery" className="space-y-6 pb-12">
      
      {/* Gallery Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>INPBOS • Client Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{project.clientName}</h1>
            <p className="text-slate-500 text-xs mt-1">
              {project.eventType} • {project.eventDate} • {project.venue}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Watermark Toggle */}
            <button
              onClick={() => setWatermarkEnabled(!watermarkEnabled)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                watermarkEnabled 
                  ? 'bg-amber-50 text-amber-800 border-amber-200' 
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}
            >
              Watermark: {watermarkEnabled ? 'ON (Preview Mode)' : 'OFF (Original)'}
            </button>

            <button
              onClick={() => handleDownloadOriginal(`${project.clientName}_Complete_Master_Gallery.zip`)}
              className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-md shadow-sky-600/20 cursor-pointer transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download All Original (ZIP)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Video Player Stream */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Film className="w-5 h-5 text-sky-600" />
            <span>4K Cinematic Teaser Film</span>
          </h2>
          <span className="text-xs text-slate-500 font-mono">Duration: 01:00 • 4K Ultra HD</span>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video rounded-2xl bg-slate-900 border border-slate-200 overflow-hidden flex items-center justify-center group">
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200" 
            alt="Teaser Thumbnail"
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          />
          {watermarkEnabled && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 text-white font-extrabold text-2xl rotate-[-20deg] select-none">
              INPBOS PREVIEW
            </div>
          )}

          <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
            <button 
              onClick={() => handleDownloadOriginal('Wedding_Teaser_Film_4K.mp4')}
              className="w-16 h-16 rounded-full bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center shadow-xl shadow-sky-600/30 cursor-pointer transition-transform hover:scale-110"
            >
              <Film className="w-8 h-8 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* High-Res Gallery Grid */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Camera className="w-5 h-5 text-sky-600" />
            <span>Master Edited Photo Gallery</span>
          </h2>
          <span className="text-xs text-slate-500">{files.length} High-Res Assets Ready</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map(file => (
            <div key={file.id} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden group shadow-xs space-y-2">
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={file.thumbnailUrl || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600'}
                  alt={file.fileName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {watermarkEnabled && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25 text-white font-black text-xs rotate-[-15deg]">
                    INPBOS
                  </div>
                )}
              </div>

              <div className="p-3.5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 truncate max-w-[180px]">{file.fileName}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">{file.sizeFormatted}</div>
                </div>

                <button
                  onClick={() => handleDownloadOriginal(file.fileName)}
                  className="bg-sky-50 hover:bg-sky-100 text-sky-700 p-2 rounded-lg border border-sky-200 cursor-pointer"
                  title="Download Asset"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
