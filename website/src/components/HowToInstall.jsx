import React from 'react';
import { installStepsData, securityNote } from '../data/installStepsData';
import {
  Download,
  FolderOpen,
  Settings,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Smartphone
} from 'lucide-react';

export const HowToInstall = () => {
  const getStepIcon = (index) => {
    switch (index) {
      case 0:
        return <Download className="w-6 h-6 text-emerald-400 stroke-[2.5]" />;
      case 1:
        return <FolderOpen className="w-6 h-6 text-cyan-400 stroke-[2.5]" />;
      case 2:
      default:
        return <Settings className="w-6 h-6 text-purple-400 stroke-[2.5]" />;
    }
  };

  return (
    <section id="how-to-install" className="py-24 relative bg-[#090D18]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Setup Walkthrough</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How to Install <span className="text-gradient-emerald">on Your Android Device</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Installing via an official APK is fast and takes less than a minute. Follow these three steps.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {installStepsData.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="relative rounded-2xl p-8 glass-card border border-white/10 hover:border-emerald-500/30 transition-all group"
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  {getStepIcon(idx)}
                </div>
                <span className="text-2xl font-black text-slate-400 font-mono">
                  {step.stepNumber}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {step.description}
              </p>

              {/* Helpful tip box */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-400 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{step.tip}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Reassuring Android Security Box (Follows strict prompt instructions) */}
        <div className="rounded-3xl p-8 glass-panel border border-emerald-500/20 bg-gradient-to-r from-emerald-950/20 via-slate-900/90 to-slate-900/90">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{securityNote.title}</span>
                </h4>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {securityNote.content}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {securityNote.bulletPoints.map((point, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-slate-300 flex items-center gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToInstall;
