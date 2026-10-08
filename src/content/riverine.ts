/**
 * Riverine copy + launch facts (Phase 2). Anything marked [TBD] is unconfirmed by the client.
 */

export const LAUNCH = {
  // [TBD] confirm the launch date with the client — placeholder is Dussehra (Vijayadashami) 2026.
  date: '2026-10-20',
} as const;

export const PRICING = {
  startingPrice: '₹56 Lakhs',
  availableSizes: '1,454 – 2,000+ Sq.Ft.',
} as const;

/** Pre-launch sales milestone shown in the Success Story section. */
export const SUCCESS = {
  families: 180,
  totalPlots: 331,
  // [TBD] assumes one plot per family — confirm the actual plots-booked count with the client.
  plotsBooked: 180,
} as const;

/**
 * Buyer testimonial videos. Fill `youtubeId` (preferred) or `src` (an mp4 in /public/videos)
 * and the card plays inline; an empty entry shows a "coming soon" state instead.
 * [TBD] titles/bylines are placeholders until the client shares the real videos.
 */
export type Testimonial = {
  title: string;
  byline: string;
  duration?: string;
  poster: string;
  youtubeId?: string;
  src?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    title: 'Why we chose Riverine',
    byline: 'Pre-launch homeowner',
    poster: 'https://static.wixstatic.com/media/cef78c_337e817a4d1f487fb149116fa0aab218~mv2.png',
  },
  {
    title: 'Our first evening by the Kaveri',
    byline: 'Pre-launch homeowner',
    poster: 'https://static.wixstatic.com/media/cef78c_f0d53aa098bc47399562cbdbaaf99ce9~mv2.png',
  },
  {
    title: 'From Bengaluru traffic to tree-lined avenues',
    byline: 'Pre-launch homeowner',
    poster: 'https://static.wixstatic.com/media/cef78c_8eab3fe2bfae4882869865c5cdba5763~mv2.png',
  },
  {
    title: 'A neighbourhood our children can grow up in',
    byline: 'Pre-launch homeowner',
    poster: 'https://static.wixstatic.com/media/cef78c_ea42cef20a5b406e8cbf061952ea58ac~mv2.png',
  },
];
