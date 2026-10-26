'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageSquare, Phone, ChevronRight, ChevronDown, Globe, Sparkles, MapPin, Building, Calculator, Video, BookOpen, Info, Mail } from 'lucide-react';
import { Button } from './Button';

interface NavItem {
  label: string;
  href: string;
  isHighlight?: boolean;
}

const PRIMARY_NAV: NavItem[] = [
  { label: 'Properties', href: '/properties' },
  { label: 'Societies', href: '/societies' },
  { label: 'Floor Plans', href: '/floor-plans' },
  { label: 'Investment', href: '/investment' },
  { label: 'Calculators', href: '/calculators' },
  { label: 'Videos', href: '/videos' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const whatsappUrl = 'https://wa.me/923218004186?text=Hello%20Asad%20Land%20Holdings,%20I%20am%20inquiring%20about%20verified%20properties.';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#000000]/95 backdrop-blur-md text-[#FEFEFE] py-3 shadow-xl border-b border-[#222222]'
          : 'bg-[#000000] text-[#FEFEFE] py-4 sm:py-5 border-b border-[#1A1A1A]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* 1. Brand Logo */}
          <Link href="/" className="flex items-center shrink-0 group py-1">
            <img
              src="/images/logo-white.png"
              alt="Asad Land Holdings — Real Estate on Real Rates"
              className="h-9 sm:h-10 xl:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
            />
          </Link>

          {/* 2. Desktop Navigation Bar (Carefully spaced & balanced) */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-6 font-mono text-[11px] xl:text-[12px] uppercase tracking-[0.14em]">
            {PRIMARY_NAV.map((item) => {
              const isActive = pathname === item.href;
              
              if (item.label === 'Societies') {
                const isSocietiesActive = isActive || pathname.startsWith('/societies') || pathname === '/kohistan-enclave';
                return (
                  <div key={item.href} className="relative group py-1">
                    <Link
                      href="/societies"
                      className={`flex items-center gap-1 py-1 px-1 transition-all duration-200 relative whitespace-nowrap ${
                        isSocietiesActive
                          ? 'text-[#FEFEFE] font-bold'
                          : 'text-[#D4D4D4] hover:text-[#FEFEFE]'
                      }`}
                    >
                      <span>Societies</span>
                      <ChevronDown className="w-3 h-3 text-[#888888] group-hover:rotate-180 transition-transform duration-200" />
                      {isSocietiesActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FEFEFE] rounded-full" />
                      )}
                    </Link>

                    {/* Societies Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-2 w-72 bg-[#0B0F19] border border-[#2A2A2A] rounded-lg shadow-2xl p-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
                      <Link
                        href="/kohistan-enclave"
                        className="flex items-center justify-between px-3 py-2.5 rounded bg-amber-500/15 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-black transition-colors mb-2"
                      >
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            <span>⭐ Kohistan Enclave</span>
                          </div>
                          <div className="text-[10px] text-slate-300 font-sans normal-case tracking-normal">
                            Official Dedicated Page & 2026 Rate Sheet
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>

                      <div className="text-[9px] font-mono uppercase text-[#777777] px-3 py-1">
                        Societies Directory
                      </div>

                      <Link
                        href="/societies"
                        className="flex items-center justify-between px-3 py-2 text-[11px] text-[#E0E0E0] hover:text-white hover:bg-white/10 rounded transition-colors"
                      >
                        <span>All Covered Townships</span>
                        <ChevronRight className="w-3 h-3 text-[#666666]" />
                      </Link>

                      <Link
                        href="/societies/map-explorer"
                        className="flex items-center justify-between px-3 py-2 text-[11px] text-[#E0E0E0] hover:text-white hover:bg-white/10 rounded transition-colors"
                      >
                        <span>Interactive Sector Map Explorer</span>
                        <ChevronRight className="w-3 h-3 text-[#666666]" />
                      </Link>

                      <div className="border-t border-[#1F1F1F] my-1.5" />

                      <div className="text-[9px] font-mono uppercase text-[#777777] px-3 py-1">
                        Popular Sub-Areas
                      </div>

                      <Link
                        href="/societies/new-city-phase-2-wah"
                        className="flex items-center justify-between px-3 py-1.5 text-[10px] text-[#AAAAAA] hover:text-white hover:bg-white/5 rounded transition-colors"
                      >
                        <span>New City Phase 2</span>
                      </Link>
                      <Link
                        href="/societies/multi-gardens-b17-islamabad"
                        className="flex items-center justify-between px-3 py-1.5 text-[10px] text-[#AAAAAA] hover:text-white hover:bg-white/5 rounded transition-colors"
                      >
                        <span>Multi Gardens B-17</span>
                      </Link>
                      <Link
                        href="/societies/faisal-hills-taxila"
                        className="flex items-center justify-between px-3 py-1.5 text-[10px] text-[#AAAAAA] hover:text-white hover:bg-white/5 rounded transition-colors"
                      >
                        <span>Faisal Hills Taxila</span>
                      </Link>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-1 px-1 transition-all duration-200 relative whitespace-nowrap ${
                    isActive
                      ? 'text-[#FEFEFE] font-bold'
                      : 'text-[#D4D4D4] hover:text-[#FEFEFE]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FEFEFE] rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* Overseas Desk Featured Pill */}
            <Link
              href="/overseas"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] xl:text-[11px] font-bold uppercase tracking-wider rounded border transition-all duration-200 whitespace-nowrap ${
                pathname === '/overseas'
                  ? 'bg-white text-[#000000] border-white font-black shadow-sm'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white hover:text-[#000000] hover:border-white'
              }`}
            >
              <span>Overseas Desk</span>
            </Link>
          </nav>

          {/* 3. Right Action Group (WhatsApp Direct & Find Property CTA) */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#FEFEFE] border border-[#333333] hover:border-[#666666] hover:bg-[#1A1A1A] transition-colors rounded-none"
              title="Connect on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
            </a>

            <Button href="/find-property" variant="secondary" size="sm" className="text-[11px] px-3.5 py-2 font-mono uppercase tracking-wider whitespace-nowrap">
              FIND PROPERTY
            </Button>
          </div>

          {/* 4. Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/overseas"
              className="px-2 py-1 text-[10px] font-mono font-bold uppercase bg-amber-400/15 text-amber-400 border border-amber-400/30"
            >
              Overseas
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-[#333333] text-[#FEFEFE] hover:bg-[#1A1A1A] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* 5. Mobile Slide-down Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A] border-b border-[#222222] px-6 py-6 font-mono text-xs shadow-2xl">
          <div className="space-y-4 mb-6">
            
            {/* Real Estate Navigation */}
            <div>
              <span className="text-[10px] text-[#CCCCCC] uppercase tracking-[0.2em] block mb-2 font-bold">
                Properties & Exploration
              </span>
              <div className="divide-y divide-[#1A1A1A]">
                <Link
                  href="/properties"
                  className="flex items-center justify-between py-2.5 text-[#E0E0E0] hover:text-[#FEFEFE]"
                >
                  <span className="flex items-center gap-2"><Building className="w-3.5 h-3.5 text-[#CCCCCC]" /> Verified Properties</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
                </Link>
                <Link
                  href="/societies"
                  className="flex items-center justify-between py-2.5 text-[#E0E0E0] hover:text-[#FEFEFE]"
                >
                  <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#CCCCCC]" /> Housing Societies & Maps</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
                </Link>
                <div className="pl-4 pb-1 pt-0.5">
                  <Link
                    href="/kohistan-enclave"
                    className="flex items-center justify-between py-2 px-3 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 font-bold text-xs"
                  >
                    <span className="flex items-center gap-1.5">⭐ Kohistan Enclave (Official Portal)</span>
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  </Link>
                </div>
                <Link
                  href="/floor-plans"
                  className="flex items-center justify-between py-2.5 text-[#E0E0E0] hover:text-[#FEFEFE]"
                >
                  <span className="flex items-center gap-2">📐 Architectural Floor Plans</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
                </Link>
              </div>
            </div>

            {/* Analysis & Content */}
            <div className="pt-2">
              <span className="text-[10px] text-[#CCCCCC] uppercase tracking-[0.2em] block mb-2 font-bold">
                Market Intelligence & Tools
              </span>
              <div className="divide-y divide-[#1A1A1A]">
                <Link
                  href="/overseas"
                  className="flex items-center justify-between py-2.5 text-amber-400 font-bold"
                >
                  <span className="flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-amber-400" /> Overseas Pakistani Portal</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                </Link>
                <Link
                  href="/investment"
                  className="flex items-center justify-between py-2.5 text-[#E0E0E0] hover:text-[#FEFEFE]"
                >
                  <span className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-[#CCCCCC]" /> Real Rates & Valuation</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
                </Link>
                <Link
                  href="/calculators"
                  className="flex items-center justify-between py-2.5 text-[#E0E0E0] hover:text-[#FEFEFE]"
                >
                  <span className="flex items-center gap-2"><Calculator className="w-3.5 h-3.5 text-[#CCCCCC]" /> Construction & ROI Calculators</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
                </Link>
                <Link
                  href="/videos"
                  className="flex items-center justify-between py-2.5 text-[#E0E0E0] hover:text-[#FEFEFE]"
                >
                  <span className="flex items-center gap-2"><Video className="w-3.5 h-3.5 text-[#CCCCCC]" /> Site Tour Videos</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center justify-between py-2.5 text-[#E0E0E0] hover:text-[#FEFEFE]"
                >
                  <span className="flex items-center gap-2"><BookOpen className="w-3.5 h-3.5 text-[#CCCCCC]" /> Market Articles & Guides</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
                </Link>
              </div>
            </div>

            {/* Company & Contact */}
            <div className="pt-2">
              <span className="text-[10px] text-[#CCCCCC] uppercase tracking-[0.2em] block mb-2 font-bold">
                Company Information
              </span>
              <div className="divide-y divide-[#1A1A1A]">
                <Link
                  href="/about"
                  className="flex items-center justify-between py-2.5 text-[#E0E0E0] hover:text-[#FEFEFE]"
                >
                  <span className="flex items-center gap-2"><Info className="w-3.5 h-3.5 text-[#CCCCCC]" /> About Asad Land Holdings</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-between py-2.5 text-[#E0E0E0] hover:text-[#FEFEFE]"
                >
                  <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#CCCCCC]" /> Wah Cantt Office & Contact</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
                </Link>
              </div>
            </div>

          </div>

          {/* Quick Action CTAs */}
          <div className="flex flex-col gap-2.5 pt-2 border-t border-[#222222]">
            <Button href="/find-property" variant="primary" size="md" className="w-full text-center justify-center font-bold">
              FIND MY PROPERTY WIZARD
            </Button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-white" /> WhatsApp Advisory
            </a>
            <a
              href="tel:+923218004186"
              className="flex items-center justify-center gap-2 py-2.5 border border-[#333333] text-[#FEFEFE] text-xs uppercase tracking-wider hover:bg-[#1A1A1A] transition-colors"
            >
              <Phone className="w-4 h-4" /> Call Direct Hotline
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
