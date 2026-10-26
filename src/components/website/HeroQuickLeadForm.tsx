'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, ShieldCheck, Lock, ArrowRight } from 'lucide-react';

export function HeroQuickLeadForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [society, setSociety] = useState('Kohistan Enclave');
  const [size, setSize] = useState('5 Marla');
  const [submitting, setSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<{ leadId: string; name: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('Please enter your name and phone number.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/website/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          whatsapp: phone.trim(),
          societyId: society.toLowerCase().replace(/\s+/g, '-'),
          size,
          requirement: `Main Hero Inquiry: ${size} in ${society}`,
          leadSource: 'HOMEPAGE_HERO_QUICK_FORM',
          notes: 'Captured via Homepage Hero Fast Lead Form. Target delivery: taimour.one@gmail.com',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Submission failed');
      }

      setSubmittedLead({ leadId: data.leadId || `LEAD-${Date.now()}`, name: name.trim() });
    } catch (err: any) {
      console.error('Lead submission failed:', err);
      setErrorMessage(err.message || 'Unable to submit right now. Please message us on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border border-[#000000] p-6 sm:p-7 bg-[#FEFEFE] shadow-2xl relative">
      {/* Top Architectural Header */}
      <div className="flex items-center justify-between border-b border-[#000000] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#000000] font-black">
            EXECUTIVE ADVISORY INQUIRY
          </span>
        </div>
        <span className="text-[9px] font-mono text-[#666666] tracking-wider uppercase">
          1-HR RESPONSE
        </span>
      </div>

      {submittedLead ? (
        <div className="py-6 text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-50 border border-emerald-600 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
            ✓
          </div>
          <h4 className="text-base font-bold font-mono uppercase text-[#000000]">
            Inquiry Received
          </h4>
          <p className="text-xs text-[#555555] font-sans max-w-xs mx-auto leading-relaxed">
            Thank you, <strong className="text-black">{submittedLead.name}</strong>. Your request (<span className="font-mono text-[#d09a40]">{submittedLead.leadId}</span>) has been routed to our Wah Cantt advisory desk and dispatched to <strong className="text-black">taimour.one@gmail.com</strong>.
          </p>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={`https://wa.me/923218004186?text=${encodeURIComponent(
                `Hello Asad Land Holdings, I just submitted an inquiry on your website (Ref: ${submittedLead.leadId}). My name is ${submittedLead.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 bg-[#16a34a] hover:bg-emerald-700 text-white font-mono text-xs uppercase font-bold tracking-wider inline-flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Connect on WhatsApp Now</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setSubmittedLead(null);
                setName('');
                setPhone('');
              }}
              className="text-[11px] font-mono text-[#666666] hover:text-black underline pt-1"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <p className="text-xs text-[#555555] font-sans leading-relaxed">
            Receive verified on-ground plot rates, transfer fee breakdowns, and off-market inventory directly from our principal desk.
          </p>

          {errorMessage && (
            <div className="p-2.5 bg-red-50 border border-red-300 text-red-700 text-[11px] font-mono rounded">
              {errorMessage}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#333333] mb-1 font-bold">
              Your Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Asim Chaudhry"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-[#F7F7F7] border border-[#CCCCCC] text-[#000000] text-xs font-sans rounded-none focus:outline-none focus:border-[#000000] transition-colors"
            />
          </div>

          {/* WhatsApp / Phone */}
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#333333] mb-1 font-bold">
              WhatsApp / Phone *
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. +92 300 1234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 bg-[#F7F7F7] border border-[#CCCCCC] text-[#000000] text-xs font-sans rounded-none focus:outline-none focus:border-[#000000] transition-colors"
            />
          </div>

          {/* Target Society & Plot Size (2-columns) */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#333333] mb-1 font-bold">
                Target Society
              </label>
              <select
                value={society}
                onChange={(e) => setSociety(e.target.value)}
                className="w-full px-2 py-2 bg-[#F7F7F7] border border-[#CCCCCC] text-[#000000] text-[11px] font-sans rounded-none focus:outline-none focus:border-[#000000]"
              >
                <option value="Kohistan Enclave">⭐ Kohistan Enclave</option>
                <option value="New City Phase 2">New City Phase 2</option>
                <option value="Multi Gardens B-17">Multi Gardens B-17</option>
                <option value="Faisal Hills Taxila">Faisal Hills Taxila</option>
                <option value="TopCity-1 Islamabad">TopCity-1 Islamabad</option>
                <option value="General Wah Cantt">Wah Cantt (General)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#333333] mb-1 font-bold">
                Plot Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-2 py-2 bg-[#F7F7F7] border border-[#CCCCCC] text-[#000000] text-[11px] font-sans rounded-none focus:outline-none focus:border-[#000000]"
              >
                <option value="5 Marla">5 Marla (25×50)</option>
                <option value="7 Marla">7 Marla (30×60)</option>
                <option value="10 Marla">10 Marla (35×70)</option>
                <option value="1 Kanal">1 Kanal (50×90)</option>
                <option value="Commercial Plaza">Commercial Plaza</option>
                <option value="Constructed House">Constructed House</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-[#000000] hover:bg-[#d09a40] hover:text-[#000000] text-[#FEFEFE] text-xs font-mono uppercase font-black tracking-widest transition-all duration-200 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>REQUEST REAL RATE REPORT</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-[9px] font-mono text-[#777777] pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>100% Title Verified</span>
            </span>
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#999999]" />
              <span>Confidential & Spam-Free</span>
            </span>
          </div>
        </form>
      )}

      {/* Badge Accent */}
      <div className="absolute -bottom-3 -right-3 bg-[#000000] text-[#FEFEFE] px-3 py-1 text-[9px] font-mono uppercase tracking-widest font-bold border border-[#000000]">
        DIRECT DESK
      </div>
    </div>
  );
}
