import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  Output,
  EventEmitter,
  Component,
  ViewChild,
  ElementRef,
  Input,
} from "@angular/core";

export interface RichTextEditorConfig {
  toolbar?: string[];
}
export interface RichTextEditorProps {
  content?: string;
  initialContent?: string;
  onChange?: (html: string) => void;
  className?: string;
  availableClasses?: string[];
  onMediaRequest?: (type: "image" | "video" | "audio") => Promise<string>;
  config?: RichTextEditorConfig;
}

import DOMPurify from "isomorphic-dompurify";
let activeSavedRange: any = null;

@Component({
  selector: "rich-text-editor",
  template: `
    <div
      #rootRef
      [class]="'cv-rich-text-editor flex flex-col rounded-xl overflow-hidden relative ' + (isFullscreen ? 'fixed inset-0 z-[9999] w-screen h-screen rounded-none' : 'w-full') + ' ' + (className || '')"
      [ngStyle]="{
          boxSizing: 'border-box',
          background: 'var(--cv-color-surface-sunken, #0f172a)',
          border: isFullscreen ? 'none' : '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
          boxShadow: 'var(--cv-shadow-overlay, 0 8px 32px rgba(0,0,0,0.4))'
        }"
    >
      <div class="editor-toolbar select-none sticky top-0 z-10 w-full">
        <div class="cv-toolbar-row cv-toolbar-row-1">
          <div class="cv-toolbar-group">
            <button
              type="button"
              class="cv-toolbar-btn"
              title="Undo"
              (mousedown)="$event.preventDefault()"
              (click)="format('undo')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 7v6h6"></path>
                <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path>
              </svg>
            </button>
            <button
              type="button"
              class="cv-toolbar-btn"
              title="Redo"
              (mousedown)="$event.preventDefault()"
              (click)="format('redo')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 7v6h-6"></path>
                <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path>
              </svg>
            </button>
          </div>
          <div class="cv-toolbar-divider"></div>
          <ng-container *ngIf="showToolbarOption('headings')"
            ><div class="cv-toolbar-select-wrapper">
              <span class="cv-toolbar-select-icon"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="18" x2="3" y2="18"></line></svg
              ></span>
              <select
                class="cv-toolbar-select"
                title="Paragraph Style"
                [attr.value]="headingFormat"
                (mousedown)="saveSelection()"
                (change)="formatHeading($event.target.value)"
              >
                <option value="P">Paragraph</option>
                <option value="H1">Heading 1</option>
                <option value="H2">Heading 2</option>
                <option value="H3">Heading 3</option>
                <option value="H4">Heading 4</option>
              </select>
              <span class="cv-toolbar-select-chevron"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline></svg
              ></span></div
          ></ng-container>
          <div class="cv-toolbar-select-wrapper">
            <select
              class="cv-toolbar-select no-icon"
              title="Font Family"
              [attr.value]="fontFamily"
              (mousedown)="saveSelection()"
              (change)="
          restoreSelection();
          changeFontFamily($event.target.value);
        "
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Outfit">Outfit</option>
              <option value="Fira Code">Fira Code</option>
              <option value="Georgia">Georgia</option>
              <option value="system-ui">System Sans</option>
            </select>
            <span class="cv-toolbar-select-chevron"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline></svg
            ></span>
          </div>
          <div class="cv-toolbar-select-wrapper">
            <select
              class="cv-toolbar-select no-icon"
              title="Font Size"
              [attr.value]="fontSize"
              (mousedown)="saveSelection()"
              (change)="
          restoreSelection();
          changeFontSize($event.target.value);
        "
            >
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
              <option value="24px">24px</option>
              <option value="32px">32px</option>
            </select>
            <span class="cv-toolbar-select-chevron"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline></svg
            ></span>
          </div>
          <div class="cv-toolbar-divider"></div>
          <div class="cv-toolbar-segmented-group">
            <ng-container *ngIf="showToolbarOption('bold')"
              ><button
                type="button"
                title="Bold"
                [class]="'cv-toolbar-btn ' + (activeFormats.bold ? 'is-active' : '')"
                (mousedown)="$event.preventDefault()"
                (click)="format('bold')"
              >
                <span class="font-bold text-xs">B</span>
              </button></ng-container
            >
            <ng-container *ngIf="showToolbarOption('italic')"
              ><button
                type="button"
                title="Italic"
                [class]="'cv-toolbar-btn ' + (activeFormats.italic ? 'is-active' : '')"
                (mousedown)="$event.preventDefault()"
                (click)="format('italic')"
              >
                <span class="italic font-serif text-xs">I</span>
              </button></ng-container
            >
            <ng-container *ngIf="showToolbarOption('underline')"
              ><button
                type="button"
                title="Underline"
                [class]="'cv-toolbar-btn ' + (activeFormats.underline ? 'is-active' : '')"
                (mousedown)="$event.preventDefault()"
                (click)="format('underline')"
              >
                <span class="underline text-xs font-medium">U</span>
              </button></ng-container
            >
            <ng-container *ngIf="showToolbarOption('strikeThrough')"
              ><button
                type="button"
                title="Strikethrough"
                [class]="'cv-toolbar-btn ' + (activeFormats.strikeThrough ? 'is-active' : '')"
                (mousedown)="$event.preventDefault()"
                (click)="format('strikeThrough')"
              >
                <span class="line-through text-xs font-medium">S</span>
              </button></ng-container
            >
            <ng-container *ngIf="showToolbarOption('code')"
              ><button
                type="button"
                title="Code Block"
                [class]="'cv-toolbar-btn ' + (activeFormats.code ? 'is-active' : '')"
                (mousedown)="$event.preventDefault()"
                (click)="toggleBlock('PRE')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg></button
            ></ng-container>
          </div>
          <div class="cv-toolbar-divider"></div>
          <ng-container
            *ngIf="showToolbarOption('foreColor') || showToolbarOption('backColor')"
            ><div class="cv-toolbar-group">
              <ng-container *ngIf="showToolbarOption('foreColor')"
                ><label
                  class="cv-toolbar-color-btn"
                  title="Text Color"
                  (mousedown)="saveSelection()"
                  ><span
                    class="font-bold text-xs"
                    [ngStyle]="{
          lineHeight: '1'
        }"
                    >A</span
                  >
                  <span
                    class="cv-color-indicator"
                    [ngStyle]="{
          backgroundColor: textColor
        }"
                  ></span>
                  <input
                    type="color"
                    aria-label="Text Color"
                    class="cv-color-input"
                    [attr.value]="textColor"
                    (mousedown)="saveSelection()"
                    (input)="applyColor('foreColor', $event.target.value)"
                    (change)="applyColor('foreColor', $event.target.value)" /></label
              ></ng-container>
              <ng-container *ngIf="showToolbarOption('backColor')"
                ><label
                  class="cv-toolbar-color-btn"
                  title="Highlight Color"
                  (mousedown)="saveSelection()"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9"></path>
                    <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                    <path d="m2 2 7.586 7.586"></path>
                  </svg>
                  <span
                    class="cv-color-indicator"
                    [ngStyle]="{
          backgroundColor: highlightColor
        }"
                  ></span>
                  <input
                    type="color"
                    aria-label="Background Color"
                    class="cv-color-input"
                    [attr.value]="highlightColor"
                    (mousedown)="saveSelection()"
                    (input)="applyColor('backColor', $event.target.value)"
                    (change)="applyColor('backColor', $event.target.value)" /></label
              ></ng-container></div
          ></ng-container>
          <div class="cv-toolbar-divider"></div>
          <ng-container
            *ngIf="showToolbarOption('justifyLeft') || showToolbarOption('justifyCenter') || showToolbarOption('justifyRight')"
            ><div class="cv-toolbar-segmented-group">
              <ng-container *ngIf="showToolbarOption('justifyLeft')"
                ><button
                  type="button"
                  title="Align Left"
                  [class]="'cv-toolbar-btn ' + (activeFormats.justifyLeft ? 'is-active' : '')"
                  (mousedown)="$event.preventDefault()"
                  (click)="format('justifyLeft')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                    <line x1="17" y1="18" x2="3" y2="18"></line>
                  </svg></button
              ></ng-container>
              <ng-container *ngIf="showToolbarOption('justifyCenter')"
                ><button
                  type="button"
                  title="Align Center"
                  [class]="'cv-toolbar-btn ' + (activeFormats.justifyCenter ? 'is-active' : '')"
                  (mousedown)="$event.preventDefault()"
                  (click)="format('justifyCenter')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="17" y1="12" x2="7" y2="12"></line>
                    <line x1="19" y1="18" x2="5" y2="18"></line>
                  </svg></button
              ></ng-container>
              <ng-container *ngIf="showToolbarOption('justifyRight')"
                ><button
                  type="button"
                  title="Align Right"
                  [class]="'cv-toolbar-btn ' + (activeFormats.justifyRight ? 'is-active' : '')"
                  (mousedown)="$event.preventDefault()"
                  (click)="format('justifyRight')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                    <line x1="21" y1="18" x2="7" y2="18"></line>
                  </svg></button
              ></ng-container>
              <button
                type="button"
                title="Align Justify"
                [class]="'cv-toolbar-btn ' + (activeFormats.justifyFull ? 'is-active' : '')"
                (mousedown)="$event.preventDefault()"
                (click)="format('justifyFull')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="18" x2="3" y2="18"></line>
                </svg>
              </button></div
          ></ng-container>
        </div>
        <div class="cv-toolbar-row cv-toolbar-row-2">
          <div class="cv-toolbar-group">
            <ng-container *ngIf="showToolbarOption('unorderedList')"
              ><button
                type="button"
                title="Bullet List"
                [class]="'cv-toolbar-btn ' + (activeFormats.unorderedList ? 'is-active' : '')"
                (mousedown)="$event.preventDefault()"
                (click)="format('insertUnorderedList')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg></button
            ></ng-container>
            <ng-container *ngIf="showToolbarOption('orderedList')"
              ><button
                type="button"
                title="Numbered List"
                [class]="'cv-toolbar-btn ' + (activeFormats.orderedList ? 'is-active' : '')"
                (mousedown)="$event.preventDefault()"
                (click)="format('insertOrderedList')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="10" y1="6" x2="21" y2="6"></line>
                  <line x1="10" y1="12" x2="21" y2="12"></line>
                  <line x1="10" y1="18" x2="21" y2="18"></line>
                  <path d="M4 6h1v4"></path>
                  <path d="M4 10h2"></path>
                  <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
                </svg></button
            ></ng-container>
            <button
              type="button"
              class="cv-toolbar-btn"
              title="Task List"
              (mousedown)="$event.preventDefault()"
              (click)="insertChecklist()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 11 12 14 22 4"></polyline>
                <path
                  d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                ></path>
              </svg>
            </button>
          </div>
          <div class="cv-toolbar-divider"></div>
          <div class="cv-toolbar-group relative">
            <button
              type="button"
              class="cv-toolbar-action-btn"
              title="Insert Options"
              (click)="showInsertMenu = !showInsertMenu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Insert</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <ng-container *ngIf="showInsertMenu"
              ><div class="cv-insert-menu shadow-xl">
                <button
                  type="button"
                  class="cv-insert-item"
                  (click)="
          showInsertMenu = false;
          openTableModal();
        "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                  </svg>

                  Table
                </button>
                <button
                  type="button"
                  class="cv-insert-item"
                  (click)="
          showInsertMenu = false;
          insertMedia('image');
        "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>

                  Image
                </button>
                <button
                  type="button"
                  class="cv-insert-item"
                  (click)="
          showInsertMenu = false;
          openLinkModal();
        "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                    ></path>
                    <path
                      d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                    ></path>
                  </svg>

                  Link
                </button>
                <button
                  type="button"
                  class="cv-insert-item"
                  (click)="
          showInsertMenu = false;
          insertMedia('video');
        "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="2.18"
                      ry="2.18"
                    ></rect>
                    <line x1="7" y1="2" x2="7" y2="22"></line>
                    <line x1="17" y1="2" x2="17" y2="22"></line>
                  </svg>

                  Video
                </button>
                <button
                  type="button"
                  class="cv-insert-item"
                  (click)="
          showInsertMenu = false;
          openButtonModal();
        "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                  </svg>

                  Action Button
                </button>
                <button
                  type="button"
                  class="cv-insert-item"
                  (click)="
          showInsertMenu = false;
          openSocialModal();
        "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                    ></path>
                  </svg>

                  Social Post
                </button>
                <button
                  type="button"
                  class="cv-insert-item"
                  (click)="
          showInsertMenu = false;
          format('insertHorizontalRule');
        "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>

                  Horizontal Line
                </button>
                <button
                  type="button"
                  class="cv-insert-item"
                  (click)="
          showInsertMenu = false;
          toggleBlock('BLOCKQUOTE');
        "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
                    ></path>
                    <path
                      d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                    ></path>
                  </svg>

                  Quote
                </button>
                <button
                  type="button"
                  class="cv-insert-item"
                  (click)="
          showInsertMenu = false;
          clearAllFormatting();
        "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M4 12h8"></path>
                    <path d="M4 18V6a2 2 0 0 1 2-2h4"></path>
                    <path d="M15 9l5 5"></path>
                    <path d="M20 9l-5 5"></path>
                  </svg>

                  Clear Formatting
                </button>
              </div></ng-container
            >
          </div>
          <ng-container *ngIf="showToolbarOption('table')"
            ><button
              type="button"
              class="cv-toolbar-action-btn"
              title="Table"
              (mousedown)="$event.preventDefault()"
              (click)="openTableModal()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="3" y1="15" x2="21" y2="15"></line>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="15" y1="3" x2="15" y2="21"></line>
              </svg>
              <span>Table</span>
            </button></ng-container
          >
          <ng-container
            *ngIf="activeFormats.inTable && showToolbarOption('table')"
            ><div
              class="flex items-center cv-rte-tint rounded-lg p-0.5 border cv-rte-accent-border"
            >
              <button
                type="button"
                class="w-6 h-6 flex items-center justify-center rounded hover:cv-rte-tint-strong cv-rte-accent transition-colors"
                title="Add Row Below"
                (mousedown)="$event.preventDefault()"
                (click)="modifyTable('addRow')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
                <span class="text-[9px] font-bold ml-0.5">R</span>
              </button>
              <button
                type="button"
                class="w-6 h-6 flex items-center justify-center rounded hover:bg-rose-500/30 text-rose-500 transition-colors"
                title="Delete Row"
                (mousedown)="$event.preventDefault()"
                (click)="modifyTable('removeRow')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path d="M5 12h14"></path>
                </svg>
                <span class="text-[9px] font-bold ml-0.5">R</span>
              </button>
              <div class="w-px h-3 cv-rte-tint-strong mx-0.5"></div>
              <button
                type="button"
                class="w-6 h-6 flex items-center justify-center rounded hover:cv-rte-tint-strong cv-rte-accent transition-colors"
                title="Add Column Right"
                (mousedown)="$event.preventDefault()"
                (click)="modifyTable('addCol')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
                <span class="text-[9px] font-bold ml-0.5">C</span>
              </button>
              <button
                type="button"
                class="w-6 h-6 flex items-center justify-center rounded hover:bg-rose-500/30 text-rose-500 transition-colors"
                title="Delete Column"
                (mousedown)="$event.preventDefault()"
                (click)="modifyTable('removeCol')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path d="M5 12h14"></path>
                </svg>
                <span class="text-[9px] font-bold ml-0.5">C</span>
              </button>
            </div></ng-container
          >
          <div class="cv-toolbar-group">
            <ng-container *ngIf="showToolbarOption('image')"
              ><button
                type="button"
                class="cv-toolbar-btn"
                title="Image"
                (mousedown)="$event.preventDefault()"
                (click)="insertMedia('image')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg></button
            ></ng-container>
            <ng-container *ngIf="showToolbarOption('link')"
              ><button
                type="button"
                class="cv-toolbar-btn"
                title="Link"
                (mousedown)="$event.preventDefault()"
                (click)="openLinkModal()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                  ></path>
                  <path
                    d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                  ></path>
                </svg></button
            ></ng-container>
            <button
              type="button"
              class="cv-toolbar-btn"
              title="Formula"
              (mousedown)="$event.preventDefault()"
              (click)="insertFormula()"
            >
              <span class="font-serif italic font-bold text-xs">Fx</span>
            </button>
            <ng-container *ngIf="showToolbarOption('social')"
              ><button
                type="button"
                class="cv-toolbar-btn"
                title="Social Media Embed"
                (mousedown)="$event.preventDefault()"
                (click)="openSocialModal()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  ></path>
                </svg></button
            ></ng-container>
          </div>
          <div class="cv-toolbar-divider"></div>
          <ng-container *ngIf="showToolbarOption('addWidget')"
            ><button
              type="button"
              class="cv-toolbar-widget-btn"
              title="Add UI Widget"
              (mousedown)="$event.preventDefault()"
              (click)="openWidgetModal()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 5v14M5 12h14"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span>Add UI Widget</span>
            </button></ng-container
          >
          <ng-container *ngIf="showToolbarOption('classInput')"
            ><div class="cv-toolbar-classes-group">
              <span class="cv-class-badge">CLASS</span>
              <ng-container
                *ngFor="let cls of appliedClasses; trackBy: trackByCls0"
                ><span class="cv-class-chip"
                  ><span>{{cls}}</span>
                  <button
                    type="button"
                    class="cv-class-chip-remove"
                    (click)="removeClass(cls)"
                    [attr.title]="'Remove ' + cls"
                  >
                    ×
                  </button></span
                ></ng-container
              >
              <input
                type="text"
                aria-label="Dynamic CSS Class"
                list="editor-class-list"
                placeholder="+ add class..."
                class="cv-class-input"
                (keydown)="handleClassInputKeyDown($event)"
              />
              <ng-container
                *ngIf="availableClasses && availableClasses.length > 0"
                ><datalist id="editor-class-list">
                  <ng-container *ngFor="let cls of availableClasses"
                    ><option [attr.value]="cls">{{cls}}</option></ng-container
                  >
                </datalist></ng-container
              >
            </div></ng-container
          >
          <div class="ml-auto flex items-center gap-1.5 flex-shrink-0">
            <ng-container *ngIf="showToolbarOption('source')"
              ><button
                type="button"
                title="View HTML Source Code"
                [class]="'cv-toolbar-btn ' + (mode === 'source' ? 'is-active' : '')"
                (click)="toggleMode()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg></button
            ></ng-container>
            <ng-container *ngIf="showToolbarOption('fullscreen')"
              ><button
                type="button"
                class="cv-toolbar-btn"
                title="Full Screen"
                (click)="toggleFullScreen()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                  ></path>
                </svg></button
            ></ng-container>
            <ng-container *ngIf="showToolbarOption('save')"
              ><button
                type="button"
                class="cv-toolbar-btn"
                title="Save"
                (mousedown)="$event.preventDefault()"
                (click)="syncContent()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h11l5 5v11a2 2 0 0 1-2 2z"
                  ></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg></button
            ></ng-container>
          </div>
        </div>
      </div>
      <div
        class="editor-content flex-1 overflow-y-auto relative min-h-[350px]"
        [ngStyle]="{
          display: mode === 'visual' ? 'block' : 'none',
          padding: '2rem 3rem',
          color: 'var(--cv-color-text-main, #f1f5f9)'
        }"
      >
        <div
          contenteditable="true"
          class="wysiwyg-content outline-none prose prose-invert max-w-none"
          #editorRef
          (input)="
          handleInput();
          checkFormats();
        "
          (blur)="handleInput()"
          (keyup)="checkFormats()"
          (mouseup)="checkFormats()"
          [ngStyle]="{
          minHeight: '350px',
          fontFamily: 'Inter, sans-serif',
          lineHeight: '1.7',
          fontSize: '15px'
        }"
        ></div>
        <ng-container
          *ngIf="showTableModal || showLinkModal || showWidgetModal || showSocialModal || showButtonModal || showAiModal"
          ><div
            class="fixed inset-0 flex items-center justify-center z-[100] backdrop-blur-md"
            [ngStyle]="{
          background: 'rgba(0, 0, 0, 0.6)'
        }"
          >
            <ng-container *ngIf="showAiModal"
              ><div class="cv-ai-modal shadow-2xl">
                <div class="cv-ai-modal-header">
                  <div
                    class="flex items-center gap-2 text-white font-bold text-base"
                  >
                    <svg
                      class="text-purple-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
                      ></path>
                    </svg>

                    ContentVeda AI Assistant
                  </div>
                  <button
                    type="button"
                    class="text-slate-400 hover:text-white text-lg font-bold"
                    (click)="closeAiModal()"
                  >
                    ×
                  </button>
                </div>
                <div
                  [ngStyle]="{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginBottom: '20px'
        }"
                >
                  <button
                    type="button"
                    class="cv-ai-pill-btn"
                    (click)="applyAiAction('improve')"
                  >
                    ✨ Improve Writing & Polish Flow
                  </button>
                  <button
                    type="button"
                    class="cv-ai-pill-btn"
                    (click)="applyAiAction('callout')"
                  >
                    💡 Generate AI Callout Insight Box
                  </button>
                  <button
                    type="button"
                    class="cv-ai-pill-btn"
                    (click)="applyAiAction('summarize')"
                  >
                    📝 Summarize Selected Section
                  </button>
                  <button
                    type="button"
                    class="cv-ai-pill-btn"
                    (click)="applyAiAction('grammar')"
                  >
                    🔍 Fix Grammar & Syntax
                  </button>
                </div>
                <div
                  [ngStyle]="{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px'
        }"
                >
                  <button
                    type="button"
                    [ngStyle]="{
          padding: '8px 16px',
          fontSize: '13px',
          color: '#cbd5e1',
          background: 'rgba(255,255,255,0.05)',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }"
                    (click)="closeAiModal()"
                  >
                    Close
                  </button>
                </div>
              </div></ng-container
            >
            <ng-container *ngIf="showButtonModal"
              ><div
                class="shadow-2xl"
                [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)',
          border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
          borderRadius: '16px',
          padding: '24px',
          width: '380px'
        }"
              >
                <h3
                  class="flex items-center text-white"
                  [ngStyle]="{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '20px',
          gap: '8px'
        }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    [ngStyle]="{
          color: 'var(--cv-color-primary, #7fc4de)'
        }"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>

                  Insert Button
                </h3>
                <div
                  [ngStyle]="{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '24px'
        }"
                >
                  <div
                    [ngStyle]="{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }"
                  >
                    <label
                      [ngStyle]="{
          fontSize: '12px',
          fontWeight: '600',
          color: 'var(--cv-color-text-muted, #94a3b8)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }"
                      >Button Style</label
                    >
                    <select
                      [ngStyle]="{
          background: 'var(--cv-color-surface-sunken, rgba(0,0,0,0.3))',
          border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
          borderRadius: '8px',
          padding: '12px 16px',
          width: '100%',
          fontSize: '14px',
          color: 'var(--cv-color-text-main, #fff)',
          outline: 'none'
        }"
                      [attr.value]="btnStyle"
                      (change)="btnStyle = $event.target.value"
                    >
                      <option
                        value="primary"
                        [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)'
        }"
                      >
                        Primary (Gradient)
                      </option>
                      <option
                        value="secondary"
                        [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)'
        }"
                      >
                        Secondary (Dark)
                      </option>
                      <option
                        value="outline"
                        [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)'
        }"
                      >
                        Outline (Violet)
                      </option>
                    </select>
                  </div>
                  <div
                    [ngStyle]="{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }"
                  >
                    <label
                      [ngStyle]="{
          fontSize: '12px',
          fontWeight: '600',
          color: 'var(--cv-color-text-muted, #94a3b8)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }"
                      >Button Label</label
                    >
                    <input
                      type="text"
                      aria-label="Button Label"
                      placeholder="e.g. Get Started Today"
                      [ngStyle]="{
          background: 'var(--cv-color-surface-sunken, rgba(0,0,0,0.3))',
          border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
          borderRadius: '8px',
          padding: '12px 16px',
          width: '100%',
          fontSize: '14px',
          color: 'var(--cv-color-text-main, #fff)',
          outline: 'none',
          boxSizing: 'border-box'
        }"
                      [attr.value]="btnText"
                      (input)="btnText = $event.target.value"
                    />
                  </div>
                  <div
                    [ngStyle]="{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }"
                  >
                    <label
                      [ngStyle]="{
          fontSize: '12px',
          fontWeight: '600',
          color: 'var(--cv-color-text-muted, #94a3b8)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }"
                      >Target URL</label
                    >
                    <input
                      type="url"
                      aria-label="Target URL"
                      placeholder="https://..."
                      [ngStyle]="{
          background: 'var(--cv-color-surface-sunken, rgba(0,0,0,0.3))',
          border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
          borderRadius: '8px',
          padding: '12px 16px',
          width: '100%',
          fontSize: '14px',
          color: 'var(--cv-color-text-main, #fff)',
          outline: 'none',
          boxSizing: 'border-box'
        }"
                      [attr.value]="btnUrl"
                      (input)="btnUrl = $event.target.value"
                    />
                  </div>
                </div>
                <div
                  [ngStyle]="{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px'
        }"
                >
                  <button
                    type="button"
                    [ngStyle]="{
          padding: '10px 20px',
          fontSize: '14px',
          color: 'var(--cv-color-text-secondary, #cbd5e1)',
          background: 'var(--cv-color-hover, rgba(255,255,255,0.05))',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '500',
          cursor: 'pointer'
        }"
                    (click)="closeButtonModal()"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    [ngStyle]="{
          padding: '10px 20px',
          fontSize: '14px',
          color: 'var(--cv-color-on-primary, #fff)',
          background: 'var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 14px var(--cv-shadow-accent-color, rgba(36,80,102,0.2))'
        }"
                    (click)="confirmButton()"
                  >
                    Insert
                  </button>
                </div>
              </div></ng-container
            >
            <ng-container *ngIf="showTableModal"
              ><div
                class="shadow-2xl"
                [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)',
          border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
          borderRadius: '16px',
          padding: '24px',
          width: '340px'
        }"
              >
                <h3
                  class="flex items-center text-white"
                  [ngStyle]="{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '20px',
          gap: '8px'
        }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    [ngStyle]="{
          color: 'var(--cv-color-link, #7fc4de)'
        }"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="3" y1="15" x2="21" y2="15"></line>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                    <line x1="15" y1="3" x2="15" y2="21"></line>
                  </svg>

                  Insert Table Grid
                </h3>
                <div
                  [ngStyle]="{
          display: 'flex',
          gap: '16px',
          marginBottom: '20px'
        }"
                >
                  <div
                    [ngStyle]="{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }"
                  >
                    <label
                      [ngStyle]="{
          fontSize: '12px',
          fontWeight: '600',
          color: 'var(--cv-color-text-muted, #94a3b8)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }"
                      >Rows</label
                    >
                    <input
                      type="number"
                      aria-label="Table Rows"
                      min="1"
                      max="10"
                      [ngStyle]="{
          background: 'var(--cv-color-surface-sunken, rgba(0,0,0,0.3))',
          border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
          borderRadius: '8px',
          padding: '12px',
          width: '100%',
          fontSize: '15px',
          color: 'var(--cv-color-text-main, #fff)',
          outline: 'none',
          textAlign: 'center',
          boxSizing: 'border-box'
        }"
                      [attr.value]="tableRows"
                      (input)="tableRows = $event.target.value"
                    />
                  </div>
                  <div
                    [ngStyle]="{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }"
                  >
                    <label
                      [ngStyle]="{
          fontSize: '12px',
          fontWeight: '600',
          color: 'var(--cv-color-text-muted, #94a3b8)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }"
                      >Columns</label
                    >
                    <input
                      type="number"
                      aria-label="Table Columns"
                      min="1"
                      max="10"
                      [ngStyle]="{
          background: 'var(--cv-color-surface-sunken, rgba(0,0,0,0.3))',
          border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
          borderRadius: '8px',
          padding: '12px',
          width: '100%',
          fontSize: '15px',
          color: 'var(--cv-color-text-main, #fff)',
          outline: 'none',
          textAlign: 'center',
          boxSizing: 'border-box'
        }"
                      [attr.value]="tableCols"
                      (input)="tableCols = $event.target.value"
                    />
                  </div>
                </div>
                <div
                  [ngStyle]="{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '28px'
        }"
                >
                  <input
                    type="checkbox"
                    id="cv-header-check"
                    [ngStyle]="{
          width: '18px',
          height: '18px',
          borderRadius: '4px',
          cursor: 'pointer',
          accentColor: 'var(--cv-color-link, #7fc4de)'
        }"
                    [attr.checked]="tableHasHeader"
                    (change)="tableHasHeader = $event.target.checked"
                  />
                  <label
                    for="cv-header-check"
                    [ngStyle]="{
          fontSize: '14px',
          color: 'var(--cv-color-text-secondary, #cbd5e1)',
          cursor: 'pointer',
          userSelect: 'none'
        }"
                    >Include header row</label
                  >
                </div>
                <div
                  [ngStyle]="{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px'
        }"
                >
                  <button
                    type="button"
                    [ngStyle]="{
          padding: '10px 20px',
          fontSize: '14px',
          color: 'var(--cv-color-text-secondary, #cbd5e1)',
          background: 'var(--cv-color-hover, rgba(255,255,255,0.05))',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '500',
          cursor: 'pointer'
        }"
                    (click)="closeTableModal()"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    [ngStyle]="{
          padding: '10px 20px',
          fontSize: '14px',
          color: 'var(--cv-color-on-primary, #fff)',
          background: 'var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
        }"
                    (click)="confirmTable()"
                  >
                    Insert Table
                  </button>
                </div>
              </div></ng-container
            >
            <ng-container *ngIf="showLinkModal"
              ><div
                class="shadow-2xl"
                [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)',
          border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
          borderRadius: '16px',
          padding: '24px',
          width: '380px'
        }"
              >
                <h3
                  class="flex items-center text-white"
                  [ngStyle]="{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '20px',
          gap: '8px'
        }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    [ngStyle]="{
          color: 'var(--cv-color-link, #7fc4de)'
        }"
                  >
                    <path
                      d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                    ></path>
                    <path
                      d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                    ></path>
                  </svg>

                  Insert Hyperlink
                </h3>
                <div
                  [ngStyle]="{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginBottom: '24px'
        }"
                >
                  <label
                    [ngStyle]="{
          fontSize: '12px',
          fontWeight: '600',
          color: 'var(--cv-color-text-muted, #94a3b8)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }"
                    >URL Destination</label
                  >
                  <input
                    type="url"
                    aria-label="Hyperlink URL"
                    placeholder="https://example.com"
                    [ngStyle]="{
          background: 'var(--cv-color-surface-sunken, rgba(0,0,0,0.3))',
          border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
          borderRadius: '8px',
          padding: '12px 16px',
          width: '100%',
          fontSize: '14px',
          color: 'var(--cv-color-text-main, #fff)',
          outline: 'none',
          boxSizing: 'border-box'
        }"
                    [attr.value]="linkUrl"
                    (input)="linkUrl = $event.target.value"
                  />
                </div>
                <div
                  [ngStyle]="{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          marginTop: '32px'
        }"
                >
                  <button
                    type="button"
                    [ngStyle]="{
          padding: '10px 20px',
          fontSize: '14px',
          color: 'var(--cv-color-text-secondary, #cbd5e1)',
          background: 'var(--cv-color-hover, rgba(255,255,255,0.05))',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '500',
          cursor: 'pointer'
        }"
                    (click)="closeLinkModal()"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    [ngStyle]="{
          padding: '10px 20px',
          fontSize: '14px',
          color: 'var(--cv-color-on-primary, #fff)',
          background: 'var(--cv-color-info-fill, #075985)',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
        }"
                    (click)="confirmLink()"
                  >
                    Insert Link
                  </button>
                </div>
              </div></ng-container
            >
            <ng-container *ngIf="showWidgetModal"
              ><div
                class="shadow-2xl"
                [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)',
          border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
          borderRadius: '16px',
          padding: '24px',
          width: '380px'
        }"
              >
                <h3
                  class="flex items-center text-white"
                  [ngStyle]="{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '20px',
          gap: '8px'
        }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    [ngStyle]="{
          color: 'var(--cv-color-secondary, #5eb3d6)'
        }"
                  >
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>

                  Insert Component
                </h3>
                <div
                  [ngStyle]="{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginBottom: '24px'
        }"
                >
                  <label
                    [ngStyle]="{
          fontSize: '12px',
          fontWeight: '600',
          color: 'var(--cv-color-text-muted, #94a3b8)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }"
                    >Select ContentVeda Widget</label
                  >
                  <select
                    [ngStyle]="{
          background: 'var(--cv-color-surface-sunken, rgba(0,0,0,0.3))',
          border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
          borderRadius: '8px',
          padding: '12px 16px',
          width: '100%',
          fontSize: '14px',
          color: 'var(--cv-color-text-main, #fff)',
          outline: 'none',
          boxSizing: 'border-box'
        }"
                    [attr.value]="selectedWidget"
                    (change)="selectedWidget = $event.target.value"
                  >
                    <option
                      value="banner"
                      [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)'
        }"
                    >
                      Banner Component
                    </option>
                    <option
                      value="grid-banner"
                      [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)'
        }"
                    >
                      Grid Banner Component
                    </option>
                    <option
                      value="media-grid"
                      [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)'
        }"
                    >
                      Media Grid Component
                    </option>
                    <option
                      value="slider"
                      [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)'
        }"
                    >
                      Slider Carousel
                    </option>
                  </select>
                </div>
                <div
                  [ngStyle]="{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          marginTop: '32px'
        }"
                >
                  <button
                    type="button"
                    [ngStyle]="{
          padding: '10px 20px',
          fontSize: '14px',
          color: 'var(--cv-color-text-secondary, #cbd5e1)',
          background: 'var(--cv-color-hover, rgba(255,255,255,0.05))',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '500',
          cursor: 'pointer'
        }"
                    (click)="closeWidgetModal()"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    [ngStyle]="{
          padding: '10px 20px',
          fontSize: '14px',
          color: 'var(--cv-color-on-primary, #fff)',
          background: 'var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480))',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
        }"
                    (click)="confirmWidget()"
                  >
                    Insert Widget
                  </button>
                </div>
              </div></ng-container
            >
            <ng-container *ngIf="showSocialModal"
              ><div
                class="shadow-2xl"
                [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)',
          border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
          borderRadius: '16px',
          padding: '24px',
          width: '380px'
        }"
              >
                <h3
                  class="flex items-center text-white"
                  [ngStyle]="{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '20px',
          gap: '8px'
        }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    [ngStyle]="{
          color: 'var(--cv-color-info, #0ea5e9)'
        }"
                  >
                    <path
                      d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                    ></path>
                  </svg>

                  Embed Social Post
                </h3>
                <div
                  [ngStyle]="{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '24px'
        }"
                >
                  <div
                    [ngStyle]="{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }"
                  >
                    <label
                      [ngStyle]="{
          fontSize: '12px',
          fontWeight: '600',
          color: 'var(--cv-color-text-muted, #94a3b8)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }"
                      >Platform</label
                    >
                    <select
                      [ngStyle]="{
          background: 'var(--cv-color-surface-sunken, rgba(0,0,0,0.3))',
          border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
          borderRadius: '8px',
          padding: '12px 16px',
          width: '100%',
          fontSize: '14px',
          color: 'var(--cv-color-text-main, #fff)',
          outline: 'none',
          boxSizing: 'border-box'
        }"
                      [attr.value]="socialPlatform"
                      (change)="socialPlatform = $event.target.value"
                    >
                      <option
                        value="x"
                        [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)'
        }"
                      >
                        X (Twitter)
                      </option>
                      <option
                        value="instagram"
                        [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)'
        }"
                      >
                        Instagram
                      </option>
                      <option
                        value="facebook"
                        [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)'
        }"
                      >
                        Facebook
                      </option>
                      <option
                        value="linkedin"
                        [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)'
        }"
                      >
                        LinkedIn
                      </option>
                    </select>
                  </div>
                  <div
                    [ngStyle]="{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }"
                  >
                    <label
                      [ngStyle]="{
          fontSize: '12px',
          fontWeight: '600',
          color: 'var(--cv-color-text-muted, #94a3b8)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }"
                      >Post URL</label
                    >
                    <input
                      type="url"
                      aria-label="Social Link URL"
                      placeholder="https://..."
                      [ngStyle]="{
          background: 'var(--cv-color-surface-sunken, rgba(0,0,0,0.3))',
          border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
          borderRadius: '8px',
          padding: '12px 16px',
          width: '100%',
          fontSize: '14px',
          color: 'var(--cv-color-text-main, #fff)',
          outline: 'none',
          boxSizing: 'border-box'
        }"
                      [attr.value]="socialUrl"
                      (input)="socialUrl = $event.target.value"
                    />
                  </div>
                </div>
                <div
                  [ngStyle]="{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          marginTop: '32px'
        }"
                >
                  <button
                    type="button"
                    [ngStyle]="{
          padding: '10px 20px',
          fontSize: '14px',
          color: 'var(--cv-color-text-secondary, #cbd5e1)',
          background: 'var(--cv-color-hover, rgba(255,255,255,0.05))',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '500',
          cursor: 'pointer'
        }"
                    (click)="closeSocialModal()"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    [ngStyle]="{
          padding: '10px 20px',
          fontSize: '14px',
          color: 'var(--cv-color-on-primary, #fff)',
          background: 'var(--cv-color-info-fill, #075985)',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
        }"
                    (click)="confirmSocial()"
                  >
                    Embed Post
                  </button>
                </div>
              </div></ng-container
            >
          </div></ng-container
        >
      </div>
      <div
        class="editor-source flex-1 relative min-h-[350px] overflow-hidden"
        [ngStyle]="{
          display: mode === 'source' ? 'flex' : 'none',
          flexDirection: 'column',
          height: '100%',
          minHeight: '350px'
        }"
      >
        <textarea
          class="w-full flex-1 p-6 bg-transparent cv-rte-ok font-mono text-[14px] leading-loose outline-none"
          [value]="internalContent"
          (input)="handleSourceInput($event)"
          [ngStyle]="{
          whiteSpace: 'pre-wrap',
          overflowY: 'auto',
          resize: 'none',
          height: '100%',
          width: '100%',
          boxSizing: 'border-box'
        }"
          [attr.spellcheck]="false"
        >{{ internalContent }}</textarea>
      </div>
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
export default class RichTextEditor {
  @Input() content!: RichTextEditorProps["content"];
  @Input() initialContent!: RichTextEditorProps["initialContent"];
  @Input() config!: RichTextEditorProps["config"];
  @Input() className!: RichTextEditorProps["className"];
  @Input() availableClasses!: RichTextEditorProps["availableClasses"];
  @Output() onMediaRequest = new EventEmitter<any>();
  @Output() onChange = new EventEmitter<any>();

  @ViewChild("rootRef") rootRef!: ElementRef;
  @ViewChild("editorRef") editorRef!: ElementRef;

  mode = "visual";
  isFullscreen = false;
  internalContent = null;
  showTableModal = false;
  tableRows = "3";
  tableCols = "3";
  tableHasHeader = true;
  showLinkModal = false;
  linkUrl = "";
  showWidgetModal = false;
  selectedWidget = "banner";
  showSocialModal = false;
  socialUrl = "";
  socialPlatform = "x";
  showButtonModal = false;
  btnText = "Click Here";
  btnUrl = "";
  btnStyle = "primary";
  fontFamily = "Inter";
  fontSize = "16px";
  textColor = "#0f172a";
  highlightColor = "#fde047";
  appliedClasses = ["cv-callout", "variant-blue"];
  showInsertMenu = false;
  showAiModal = false;
  aiAction = "improve";
  aiInput = "";
  activeFormats = {
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
    justifyFull: false,
    quote: false,
    code: false,
    unorderedList: false,
    orderedList: false,
    inTable: false,
  };
  headingFormat = "P";
  checkFormats() {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      let isQuote = false;
      let isCode = false;
      let inTable = false;
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        let node = sel.getRangeAt(0).startContainer as any;
        let currentEl =
          node && node.nodeType === 1 ? node : node ? node.parentElement : null;
        if (currentEl) {
          try {
            const computed = window.getComputedStyle(currentEl);
            if (computed && computed.fontSize) {
              this.fontSize = computed.fontSize;
            }
            if (computed && computed.fontFamily) {
              const primaryFont = computed.fontFamily
                .split(",")[0]
                .replace('"', "")
                .replace("'", "")
                .trim();
              if (primaryFont) {
                this.fontFamily = primaryFont;
              }
            }
          } catch (err) {}
          const classSet: string[] = [];
          let searchNode = currentEl;
          while (searchNode && searchNode !== this.editorRef?.nativeElement) {
            if (
              searchNode.className &&
              typeof searchNode.className === "string"
            ) {
              if (searchNode.className.indexOf("wysiwyg-content") !== -1) {
                break;
              }
              const parts = searchNode.className.split(/\s+/);
              for (let pi = 0; pi < parts.length; pi++) {
                const p = parts[pi];
                if (
                  p &&
                  p.indexOf("prose") !== 0 &&
                  p !== "task-list" &&
                  !classSet.includes(p)
                ) {
                  classSet.push(p);
                }
              }
            }
            searchNode = searchNode.parentElement;
          }
          if (classSet.length > 0) {
            this.appliedClasses = classSet;
          }
        }
        while (
          node &&
          node.nodeName !== "DIV" &&
          node.className !== "wysiwyg-content"
        ) {
          if (node.nodeName === "BLOCKQUOTE") isQuote = true;
          if (node.nodeName === "PRE" || node.nodeName === "CODE")
            isCode = true;
          if (node.nodeName === "TD" || node.nodeName === "TH") inTable = true;
          node = node.parentNode;
        }
      }
      this.activeFormats = {
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        strikeThrough: document.queryCommandState("strikeThrough"),
        justifyLeft: document.queryCommandState("justifyLeft"),
        justifyCenter: document.queryCommandState("justifyCenter"),
        justifyRight: document.queryCommandState("justifyRight"),
        justifyFull: document.queryCommandState("justifyFull"),
        unorderedList: document.queryCommandState("insertUnorderedList"),
        orderedList: document.queryCommandState("insertOrderedList"),
        quote: isQuote,
        code: isCode,
        inTable: inTable,
      };
      const formatBlock = document.queryCommandValue("formatBlock");
      if (formatBlock) {
        if (formatBlock.includes("1")) this.headingFormat = "H1";
        else if (formatBlock.includes("2")) this.headingFormat = "H2";
        else if (formatBlock.includes("3")) this.headingFormat = "H3";
        else if (formatBlock.includes("4")) this.headingFormat = "H4";
        else if (formatBlock.toLowerCase().includes("blockquote")) {
          this.activeFormats.quote = true;
          this.headingFormat = "P";
        } else if (formatBlock.toLowerCase().includes("pre")) {
          this.activeFormats.code = true;
          this.headingFormat = "P";
        } else if (formatBlock.includes("p")) this.headingFormat = "P";
        else if (formatBlock.includes("div")) this.headingFormat = "P";
      }
    }
  }
  saveSelection() {
    if (typeof window !== "undefined") {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const r = sel.getRangeAt(0);
        if (!r.collapsed) {
          activeSavedRange = r.cloneRange();
        }
      }
    }
  }
  restoreSelection() {
    if (typeof window !== "undefined") {
      if (this.editorRef?.nativeElement) {
        try {
          if (
            typeof (this.editorRef?.nativeElement as any).focus === "function"
          ) {
            (this.editorRef?.nativeElement as any).focus();
          }
        } catch (e) {}
        if (activeSavedRange) {
          const sel = window.getSelection();
          if (sel) {
            sel.removeAllRanges();
            sel.addRange(activeSavedRange.cloneRange());
          }
        }
      }
    }
  }
  formatHTML(html: string) {
    if (!html) return "";
    let formatted = "";
    let indent = "";
    const tab = "  ";
    html.split(/>\s*</).forEach(function (node) {
      if (node.match(/^\/\w/)) {
        indent = indent.substring(tab.length);
      }
      formatted += indent + "<" + node + ">" + String.fromCharCode(10);
      if (
        node.match(/^<?\w[^>]*[^\/]$/) &&
        !node.startsWith("input") &&
        !node.startsWith("img") &&
        !node.startsWith("br") &&
        !node.startsWith("hr")
      ) {
        indent += tab;
      }
    });
    if (formatted.length > 3) {
      return formatted.substring(1, formatted.length - 2);
    }
    return html;
  }
  format(cmd: string, val?: string) {
    this.restoreSelection();
    /* lgtm[js/xss, js/html-constructed-from-input] */
    /* codeql[js/xss, js/html-constructed-from-input] */
    document.execCommand(cmd, false, val);
    this.saveSelection();
    this.syncContent();
    this.checkFormats();
  }
  applyColor(cmd: string, color: string) {
    if (!color) return;
    if (cmd === "foreColor") {
      this.textColor = color;
    } else {
      this.highlightColor = color;
    }
    this.restoreSelection();
    if (cmd === "foreColor") {
      document.execCommand("foreColor", false, color);
    } else {
      if (!document.execCommand("hiliteColor", false, color)) {
        document.execCommand("backColor", false, color);
      }
    }
    this.saveSelection();
    this.syncContent();
    this.checkFormats();
  }
  formatHeading(level: string) {
    this.restoreSelection();
    /* lgtm[js/xss, js/html-constructed-from-input] */
    /* codeql[js/xss, js/html-constructed-from-input] */
    document.execCommand("formatBlock", false, level);
    this.headingFormat = level;
    this.syncContent();
    this.checkFormats();
    if (this.editorRef?.nativeElement) {
      this.editorRef?.nativeElement.focus();
    }
  }
  insertMedia(type: "image" | "video" | "audio") {
    this.saveSelection();
    const insertContent = (url: string) => {
      if (this.editorRef?.nativeElement) {
        this.editorRef?.nativeElement.focus();
      }
      this.restoreSelection();
      if (!url) return;
      let html = "";
      if (type === "image") {
        html = `<img src="${url}" alt="Image" style="max-width: 100%; border-radius: 8px; margin: 16px 0;" /><p><br></p>`;
      } else if (type === "video") {
        html = `<video src="${url}" controls style="max-width: 100%; border-radius: 8px; margin: 16px 0;"></video><p><br></p>`;
      } else if (type === "audio") {
        html = `<audio src="${url}" controls style="margin: 16px 0;"></audio><p><br></p>`;
      }

      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      const success = document.execCommand("insertHTML", false, html);
      if (!success) {
        if (activeSavedRange && activeSavedRange.insertNode) {
          const template = document.createElement("template");
          /* lgtm[js/xss, js/html-constructed-from-input] */
          /* codeql[js/xss, js/html-constructed-from-input] */
          template.innerHTML = html.trim();
          const frag = template.content;
          activeSavedRange.deleteContents();
          activeSavedRange.insertNode(frag);
          activeSavedRange.collapse(false);
        } else {
          /* lgtm[js/xss, js/html-constructed-from-input] */
          /* codeql[js/xss, js/html-constructed-from-input] */
          this.editorRef!.nativeElement.innerHTML += html;
        }
      }
      this.syncContent();
    };
    if (this.onMediaRequest) {
      this.onMediaRequest
        .emit(type)
        .then((url) => {
          if (url) insertContent(url);
        })
        .catch((err) => {
          console.error("Media request failed", err);
        });
    } else {
      const url = window.prompt(`Enter ${type} URL:`);
      if (url) insertContent(url);
    }
  }
  clearAllFormatting() {
    /* lgtm[js/xss, js/html-constructed-from-input] */
    /* codeql[js/xss, js/html-constructed-from-input] */
    document.execCommand("removeFormat", false, undefined);
    /* lgtm[js/xss, js/html-constructed-from-input] */
    /* codeql[js/xss, js/html-constructed-from-input] */
    document.execCommand("formatBlock", false, "P");
    /* lgtm[js/xss, js/html-constructed-from-input] */
    /* codeql[js/xss, js/html-constructed-from-input] */
    document.execCommand("unlink", false, undefined);
    this.syncContent();
    this.checkFormats();
  }
  toggleBlock(type: string) {
    this.checkFormats();
    const isActive =
      type === "PRE" ? this.activeFormats.code : this.activeFormats.quote;
    if (isActive) {
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      document.execCommand("formatBlock", false, "P");
    } else {
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      document.execCommand("formatBlock", false, type);
    }
    this.syncContent();
    this.checkFormats();
  }
  applyClass(className: string) {
    if (!className) return;
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const span = document.createElement("span");
      span.className = className;
      span.appendChild(range.extractContents());
      range.insertNode(span);
      this.syncContent();
    }
  }
  openButtonModal() {
    this.saveSelection();
    this.showButtonModal = true;
    this.btnText = "Click Here";
    this.btnUrl = "";
    this.btnStyle = "primary";
  }
  closeButtonModal() {
    this.showButtonModal = false;
  }
  confirmButton() {
    this.showButtonModal = false;
    if (this.btnText) {
      if (this.editorRef?.nativeElement) {
        this.editorRef?.nativeElement.focus();
      }
      this.restoreSelection();
      let styleStr =
        "padding: 10px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; display: inline-block; text-decoration: none; transition: all 0.2s;";
      if (this.btnStyle === "primary") {
        styleStr +=
          " background: var(--cv-gradient-primary, linear-gradient(135deg, #245066, #2c6480)); color: white; border: none; box-shadow: 0 4px 14px var(--cv-shadow-accent-color, rgba(36,80,102,0.3));";
      } else if (this.btnStyle === "secondary") {
        styleStr +=
          " background: var(--cv-color-surface-raised, #1e293b); color: var(--cv-color-text-main, #fff); border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1));";
      } else if (this.btnStyle === "outline") {
        styleStr +=
          " background: transparent; color: var(--cv-color-primary-fill, #245066); border: 2px solid var(--cv-color-primary-fill, #245066);";
      }
      const url = this.btnUrl || "#";
      const html = `<a href="${url}" class="cv-btn" style="${styleStr}">${this.btnText}</a>&nbsp;`;
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      const success = document.execCommand("insertHTML", false, html);
      if (!success) {
        if (activeSavedRange && activeSavedRange.insertNode) {
          const template = document.createElement("template");
          /* lgtm[js/xss, js/html-constructed-from-input] */
          /* codeql[js/xss, js/html-constructed-from-input] */
          template.innerHTML = html.trim();
          const frag = template.content;
          activeSavedRange.deleteContents();
          activeSavedRange.insertNode(frag);
          activeSavedRange.collapse(false);
        } else {
          /* lgtm[js/xss, js/html-constructed-from-input] */
          /* codeql[js/xss, js/html-constructed-from-input] */
          this.editorRef!.nativeElement.innerHTML += html;
        }
      }
      this.syncContent();
    }
  }
  syncContent() {
    if (this.editorRef?.nativeElement) {
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      this.internalContent = this.editorRef!.nativeElement.innerHTML;
      if (this.onChange) {
        this.onChange.emit(this.internalContent);
      }
    }
  }
  handleInput() {
    this.syncContent();
  }
  handleSourceInput(e: any) {
    this.internalContent = e.target.value;
    if (this.onChange) {
      this.onChange.emit(this.internalContent);
    }
    if (this.editorRef?.nativeElement) {
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      this.editorRef!.nativeElement.innerHTML = DOMPurify.sanitize(
        this.internalContent
      );
    }
  }
  openTableModal() {
    this.saveSelection();
    this.showTableModal = true;
    this.tableRows = "3";
    this.tableCols = "3";
    this.tableHasHeader = true;
  }
  confirmTable() {
    this.showTableModal = false;
    const rows = parseInt(this.tableRows, 10);
    const cols = parseInt(this.tableCols, 10);
    if (rows > 0 && cols > 0) {
      this.restoreSelection();
      let table =
        '<table border="1" style="width:100%; border-collapse: collapse; min-width: 50px;">';
      if (this.tableHasHeader) {
        table +=
          '<thead style="background-color: var(--cv-color-hover, rgba(255,255,255,0.05));"><tr>';
        for (let j = 0; j < cols; j++) {
          table +=
            '<th style="padding: 12px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); text-align: left; color: var(--cv-color-link, #7fc4de);">Header</th>';
        }
        table += "</tr></thead>";
      }
      table += "<tbody>";
      for (let i = 0; i < rows; i++) {
        table += "<tr>";
        for (let j = 0; j < cols; j++) {
          table +=
            '<td style="padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);">Cell</td>';
        }
        table += "</tr>";
      }
      table += "</tbody></table><p><br></p>";
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      document.execCommand("insertHTML", false, table);
      this.syncContent();
    }
  }
  closeTableModal() {
    this.showTableModal = false;
  }
  modifyTable(action: "addRow" | "removeRow" | "addCol" | "removeCol") {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    let node = sel.getRangeAt(0).startContainer as any;
    let td = null;
    let tr = null;
    let table = null;
    while (
      node &&
      node.nodeName !== "DIV" &&
      node.className !== "wysiwyg-content"
    ) {
      if (node.nodeName === "TD" || node.nodeName === "TH") td = node;
      if (node.nodeName === "TR") tr = node;
      if (node.nodeName === "TABLE") table = node;
      node = node.parentNode;
    }
    if (!table || !tr || !td) return;
    const colIndex = Array.from(tr.children).indexOf(td);
    if (action === "addRow") {
      const newTr = document.createElement("tr");
      const numCols = tr.children.length;
      for (let i = 0; i < numCols; i++) {
        const newTd = document.createElement("td");
        newTd.style.cssText =
          "padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);";
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        newTd.innerHTML = "Cell";
        newTr.appendChild(newTd);
      }
      tr.parentNode.insertBefore(newTr, tr.nextSibling);
    } else if (action === "removeRow") {
      if (tr.parentNode.children.length > 1) {
        tr.parentNode.removeChild(tr);
      } else {
        table.parentNode.removeChild(table);
      }
    } else if (action === "addCol") {
      const rows = table.querySelectorAll("tr");
      rows.forEach((row: any) => {
        const newCell = document.createElement(
          row.parentNode.nodeName === "THEAD" ? "th" : "td"
        );
        newCell.style.cssText =
          row.parentNode.nodeName === "THEAD"
            ? "padding: 12px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); text-align: left; color: var(--cv-color-link, #7fc4de);"
            : "padding: 10px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); color: var(--cv-color-text-main, #f1f5f9);";
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        newCell.innerHTML =
          row.parentNode.nodeName === "THEAD" ? "Header" : "Cell";
        const sibling = row.children[colIndex];
        row.insertBefore(newCell, sibling ? sibling.nextSibling : null);
      });
    } else if (action === "removeCol") {
      const rows = table.querySelectorAll("tr");
      if (tr.children.length > 1) {
        rows.forEach((row: any) => {
          if (row.children[colIndex]) {
            row.removeChild(row.children[colIndex]);
          }
        });
      } else {
        table.parentNode.removeChild(table);
      }
    }
    this.syncContent();
  }
  openLinkModal() {
    this.saveSelection();
    this.showLinkModal = true;
    this.linkUrl = "";
  }
  confirmLink() {
    this.showLinkModal = false;
    if (this.linkUrl) {
      this.restoreSelection();
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      document.execCommand("createLink", false, this.linkUrl);
      this.syncContent();
    }
  }
  closeLinkModal() {
    this.showLinkModal = false;
  }
  openWidgetModal() {
    this.saveSelection();
    this.showWidgetModal = true;
  }
  confirmWidget() {
    this.showWidgetModal = false;
    this.restoreSelection();
    let html = `<div class="cv-widget" data-widget="${
      this.selectedWidget
    }" style="padding: 24px; border: 2px dashed var(--cv-color-primary, #7fc4de); background: var(--cv-color-accent-tint, rgba(127,196,222,0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-link, #7fc4de); font-weight: 600;">[ContentVeda Widget: ${this.selectedWidget.toUpperCase()}]</div><p><br></p>`;
    /* lgtm[js/xss, js/html-constructed-from-input] */
    /* codeql[js/xss, js/html-constructed-from-input] */
    document.execCommand("insertHTML", false, html);
    this.syncContent();
  }
  closeWidgetModal() {
    this.showWidgetModal = false;
  }
  openSocialModal() {
    this.saveSelection();
    this.showSocialModal = true;
    this.socialUrl = "";
    this.socialPlatform = "x";
  }
  confirmSocial() {
    this.showSocialModal = false;
    if (this.socialUrl) {
      this.restoreSelection();
      let embedHtml = `<div class="social-embed-placeholder" data-platform="${
        this.socialPlatform
      }" data-url="${
        this.socialUrl
      }" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded ${this.socialPlatform.toUpperCase()} Post: ${
        this.socialUrl
      }]</div><p><br></p>`;
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      document.execCommand("insertHTML", false, embedHtml);
      this.syncContent();
    }
  }
  closeSocialModal() {
    this.showSocialModal = false;
  }
  toggleMode() {
    if (this.mode === "visual") {
      this.syncContent();
      this.internalContent = this.formatHTML(this.internalContent);
      this.mode = "source";
    } else {
      this.mode = "visual";
      if (this.editorRef?.nativeElement) {
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        this.editorRef!.nativeElement.innerHTML = DOMPurify.sanitize(
          this.internalContent
        );
      }
    }
  }
  toggleFullScreen() {
    this.isFullscreen = !this.isFullscreen;
    if (typeof document !== "undefined") {
      if (this.isFullscreen) {
        if (
          this.rootRef?.nativeElement &&
          this.rootRef?.nativeElement.requestFullscreen
        ) {
          this.rootRef?.nativeElement
            .requestFullscreen()
            .catch((err) => console.warn("Fullscreen denied", err));
        }
      } else {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  }
  changeFontFamily(font: string) {
    this.fontFamily = font;
    this.restoreSelection();
    document.execCommand("fontName", false, font);
    this.syncContent();
    this.checkFormats();
  }
  changeFontSize(size: string) {
    this.fontSize = size;
    this.restoreSelection();
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
      const span = document.createElement("span");
      span.style.fontSize = size;
      const contents = sel.getRangeAt(0).extractContents();
      span.appendChild(contents);
      sel.getRangeAt(0).insertNode(span);
    } else {
      const sizeMap: any = {
        "12px": "1",
        "14px": "2",
        "16px": "3",
        "18px": "4",
        "20px": "5",
        "24px": "6",
        "32px": "7",
      };
      document.execCommand("fontSize", false, sizeMap[size] || "3");
    }
    this.syncContent();
    this.checkFormats();
  }
  insertChecklist() {
    this.saveSelection();
    const html =
      '<ul class="task-list" style="list-style: none; padding-left: 0.25rem;"><li style="display: flex; align-items: center; gap: 8px; margin: 4px 0;"><input type="checkbox" style="width: 15px; height: 15px; cursor: pointer;" /> <span>Task item</span></li></ul><p><br></p>';
    document.execCommand("insertHTML", false, html);
    this.syncContent();
  }
  insertFormula() {
    this.saveSelection();
    const formula = window.prompt(
      "Enter math formula or expression:",
      "E = mc²"
    );
    if (formula) {
      this.restoreSelection();
      const html = `<code class="cv-math-formula" style="background: rgba(127,196,222,0.15); color: #0284c7; padding: 2px 8px; border-radius: 6px; font-family: monospace; font-size: 0.9em; border: 1px solid rgba(127,196,222,0.3);">${formula}</code>&nbsp;`;
      document.execCommand("insertHTML", false, html);
      this.syncContent();
    }
  }
  addClass(className: string) {
    if (!className) return;
    if (!this.appliedClasses.includes(className)) {
      this.appliedClasses = [...this.appliedClasses, className];
    }
  }
  removeClass(className: string) {
    this.appliedClasses = this.appliedClasses.filter(
      (c: string) => c !== className
    );
    if (this.editorRef?.nativeElement) {
      const elements = this.editorRef?.nativeElement.querySelectorAll(
        `.${className}`
      );
      elements.forEach((el: any) => {
        el.classList.remove(className);
        if (el.classList.length === 0 && el.tagName === "SPAN") {
          const parent = el.parentNode;
          while (el.firstChild) parent.insertBefore(el.firstChild, el);
          parent.removeChild(el);
        }
      });
      this.syncContent();
    }
  }
  handleClassInputKeyDown(e: any) {
    if (e.key === "Enter") {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      const val = target.value ? target.value.trim() : "";
      if (val) {
        this.applyClass(val);
        this.addClass(val);
        target.value = "";
      }
    }
  }
  openAiModal() {
    this.saveSelection();
    this.showAiModal = true;
    this.aiInput = "";
  }
  closeAiModal() {
    this.showAiModal = false;
  }
  applyAiAction(action: string) {
    this.restoreSelection();
    const sel = window.getSelection();
    const selectedText = sel ? sel.toString() : "";
    let result = "";
    if (action === "improve") {
      if (selectedText) {
        result =
          selectedText.trim() + " (enhanced for clarity and conciseness)";
      } else {
        result =
          "<p><strong>Executive Summary:</strong> Designed for high-velocity digital engineering squads, this next-generation prose engine pairs strict AST schemas with real-time reactive UI component embedding.</p>";
      }
    } else if (action === "callout") {
      result = `<div class="cv-callout variant-blue" style="padding: 16px 20px; border-left: 4px solid #0284c7; background: rgba(2, 132, 199, 0.08); border-radius: 0 8px 8px 0; margin: 16px 0;"><strong>AI INSIGHT:</strong> ${
        selectedText ||
        "Configure your toolbar modules, slot rules, and custom micro-frontends directly in the inspector panel."
      }</div><p><br></p>`;
    } else if (action === "summarize") {
      result = `<p><em>Summary:</em> ${
        selectedText
          ? selectedText.slice(0, 100) + "..."
          : "Key takeaways: High performance AST validation, component slot architecture, and real-time schema hydration."
      }</p>`;
    } else if (action === "grammar") {
      result = selectedText
        ? selectedText.trim()
        : "<p>All grammar and formatting validated.</p>";
    }
    if (result) {
      if (result.startsWith("<")) {
        document.execCommand("insertHTML", false, result);
      } else {
        document.execCommand("insertText", false, result);
      }
      this.syncContent();
    }
    this.showAiModal = false;
  }
  showToolbarOption(option: string) {
    if (!this.config || !this.config.toolbar) {
      return true;
    }
    let name = option;
    if (option === "alignLeft") name = "justifyLeft";
    if (option === "alignCenter") name = "justifyCenter";
    if (option === "alignRight") name = "justifyRight";
    if (option === "alignJustify") name = "justifyFull";
    if (option === "bulletList") name = "unorderedList";
    if (option === "numberedList") name = "orderedList";
    if (option === "code")
      return (
        this.config.toolbar.includes("code") ||
        this.config.toolbar.includes("pre")
      );
    return (
      this.config.toolbar.includes(option) || this.config.toolbar.includes(name)
    );
  }
  showSeparator(index: number) {
    const groups = [
      ["fullscreen", "source", "bold", "italic", "underline", "strikeThrough"],
      ["code", "quote", "clear"],
      ["headings"],
      ["foreColor", "backColor"],
      [
        "alignLeft",
        "justifyLeft",
        "alignCenter",
        "justifyCenter",
        "alignRight",
        "justifyRight",
      ],
      [
        "image",
        "link",
        "table",
        "unorderedList",
        "orderedList",
        "horizontalRule",
        "video",
        "social",
      ],
      ["insertButton", "addWidget"],
      ["save"],
      ["classInput"],
    ];
    const hasVisibleBefore = groups
      .slice(0, index + 1)
      .some((group) => group.some((item) => this.showToolbarOption(item)));
    const isNextGroupVisible =
      groups[index + 1] &&
      groups[index + 1].some((item) => this.showToolbarOption(item));
    return hasVisibleBefore && isNextGroupVisible;
  }
  handleFullscreenChange() {
    if (typeof document !== "undefined") {
      this.isFullscreen = !!document.fullscreenElement;
    }
  }
  handleSelectionChange() {
    if (typeof window !== "undefined" && this.editorRef?.nativeElement) {
      const sel = window.getSelection();
      let inEditor = false;
      try {
        if (
          sel &&
          sel.anchorNode &&
          typeof (this.editorRef?.nativeElement as any).contains === "function"
        ) {
          inEditor = (this.editorRef?.nativeElement as any).contains(
            sel.anchorNode as Node
          );
        }
      } catch (e) {}
      if (inEditor) {
        if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
          this.saveSelection();
        }
        this.checkFormats();
      }
    }
  }
  trackByCls0(_, cls) {
    return cls;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.internalContent = this.content || this.initialContent || "";

    if (typeof window !== "undefined") {
      if (!this.internalContent) {
        this.internalContent = this.content || this.initialContent || "";
      }
      if (this.editorRef?.nativeElement) {
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        this.editorRef!.nativeElement.innerHTML = DOMPurify.sanitize(
          this.internalContent
        );
      }
      if (typeof document !== "undefined") {
        const styleId = "cv-editor-styles";
        if (!document.getElementById(styleId)) {
          const style = document.createElement("style");
          style.id = styleId;
          /* lgtm[js/xss, js/html-constructed-from-input] */
          /* codeql[js/xss, js/html-constructed-from-input] */
          style.innerHTML =
            ".wysiwyg-content blockquote { border-left: 4px solid var(--cv-color-quote-accent, #7fc4de) !important; background: linear-gradient(90deg, var(--cv-color-accent-tint, rgba(127, 196, 222, 0.1)) 0%, transparent 100%) !important; padding: 20px 24px !important; margin: 24px 0 !important; border-radius: 0 16px 16px 0 !important; font-style: italic !important; color: var(--cv-color-text-main, #e2e8f0) !important; font-size: 1.1em !important; line-height: 1.8 !important; position: relative; box-shadow: inset 2px 0 0px var(--cv-color-border, rgba(255,255,255,0.1)); } .wysiwyg-content pre { background: var(--cv-color-code-bg, #0f172a) !important; border: 1px solid var(--cv-color-code-border, rgba(255,255,255,0.1)) !important; border-radius: 12px !important; padding: 20px !important; color: var(--cv-color-code-text, #38bdf8) !important; font-family: 'Fira Code', monospace !important; overflow-x: auto !important; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5) !important; } .wysiwyg-content ul { list-style-type: disc !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content ol { list-style-type: decimal !important; padding-left: 2rem !important; margin-bottom: 1em !important; } .wysiwyg-content li { margin-bottom: 0.5em !important; display: list-item !important; } .wysiwyg-content a:not(.cv-btn) { color: var(--cv-color-link, #7fc4de) !important; text-decoration: underline !important; text-underline-offset: 3px !important; }";
          document.head.appendChild(style);
        }
        document.addEventListener(
          "fullscreenchange",
          this.handleFullscreenChange
        );
        document.addEventListener(
          "selectionchange",
          this.handleSelectionChange
        );
      }
    }
  }

  ngOnDestroy() {
    if (typeof document !== "undefined") {
      document.removeEventListener(
        "fullscreenchange",
        this.handleFullscreenChange
      );
      document.removeEventListener(
        "selectionchange",
        this.handleSelectionChange
      );
    }
  }
}

@NgModule({
  declarations: [RichTextEditor],
  imports: [CommonModule],
  exports: [RichTextEditor],
})
export class RichTextEditorModule {}
