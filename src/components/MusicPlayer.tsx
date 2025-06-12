import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';

const MusicPlayer = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const playlist = [
    {
      title: 'Ilahi',
      artist: 'Arijit Singh',
      album: 'Yeh Jawaani Hai Deewani',
      emotion: 'Wanderlust & Dreams',
      color: 'from-blue-400 to-purple-500',
      description: 'For the dreamer in you who looks beyond the ordinary',
      src: '/songs/ilahi.mp3' // ✅ Replace with actual file path or URL
    },
    {
      title: 'Agar Tum Saath Ho',
      artist: 'Alka Yagnik & Arijit Singh',
      album: 'Tamasha',
      emotion: 'Emotional Depth',
      color: 'from-purple-500 to-pink-500',
      description: 'For moments when feelings run deeper than words',
      src: '/songs/agar_tum_saath_ho.mp3'
    },
    {
      title: 'Love You Zindagi',
      artist: 'Amit Trivedi',
      album: 'Dear Zindagi',
      emotion: 'Self-Love & Hope',
      color: 'from-green-400 to-blue-400',
      description: 'A reminder that life is beautiful, especially your life',
      src: '/songs/love_you_zindagi.mp3'
    },
    {
      title: 'Khulke Jeene Ka',
      artist: 'Arijit Singh',
      album: 'Dil Bechara',
      emotion: 'Living Freely',
      color: 'from-orange-400 to-red-400',
      description: 'For embracing every moment with an open heart',
      src: '/songs/khulke_jeene_ka.mp3'
    },
    {
      title: 'Raabta (Instrumental)',
      artist: 'A.R. Rahman',
      album: 'Agent Vinod',
      emotion: 'Connection & Memory',
      color: 'from-pink-400 to-purple-400',
      description: 'For the connections that transcend time and space',
      src: 'https://jmp.sh/s/MafQBMOATsQknctW27n0'
    }
  ];

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeSong = (direction) => {
    const newIndex =
      direction === 'next'
        ? (currentSong + 1) % playlist.length
        : (currentSong - 1 + playlist.length) % playlist.length;

    setCurrentSong(newIndex);
    setIsPlaying(true);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.play();
    }
  }, [currentSong]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 py-20"
    >
      <div className="max-w-4xl mx-auto">

        {/* Audio Element */}
        <audio ref={audioRef} src={playlist[currentSong].src} preload="auto" onEnded={() => changeSong('next')} />

        {/* Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <Music className="mx-auto mb-4 text-purple-600" size={48} />
          <h1 className="text-4xl md:text-5xl font-dancing font-bold text-purple-700 mb-4">
            Songs for Shagufta
          </h1>
          <p className="text-gray-600">A curated playlist of meaningful melodies</p>
        </motion.div>

        {/* Main Player */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">

            {/* Album Art */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 10, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
              className={`w-48 h-48 rounded-full bg-gradient-to-br ${playlist[currentSong].color} flex items-center justify-center shadow-2xl`}
            >
              <div className="w-40 h-40 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Music size={48} className="text-white" />
              </div>
            </motion.div>

            {/* Song Info */}
            <div className="flex-1 text-center md:text-left">
              <motion.h2
                key={currentSong}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-dancing font-bold text-purple-700 mb-2"
              >
                {playlist[currentSong].title}
              </motion.h2>

              <p className="text-xl text-gray-600 mb-2">
                {playlist[currentSong].artist}
              </p>

              <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${playlist[currentSong].color} text-white text-sm font-medium mb-4`}>
                {playlist[currentSong].emotion}
              </div>

              <p className="text-gray-700 italic leading-relaxed">
                {playlist[currentSong].description}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-6 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => changeSong('prev')}
              className="p-3 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
            >
              <SkipBack size={24} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-shadow"
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => changeSong('next')}
              className="p-3 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
            >
              <SkipForward size={24} />
            </motion.button>
          </div>

          {/* Volume UI (non-functional visual only) */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            <Volume2 size={20} className="text-gray-500" />
            <div className="w-32 h-2 bg-gray-200 rounded-full">
              <div className="w-3/4 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* Playlist Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          {playlist.map((song, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, x: 10 }}
              onClick={() => {
                setCurrentSong(index);
                setIsPlaying(true);
              }}
              className={`flex items-center space-x-4 p-4 rounded-2xl cursor-pointer transition-all ${
                index === currentSong
                  ? 'bg-white/80 shadow-lg border-2 border-purple-300'
                  : 'bg-white/40 hover:bg-white/60'
              } backdrop-blur-sm border border-white/30`}
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${song.color} flex items-center justify-center`}>
                <Music size={20} className="text-white" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{song.title}</h3>
                <p className="text-sm text-gray-600">{song.artist} • {song.emotion}</p>
              </div>

              {index === currentSong && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-purple-500"
                >
                  <Music size={20} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 text-sm italic">
            "Music is the language of memories and emotions" 🎵
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
