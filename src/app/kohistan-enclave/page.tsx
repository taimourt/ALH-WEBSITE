'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  FileText,
  Download,
  Building,
  Sparkles,
  Phone,
  MessageSquare,
  Award,
  Compass,
  Check,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Clock,
  Car,
  Home,
  Users,
  Send,
  Lock,
} from 'lucide-react';
import { Breadcrumbs } from '@/components/website/Breadcrumbs';

interface PlotTier {
  id: string;
  name: string;
  size: string;
  category: 'Residential' | 'Commercial' | 'Smart';
  block: string;
  priceRange: string;
  estimatedDownPayment: string;
  quarterlyInstallment: string;
  possession: string;
  features: string[];
  popular?: boolean;
}

const PLOT_TIERS: PlotTier[] = [
  {
    id: '5-marla',
    name: '5 Marla Residential Plot',
    size: '25 × 50 (125 Sq. Yds)',
    category: 'Residential',
    block: 'Block B, C & D',
    priceRange: 'PKR 75 Lakh – 95 Lakh',
    estimatedDownPayment: 'PKR 18 Lakh – 22 Lakh',
    quarterlyInstallment: 'PKR 4.5 Lakh / Qtr',
    possession: '100% On-Ground Ready / Construction Allowed',
    popular: true,
    features: [
      'Ideal for family houses (3-4 Bed)',
      'Walking distance to Central Park & Jamia Mosque',
      'Underground electricity & Sui gas connection',
      'High rental demand from university staff',
    ],
  },
  {
    id: '7-marla',
    name: '7 Marla Residential Plot',
    size: '30 × 60 (175 Sq. Yds)',
    category: 'Residential',
    block: 'Block B & C',
    priceRange: 'PKR 1.10 Crore – 1.35 Crore',
    estimatedDownPayment: 'PKR 25 Lakh – 30 Lakh',
    quarterlyInstallment: 'PKR 6.5 Lakh / Qtr',
    possession: '100% Physical Possession Ready',
    features: [
      'Spacious double-unit layout potential (4-5 Bed)',
      'Wide 40ft & 50ft paved street frontages',
      'Underground fiber internet & sewerage',
      'Fast title transfer & registry available',
    ],
  },
  {
    id: '10-marla',
    name: '10 Marla Executive Plot',
    size: '35 × 70 (250 Sq. Yds)',
    category: 'Residential',
    block: 'Block A (Executive) & Overseas Block',
    priceRange: 'PKR 1.65 Crore – 2.10 Crore',
    estimatedDownPayment: 'PKR 40 Lakh – 50 Lakh',
    quarterlyInstallment: 'PKR 9.5 Lakh / Qtr',
    possession: 'Immediate Construction & Possession',
    popular: true,
    features: [
      'VVIP boulevard frontage (80ft wide road)',
      'Elevated ridge with scenic Margalla hill breezes',
      'Proximity to Trafalgar Square & Mini Golf',
      'High-yield executive rental potential',
    ],
  },
  {
    id: '1-kanal',
    name: '1 Kanal Luxury Estate Plot',
    size: '50 × 90 (500 Sq. Yds)',
    category: 'Residential',
    block: 'Block A (Executive) & Overseas Block',
    priceRange: 'PKR 3.20 Crore – 4.50 Crore',
    estimatedDownPayment: 'PKR 80 Lakh – 1 Crore',
    quarterlyInstallment: 'PKR 18 Lakh / Qtr',
    possession: 'Immediate Registry / Mansion Ready',
    features: [
      'Exclusive luxury avenue location',
      'Architectural freedom for luxury villas & basements',
      'Highest capital appreciation history in Wah Cantt',
      'Elite community neighborhood & 24/7 security',
    ],
  },
  {
    id: '3-2-marla',
    name: '3.2 Marla Smart Plot',
    size: '20 × 40 (88 Sq. Yds)',
    category: 'Smart',
    block: 'Smart Block / Brahma Extension',
    priceRange: 'PKR 42 Lakh – 55 Lakh',
    estimatedDownPayment: 'PKR 10 Lakh – 12 Lakh',
    quarterlyInstallment: 'PKR 2.8 Lakh / Qtr',
    possession: 'Development Phase / Flexible Installments',
    features: [
      'Lowest capital entry barrier into Kohistan Enclave',
      'Easy 3-year installment schedule',
      'Strong exit liquidity for short-term investors',
      'Gated sector with modern infrastructure',
    ],
  },
  {
    id: 'commercial',
    name: '4 & 8 Marla Commercial Plazas',
    size: '30 × 30 & 40 × 45',
    category: 'Commercial',
    block: 'Civic Commercial Center & Main Boulevard',
    priceRange: 'PKR 2.80 Crore – 7.50 Crore',
    estimatedDownPayment: 'PKR 70 Lakh – 1.8 Crore',
    quarterlyInstallment: 'PKR 15 Lakh – 35 Lakh / Qtr',
    possession: 'Select Commercial Hubs Open for Construction',
    features: [
      'Main GT Road & Central Boulevard footfall',
      'Permission for Ground + 5 Commercial Floors',
      'Ideal for Banks, Pharmacies, Clinics, & Brands',
      'Targeted 10-12% annual rental return',
    ],
  },
];

