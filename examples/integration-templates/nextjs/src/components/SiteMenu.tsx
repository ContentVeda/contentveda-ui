// Renders a ContentVeda navigation menu (any depth) as nested lists.
import { menuHref, type MenuItem } from '@/lib/contentveda';

export default function SiteMenu({ items, depth = 0 }: { items: MenuItem[]; depth?: number }) {
  return (
    <ul className={depth > 0 ? 'cv-menu cv-submenu' : 'cv-menu'}>
      {items.map((item) => (
        <li key={item.id} className={item.children?.length ? 'has-children' : undefined}>
          <a
            href={menuHref(item)}
            target={item.target || '_self'}
            rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
          >
            {item.label}
          </a>
          {item.children?.length ? <SiteMenu items={item.children} depth={depth + 1} /> : null}
        </li>
      ))}
    </ul>
  );
}
