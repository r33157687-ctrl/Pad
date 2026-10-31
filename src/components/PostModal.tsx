import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ContentCategory, PortalItem } from '../types';
import { 
  X, 
  Video, 
  Terminal, 
  Smartphone, 
  FileText, 
  Image as ImageIcon, 
  Bell, 
  Save, 
  ShieldCheck,
  Plus,
  Trash2
} from 'lucide-react';

export const PostModal: React.FC = () => {
  const { 
    isPostModalOpen, 
    setIsPostModalOpen, 
    addItem, 
    updateItem, 
    editingItem, 
    setEditingItem 
  } = useApp();

  const [category, setCategory] = useState<ContentCategory>('course');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [isPinned, setIsPinned] = useState(false);

  // Video Course
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [duration, setDuration] = useState('25:00');
  const [quality, setQuality] = useState('1080p FHD');

  // Tool
  const [toolUrl, setToolUrl] = useState('');
  const [version, setVersion] = useState('v1.0');
  const [platform, setPlatform] = useState('Linux / Termux');
  const [commandToRun, setCommandToRun] = useState('');

  // APK
  const [apkUrl, setApkUrl] = useState('');
  const [apkVersion, setApkVersion] = useState('v1.0 PRO');
  const [fileSize, setFileSize] = useState('35 MB');
  const [packageName, setPackageName] = useState('com.manish.tool');
  const [minAndroid, setMinAndroid] = useState('Android 8.0+');
  const [isSafeVerified, setIsSafeVerified] = useState(true);
  const [installGuideText, setInstallGuideText] = useState(
    '1. Download APK to device\n2. Allow unknown sources\n3. Tap to install'
  );

  // Document
  const [docUrl, setDocUrl] = useState('');
  const [fileFormat, setFileFormat] = useState<'PDF' | 'DOCX' | 'ZIP' | 'TXT'>('PDF');
  const [docSize, setDocSize] = useState('5.2 MB');
  const [pagesCount, setPagesCount] = useState(20);

  // Photo
  const [imageUrl, setImageUrl] = useState('');
  const [resolution, setResolution] = useState('4K UHD');

  // Announcement
  const [actionUrl, setActionUrl] = useState('');
  const [actionText, setActionText] = useState('Join Live Session');
  const [priority, setPriority] = useState<'high' | 'normal'>('high');

  useEffect(() => {
    if (editingItem) {
      setCategory(editingItem.category);
      setTitle(editingItem.title);
      setDescription(editingItem.description);
      setTag(editingItem.tag);
      setIsPinned(!!editingItem.isPinned);

      if (editingItem.category === 'course') {
        setVideoUrl(editingItem.videoUrl);
        setThumbnailUrl(editingItem.thumbnailUrl);
        setDuration(editingItem.duration);
        setQuality(editingItem.quality);
      } else if (editingItem.category === 'tool') {
        setToolUrl(editingItem.toolUrl);
        setVersion(editingItem.version);
        setPlatform(editingItem.platform);
        setCommandToRun(editingItem.commandToRun || '');
      } else if (editingItem.category === 'apk') {
        setApkUrl(editingItem.apkUrl);
        setApkVersion(editingItem.version);
        setFileSize(editingItem.fileSize);
        setPackageName(editingItem.packageName);
        setMinAndroid(editingItem.minAndroid);
        setIsSafeVerified(editingItem.isSafeVerified);
        setInstallGuideText(editingItem.installGuide?.join('\n') || '');
      } else if (editingItem.category === 'document') {
        setDocUrl(editingItem.docUrl);
        setFileFormat(editingItem.fileFormat);
        setDocSize(editingItem.fileSize);
        setPagesCount(editingItem.pagesCount || 10);
      } else if (editingItem.category === 'photo') {
        setImageUrl(editingItem.imageUrl);
        setResolution(editingItem.resolution || '4K UHD');
      } else if (editingItem.category === 'announcement') {
        setActionUrl(editingItem.actionUrl || '');
        setActionText(editingItem.actionText || 'Join Live');
        setPriority(editingItem.priority);
      }
    } else {
      // reset form
      setTitle('');
      setDescription('');
      setTag('Ethical Hacking');
      setVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
      setThumbnailUrl('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80');
      setToolUrl('https://github.com');
      setApkUrl('https://github.com');
      setDocUrl('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
      setImageUrl('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80');
      setIsPinned(false);
    }
  }, [editingItem, isPostModalOpen]);

  if (!isPostModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Kripya Title daalein');
      return;
    }

    const base = {
      title: title.trim(),
      description: description.trim(),
      tag: tag.trim() || 'General',
      isPinned,
    };

    let completeItem: any;

    if (category === 'course') {
      completeItem = {
        ...base,
        category: 'course',
        videoUrl: videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnailUrl: thumbnailUrl || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
        duration: duration || '30:00',
        quality: quality || '1080p FHD',
      };
    } else if (category === 'tool') {
      completeItem = {
        ...base,
        category: 'tool',
        toolUrl: toolUrl || 'https://github.com',
        version: version || 'v1.0',
        platform: platform || 'Linux / Termux',
        commandToRun: commandToRun || '',
      };
    } else if (category === 'apk') {
      const guide = installGuideText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      completeItem = {
        ...base,
        category: 'apk',
        apkUrl: apkUrl || 'https://github.com',
        version: apkVersion || 'v1.0 PRO',
        fileSize: fileSize || '35 MB',
        packageName: packageName || 'com.manish.tool',
        minAndroid: minAndroid || 'Android 8.0+',
        isSafeVerified,
        installGuide: guide.length > 0 ? guide : ['1. Download APK', '2. Install on Android'],
      };
    } else if (category === 'document') {
      completeItem = {
        ...base,
        category: 'document',
        docUrl: docUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        fileFormat,
        fileSize: docSize || '5 MB',
        pagesCount: Number(pagesCount) || 15,
      };
    } else if (category === 'photo') {
      completeItem = {
        ...base,
        category: 'photo',
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
        resolution: resolution || '4K UHD',
      };
    } else if (category === 'announcement') {
      completeItem = {
        ...base,
        category: 'announcement',
        priority,
        actionUrl: actionUrl || '',
        actionText: actionText || 'Join Live',
      };
    }

    if (editingItem) {
      updateItem({
        ...editingItem,
        ...completeItem,
      });
      setEditingItem(null);
    } else {
      addItem(completeItem);
    }

    setIsPostModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-6 rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-7 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => {
            setIsPostModalOpen(false);
            setEditingItem(null);
          }}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Modal Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 uppercase tracking-wider bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
            <span>Admin Creator Studio</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {editingItem ? '✏️ Post Edit Karein' : '➕ Naya Item Post Karein'}
          </h2>
          <p className="text-xs text-slate-400">
            Yeh post turant user panel me respective section me live dikhegi.
          </p>
        </div>

        {/* Category Picker (if not editing) */}
        {!editingItem && (
          <div className="mt-5 space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Category Chunein:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setCategory('course')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  category === 'course'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Video size={16} className="text-rose-400" />
                <span>🛡️ Course / Video</span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('tool')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  category === 'tool'
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Terminal size={16} className="text-cyan-400" />
                <span>⚡ Cyber Tool</span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('apk')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  category === 'apk'
                    ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Smartphone size={16} className="text-purple-400" />
                <span>📱 Tested APK</span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('document')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  category === 'document'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <FileText size={16} className="text-emerald-400" />
                <span>📄 PDF / Notes</span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('photo')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  category === 'photo'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <ImageIcon size={16} className="text-amber-400" />
                <span>🖼️ Blueprint Photo</span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('announcement')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  category === 'announcement'
                    ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Bell size={16} className="text-yellow-400" />
                <span>📢 Live Notice</span>
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4 max-h-[62vh] overflow-y-auto pr-1">
          {/* Title & Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-slate-300">Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Masterclass 01: Ethical Hacking Environment Setup"
                className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Tag / Label</label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="e.g. Ethical Hacking, Tools, APK"
                className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Is item ke bare me detail likhein..."
              className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 rounded-xl p-3 text-xs text-white outline-none resize-none"
            />
          </div>

          {/* Category Specific inputs */}
          {category === 'course' && (
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Video Details:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] text-slate-300">Video Stream / MP4 URL</label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://.../video.mp4"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300">Thumbnail Image URL</label>
                  <input
                    type="url"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300">Duration (e.g. 35:20)</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="35:20"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {category === 'tool' && (
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Tool Details:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] text-slate-300">Tool Download / Repository URL</label>
                  <input
                    type="url"
                    value={toolUrl}
                    onChange={(e) => setToolUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300">Version</label>
                  <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="v2.5"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300">Platform (OS)</label>
                  <input
                    type="text"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    placeholder="Linux / Termux / Windows"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] text-slate-300">Command to Execute (Terminal Command)</label>
                  <input
                    type="text"
                    value={commandToRun}
                    onChange={(e) => setCommandToRun(e.target.value)}
                    placeholder="python3 tool.py -t target"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {category === 'apk' && (
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">APK Details:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] text-slate-300">APK Direct Download Link *</label>
                  <input
                    type="url"
                    value={apkUrl}
                    onChange={(e) => setApkUrl(e.target.value)}
                    placeholder="https://.../app.apk"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300">Version</label>
                  <input
                    type="text"
                    value={apkVersion}
                    onChange={(e) => setApkVersion(e.target.value)}
                    placeholder="v4.5 PRO"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300">File Size</label>
                  <input
                    type="text"
                    value={fileSize}
                    onChange={(e) => setFileSize(e.target.value)}
                    placeholder="42 MB"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300">Package Name</label>
                  <input
                    type="text"
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    placeholder="com.manish.tool"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300">Minimum Android Version</label>
                  <input
                    type="text"
                    value={minAndroid}
                    onChange={(e) => setMinAndroid(e.target.value)}
                    placeholder="Android 8.0+"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] text-slate-300">Phone Installation Instructions (Line by line)</label>
                  <textarea
                    rows={3}
                    value={installGuideText}
                    onChange={(e) => setInstallGuideText(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {category === 'document' && (
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Document Details:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] text-slate-300">Document URL *</label>
                  <input
                    type="url"
                    value={docUrl}
                    onChange={(e) => setDocUrl(e.target.value)}
                    placeholder="https://.../notes.pdf"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300">Format</label>
                  <select
                    value={fileFormat}
                    onChange={(e) => setFileFormat(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="PDF">PDF</option>
                    <option value="ZIP">ZIP Bundle</option>
                    <option value="DOCX">DOCX</option>
                    <option value="TXT">TXT</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300">File Size</label>
                  <input
                    type="text"
                    value={docSize}
                    onChange={(e) => setDocSize(e.target.value)}
                    placeholder="8.5 MB"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {category === 'photo' && (
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Photo / Blueprint:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] text-slate-300">Image URL *</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {category === 'announcement' && (
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Live Notice / Meeting:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] text-slate-300">Target URL (Google Meet / Zoom / Resource)</label>
                  <input
                    type="url"
                    value={actionUrl}
                    onChange={(e) => setActionUrl(e.target.value)}
                    placeholder="https://meet.google.com/..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Pin toggle */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="pinPost"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="w-4 h-4 accent-rose-500 rounded"
            />
            <label htmlFor="pinPost" className="text-xs text-slate-300 cursor-pointer">
              📌 Pin this item to the top of its section
            </label>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                setIsPostModalOpen(false);
                setEditingItem(null);
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-950/60"
            >
              <Save size={15} />
              <span>{editingItem ? 'Save Changes' : 'Publish Live'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
