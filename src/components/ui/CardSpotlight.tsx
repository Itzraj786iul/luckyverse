import clsx from 'clsx';
import { useCallback, useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Radial highlight follows cursor inside the card — premium glass depth.
 */
export function CardSpotlight({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50, active: false });

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, active: true });
  }, []);

  const onLeave = useCallback(() => {
    setSpot((s) => ({ ...s, active: false }));
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={clsx('relative overflow-hidden', className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: spot.active ? 1 : 0,
          background: `radial-gradient(420px circle at ${spot.x}px ${spot.y}px, rgba(255,255,255,0.55), rgba(196,181,253,0.18) 38%, transparent 65%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: spot.active ? 0.35 : 0,
          background: `radial-gradient(180px circle at ${spot.x}px ${spot.y}px, rgba(236,72,153,0.25), transparent 55%)`,
        }}
      />
      <div className="relative z-[1] h-full">{children}</div>
    </div>
  );
}
