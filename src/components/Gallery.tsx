import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X, Heart, BookOpen, Coffee, Sparkles, Zap, Home, User, Download, Share2, Camera, Star } from 'lucide-react';

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
    title: 'Shagufta\'s Smile',
    description: 'That genuine smile that lights up any room - captured in a moment of pure joy',
    category: 'personal',
    image: 'https://i.postimg.cc/MK0r0N7G/IMG-20250612-WA0039.jpg',
    quote: 'Your smile is your signature - authentic and beautiful',
    isPersonal: true,
    location: 'Patna',
    date: '2025'
  },
  {
    id: 2,
    title: 'Study Mode Activated',
    description: 'Deep in concentration, working on electrical engineering concepts - this is you in your element',
    category: 'personal',
    image: 'https://i.postimg.cc/bvV5DnQH/IMG-20250612-WA0034.jpg',
    quote: 'Intelligence in action is the most beautiful thing to witness',
    isPersonal: true,
    location: 'Jamia Millia Islamia',
    date: '2024'
  },
  {
    id: 3,
    title: 'Quiet Contemplation',
    description: 'A peaceful moment of reflection - you have this beautiful way of finding calm in chaos',
    category: 'personal',
    image: 'https://i.postimg.cc/7P2Rhfb0/IMG-20250612-WA0038.jpg',
    quote: 'In quiet moments, we find our truest selves',
    isPersonal: true,
    location: 'Home',
    date: '2024'
  },
  {
    id: 4,
    title: 'Engineering Dreams',
    description: 'Working with circuits and calculations - building the future one equation at a time',
    category: 'personal',
    image: 'https://i.postimg.cc/VLPVCmbT/IMG-20250612-WA0035.jpg',
    quote: 'Every great engineer starts with curiosity and determination',
    isPersonal: true,
    location: 'University Lab',
    date: '2024'
  },
  {
    id: 5,
    title: 'Festival Vibes',
    description: 'Dressed in colors and tradition - this day was full of culture, smiles, and celebration',
    category: 'personal',
    image: 'https://i.postimg.cc/xTQ6d5wV/IMG-20250612-WA0044.jpg',
    quote: 'Life is a celebration, and you’re the brightest part of it',
    isPersonal: true,
    location: 'Cultural Fest',
    date: '2025'
  },
  {
    id: 6,
    title: 'Evening Elegance',
    description: 'That golden hour glow and confidence in your eyes - truly captivating',
    category: 'personal',
    image: 'https://i.postimg.cc/NjpJSXPq/IMG-20250612-WA0040.jpg',
    quote: 'There’s something powerful in simply being yourself',
    isPersonal: true,
    location: 'Evening Walk',
    date: '2025'
  },
  {
    id: 7,
    title: 'Sisterhood Snap',
    description: 'That candid moment with your best friend - laughter that feels like home',
    category: 'personal',
    image: 'https://i.postimg.cc/Fz3CBnwD/IMG-20250612-WA0037.jpg',
    quote: 'Friendship is not just a bond, it’s a beautiful rhythm of souls',
    isPersonal: true,
    location: 'Botanical Garden',
    date: '2025'
  },
  {
    id: 8,
    title: 'Power in Pink',
    description: 'Bold and beautiful - this picture radiates your strength and grace effortlessly',
    category: 'personal',
    image: 'https://i.postimg.cc/vmZjZh6Z/IMG-20250612-WA0033.jpg',
    quote: 'Elegance is when the inside is as beautiful as the outside',
    isPersonal: true,
    location: 'Campus Grounds',
    date: '2025'
  },
  {
    id: 9,
    title: 'Candid in Confidence',
    description: 'Captured in motion - this one says so much without a single word',
    category: 'personal',
    image: 'https://i.postimg.cc/mD06VGpP/IMG-20250612-WA0036.jpg',
    quote: 'Confidence isn’t loud, it’s calm and assured like this moment',
    isPersonal: true,
    location: 'Late Night Campus',
    date: '2025'
  },
  {
    id: 10,
    title: 'College Chronicles',
    description: 'One of those unforgettable group moments from your college journey',
    category: 'personal',
    image: 'https://i.postimg.cc/tCz2nPbZ/IMG-20250612-WA0046.jpg',
    quote: 'Memories are made of laughter, friendship, and a shared future',
    isPersonal: true,
    location: 'Faculty of Engineering, JMI',
    date: '2025'
  },

    
    // Inspirational Images
    {
      id: 5,
      title: 'Quiet Library Corner',
      description: 'A peaceful reading nook with warm lighting - the kind of space where you find your calm',
      category: 'peaceful',
      image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800',
      quote: 'Every introvert needs a sanctuary like this',
      isPersonal: false
    },
    {
      id: 6,
      title: 'Circuit Board Poetry',
      description: 'Circuit boards and blueprints - where logic meets creativity, just like your mind',
      category: 'academic',
      image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=800',
      quote: 'Building the future, one connection at a time',
      isPersonal: false
    },
    {
      id: 7,
      title: 'Evening Tea Ritual',
      description: 'The simple pleasure of tea time - moments of mindfulness in a busy world',
      category: 'comfort',
      image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800',
      quote: 'Some of life\'s best moments happen over a cup of tea',
      isPersonal: false
    },
    {
      id: 8,
      title: 'Books & Dreams',
      description: 'Stacked books waiting to be explored - each one a new world to discover',
      category: 'peaceful',
      image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800',
      quote: 'Books are the quietest and most constant of friends',
      isPersonal: false
    },
    {
      id: 9,
      title: 'Patna Sunsets',
      description: 'Golden hour over familiar streets - there\'s something special about home',
      category: 'memories',
      image: 'https://i.postimg.cc/8cdBWFFz/beautiful-sunset-view-ganga-river-260nw-1822326641.webp',
      quote: 'Home is where your story begins',
      isPersonal: false
    },
    {
      id: 10,
      title: 'Study Space Serenity',
      description: 'A well-organized desk with soft lighting - where focus meets comfort',
      category: 'academic',
      image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800',
      quote: 'Great minds need great spaces to flourish',
      isPersonal: false
    },
    {
      id: 11,
      title: 'Cozy Reading Nook',
      description: 'Soft blankets and warm light - the perfect spot for getting lost in stories',
      category: 'comfort',
      image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800',
      quote: 'Comfort is not a luxury, it\'s a necessity for the soul',
      isPersonal: false
    },
    {
      id: 12,
      title: 'Jamia Campus Vibes',
      description: 'University corridors filled with dreams and possibilities',
      category: 'memories',
      image: 'https://i.postimg.cc/MHs0tCYC/images.jpg',
      quote: 'Every hallway holds a thousand dreams',
      isPersonal: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Images', icon: Image, color: 'purple' },
    { id: 'personal', label: 'Shagufta', icon: User, color: 'rose' },
    { id: 'peaceful', label: 'Peaceful', icon: Heart, color: 'blue' },
    { id: 'academic', label: 'Academic', icon: Zap, color: 'indigo' },
    { id: 'comfort', label: 'Comfort', icon: Coffee, color: 'pink' },
    { id: 'memories', label: 'Memories', icon: Home, color: 'green' }
  ];

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

  const shareImage = (item: any) => {
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
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            📸
          </motion.div>
          <p className="text-purple-600 font-dancing text-2xl">
            Preparing your visual journey...
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
          className="text-center mb-12"
        >
          <Camera className="mx-auto mb-4 text-purple-600 animate-bounce" size={48} />
          <h1 className="text-4xl md:text-5xl font-dancing font-bold text-purple-700 mb-4">
            Visual Stories
          </h1>
          <p className="text-gray-600 mb-8">
            A collection of moments, memories, and spaces that celebrate you ✨
          </p>
          
          {/* View Mode Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-full p-1 border border-white/40">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-purple-600'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  viewMode === 'masonry' ? 'bg-purple-500 text-white' : 'text-purple-600'
                }`}
              >
                Masonry View
              </button>
            </div>
          </div>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === category.id
                      ? `bg-${category.color}-500 text-white shadow-lg`
                      : `bg-white/60 text-${category.color}-600 hover:bg-${category.color}-50`
                  } backdrop-blur-sm border border-white/30`}
                >
                  <Icon size={16} />
                  <span>{category.label}</span>
                  {category.id === 'personal' && (
                    <Star size={14} className="text-yellow-400" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          }`}
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/40 cursor-pointer group relative ${
                  viewMode === 'masonry' && index % 3 === 1 ? 'row-span-2' : ''
                } ${item.isPersonal ? 'ring-2 ring-rose-300 ring-opacity-50' : ''}`}
              >
                {/* Personal Photo Badge */}
                {item.isPersonal && (
                  <div className="absolute top-3 left-3 z-10 bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <User size={12} />
                    <span>Shagufta</span>
                  </div>
                )}

                {/* Like Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(item.id);
                  }}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                >
                  <Heart 
                    size={16} 
                    className={`${
                      likedImages.includes(item.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-600'
                    } transition-colors`}
                  />
                </motion.button>

                <div 
                  className="relative overflow-hidden"
                  onClick={() => setSelectedImage(item.id)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                      viewMode === 'masonry' && index % 3 === 1 ? 'h-80' : 'h-64'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-4 right-4 text-white"
                  >
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm opacity-90 line-clamp-2">{item.description}</p>
                    {item.location && (
                      <p className="text-xs opacity-75 mt-1">📍 {item.location}</p>
                    )}
                  </motion.div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-purple-700 transition-colors flex-1">
                      {item.title}
                    </h3>
                    {likedImages.includes(item.id) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-red-500"
                      >
                        <Heart size={16} className="fill-current" />
                      </motion.div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.category === 'personal' ? 'bg-rose-100 text-rose-600' :
                      item.category === 'peaceful' ? 'bg-blue-100 text-blue-600' :
                      item.category === 'academic' ? 'bg-indigo-100 text-indigo-600' :
                      item.category === 'comfort' ? 'bg-pink-100 text-pink-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {item.category}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      {item.date && (
                        <span className="text-xs text-gray-500">{item.date}</span>
                      )}
                      <Sparkles size={16} className="text-purple-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                  </div>
                </div>
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
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 max-w-md mx-auto">
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
                className="bg-white/95 backdrop-blur-sm rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/50"
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
                              <span>Personal Photo</span>
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
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
            <BookOpen className="mx-auto mb-4 text-purple-500" size={24} />
            <p className="text-gray-600 italic mb-2">
              "Every image tells a story, and every story connects us to something beautiful"
            </p>
            <p className="text-purple-600 font-dancing text-lg">
              Your personal photos are marked with a special badge ⭐
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Gallery;