import * as React from "react";

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
    <div
      className={`cv-announcement-bar ${props.className || ""}`}
      style={{
        // Defaults pair white text with violet-700, which measures 7.10:1 --
        // clearing WCAG 2.1 AAA. The previous violet-500 (#8b5cf6) default was
        // only 4.23:1, failing even AA. Falls back through the shared primary
        // token so a consumer theming the library gets their colour, not this
        // hardcoded one.
        backgroundColor:
          props.backgroundColor || "var(--cv-color-primary, #6d28d9)",
        color: props.textColor || "#ffffff",
      }}
    >
      {props.mapLinks && props.mapLinks.length > 0 ? (
        <a className="cv-announcement-link" href={props.mapLinks?.[0]?.url}>
          {props.message}
        </a>
      ) : null}
      {!(props.mapLinks && props.mapLinks.length > 0) ? (
        <span className="cv-announcement-text">{props.message}</span>
      ) : null}
    </div>
  );
}

export default AnnouncementBar;
