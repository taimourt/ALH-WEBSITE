'use client';

import React from 'react';
import { SectionHeading } from '@/components/website/SectionHeading';
import { Breadcrumbs } from '@/components/website/Breadcrumbs';
import { SignatureAccent } from '@/components/website/SignatureAccent';
import { AgentCard } from '@/components/website/AgentCard';
import { StatBlock } from '@/components/website/StatBlock';
import { CTASection } from '@/components/website/CTASection';
import { ArchitecturalLine } from '@/components/website/ArchitecturalLine';
import { AGENTS_DATA } from '@/lib/website-data';
import { ShieldCheck, Award, TrendingUp, Compass, HardHat } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'About Asad Land Holdings' }]} />

      <SectionHeading
        eyebrow="Architectural Integrity"
        title="About Asad Land Holdings"
        subtitle="Wah Cantt and Islamabad&apos;s premier real-estate investment, sales, and turnkey villa construction firm."
      />

      {/* Hero Narrative Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        <div className="lg:col-span-7">
          <h2 className="text-2xl font-bold uppercase text-[#000000] font-mono mb-4">
            Founded on Empirical Valuation
          </h2>
          <p className="text-sm text-[#444444] leading-relaxed font-sans mb-4">
            Asad Land Holdings was established to eliminate speculative inflation and opaque file trading from the real-estate sector in Wah Cantt, Taxila, and Islamabad. By focusing strictly on verified registry transfers, physical plot boundaries, and civil engineering standards, we ensure our clients acquire high-yielding land at real market rates.
          </p>
          <p className="text-sm text-[#444444] leading-relaxed font-sans mb-8">
            Our dual expertise in land acquisition and turnkey architectural construction allows us to guide investors seamlessly from raw land purchase to complete smart villa handover with 100% financial clarity.
          </p>

          <SignatureAccent name="Asad Ali" title="Founder & Managing Director" />
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <StatBlock value="14+" label="Years Experience" sublabel="In Wah Cantt & Taxila land records." />
          <StatBlock value="100%" label="Title Clearance" sublabel="CDA, RDA, and Cantt Board verified." />
          <StatBlock value="500+" label="Properties Managed" sublabel="Across residential & commercial sectors." />
          <StatBlock value="0 PKR" label="Hidden Markups" sublabel="Transparent buyer-seller commission model." />
        </div>
      </div>

      {/* Executive Leadership Showcase */}
      <section className="my-16 border border-[#000000] bg-[#FAFAFA] p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="border border-[#000000] bg-[#FFFFFF] p-2 shadow-md">
              <img
                src="/images/founder-asad-ali.jpg"
                alt="Asad Ali in Executive Boardroom"
                className="w-full aspect-[3/4] object-cover object-top"
              />
              <span className="block mt-2 text-[10px] font-mono uppercase tracking-wider text-[#666666] text-center font-bold">
                Executive Strategy Desk
              </span>
            </div>
            <div className="border border-[#000000] bg-[#FFFFFF] p-2 shadow-md">
              <img
                src="/images/founder-asad-villa.jpg"
                alt="Asad Ali On-Site Project Inspection"
                className="w-full aspect-[3/4] object-cover object-top"
              />
              <span className="block mt-2 text-[10px] font-mono uppercase tracking-wider text-[#666666] text-center font-bold">
                On-Ground Project Delivery
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#666666] block mb-2 font-bold">
              Founder & Managing Director
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#000000] mb-4 font-mono">
              Asad Ali
            </h3>
            <p className="text-xs sm:text-sm text-[#444444] leading-relaxed font-sans mb-6">
              With over 14 years of direct transaction experience across Wah Cantt, Taxila, and Islamabad Zone 2, Asad Ali has pioneered empirical land valuation in the region. Leading an in-house team of structural engineers, architects, and legal title conveyancers, he personally oversees major acquisitions and high-margin construction portfolios.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs mb-8">
              <div className="flex items-center gap-2 p-3 bg-white border border-[#E5E5E5]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold text-[11px]">100% Registry Verified</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white border border-[#E5E5E5]">
                <HardHat className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-bold text-[11px]">Civil Engineering Standards</span>
              </div>
            </div>

            <SignatureAccent name="Asad Ali" title="Founder & Managing Director" />
          </div>
        </div>
      </section>

      <ArchitecturalLine className="my-12" size="md" withLabel="Advisory & Regional Specialists" />

      {/* Leadership Team */}
      <div className="space-y-8 mb-16">
        {AGENTS_DATA.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      <CTASection />
    </div>
  );
}
