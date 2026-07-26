import React, { useEffect } from 'react';
import { Camera, Globe, ArrowRight, ShieldCheck, Zap, X, ExternalLink } from 'lucide-react';

interface DomainSplashScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToPlans?: () => void;
  onNavigateToPortal?: () => void;
}

export const DomainSplashScreen: React.FC<DomainSplashScreenProps> = ({
  isOpen,
  onClose,
  onNavigateToPlans,
  onNavigateToPortal
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col justify-between p-6 sm:p-12 overflow-y-auto selection:bg-white selection:text-black animate-fadeIn">
      
      {/* Top Header Row on Black Screen */}
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto pt-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold shadow-2xl">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold tracking-widest text-white text-sm sm:text-base font-mono block">
              INPBOS.COM
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
              Official Custom Domain Link
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="hidden sm:inline-flex items-center space-x-1.5 bg-white/10 text-emerald-300 text-[10px] font-mono px-3 py-1 rounded-full border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Domain Server Online</span>
          </span>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Close Splash Screen (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Center Content on Pitch Black Screen */}
      <div className="my-auto py-12 flex flex-col items-center justify-center text-center space-y-8 max-w-5xl mx-auto px-4">
        
        {/* Pulsing White Accent Indicator */}
        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-mono text-slate-200 uppercase tracking-widest backdrop-blur-md">
          <Globe className="w-3.5 h-3.5 text-sky-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Domain Custom Portal Preview</span>
        </div>

        {/* EXACT REQUESTED WHITE TEXT IN THE MIDDLE OF BLACK SCREEN */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[0.15em] uppercase leading-tight sm:leading-snug max-w-4xl font-mono drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
          INTER NATIONAL PHOTOGRAPHY BUSINESS OPERATING SYSTEM
        </h1>

        <p className="text-slate-400 text-xs sm:text-base max-w-2xl font-light leading-relaxed tracking-wide">
          Unified Multi-Branch ERP, Invoicing, Client Password Portals, Shoot Calendars & AI Director Platform for Global Creative Studios.
        </p>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-200 text-black font-black text-xs uppercase tracking-wider transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(255,255,255,0.4)] flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Enter Operating System</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onNavigateToPlans && (
            <button
              onClick={() => {
                onClose();
                onNavigateToPlans();
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Website Plans</span>
            </button>
          )}

          {onNavigateToPortal && (
            <button
              onClick={() => {
                onClose();
                onNavigateToPortal();
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-sky-400" />
              <span>Client Portal</span>
            </button>
          )}
        </div>
      </div>

      {/* Footer Specs on Black Screen */}
      <div className="w-full max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-3">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>INPBOS v4.2 Enterprise Core • 256-Bit SSL Encrypted Custom Subdomain Engine</span>
        </div>
        <div className="text-slate-600">
          Note: INPBOS Drive Storage is billed separately per company storage requirements.
        </div>
      </div>

    </div>
  );
};
