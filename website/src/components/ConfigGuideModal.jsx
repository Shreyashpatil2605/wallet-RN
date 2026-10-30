import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Globe, FolderCheck, AlertCircle } from 'lucide-react';
import appConfig from '../config/appConfig';

export const ConfigGuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [copiedEnv, setCopiedEnv] = useState(false);

  const envSnippet = `# website/.env
VITE_APK_URL=https://github.com/Shreyashpatil2605/wallet-RN/releases/download/v1.0.0/wallet-v1.0.0.apk`;

  const copySnippet = () => {
    navigator.clipboard.writeText(envSnippet);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 glass-panel border border-white/10 shadow-2xl bg-[#0C1220]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">APK Download Configuration</h3>
            <p className="text-xs text-slate-400">How to attach your live Android APK build</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          The download button is designed to prevent broken downloads. Currently, no active APK URL is configured. Choose one of the two standard deployment options below:
        </p>

        {/* Option 1: External Hosting (Recommended) */}
        <div className="rounded-2xl p-5 bg-slate-900/80 border border-white/10 mb-4">
          <div className="flex items-center gap-2 mb-2 text-emerald-400 font-semibold text-sm">
            <Globe className="w-4 h-4" />
            <span>Option A: Public CDN or GitHub Releases (Recommended)</span>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            Host the compiled APK on GitHub Releases, Cloudflare R2, AWS S3, or Firebase Storage. Then supply the URL in <code className="text-emerald-300">website/.env</code> or your host (Vercel/Netlify):
          </p>

          <div className="relative rounded-xl bg-black/50 p-3 font-mono text-xs text-slate-200 border border-white/5 flex items-center justify-between">
            <code className="truncate mr-3">{envSnippet}</code>
            <button
              onClick={copySnippet}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 shrink-0"
            >
              {copiedEnv ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEnv ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Option 2: Local Static File */}
        <div className="rounded-2xl p-5 bg-slate-900/80 border border-white/10 mb-6">
          <div className="flex items-center gap-2 mb-2 text-cyan-400 font-semibold text-sm">
            <FolderCheck className="w-4 h-4" />
            <span>Option B: Local File inside Website Public Directory</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-2">
            Copy your compiled APK to:
          </p>
          <div className="p-2.5 rounded-lg bg-black/50 font-mono text-xs text-cyan-300 border border-white/5 mb-3">
            website/public/downloads/{appConfig.apkFileName}
          </div>
          <p className="text-xs text-slate-400">
            Then set <code className="text-cyan-300">VITE_APK_URL=/downloads/{appConfig.apkFileName}</code> in <code className="text-slate-300">.env</code>.
          </p>
        </div>

        {/* Modal Action Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigGuideModal;
