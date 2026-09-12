import { Show } from "solid-js";

export interface AnnouncementBarProps {
  message: string;
  mapLinks?: {
    url: string;
  }[];
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

function AnnouncementBar(props: AnnouncementBarProps) {
  return (
    <>
      <div
        class={`cv-announcement-bar ${props.className || ""}`}
        style={{
          // Defaults pair white text with the ContentVeda brand teal, which
          // measures 8.70:1 -- clearing WCAG 2.1 AAA. Falls back through the
          // shared primary token so a consumer theming the library gets their
          // colour, not this hardcoded one.
          "background-color":
            props.backgroundColor || "var(--cv-color-primary-fill, #245066)",
          color: props.textColor || "var(--cv-color-on-primary, #ffffff)",
        }}
      >
        <Show when={props.mapLinks && props.mapLinks.length > 0}>
          <a class="cv-announcement-link" href={props.mapLinks?.[0]?.url}>
            {props.message}
          </a>
        </Show>
        <Show when={!(props.mapLinks && props.mapLinks.length > 0)}>
          <span class="cv-announcement-text">{props.message}</span>
        </Show>
      </div>
    </>
  );
}

export default AnnouncementBar;
