import { env } from '$env/dynamic/public';
import type { Media } from './contentveda';

/** Resolves a stored media reference (absolute URL, root path or bare file id) to a URL. */
export function mediaUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (/^https?:\/\//.test(path)) return path;
  const base = env.PUBLIC_CV_MEDIA_URL || '__CV_MEDIA_URL__';
  // The CMS stores uploads as root paths (/api/v1/media/files/...). Left as-is they would
  // resolve against *this* app's origin and 404, so anchor them to the media host instead.
  if (path.startsWith('/')) {
    try {
      return new URL(path, base).toString();
    } catch {
      return path;
    }
  }
  return `${base.replace(/\/$/, '')}/${path}`;
}

/** The { url, type } shape @contentveda/ui components take (gifs are plain images). */
export function uiMedia(media: Media | null | undefined) {
  if (!media) return undefined;
  const url = mediaUrl(media.url);
  return { url, type: media.type === 'video' || url.endsWith('.mp4') ? ('video' as const) : ('image' as const) };
}