const SECTORS_OVERVIEW = [
  {
    block: 'Block A (Executive VVIP)',
    plots: '10 Marla & 1 Kanal Mansions',
    possession: '100% Possessed & Inhabited',
    highlights: 'Highest elevation in Wah Cantt, 80ft main boulevard, uninterrupted underground electricity, mature green landscaping, elite private residences.',
    statusColor: 'bg-emerald-500',
  },
  {
    block: 'Block B (Family Residential)',
    plots: '5 Marla, 7 Marla & 10 Marla',
    possession: '100% Ready for Construction',
    highlights: 'Adjacent to Grand Jamia Mosque and central park. Premier choice for families seeking tranquility, school proximity, and rapid home building.',
    statusColor: 'bg-emerald-500',
  },
  {
    block: 'Block C & D (Expanding Urban Hub)',
    plots: '5 Marla & 7 Marla Plots',
    possession: 'On-Ground & Rapid Construction',
    highlights: 'High-velocity building activity. Wide 40ft streets, sector-level community parks, full sewerage, and high rental absorption from UET engineers.',
    statusColor: 'bg-emerald-500',
  },
  {
    block: 'Overseas Block',
    plots: '10 Marla & 1 Kanal Luxury Cuts',
    possession: 'Infrastructure Complete',
    highlights: 'Tailored for overseas Pakistanis in UK, US, Gulf & Canada. Enhanced CCTV surveillance, underground smart grid, and priority maintenance services.',
    statusColor: 'bg-blue-500',
  },
  {
    block: 'Smart Block / Brahma Extension',
    plots: '3.2 Marla & 5 Marla Budget Cuts',
    possession: 'Installments & Fast-Track Development',
    highlights: 'Ideal entry point for budget-minded home seekers. High appreciation upside as Brahma-Jhang Bahtar M-1 link road accelerates connectivity.',
    statusColor: 'bg-amber-500',
  },
  {
    block: 'Civic Commercial District',
    plots: '4 & 8 Marla Commercial Plazas',
    possession: 'Commercial Plots Available',
    highlights: 'Central corporate and retail corridor. Designed for supermarkets, brand outlets, diagnostic labs, and corporate advisory headquarters.',
    statusColor: 'bg-purple-500',
  },
];

const AMENITIES_LIST = [
  {
    title: '100% Underground Electrification',
    desc: 'No tangled overhead wires or unsightly poles. Safe, modern underground power grid with dedicated substation backup.',
    icon: '⚡',
  },
  {
    title: 'Sui Gas & Pure Water Network',
    desc: 'Fully commissioned Sui Northern gas pipelines and continuous deep-bore water filtration plants delivering clean drinking water.',
    icon: '💧',
  },
  {
    title: 'Trafalgar Square Replica',
    desc: 'Iconic architectural monument and landmark roundabout inspired by London, creating an prestigious visual identity in Wah.',
    icon: '🏛️',
  },
  {
    title: 'Mini Golf & Sports Pavilion',
    desc: 'State-of-the-art mini golf course, tennis courts, cricket practice cages, and floodlit recreational facilities for all ages.',
    icon: '⛳',
  },
  {
    title: 'Grand Jamia Mosque',
    desc: 'Centrally situated mosque featuring contemporary Islamic architecture, air-conditioned prayer halls, and ablution centers.',
    icon: '🕌',
  },
  {
    title: '24/7 Gated Security & AI CCTV',
    desc: 'Multi-tiered security checkpoint system with RFID vehicle tags, security perimeter patrols, and central surveillance command.',
    icon: '🛡️',
  },
  {
    title: 'Central Park & Botanical Trails',
    desc: 'Over 20 acres of interconnected parks, flowering gardens, children adventure play zones, and jogging tracks.',
    icon: '🌳',
  },
  {
    title: 'Top-Tier Educational Campuses',
    desc: 'Renowned academic campuses (Beaconhouse & Allied systems nearby) ensuring premier schooling minutes from your doorstep.',
    icon: '🎓',
  },
];

