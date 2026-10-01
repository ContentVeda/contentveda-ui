import type { ContentVedaPage } from '@/lib/contentveda';
import { config } from '@/lib/config';
import BlockRenderer from './BlockRenderer';
import SiteMenu from './SiteMenu';

export default function PageView({ page }: { page: ContentVedaPage }) {
  // Menus are assigned to slots in CMS → Navigation; the page can override them.
  const header = page.navigation.header || page.navigation.mobile || [];
  const footer = page.navigation.footer || [];

  return (
    <>
      {header.length ? (
        <header className="cv-site-header">
          <nav aria-label="Main"><SiteMenu items={header} /></nav>
        </header>
      ) : null}

      <main className="cv-page" data-cv-slug={page.slug} data-cv-api={config.mode}>
        {page.content.map((block) => (
          <section key={block.id} className="cv-floor" data-cv-type={block.type}>
            {block.rowConfig?.title ? (
              <div className="cv-floor-header">
                <div>
                  <h2>{block.rowConfig.title}</h2>
                  {block.rowConfig.subtitle ? <p>{block.rowConfig.subtitle}</p> : null}
                </div>
                {block.rowConfig.rightLinkLabel && block.rowConfig.rightLinkUrl ? (
                  <a href={block.rowConfig.rightLinkUrl}>
                    {block.rowConfig.rightLinkLabel} {block.rowConfig.rightLinkIcon || '→'}
                  </a>
                ) : null}
              </div>
            ) : null}
            <BlockRenderer block={block} />
          </section>
        ))}
      </main>

      {footer.length ? (
        <footer className="cv-site-footer">
          <nav aria-label="Footer"><SiteMenu items={footer} /></nav>
        </footer>
      ) : null}
    </>
  );
}
