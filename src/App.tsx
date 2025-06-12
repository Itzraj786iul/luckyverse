import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
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
import FloatingParticles from './components/FloatingParticles';
import PhotoUpload from './components/PhotoUpload';
import PhotoCollage from './components/PhotoCollage';
import ImageFilters from './components/ImageFilters';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pastel-lavender via-pastel-rose to-pastel-mint font-poppins relative overflow-x-hidden">
        <FloatingParticles />
        <Navigation />
        
        <AnimatePresence mode="wait">
          <Routes>
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
      onUpload={(file) => console.log("Uploaded", file)} 
      onClose={() => console.log("Closed")} 
    />
  } 
/>

         <Route 
  path="/collage" 
  element={
    <PhotoCollage 
      images={["/path1.jpg", "/path2.jpg"]} 
      onClose={() => console.log("Closed collage")} 
    />
  } 
/>

            <Route 
  path="/filters" 
  element={
    <ImageFilters 
      onFilterApply={(f) => console.log("Applied:", f)} 
      currentFilter="sepia" 
    />
  } 
/>

            <Route path="/final" element={<FinalPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;