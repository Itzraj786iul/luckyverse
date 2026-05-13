export type GalleryPhoto = {
  id: string;
  album_id: string;
  storage_path: string;
  public_url: string;
  caption: string;
  created_at: string;
};

export type GalleryAlbum = {
  id: string;
  title: string;
  created_at: string;
  gallery_photos: GalleryPhoto[];
};
