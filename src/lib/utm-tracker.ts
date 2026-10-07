/**
 * UTM + GCLID Tracking Utility
 * Captures UTM parameters and Google Click ID (gclid) from URL,
 * persists them in sessionStorage across page navigations,
 * and provides a clean object for form payloads.
 */

const IS_DEV = typeof process !== 'undefined'
  ? process.env.NODE_ENV !== 'production'
  : true;

function devLog(message: string, data?: unknown): void {
  if (IS_DEV) {
    if (data !== undefined) {
      console.log(`[UTM] ${message}`, data);
    } else {
      console.log(`[UTM] ${message}`);
    }
  }
}

const SESSION_KEY = 'ba_utm_params';

/** All tracked URL parameters — every field is always a string (never null/undefined) */
export interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  trackCode: string;
  campaignLabel: string;
}

/** Empty baseline — all fields guaranteed to be strings */
const EMPTY_PARAMS: UTMParams = {
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_term: '',
  utm_content: '',
  gclid: '',
  trackCode: '',
  campaignLabel: '',
};

/**
 * Extract UTM + gclid parameters from the current URL query string.
 * Reads ONLY from window.location.search — no custom routing params (e.g. page=home).
 * All other query parameters in the URL are silently ignored.
 * Returns an object with all fields as strings — missing fields are ''.
 *
 * Works for URLs like:
 *   https://beyondacres.in/?utm_source=google&utm_medium=cpc&utm_campaign=search_ba_2&utm_term=test&gclid=test123
 */
export function getUTMParams(): UTMParams {
  if (typeof window === 'undefined') return { ...EMPTY_PARAMS };

  const params = new URLSearchParams(window.location.search);

  const result: UTMParams = {
    utm_source:    params.get('utm_source')    || '',
    utm_medium:    params.get('utm_medium')    || '',
    utm_campaign:  params.get('utm_campaign')  || '',
    utm_term:      params.get('utm_term')      || '',
    utm_content:   params.get('utm_content')   || '',
    gclid:         params.get('gclid')         || '',
    trackCode:     params.get('trackCode')     || params.get('track_code') || params.get('utm_id') || '',
    campaignLabel: params.get('campaignLabel') || params.get('campaign_label') || '',
  };

  const captured = Object.entries(result).filter(([, v]) => v !== '');
  if (captured.length > 0) {
    devLog('Parameters captured from URL:', Object.fromEntries(captured));
  }

  return result;
}

/**
 * Persist UTM params to sessionStorage so they survive page navigation.
 */
export function storeUTMParams(params: UTMParams): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(params));
    devLog('Stored to sessionStorage:', params);
  } catch (e) {
    devLog('Failed to store UTM params (sessionStorage unavailable)');
  }
}

/**
 * Retrieve previously stored UTM params from sessionStorage.
 * Returns empty params if nothing is stored or storage is unavailable.
 */
export function getStoredUTMParams(): UTMParams {
  if (typeof window === 'undefined') return { ...EMPTY_PARAMS };
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return { ...EMPTY_PARAMS };
    const parsed = JSON.parse(raw) as Partial<UTMParams>;
    // Merge with EMPTY_PARAMS so any missing fields default to ''
    return { ...EMPTY_PARAMS, ...parsed };
  } catch {
    return { ...EMPTY_PARAMS };
  }
}

/**
 * Initialize UTM tracking — call once on app load.
 * If the current URL has UTM/gclid params, store them.
 * Otherwise fall back to previously stored values.
 */
export function initializeUTMTracking(): UTMParams {
  const urlParams = getUTMParams();
  const hasParams = Object.values(urlParams).some(v => v !== '');

  if (hasParams) {
    storeUTMParams(urlParams);
    devLog('Initialized from URL');
    return urlParams;
  }

  const stored = getStoredUTMParams();
  const hasStored = Object.values(stored).some(v => v !== '');
  if (hasStored) {
    devLog('Initialized from sessionStorage:', stored);
  } else {
    devLog('No UTM parameters found in URL or sessionStorage');
  }
  return stored;
}

/**
 * Get current UTM params — URL takes priority, falls back to sessionStorage.
 * Safe to call at any time; always returns a complete object with string values.
 */
export function getCurrentUTMParams(): UTMParams {
  const urlParams = getUTMParams();
  if (Object.values(urlParams).some(v => v !== '')) {
    return urlParams;
  }
  return getStoredUTMParams();
}

/**
 * Build a flat tracking payload ready to spread into any form submission object.
 * Every field is a string — never null or undefined — safe for CRM/API ingestion.
 */
export function buildTrackingPayload(): {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  trackCode: string;
  campaignLabel: string;
} {
  const p = getCurrentUTMParams();
  const payload = {
    utmSource:     p.utm_source,
    utmMedium:     p.utm_medium,
    utmCampaign:   p.utm_campaign,
    utmTerm:       p.utm_term,
    utmContent:    p.utm_content,
    gclid:         p.gclid,
    trackCode:     p.trackCode,
    campaignLabel: p.campaignLabel,
  };
  devLog('Tracking payload for form submission:', payload);
  return payload;
}
