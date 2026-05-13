import { useCallback, useEffect, useState } from 'react';
import type { GalleryAlbum } from './galleryTypes';
import {
  createAlbum as createAlbumRemote,
  deleteGalleryPhoto,
  fetchAlbumsWithPhotos,
  subscribeGallery,
  uploadGalleryPhoto,
} from './galleryRemote';
import { isSupabaseConfigured } from './supabaseClient';
import { supabaseErrorMessage } from './supabaseErrors';

export function useGalleryAlbums() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const configured = isSupabaseConfigured();

  const refresh = useCallback(async () => {
    if (!configured) {
      setAlbums([]);
      setLoading(false);
      return;
    }
    try {
      setError(null);
      const data = await fetchAlbumsWithPhotos();
      setAlbums(data);
    } catch (e) {
      setError(supabaseErrorMessage(e) || 'Could not load shared albums');
    } finally {
      setLoading(false);
    }
  }, [configured]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (!configured) return () => {};
    return subscribeGallery(() => {
      void refresh();
    });
  }, [configured, refresh]);

  const createAlbum = useCallback(
    async (title: string) => {
      const album = await createAlbumRemote(title);
      await refresh();
      return album;
    },
    [refresh],
  );

  const uploadPhoto = useCallback(
    async (albumId: string, file: File, caption?: string) => {
      await uploadGalleryPhoto(albumId, file, caption);
      await refresh();
    },
    [refresh],
  );

  const removePhoto = useCallback(
    async (photoId: string, storagePath: string) => {
      await deleteGalleryPhoto(photoId, storagePath);
      await refresh();
    },
    [refresh],
  );

  return {
    albums,
    loading,
    error,
    configured,
    refresh,
    createAlbum,
    uploadPhoto,
    removePhoto,
  };
}
