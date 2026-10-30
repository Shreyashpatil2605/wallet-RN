import React from 'react';
import {
  Download,
  ArrowRight,
  Sparkles,
  Smartphone,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Receipt,
  ShoppingCart,
  Coffee,
  CheckCircle2,
  ShieldAlert,
  Zap
} from 'lucide-react';
import appConfig from '../config/appConfig';

// Custom Android Robot SVG Icon for pixel-perfect look
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

export const Hero = ({ onDownloadClick }) => {
  const scrollToFeatures = (e) => {
    e.preventDefault();
    const element = document.querySelector('#features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Glows & Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Subtle Background Mesh Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-medium text-emerald-400 mb-6 shadow-sm shadow-emerald-950/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <AndroidIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Available for Android</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400 font-mono">v{appConfig.appVersion}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              Your Money.{' '}
              <span className="text-gradient-emerald">Your Control.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8">
              Manage your wallet with a simple, modern mobile experience. Get the Wallet app for Android and start exploring.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <button
                onClick={onDownloadClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-base shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                aria-label="Download Wallet for Android APK"
              >
                <AndroidIcon className="w-5 h-5" />
                <span>Download for Android</span>
                <Download className="w-4 h-4 ml-1 stroke-[2.5]" />
              </button>

              <a
                href="#features"
                onClick={scrollToFeatures}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl glass-card text-slate-200 hover:text-white hover:bg-white/5 font-semibold text-base transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <span>Explore Features</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Quick Spec Highlights */}
            <div className="pt-6 border-t border-white/5 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-xs text-slate-400 font-medium">Platform</p>
                <p className="text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Android APK
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Package Size</p>
                <p className="text-sm font-semibold text-white mt-0.5">{appConfig.apkSize}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Compatibility</p>
                <p className="text-sm font-semibold text-white mt-0.5">Android 8.0+</p>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Smartphone Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Ambient Backlight for Phone */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 via-teal-500/10 to-transparent blur-3xl -z-10 rounded-full" />

            {/* Smartphone Container */}
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] transform transition-transform hover:-translate-y-1 duration-300">
              {/* Outer Phone Bezel */}
              <div className="rounded-[44px] p-3 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-2 border-slate-700/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] shadow-emerald-950/30">
                {/* Phone Hardware Details: Speaker & Punch-hole Camera */}
                <div className="relative rounded-[36px] bg-[#0A0F1D] overflow-hidden border border-slate-800 text-slate-100 shadow-inner">
                  {/* Status Bar */}
                  <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] text-slate-400 font-medium select-none">
                    <span>9:41</span>
                    {/* Punch-hole camera */}
                    <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-800 mx-auto" />
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2 bg-slate-300 rounded-xs"></span>
                      <span className="text-[10px]">100%</span>
                    </div>
                  </div>

                  {/* App Screen Content: Exactly reflecting mobile/app/(root)/index.jsx */}
                  <div className="px-4 pt-2 pb-6 flex flex-col gap-3.5 select-none">
                    {/* App Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center p-1">
                          <img
                            src="/assets/logo.png"
                            alt="Wallet Logo"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-medium leading-none">Welcome</p>
                          <p className="text-xs font-bold text-white mt-0.5">Shreyash</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold text-[11px] shadow-sm">
                          <Plus className="w-3 h-3 stroke-[3]" />
                          <span>ADD</span>
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 text-xs">
                          🚪
                        </div>
                      </div>
                    </div>

                    {/* Balance Card: Exactly matches BalanceCard.jsx in mobile */}
                    <div className="rounded-2xl p-4 bg-gradient-to-br from-emerald-900/40 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-lg">
                      <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total Balance</p>
                      <p className="text-2xl font-extrabold text-white mt-1 tracking-tight">₹24,850.00</p>

                      <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-left">
                        <div>
                          <p className="text-[10px] text-slate-400 font-medium">Income</p>
                          <p className="text-xs font-bold text-emerald-400 mt-0.5">+₹45,000.00</p>
                        </div>
                        <div className="border-l border-slate-800/80 pl-3">
                          <p className="text-[10px] text-slate-400 font-medium">Expense</p>
                          <p className="text-xs font-bold text-rose-400 mt-0.5">-₹20,150.00</p>
                        </div>
                      </div>
                    </div>

                    {/* Section Header */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[12px] font-bold text-white">Recent Transactions</span>
                      <span className="text-[10px] text-emerald-400 font-medium">Pull to sync</span>
                    </div>

                    {/* Transactions List: Exactly matching categories from create.jsx */}
                    <div className="space-y-2">
                      {/* Item 1 */}
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/60 flex items-center justify-between hover:border-slate-700 transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 text-xs">
                            🍽️
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-200">Grocery Store</p>
                            <p className="text-[10px] text-slate-400">Food & Drinks • Today</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-rose-400">-₹1,240.00</span>
                      </div>

                      {/* Item 2 */}
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/60 flex items-center justify-between hover:border-slate-700 transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs">
                            💰
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-200">Project Milestone</p>
                            <p className="text-[10px] text-slate-400">Income • Yesterday</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-400">+₹18,500.00</span>
                      </div>

                      {/* Item 3 */}
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/60 flex items-center justify-between hover:border-slate-700 transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-xs">
                            🛍️
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-200">Wireless Earbuds</p>
                            <p className="text-[10px] text-slate-400">Shopping • Oct 27</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-rose-400">-₹3,299.00</span>
                      </div>
                    </div>

                    {/* Bottom Navigation Gesture Bar */}
                    <div className="pt-2 flex justify-center">
                      <div className="w-24 h-1 rounded-full bg-slate-700" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Decorative Pill 1: Add Fast */}
              <div className="hidden sm:flex absolute -left-10 top-1/3 glass-panel px-3.5 py-2.5 rounded-xl shadow-xl items-center gap-2.5 border border-emerald-500/30 animate-float">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Balance Status</p>
                  <p className="text-xs font-bold text-white">Live Real-time Sync</p>
                </div>
              </div>

              {/* Floating Decorative Pill 2: Android Native */}
              <div className="hidden sm:flex absolute -right-8 bottom-1/4 glass-panel px-3.5 py-2.5 rounded-xl shadow-xl items-center gap-2.5 border border-cyan-500/30 animate-float [animation-delay:2s]">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <AndroidIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Target Platform</p>
                  <p className="text-xs font-bold text-white">Android 8.0+ Ready</p>
                </div>
              </div>

              {/* Label underneath mockup */}
              <p className="text-center text-xs text-slate-400 mt-4 font-medium tracking-wide">
                Design preview of the Wallet mobile experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
