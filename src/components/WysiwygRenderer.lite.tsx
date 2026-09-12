import { useStore, onMount, onUnMount, onUpdate, useRef } from '@builder.io/mitosis';
import { observeLazyMount } from '../utils/lazyObserver';

export interface WysiwygRendererProps {
  htmlContent: string;
  className?: string;
  widgetData?: any;
  lazyLoad?: boolean;
  lazyThreshold?: number;
  lazyRootMargin?: string;
}

export default function WysiwygRenderer(props: WysiwygRendererProps) {


  const containerRef = useRef<HTMLDivElement>(null);

  const state = useStore({
    isVisible: false,
    get shouldMount() {
      return props.lazyLoad === false || state.isVisible;
    },
    get renderedHtml() {
      return state.shouldMount ? props.htmlContent : '';
    },
    processContent() {
      setTimeout(() => {
        if (!containerRef) return;
        
        // Process Social Embeds
        const socialEmbeds = containerRef.querySelectorAll('.cv-social-embed');
        socialEmbeds.forEach((el) => {
          const platform = el.getAttribute('data-platform');
          const url = el.getAttribute('data-url');
          if (!platform || !url) return;
          
          // Clear placeholder text and fix styling
          // lgtm [js/html-constructed-from-input]
          el.innerHTML = '';
          el.setAttribute('style', 'margin: 20px 0; display: flex; justify-content: center; background: transparent; border: none; padding: 0;');

          if (platform === 'youtube') {
            let videoId = '';
            const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
            if (match && match[1]) videoId = match[1];
            if (videoId) {
              const iframe = document.createElement('iframe');
              iframe.width = "560";
              iframe.height = "315";
              iframe.src = `https://www.youtube.com/embed/${videoId}`;
              iframe.title = "YouTube video player";
              iframe.setAttribute('frameborder', '0');
              iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
              iframe.setAttribute('allowfullscreen', '');
              iframe.style.cssText = "border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);";
              el.appendChild(iframe);
            } else {
              const link = document.createElement('a');
              try {
                const parsedUrl = new URL(url, window.location.origin);
                link.href = parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:" ? parsedUrl.toString() : "about:blank";
              } catch {
                link.href = "about:blank";
              }
              link.target = "_blank";
              link.style.cssText = "color: var(--cv-color-link, #7fc4de); text-decoration: underline;";
              link.textContent = "View Video on YouTube";
              el.appendChild(link);
            }
          } else if (platform === 'facebook') {
            const fbDiv = document.createElement('div');
            fbDiv.className = 'fb-post';
            try {
              const parsedUrl = new URL(url, window.location.origin);
              fbDiv.setAttribute('data-href', parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:" ? parsedUrl.toString() : "about:blank");
            } catch {
              fbDiv.setAttribute('data-href', "about:blank");
            }
            fbDiv.setAttribute('data-width', '500');
            el.appendChild(fbDiv);
            if (!document.getElementById('facebook-jssdk')) {
              const script = document.createElement('script');
              script.id = 'facebook-jssdk';
              script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0';
              script.async = true;
              script.defer = true;
              script.crossOrigin = 'anonymous';
              document.body.appendChild(script);
            } else if ((window as any).FB) {
              (window as any).FB.XFBML.parse(el);
            }
          } else if (platform === 'x' || platform === 'twitter') {
            const bq = document.createElement('blockquote');
            bq.className = 'twitter-tweet';
            bq.setAttribute('data-theme', 'dark');
            const a = document.createElement('a');
            try {
              const parsedUrl = new URL(url, window.location.origin);
              a.href = parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:" ? parsedUrl.toString() : "about:blank";
            } catch {
              a.href = "about:blank";
            }
            bq.appendChild(a);
            el.appendChild(bq);
            if (!document.getElementById('twitter-wjs')) {
              const script = document.createElement('script');
              script.id = 'twitter-wjs';
              script.src = 'https://platform.twitter.com/widgets.js';
              script.async = true;
              document.body.appendChild(script);
            } else if ((window as any).twttr) {
              (window as any).twttr.widgets.load(el);
            }
          } else if (platform === 'instagram') {
            const igBq = document.createElement('blockquote');
            igBq.className = 'instagram-media';
            try {
              const parsedUrl = new URL(url, window.location.origin);
              igBq.setAttribute('data-instgrm-permalink', parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:" ? parsedUrl.toString() : "about:blank");
            } catch {
              igBq.setAttribute('data-instgrm-permalink', "about:blank");
            }
            igBq.setAttribute('data-instgrm-version', '14');
            igBq.style.cssText = "background: var(--cv-color-media-base, #000); border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); border-radius: 3px; box-shadow: none; margin: 1px; max-width: 540px; min-width: 326px; padding: 0; width: 99.375%; width: -webkit-calc(100% - 2px); width: calc(100% - 2px);";
            el.appendChild(igBq);
            if (!document.getElementById('instagram-embed')) {
              const script = document.createElement('script');
              script.id = 'instagram-embed';
              script.src = 'https://www.instagram.com/embed.js';
              script.async = true;
              document.body.appendChild(script);
            } else if ((window as any).instgrm) {
              (window as any).instgrm.Embeds.process();
            }
          } else if (platform === 'linkedin') {
             const embedUrl = url.includes('/embed/') ? url : url.replace('/post/', '/embed/feed/update/');
             const liIframe = document.createElement('iframe');
             try {
               const parsedUrl = new URL(embedUrl, window.location.origin);
               liIframe.src = parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:" ? parsedUrl.toString() : "about:blank";
             } catch {
               liIframe.src = "about:blank";
             }
             liIframe.height = "600";
             liIframe.width = "504";
             liIframe.setAttribute('frameborder', '0');
             liIframe.setAttribute('allowfullscreen', '');
             liIframe.title = "Embedded post";
             liIframe.style.cssText = "border-radius: 12px;";
             el.appendChild(liIframe);
          }
        });

        // Process Widgets
        const widgetPlaceholders = containerRef.querySelectorAll('.cv-widget-placeholder');
        widgetPlaceholders.forEach((el) => {
          const widgetTypeRaw = el.getAttribute('data-widget');
          if (!widgetTypeRaw) return;
          
          const widgetType = widgetTypeRaw.trim().toLowerCase();
          if (!/^[a-z0-9-]+$/.test(widgetType)) return;
          
          if (
            props.widgetData && 
            typeof props.widgetData === 'object' && 
            !Object.prototype.hasOwnProperty.call(props.widgetData, widgetType)
          ) {
            return;
          }
          
          // Clear placeholder text and styling
          // lgtm [js/html-constructed-from-input]
          el.innerHTML = '';
          el.setAttribute('style', 'margin: 24px 0;');
          
          // Render Web Component
          const tagName = `cv-${widgetType}`;
          const wc = document.createElement(tagName);
          
          // Apply provided widgetData if available
          if (props.widgetData && props.widgetData[widgetType]) {
            const data = props.widgetData[widgetType];
            for (const key in data) {
              // Mitosis WC props format requires JSON for objects/arrays
              if (typeof data[key] === 'object') {
                wc.setAttribute(key.replace(/([A-Z])/g, '-$1').toLowerCase(), JSON.stringify(data[key]));
              } else {
                wc.setAttribute(key.replace(/([A-Z])/g, '-$1').toLowerCase(), String(data[key]));
              }
            }
          }
          
          el.appendChild(wc);
        });
      }, 0);
    },
    observerBox: { disconnect: null as (() => void) | null }
  });


  onMount(() => {
    if (props.lazyLoad === false) {
      state.isVisible = true;
      state.processContent();
      return;
    }
    if (containerRef) {
      state.observerBox.disconnect = observeLazyMount(
        containerRef,
        () => { state.isVisible = true; state.processContent(); },
        props.lazyThreshold ?? 0.1,
        props.lazyRootMargin ?? '200px'
      );
    }
  });

  onUnMount(() => {
    if (state.observerBox.disconnect) state.observerBox.disconnect();
  });

  onUpdate(() => {
    if (state.shouldMount) state.processContent();
  }, [props.htmlContent, props.widgetData]);
  return (
    <div
      ref={containerRef}
      class={`cv-wysiwyg-content ${!state.shouldMount ? 'cv-image-shimmer' : ''} ${props.className || ''}`}
      style={{ minHeight: !state.shouldMount ? '120px' : '' }}
      // lgtm [js/html-constructed-from-input]
      innerHTML={state.renderedHtml}
    >
    </div>
  );
}
