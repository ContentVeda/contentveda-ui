import { env } from '$env/dynamic/public';

/** Resolves a stored media reference (absolute URL, root path or bare file id) to a URL. */
export function mediaUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (/^https?:\/\//.test(path) || path.startsWith('/')) return path;
  const base = env.PUBLIC_CV_MEDIA_URL || '__CV_MEDIA_URL__';
  return `${base.replace(/\/$/, '')}/${path}`;
}

export function bannerMedia(image?: string | null) {
  const url = mediaUrl(image);
  return { url, type: url.endsWith('.mp4') ? ('video' as const) : ('image' as const) };
}
