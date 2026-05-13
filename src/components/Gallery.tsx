import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X, Heart, BookOpen, Coffee, Sparkles, Zap, Home, User, Download, Share2, Camera, Star } from 'lucide-react';
import { CardSpotlight } from './ui/CardSpotlight';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [likedImages, setLikedImages] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for a more polished experience
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const galleryItems = [
    {
      id: 1,
      title: 'Bhalukpong mornings',
      description:
        'That sleepy river-town silence before the batch fully woke up. Felt like the mountains were still stretching too.',
      category: 'personal',
      image: 'https://res.cloudinary.com/dmg6ncii3/image/upload/v1778695843/WhatsApp_Image_2026-05-13_at_11.39.48_PM_xhaqgg.jpg',
      quote: 'Still looks like the kind of road where conversations accidentally start.',
      isPersonal: true,
      location: 'Bhalukpong',
      date: 'Oct 2025',
    },
    {
      id: 2,
      title: 'Agartala NCC complex',
      description:
        'Discipline outside, chaos inside probably. Also somehow explains the Best Cadet energy.',
      category: 'personal',
      image: 'https://res.cloudinary.com/dmg6ncii3/image/upload/v1778695441/WhatsApp_Image_2026-05-13_at_11.27.02_PM_2_sajjmj.jpg',
      quote: 'You really do look like someone who’d win medals and still laugh through parade practice.',
      isPersonal: true,
      location: 'Agartala',
      date: '2025',
    },
    {
      id: 3,
      title: 'Traditional day',
      description:
        'The kind of photo that instantly tells you someone grew up around stories, culture, and loud festivals.',
      category: 'personal',
      image: 'https://res.cloudinary.com/dmg6ncii3/image/upload/v1778695441/WhatsApp_Image_2026-05-13_at_11.27.02_PM_awxdtl.jpg',
      quote: 'This honestly feels straight out of one of your Tripura stories.',
      isPersonal: true,
      location: 'Tripura',
      date: '2025',
    },
    {
      id: 4,
      title: 'Cadet pride',
      description:
        'Everyone standing serious for the frame while the energy still feels warm and slightly chaotic.',
      category: 'personal',
      image: 'https://res.cloudinary.com/dmg6ncii3/image/upload/v1778695443/WhatsApp_Image_2026-05-13_at_11.15.39_PM_qf150e.jpg',
      quote: 'Runner-up Best Cadet still sounds unnecessarily cool.',
      isPersonal: true,
      location: 'Agartala',
      date: '2025',
    },
    {
      id: 5,
      title: '100 cadets later',
      description:
        'One giant batch, random states, muddy shoes, river plans, and somehow people still finding their people.',
      category: 'memories',
      image: 'https://res.cloudinary.com/dmg6ncii3/image/upload/v1778695443/WhatsApp_Image_2026-05-13_at_11.27.19_PM_vzocsd.jpg',
      quote: 'Still crazy that all of this started because of one course.',
      isPersonal: true,
      location: 'NIMAS',
      date: 'Oct 2025',
    },
    {
      id: 6,
      title: 'River exhaustion club',
      description:
        'Sand everywhere, no energy left, nobody willing to move first.',
      category: 'memories',
      image: 'https://res.cloudinary.com/dmg6ncii3/image/upload/v1778695442/WhatsApp_Image_2026-05-13_at_11.15.41_PM_dd6vxk.jpg',
      quote: 'Adventure sports but everyone ends up looking defeated by lunchtime.',
      isPersonal: true,
      location: 'River bank',
      date: 'Oct 2025',
    },
    {
      id: 7,
      title: 'Raft-day silence',
      description:
        'Five minutes before someone inevitably splashed water at another raft for no reason.',
      category: 'personal',
      image: 'https://res.cloudinary.com/dmg6ncii3/image/upload/v1778695442/WhatsApp_Image_2026-05-13_at_11.15.41_PM_1_x7meww.jpg',
      quote: 'Nobody actually looked calm near the river.',
      isPersonal: true,
      location: 'Bhalukpong river',
      date: 'Oct 2025',
    },
    {
      id: 8,
      title: 'Main-character mountains',
      description:
        'Arunachal casually looking cinematic while everyone pretended not to take too many photos.',
      category: 'peaceful',
      image: 'https://res.cloudinary.com/dmg6ncii3/image/upload/v1778695443/WhatsApp_Image_2026-05-13_at_11.15.42_PM_dygcat.jpg',
      quote: 'Still unfair that the background looked fake in real life too.',
      isPersonal: false,
      location: 'Arunachal Pradesh',
      date: 'Oct 2025',
    },
    {
      id: 9,
      title: 'Camp-side afternoons',
      description:
        'Plastic chairs, drying clothes, random people disappearing into naps after rafting.',
      category: 'comfort',
      image: 'https://res.cloudinary.com/dmg6ncii3/image/upload/v1778695443/WhatsApp_Image_2026-05-13_at_11.15.40_PM_rpt5lt.jpg',
      quote: 'This feels exactly like the kind of afternoon nobody planned but everyone remembers.',
      isPersonal: true,
      location: 'NIMAS campus',
      date: 'Oct 2025',
    },
    {
      id: 10,
      title: 'Blue jersey day',
      description:
        'Peak camp energy: sun too bright, shoes full of sand, and everyone acting cooler than they felt.',
      category: 'personal',
      image: 'https://res.cloudinary.com/dmg6ncii3/image/upload/v1778695442/WhatsApp_Image_2026-05-13_at_11.15.41_PM_1_x7meww.jpg',
      quote: 'You definitely looked like you belonged near mountains more than classrooms.',
      isPersonal: true,
      location: 'River bank',
      date: 'Oct 2025',
    },
    {
      id: 11,
      title: 'Temple-town evening',
      description:
        'One of those chaotic evenings where nobody knew the plan but everyone kept walking together anyway.',
      category: 'memories',
      image: 'https://res.cloudinary.com/dmg6ncii3/image/upload/v1778695443/WhatsApp_Image_2026-05-13_at_11.15.42_PM_dygcat.jpg',
      quote: 'This whole batch somehow turned every random outing into an event.',
      isPersonal: true,
      location: 'Temple market',
      date: '2025',
    },
    {
      id: 12,
      title: 'The mountain feeling',
      description:
        'No dramatic speech here. Just river water, cold air, and people slowly becoming memories.',
      category: 'peaceful',
      image: 'https://res.cloudinary.com/dmg6ncii3/image/upload/v1778695441/WhatsApp_Image_2026-05-13_at_11.13.11_PM_uebuly.jpg',
      quote: 'Some places really do stay in the head longer than expected.',
      isPersonal: false,
      location: 'Arunachal',
      date: 'Oct 2025',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Images', icon: Image, color: 'purple' },
    { id: 'personal', label: 'Luckyverse', icon: User, color: 'rose' },
    { id: 'peaceful', label: 'Peaceful', icon: Heart, color: 'blue' },
    { id: 'academic', label: 'Camp notes', icon: Zap, color: 'indigo' },
    { id: 'comfort', label: 'Comfort', icon: Coffee, color: 'pink' },
    { id: 'memories', label: 'Memories', icon: Home, color: 'green' }
  ];

  const categoryFilterClasses: Record<string, { on: string; off: string }> = {
    all: {
      on: 'bg-purple-600 text-white shadow-lg ring-2 ring-purple-300/40',
      off: 'bg-white/75 text-purple-700 hover:bg-purple-50/95',
    },
    personal: {
      on: 'bg-rose-500 text-white shadow-lg ring-2 ring-rose-200/50',
      off: 'bg-white/75 text-rose-700 hover:bg-rose-50/95',
    },
    peaceful: {
      on: 'bg-sky-500 text-white shadow-lg ring-2 ring-sky-200/50',
      off: 'bg-white/75 text-sky-700 hover:bg-sky-50/95',
    },
    academic: {
      on: 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-200/50',
      off: 'bg-white/75 text-indigo-700 hover:bg-indigo-50/95',
    },
    comfort: {
      on: 'bg-pink-500 text-white shadow-lg ring-2 ring-pink-200/50',
      off: 'bg-white/75 text-pink-700 hover:bg-pink-50/95',
    },
    memories: {
      on: 'bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-200/50',
      off: 'bg-white/75 text-emerald-700 hover:bg-emerald-50/95',
    },
  };

  const filteredItems = filter === 'all' ? galleryItems : galleryItems.filter(item => item.category === filter);

  const toggleLike = (imageId: number) => {
    setLikedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const downloadImage = (imageUrl: string, title: string) => {
    // In a real implementation, this would download the image
    console.log(`Downloading: ${title}`);
  };

  const shareImage = (item: { title: string; description: string }) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href
      });
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="lv-glass-panel lv-card-shine max-w-sm rounded-3xl px-10 py-12 text-center ring-1 ring-white/45">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            📸
          </motion.div>
          <p className="text-purple-600 font-dancing text-2xl">
            Opening the folder…
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 py-20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="lv-glass-panel lv-card-shine mx-auto mb-12 max-w-3xl rounded-[2rem] px-6 py-10 text-center ring-1 ring-white/45 md:px-12"
        >
          <span className="lv-kicker mb-4 inline-block">Frames & mood</span>
          <Camera className="mx-auto mb-4 text-purple-600" size={44} />
          <h1 className="text-4xl md:text-5xl font-dancing font-bold text-purple-800 mb-3">
            Visual Stories
          </h1>
          <p className="text-gray-600 mb-8 text-balance">
            Preserved atmosphere — roads, nights, water, chai. Swap in your own photos whenever.
          </p>

          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-full bg-white/55 p-1 ring-1 ring-white/50 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-purple-700 hover:bg-white/70'
                }`}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode('masonry')}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  viewMode === 'masonry'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-purple-700 hover:bg-white/70'
                }`}
              >
                Masonry
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((category) => {
              const Icon = category.icon;
              const tone = categoryFilterClasses[category.id] ?? categoryFilterClasses.all;
              const active = filter === category.id;
              return (
                <motion.button
                  key={category.id}
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setFilter(category.id)}
                  className={`flex items-center space-x-2 rounded-full border border-white/35 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors ${
                    active ? tone.on : tone.off
                  }`}
                >
                  <Icon size={16} />
                  <span>{category.label}</span>
                  {category.id === 'personal' && <Star size={14} className="text-yellow-300" />}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className={`grid gap-6 [transform-style:preserve-3d] ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          }`}
          style={{ perspective: 'min(90vw, 1200px)' }}
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 280, damping: 24 }}
                whileHover={{
                  y: -12,
                  scale: 1.025,
                  rotateX: 2.5,
                  rotateY: index % 2 === 0 ? -3 : 3,
                  boxShadow: '0 28px 56px rgba(124,58,237,0.22)',
                }}
                className={`lv-glass-panel lv-card-shine cursor-pointer overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/40 transition-shadow duration-300 group relative [transform-style:preserve-3d] hover:shadow-[0_20px_60px_rgba(139,92,246,0.18)] ${
                  viewMode === 'masonry' && index % 3 === 1 ? 'row-span-2' : ''
                } ${item.isPersonal ? 'ring-2 ring-rose-300/60' : ''}`}
              >
                <CardSpotlight className="flex min-h-0 flex-col rounded-2xl">
                  {item.isPersonal && (
                    <div className="absolute top-3 left-3 z-20 flex items-center space-x-1 rounded-full bg-rose-500 px-2 py-1 text-xs font-medium text-white">
                      <User size={12} />
                      <span>Luckyverse</span>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(item.id);
                    }}
                    className="absolute top-3 right-3 z-20 rounded-full bg-white/85 p-2 backdrop-blur-sm transition-colors hover:bg-white"
                  >
                    <Heart
                      size={16}
                      className={`${
                        likedImages.includes(item.id)
                          ? 'fill-current text-red-500'
                          : 'text-gray-600'
                      } transition-colors`}
                    />
                  </motion.button>

                  <div
                    className="relative z-[2] overflow-hidden"
                    onClick={() => setSelectedImage(item.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedImage(item.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                        viewMode === 'masonry' && index % 3 === 1 ? 'h-80' : 'h-64'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute bottom-4 left-4 right-4 z-[2] text-white"
                    >
                      <h3 className="mb-1 text-lg font-semibold">{item.title}</h3>
                      <p className="line-clamp-2 text-sm opacity-90">{item.description}</p>
                      {item.location && (
                        <p className="mt-1 text-xs opacity-75">📍 {item.location}</p>
                      )}
                    </motion.div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="flex-1 text-xl font-semibold text-gray-800 transition-colors group-hover:text-purple-700">
                        {item.title}
                      </h3>
                      {likedImages.includes(item.id) && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-red-500">
                          <Heart size={16} className="fill-current" />
                        </motion.div>
                      )}
                    </div>

                    <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">{item.description}</p>

                    <div className="mt-auto flex items-center justify-between">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          item.category === 'personal'
                            ? 'bg-rose-100 text-rose-600'
                            : item.category === 'peaceful'
                              ? 'bg-sky-100 text-sky-700'
                              : item.category === 'academic'
                                ? 'bg-indigo-100 text-indigo-600'
                                : item.category === 'comfort'
                                  ? 'bg-pink-100 text-pink-600'
                                  : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {item.category}
                      </span>

                      <div className="flex items-center space-x-2">
                        {item.date && <span className="text-xs text-gray-500">{item.date}</span>}
                        <Sparkles
                          size={16}
                          className="text-purple-400 transition-colors group-hover:text-purple-600"
                        />
                      </div>
                    </div>
                  </div>
                </CardSpotlight>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <div className="lv-glass-panel lv-card-shine mx-auto max-w-md rounded-2xl p-5 ring-1 ring-white/40">
            <div className="flex justify-center space-x-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-purple-600">{filteredItems.length}</div>
                <div className="text-gray-600">Images</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-red-500">{likedImages.length}</div>
                <div className="text-gray-600">Liked</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-rose-500">
                  {filteredItems.filter(item => item.isPersonal).length}
                </div>
                <div className="text-gray-600">Personal</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modal for expanded view */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="lv-glass-panel max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/50"
              >
                <div className="relative">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    <X size={20} />
                  </button>

                  {(() => {
                    const item = galleryItems.find(img => img.id === selectedImage);
                    if (!item) return null;
                    
                    return (
                      <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-2/3 relative">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-64 lg:h-96 object-cover"
                          />
                          {item.isPersonal && (
                            <div className="absolute top-4 left-4 bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
                              <User size={16} />
                              <span>Camp-era frame</span>
                            </div>
                          )}
                        </div>
                        <div className="lg:w-1/3 p-8 flex flex-col justify-center">
                          <h2 className="text-3xl font-dancing font-bold text-purple-700 mb-4">
                            {item.title}
                          </h2>
                          
                          {item.location && item.date && (
                            <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                              <span>📍 {item.location}</span>
                              <span>📅 {item.date}</span>
                            </div>
                          )}
                          
                          <p className="text-gray-700 leading-relaxed mb-6">
                            {item.description}
                          </p>
                          
                          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 border-l-4 border-purple-400 mb-6">
                            <p className="text-purple-700 italic font-light">
                              "{item.quote}"
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between mb-6">
                            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                              item.category === 'personal' ? 'bg-rose-100 text-rose-600' :
                              item.category === 'peaceful' ? 'bg-blue-100 text-blue-600' :
                              item.category === 'academic' ? 'bg-indigo-100 text-indigo-600' :
                              item.category === 'comfort' ? 'bg-pink-100 text-pink-600' :
                              'bg-green-100 text-green-600'
                            }`}>
                              {item.category}
                            </span>
                            
                            <div className="flex items-center space-x-3">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => toggleLike(item.id)}
                                className="p-2 rounded-full bg-gray-100 hover:bg-red-100 transition-colors"
                              >
                                <Heart 
                                  size={20} 
                                  className={`${
                                    likedImages.includes(item.id) 
                                      ? 'text-red-500 fill-current' 
                                      : 'text-gray-600'
                                  } transition-colors`}
                                />
                              </motion.button>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => shareImage(item)}
                                className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors"
                              >
                                <Share2 size={20} className="text-gray-600" />
                              </motion.button>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => downloadImage(item.image, item.title)}
                                className="p-2 rounded-full bg-gray-100 hover:bg-green-100 transition-colors"
                              >
                                <Download size={20} className="text-gray-600" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <div className="lv-glass-panel lv-card-shine mx-auto max-w-2xl rounded-[1.75rem] p-6 text-center ring-1 ring-white/40">
            <BookOpen className="mx-auto mb-4 text-purple-500" size={24} />
            <p className="text-gray-600 italic mb-2">
              These are placeholders for mood — replace with your real frames when you want.
            </p>
            <p className="text-purple-600 font-dancing text-lg">
              Luckyverse-tagged ones are the “this chapter” pile ⭐
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Gallery;