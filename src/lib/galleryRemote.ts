import { getSupabaseClient } from './supabaseClient';
import { supabaseErrorMessage } from './supabaseErrors';
import type { GalleryAlbum, GalleryPhoto } from './galleryTypes';

export const GALLERY_BUCKET = 'luckyverse-gallery';

/** Max file size for gallery uploads (client check). Supabase project may enforce a lower cap in Dashboard. */
export const GALLERY_MAX_UPLOAD_BYTES = 50 * 1024 * 1024;

type PhotoRow = {
  id: string;
  album_id: string;
  storage_path: string;
  public_url: string;
  caption: string | null;
  created_at: string;
};

type AlbumRow = {
  id: string;
  title: string;
  created_at: string;
  gallery_photos: PhotoRow[] | null;
};

function normalizePhoto(row: PhotoRow): GalleryPhoto {
  return {
    id: row.id,
    album_id: row.album_id,
    storage_path: row.storage_path,
    public_url: row.public_url,
    caption: row.caption ?? '',
    created_at: row.created_at,
  };
}

function normalizeAlbum(row: AlbumRow): GalleryAlbum {
  const photos = (row.gallery_photos ?? [])
    .map(normalizePhoto)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return {
    id: row.id,
    title: row.title,
    created_at: row.created_at,
    gallery_photos: photos,
  };
}

export async function fetchAlbumsWithPhotos(): Promise<GalleryAlbum[]> {
  const sb = getSupabaseClient();
  if (!sb) return [];
  const { data, error } = await sb
    .from('gallery_albums')
    .select(
      `
      id,
      title,
      created_at,
      gallery_photos (
        id,
        album_id,
        storage_path,
        public_url,
        caption,
        created_at
      )
    `,
    )
    .order('created_at', { ascending: false });
  if (error) throw new Error(supabaseErrorMessage(error));
  return ((data ?? []) as AlbumRow[]).map(normalizeAlbum);
}

export async function createAlbum(title: string): Promise<GalleryAlbum> {
  const sb = getSupabaseClient();
  if (!sb) throw new Error('Supabase is not configured');
  const trimmed = title.trim();
  if (!trimmed) throw new Error('Album name is required');
  const { data, error } = await sb
    .from('gallery_albums')
    .insert({ title: trimmed })
    .select('id, title, created_at')
    .single();
  if (error) throw new Error(supabaseErrorMessage(error));
  return {
    id: data.id,
    title: data.title,
    created_at: data.created_at,
    gallery_photos: [],
  };
}

const ALLOWED_EXT = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif']);

export async function uploadGalleryPhoto(albumId: string, file: File, caption?: string): Promise<GalleryPhoto> {
  const sb = getSupabaseClient();
  if (!sb) throw new Error('Supabase is not configured');
  if (!file.type.startsWith('image/')) throw new Error('Please choose an image file');
  if (file.size > GALLERY_MAX_UPLOAD_BYTES) {
    throw new Error(
      `Image must be ${Math.round(GALLERY_MAX_UPLOAD_BYTES / (1024 * 1024))}MB or smaller (your file is ${(file.size / (1024 * 1024)).toFixed(1)}MB).`,
    );
  }

  const rawExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const ext = ALLOWED_EXT.has(rawExt) ? rawExt : 'jpg';
  const path = `${albumId}/${crypto.randomUUID()}.${ext}`;

  const { error: upErr } = await sb.storage.from(GALLERY_BUCKET).upload(path, file, {
    contentType: file.type || `image/${ext}`,
    cacheControl: '3600',
    upsert: false,
  });
  if (upErr) throw new Error(supabaseErrorMessage(upErr));

  const { data: pub } = sb.storage.from(GALLERY_BUCKET).getPublicUrl(path);
  const publicUrl = pub.publicUrl;

  const { data: row, error: rowErr } = await sb
    .from('gallery_photos')
    .insert({
      album_id: albumId,
      storage_path: path,
      public_url: publicUrl,
      caption: (caption ?? '').trim(),
    })
    .select('id, album_id, storage_path, public_url, caption, created_at')
    .single();
  if (rowErr) throw new Error(supabaseErrorMessage(rowErr));
  return normalizePhoto(row as PhotoRow);
}

export async function deleteGalleryPhoto(photoId: string, storagePath: string): Promise<void> {
  const sb = getSupabaseClient();
  if (!sb) throw new Error('Supabase is not configured');
  const { error } = await sb.from('gallery_photos').delete().eq('id', photoId);
  if (error) throw new Error(supabaseErrorMessage(error));
  const { error: rmErr } = await sb.storage.from(GALLERY_BUCKET).remove([storagePath]);
  if (rmErr) throw new Error(supabaseErrorMessage(rmErr));
}

export function subscribeGallery(onChange: () => void): () => void {
  const sb = getSupabaseClient();
  if (!sb) return () => {};

  const channel = sb
    .channel('luckyverse_gallery')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_albums' }, () => {
      onChange();
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_photos' }, () => {
      onChange();
    })
    .subscribe();

  return () => {
    void sb.removeChannel(channel);
  };
}
