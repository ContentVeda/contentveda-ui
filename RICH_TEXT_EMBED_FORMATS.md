# Rich Text Embed Formats

`RichTextEditor` (authoring) and `WysiwygRenderer` (output) are two independent
components (`src/components/RichTextEditor.lite.tsx` /
`src/components/WysiwygRenderer.lite.tsx`) that must agree on one thing: the
shape of the HTML string that passes between them. There is no JSON/AST layer
— the "document" is a sanitized HTML string, and special content (media,
social/video embeds, math, widgets) is encoded as plain HTML elements
identified by a `class` name plus `data-*` attributes. This document is the
contract both components — and anything else that produces or consumes this
HTML (backend validators, migrations, scripts) — must follow.

If you hand-author or migrate content instead of using the editor UI, follow
the exact shapes below. Anything that doesn't match is inert: the renderer
only acts on the specific class name it's listening for.

## 1. Plain media (image / video / audio)

No wrapper needed — standard HTML tags render as-is:

```html
<img src="https://example.com/photo.jpg" alt="Image" />
<video src="https://example.com/clip.mp4" controls></video>
<audio src="https://example.com/track.mp3" controls></audio>
```

The editor's "Insert Video" flow automatically detects YouTube/Vimeo URLs
(see §2) and routes them to a social embed instead of a `<video>` tag; any
other URL becomes a plain `<video src="...">`.

## 2. Social / video embeds

Wrapper element:

```html
<div
  class="cv-social-embed"
  data-platform="youtube"
  data-url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  contenteditable="false"
>[placeholder text — replaced at render time]</div>
```

Required attributes:

| Attribute        | Value                                                              |
|-------------------|---------------------------------------------------------------------|
| `class`           | must include `cv-social-embed` (`social-embed-placeholder` is also accepted for legacy content) |
| `data-platform`   | one of: `youtube`, `vimeo`, `facebook`, `x` / `twitter`, `instagram`, `linkedin` |
| `data-url`        | the original post/video URL (see per-platform notes below); `data-href` is accepted as a fallback if `data-url` is absent |

The element's inner content is only a placeholder — `WysiwygRenderer` clears
it and injects the real embed (iframe, blockquote + SDK script, etc.) on
mount. Anything you put inside is not shown to end users.

### Per-platform URL formats

**YouTube** (`data-platform="youtube"`) — any of these resolve to a video ID:
- `https://www.youtube.com/watch?v=VIDEOID`
- `https://youtu.be/VIDEOID`
- `https://www.youtube.com/embed/VIDEOID`
- `https://www.youtube.com/shorts/VIDEOID`

If no video ID can be extracted, the renderer falls back to a plain "View
Video on YouTube" link.

**Vimeo** (`data-platform="vimeo"`) — numeric video ID required:
- `https://vimeo.com/VIDEOID`
- `https://vimeo.com/video/VIDEOID`

Non-numeric/unlisted Vimeo URLs (e.g. review-page links) won't match and
fall back to a plain link — use the direct numeric video URL.

**X / Twitter** (`data-platform="x"` or `data-platform="twitter"`):
- Any `https://x.com/...` or `https://twitter.com/.../status/...` post URL.
- Renders as a `twitter-tweet` blockquote loaded via `platform.twitter.com/widgets.js`.

**Instagram** (`data-platform="instagram"`):
- Any public post/reel URL, e.g. `https://www.instagram.com/p/POSTID/`.
- Renders via `instagram-media` blockquote + `instagram.com/embed.js`.

**Facebook** (`data-platform="facebook"`):
- Any public post URL, e.g. `https://www.facebook.com/PAGE/posts/ID`.
- Renders via the Facebook `fb-post` XFBML plugin + `connect.facebook.net` SDK.

**LinkedIn** (`data-platform="linkedin"`):
- A share/post URL containing `/post/`, e.g.
  `https://www.linkedin.com/posts/company_activity-1234567890`.
- The renderer rewrites `/post/` → `/embed/feed/update/` automatically. If
  you already have an `/embed/...` URL, pass it as-is and it's used unchanged.

### Using the editor UI

- **Insert → Social Embed** (the speech-bubble icon) opens a modal where you
  pick a platform and paste a URL — it writes the `cv-social-embed` div for
  you, auto-detecting `youtube`/`vimeo` from the URL even if you picked a
  different platform in the dropdown.
- **Insert → Video** auto-detects YouTube/Vimeo links from a plain URL prompt
  and produces the same `cv-social-embed` markup; any other URL becomes a
  plain `<video>` tag (see §1).

## 3. Math formulas

```html
<code
  class="cv-math-formula"
  data-formula="E = mc^2"
  contenteditable="false"
>E = mc^2</code>
```

- `data-formula` holds the raw LaTeX/formula string (HTML-escaped: `&`, `<`,
  `>`, `"`). The renderer reads `data-formula` first, falling back to the
  element's text content if the attribute is missing.
- `WysiwygRenderer` lazy-loads KaTeX (`katex.min.js` / `katex.min.css` from
  jsDelivr) and calls `katex.renderToString(formula, { throwOnError: false })`,
  replacing the element's content with the rendered math. If KaTeX fails to
  parse the formula, the raw text stays visible (non-fatal).
- In the editor's own WYSIWYG surface, the formula is shown as plain text
  (not live-rendered) — same as social embeds and widgets, which also show a
  placeholder in-editor and only render fully in `WysiwygRenderer`'s output.
  Use **Insert → Fx** to add one interactively.

## 4. Widgets (embedded ContentVeda components)

```html
<div
  class="cv-widget"
  data-widget="banner"
  contenteditable="false"
>[placeholder text]</div>
```

- `data-widget` must match `^[a-z0-9-]+$` and names a ContentVeda web
  component: the renderer instantiates `<cv-{data-widget}>` (e.g.
  `data-widget="banner"` → `<cv-banner>`, `data-widget="grid-banner"` →
  `<cv-grid-banner>`).
- If the host page passes a `widgetData` prop to `WysiwygRenderer`, only
  widget types present as keys in `widgetData` are rendered — others are
  left untouched (useful for gating which widgets are "live" per page). Omit
  `widgetData` (or pass `undefined`) to render every widget unconditionally.
- Object/array values in `widgetData[type]` are set on the custom element as
  JSON-stringified attributes; primitives are set as plain string attributes
  (camelCase keys are converted to kebab-case, e.g. `backgroundImageUrl` →
  `background-image-url`).

## 5. Sanitization notes

`RichTextEditor.sanitizeHtml()` (DOMPurify) explicitly allowlists the
attributes this contract depends on. If you extend the contract with a new
`data-*` attribute, add it to `ADD_ATTR` in
`src/components/RichTextEditor.lite.tsx` or DOMPurify will silently strip it
on every visual/source mode toggle and on initial mount — the classic
symptom is "it works right after inserting, but disappears after a save/reload
round-trip through the editor."

Currently allowlisted: `data-platform`, `data-url`, `data-widget`,
`data-formula`, plus structural attributes (`contenteditable`, `allow`,
`allowfullscreen`, `frameborder`, `controls`, etc.) needed for the embeds
above.
