import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Sparkles,
  Terminal,
  Cpu,
  Smartphone
} from 'lucide-react';
import { DownloadAppModal } from './DownloadAppModal';

export const AnimatedLogin: React.FC = () => {
  const { login } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Kripya Username aur Password dono fill karein.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = login(username, password);
      setIsLoading(false);
      if (!res.success) {
        setErrorMessage(res.message);
      }
    }, 600);
  };

  const handleStudentQuickFill = () => {
    setUsername('student_vip');
    setPassword('student123');
    setErrorMessage('');
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-slate-950 overflow-hidden font-sans">
      {/* High-Tech Animated Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(225,29,72,0.18),rgba(255,255,255,0))]" />
      
      {/* Cyber Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#f43f5e 1px, transparent 1px), linear-gradient(90deg, #f43f5e 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Floating Glowing Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Login Card */}
      <div className="relative w-full max-w-md z-10">
        <div className="relative rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-2xl p-7 sm:p-9 shadow-[0_0_60px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
          
          {/* Header Badge */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-xl shadow-rose-950/60 ring-4 ring-rose-500/20 mx-auto">
              <ShieldCheck size={32} strokeWidth={2.2} />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                <span>VIP Access Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                MANISH KUMAR
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Paid Courses • Ethical Hacking • Tested Tools & APKs
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Username</span>
                <span className="text-[10px] text-slate-500 font-normal">Authorized ID</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="Enter your username"
                  className="w-full bg-slate-950/90 border border-slate-700/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all"
                  autoFocus
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Password</span>
                <span className="text-[10px] text-slate-500 font-normal">Security Key</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="Enter your password"
                  className="w-full bg-slate-950/90 border border-slate-700/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 rounded-2xl pl-11 pr-11 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-medium text-rose-300 text-center animate-shake">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-rose-950/60 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In & Unlock Portal</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Quick Member / Student Helper & Download Button */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center space-y-3">
            <button
              type="button"
              onClick={() => setShowDownloadModal(true)}
              className="w-full py-2.5 bg-slate-800/90 hover:bg-slate-700 border border-rose-500/30 text-rose-300 hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Smartphone size={15} className="text-rose-400" />
              <span>📱 Phone Me App Kaise Download Karein?</span>
            </button>

            <div>
              <p className="text-xs text-slate-400">
                New Member or Student without account?
              </p>
              <button
                type="button"
                onClick={handleStudentQuickFill}
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 underline underline-offset-2 transition-colors cursor-pointer mt-0.5"
              >
                Auto-fill Student Access Details
              </button>
            </div>
          </div>

          {/* Footer Security Watermark */}
          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <Cpu size={13} className="text-rose-500" />
            <span>End-to-End Encrypted Session • 100% Secure</span>
          </div>
        </div>
      </div>

      {/* Download / Install App Modal */}
      <DownloadAppModal 
        isOpen={showDownloadModal} 
        onClose={() => setShowDownloadModal(false)} 
      />
    </div>
  );
};
