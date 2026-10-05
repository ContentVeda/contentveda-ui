// Generic renderer for a custom content type's entries: every field of entry.data, with media
// fields as images/videos and HTML strings as rich text. Copy this per content type (branch on
// block.contentType.name in BlockRenderer) for a bespoke design. Mirrors the SvelteKit starter.
// @ts-ignore — the package ships JS without type declarations for these entry points
import WysiwygRenderer from '@contentveda/ui/react/WysiwygRenderer';
import type { ContentBlock } from '@/lib/contentveda';
import { mediaUrl } from '@/lib/media';

type MediaLike = { url: string; type?: string; altText?: string };
const isMedia = (v: unknown): v is MediaLike =>
  !!v && typeof v === 'object' && typeof (v as any).url === 'string';
const isHtml = (v: unknown): v is string => typeof v === 'string' && /<[a-z][\s\S]*>/i.test(v);
const label = (key: string) => key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ');

const isEntry = (v: unknown): v is { id: string; name: string; data?: Record<string, unknown> } =>
  !!v && typeof v === 'object' && typeof (v as any).id === 'string' && typeof (v as any).name === 'string' && 'data' in (v as any);
// A populated relation: the referenced entry's label plus its own fields, nested relations inline.
function describe(v: unknown): string {
  if (isEntry(v)) {
    const parts = Object.entries(v.data || {})
      .filter(([, x]) => x !== null && x !== undefined && x !== '')
      .map(([k, x]) => `${label(k)}: ${isEntry(x) || Array.isArray(x) ? describe(x) : isMedia(x) ? '[media]' : String(x)}`);
    return parts.length ? `${v.name} (${parts.join(', ')})` : v.name;
  }
  if (Array.isArray(v)) return v.map(describe).join(', ');
  return v && typeof v === 'object' ? JSON.stringify(v) : String(v);
}
const hasEntry = (v: unknown) => isEntry(v) || (Array.isArray(v) && v.some(isEntry));

function Field({ name, value }: { name: string; value: unknown }) {
  if (isMedia(value)) {
    const src = mediaUrl(value.url);
    return value.type === 'video' || src.endsWith('.mp4') ? (
      <video src={src} controls playsInline className="cv-custom-media" />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="cv-custom-media" src={src} alt={value.altText || name} loading="lazy" />
    );
  }
  if (hasEntry(value)) return <>{describe(value)}</>;
  if (isHtml(value)) return <WysiwygRenderer content={value} htmlContent={value} />;
  if (Array.isArray(value)) {
    return <>{value.map((v) => (typeof v === 'object' ? JSON.stringify(v) : String(v))).join(', ')}</>;
  }
  if (value && typeof value === 'object') return <code>{JSON.stringify(value)}</code>;
  return <>{String(value)}</>;
}

export default function CustomEntries({ block }: { block: ContentBlock }) {
  const entries = block.contentType?.entries || [];
  const row = block.contentType?.kind === 'collection';
  return (
    <div
      className={`cv-custom-entries${row ? ' cv-custom-entries-row' : ''}`}
      data-cv-content-type={block.contentType?.name}
    >
      {entries.map((entry) => (
        <article className="cv-custom-entry" key={entry.id}>
          {isMedia(entry.media) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="cv-custom-media" src={mediaUrl(entry.media.url)} alt={entry.media.altText || entry.name} loading="lazy" />
          ) : null}
          <h3>{entry.name}</h3>
          <dl>
            {Object.entries(entry.data || {}).map(([key, value]) =>
              value === null || value === undefined || value === '' ? null : (
                <div className="cv-custom-field" data-field={key} key={key}>
                  <dt>{label(key)}</dt>
                  <dd><Field name={key} value={value} /></dd>
                </div>
              )
            )}
          </dl>
        </article>
      ))}
    </div>
  );
}
