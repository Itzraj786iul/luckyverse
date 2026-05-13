import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation';
import FloatingParticles from '../FloatingParticles';
import { SmoothScroll } from './SmoothScroll';
import { AtmosphericBackdrop } from './AtmosphericBackdrop';
import { CursorAura } from '../ui/CursorAura';

/**
 * Outlet must NOT be wrapped in AnimatePresence + keyed motion keyed to pathname:
 * RR v6 updates <Outlet /> to the next route immediately, which breaks exit/wait
 * sequencing and can leave pages stuck at opacity 0 (blank Letter / Journey / etc.).
 * Page-level motion (each screen) still handles cinematic enters.
 */
export function AppShell() {
  return (
    <>
      <AtmosphericBackdrop />
      <SmoothScroll />
      <FloatingParticles />
      <CursorAura />
      <Navigation />
      <div className="relative z-10 min-h-screen [perspective:1400px]">
        <Outlet />
      </div>
    </>
  );
}