const CONNECTIVITY_ITEMS = [
  { destination: 'Main GT Road Wah Cantt Gate', time: '0 Mins', dist: 'Direct Society Entrance' },
  { destination: 'Wah Medical College & Complex', time: '2 Mins', dist: '1.2 km' },
  { destination: 'UET Taxila / Wah University', time: '5 Mins', dist: '3.5 km' },
  { destination: 'Taxila Museum & Ancient Ruins', time: '7 Mins', dist: '4.8 km' },
  { destination: 'M-1 Motorway Brahma Interchange', time: '10 Mins', dist: '7.0 km' },
  { destination: 'POF Hospital & Cantonment Market', time: '6 Mins', dist: '4.0 km' },
  { destination: 'New Islamabad International Airport', time: '25 Mins', dist: '28 km via M-1' },
  { destination: 'Islamabad Zero Point (Kashmir Hwy)', time: '35 Mins', dist: '34 km' },
];

const FAQS = [
  {
    q: 'Is Kohistan Enclave approved by RDA and Cantonment Board?',
    a: 'Yes. Kohistan Enclave is officially approved by the Rawalpindi Development Authority (RDA) and Wah Cantonment Board. It features completely legal layout approvals, verified registry records, and utility clearances with zero title litigation.',
  },
  {
    q: 'What is the developer background of Kohistan Builders & Developers (KBD)?',
    a: 'Kohistan Builders & Developers (KBD), spearheaded by CEO Malik Adeel, is one of the most reputable real-estate development conglomerates in Pakistan. Their landmark portfolio includes Zarkon Heights G-15 Islamabad, Kohistan Towers, The Greens, and premier partnerships across the twin cities.',
  },
  {
    q: 'How does plot transfer and registry deed work in Kohistan Enclave?',
    a: 'Transfers are executed directly through the Kohistan Enclave Head Office under transparent biometric transfer procedures. For fully paid plots, complete legal sub-registry with the local revenue department and Wah Cantt Board is smoothly completed with clean Fard and ownership documents.',
  },
  {
    q: 'Can Overseas Pakistanis buy or sell plots without visiting Pakistan?',
    a: 'Absolutely. Through Asad Land Holdings Overseas Advisory Desk, we handle end-to-end Power of Attorney (POA) legal attestation from Pakistani embassies, plot selection via live drone verification, official KBD transfer execution, and courier delivery of original files.',
  },
  {
    q: 'What are the current house construction costs in Kohistan Enclave?',
    a: 'As of 2026, standard premium construction (A-grade grey structure + luxury finishing) handled by our civil engineering desk ranges from PKR 4,800 to PKR 5,400 per square foot, backed by strict Kohistan Enclave architectural bylaws.',
  },
  {
    q: 'Why should I invest in Kohistan Enclave instead of outer speculative housing schemes?',
    a: 'Unlike unapproved paper files located 20 km away from basic infrastructure, Kohistan Enclave is on the main GT Road with living families, functional underground utilities, active universities nearby, and verified high rental yields of 7.8% – 9.2% annually.',
  },
];

