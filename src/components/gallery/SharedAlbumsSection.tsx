import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderPlus,
  ImagePlus,
  Loader2,
  Trash2,
  X,
  Cloud,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  Maximize2,
} from 'lucide-react';
import { useGalleryAlbums } from '../../lib/useGalleryAlbums';
import { GALLERY_MAX_UPLOAD_BYTES } from '../../lib/galleryRemote';
import type { GalleryPhoto } from '../../lib/galleryTypes';
import { supabaseErrorMessage } from '../../lib/supabaseErrors';
import { withUrlCacheBust } from '../../lib/storageUrl';

function formatPhotoDate(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' });
  } catch {
    return iso;
  }
}

/** Retries image load with cache-bust (helps right after upload / CDN edge). */
function StableStorageImg({
  url,
  bustKey,
  alt,
  className,
}: {
  url: string;
  bustKey: string;
  alt: string;
  className?: string;
}) {
  const [bust, setBust] = useState(0);
  const [fails, setFails] = useState(0);
  const src = withUrlCacheBust(url, `${bustKey}-${bust}`);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (fails < 6) {
          window.setTimeout(() => {
            setFails((c) => c + 1);
            setBust((b) => b + 1);
          }, 300 * (fails + 1));
        }
      }}
    />
  );
}

export function SharedAlbumsSection() {
  const headingId = useId();
  const { albums, loading, error, configured, createAlbum, uploadPhoto, removePhoto, refresh } =
    useGalleryAlbums();

  const [albumModal, setAlbumModal] = useState(false);
  const [albumTitle, setAlbumTitle] = useState('');
  const [savingAlbum, setSavingAlbum] = useState(false);
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [inlineErr, setInlineErr] = useState<string | null>(null);
  const [uploadCaption, setUploadCaption] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [lightbox, setLightbox] = useState<GalleryPhoto | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const maxMb = Math.round(GALLERY_MAX_UPLOAD_BYTES / (1024 * 1024));

  useEffect(() => {
    if (activeAlbumId) return;
    if (albums.length > 0) setActiveAlbumId(albums[0].id);
  }, [albums, activeAlbumId]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const activeAlbum = albums.find((a) => a.id === activeAlbumId) ?? null;
  const photos = activeAlbum?.gallery_photos ?? [];

  const closeAlbumModal = useCallback(() => {
    setAlbumModal(false);
    setAlbumTitle('');
  }, []);

  const submitAlbum = async () => {
    const t = albumTitle.trim();
    if (!t) return;
    setSavingAlbum(true);
    setInlineErr(null);
    try {
      const album = await createAlbum(t);
      setActiveAlbumId(album.id);
      closeAlbumModal();
    } catch (e) {
      setInlineErr(supabaseErrorMessage(e));
    } finally {
      setSavingAlbum(false);
    }
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !activeAlbumId) return;
    setUploading(true);
    setInlineErr(null);
    try {
      await uploadPhoto(activeAlbumId, file, uploadCaption.trim() || undefined);
      setUploadCaption('');
    } catch (e) {
      setInlineErr(supabaseErrorMessage(e));
    } finally {
      setUploading(false);
    }
  };

  if (!configured) {
    return (
      <section
        aria-labelledby={headingId}
        className="lv-glass-panel lv-card-shine mb-12 rounded-[1.75rem] p-6 ring-1 ring-white/45 md:p-8"
      >
        <h2 id={headingId} className="font-dancing text-2xl font-bold text-purple-800">
          Shared albums
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Supabase URL and key are required for uploads everyone can see. Add them in{' '}
          <code className="rounded bg-white/60 px-1 py-0.5 text-xs">src/config/supabasePublic.ts</code> or{' '}
          <code className="rounded bg-white/60 px-1 py-0.5 text-xs">.env</code>.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-labelledby={headingId}
      className="lv-glass-panel lv-card-shine mb-12 rounded-[1.75rem] p-6 ring-1 ring-white/45 md:p-8"
    >
      <div className="flex flex-col gap-4 border-b border-white/30 pb-6 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-cyan-700">
            <Cloud size={18} aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-wide">Live on the site</span>
          </div>
          <h2 id={headingId} className="font-dancing text-3xl font-bold text-purple-800 md:text-4xl">
            Her albums
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600">
            Create an album, then add photos — they upload to shared storage so both of you see the same gallery.
          </p>
          <button
            type="button"
            onClick={() => setShowDetails((v) => !v)}
            className="mt-3 flex items-center gap-1 text-sm font-medium text-purple-700 underline decoration-purple-200 underline-offset-2 hover:text-purple-900"
          >
            {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            Limits · how uploads work
          </button>
          {showDetails && (
            <div className="mt-2 max-w-xl rounded-xl bg-white/70 p-4 text-left text-xs leading-relaxed text-gray-700 ring-1 ring-purple-100/80">
              <ul className="list-inside list-disc space-y-1.5">
                <li>
                  <strong>Per photo:</strong> up to <strong>{maxMb} MB</strong> (JPEG, PNG, WebP, GIF). Larger files are
                  blocked before upload; Supabase may also enforce a project max in Dashboard → Storage.
                </li>
                <li>
                  <strong>Bucket:</strong> <code className="rounded bg-violet-100/80 px-1">luckyverse-gallery</code> — public URLs so the site can show thumbnails.
                </li>
                <li>
                  <strong>Optional caption</strong> below is saved with the next upload only.
                </li>
                <li>
                  Tap a photo for a <strong>larger view</strong>, full caption, date, and copy link.
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setAlbumModal(true)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2.5 text-sm font-medium text-white shadow-md ring-1 ring-white/30"
          >
            <FolderPlus size={18} />
            New album
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!activeAlbumId || uploading || albums.length === 0}
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2.5 text-sm font-medium text-purple-800 ring-1 ring-purple-200/60 transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
          >
            {uploading ? <Loader2 size={18} className="animate-spin" /> : <ImagePlus size={18} />}
            Upload photo
          </motion.button>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={onFile}
          />
          <div className="w-full max-w-xs">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Caption for next photo</p>
            <input
              type="text"
              value={uploadCaption}
              onChange={(e) => setUploadCaption(e.target.value)}
              maxLength={500}
              placeholder="Optional — e.g. home, no filter"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200/40"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex gap-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-950 ring-1 ring-amber-200/80">
          <AlertCircle className="mt-0.5 shrink-0" size={18} />
          <div>
            <p className="font-medium">Albums could not load</p>
            <p className="mt-1 opacity-90">{error}</p>
            <p className="mt-2 text-xs opacity-80">
              In Supabase, run the gallery SQL from <code className="rounded bg-white/70 px-1">.env.example</code> and
              create the public storage bucket <code className="rounded bg-white/70 px-1">luckyverse-gallery</code>.
            </p>
            <button
              type="button"
              onClick={() => void refresh()}
              className="mt-2 text-sm font-semibold text-amber-900 underline underline-offset-2"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {inlineErr && !error && (
        <div className="mt-4 rounded-xl bg-rose-50 px-4 py-2 text-sm text-rose-900 ring-1 ring-rose-200/80">
          {inlineErr}
        </div>
      )}

      {loading && !error && (
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Loader2 className="animate-spin" size={18} />
          Loading albums…
        </div>
      )}

      {!loading && albums.length === 0 && !error && (
        <p className="mt-6 text-center text-sm text-gray-600">
          No albums yet — tap <span className="font-medium text-purple-700">New album</span> to start one (e.g.
          &ldquo;Lucky&rdquo; or &ldquo;Home&rdquo;).
        </p>
      )}

      {albums.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Choose album</p>
          <div className="flex flex-wrap gap-2">
            {albums.map((a) => {
              const active = a.id === activeAlbumId;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setActiveAlbumId(a.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    active
                      ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300/50'
                      : 'bg-white/70 text-purple-800 ring-1 ring-white/60 hover:bg-white'
                  }`}
                >
                  {a.title}
                  <span className="ml-1.5 text-xs opacity-80">({a.gallery_photos.length})</span>
                </button>
              );
            })}
          </div>

          {activeAlbum && (
            <div className="mt-8">
              <h3 className="font-dancing text-xl font-semibold text-purple-800">{activeAlbum.title}</h3>
              {photos.length === 0 ? (
                <p className="mt-3 text-sm text-gray-600">This album is empty — upload a photo above.</p>
              ) : (
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {photos.map((p) => (
                    <li
                      key={p.id}
                      className="group relative overflow-hidden rounded-xl bg-white/40 ring-1 ring-white/50"
                    >
                      <button
                        type="button"
                        onClick={() => setLightbox(p)}
                        className="relative block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                      >
                        <StableStorageImg
                          url={p.public_url}
                          bustKey={p.id}
                          alt={p.caption || 'Album photo'}
                          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="pointer-events-none absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-black/45 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                          <Maximize2 size={12} aria-hidden />
                          View details
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={(ev) => {
                          ev.stopPropagation();
                          if (window.confirm('Remove this photo from the shared album?')) {
                            void removePhoto(p.id, p.storage_path);
                          }
                        }}
                        className="absolute right-2 top-2 rounded-lg bg-black/50 p-1.5 text-white opacity-0 transition-opacity hover:bg-rose-600 group-hover:opacity-100"
                        aria-label="Delete photo"
                      >
                        <Trash2 size={16} />
                      </button>
                      {p.caption ? (
                        <p className="line-clamp-2 p-2 text-xs text-gray-700">{p.caption}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setLightbox(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-white/30 sm:p-6"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <h3 className="font-dancing text-xl font-bold text-purple-800 sm:text-2xl">Photo details</h3>
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                  aria-label="Close"
                >
                  <X size={22} />
                </button>
              </div>
              <StableStorageImg
                url={lightbox.public_url}
                bustKey={lightbox.id}
                alt={lightbox.caption || 'Shared album photo'}
                className="max-h-[55vh] w-full rounded-xl object-contain bg-black/5"
              />
              <p className="mt-2 text-xs text-gray-500">
                If &ldquo;Open original&rdquo; errors once, wait a few seconds and try again — new files can take a
                moment to show everywhere on the network.
              </p>
              <dl className="mt-4 space-y-2 text-sm text-gray-700">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Added</dt>
                  <dd>{formatPhotoDate(lightbox.created_at)}</dd>
                </div>
                {lightbox.caption ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Caption</dt>
                    <dd className="whitespace-pre-wrap leading-relaxed">{lightbox.caption}</dd>
                  </div>
                ) : (
                  <p className="text-sm italic text-gray-500">No caption for this photo.</p>
                )}
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Direct link</dt>
                  <dd className="break-all font-mono text-xs text-violet-800">{lightbox.public_url}</dd>
                </div>
              </dl>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    void navigator.clipboard.writeText(lightbox.public_url);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 ring-1 ring-violet-200/80 hover:bg-violet-200/80"
                >
                  <Copy size={16} />
                  Copy link
                </button>
                <a
                  href={lightbox.public_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-800 ring-1 ring-gray-200 hover:bg-gray-50"
                >
                  Open original
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {albumModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] flex items-end justify-center bg-slate-900/45 p-4 backdrop-blur-sm sm:items-center"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeAlbumModal();
            }}
          >
            <motion.div
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              className="w-full max-w-md rounded-2xl bg-white/95 p-6 shadow-2xl ring-1 ring-white/80"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-dancing text-2xl font-bold text-purple-800">Name the album</h3>
                <button
                  type="button"
                  onClick={closeAlbumModal}
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
              <input
                value={albumTitle}
                onChange={(e) => setAlbumTitle(e.target.value)}
                maxLength={80}
                placeholder="e.g. Lucky — home"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200/50"
                autoFocus
              />
              <div className="mt-5 flex justify-end gap-2">
                <button type="button" onClick={closeAlbumModal} className="lv-btn-ghost text-sm">
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!albumTitle.trim() || savingAlbum}
                  onClick={() => void submitAlbum()}
                  className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  {savingAlbum ? 'Saving…' : 'Create album'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
