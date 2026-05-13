import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Grid3X3, Image as ImageIcon, LayoutGrid, Maximize2, Plus, X } from 'lucide-react';
import type { GalleryCategory, GalleryManifest, ManifestGalleryItem } from '../../types/gallery';
import { deleteGalleryItem, listGalleryUploads, saveGalleryItem, type StoredGalleryItem } from '../../lib/galleryStore';

const CATEGORY_LABEL: Record<GalleryCategory, string> = {
  nimas: 'NIMAS memories',
  mountains: 'Mountains',
  travel: 'Future travel',
  cinematic: 'Cinematic',
  birthday: 'Birthday',
  moments: 'Emotional moments',
};

type ViewMode = 'grid' | 'polaroid' | 'scrapbook';

type DisplayItem = {
  key: string;
  src: string;
  title: string;
  caption?: string;
  category: GalleryCategory;
  fromUpload?: boolean;
};

async function loadManifest(): Promise<ManifestGalleryItem[]> {
  try {
    const res = await fetch('/gallery-manifest.json', { cache: 'no-store' });
    if (!res.ok) return [];
    const json = (await res.json()) as GalleryManifest;
    return json.items ?? [];
  } catch {
    return [];
  }
}

export function MemoryGallery() {
  const [manifest, setManifest] = useState<ManifestGalleryItem[]>([]);
  const [uploads, setUploads] = useState<StoredGalleryItem[]>([]);
  const [cat, setCat] = useState<GalleryCategory | 'all'>('all');
  const [mode, setMode] = useState<ViewMode>('grid');
  const [lightbox, setLightbox] = useState<DisplayItem | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const refresh = useCallback(async () => {
    const [m, u] = await Promise.all([loadManifest(), listGalleryUploads()]);
    setManifest(m);
    setUploads(u);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const items: DisplayItem[] = useMemo(() => {
    const fromManifest: DisplayItem[] = manifest.map((it) => ({
      key: `m-${it.id}`,
      src: it.src,
      title: it.title,
      caption: it.caption,
      category: it.category,
    }));
    const fromDb: DisplayItem[] = uploads.map((u) => ({
      key: `u-${u.id}`,
      src: u.dataUrl,
      title: u.title,
      category: u.category,
      fromUpload: true,
    }));
    return [...fromDb, ...fromManifest];
  }, [manifest, uploads]);

  const filtered = useMemo(
    () => (cat === 'all' ? items : items.filter((i) => i.category === cat)),
    [items, cat],
  );

  const onFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const file = Array.from(files).find((f) => f.type.startsWith('image/'));
    if (!file) return;
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
    const item: StoredGalleryItem = {
      id: crypto.randomUUID(),
      category: 'moments',
      title: file.name.replace(/\.[^/.]+$/, ''),
      createdAt: Date.now(),
      dataUrl,
    };
    await saveGalleryItem(item);
    await refresh();
  };

  const cats = Object.keys(CATEGORY_LABEL) as GalleryCategory[];

  return (
    <div className="px-4 pb-28 pt-6 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-lv-muted">Gallery</p>
          <h1 className="mt-2 font-display text-4xl text-lv-text sm:text-5xl">Scrapbook, not slideshow</h1>
          <p className="mt-3 max-w-2xl text-lv-muted">
            Add images locally — they stay on this device (IndexedDB). For curated sets, place files under{' '}
            <code className="text-lv-text/80">public/images/</code> and reference them in{' '}
            <code className="text-lv-text/80">public/gallery-manifest.json</code>.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMode('grid')}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.14em] ${
              mode === 'grid' ? 'border-lv-campfire/50 bg-white/10 text-lv-text' : 'border-white/10 text-lv-muted'
            }`}
          >
            <Grid3X3 className="h-3.5 w-3.5" />
            Grid
          </button>
          <button
            type="button"
            onClick={() => setMode('polaroid')}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.14em] ${
              mode === 'polaroid' ? 'border-lv-campfire/50 bg-white/10 text-lv-text' : 'border-white/10 text-lv-muted'
            }`}
          >
            <ImageIcon className="h-3.5 w-3.5" />
            Polaroid
          </button>
          <button
            type="button"
            onClick={() => setMode('scrapbook')}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.14em] ${
              mode === 'scrapbook' ? 'border-lv-campfire/50 bg-white/10 text-lv-text' : 'border-white/10 text-lv-muted'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Scrapbook
          </button>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCat('all')}
          className={`rounded-full px-3 py-1 text-xs ${cat === 'all' ? 'bg-white/10 text-lv-text' : 'text-lv-muted'}`}
        >
          All
        </button>
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`rounded-full px-3 py-1 text-xs ${cat === c ? 'bg-white/10 text-lv-text' : 'text-lv-muted'}`}
          >
            {CATEGORY_LABEL[c]}
          </button>
        ))}
      </div>

      <div
        className={`mx-auto mt-8 max-w-6xl rounded-[2rem] border border-dashed border-white/15 p-6 transition ${
          dragOver ? 'border-lv-campfire/50 bg-lv-campfire/5' : 'bg-white/[0.02]'
        }`}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragOver(false);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          void onFiles(e.dataTransfer.files);
        }}
      >
        <label className="flex cursor-pointer flex-col items-center gap-2 text-center text-sm text-lv-muted">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => void onFiles(e.target.files)}
          />
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-lv-text transition hover:bg-white/10">
            <Plus className="h-4 w-4" />
            Drop an image here, or tap to upload
          </span>
          <span className="text-xs text-lv-muted/80">Stored privately in your browser for this site.</span>
        </label>
      </div>

      <div
        className={`mx-auto mt-10 grid max-w-6xl gap-5 ${
          mode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : mode === 'polaroid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'columns-1 gap-6 sm:columns-2 lg:columns-3'
        }`}
      >
        {filtered.map((it) => (
          <motion.figure
            layout
            key={it.key}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            whileHover={{
              rotate: mode === 'scrapbook' ? ((it.key.charCodeAt(2) % 5) - 2) * 0.45 : 0,
              y: -2,
            }}
            className={`group relative break-inside-avoid ${
              mode === 'polaroid'
                ? 'rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-3 pb-8 shadow-glow'
                : 'overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]'
            }`}
          >
            <button type="button" className="block w-full text-left" onClick={() => setLightbox(it)}>
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={it.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[10px] text-white/80 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                  <Maximize2 className="h-3 w-3" />
                  View
                </span>
              </div>
            </button>
            <figcaption className="mt-3 px-1">
              <p className="font-display text-lg text-lv-text">{it.title}</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-lv-muted">{CATEGORY_LABEL[it.category]}</p>
              {it.caption && <p className="mt-1 text-sm text-lv-muted">{it.caption}</p>}
              {it.fromUpload && (
                <button
                  type="button"
                  className="mt-2 text-xs text-lv-campfireSoft underline-offset-2 hover:underline"
                  onClick={async () => {
                    const id = it.key.replace('u-', '');
                    await deleteGalleryItem(id);
                    await refresh();
                  }}
                >
                  Remove from this device
                </button>
              )}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-lv-muted">
          No images yet. Add files to <code className="text-lv-text/80">public/images/&lt;category&gt;/</code> and reference
          them in <code className="text-lv-text/80">gallery-manifest.json</code>, or upload above.
        </p>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90dvh] max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-lv-night shadow-glow"
            >
              <button
                type="button"
                className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-black/40 p-2 text-white backdrop-blur-md"
                onClick={() => setLightbox(null)}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <img src={lightbox.src} alt="" className="max-h-[80dvh] w-full object-contain" />
              <div className="border-t border-white/10 p-4">
                <p className="font-display text-2xl text-lv-text">{lightbox.title}</p>
                {lightbox.caption && <p className="mt-1 text-sm text-lv-muted">{lightbox.caption}</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
