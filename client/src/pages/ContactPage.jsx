import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck, Instagram, Facebook, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', eventDate: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-cathedral-bg text-cathedral-ivory py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Title */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs uppercase tracking-widest font-semibold">
          <MapPin className="w-4 h-4 text-gold-400" />
          Ibadan Location & Direct Lines
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-cathedral-ivory">
          Connect with Our Venue Contact Team
        </h1>
        <p className="text-sm text-cathedral-muted leading-relaxed">
          Have questions about hall capacities, custom decor packages, or date availability? Reach out directly via phone, WhatsApp, or formal inquiry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Info (5 Cols) */}
        <div className="lg:col-span-5 space-y-8 bg-cathedral-card border border-cathedral-border rounded-3xl p-8 shadow-2xl">
          <div>
            <h3 className="font-serif font-bold text-2xl text-cathedral-ivory">Official Communications</h3>
            <p className="text-xs text-cathedral-muted mt-1">SUCRE Events Centre ("The Cathedral")</p>
          </div>

          <div className="space-y-6 text-xs text-cathedral-muted">
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-cathedral-ivory text-sm">Official Hotline</div>
                <a href="tel:09058804253" className="text-gold-300 font-mono text-base font-bold hover:underline">
                  09058804253
                </a>
                <p className="text-[11px] text-cathedral-muted mt-0.5">Available 8:00 AM - 8:00 PM (Mon - Sun)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-cathedral-ivory text-sm">WhatsApp Instant Desk</div>
                <a 
                  href="https://wa.me/2349058804253?text=Hello%20SUCRE%20Events%20Centre,%20I%20want%20to%20inquire%20about%20a%20hall%20reservation."
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 font-semibold hover:underline block mt-0.5"
                >
                  Click to Chat Directly (09058804253)
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-cathedral-ivory text-sm">Venue Address</div>
                <p className="text-cathedral-muted mt-0.5 leading-relaxed">
                  SUCRE Events Centre ("The Cathedral"), Ilero, Ayegun Oleyo Road, Off Akala Expressway, passing through Christ High School Ashipa. Ibadan, Oyo State.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-cathedral-ivory text-sm">CAC Corporate Identity</div>
                <p className="text-gold-400 font-semibold mt-0.5">RC 9749267</p>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-cathedral-border flex items-center gap-4">
            <span className="text-xs text-cathedral-muted font-medium">Follow Us:</span>
            <a href="https://instagram.com/sucreeventcenter" target="_blank" rel="noreferrer" className="text-gold-400 hover:text-gold-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://facebook.com/sucreeventcenter" target="_blank" rel="noreferrer" className="text-gold-400 hover:text-gold-300">
              <Facebook className="w-5 h-5" />
            </a>
            <span className="text-xs font-mono text-cathedral-muted">@sucreeventcenter</span>
          </div>
        </div>

        {/* Form (7 Cols) */}
        <div className="lg:col-span-7 bg-cathedral-card border border-cathedral-border rounded-3xl p-8 shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-gold-400 mx-auto" />
              <h3 className="font-serif font-bold text-2xl text-cathedral-ivory">Inquiry Transmitted Successfully</h3>
              <p className="text-xs text-cathedral-muted max-w-md mx-auto">
                Thank you for contacting SUCRE Events Centre. Our venue coordinator will reach out to you shortly via call or email.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-gold-gradient text-cathedral-bg text-xs font-bold uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-2xl text-cathedral-ivory">Send an Inquiry</h3>
                <p className="text-xs text-cathedral-muted mt-1">Fill out your details below and our team will get back to you within 2 hours.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-cathedral-ivory">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Chief Adebayo Adeleke"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-cathedral-elevated border border-cathedral-border text-cathedral-ivory focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-cathedral-ivory">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="08031234567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-cathedral-elevated border border-cathedral-border text-cathedral-ivory focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-cathedral-ivory">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="adebayo@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-cathedral-elevated border border-cathedral-border text-cathedral-ivory focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-cathedral-ivory">Proposed Event Date</label>
                  <input
                    type="date"
                    value={form.eventDate}
                    onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-cathedral-elevated border border-cathedral-border text-gold-300 font-mono focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="font-semibold text-cathedral-ivory">Message / Special Requests *</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Tell us about your estimated guest count, hall preference, or decor requirements..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-cathedral-elevated border border-cathedral-border text-cathedral-ivory focus:border-gold-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gold-gradient text-cathedral-bg font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Contact Inquiry
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Google Maps Embed Integration */}
      <div className="bg-cathedral-card border border-gold-500/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-cathedral-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-gold-400 font-bold">Interactive Navigation</div>
            <h3 className="text-2xl font-serif font-bold text-cathedral-ivory">SUCRE Google Maps Location</h3>
            <p className="text-xs text-cathedral-muted mt-1">
              Ilero, Ayegun Oleyo Road, Off Akala Expressway, passing through Christ High School Ashipa. Ibadan, Oyo State
            </p>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Ilero+Ayegun+Oleyo+Road+Off+Akala+Expressway+Ibadan"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 rounded-full bg-gold-gradient text-cathedral-bg font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shrink-0"
          >
            Open in Google Maps App
          </a>
        </div>

        <div className="w-full h-96 rounded-2xl overflow-hidden border border-cathedral-border relative">
          <iframe
            title="SUCRE Events Centre Location Map"
            src="https://maps.google.com/maps?q=Ayegun%20Oleyo%20Road%20Off%20Akala%20Expressway%20Ibadan%20Oyo%20State&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-90 hover:grayscale-0 transition-all duration-500"
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>

    </div>
  );
}
