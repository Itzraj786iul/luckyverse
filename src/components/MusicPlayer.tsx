import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, Loader2, AlertCircle } from 'lucide-react';
import { CardSpotlight } from './ui/CardSpotlight';

/** Royalty-free instrumental streams (SoundHelix) — playable in-browser; swap `src` for your own files anytime. */
const PLAYLIST = [
  {
    title: 'River mist',
    artist: 'SoundHelix (demo stream)',
    emotion: 'Open road',
    color: 'from-blue-400 to-purple-500',
    description: 'Windows-down energy — long drift, no pretending it is a movie.',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    title: 'Night ridge',
    artist: 'SoundHelix (demo stream)',
    emotion: 'Late night roads',
    color: 'from-purple-500 to-pink-500',
    description: 'When the playlist is too honest and you press play anyway.',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    title: 'Paper lanterns',
    artist: 'SoundHelix (demo stream)',
    emotion: 'Easy morning',
    color: 'from-emerald-400 to-sky-500',
    description: 'Soft light, no performance — just breathing through the day.',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    title: 'Kitchen spin',
    artist: 'SoundHelix (demo stream)',
    emotion: 'Kitchen-dance energy',
    color: 'from-orange-400 to-rose-500',
    description: 'Laughing loud on purpose because the week was too serious.',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    title: 'Slow aurora',
    artist: 'SoundHelix (demo stream)',
    emotion: 'Instrumental drift',
    color: 'from-pink-400 to-violet-500',
    description: 'No lyrics required — background for thinking less hard.',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
  {
    title: 'Last bus home',
    artist: 'SoundHelix (demo stream)',
    emotion: 'Quiet exit',
    color: 'from-indigo-400 to-fuchsia-500',
    description: 'Headphones still in, city lights doing that unfair pretty thing.',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
] as const;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const song = PLAYLIST[currentSong];

  const safePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      setError(null);
      await audio.play();
      setIsPlaying(true);
    } catch {
      setError('Playback blocked or stream failed — tap play again, or check your connection.');
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      void safePlay();
    }
  };

  const changeSong = useCallback((direction: 'next' | 'prev') => {
    setCurrentSong((prev) => {
      const len = PLAYLIST.length;
      return direction === 'next' ? (prev + 1) % len : (prev - 1 + len) % len;
    });
    setIsPlaying(true);
    setError(null);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const onWait = () => setWaiting(true);
    const onPlaying = () => setWaiting(false);
    const onEnded = () => changeSong('next');
    const onError = () => {
      setError('Could not load this stream. Try another track or check your network.');
      setIsPlaying(false);
      setWaiting(false);
    };

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('waiting', onWait);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('waiting', onWait);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [changeSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTime(0);
    setDuration(0);
    setWaiting(true);

    const onCanPlay = () => {
      setWaiting(false);
      if (isPlaying) void safePlay();
    };

    audio.addEventListener('canplay', onCanPlay, { once: true });
    audio.load();
    if (audio.readyState >= 3 && isPlaying) void safePlay();

    return () => {
      audio.removeEventListener('canplay', onCanPlay);
    };
  }, [currentSong, isPlaying, safePlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!isPlaying) audio.pause();
  }, [isPlaying]);

  const seek = (ratio: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = Math.max(0, Math.min(duration, ratio * duration));
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 pb-28 pt-20"
    >
      <audio key={song.src} ref={audioRef} src={song.src} preload="metadata" />

      <div className="mx-auto max-w-4xl">
        <motion.header
          initial={{ y: -36, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lv-glass-panel lv-card-shine mb-10 rounded-[2rem] px-6 py-10 text-center ring-1 ring-white/45"
        >
          <span className="lv-kicker mb-3 inline-block">Live streams · tap play</span>
          <Music className="mx-auto mb-4 text-purple-600" size={44} />
          <h1 className="mb-2 font-dancing text-4xl font-bold text-purple-800 md:text-5xl">Luckyverse playlist</h1>
          <p className="mx-auto max-w-lg text-balance text-sm text-gray-600 md:text-base">
            Soft mood tracks stream in your browser (royalty-free SoundHelix demos). Replace URLs in{' '}
            <code className="rounded bg-white/60 px-1 text-xs text-purple-800">MusicPlayer.tsx</code> with your own
            MP3s anytime.
          </p>
        </motion.header>

        <AnimatePresence mode="wait">
          {error ? (
            <motion.div
              key="err"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200/70 bg-rose-50/80 px-4 py-3 text-sm text-rose-900"
            >
              <AlertCircle className="mt-0.5 shrink-0" size={18} />
              <span>{error}</span>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lv-glass-panel lv-card-shine mb-8 overflow-hidden rounded-[2rem] p-6 shadow-2xl ring-1 ring-white/45 md:p-10"
        >
          <CardSpotlight className="rounded-[1.75rem]">
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-10">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 14, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
                className={`relative flex h-44 w-44 shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-2xl ring-4 ring-white/50 md:h-52 md:w-52 ${song.color}`}
              >
                <div className="absolute inset-2 rounded-full bg-white/25 backdrop-blur-md" />
                <Music size={52} className="relative text-white drop-shadow-md md:size-14" />
                {waiting ? (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/15">
                    <Loader2 className="animate-spin text-white" size={28} />
                  </div>
                ) : null}
              </motion.div>

              <div className="min-w-0 flex-1 text-center md:text-left">
                <motion.h2
                  key={song.title}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                  className="font-dancing text-3xl font-bold text-purple-800 md:text-4xl"
                >
                  {song.title}
                </motion.h2>
                <p className="mt-1 text-lg text-gray-600">{song.artist}</p>
                <div
                  className={`mx-auto mt-3 inline-block rounded-full bg-gradient-to-r px-4 py-1.5 text-xs font-semibold text-white shadow-sm md:mx-0 ${song.color}`}
                >
                  {song.emotion}
                </div>
                <p className="mt-4 text-pretty text-sm italic leading-relaxed text-gray-700 md:text-base">
                  {song.description}
                </p>

                {/* Progress */}
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={(e) => {
                      const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                      const ratio = (e.clientX - rect.left) / rect.width;
                      seek(ratio);
                    }}
                    className="group relative h-2.5 w-full cursor-pointer overflow-hidden rounded-full bg-white/50 ring-1 ring-white/50"
                    aria-label="Seek"
                  >
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-400"
                      style={{ width: `${progress}%` }}
                    />
                  </button>
                  <div className="mt-1 flex justify-between text-xs tabular-nums text-purple-900/50">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <motion.button
                type="button"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => changeSong('prev')}
                className="rounded-full bg-white/70 p-3 text-purple-700 shadow-sm ring-1 ring-white/60 transition hover:bg-white"
              >
                <SkipBack size={24} />
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={togglePlay}
                className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-5 text-white shadow-lg shadow-purple-500/30 ring-2 ring-white/40"
              >
                {isPlaying ? <Pause size={36} /> : <Play size={36} className="ml-0.5" />}
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => changeSong('next')}
                className="rounded-full bg-white/70 p-3 text-purple-700 shadow-sm ring-1 ring-white/60 transition hover:bg-white"
              >
                <SkipForward size={24} />
              </motion.button>
            </div>

            <div className="mx-auto mt-8 flex max-w-md items-center gap-3 md:mx-0">
              <Volume2 size={20} className="shrink-0 text-purple-800/50" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.02}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="h-2 flex-1 cursor-pointer accent-purple-600"
                aria-label="Volume"
              />
            </div>
          </CardSpotlight>
        </motion.div>

        <motion.div
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-3"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-purple-900/40">Queue</p>
          {PLAYLIST.map((track, index) => (
            <motion.button
              key={track.src}
              type="button"
              layout
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * index }}
              whileHover={{ scale: 1.01, x: 6 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                setCurrentSong(index);
                setIsPlaying(true);
                setError(null);
              }}
              className={`flex w-full cursor-pointer items-center gap-4 rounded-2xl border p-4 text-left transition-all ring-1 ${
                index === currentSong
                  ? 'lv-glass-panel border-purple-400/50 shadow-md ring-purple-200/60'
                  : 'border-white/35 bg-white/40 hover:bg-white/65 hover:shadow-md'
              } backdrop-blur-md`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${track.color}`}
              >
                <Music size={20} className="text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900">{track.title}</h3>
                <p className="truncate text-sm text-gray-600">
                  {track.emotion} · {track.artist}
                </p>
              </div>
              {index === currentSong && isPlaying ? (
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="shrink-0 rounded-full bg-purple-500/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-purple-700"
                >
                  Playing
                </motion.span>
              ) : null}
            </motion.button>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-10 text-center text-sm italic text-gray-600"
        >
          Music is mostly timing — like camp week, honestly 🎵
        </motion.p>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
