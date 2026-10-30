import React, { useState } from 'react';
import {
  Download,
  AlertCircle,
  FileCheck2,
  Calendar,
  Layers,
  Smartphone,
  ExternalLink,
  Code2,
  Info,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import appConfig from '../config/appConfig';

const AndroidIcon = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9996.4482.9996.9993.0001.5511-.4485.9997-.9996.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4111 13.8533 8.125 12 8.125c-1.8533 0-3.5902.2861-5.1368.8247L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.7885h24c-.3432-4.1296-2.6889-7.6018-6.1185-9.4671" />
  </svg>
);

export const DownloadSection = ({ onOpenConfigGuide }) => {
  const isConfigured = appConfig.isApkConfigured();
  const downloadUrl = appConfig.getDownloadUrl();
  const [copiedSha, setCopiedSha] = useState(false);

  const handleDownloadClick = (e) => {
    if (!isConfigured) {
      e.preventDefault();
      onOpenConfigGuide();
    }
  };

  const copySha = () => {
    if (appConfig.apkSha256) {
      navigator.clipboard.writeText(appConfig.apkSha256);
      setCopiedSha(true);
      setTimeout(() => setCopiedSha(false), 2000);
    }
  };

  return (
    <section id="download" className="py-24 relative overflow-hidden">
      {/* Background Accent Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="rounded-3xl p-8 sm:p-12 glass-panel border border-emerald-500/30 shadow-2xl shadow-emerald-950/30 relative overflow-hidden text-center">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 mb-6">
              <AndroidIcon className="w-4 h-4" />
              <span>Official Android Release</span>
            </div>

            {/* Header */}
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Get {appConfig.appName} for Android
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8">
              Download the official APK to your smartphone. Free from third-party ads and trackers.
            </p>

            {/* Download CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              {isConfigured ? (
                <a
                  href={downloadUrl}
                  download={appConfig.apkFileName}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <AndroidIcon className="w-5 h-5" />
                  <span>Download APK ({appConfig.apkSize})</span>
                  <Download className="w-5 h-5 stroke-[2.5]" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleDownloadClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  aria-label="Download Wallet APK"
                >
                  <AndroidIcon className="w-5 h-5" />
                  <span>Download APK ({appConfig.apkSize})</span>
                  <Download className="w-5 h-5 stroke-[2.5]" />
                </button>
              )}
            </div>

            {/* If not configured, show clear helpful note (no fake downloads) */}
            {!isConfigured && (
              <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm text-left flex items-start gap-3 max-w-xl mx-auto">
                <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-300">Deployment Notice: APK URL Configuration</p>
                  <p className="text-amber-200/90 text-xs mt-1">
                    The download link is currently in configurable mode. Tap the button or{' '}
                    <button
                      onClick={onOpenConfigGuide}
                      className="underline font-bold text-amber-300 hover:text-white"
                    >
                      view configuration guide
                    </button>{' '}
                    to set <code className="bg-black/30 px-1 py-0.5 rounded">VITE_APK_URL</code> or place your release APK.
                  </p>
                </div>
              </div>
            )}

            {/* Technical Specifications Grid */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Version</span>
                </div>
                <p className="text-sm font-bold text-white mt-1">v{appConfig.appVersion}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Requires</span>
                </div>
                <p className="text-sm font-bold text-white mt-1">{appConfig.minAndroidVersion}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Size</span>
                </div>
                <p className="text-sm font-bold text-white mt-1">{appConfig.apkSize}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Release Date</span>
                </div>
                <p className="text-sm font-bold text-white mt-1">{appConfig.releaseDate}</p>
              </div>
            </div>

            {/* Package & Verification metadata */}
            <div className="mt-4 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
              <p>
                <span className="font-semibold text-slate-300">Package Name:</span>{' '}
                <span className="font-mono text-slate-300">{appConfig.packageName}</span>
              </p>
              <p>
                <span className="font-semibold text-slate-300">File:</span>{' '}
                <span className="font-mono text-slate-300">{appConfig.apkFileName}</span>
              </p>
            </div>

            {/* Optional Checksum display */}
            {appConfig.apkSha256 && (
              <div className="mt-3 p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate mr-2 font-mono">SHA-256: {appConfig.apkSha256}</span>
                <button
                  onClick={copySha}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700"
                >
                  {copiedSha ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSha ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
