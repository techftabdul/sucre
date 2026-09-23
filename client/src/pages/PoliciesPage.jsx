import React from 'react';
import { ShieldCheck, FileText, Calendar, AlertTriangle, RefreshCcw, CreditCard, Lock } from 'lucide-react';

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-cathedral-bg text-cathedral-ivory py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      
      {/* Title Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs uppercase tracking-widest font-semibold">
          <ShieldCheck className="w-4 h-4 text-gold-400" />
          Official Terms & Booking Governance
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-cathedral-ivory">
          SUCRE Venue & Financial Policies
        </h1>
        <p className="text-xs md:text-sm text-cathedral-muted leading-relaxed">
          Operating under CAC RC 9749267. Clear, transparent governance ensuring seamless event operations in Ibadan.
        </p>
      </div>

      {/* Policy Cards Grid */}
      <div className="space-y-8">
        
        {/* Policy 1: 50% Deposit Rule */}
        <div className="bg-cathedral-card border border-gold-400/40 rounded-3xl p-8 space-y-4 shadow-gold-glow relative overflow-hidden">
          <div className="flex items-center gap-3 text-gold-400 font-serif font-bold text-xl">
            <CreditCard className="w-6 h-6 shrink-0" />
            1. The 50% Mandatory Deposit Date Lock Rule
          </div>
          <p className="text-xs md:text-sm text-cathedral-muted leading-relaxed">
            To prevent date hoarding and guarantee venue availability, requested event dates are strictly unreserved until a <strong className="text-gold-300">50% initial deposit</strong> is verified via our Paystack gateway. Dates remain on open display to competing hosts until deposit payment verification is logged in our database.
          </p>
        </div>

        {/* Policy 2: 14-Day Balance Settlement */}
        <div className="bg-cathedral-card border border-cathedral-border rounded-3xl p-8 space-y-4">
          <div className="flex items-center gap-3 text-gold-300 font-serif font-bold text-xl">
            <Calendar className="w-6 h-6 text-gold-400 shrink-0" />
            2. Balance Payment Terms (14 Days Prior)
          </div>
          <p className="text-xs md:text-sm text-cathedral-muted leading-relaxed">
            The remaining 50% balance, alongside any late add-on selections (e.g., extra security officers or specialized lighting), must be fully settled at least <strong className="text-gold-300">14 calendar days prior to your scheduled event date</strong>. Failure to complete final settlement will result in date hold suspension.
          </p>
        </div>

        {/* Policy 3: Tiered Cancellation Policy */}
        <div className="bg-cathedral-card border border-cathedral-border rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-3 text-gold-300 font-serif font-bold text-xl">
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
            3. Tiered Cancellation Fee Structure
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-cathedral-bg p-5 rounded-2xl border border-cathedral-border space-y-2">
              <div className="font-bold text-emerald-400 text-sm">60+ Days Prior</div>
              <div className="text-cathedral-muted">80% Refund of deposit</div>
              <p className="text-[11px] text-cathedral-muted/70">A 20% administrative processing fee is retained.</p>
            </div>
            <div className="bg-cathedral-bg p-5 rounded-2xl border border-cathedral-border space-y-2">
              <div className="font-bold text-amber-400 text-sm">30 - 60 Days Prior</div>
              <div className="text-cathedral-muted">50% Refund of deposit</div>
              <p className="text-[11px] text-cathedral-muted/70">50% of the initial deposit is forfeited.</p>
            </div>
            <div className="bg-cathedral-bg p-5 rounded-2xl border border-rose-500/30 space-y-2">
              <div className="font-bold text-rose-400 text-sm">Under 30 Days Prior</div>
              <div className="text-cathedral-muted">Non-Refundable</div>
              <p className="text-[11px] text-cathedral-muted/70">Full deposit retained to cover venue downtime.</p>
            </div>
          </div>
        </div>

        {/* Policy 4: Single Rescheduling Rule */}
        <div className="bg-cathedral-card border border-cathedral-border rounded-3xl p-8 space-y-4">
          <div className="flex items-center gap-3 text-gold-300 font-serif font-bold text-xl">
            <RefreshCcw className="w-6 h-6 text-gold-400 shrink-0" />
            4. Single Free Date-Rescheduling Policy
          </div>
          <p className="text-xs md:text-sm text-cathedral-muted leading-relaxed">
            Every client is entitled to <strong className="text-gold-300">one (1) complimentary date reschedule</strong> without financial penalty, provided formal notice is submitted at least 21 days before the original event date. New dates are subject to hall calendar availability within a 6-month window.
          </p>
        </div>

      </div>

    </div>
  );
}
