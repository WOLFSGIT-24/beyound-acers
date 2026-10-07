export const MAKE_WEBHOOK_URL = 'https://hook.us1.make.com/tj4twkidsre5c17695lf2d8bn1j1afds';

/**
 * Formats lead payload to include all common field key variations
 * (camelCase, snake_case, Pascal Case with spaces) so that Make.com / Google Sheets
 * scenarios receive the correct mapping regardless of key configuration.
 */
export function formatWebhookPayload(data: Record<string, any>): Record<string, any> {
  const now = data.dateSubmitted ? new Date(data.dateSubmitted).toISOString() : new Date().toISOString();
  const dateFormatted = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const name = String(data.fullName || data.name || data.full_name || '').trim();
  const email = String(data.emailAddress || data.email || data.email_address || '').trim();
  const phone = String(data.phoneNumber || data.phone || data.phone_number || data.mobile || '').trim();
  const msg = String(data.message || data.comments || data.notes || '').trim();

  const utmSource = String(data.utmSource || data.utm_source || '').trim();
  const utmMedium = String(data.utmMedium || data.utm_medium || '').trim();
  const utmCampaign = String(data.utmCampaign || data.utm_campaign || '').trim();
  const utmTerm = String(data.utmTerm || data.utm_term || '').trim();
  const utmContent = String(data.utmContent || data.utm_content || '').trim();
  const gclid = String(data.gclid || '').trim();
  const trackCode = String(data.trackCode || data.track_code || '').trim();
  const campaignLabel = String(data.campaignLabel || data.campaign_label || '').trim();

  return {
    // Standard ID & Dates
    _id: data._id || crypto.randomUUID(),
    id: data._id || crypto.randomUUID(),
    dateSubmitted: now,
    date_submitted: now,
    date: dateFormatted,
    timestamp: now,
    submittedAt: now,
    "Date Submitted": dateFormatted,

    // Name variations
    fullName: name,
    full_name: name,
    name: name,
    "Full Name": name,
    "Name": name,

    // Email variations
    emailAddress: email,
    email_address: email,
    email: email,
    "Email Address": email,
    "Email": email,

    // Phone variations
    phoneNumber: phone,
    phone_number: phone,
    phone: phone,
    mobile: phone,
    mobile_number: phone,
    "Phone Number": phone,
    "Phone": phone,
    "Mobile": phone,

    // Message variations
    message: msg,
    notes: msg,
    comments: msg,
    "Message": msg,

    // Page metadata
    source: 'Website Form',
    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    "Page URL": typeof window !== 'undefined' ? window.location.href : '',

    // UTM & Tracking variations
    utmSource,
    utm_source: utmSource,
    "UTM Source": utmSource,

    utmMedium,
    utm_medium: utmMedium,
    "UTM Medium": utmMedium,

    utmCampaign,
    utm_campaign: utmCampaign,
    "UTM Campaign": utmCampaign,

    utmTerm,
    utm_term: utmTerm,
    "UTM Term": utmTerm,

    utmContent,
    utm_content: utmContent,
    "UTM Content": utmContent,

    gclid,
    GCLID: gclid,
    trackCode,
    track_code: trackCode,
    campaignLabel,
    campaign_label: campaignLabel,
  };
}

export async function sendLeadToWebhook(payload: Record<string, any>): Promise<boolean> {
  const formattedPayload = formatWebhookPayload(payload);
  const jsonBody = JSON.stringify(formattedPayload);

  console.log('🚀 Sending lead to Make.com webhook:', formattedPayload);

  try {
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
      },
      body: jsonBody,
    });

    if (response.ok) {
      console.log('✅ Webhook successfully accepted lead!');
      return true;
    } else {
      console.warn('⚠️ Webhook returned status:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('❌ Direct fetch failed, attempting beacon/no-cors fallback:', error);
  }

  // Fallback 1: navigator.sendBeacon
  try {
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([jsonBody], { type: 'application/json' });
      const sent = navigator.sendBeacon(MAKE_WEBHOOK_URL, blob);
      if (sent) {
        console.log('✅ Lead sent via navigator.sendBeacon');
        return true;
      }
    }
  } catch (e) {
    console.error('❌ sendBeacon failed:', e);
  }

  // Fallback 2: fetch with mode no-cors
  try {
    await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonBody,
    });
    console.log('✅ Lead sent via no-cors fetch fallback');
    return true;
  } catch (e) {
    console.error('❌ All webhook send attempts failed:', e);
    return false;
  }
}
