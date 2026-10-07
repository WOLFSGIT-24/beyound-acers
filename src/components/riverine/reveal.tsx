import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/** Fades content up once as it scrolls into view. Reduced-motion users see it immediately (CSS). */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'figure';
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={cn(
        'transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:!transition-none',
        className,
      )}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(22px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
