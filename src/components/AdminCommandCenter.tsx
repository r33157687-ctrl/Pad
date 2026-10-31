import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ContentCategory, PortalItem } from '../types';
import { 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  Pin, 
  Eye, 
  LogOut, 
  Video, 
  Terminal, 
  Smartphone, 
  FileText, 
  Image as ImageIcon, 
  Bell, 
  Save, 
  Layers,
  ExternalLink,
  MessageCircle,
  Send,
  UserCheck
} from 'lucide-react';
import { VerifiedRedBadge } from './VerifiedRedBadge';
import { DownloadAppModal } from './DownloadAppModal';

export const AdminCommandCenter: React.FC = () => {
  const { 
    items, 
    deleteItem, 
    togglePin, 
    setEditingItem, 
    setIsPostModalOpen, 
    mentorProfile, 
    updateMentorProfile, 
    setAdminPreviewAsStudent, 
    logout 
  } = useApp();

  const [activeAdminCategory, setActiveAdminCategory] = useState<ContentCategory | 'all'>('all');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // Profile form state
  const [name, setName] = useState(mentorProfile.name);
  const [title, setTitle] = useState(mentorProfile.title);
  const [bio, setBio] = useState(mentorProfile.bio);
  const [avatarUrl, setAvatarUrl] = useState(mentorProfile.avatarUrl);
  const [verifiedBadgeText, setVerifiedBadgeText] = useState(mentorProfile.verifiedBadgeText);
  const [whatsappNumber, setWhatsappNumber] = useState(mentorProfile.whatsappNumber);
  const [telegramHandle, setTelegramHandle] = useState(mentorProfile.telegramHandle);

  const filteredItems = activeAdminCategory === 'all' 
    ? items 
    : items.filter((i) => i.category === activeAdminCategory);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateMentorProfile({
      name,
      title,
      bio,
      avatarUrl,
      verifiedBadgeText,
      whatsappNumber,
      telegramHandle,
    });
    setIsEditingProfile(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6 font-sans">
      {/* Top Admin Command Header */}
      <div className="relative overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs uppercase font-extrabold tracking-widest text-rose-400">
                Authorized Admin Session
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {mentorProfile.name} (Creator Hub)
              </h1>
              <VerifiedRedBadge size="md" customText={mentorProfile.verifiedBadgeText} withGlow={true} />
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Yahan se aap apne saare Paid Courses, Ethical Hacking videos, tools, APKs aur documents ko post, edit aur delete kar sakte hain. Jo bhi yahan karenge, turant user panel par live reflect hoga.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                setEditingItem(null);
                setIsPostModalOpen(true);
              }}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-xl shadow-rose-950/60 transition-transform active:scale-95 cursor-pointer"
            >
              <Plus size={18} />
              <span>+ Post New Material</span>
            </button>

            <button
              onClick={() => setAdminPreviewAsStudent(true)}
              className="flex items-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm rounded-2xl border border-slate-700 transition-colors cursor-pointer"
            >
              <Eye size={16} className="text-rose-400" />
              <span>Preview Student View</span>
            </button>

            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm rounded-2xl border border-slate-700 transition-colors cursor-pointer"
            >
              Edit Profile & Badge
            </button>

            <button
              onClick={() => setShowDownloadModal(true)}
              className="flex items-center gap-1.5 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-rose-300 font-semibold text-xs sm:text-sm rounded-2xl border border-rose-500/30 transition-colors cursor-pointer"
              title="Download or share app link"
            >
              <Smartphone size={16} className="text-rose-400" />
              <span>Download / Share App</span>
            </button>

            <button
              onClick={logout}
              className="p-3 bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 rounded-2xl border border-slate-800 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <span className="text-[11px] font-semibold text-rose-400">Courses / Videos</span>
            <div className="text-xl font-black text-white mt-0.5">
              {items.filter((i) => i.category === 'course').length}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <span className="text-[11px] font-semibold text-cyan-400">Cyber Tools</span>
            <div className="text-xl font-black text-white mt-0.5">
              {items.filter((i) => i.category === 'tool').length}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <span className="text-[11px] font-semibold text-purple-400">Tested APKs</span>
            <div className="text-xl font-black text-white mt-0.5">
              {items.filter((i) => i.category === 'apk').length}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <span className="text-[11px] font-semibold text-emerald-400">PDF Documents</span>
            <div className="text-xl font-black text-white mt-0.5">
              {items.filter((i) => i.category === 'document').length}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center col-span-2 sm:col-span-1">
            <span className="text-[11px] font-semibold text-amber-400">Total Assets</span>
            <div className="text-xl font-black text-white mt-0.5">{items.length}</div>
          </div>
        </div>
      </div>

      {/* Profile & Red Badge Editor Drawer */}
      {isEditingProfile && (
        <form onSubmit={handleSaveProfile} className="p-6 rounded-3xl bg-slate-900 border border-rose-500/30 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Edit Instructor Profile & Red Tick Badge</span>
              <VerifiedRedBadge size="sm" customText="Verified" withGlow={false} />
            </h3>
            <button
              type="button"
              onClick={() => setIsEditingProfile(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Professional Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-slate-300">About Me / Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Red Verified Badge Label</label>
              <input
                type="text"
                value={verifiedBadgeText}
                onChange={(e) => setVerifiedBadgeText(e.target.value)}
                placeholder="🔴 Official Verified Creator"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Avatar Image URL</label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">WhatsApp Number</label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Telegram Channel / Handle</label>
              <input
                type="text"
                value={telegramHandle}
                onChange={(e) => setTelegramHandle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(['all', 'course', 'tool', 'apk', 'document', 'photo', 'announcement'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveAdminCategory(cat)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold capitalize transition-all shrink-0 ${
              activeAdminCategory === cat
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/60'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat === 'all' && 'All Published Items'}
            {cat === 'course' && '🛡️ Courses & Videos'}
            {cat === 'tool' && '⚡ Cyber Tools'}
            {cat === 'apk' && '📱 Tested APKs'}
            {cat === 'document' && '📄 PDF Documents'}
            {cat === 'photo' && '🖼️ Blueprints'}
            {cat === 'announcement' && '📢 Live Notices'}
          </button>
        ))}
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 gap-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 ${
                    item.category === 'course'
                      ? 'bg-rose-600'
                      : item.category === 'tool'
                      ? 'bg-cyan-600'
                      : item.category === 'apk'
                      ? 'bg-purple-600'
                      : item.category === 'document'
                      ? 'bg-emerald-600'
                      : item.category === 'photo'
                      ? 'bg-amber-600'
                      : 'bg-yellow-600'
                  }`}
                >
                  {item.category === 'course' && <Video size={20} />}
                  {item.category === 'tool' && <Terminal size={20} />}
                  {item.category === 'apk' && <Smartphone size={20} />}
                  {item.category === 'document' && <FileText size={20} />}
                  {item.category === 'photo' && <ImageIcon size={20} />}
                  {item.category === 'announcement' && <Bell size={20} />}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {item.tag}
                    </span>
                    {item.isPinned && (
                      <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Pin size={10} /> PINNED
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white truncate mt-0.5">{item.title}</h4>
                  <p className="text-xs text-slate-400 truncate max-w-lg">{item.description}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <button
                  onClick={() => togglePin(item.id)}
                  title={item.isPinned ? 'Unpin' : 'Pin to top'}
                  className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
                    item.isPinned ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Pin size={13} />
                  <span>{item.isPinned ? 'Pinned' : 'Pin'}</span>
                </button>

                <button
                  onClick={() => {
                    setEditingItem(item);
                    setIsPostModalOpen(true);
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Edit3 size={13} />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(`"${item.title}" ko delete karna chahte hain?`)) {
                      deleteItem(item.id);
                    }
                  }}
                  className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900 text-rose-400 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-14 text-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 p-8 space-y-3">
            <p className="text-sm text-slate-400">Is category me abhi koi material nahi hai.</p>
            <button
              onClick={() => {
                setEditingItem(null);
                setIsPostModalOpen(true);
              }}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl"
            >
              + Post Something Here
            </button>
          </div>
        )}
      </div>

      {/* Download App Modal */}
      <DownloadAppModal 
        isOpen={showDownloadModal} 
        onClose={() => setShowDownloadModal(false)} 
      />
    </div>
  );
};
