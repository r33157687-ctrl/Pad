import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Download, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Smartphone, 
  FileText, 
  Terminal, 
  Check, 
  Clock, 
  Video 
} from 'lucide-react';
import { VerifiedRedBadge } from './VerifiedRedBadge';

export const DetailViewerModal: React.FC = () => {
  const { viewingItem, setViewingItem, mentorProfile, showToast } = useApp();
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!viewingItem) return null;

  const handleSpeedChange = (spd: number) => {
    setPlaybackSpeed(spd);
    if (videoRef.current) {
      videoRef.current.playbackRate = spd;
    }
  };

  const handleCopyCommand = (cmd: string) => {
    navigator.clipboard?.writeText(cmd);
    showToast('Terminal Command copied to clipboard!', 'success');
  };

  const handleDownload = (url: string, name: string) => {
    showToast(`Downloading: ${name}`, 'info');
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col my-auto rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5 truncate mr-2">
            <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20 uppercase shrink-0">
              {viewingItem.tag}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white truncate">
              {viewingItem.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <VerifiedRedBadge size="sm" customText="Verified by Manish" withGlow={false} />
            <button
              onClick={() => setViewingItem(null)}
              className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* 1. VIDEO COURSE */}
          {viewingItem.category === 'course' && (
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video border border-slate-800 shadow-2xl">
                <video
                  ref={videoRef}
                  src={viewingItem.videoUrl}
                  poster={viewingItem.thumbnailUrl}
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Speed Controls */}
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-400">⚡ Playback Speed:</span>
                  {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => handleSpeedChange(spd)}
                      className={`px-2.5 py-1 rounded-lg font-mono transition-colors ${
                        playbackSpeed === spd
                          ? 'bg-rose-600 text-white font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                <span className="bg-slate-800 px-2.5 py-1 rounded-lg font-mono text-white">
                  {viewingItem.quality}
                </span>
              </div>
            </div>
          )}

          {/* 2. TOOL */}
          {viewingItem.category === 'tool' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
                    <Terminal size={24} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{viewingItem.title}</h4>
                    <span className="text-xs text-cyan-300 font-mono">
                      {viewingItem.version} • Platform: {viewingItem.platform}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(viewingItem.toolUrl, viewingItem.title)}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <Download size={15} />
                  <span>Download Tool / Script</span>
                </button>
              </div>

              {/* Command execution box */}
              {viewingItem.commandToRun && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-cyan-400 font-bold">
                      $ Terminal Command (Termux / Linux):
                    </span>
                    <button
                      onClick={() => handleCopyCommand(viewingItem.commandToRun!)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-rose-400 hover:text-rose-300 cursor-pointer"
                    >
                      <Copy size={13} />
                      <span>Copy Command</span>
                    </button>
                  </div>
                  <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                    {viewingItem.commandToRun}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* 3. APK */}
          {viewingItem.category === 'apk' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Smartphone size={28} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{viewingItem.title}</h4>
                    <div className="text-xs text-purple-300 font-mono mt-0.5">
                      {viewingItem.version} • Size: {viewingItem.fileSize} • {viewingItem.minAndroid}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      Package: {viewingItem.packageName}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(viewingItem.apkUrl, viewingItem.title)}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-xl flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <Download size={16} />
                  <span>Download APK ({viewingItem.fileSize})</span>
                </button>
              </div>

              {/* Safe Scan Badge */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300">
                <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
                <span>100% Virus-Free & Scanned by Manish Sir. Safe for Android devices.</span>
              </div>

              {/* Install Guide */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  📱 Step-by-Step Phone Installation Guide:
                </h5>
                <div className="space-y-1.5 text-xs text-slate-300">
                  {viewingItem.installGuide?.map((step, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px]">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. DOCUMENT */}
          {viewingItem.category === 'document' && (
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                  <FileText size={28} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{viewingItem.title}</h4>
                  <div className="text-xs text-emerald-300 font-mono mt-0.5">
                    Format: {viewingItem.fileFormat} • Size: {viewingItem.fileSize}
                    {viewingItem.pagesCount && ` • ${viewingItem.pagesCount} Pages`}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownload(viewingItem.docUrl, viewingItem.title)}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Download size={16} />
                <span>Download {viewingItem.fileFormat}</span>
              </button>
            </div>
          )}

          {/* 5. PHOTO */}
          {viewingItem.category === 'photo' && (
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 max-h-[60vh] flex items-center justify-center">
                <img
                  src={viewingItem.imageUrl}
                  alt={viewingItem.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleDownload(viewingItem.imageUrl, viewingItem.title)}
                  className="flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300"
                >
                  <Download size={14} />
                  <span>Download High-Resolution Image</span>
                </button>
              </div>
            </div>
          )}

          {/* 6. ANNOUNCEMENT */}
          {viewingItem.category === 'announcement' && (
            <div className="p-6 rounded-2xl bg-yellow-950/30 border border-yellow-500/30 space-y-3 text-center sm:text-left">
              <h4 className="text-xl font-black text-white">{viewingItem.title}</h4>
              <p className="text-xs sm:text-sm text-slate-300">{viewingItem.description}</p>
              {viewingItem.actionUrl && (
                <div className="pt-2">
                  <a
                    href={viewingItem.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-600 hover:bg-yellow-500 text-white font-bold text-xs rounded-xl shadow-lg"
                  >
                    <ExternalLink size={14} />
                    <span>{viewingItem.actionText || 'Open Link'}</span>
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Description & Summary:
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {viewingItem.description}
            </p>
          </div>

          {/* Creator Attribution */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <img
                src={mentorProfile.avatarUrl}
                alt={mentorProfile.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-rose-500"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">{mentorProfile.name}</span>
                  <VerifiedRedBadge size="sm" showText={false} />
                </div>
                <span className="text-[10px] text-slate-400">Official Instructor</span>
              </div>
            </div>

            <span className="text-[11px] text-slate-500 font-mono">
              Published: {viewingItem.createdAt}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
