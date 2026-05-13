/** Avoid stale edge/CDN responses right after upload. */
export function withUrlCacheBust(url: string, seed: string): string {
  if (!url) return url;
  const sep = url.includes('?') ? '&' : '?';
  const safe = encodeURIComponent(seed).slice(0, 80);
  return `${url}${sep}lv=${safe}`;
}
