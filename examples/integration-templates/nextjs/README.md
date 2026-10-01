# __CV_PAGE_TITLE__ — Next.js + ContentVeda

Renders the ContentVeda page **`/__CV_SLUG__`** (platform `__CV_PLATFORM__`) with
[`@contentveda/ui`](https://www.npmjs.com/package/@contentveda/ui) components, fetched in
server components over the **__CV_API_MODE_LABEL__** API (App Router, ISR every 60s).

## Run it

```bash
npm install
# paste your API key into CV_API_KEY in .env.local
npm run dev
```

Open http://localhost:3000 — `/` shows `/__CV_SLUG__`, and any other page slug is served at `/<slug>`.

## Where things live

| File | What it does |
| --- | --- |
| `src/lib/blocks.ts` | Normalises blocks, widgets and custom types into one shape |
| `src/lib/contentveda.ts` | REST / GraphQL client (`CV_API_MODE` switches between them) |
| `src/lib/config.ts` | Reads env vars; the API key stays on the server |
| `src/components/BlockRenderer.tsx` | Maps each content block type to a `@contentveda/ui` component |
| `src/app/page.tsx` | Renders the default page |
| `src/app/[...slug]/page.tsx` | Renders any other page by slug |
| `src/app/api/cv/page/[...slug]/route.ts` | Same-origin proxy for browser code; adds the keys server-side |
| `src/lib/client.ts` | `getPage(slug)` for client components; calls the proxy |

## What gets rendered

- **Blocks**: hero, announcement, sliders, grids, scrollers, timers and rich text map to the matching `@contentveda/ui` component.
- **Widgets**: a floor that points at a widget gets the live widget inlined as `block.widget`. Its type, banners, slider/layout config, header text and countdown are used when the block itself doesn't set them (see `src/lib/blocks.ts`).
- **Custom content types**: floors with `contentType` + `entries` render through `CustomContentBlock`. Branch on `block.contentType` in the block renderer to give a type its own component.
- **Menus**: the page's `navigation` slots render as a header (`header`, falling back to `mobile`) and a footer (`footer`). Items that link to CMS pages go to `/<pageSlug>`, which the catch-all route serves.

## Fetching from the browser

Pages are fetched on the server, including during client-side navigation. When browser code needs page data (client refresh, previews, infinite floors), call `getPage(slug)` from `src/lib/client.ts`. It goes through this app's own `/api/cv/page/<slug>` route, so the tenant key and API key never leave the server. Don't import `fetchPage` into browser code.
