import React, { useState } from 'react';
import { featuresData, previewCategories } from '../data/featuresData';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export const Features = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const getColorClasses = (color) => {
    switch (color) {
      case 'emerald':
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20 group-hover:border-emerald-500/40',
          text: 'text-emerald-400',
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.25)]',
        };
      case 'purple':
        return {
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/20 group-hover:border-purple-500/40',
          text: 'text-purple-400',
          badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
          glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.25)]',
        };
      case 'cyan':
        return {
          bg: 'bg-cyan-500/10',
          border: 'border-cyan-500/20 group-hover:border-cyan-500/40',
          text: 'text-cyan-400',
          badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
          glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.25)]',
        };
      case 'indigo':
      default:
        return {
          bg: 'bg-indigo-500/10',
          border: 'border-indigo-500/20 group-hover:border-indigo-500/40',
          text: 'text-indigo-400',
          badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
          glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.25)]',
        };
    }
  };

  return (
    <section id="features" className="py-24 relative bg-[#090D18]/60">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Key Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Designed for Clarity.{' '}
            <span className="text-gradient-emerald">Built for Everyday Use.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Everything you need to track spending, review incomes, and keep your balances straight without clutter or confusing submenus.
          </p>
        </div>

        {/* Features Grid: 6 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuresData.map((feature) => {
            const Icon = feature.icon;
            const colors = getColorClasses(feature.color);

            return (
              <div
                key={feature.id}
                className={`group relative rounded-2xl p-7 glass-card border transition-all duration-300 hover:-translate-y-1.5 ${colors.border} ${colors.glow}`}
              >
                {/* Header: Icon & Category Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.bg} ${colors.text} border border-white/5`}>
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${colors.badge}`}>
                    {feature.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-emerald-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-2.5 pt-4 border-t border-white/5">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className={`mt-0.5 rounded-full p-0.5 ${colors.text}`}>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Interactive App Category Showcase */}
        <div className="rounded-3xl glass-panel p-8 border border-white/10 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                Categorization Breakdown
              </span>
              <h3 className="text-2xl font-bold text-white mt-1 mb-3">
                Pre-configured Spending Categories
              </h3>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Wallet comes with structured categories straight out of the box. Tap each category to see typical transactions and monthly tracking.
              </p>

              {/* Category selector pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {previewCategories.map((cat, idx) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(idx)}
                    className={`px-3 py-2.5 rounded-xl text-left border text-xs font-semibold flex items-center gap-2 transition-all ${
                      activeCategory === idx
                        ? 'bg-purple-500/20 border-purple-500 text-white shadow-md'
                        : 'bg-slate-900/40 border-white/5 text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span className="truncate">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Category Detail Card */}
            <div className="lg:col-span-7 bg-slate-900/80 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-xl">
                    {previewCategories[activeCategory].icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {previewCategories[activeCategory].name}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {previewCategories[activeCategory].count} recorded this cycle
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Total Sum</p>
                  <p className={`text-base font-extrabold ${previewCategories[activeCategory].sum.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {previewCategories[activeCategory].sum}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1.5 px-3 rounded-lg bg-black/20">
                  <span>Category Tagging:</span>
                  <span className="font-semibold text-white">One-click selector</span>
                </div>
                <div className="flex justify-between py-1.5 px-3 rounded-lg bg-black/20">
                  <span>Supported Currency:</span>
                  <span className="font-semibold text-white">₹ (INR) & Global Numerics</span>
                </div>
                <div className="flex justify-between py-1.5 px-3 rounded-lg bg-black/20">
                  <span>Data Persistence:</span>
                  <span className="font-semibold text-emerald-400">Synced to Cloud API</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
