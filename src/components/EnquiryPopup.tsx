import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Image } from '@/components/ui/image';
import { buildTrackingPayload } from '@/lib/utm-tracker';
import { fireLeadConversions } from '@/lib/gtag';

import { sendLeadToWebhook } from '@/lib/webhook';

interface EnquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryPopup({ isOpen, onClose }: EnquiryPopupProps) {
  const [form, setForm] = useState({ fullName: '', phoneNumber: '', emailAddress: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* lock body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const tracking = buildTrackingPayload();
      
      const payload = {
        _id: crypto.randomUUID(),
        fullName: form.fullName,
        phoneNumber: form.phoneNumber,
        emailAddress: form.emailAddress,
        message: 'Popup enquiry',
        dateSubmitted: new Date().toISOString(),
        ...tracking,
      };

      // Send lead payload to Make.com webhook
      await sendLeadToWebhook(payload);

      await BaseCrudService.create('inquiries', payload);
      setSubmitted(true);

      // Fire Google Ads conversion events (only after API success)
      fireLeadConversions();

      setTimeout(() => { onClose(); setSubmitted(false); setForm({ fullName: '', phoneNumber: '', emailAddress: '' }); }, 3000);
    } catch (error) {
      console.error('❌ Failed to submit inquiry:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100]"
        style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed z-[101] top-1/2 left-1/2"
        style={{ transform: 'translate(-50%, -50%)', width: 'min(92vw, 380px)' }}
      >
        <div className="relative overflow-hidden" style={{ background: '#ffffff' }}>

          {/* Teal top accent bar */}
          <div className="h-1 w-full" style={{ background: '#003539' }} />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
              text-foreground/40 hover:text-primary transition-colors duration-200 z-10"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="px-6 pt-6 pb-8">

            {/* Header */}
            <div className="mb-5">
              <Image src="https://static.wixstatic.com/media/cef78c_dab6f418d455446ebbb520dc3f38e1fa~mv2.png" alt="Beyond Acres" style={{ height: '36px', width: 'auto', marginBottom: '12px' }} />
              <h2 className="font-heading font-bold text-primary leading-tight"
                style={{ fontSize: '1.4rem' }}>
                Download Brochure
              </h2>
              <p className="font-paragraph font-light text-foreground/60 mt-1.5"
                style={{ fontSize: '12px' }}>
                Get complete project details sent to you instantly.
              </p>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                  style={{ background: 'rgba(0,53,57,0.1)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#003539" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="font-paragraph font-semibold text-primary" style={{ fontSize: '15px' }}>
                  Thank you!
                </p>
                <p className="font-paragraph font-light text-foreground/60" style={{ fontSize: '13px' }}>
                  Our team will reach out to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Full Name */}
                <div>
                  <label className="block font-paragraph font-medium text-foreground/50
                    tracking-[0.15em] uppercase mb-1.5" style={{ fontSize: '10px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={e => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Your full name"
                    className="w-full font-paragraph font-light text-foreground bg-transparent
                      border-b border-foreground/20 focus:border-primary outline-none
                      transition-colors duration-300 py-2.5"
                    style={{ fontSize: '14px' }}
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="block font-paragraph font-medium text-foreground/50
                    tracking-[0.15em] uppercase mb-1.5" style={{ fontSize: '10px' }}>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phoneNumber}
                    onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
                    placeholder="+91 00000 00000"
                    className="w-full font-paragraph font-light text-foreground bg-transparent
                      border-b border-foreground/20 focus:border-primary outline-none
                      transition-colors duration-300 py-2.5"
                    style={{ fontSize: '14px' }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-paragraph font-medium text-foreground/50
                    tracking-[0.15em] uppercase mb-1.5" style={{ fontSize: '10px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.emailAddress}
                    onChange={e => setForm({ ...form, emailAddress: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full font-paragraph font-light text-foreground bg-transparent
                      border-b border-foreground/20 focus:border-primary outline-none
                      transition-colors duration-300 py-2.5"
                    style={{ fontSize: '14px' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full font-paragraph font-semibold uppercase tracking-[0.16em]
                    text-white transition-all duration-300 hover:opacity-90 active:scale-[0.98]
                    disabled:opacity-60 mt-2"
                  style={{ fontSize: '12px', padding: '14px', background: '#003539' }}
                >
                  {submitting ? 'Sending...' : 'Get Brochure'}
                </button>

                <p className="font-paragraph font-light text-foreground/35 text-center"
                  style={{ fontSize: '11px' }}>
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
