import React, { useState, useEffect } from 'react';
import { Download, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import appConfig from '../config/appConfig';

export const Navbar = ({ onDownloadClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'App Preview', href: '#preview' },
    { label: 'How to Install', href: '#how-to-install' },
    { label: 'Download', href: '#download' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080C14]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg p-1"
            aria-label="Wallet Home"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center p-1.5 shadow-inner shadow-emerald-500/20 group-hover:border-emerald-400 transition-colors">
              <img
                src="/assets/logo.png"
                alt="Wallet App Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback if logo not found
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                {appConfig.appName}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                v{appConfig.appVersion}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md py-1 px-1.5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onDownloadClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-semibold text-sm shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:shadow-lg transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label="Download Wallet APK"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download APK</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-white/10 glass-panel rounded-2xl p-4 shadow-xl animate-in fade-in slide-in-from-top-3 duration-200">
            <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onDownloadClick();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-semibold text-sm shadow-md"
                >
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  <span>Download Wallet APK</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
