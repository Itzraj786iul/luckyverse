/** Shared refs for hero Canvas (R3F context does not bridge easily). Throttled from WelcomePage. */
export const heroMotion = {
  scroll01: 0,
  mx: 0,
  my: 0,
};

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
