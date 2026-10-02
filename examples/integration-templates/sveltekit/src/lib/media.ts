import { env } from '$env/dynamic/public';
import type { Media } from './contentveda';

/** Resolves a stored media reference (absolute URL, root path or bare file id) to a URL. */
export function mediaUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (/^https?:\/\//.test(path) || path.startsWith('/')) return path;
  const base = env.PUBLIC_CV_MEDIA_URL || '__CV_MEDIA_URL__';
  return `${base.replace(/\/$/, '')}/${path}`;
}

/** The { url, type } shape @contentveda/ui components take (gifs are plain images). */
export function uiMedia(media: Media | null | undefined) {
  if (!media) return undefined;
  const url = mediaUrl(media.url);
  return { url, type: media.type === 'video' || url.endsWith('.mp4') ? ('video' as const) : ('image' as const) };
}
