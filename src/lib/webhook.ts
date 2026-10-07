export const MAKE_WEBHOOK_URL = 'https://hook.us1.make.com/tj4twkidsre5c17695lf2d8bn1j1afds';

/**
 * Formats the lead into the flat set of fields mapped in the Make.com scenario.
 * Timestamp is Indian Standard Time, e.g. "07/10/2026, 08:56:29 pm".
 */
export function formatWebhookPayload(data: Record<string, any>): Record<string, string> {
  const submitted = data.dateSubmitted ? new Date(data.dateSubmitted) : new Date();
  const timestampIST = submitted.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return {
    'Full Name': String(data.fullName || '').trim(),
    'Phone Number': String(data.phoneNumber || '').trim(),
    'Email': String(data.emailAddress || '').trim(),
    'Source': 'Website Form',
    'Timestamp': timestampIST,
    'Track Code': String(data.trackCode || '').trim(),
    'Campaign Label': String(data.campaignLabel || '').trim(),
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
