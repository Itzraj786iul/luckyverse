/** Slow cinematic wash behind pastel UI — pointer-events none. */
export function AtmosphericBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="lv-sky-wash absolute inset-[-20%] opacity-70" />
      <div className="lv-sky-aurora absolute inset-[-30%] opacity-40 mix-blend-soft-light" />
    </div>
  );
}
