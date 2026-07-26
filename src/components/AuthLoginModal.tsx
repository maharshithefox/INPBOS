import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Camera, 
  ShieldCheck, 
  User, 
  Bot, 
  Globe
} from 'lucide-react';

export interface UserProfile {
  name: string;
  email: string;
  provider: 'google' | 'email' | 'demo';
  avatarUrl?: string;
  plan?: string;
}

interface AuthLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthLoginModal: React.FC<AuthLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [authMode, setAuthMode] = useState<'gmail' | 'email' | 'demo'>('gmail');
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gmailInput, setGmailInput] = useState('maharshithefox@gmail.com');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gmailInput.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const user: UserProfile = {
        name: gmailInput.split('@')[0] || 'Studio Partner',
        email: gmailInput.toLowerCase(),
        provider: 'google',
        plan: 'Enterprise',
        avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80`
      };
      onLoginSuccess(user);
    }, 600);
  };

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const user: UserProfile = {
        name: name.trim() || email.split('@')[0],
        email: email.toLowerCase(),
        provider: 'email',
        plan: 'Standard'
      };
      onLoginSuccess(user);
    }, 600);
  };

  const handleDemoLookup = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const user: UserProfile = {
        name: 'Demo Visitor',
        email: 'demo.lookup@inpbos.com',
        provider: 'demo',
        plan: 'Demo Preview Mode'
      };
      onLoginSuccess(user);
    }, 400);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-sky-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-sky-500/30 shrink-0">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-extrabold text-xl tracking-tight text-white">
                  INPBOS Portal
                </h2>
                <span className="bg-sky-500/20 text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded border border-sky-400/30 uppercase tracking-wider">
                  Access Portal
                </span>
              </div>
              <p className="text-xs text-sky-200 mt-0.5">
                Sign in to manage studio plans, quotations, drive & calendar
              </p>
            </div>
          </div>
        </div>

        {/* Quick Demo Lookup Banner */}
        <div className="bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-amber-500/10 border-b border-amber-200/60 p-3.5 px-5 flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-800 font-medium">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 animate-pulse" />
            <span>Want to test without signing in?</span>
          </div>

          <button
            type="button"
            onClick={handleDemoLookup}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-3 py-1.5 rounded-lg text-xs shadow-sm flex items-center space-x-1.5 cursor-pointer transition-all shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Demo Lookup</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Tabs: Gmail vs Email vs Demo */}
        <div className="p-5">
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl mb-5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setAuthMode('gmail')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                authMode === 'gmail' 
                  ? 'bg-white text-slate-900 shadow-sm font-extrabold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Login with Gmail</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('email')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                authMode === 'email' 
                  ? 'bg-white text-slate-900 shadow-sm font-extrabold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mail className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Email & Password</span>
            </button>
          </div>

          {/* Gmail / Google Login Form */}
          {authMode === 'gmail' && (
            <form onSubmit={handleGoogleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Google / Gmail Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="your.name@gmail.com"
                    value={gmailInput}
                    onChange={(e) => setGmailInput(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-[11px] text-sky-900 flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>
                  Logging in with Gmail instantly gives you immediate access to all <strong>Website System Plans</strong> (Basic, Standard, Premium, Enterprise) and features!
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 rounded-xl text-xs shadow-md flex items-center justify-center space-x-2 cursor-pointer transition-all disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>{isSubmitting ? 'Authenticating with Google...' : 'Continue with Gmail'}</span>
              </button>
            </form>
          )}

          {/* Email & Password Login Form */}
          {authMode === 'email' && (
            <form onSubmit={handleEmailSignIn} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Maharshi Rao"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="studio@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sky-600 hover:bg-sky-500 text-white font-extrabold py-3 rounded-xl text-xs shadow-md flex items-center justify-center space-x-2 cursor-pointer transition-all disabled:opacity-50 mt-2"
              >
                <Mail className="w-4 h-4" />
                <span>{isSubmitting ? 'Signing in...' : 'Sign In with Email'}</span>
              </button>
            </form>
          )}

          {/* Bottom Direct Demo Lookup Action */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              No registration needed for lookup?
            </span>
            <button
              type="button"
              onClick={handleDemoLookup}
              className="text-xs font-extrabold text-sky-700 hover:text-sky-900 flex items-center space-x-1 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Instant Demo Lookup</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
