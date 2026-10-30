import React from 'react';
import { Download, Mail, Github, Heart, Shield, ArrowUp } from 'lucide-react';
import appConfig from '../config/appConfig';

export const Footer = ({ onOpenPrivacyModal, onDownloadClick }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Features', href: '#features' },
    { label: 'App Preview', href: '#preview' },
    { label: 'How to Install', href: '#how-to-install' },
    { label: 'Download APK', href: '#download' },
  ];

  const handleLinkClick = (e, href) => {
    if (href === '#') {
      e.preventDefault();
      scrollToTop();
      return;
    }
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#060910] text-slate-400 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center p-1.5">
                <img
                  src="/assets/logo.png"
                  alt="Wallet Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {appConfig.appName}
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {appConfig.appDescription}
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-white/5 text-slate-300">
                Android Release v{appConfig.appVersion}
              </span>
              <span className="text-slate-400">Pure React Native Client</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </p>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-emerald-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Resources */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Project & Resources
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacyModal}
                  className="flex items-center gap-2 hover:text-emerald-300 transition-colors text-left"
                >
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Privacy Policy (Template)</span>
                </button>
              </li>
              <li>
                <a
                  href={`mailto:${appConfig.contactEmail}`}
                  className="flex items-center gap-2 hover:text-emerald-300 transition-colors"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Contact Maintainer ({appConfig.contactEmail})</span>
                </a>
              </li>
              <li>
                <a
                  href={appConfig.githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-emerald-300 transition-colors"
                >
                  <Github className="w-4 h-4 text-purple-400" />
                  <span>Source Code Repository</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            © {currentYear} {appConfig.appName}. All rights reserved. Distributed under standard open application licensing.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 hover:border-white/20 hover:text-white transition-all"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
