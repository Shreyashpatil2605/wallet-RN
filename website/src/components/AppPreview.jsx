import React, { useState } from 'react';
import {
  Smartphone,
  Layers,
  Plus,
  ArrowLeft,
  Check,
  AlertCircle,
  Trash2,
  Receipt,
  Tag,
  CreditCard,
  User,
  LogOut,
  Sparkles
} from 'lucide-react';
import appConfig from '../config/appConfig';

export const AppPreview = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home & Balance' },
    { id: 'create', label: 'Create Transaction' },
    { id: 'delete', label: 'Manage & Delete' },
    { id: 'auth', label: 'Sign In Screen' },
  ];

  return (
    <section id="preview" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive App Preview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Designed for Simplicity.{' '}
            <span className="text-gradient-purple">Experience the Flow.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Switch between core app screens to preview how Wallet manages your balances, transaction forms, and account sign-in.
          </p>

          {/* Interactive Tab Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Smartphone Frame Showcase */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[340px] sm:max-w-[370px]">
            {/* Outer phone casing */}
            <div className="rounded-[48px] p-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-2 border-slate-700/70 shadow-2xl shadow-purple-950/20">
              <div className="rounded-[40px] bg-[#0A0E1A] overflow-hidden border border-slate-800 min-h-[580px] flex flex-col justify-between text-slate-100 select-none">
                
                {/* Status Bar */}
                <div className="pt-3.5 px-6 pb-2 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>9:41</span>
                  <div className="w-4 h-4 rounded-full bg-black border border-slate-800" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px]">5G</span>
                    <span className="w-2.5 h-2 bg-slate-300 rounded-xs"></span>
                  </div>
                </div>

                {/* SCREEN 1: Home Screen */}
                {activeTab === 'home' && (
                  <div className="px-4 py-2 space-y-3.5 animate-in fade-in duration-200">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src="/assets/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
                        <div>
                          <p className="text-[10px] text-slate-400">Welcome</p>
                          <p className="text-xs font-bold text-white">Shreyash</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500 text-slate-950 font-bold text-[10px]">
                          <Plus className="w-3 h-3 stroke-[3]" /> ADD
                        </span>
                        <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center text-slate-400 text-xs">
                          🚪
                        </div>
                      </div>
                    </div>

                    {/* Balance Card */}
                    <div className="rounded-2xl p-4 bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/30">
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Total Balance</p>
                      <p className="text-2xl font-extrabold text-white mt-0.5">₹24,850.00</p>
                      <div className="mt-3 pt-2.5 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Income</span>
                          <span className="font-bold text-emerald-400">+₹45,000.00</span>
                        </div>
                        <div className="border-l border-slate-800 pl-3">
                          <span className="text-[10px] text-slate-400 block">Expense</span>
                          <span className="font-bold text-rose-400">-₹20,150.00</span>
                        </div>
                      </div>
                    </div>

                    {/* Section Title */}
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">Recent Transactions</span>
                      <span className="text-[10px] text-slate-400">Pull to refresh</span>
                    </div>

                    {/* Transaction List */}
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-sm p-1.5 rounded-lg bg-rose-500/10">🍽️</span>
                          <div>
                            <p className="text-xs font-semibold text-white">Café Mocha</p>
                            <p className="text-[10px] text-slate-400">Food & Drinks • Today</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-rose-400">-₹280.00</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-sm p-1.5 rounded-lg bg-emerald-500/10">💰</span>
                          <div>
                            <p className="text-xs font-semibold text-white">Consulting Fee</p>
                            <p className="text-[10px] text-slate-400">Income • Yesterday</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-400">+₹15,000.00</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-sm p-1.5 rounded-lg bg-cyan-500/10">📄</span>
                          <div>
                            <p className="text-xs font-semibold text-white">Electricity Bill</p>
                            <p className="text-[10px] text-slate-400">Bills • Oct 25</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-rose-400">-₹1,850.00</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* SCREEN 2: Create Transaction Screen */}
                {activeTab === 'create' && (
                  <div className="px-4 py-2 space-y-3.5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2 text-slate-400">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-xs font-bold text-white">New Transaction</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        Save
                      </span>
                    </div>

                    {/* Income vs Expense Toggle */}
                    <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                      <button className="py-1.5 rounded-lg font-bold text-rose-400 bg-rose-500/20 border border-rose-500/30">
                        Expense
                      </button>
                      <button className="py-1.5 rounded-lg font-semibold text-slate-400">
                        Income
                      </button>
                    </div>

                    {/* Amount Input */}
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <label className="text-[10px] text-slate-400 block mb-1">AMOUNT</label>
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold text-slate-400">₹</span>
                        <input
                          type="text"
                          readOnly
                          value="1,450.00"
                          className="bg-transparent text-xl font-extrabold text-white focus:outline-none w-full"
                        />
                      </div>
                    </div>

                    {/* Title Input */}
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <label className="text-[10px] text-slate-400 block mb-1">TRANSACTION TITLE</label>
                      <input
                        type="text"
                        readOnly
                        value="Weekly Grocery Haul"
                        className="bg-transparent text-xs font-semibold text-white focus:outline-none w-full"
                      />
                    </div>

                    {/* Category Selection */}
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1.5">CATEGORY</label>
                      <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                        <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500 text-white font-medium flex items-center gap-1.5">
                          <span>🍽️</span> Food & Drinks
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-1.5">
                          <span>🛍️</span> Shopping
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-1.5">
                          <span>🚗</span> Transportation
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-1.5">
                          <span>📄</span> Bills
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SCREEN 3: Manage & Delete Screen */}
                {activeTab === 'delete' && (
                  <div className="px-4 py-2 space-y-3.5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-bold text-white">Delete Transaction</span>
                      <span className="text-[10px] text-slate-400">Prompt</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center my-3">
                      <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-2">
                        <Trash2 className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-white">Delete Transaction?</p>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Are you sure you want to delete the transaction?
                      </p>
                      <p className="text-[10px] text-slate-400 mt-2 font-mono">
                        "Grocery Store" • -₹1,240.00
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <button className="py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold">
                          Cancel
                        </button>
                        <button className="py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold shadow-md">
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                      <p className="font-semibold text-emerald-400 mb-1">✓ Instant Rebalance</p>
                      <p className="text-slate-400 text-[10px]">
                        Removing this transaction will automatically adjust your current balance from ₹24,850.00 to ₹26,090.00 in real-time.
                      </p>
                    </div>
                  </div>
                )}

                {/* SCREEN 4: Auth Screen */}
                {activeTab === 'auth' && (
                  <div className="px-4 py-2 space-y-3 animate-in fade-in duration-200 text-center">
                    <div className="w-32 h-24 mx-auto my-1 flex items-center justify-center overflow-hidden">
                      <img
                        src="/assets/revenue-i4.png"
                        alt="Auth Illustration"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Welcome Back</h4>
                      <p className="text-[10px] text-slate-400">Sign in using your verified email</p>
                    </div>

                    <div className="space-y-2 text-left text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <label className="text-[9px] text-slate-400 block">EMAIL ADDRESS</label>
                        <p className="text-xs text-slate-200">shreyash@example.com</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <label className="text-[9px] text-slate-400 block">PASSWORD</label>
                        <p className="text-xs text-slate-200 font-mono">••••••••••••</p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-md">
                        Sign In
                      </button>
                      <p className="text-[10px] text-slate-400 mt-2">
                        Protected with Clerk Authentication
                      </p>
                    </div>
                  </div>
                )}

                {/* Bottom Gesture Bar */}
                <div className="pb-3 pt-2 flex justify-center">
                  <div className="w-24 h-1 rounded-full bg-slate-700" />
                </div>
              </div>
            </div>

            {/* Verification label */}
            <p className="text-center text-xs text-slate-400 mt-5 font-medium">
              Illustrative design preview modeled faithfully after the Wallet Android codebase
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPreview;
