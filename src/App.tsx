import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import OpenLetter from './components/OpenLetter';
import Timeline from './components/Timeline';
import MusicPlayer from './components/MusicPlayer';
import Gallery from './components/Gallery';
import MemoryWall from './components/MemoryWall';
import HiddenNotes from './components/HiddenNotes';
import CalmCorner from './components/CalmCorner';
import JustSpace from './components/JustSpace';
import FinalPage from './components/FinalPage';
import PhotoUpload from './components/PhotoUpload';
import PhotoCollage from './components/PhotoCollage';
import ImageFilters from './components/ImageFilters';
import { AppShell } from './components/layout/AppShell';

function App() {
  return (
    <Router>
      <div className="lv-app-shell lv-theme-aurora min-h-screen font-outfit text-slate-800 antialiased relative overflow-x-hidden lv-grain selection:bg-cyan-200/55 selection:text-slate-900">
        <div className="relative z-[1] min-h-dvh">
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/letter" element={<OpenLetter />} />
            <Route path="/journey" element={<Timeline />} />
            <Route path="/playlist" element={<MusicPlayer />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/memories" element={<MemoryWall />} />
            <Route path="/notes" element={<HiddenNotes />} />
            <Route path="/calm" element={<CalmCorner />} />
            <Route path="/space" element={<JustSpace />} />
            <Route
              path="/upload"
              element={
                <PhotoUpload
                  onUpload={(file) => console.log('Uploaded', file)}
                  onClose={() => console.log('Closed')}
                />
              }
            />
            <Route
              path="/collage"
              element={
                <PhotoCollage
                  images={['/path1.jpg', '/path2.jpg']}
                  onClose={() => console.log('Closed collage')}
                />
              }
            />
            <Route
              path="/filters"
              element={
                <ImageFilters
                  onFilterApply={(f) => console.log('Applied:', f)}
                  currentFilter="sepia"
                />
              }
            />
            <Route path="/final" element={<FinalPage />} />
          </Route>
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
