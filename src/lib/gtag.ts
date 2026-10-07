/**
 * Google Ads conversion tracking utility
 * Fires after a lead form is successfully submitted (API returns success)
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GOOGLE_ADS_ID = 'AW-18105572030';

/**
 * Fire all lead form conversion events.
 * Call this ONLY after the server/API confirms the submission was saved.
 */
export function fireLeadConversions(): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  // Conversion 1 — Submit lead form (Wolf)
  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/PWr8CLOAjqUcEL61tLlD`,
  });

  // Conversion 2 — Submit lead form (Wolf — secondary tag)
  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/amoQCNfLrtUcEL61tLlD`,
  });
}
