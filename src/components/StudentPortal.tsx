import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ContentCategory, PortalItem } from '../types';
import { 
  ShieldCheck, 
  Video, 
  Terminal, 
  Smartphone, 
  FileText, 
  Image as ImageIcon, 
  Bell, 
  Search, 
  MessageCircle, 
  Send, 
  LogOut, 
  Play, 
  Download, 
  Copy, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  Pin, 
  Clock, 
  Check, 
  ArrowRight,
  User,
  Shield,
  Eye
} from 'lucide-react';
import { VerifiedRedBadge } from './VerifiedRedBadge';
import { DownloadAppModal } from './DownloadAppModal';

export const StudentPortal: React.FC = () => {
  const { 
    session, 
    items, 
    mentorProfile, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery, 
    setViewingItem, 
    adminPreviewAsStudent, 
    setAdminPreviewAsStudent, 
    logout,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<ContentCategory | 'all'>('all');
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const filteredItems = items.filter((item) => {
    if (activeTab !== 'all' && item.category !== activeTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCopy = (text: string, msg: string) => {
    navigator.clipboard?.writeText(text);
    showToast(msg, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-16">
      {/* Admin Preview Mode Banner (if admin is previewing) */}
      {adminPreviewAsStudent && (
        <div className="bg-rose-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-between sticky top-0 z-50 shadow-lg">
          <div className="flex items-center gap-2">
            <Eye size={15} />
            <span>Admin Preview Mode: Aap is samay Student View dekh rahe hain.</span>
          </div>
          <button
            onClick={() => setAdminPreviewAsStudent(false)}
            className="bg-slate-950 text-white px-3 py-1 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
          >
            ← Return to Command Center
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Mentor Watermark */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shadow-lg shadow-rose-950/60 ring-2 ring-rose-500/20">
              <ShieldCheck size={22} strokeWidth={2.4} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black text-white tracking-tight">
                  MANISH <span className="text-rose-500">KUMAR</span>
                </span>
                <VerifiedRedBadge size="sm" customText="Verified" withGlow={false} />
              </div>
              <p className="text-[10px] text-slate-400 -mt-0.5 hidden xs:block">
                VIP Paid Course & Ethical Hacking Hub
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-sm mx-4">
            <div className="relative w-full">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, tools, APKs..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-rose-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none"
              />
            </div>
          </div>

          {/* User Session & Logout */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowDownloadModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold transition-all cursor-pointer shadow-sm"
              title="Download or install app on phone"
            >
              <Smartphone size={14} className="text-rose-400" />
              <span>📱 Download App</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <User size={14} className="text-emerald-400" />
              <span className="text-slate-300 font-semibold">{session.displayName}</span>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-rose-400 border border-slate-800 text-xs font-semibold transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative w-full">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, tools, APKs..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-rose-500 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 outline-none"
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 flex-1">
        
        {/* 1. MENTOR SHOWCASE & ABOUT (Verified Red Tick) */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center sm:items-start lg:items-center justify-between gap-6">
            
            {/* Avatar & Red Badge Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="relative group shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-4 ring-rose-500/80 shadow-[0_0_30px_rgba(244,63,94,0.35)] bg-slate-900">
                  <img
                    src={mentorProfile.avatarUrl}
                    alt={mentorProfile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Glowing Red Tick Badge */}
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-rose-600 to-red-600 text-white p-1.5 rounded-xl shadow-lg ring-4 ring-slate-950 glow-red">
                  <ShieldCheck size={18} strokeWidth={2.8} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {mentorProfile.name}
                  </h2>
                  <VerifiedRedBadge size="sm" customText={mentorProfile.verifiedBadgeText} withGlow={true} />
                </div>

                <p className="text-sm font-semibold text-rose-400">
                  {mentorProfile.title}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed pt-1">
                  {mentorProfile.bio}
                </p>
              </div>
            </div>

            {/* Direct Connect Buttons (WhatsApp & Telegram) */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full sm:w-auto shrink-0">
              {mentorProfile.whatsappNumber && (
                <a
                  href={`https://wa.me/${mentorProfile.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Manish%20Sir%2C%20I%20am%20a%20member%20of%20your%20VIP%20Portal`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <MessageCircle size={16} />
                  <span>Direct WhatsApp Helpdesk</span>
                  <ExternalLink size={12} className="opacity-70" />
                </a>
              )}

              {mentorProfile.telegramHandle && (
                <a
                  href={`https://t.me/${mentorProfile.telegramHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600/90 hover:bg-sky-600 text-white font-bold text-xs shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <Send size={16} />
                  <span>VIP Telegram: {mentorProfile.telegramHandle}</span>
                  <ExternalLink size={12} className="opacity-70" />
                </a>
              )}
            </div>
          </div>

          {/* "Portal Mein Kya-Kya Milta Hai" Summary Bar */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-rose-400 flex items-center gap-1.5 mb-3">
              <Sparkles size={14} />
              <span>Is VIP Portal Par Aapko Kya-Kya Milta Hai:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs text-slate-300">
              {mentorProfile.offeringsSummary?.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. SECTION EXPLAINER / JUNCTION DETAILS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div 
            onClick={() => setActiveTab('course')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'course'
                ? 'bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-950/40'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center mb-2">
              <Video size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">Paid Courses</h4>
            <p className="text-[11px] text-slate-400 mt-1">
              Ethical hacking masterclasses & HD video lectures
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('tool')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'tool'
                ? 'bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-950/40'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center mb-2">
              <Terminal size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">Cyber Tools</h4>
            <p className="text-[11px] text-slate-400 mt-1">
              Custom testing scripts, payloads & commands
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('apk')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'apk'
                ? 'bg-purple-950/40 border-purple-500 shadow-lg shadow-purple-950/40'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-2">
              <Smartphone size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">Tested APKs</h4>
            <p className="text-[11px] text-slate-400 mt-1">
              Virus-scanned Android tools & installation guides
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('document')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'document'
                ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-950/40'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-2">
              <FileText size={18} />
            </div>
            <h4 className="text-sm font-bold text-white">PDF Documents</h4>
            <p className="text-[11px] text-slate-400 mt-1">
              Official cheatsheets, notes & code files
            </p>
          </div>
        </div>

        {/* 3. CATEGORY PILLS BAR */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {(['all', 'course', 'tool', 'apk', 'document', 'photo', 'announcement'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === cat
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/60 ring-1 ring-rose-400/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat === 'all' && `All Items (${items.length})`}
              {cat === 'course' && `🛡️ Video Courses (${items.filter((i) => i.category === 'course').length})`}
              {cat === 'tool' && `⚡ Cyber Tools (${items.filter((i) => i.category === 'tool').length})`}
              {cat === 'apk' && `📱 APKs (${items.filter((i) => i.category === 'apk').length})`}
              {cat === 'document' && `📄 PDF Notes (${items.filter((i) => i.category === 'document').length})`}
              {cat === 'photo' && `🖼️ Blueprints (${items.filter((i) => i.category === 'photo').length})`}
              {cat === 'announcement' && `📢 Notices (${items.filter((i) => i.category === 'announcement').length})`}
            </button>
          ))}
        </div>

        {/* 4. CONTENT CARDS GRID */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing <strong className="text-white font-mono">{filteredItems.length}</strong> items in{' '}
              <strong className="text-rose-400 uppercase">{activeTab}</strong>
            </span>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-rose-400 hover:underline cursor-pointer"
              >
                Clear Search Filter
              </button>
            )}
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setViewingItem(item)}
                  className="group relative rounded-3xl border border-slate-800 bg-slate-900/90 hover:bg-slate-900 hover:border-slate-700 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  {/* Pin badge */}
                  {item.isPinned && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="flex items-center gap-1 text-[10px] font-bold bg-rose-600 text-white px-2 py-0.5 rounded-full shadow-md">
                        <Pin size={10} className="fill-white" /> PINNED
                      </span>
                    </div>
                  )}

                  {/* Header visual preview */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    {item.category === 'course' && (
                      <>
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-rose-600/90 group-hover:bg-rose-500 text-white flex items-center justify-center shadow-xl shadow-rose-950/60 group-hover:scale-110 transition-all">
                            <Play size={20} className="fill-white ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5 text-[11px] font-mono">
                          <span className="bg-black/80 px-2 py-0.5 rounded text-white flex items-center gap-1">
                            <Clock size={11} /> {item.duration}
                          </span>
                          <span className="bg-rose-600 px-1.5 py-0.5 rounded text-white font-bold">
                            {item.quality}
                          </span>
                        </div>
                      </>
                    )}

                    {item.category === 'tool' && (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-cyan-950/40 to-slate-950 p-4 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2">
                          <Terminal size={28} />
                        </div>
                        <span className="text-xs font-mono font-bold text-cyan-300">
                          {item.version} • {item.platform}
                        </span>
                      </div>
                    )}

                    {item.category === 'apk' && (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-950/40 to-slate-950 p-4 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-2">
                          <Smartphone size={28} />
                        </div>
                        <span className="text-xs font-mono font-bold text-purple-300">
                          {item.version} • {item.fileSize}
                        </span>
                      </div>
                    )}

                    {item.category === 'document' && (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-950/40 to-slate-950 p-4 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                          <FileText size={28} />
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-300">
                          {item.fileFormat} • {item.fileSize}
                        </span>
                      </div>
                    )}

                    {item.category === 'photo' && (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}

                    {item.category === 'announcement' && (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-yellow-950/40 to-slate-950 p-4 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-yellow-600/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 mb-2">
                          <Bell size={28} />
                        </div>
                        <span className="text-xs font-bold text-yellow-300 uppercase">
                          {item.priority === 'high' ? '🔥 URGENT VIP ALERT' : 'NOTICE'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {item.tag}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white mt-1.5 leading-snug group-hover:text-rose-300 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer watermark */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-slate-300">
                          {mentorProfile.name}
                        </span>
                        <VerifiedRedBadge size="sm" showText={false} />
                      </div>

                      <span className="text-rose-400 font-semibold flex items-center gap-1 text-[11px] group-hover:translate-x-1 transition-transform">
                        <span>Open Details</span>
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-14 text-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 p-8 space-y-2">
              <p className="text-sm font-semibold text-white">Koi material nahi mila.</p>
              <p className="text-xs text-slate-400">
                Dusre category tab par tap karein ya search term clear karein.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Download App Modal */}
      <DownloadAppModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />
    </div>
  );
};
