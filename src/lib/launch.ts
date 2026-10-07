import { LAUNCH } from '@/content/riverine';

/**
 * Has the Dussehra launch date (IST) passed? Evaluated on the server at render time;
 * the home page revalidates hourly, so the ribbon/CTA copy flips within an hour of launch.
 */
export function isLaunched(now: number = Date.now()): boolean {
  return now >= new Date(`${LAUNCH.date}T00:00:00+05:30`).getTime();
}
