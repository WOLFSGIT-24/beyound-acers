/**
 * Tracker Initialization Script
 * Initializes all 7 tracker codes on page load
 */

export const TRACKER_CODES = [
  'AA68a807180b46a',
  'AA6a43b8494f4a2',
  'AA6a43b865acf8c',
  'AA6a43b87cd6cf3',
  'AA6a43b895c4a60',
  'AA6a43b8cd3cd68',
  'AA6a43b8fdafd79',
  'AA6a6358a8a5c7d',
];

/**
 * Initialize trackers - call once on app load
 */
export function initializeAllTrackers(): void {
  if (typeof window === 'undefined') return;

  // Store tracker codes globally for access
  (window as any).__TRACKER_CODES__ = TRACKER_CODES;

  // Log tracker initialization (for debugging)
  console.log('✓ Tracker codes initialized:', TRACKER_CODES.length);

  // Inject tracker codes as data attributes
  TRACKER_CODES.forEach((code, index) => {
    const meta = document.createElement('meta');
    meta.name = `tracker-${index}`;
    meta.content = code;
    meta.setAttribute('data-tracker-index', String(index));
    document.head.appendChild(meta);
  });
}

/**
 * Get all tracker codes
 */
export function getTrackerCodes(): string[] {
  return TRACKER_CODES;
}

/**
 * Get tracker code by index
 */
export function getTrackerCode(index: number): string | undefined {
  return TRACKER_CODES[index];
}

/**
 * Check if a code is a valid tracker code
 */
export function isValidTrackerCode(code: string): boolean {
  return TRACKER_CODES.includes(code);
}
