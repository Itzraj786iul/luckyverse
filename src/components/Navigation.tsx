import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PartyPopper, MessageCircle, Map, Music, Image, Camera,
  Sparkles, Heart, Mail, Wand2, Menu, X
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { path: '/', label: 'Welcome', icon: PartyPopper },
    { path: '/letter', label: 'Letter', icon: MessageCircle },
    { path: '/journey', label: 'Journey', icon: Map },
    { path: '/playlist', label: 'Playlist', icon: Music },
    { path: '/gallery', label: 'Gallery', icon: Image },
    { path: '/memories', label: 'Memories', icon: Camera },
    { path: '/notes', label: 'Notes', icon: Sparkles },
    { path: '/calm', label: 'Calm', icon: Heart },
    { path: '/space', label: 'Space', icon: Mail },
    { path: '/final', label: 'Final', icon: Wand2 },
    { path: '/upload', label: 'Upload', icon: Camera },
    { path: '/collage', label: 'Collage', icon: Image },
    { path: '/filters', label: 'Filters', icon: Wand2 },
  ];

  const primaryItems = navItems.slice(0, 9);
  const moreItems = navItems.slice(9);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setShowMore(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pastel-lilac/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <Link to="/" className="text-2xl font-dancing font-bold text-purple-600">
              Hey Shagufta 🌸
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4 relative">
              {primaryItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-purple-100 text-purple-700 shadow-md'
                          : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* More Dropdown */}
              {moreItems.length > 0 && (
                <div className="relative" ref={moreRef}>
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all"
                  >
                    <Wand2 size={16} />
                    <span>More</span>
                  </button>
                  {showMore && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg z-50">
                      {moreItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setShowMore(false)}
                            className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                              isActive
                                ? 'bg-purple-100 text-purple-700'
                                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                            }`}
                          >
                            <Icon size={16} />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-600 hover:bg-purple-100 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 rounded-lg my-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navigation;
