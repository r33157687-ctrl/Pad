import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { 
  Download, 
  Smartphone, 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Share2, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Chrome
} from 'lucide-react';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handle1ClickInstall = async () => {
    if (isInstallable) {
      await install();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-lg my-6 rounded-3xl border border-rose-500/30 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-7 shadow-2xl space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shadow-xl shadow-rose-950/60 ring-2 ring-rose-500/30">
            <Smartphone size={28} />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            App Phone Me Kaise Download / Install Karein?
          </h3>
          <p className="text-xs text-slate-300">
            Yeh app direct aapke Android phone par native APK / App ban kar install ho jaata hai.
          </p>
        </div>

        {/* Direct 1-Click Install Button (if browser supports beforeinstallprompt) */}
        {isInstallable && (
          <button
            onClick={handle1ClickInstall}
            className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-rose-950/60 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
          >
            <Download size={18} />
            <span>1-Click Install on this Device</span>
          </button>
        )}

        {/* Step-by-Step Android / Mobile Guide */}
        <div className="space-y-3 pt-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <Chrome size={14} />
            <span>Android Phone Me Install Karne Ke 3 Aasan Steps:</span>
          </h4>

          <div className="space-y-2 text-xs text-slate-200">
            {/* Step 1 */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-rose-600/30 text-rose-400 border border-rose-500/40 flex items-center justify-center font-bold text-xs shrink-0">
                1
              </span>
              <div>
                <strong className="text-white block font-semibold">Chrome Browser Me Link Kholein:</strong>
                <span className="text-slate-400 text-[11px] leading-relaxed">
                  Apne phone ke Google Chrome browser me is app ka URL paste karke open karein.
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-rose-600/30 text-rose-400 border border-rose-500/40 flex items-center justify-center font-bold text-xs shrink-0">
                2
              </span>
              <div>
                <strong className="text-white block font-semibold">Top-Right 3 Dots (⋮) Par Tap Karein:</strong>
                <span className="text-slate-400 text-[11px] leading-relaxed">
                  Chrome ke upar kone me diye gaye <strong>तीन बिंदु (⋮)</strong> par tap karein aur <strong>"Install app"</strong> ya <strong>"Add to Home screen"</strong> par click karein.
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-rose-600/30 text-rose-400 border border-rose-500/40 flex items-center justify-center font-bold text-xs shrink-0">
                3
              </span>
              <div>
                <strong className="text-white block font-semibold">Phone Par App Icon Aayega:</strong>
                <span className="text-slate-400 text-[11px] leading-relaxed">
                  Aapke phone ki screen par WhatsApp aur YouTube ki tarah <strong>"ManishVIP"</strong> app icon ban jayega. Uspe click karte hi full screen bina browser bar ke khulega!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copy Shareable Link Box */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">App Link (Students Ko Bhejne Ke Liye):</span>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 text-[11px] font-bold text-rose-400 hover:text-rose-300 cursor-pointer"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
            </button>
          </div>
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 truncate select-all">
            {currentUrl}
          </div>
        </div>

        {/* RAW APK Conversion Info for Manish Sir */}
        <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20 text-xs text-rose-200/90 space-y-1">
          <div className="font-bold text-rose-300 flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-rose-400" />
            <span>Agar aapko raw .APK file chahiye (Telegram par daalne ke liye):</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Is app ka live link lekar aap <strong>PWABuilder.com</strong> ya <strong>Web2Apk</strong> par paste karke 1 minute mein official signed <code>.apk</code> file download karke seedhe Telegram ya WhatsApp par share kar sakte hain!
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
