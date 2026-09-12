import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";

export interface AnnouncementBarProps {
  message: string;
  mapLinks?: {
    url: string;
  }[];
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

@Component({
  selector: "announcement-bar",
  template: `
    <div
      [class]="\`cv-announcement-bar \${className || ''}\`"
      [ngStyle]="{
          // Defaults pair white text with the ContentVeda brand teal, which
          // measures 8.70:1 -- clearing WCAG 2.1 AAA. Falls back through the
          // shared primary token so a consumer theming the library gets their
          // colour, not this hardcoded one.
          backgroundColor: backgroundColor || 'var(--cv-color-primary-fill, #245066)',
          color: textColor || 'var(--cv-color-on-primary, #ffffff)'
        }"
    >
      <ng-container *ngIf="mapLinks && mapLinks.length > 0"
        ><a
          class="cv-announcement-link"
          [attr.href]="mapLinks?.[0]?.url"
          >{{message}}</a
        ></ng-container
      >
      <ng-container *ngIf="!(mapLinks && mapLinks.length > 0)"
        ><span class="cv-announcement-text">{{message}}</span></ng-container
      >
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export default class AnnouncementBar {
  @Input() className!: AnnouncementBarProps["className"];
  @Input() backgroundColor!: AnnouncementBarProps["backgroundColor"];
  @Input() textColor!: AnnouncementBarProps["textColor"];
  @Input() mapLinks!: AnnouncementBarProps["mapLinks"];
  @Input() message!: AnnouncementBarProps["message"];
}

@NgModule({
  declarations: [AnnouncementBar],
  imports: [CommonModule],
  exports: [AnnouncementBar],
})
export class AnnouncementBarModule {}
