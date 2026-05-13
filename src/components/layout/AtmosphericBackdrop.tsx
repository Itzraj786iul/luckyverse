/** Cool aurora wash — pointer-events none. */
export function AtmosphericBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="lv-sky-wash absolute inset-[-22%] opacity-[0.78]" />
      <div className="lv-sky-aurora absolute inset-[-32%] opacity-[0.42] mix-blend-soft-light" />
      <div className="lv-sky-veil absolute inset-0 opacity-[0.14] mix-blend-overlay" />
    </div>
  );
}
