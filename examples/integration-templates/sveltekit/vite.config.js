import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  // @contentveda/ui ships .svelte sources — let the Svelte plugin compile them for SSR.
  ssr: { noExternal: ['@contentveda/ui'] }
});