export default function KohistanEnclavePage() {
  const [selectedPlot, setSelectedPlot] = useState<PlotTier>(PLOT_TIERS[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [plotCategory, setPlotCategory] = useState(PLOT_TIERS[0].name);
  const [preferredBlock, setPreferredBlock] = useState('Block B (Family Residential)');
  const [purpose, setPurpose] = useState('Immediate House Construction');
  const [paymentPref, setPaymentPref] = useState('Lump-Sum Cash (Possession)');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<{ leadId: string; name: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSelectPlot = (tier: PlotTier) => {
    setSelectedPlot(tier);
    setPlotCategory(tier.name);
    // Smooth scroll to inquiry form
    const formEl = document.getElementById('lead-capture-section');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg('Please enter your Name and WhatsApp / Mobile number.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/website/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          phone,
          whatsapp: phone,
          email: email || undefined,
          societyId: 'kohistan-enclave',
          size: plotCategory,
          block: preferredBlock,
          purpose,
          paymentPreference: paymentPref,
          requirement: `Kohistan Enclave Inquiry: ${plotCategory} in ${preferredBlock}`,
          notes: notes || `Direct inquiry from Kohistan Enclave portal. Target lead receiver: taimour.one@gmail.com`,
          leadSource: 'KOHISTAN_ENCLAVE_LANDING_PAGE',
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error submitting lead');
      }

      setSubmittedLead({ leadId: data.leadId || `KE-${Date.now()}`, name: fullName });
    } catch (err: any) {
      console.error('Lead submission failure:', err);
      setErrorMsg(err.message || 'Submission error. Please connect directly via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappDirectUrl = `https://wa.me/923218004186?text=${encodeURIComponent(
    `Hello Asad Land Holdings, I am inquiring about Kohistan Enclave Wah Cantt (${selectedPlot.name}). Please share the official rate sheet and available inventory.`
  )}`;

  return (
    <div className="bg-[#FEFEFE] text-[#000000] min-h-screen">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP BREADCRUMBS & NOTICE BAR                               */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <Breadcrumbs
          items={[
            { label: 'Housing Societies', href: '/societies' },
            { label: 'Wah Cantt' },
            { label: 'Kohistan Enclave' },
          ]}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. HERO SHOWCASE WITH OFFICIAL ASSETS & REAL-RATE BADGES      */}
      {/* ------------------------------------------------------------- */}
      <section className="relative bg-[#0A0D14] text-[#FEFEFE] border-b border-[#222222] overflow-hidden">
        {/* Subtle architectural background texture */}
        <div className="absolute inset-0 opacity-25 mix-blend-luminosity pointer-events-none">
          <img
            src="/images/kohistan-aerial-banner.jpg"
            alt="Kohistan Enclave Aerial Master Layout"
            className="w-full h-full object-cover object-center filter brightness-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/85 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Headline, Authority Badges & Overview */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#d09a40]/20 border border-[#d09a40]/50 rounded text-amber-400 font-mono text-[11px] uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>RDA & Cantt Board Approved • 100% Legal Title</span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight uppercase leading-[1.1] text-white">
                  KOHISTAN <span className="text-[#d09a40]">ENCLAVE</span>
                </h1>
                <p className="mt-3 text-lg sm:text-xl font-sans text-slate-300 font-medium">
                  Build Your Home, Live Your Dream.
                </p>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 font-sans max-w-xl leading-relaxed">
                  The premier gated residential township in Wah Cantt, situated directly on Main GT Road. Developed by <strong className="text-slate-200">Kohistan Builders & Developers (KBD)</strong> under CEO Malik Adeel. Verified plot possessions, 100% underground utilities, and real transacted pricing audited by Asad Land Holdings.
                </p>
              </div>

              {/* Fast Facts Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-y border-slate-800">
                <div className="p-3 bg-slate-900/60 rounded border border-slate-800/80">
                  <div className="text-[10px] font-mono uppercase text-slate-400">NOC Status</div>
                  <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">RDA Approved</div>
                </div>
                <div className="p-3 bg-slate-900/60 rounded border border-slate-800/80">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Location</div>
                  <div className="text-sm font-bold font-mono text-white mt-0.5">Main GT Road</div>
                </div>
                <div className="p-3 bg-slate-900/60 rounded border border-slate-800/80">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Utilities</div>
                  <div className="text-sm font-bold font-mono text-amber-400 mt-0.5">100% Underground</div>
                </div>
                <div className="p-3 bg-slate-900/60 rounded border border-slate-800/80">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Possession</div>
                  <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">Immediate On-Ground</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#lead-capture-section"
                  className="px-6 py-3.5 bg-[#d09a40] hover:bg-[#b8822e] text-[#000000] font-mono font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Official Rate Sheet</span>
                </a>

                <a
                  href="https://kohistanenclave.com/wp-content/uploads/2026/01/KE-New-Payment-Plan.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download Payment Plan (PDF)</span>
                </a>

                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 font-mono text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative p-2 bg-gradient-to-br from-[#d09a40]/40 to-slate-800/40 rounded-xl border border-slate-700/80 shadow-2xl backdrop-blur-sm">
                <div className="relative rounded-lg overflow-hidden aspect-[4/3] bg-slate-950">
                  <img
                    src="/images/kohistan-aerial-banner.jpg"
                    alt="Kohistan Enclave Master Community"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#000000]/80 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Live On-Ground Community</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-[#000000]/85 backdrop-blur-md p-3 rounded border border-slate-800 text-xs">
                    <div className="text-white font-bold font-mono uppercase">Grand GT Road Landmark Entrance</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">Underground electricity, wide dual carriageways & Trafalgar Square replica</div>
                  </div>
                </div>

                <div className="mt-3 p-3 bg-slate-950/80 rounded border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div className="text-slate-400">Official Portal:</div>
                  <a
                    href="https://kohistanenclave.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline inline-flex items-center gap-1 font-bold"
                  >
                    <span>kohistanenclave.com</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. PLOT PRICING MATRIX & INTERACTIVE SELECTOR                  */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 border-b border-[#E5E5E5] bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#666666] block mb-1">
                2026 Transactional Rate Sheet
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-mono uppercase text-[#000000] tracking-tight">
                Plot Cuts, Installments & Real Rates
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] max-w-2xl mt-1">
                Verified price benchmarks based on actual Registry deeds and KBD office transactions in Wah Cantt. Select a plot to review down payments and book with the advisory desk.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#666666]">Currency:</span>
              <span className="px-2.5 py-1 bg-[#000000] text-white text-xs font-mono font-bold">PKR (Pakistani Rupee)</span>
            </div>
          </div>

          {/* Plot Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLOT_TIERS.map((tier) => {
              const isSelected = selectedPlot.id === tier.id;
              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedPlot(tier)}
                  className={`p-6 bg-white border transition-all duration-200 cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#000000] ring-2 ring-[#000000] shadow-xl'
                      : 'border-[#E0E0E0] hover:border-[#999999] hover:shadow-md'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 right-4 px-2.5 py-0.5 bg-[#d09a40] text-[#000000] text-[10px] font-mono font-black uppercase tracking-wider rounded">
                      Most In-Demand
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-700 font-bold rounded">
                        {tier.category}
                      </span>
                      <span className="text-[11px] font-mono text-[#777777]">{tier.block}</span>
                    </div>

                    <h3 className="text-lg font-bold font-mono text-[#000000] mt-3">
                      {tier.name}
                    </h3>
                    <div className="text-xs font-mono text-[#666666] mt-0.5">
                      Dimensions: {tier.size}
                    </div>

                    <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded">
                      <div className="text-[10px] font-mono uppercase text-[#777777]">Market Rate Bracket</div>
                      <div className="text-lg font-black font-mono text-[#000000] mt-0.5">
                        {tier.priceRange}
                      </div>
                      <div className="text-[11px] font-mono text-emerald-700 font-bold mt-1">
                        Est. Down Payment: {tier.estimatedDownPayment}
                      </div>
                      <div className="text-[10px] font-mono text-[#666666] mt-0.5">
                        Installment: {tier.quarterlyInstallment}
                      </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs text-[#444444]">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPlot(tier);
                      }}
                      className="w-full py-2.5 px-4 bg-[#000000] hover:bg-[#d09a40] hover:text-[#000000] text-white text-xs font-mono uppercase font-bold tracking-wider transition-colors text-center"
                    >
                      Inquire About {tier.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Payment Plan Callout */}
          <div className="mt-10 p-6 bg-[#0B0F19] text-white rounded-lg border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Official KBD Payment Schedule (Latest 2026 Revision)</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold font-mono">
                Looking for 1-Year or 3-Year Flexible Installments?
              </h4>
              <p className="text-xs text-slate-400 max-w-2xl font-sans">
                Kohistan Enclave offers structured installment schedules for newly launched extensions alongside immediate-possession resale files. Download the official PDF plan directly from management.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://kohistanenclave.com/wp-content/uploads/2026/01/KE-New-Payment-Plan.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-[#d09a40] hover:bg-[#b8822e] text-[#000000] font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors rounded"
              >
                <Download className="w-4 h-4" />
                <span>Get PDF Plan</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. BLOCK-BY-BLOCK SECTOR BREAKDOWN                            */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 border-b border-[#E5E5E5] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#666666] block mb-1">
              Master Plan Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-mono uppercase text-[#000000] tracking-tight">
              Sector & Block Blueprint Guide
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] mt-2 leading-relaxed">
              Every sector within Kohistan Enclave has been engineered with specialized zoning laws, dedicated green spaces, wide arterial roads, and subterranean utilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTORS_OVERVIEW.map((sec, idx) => (
              <div key={idx} className="p-6 border border-[#E5E5E5] bg-[#FEFEFE] hover:border-[#000000] transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-[#000000] uppercase">
                      {sec.block}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#555555]">
                      <span className={`w-2 h-2 rounded-full ${sec.statusColor}`} />
                      <span>{sec.possession}</span>
                    </span>
                  </div>

                  <div className="mt-3 text-xs font-mono text-[#d09a40] font-bold">
                    Cuts: {sec.plots}
                  </div>

                  <p className="mt-3 text-xs text-[#555555] font-sans leading-relaxed">
                    {sec.highlights}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#888888]">Status: Verified</span>
                  <a
                    href="#lead-capture-section"
                    onClick={() => {
                      setPreferredBlock(sec.block);
                    }}
                    className="text-[#000000] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Check Inventory</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Master Plan Visual */}
          <div className="mt-12 p-6 sm:p-8 bg-[#0B0F19] text-white rounded-xl border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d09a40]">
                  Official Society Layout
                </span>
                <h3 className="text-xl sm:text-3xl font-black font-mono tracking-tight uppercase">
                  Explore The High-Resolution Master Plan
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Kohistan Enclave boasts 80ft main boulevards, 50ft sector avenues, and minimum 40ft internal residential streets. Zero dead-ends, continuous arterial loops, and immediate access to the GT Road highway barrier.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href="/kohistan-masterplan.jpg"
                    target="_blank"
                    className="px-5 py-2.5 bg-[#d09a40] text-black font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors"
                  >
                    <span>View Full Layout (HD)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://wa.me/923218004186?text=Please%20send%20the%20official%20high-res%20Kohistan%20Enclave%20master%20plan%20PDF%20and%20plot%20maps."
                    target="_blank"
                    className="px-5 py-2.5 bg-slate-800 text-white font-mono text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Get on WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-900 shadow-xl aspect-[16/9] relative">
                  <img
                    src="/kohistan-masterplan.jpg"
                    alt="Kohistan Enclave Official Master Plan"
                    className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. STRATEGIC CONNECTIVITY & LOCATION ADVANTAGE                */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 border-b border-[#E5E5E5] bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#666666] block">
                Geographic Advantage
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-mono uppercase text-[#000000] tracking-tight">
                Site Connectivity & Key Distances
              </h2>
              <p className="text-xs sm:text-sm text-[#444444] font-sans leading-relaxed">
                Kohistan Enclave occupies arguably the most prime highway position in the entire Wah-Taxila region. Situated right on the main Grand Trunk (GT) Road, residents enjoy effortless access to the M-1 Motorway via Brahma-Jhang Bahtar Interchange.
              </p>

              <div className="p-4 bg-white border border-[#E0E0E0] rounded space-y-2 text-xs">
                <div className="font-bold font-mono text-[#000000] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>Physical Address:</span>
                </div>
                <div className="text-[#555555] font-sans pl-6">
                  Main GT Road, opposite Wah Cantt barrier, adjacent to Taxila & Wah Model Town, Rawalpindi District, Punjab.
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Kohistan+Enclave+Wah+Cantt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#000000] text-white font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#d09a40] hover:text-black transition-colors"
                >
                  <Compass className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Distances Table */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-[#E0E0E0] rounded-lg overflow-hidden shadow-sm">
                <div className="p-4 bg-[#0A0D14] text-white font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-between">
                  <span>Destination / Landmark</span>
                  <span>Drive Time & Distance</span>
                </div>

                <div className="divide-y divide-[#EAEAEA]">
                  {CONNECTIVITY_ITEMS.map((item, idx) => (
                    <div key={idx} className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <Car className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold text-slate-800">{item.destination}</span>
                      </div>
                      <div className="text-right font-mono">
                        <span className="font-bold text-emerald-700">{item.time}</span>
                        <span className="text-[#777777] text-[11px] block">{item.dist}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. AMENITIES & LIFESTYLE INFRASTRUCTURE                       */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 border-b border-[#E5E5E5] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#666666] block mb-1">
              World-Class Living
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-mono uppercase text-[#000000] tracking-tight">
              Community Features & Amenities
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] mt-2">
              Everything required for a luxurious, secure, and self-sufficient lifestyle has been built on ground.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AMENITIES_LIST.map((amenity, idx) => (
              <div key={idx} className="p-6 bg-[#FBFBFA] border border-[#E5E5E5] hover:border-[#000000] transition-colors rounded">
                <div className="text-3xl mb-3">{amenity.icon}</div>
                <h3 className="text-sm font-bold font-mono text-[#000000] uppercase mb-2">
                  {amenity.title}
                </h3>
                <p className="text-xs text-[#555555] font-sans leading-relaxed">
                  {amenity.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. DEVELOPER PROFILE: KOHISTAN BUILDERS & DEVELOPERS (KBD)    */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 border-b border-[#E5E5E5] bg-[#0A0D14] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 block">
                Development Heritage
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-mono uppercase tracking-tight text-white">
                Kohistan Builders & Developers (KBD)
              </h2>
              <div className="text-sm font-sans text-slate-300 font-medium">
                Guided by the vision of Chief Executive Officer <strong className="text-amber-400">Mr. Malik Adeel</strong>.
              </div>

              <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                At KBD, real estate is treated not as a speculative paper gamble, but as a monument of trust, architectural excellence, and generational wealth. With iconic multi-story developments across the twin cities including Zarkon Heights, Kohistan Towers, and The Greens, KBD stands among the most reliable private developers in Pakistan.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <div className="text-2xl font-black font-mono text-amber-400">20+</div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-black font-mono text-emerald-400">100%</div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Delivery Track Record</div>
                </div>
                <div>
                  <div className="text-2xl font-black font-mono text-blue-400">4,200+</div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Plots Handed Over</div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://kbd.com.pk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-mono text-xs uppercase font-bold tracking-wider hover:bg-amber-400 transition-colors"
                >
                  <span>Visit KBD Corporate Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative border border-slate-700 rounded-lg overflow-hidden bg-slate-900 shadow-2xl">
                <img
                  src="/images/kbd-developers-heritage.jpg"
                  alt="Kohistan Builders & Developers Corporate Projects"
                  className="w-full h-auto object-cover"
                />
                <div className="p-4 bg-slate-950/95 border-t border-slate-800 text-xs">
                  <div className="font-mono text-white font-bold uppercase">Kohistan Builders & Developers Headquarters</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Grand Trunk Road, Wah Cantt • Official Project Portal</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 8. ALH PROPRIETARY REAL-RATE INVESTMENT AUDIT                 */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 border-b border-[#E5E5E5] bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="border border-[#000000] p-8 md:p-12 bg-white shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d09a40] block font-bold">
                  Asad Land Holdings Advisory Audit
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-mono uppercase text-[#000000] tracking-tight">
                  “Why Kohistan Enclave Outperforms Outer Files”
                </h3>
                
                <p className="text-xs sm:text-sm text-[#444444] leading-relaxed font-sans">
                  <em>“In our 14 years advising investors in Wah Cantt, Kohistan Enclave remains our highest-scoring recommendation for end-user living and safe capital preservation. Because the land is 100% acquired and possessed on-ground with active Sui Gas and electric connections, your capital isn’t stuck in paper promises. Furthermore, the constant influx of doctors from Wah Medical College and professors from UET creates an insatiable rental demand for modern houses.”</em>
                </p>

                <div className="pt-2 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-black bg-slate-200">
                    <img src="/images/founder-asad-headshot.jpg" alt="Asad Ali" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-xs font-bold font-mono uppercase text-[#000000]">Asad Ali</div>
                    <div className="text-[10px] font-mono text-[#666666] uppercase">Founder & Managing Director • Asad Land Holdings</div>
                  </div>
                </div>
              </div>

              {/* Scorecard */}
              <div className="lg:col-span-4 bg-[#0A0D14] text-white p-6 rounded border border-slate-800">
                <div className="text-[10px] font-mono uppercase text-amber-400 tracking-widest mb-4">
                  ALH Investment Scorecard (9.3 / 10)
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Title & NOC Security:</span>
                      <span className="text-emerald-400 font-bold">9.9 / 10</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded"><div className="bg-emerald-400 h-1.5 rounded" style={{ width: '99%' }} /></div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">GT Road Location:</span>
                      <span className="text-emerald-400 font-bold">9.8 / 10</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded"><div className="bg-emerald-400 h-1.5 rounded" style={{ width: '98%' }} /></div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Underground Utilities:</span>
                      <span className="text-emerald-400 font-bold">9.6 / 10</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded"><div className="bg-emerald-400 h-1.5 rounded" style={{ width: '96%' }} /></div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Rental Demand (Universities):</span>
                      <span className="text-amber-400 font-bold">9.4 / 10</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded"><div className="bg-amber-400 h-1.5 rounded" style={{ width: '94%' }} /></div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 text-[10px] text-slate-400 font-sans text-center">
                  Audited directly by Asad Land Holdings Wah Cantt desk.
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 9. HIGH-CONVERTING LEAD CAPTURE FORM (DESTINATION: TAIMOUR)   */}
      {/* ------------------------------------------------------------- */}
      <section id="lead-capture-section" className="py-20 bg-[#0B0F19] text-white border-b border-[#222222]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded text-amber-400 font-mono text-[11px] uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Priority Wah Cantt Advisory Desk</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-mono uppercase tracking-tight text-white">
              Reserve Plot or Request Rate Sheet
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 font-sans max-w-xl mx-auto">
              Submit your specific plot size or budget inquiry. Inquiries are routed immediately to executive management at <strong className="text-amber-400">taimour.one@gmail.com</strong> and assigned to our on-site Wah Cantt desk.
            </p>
          </div>

          <div className="bg-slate-900/95 border border-slate-700/80 rounded-xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
            
            {submittedLead ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <h3 className="text-2xl font-bold font-mono uppercase text-white">
                  Inquiry Dispatched Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-md mx-auto">
                  Thank you, <strong className="text-white">{submittedLead.name}</strong>. Your inquiry has been registered under reference <span className="font-mono text-amber-400">{submittedLead.leadId}</span> and forwarded to <strong className="text-white">taimour.one@gmail.com</strong>.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/923218004186?text=${encodeURIComponent(
                      `Hello, I just submitted an inquiry on Kohistan Enclave (Ref: ${submittedLead.leadId}). My name is ${submittedLead.name}. Please connect with me.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 rounded transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat Directly on WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedLead(null);
                      setFullName('');
                      setPhone('');
                      setEmail('');
                      setNotes('');
                    }}
                    className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs uppercase tracking-wider rounded transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitLead} className="space-y-6">
                
                {errorMsg && (
                  <div className="p-3 bg-red-950/80 border border-red-500/60 rounded text-red-200 text-xs font-mono">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-bold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asim Chaudhry"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 text-white text-xs font-sans rounded focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* WhatsApp / Phone */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-bold">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +92 300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 text-white text-xs font-sans rounded focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="for PDF rate sheet delivery"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 text-white text-xs font-sans rounded focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Interested Category */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-bold">
                      Plot Category & Size *
                    </label>
                    <select
                      value={plotCategory}
                      onChange={(e) => setPlotCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 text-white text-xs font-sans rounded focus:outline-none focus:border-amber-400"
                    >
                      {PLOT_TIERS.map((tier) => (
                        <option key={tier.id} value={tier.name}>
                          {tier.name} — {tier.priceRange}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Block Preference */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      Preferred Block
                    </label>
                    <select
                      value={preferredBlock}
                      onChange={(e) => setPreferredBlock(e.target.value)}
                      className="w-full px-3 py-3 bg-slate-950 border border-slate-700 text-white text-xs font-sans rounded focus:outline-none focus:border-amber-400"
                    >
                      <option value="Block A (Executive VVIP)">Block A (Executive VVIP)</option>
                      <option value="Block B (Family Residential)">Block B (Family Residential)</option>
                      <option value="Block C & D (Rapid Construction)">Block C & D (Rapid Construction)</option>
                      <option value="Overseas Block">Overseas Block</option>
                      <option value="Smart Block / Brahma Extension">Smart Block / Brahma Extension</option>
                      <option value="Civic Center Commercial">Civic Center Commercial</option>
                    </select>
                  </div>

                  {/* Buying Purpose */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      Purchase Intent
                    </label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full px-3 py-3 bg-slate-950 border border-slate-700 text-white text-xs font-sans rounded focus:outline-none focus:border-amber-400"
                    >
                      <option value="Immediate House Construction">Immediate House Construction</option>
                      <option value="Medium-Term Capital Appreciation">Medium-Term Capital Appreciation</option>
                      <option value="Rental Income Property">Rental Income Property</option>
                      <option value="Overseas Retirement Home">Overseas Retirement Home</option>
                      <option value="Commercial Business Setup">Commercial Business Setup</option>
                    </select>
                  </div>

                  {/* Payment Preference */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      Payment Mode
                    </label>
                    <select
                      value={paymentPref}
                      onChange={(e) => setPaymentPref(e.target.value)}
                      className="w-full px-3 py-3 bg-slate-950 border border-slate-700 text-white text-xs font-sans rounded focus:outline-none focus:border-amber-400"
                    >
                      <option value="Lump-Sum Cash (Possession)">Lump-Sum Cash (Instant Possession)</option>
                      <option value="1-Year Installment Plan">1-Year Installment Plan</option>
                      <option value="3-Year Installment Plan">3-Year Installment Plan</option>
                      <option value="Open to Advisory">Open to Advisory</option>
                    </select>
                  </div>
                </div>

                {/* Specific Notes */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Specific Requirement or Plot Preferences
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Seeking park-facing or corner 10 Marla plot in Block B, ready for registry deed transfer."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 text-white text-xs font-sans rounded focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-[#d09a40] hover:bg-[#b8822e] text-[#000000] font-mono font-black text-sm uppercase tracking-wider rounded transition-all duration-200 flex items-center justify-center gap-2 shadow-xl"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting to Advisory Desk...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Kohistan Enclave Inquiry</span>
                      </>
                    )}
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Zero spam. Direct dispatch to <strong className="text-slate-300">taimour.one@gmail.com</strong>.</span>
                  </div>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 10. FAQS ACCORDION (SEO OPTIMIZED)                            */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 border-b border-[#E5E5E5] bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#666666] block mb-1">
              Investor Clarity
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-mono uppercase text-[#000000] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] mt-1">
              Transparent answers regarding NOC legal status, transfer processes, and construction bylaws.
            </p>
          </div>

          <div className="divide-y divide-[#E5E5E5] border-y border-[#E5E5E5]">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-mono font-bold text-sm text-[#000000] hover:text-[#d09a40] transition-colors gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#888888] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#d09a40]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-xs sm:text-sm text-[#444444] font-sans leading-relaxed pl-2 border-l-2 border-[#d09a40]">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 11. BOTTOM CTA BAR                                            */}
      {/* ------------------------------------------------------------- */}
      <section className="py-12 bg-[#0A0D14] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#d09a40]">
                Asad Land Holdings • Wah Cantt Principal Desk
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                Schedule an On-Site Plot Inspection Today
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Our civil engineers and plot verification team are available on-ground 7 days a week.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="tel:+923218004186"
                className="px-5 py-3 border border-slate-700 text-white font-mono text-xs uppercase font-bold tracking-wider hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Hotline</span>
              </a>
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#d09a40] text-black font-mono text-xs uppercase font-black tracking-wider hover:bg-amber-400 transition-colors inline-flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
