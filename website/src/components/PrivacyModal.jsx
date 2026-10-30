import React from 'react';
import { X, Shield, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import appConfig from '../config/appConfig';

export const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-10 glass-panel border border-white/10 shadow-2xl bg-[#0C1220] text-slate-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Privacy Policy</h3>
            <p className="text-xs text-slate-400">Last updated: October 2026</p>
          </div>
        </div>

        {/* Review Notice */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-300">Editable Policy Template Notice</p>
            <p className="text-amber-200/90 text-xs mt-1">
              This document is a starter privacy policy tailored for the Wallet mobile application. Fields highlighted in brackets require review and confirmation with your project maintainer before legal publication.
            </p>
          </div>
        </div>

        {/* Privacy Content */}
        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <section>
            <h4 className="text-base font-bold text-white mb-2">1. Overview</h4>
            <p>
              This Privacy Policy explains how <strong>{appConfig.appName}</strong> ("we", "app", or "service") collects, uses, and safeguards information when you use the Wallet mobile application on Android. We respect your privacy and strive to handle only the minimal information required to provide expense management.
            </p>
          </section>

          <section>
            <h4 className="text-base font-bold text-white mb-2">2. Information We Collect</h4>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>
                <strong>Account Credentials:</strong> When creating an account, your email address is processed through our authentication provider (Clerk) for account verification and sign-in.
              </li>
              <li>
                <strong>Financial Records:</strong> Transaction titles, amounts, dates, and category tags (e.g., Food & Drinks, Shopping, Bills) that you explicitly input into the application.
              </li>
              <li>
                <strong>Device Diagnostics:</strong> Standard technical information necessary for network connectivity to our backend API.
              </li>
            </ul>
          </section>

          <section>
            <h4 className="text-base font-bold text-white mb-2">3. How Your Information Is Used</h4>
            <p>Your data is used solely to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm mt-1.5">
              <li>Calculate your current balance, monthly income totals, and expense summaries.</li>
              <li>Maintain your personal transaction history across app launches.</li>
              <li>Authenticate your identity upon sign-in.</li>
            </ul>
          </section>

          <section>
            <h4 className="text-base font-bold text-white mb-2">4. Third-Party Services</h4>
            <p>
              Wallet integrates minimal third-party infrastructure strictly needed for app operation:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm mt-1.5">
              <li><strong>Clerk:</strong> Provides authentication and email verification token delivery.</li>
              <li><strong>Backend API:</strong> Hosted backend database storing user transactions.</li>
            </ul>
            <p className="mt-2 text-xs text-slate-400">
              Wallet does not include third-party advertising SDKs, data brokers, or monetization trackers.
            </p>
          </section>

          <section>
            <h4 className="text-base font-bold text-white mb-2">5. User Rights & Data Deletion</h4>
            <p>
              You maintain full ownership of your records. You may delete individual transactions directly inside the app, which immediately recalculates and purges the entry from your ledger. For complete account removal, you may contact the maintainer at{' '}
              <a href={`mailto:${appConfig.contactEmail}`} className="text-emerald-400 underline">
                {appConfig.contactEmail}
              </a>.
            </p>
          </section>

          <section>
            <h4 className="text-base font-bold text-white mb-2">6. Contact Information</h4>
            <p>
              For questions or feedback regarding this privacy policy, please contact:
            </p>
            <p className="mt-1 font-mono text-xs text-emerald-400">
              {appConfig.contactEmail}
            </p>
          </section>
        </div>

        {/* Modal Action Footer */}
        <div className="flex justify-end pt-6 mt-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
