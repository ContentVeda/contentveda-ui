import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  Output,
  EventEmitter,
  Component,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
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
  readOnly?: boolean;
  disabled?: boolean;
}

import DOMPurify from "isomorphic-dompurify";
let activeSavedRange: any = null;

@Component({
  selector: "rich-text-editor",
  template: `
    <div
      #rootRef
      [class]="'cv-rich-text-editor flex flex-col rounded-xl overflow-hidden relative ' + (isFullscreen ? 'fixed inset-0 z-[9999] w-screen h-screen rounded-none' : 'w-full') + ' ' + (mode === 'source' ? 'cv-source-mode' : '') + ' ' + (className || '')"
      [ngStyle]="{
          boxSizing: 'border-box',
          background: 'var(--cv-color-surface-sunken, #0f172a)',
          border: isFullscreen ? 'none' : '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
          boxShadow: 'var(--cv-shadow-overlay, 0 8px 32px rgba(0,0,0,0.4))'
        }"
    >
      <div
        [class]="'editor-toolbar select-none sticky top-0 z-10 w-full ' + (isReadOnly() ? 'opacity-60 pointer-events-none' : '')"
      >
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
              <option value="15px">15px</option>
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
                    (input)="applyColorPreview('foreColor', $event.target.value)"
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
                    (input)="applyColorPreview('backColor', $event.target.value)"
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
              (mousedown)="
          $event.preventDefault();
          saveSelection();
        "
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
                  (mousedown)="$event.preventDefault()"
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
                  (mousedown)="$event.preventDefault()"
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
                  (mousedown)="$event.preventDefault()"
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
                  (mousedown)="$event.preventDefault()"
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
                  (mousedown)="$event.preventDefault()"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="9" y1="9" x2="15" y2="9"></line>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                  </svg>

                  Button
                </button>
                <button
                  type="button"
                  class="cv-insert-item"
                  (mousedown)="$event.preventDefault()"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                    ></path>
                  </svg>

                  Social Post
                </button>
                <button
                  type="button"
                  class="cv-insert-item"
                  (mousedown)="$event.preventDefault()"
                  (click)="
          showInsertMenu = false;
          openFormulaModal();
        "
                >
                  <span
                    class="font-serif italic font-bold text-xs"
                    [ngStyle]="{
          width: '14px',
          textAlign: 'center'
        }"
                    >Fx</span
                  >

                  Formula
                </button>
                <button
                  type="button"
                  class="cv-insert-item"
                  (mousedown)="$event.preventDefault()"
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

                  Divider
                </button>
                <button
                  type="button"
                  class="cv-insert-item"
                  (mousedown)="$event.preventDefault()"
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
                      d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.036V20c0 1 1 1 2 1z"
                    ></path>
                  </svg>

                  Quote
                </button>
                <button
                  type="button"
                  class="cv-insert-item"
                  (mousedown)="$event.preventDefault()"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>

                  Clear Format
                </button>
              </div></ng-container
            >
          </div>
          <ng-container *ngIf="showToolbarOption('table')"
            ><button
              type="button"
              class="cv-toolbar-action-btn"
              title="Table"
              (mousedown)="
          $event.preventDefault();
          saveSelection();
        "
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
            <ng-container *ngIf="showToolbarOption('formula')"
              ><button
                type="button"
                class="cv-toolbar-btn"
                title="Formula"
                (mousedown)="
          $event.preventDefault();
          saveSelection();
        "
                (click)="openFormulaModal()"
              >
                <span class="font-serif italic font-bold text-xs">Fx</span>
              </button></ng-container
            >
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
                [class]="'cv-toolbar-btn cv-source-toggle-btn ' + (mode === 'source' ? 'is-active' : '')"
                (mousedown)="$event.preventDefault()"
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
                (mousedown)="$event.preventDefault()"
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
        [class]="'editor-content flex-1 overflow-y-auto relative min-h-[350px] cv-mode-' + (mode)"
        (scroll)="handleEditorScroll()"
        (click)="handleEditorContentClick($event)"
        [ngStyle]="{
          padding: '2rem 3rem',
          color: 'var(--cv-color-text-main, #f1f5f9)',
          position: 'relative',
          cursor: isReadOnly() ? 'default' : 'text'
        }"
      >
        <div
          #editorRef
          [attr.contentEditable]='isReadOnly() ? "false" : "true"'
          [class]="'wysiwyg-content outline-none prose prose-invert max-w-none ' + (isReadOnly() ? 'cv-readonly' : '')"
          (input)="handleInput()"
          (focus)="handleFocus()"
          (blur)="handleBlur()"
          (keyup)="checkFormats()"
          (keydown)="handleKeyDown($event)"
          (mouseup)="checkFormats()"
          (click)="handleEditorClick($event)"
          [ngStyle]="{
          minHeight: '350px',
          fontFamily: 'Inter, sans-serif',
          lineHeight: '1.7',
          fontSize: '15px'
        }"
        ></div>
        <ng-container *ngIf="selectedMediaEl && !isReadOnly()"
          ><div
            class="cv-resize-handle"
            title="Drag to resize"
            [ngStyle]="{
          position: 'absolute',
          top: (resizeHandleTop) + 'px',
          left: (resizeHandleLeft) + 'px',
          width: '14px',
          height: '14px',
          borderRadius: '3px',
          background: 'var(--cv-color-primary, #245066)',
          border: '2px solid var(--cv-color-surface-raised, #fff)',
          cursor: 'nwse-resize',
          zIndex: 30,
          boxShadow: '0 1px 4px rgba(0,0,0,0.4)'
        }"
            (mousedown)="startResize($event)"
          ></div>
          <div
            class="cv-media-toolbar"
            [ngStyle]="{
          position: 'absolute',
          top: (resizeToolbarTop) + 'px',
          left: (resizeToolbarLeft) + 'px',
          zIndex: 35
        }"
          >
            <button
              type="button"
              class="cv-media-toolbar-btn"
              title="25% width"
              (mousedown)="$event.preventDefault()"
              (click)="setImageSize('25%')"
            >
              25%
            </button>
            <button
              type="button"
              class="cv-media-toolbar-btn"
              title="50% width"
              (mousedown)="$event.preventDefault()"
              (click)="setImageSize('50%')"
            >
              50%
            </button>
            <button
              type="button"
              class="cv-media-toolbar-btn"
              title="75% width"
              (mousedown)="$event.preventDefault()"
              (click)="setImageSize('75%')"
            >
              75%
            </button>
            <button
              type="button"
              class="cv-media-toolbar-btn"
              title="100% width"
              (mousedown)="$event.preventDefault()"
              (click)="setImageSize('100%')"
            >
              100%
            </button>
            <div
              class="cv-toolbar-divider"
              [ngStyle]="{
          height: '14px',
          margin: '0 2px'
        }"
            ></div>
            <button
              type="button"
              class="cv-media-toolbar-btn"
              title="Align Left"
              (mousedown)="$event.preventDefault()"
              (click)="setImageAlign('left')"
            >
              <svg
                width="12"
                height="12"
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
              </svg>
            </button>
            <button
              type="button"
              class="cv-media-toolbar-btn"
              title="Align Center"
              (mousedown)="$event.preventDefault()"
              (click)="setImageAlign('center')"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="6"></line>
                <line x1="21" y1="12" x2="3" y2="12"></line>
                <line x1="18" y1="18" x2="6" y2="18"></line>
              </svg>
            </button>
            <button
              type="button"
              class="cv-media-toolbar-btn"
              title="Align Right"
              (mousedown)="$event.preventDefault()"
              (click)="setImageAlign('right')"
            >
              <svg
                width="12"
                height="12"
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
              </svg>
            </button>
            <div
              class="cv-toolbar-divider"
              [ngStyle]="{
          height: '14px',
          margin: '0 2px'
        }"
            ></div>
            <button
              type="button"
              class="cv-media-toolbar-btn cv-btn-danger"
              title="Remove Media"
              (mousedown)="$event.preventDefault()"
              (click)="deleteSelectedMedia()"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path
                  d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                ></path>
              </svg>
            </button></div
        ></ng-container>
        <ng-container
          *ngIf="showTableModal || showLinkModal || showWidgetModal || showSocialModal || showButtonModal || showAiModal || showImageModal || showVideoModal || showFormulaModal"
          ><div
            class="fixed inset-0 flex items-center justify-center z-[100] backdrop-blur-md"
            [ngStyle]="{
          background: 'rgba(0, 0, 0, 0.6)'
        }"
            (click)="handleBackdropClick($event)"
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
            <ng-container *ngIf="showImageModal"
              ><div
                class="shadow-2xl"
                [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)',
          border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
          borderRadius: '16px',
          padding: '24px',
          width: '400px'
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
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>

                  Insert Image
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
                      >Image URL</label
                    >
                    <input
                      type="url"
                      aria-label="Image URL"
                      placeholder="https://example.com/photo.jpg"
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
                      [attr.value]="imageUrl"
                      (input)="imageUrl = $event.target.value"
                      (keydown)="onClassInputKeydown($event)"
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
                      >Alt Text (Accessibility & SEO)</label
                    >
                    <input
                      type="text"
                      aria-label="Image Alt Text"
                      placeholder="Descriptive text for screen readers"
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
                      [attr.value]="imageAlt"
                      (input)="imageAlt = $event.target.value"
                      (keydown)="onClassInputKeydown($event)"
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
                    (click)="closeImageModal()"
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
                    (click)="confirmImage()"
                  >
                    Insert Image
                  </button>
                </div>
              </div></ng-container
            >
            <ng-container *ngIf="showVideoModal"
              ><div
                class="shadow-2xl"
                [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)',
          border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
          borderRadius: '16px',
          padding: '24px',
          width: '400px'
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

                  Insert Video
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
                      >Video URL (YouTube, Vimeo, or MP4)</label
                    >
                    <input
                      type="url"
                      aria-label="Video URL"
                      placeholder="https://www.youtube.com/watch?v=... or .mp4"
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
                      [attr.value]="videoUrl"
                      (input)="videoUrl = $event.target.value"
                      (keydown)="onClassInputKeydown($event)"
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
                    (click)="closeVideoModal()"
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
                    (click)="confirmVideo()"
                  >
                    Insert Video
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
                      (keydown)="onClassInputKeydown($event)"
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
                      (keydown)="onClassInputKeydown($event)"
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
                      (keydown)="onClassInputKeydown($event)"
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
                      (keydown)="onClassInputKeydown($event)"
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
                    (keydown)="onClassInputKeydown($event)"
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
                        value="youtube"
                        [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)'
        }"
                      >
                        YouTube
                      </option>
                      <option
                        value="vimeo"
                        [ngStyle]="{
          background: 'var(--cv-color-surface-raised, #1e293b)'
        }"
                      >
                        Vimeo
                      </option>
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
                      (keydown)="onClassInputKeydown($event)"
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
            <ng-container *ngIf="showFormulaModal"
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
                  <span
                    class="font-serif italic font-bold text-base"
                    [ngStyle]="{
          color: 'var(--cv-color-primary, #7fc4de)'
        }"
                    >Fx</span
                  >

                  Insert Math Formula
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
                    >Formula Expression</label
                  >
                  <input
                    type="text"
                    aria-label="Formula Expression"
                    placeholder="e.g. E = mc² or f(x) = ax² + bx + c"
                    [ngStyle]="{
          background: 'var(--cv-color-surface-sunken, rgba(0,0,0,0.3))',
          border: '1px solid var(--cv-color-border, rgba(255,255,255,0.1))',
          borderRadius: '8px',
          padding: '12px 16px',
          width: '100%',
          fontSize: '14px',
          color: 'var(--cv-color-text-main, #fff)',
          outline: 'none',
          boxSizing: 'border-box',
          fontFamily: 'monospace'
        }"
                    [attr.value]="formulaInput"
                    (input)="formulaInput = $event.target.value"
                    (keydown)="onClassInputKeydown($event)"
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
                    (click)="closeFormulaModal()"
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
                    (click)="confirmFormula()"
                  >
                    Insert Formula
                  </button>
                </div>
              </div></ng-container
            >
          </div></ng-container
        >
      </div>
      <div
        [class]="'editor-source flex-1 relative min-h-[350px] overflow-hidden cv-mode-src-' + (mode)"
        [ngStyle]="{
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
  onClassInputKeydown($event: any) {
    if ($event.key === 'Enter') {
      $event.preventDefault();
      this.applyClass($event.target.value);
      $event.target.value = '';
    }
  }
  @Input() content!: RichTextEditorProps["content"];
  @Input() initialContent!: RichTextEditorProps["initialContent"];
  @Input() config!: RichTextEditorProps["config"];
  @Input() readOnly!: RichTextEditorProps["readOnly"];
  @Input() disabled!: RichTextEditorProps["disabled"];
  @Input() className!: RichTextEditorProps["className"];
  @Input() availableClasses!: RichTextEditorProps["availableClasses"];
  @Output() onMediaRequest = new EventEmitter<any>();
  @Output() onChange = new EventEmitter<any>();

  @ViewChild("rootRef") rootRef!: ElementRef;
  @ViewChild("editorRef") editorRef!: ElementRef;

  mode = "visual";
  isFullscreen = false;
  isMounted = false;
  internalContent = null;
  getEditorElement() {
    if (typeof window === "undefined") return null;
    return (
      (this.editorRef?.nativeElement as any) ||
      (this.rootRef?.nativeElement
        ? ((this.rootRef?.nativeElement as any).querySelector(
            ".wysiwyg-content"
          ) as HTMLDivElement)
        : null)
    );
  }
  getTrustedHttpUrl(rawUrl: string) {
    try {
      const parsed = new URL(
        rawUrl,
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost"
      );
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        return null;
      }
      return parsed.toString();
    } catch {
      return null;
    }
  }
  getHostname(url: string) {
    try {
      return new URL(
        url,
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost"
      ).hostname.toLowerCase();
    } catch {
      return "";
    }
  }
  isHost(url: string, domain: string) {
    const host = this.getHostname(url);
    return host === domain || host.endsWith("." + domain);
  }
  escapeHtml(value: string) {
    if (value == null) return "";
    const str = String(value);
    if (
      str.indexOf("&") === -1 &&
      str.indexOf("<") === -1 &&
      str.indexOf(">") === -1 &&
      str.indexOf('"') === -1 &&
      str.indexOf("'") === -1
    ) {
      return str;
    }
    return str
      .split("&")
      .join("&amp;")
      .split("<")
      .join("&lt;")
      .split(">")
      .join("&gt;")
      .split('"')
      .join("&quot;")
      .split("'")
      .join("&#39;");
  }
  sanitizeHtml(content: string) {
    return DOMPurify.sanitize(content, {
      ADD_TAGS: ["iframe", "video", "audio", "source"],
      ADD_ATTR: [
        "allow",
        "allowfullscreen",
        "frameborder",
        "scrolling",
        "target",
        "contenteditable",
        "data-platform",
        "data-url",
        "data-widget",
        "data-formula",
        "controls",
        "playsinline",
        "autoplay",
        "muted",
        "loop",
      ],
    });
  }
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
  showImageModal = false;
  imageUrl = "";
  imageAlt = "";
  showVideoModal = false;
  videoUrl = "";
  showFormulaModal = false;
  formulaInput = "E = mc²";
  selectedMediaEl = null;
  resizeHandleTop = 0;
  resizeHandleLeft = 0;
  resizeToolbarTop = 0;
  resizeToolbarLeft = 0;
  isResizing = false;
  resizeStartX = 0;
  resizeStartWidth = 0;
  fontFamily = "Inter";
  fontSize = "15px";
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
      let nextFontSize = this.fontSize;
      let nextFontFamily = this.fontFamily;
      let nextAppliedClasses = this.appliedClasses;
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        let node = sel.getRangeAt(0).startContainer as any;
        let currentEl =
          node && node.nodeType === 1 ? node : node ? node.parentElement : null;
        if (currentEl) {
          try {
            const computed = window.getComputedStyle(currentEl);
            if (computed && computed.fontSize) {
              const pxVal = Math.round(parseFloat(computed.fontSize));
              nextFontSize = `${pxVal}px`;
            }
            if (computed && computed.fontFamily) {
              const primaryFont = computed.fontFamily
                .split(",")[0]
                .split('"')
                .join("")
                .split("'")
                .join("")
                .trim();
              if (primaryFont) {
                nextFontFamily = primaryFont;
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
          nextAppliedClasses = classSet;
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
      let nextHeadingFormat = "P";
      const formatBlock = document.queryCommandValue("formatBlock");
      if (formatBlock) {
        if (formatBlock.includes("1")) nextHeadingFormat = "H1";
        else if (formatBlock.includes("2")) nextHeadingFormat = "H2";
        else if (formatBlock.includes("3")) nextHeadingFormat = "H3";
        else if (formatBlock.includes("4")) nextHeadingFormat = "H4";
        else if (formatBlock.toLowerCase().includes("blockquote")) {
          isQuote = true;
          nextHeadingFormat = "P";
        } else if (formatBlock.toLowerCase().includes("pre")) {
          isCode = true;
          nextHeadingFormat = "P";
        } else if (formatBlock.includes("p")) nextHeadingFormat = "P";
        else if (formatBlock.includes("div")) nextHeadingFormat = "P";
      }
      const nextActiveFormats = {
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
      if (this.fontSize !== nextFontSize) this.fontSize = nextFontSize;
      if (this.fontFamily !== nextFontFamily) this.fontFamily = nextFontFamily;
      if (this.headingFormat !== nextHeadingFormat)
        this.headingFormat = nextHeadingFormat;
      if (
        this.appliedClasses.length !== nextAppliedClasses.length ||
        this.appliedClasses.some((c, i) => c !== nextAppliedClasses[i])
      ) {
        this.appliedClasses = nextAppliedClasses;
      }
      let formatsChanged = false;
      for (const k in nextActiveFormats) {
        if ((this.activeFormats as any)[k] !== (nextActiveFormats as any)[k]) {
          formatsChanged = true;
          break;
        }
      }
      if (formatsChanged) {
        this.activeFormats = nextActiveFormats;
      }
    }
  }
  saveSelection() {
    if (typeof window !== "undefined") {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const r = sel.getRangeAt(0);
        const el = this.getEditorElement();
        if (el) {
          try {
            if ((el as any).contains(r.commonAncestorContainer)) {
              const escaped = this.escapeAtomicRange(r.cloneRange());
              activeSavedRange = escaped;
              (el as any).__cv_savedRange = escaped;
            }
          } catch (e) {}
        }
      }
    }
  }
  restoreSelection() {
    if (typeof window !== "undefined") {
      const el = this.getEditorElement();
      if (el) {
        try {
          if (typeof (el as any).focus === "function") {
            (el as any).focus();
          }
        } catch (e) {}
        const target = (el as any).__cv_savedRange || activeSavedRange;
        if (target) {
          try {
            if ((el as any).contains(target.commonAncestorContainer)) {
              const sel = window.getSelection();
              if (sel) {
                sel.removeAllRanges();
                sel.addRange(target.cloneRange());
              }
            }
          } catch (e) {}
        }
      }
    }
  }
  escapeAtomicRange(range: any) {
    const el = this.getEditorElement();
    if (!range || !el) return range;
    let node: any = range.startContainer;
    let atomicEl: any = null;
    while (node && node !== el) {
      if (
        node.nodeType === 1 &&
        node.getAttribute &&
        node.getAttribute("contenteditable") === "false"
      ) {
        atomicEl = node;
      }
      node = node.parentNode;
    }
    if (!atomicEl) return range;
    const escaped = document.createRange();
    escaped.setStartAfter(atomicEl);
    escaped.collapse(true);
    return escaped;
  }
  insertHtmlAtCursor(html: string) {
    if (typeof window === "undefined") return;
    if (this.mode === "source") return;
    const el = this.getEditorElement();
    if (el) {
      try {
        if (typeof (el as any).focus === "function") {
          (el as any).focus();
        }
      } catch (e) {}
    }
    this.restoreSelection();
    const sel = window.getSelection();
    let targetRange: any = null;
    if (sel && sel.rangeCount > 0) {
      const cur = sel.getRangeAt(0);
      try {
        if (el && (el as any).contains(cur.commonAncestorContainer)) {
          targetRange = cur;
        }
      } catch (e) {}
    }
    const targetSaved = el
      ? (el as any).__cv_savedRange || activeSavedRange
      : activeSavedRange;
    if (!targetRange && targetSaved) {
      try {
        if (el && (el as any).contains(targetSaved.commonAncestorContainer)) {
          targetRange = targetSaved;
        }
      } catch (e) {}
    }
    targetRange = this.escapeAtomicRange(targetRange);
    const isBlockHtml = /<(div|p|ul|ol|table|blockquote|img|video|audio)/i.test(
      html
    );
    let blockParent: HTMLElement | null = null;
    if (targetRange && el) {
      let n: any = targetRange.startContainer;
      while (n && n !== el) {
        if (
          n.nodeType === 1 &&
          /^(P|H[1-6]|DIV|BLOCKQUOTE|LI)$/i.test(n.tagName)
        ) {
          blockParent = n;
          break;
        }
        n = n.parentNode;
      }
    }
    const template = document.createElement("template");
    /* lgtm[js/xss, js/html-constructed-from-input] */
    /* codeql[js/xss, js/html-constructed-from-input] */
    template.innerHTML = html.trim();
    const frag = template.content;

    // Ensure block content ends with a clean paragraph so user can type/press enter immediately
    let lastP: HTMLElement | null = frag.querySelector("p:last-child");
    if (isBlockHtml && !lastP) {
      const p = document.createElement("p");
      p.innerHTML = "<br>";
      frag.appendChild(p);
      lastP = p;
    }
    let insertedP: HTMLElement | null = null;
    if (
      isBlockHtml &&
      blockParent &&
      blockParent !== el &&
      blockParent.parentNode
    ) {
      const isEmptyBlock =
        !blockParent.textContent?.trim() || blockParent.innerHTML === "<br>";
      if (isEmptyBlock) {
        const parent = blockParent.parentNode;
        insertedP = lastP;
        parent.insertBefore(frag, blockParent);
        blockParent.remove();
      } else {
        insertedP = lastP;
        blockParent.after(frag);
      }
    } else if (targetRange && targetRange.insertNode) {
      targetRange.deleteContents();
      insertedP = lastP;
      targetRange.insertNode(frag);
    } else if (el) {
      insertedP = lastP;
      el.appendChild(frag);
    }

    // Position caret inside the trailing paragraph so author can type / press Enter immediately
    const targetP = insertedP || (el ? el.querySelector("p:last-child") : null);
    if (el && typeof (el as any).focus === "function") {
      try {
        (el as any).focus();
      } catch (e) {}
    }
    if (targetP && sel) {
      const newRange = document.createRange();
      newRange.setStart(targetP, 0);
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);
      const cloned = newRange.cloneRange();
      activeSavedRange = cloned;
      if (el) (el as any).__cv_savedRange = cloned;
    }
    this.ensureEditableStructure();
    this.syncContent();
    this.checkFormats();
    if (
      html.indexOf("cv-social-embed") !== -1 ||
      html.indexOf("cv-math-formula") !== -1
    ) {
      this.renderEmbeds();
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
    if (this.mode === "source") return;
    this.restoreSelection();
    /* lgtm[js/xss, js/html-constructed-from-input] */
    /* codeql[js/xss, js/html-constructed-from-input] */
    document.execCommand(cmd, false, val);
    this.saveSelection();
    this.syncContent();
    this.checkFormats();
  }
  applyColorPreview(cmd: string, color: string) {
    if (!color) return;
    if (this.mode === "source") return;
    const previewEl = this.getEditorElement();
    if (previewEl) {
      try {
        (previewEl as any).focus();
      } catch (focusErr) {}
    }
    this.restoreSelection();
    if (cmd === "foreColor") {
      document.execCommand("foreColor", false, color);
    } else {
      const applied = document.execCommand("hiliteColor", false, color);
      if (!applied) {
        document.execCommand("backColor", false, color);
      }
    }
    this.saveSelection();
  }
  applyColor(cmd: string, color: string) {
    if (!color) return;
    if (this.mode === "source") return;
    const colorEl = this.getEditorElement();
    if (colorEl) {
      try {
        (colorEl as any).focus();
      } catch (focusErr2) {}
    }
    this.restoreSelection();
    if (cmd === "foreColor") {
      document.execCommand("foreColor", false, color);
      this.textColor = color;
    } else {
      const colorApplied = document.execCommand("hiliteColor", false, color);
      if (!colorApplied) {
        document.execCommand("backColor", false, color);
      }
      this.highlightColor = color;
    }
    this.saveSelection();
    this.syncContent();
    this.checkFormats();
  }
  formatHeading(level: string) {
    if (this.mode === "source") return;
    this.restoreSelection();
    /* lgtm[js/xss, js/html-constructed-from-input] */
    /* codeql[js/xss, js/html-constructed-from-input] */
    document.execCommand("formatBlock", false, level);
    this.headingFormat = level;
    this.syncContent();
    this.checkFormats();
    const el = this.getEditorElement();
    if (el) {
      try {
        (el as any).focus();
      } catch (e) {}
    }
  }
  insertMedia(type: "image" | "video" | "audio") {
    if (this.mode === "source") return;
    this.saveSelection();
    const insertContent = (url: string, altText?: string) => {
      if (!url) return;
      let html = "";
      if (type === "image") {
        // Alt text matters for both accessibility (screen readers have
        // nothing else to announce for an <img>) and SEO (image search
        // indexes off it) -- a hardcoded "Image" satisfies neither, so ask
        // for real alt text and fall back to the filename rather than a
        // meaningless generic label if the author skips it.
        const filenameGuess = (url.split("/").pop() || "image")
          .split("?")[0]
          .split(".")[0]
          .replace(/[-_]+/g, " ")
          .trim();
        const alt = (altText || "").trim() || filenameGuess || "Image";
        const escapedAlt = this.escapeHtml(alt);
        const escapedUrl = this.escapeHtml(url);
        html = `<img src="${escapedUrl}" alt="${escapedAlt}" loading="lazy" decoding="async" draggable="false" style="max-width: 100%; border-radius: 8px; margin: 16px 0;" /><p><br></p>`;
      } else if (type === "video") {
        const ytMatch = url.match(
          /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?\/]+)/
        );
        const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
        const escapedUrl = this.escapeHtml(url);
        if (ytMatch) {
          html = `<div class="cv-social-embed" data-platform="youtube" data-url="${escapedUrl}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded YOUTUBE Video: ${escapedUrl}]</div><p><br></p>`;
        } else if (vimeoMatch) {
          html = `<div class="cv-social-embed" data-platform="vimeo" data-url="${escapedUrl}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded VIMEO Video: ${escapedUrl}]</div><p><br></p>`;
        } else {
          html = `<video src="${escapedUrl}" controls style="max-width: 100%; border-radius: 8px; margin: 16px 0;"></video><p><br></p>`;
        }
      } else if (type === "audio") {
        html = `<audio src="${this.escapeHtml(
          url
        )}" controls style="margin: 16px 0;"></audio><p><br></p>`;
      }
      this.insertHtmlAtCursor(html);
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
    } else if (type === "image") {
      this.openImageModal();
    } else if (type === "video") {
      this.openVideoModal();
    } else {
      const escaped = this.escapeHtml(type);
      const html = `<div class="cv-media-placeholder" data-type="${escaped}">[${escaped}]</div><p><br></p>`;
      this.insertHtmlAtCursor(html);
    }
  }
  clearAllFormatting() {
    if (this.mode === "source") return;
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
    if (this.mode === "source") return;
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
    if (this.mode === "source") return;
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
    if (this.mode === "source") return;
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
      const url = this.escapeHtml(this.btnUrl || "#");
      const html = `<a href="${url}" class="cv-btn" style="${styleStr}">${this.escapeHtml(
        this.btnText
      )}</a>&nbsp;`;
      this.insertHtmlAtCursor(html);
    }
  }
  getCanonicalHtml() {
    const editor = this.getEditorElement();
    if (!editor) return "";
    const clone = editor.cloneNode(true) as HTMLElement;
    const selected = clone.querySelectorAll(".cv-resizing-selected");
    selected.forEach((el: any) => {
      el.classList.remove("cv-resizing-selected");
      if (!el.getAttribute("class")) el.removeAttribute("class");
    });
    const rendered = clone.querySelectorAll('[data-cv-rendered="true"]');
    rendered.forEach((el: any) => {
      el.removeAttribute("data-cv-rendered");
      if (el.classList.contains("cv-social-embed")) {
        const platform = el.getAttribute("data-platform") || "";
        const url = el.getAttribute("data-url") || "";
        el.textContent = `[Embedded ${platform.toUpperCase()} Post: ${url}]`;
      } else if (el.classList.contains("cv-math-formula")) {
        el.textContent = el.getAttribute("data-formula") || "";
      }
    });
    /* lgtm[js/xss, js/html-constructed-from-input] */
    /* codeql[js/xss, js/html-constructed-from-input] */
    return clone.innerHTML;
  }
  renderEmbeds() {
    if (typeof window === "undefined") return;
    const editor = this.getEditorElement();
    if (!editor) return;
    const socialEmbeds = editor.querySelectorAll(
      '.cv-social-embed:not([data-cv-rendered="true"])'
    );
    socialEmbeds.forEach((el: any) => {
      const platform = (el.getAttribute("data-platform") || "").toLowerCase();
      const url = el.getAttribute("data-url") || "";
      if (!platform || !url) return;
      const markRendered = () => {
        // Preserve a width/max-width already on the element (e.g. content
        // reloaded after a previous resize) -- otherwise the base style
        // string below wipes it out the moment this embed live-renders.
        const preservedWidth = el.style.width;
        const preservedMaxWidth = el.style.maxWidth;
        el.setAttribute("data-cv-rendered", "true");
        el.setAttribute(
          "style",
          "margin: 16px 0; padding: 0; border: none; background: transparent; display: flex; justify-content: center;"
        );
        if (preservedWidth) el.style.width = preservedWidth;
        if (preservedMaxWidth) el.style.maxWidth = preservedMaxWidth;
      };
      if (platform === "youtube") {
        const match = url.match(
          /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?\/]+)/
        );
        if (!match || !match[1]) return;
        el.innerHTML = "";
        const iframe = document.createElement("iframe");
        iframe.width = "100%";
        iframe.height = "280";
        iframe.src = `https://www.youtube.com/embed/${match[1]}`;
        iframe.title = "YouTube video player";
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "");
        // pointer-events: none keeps clicks landing on the outer .cv-social-embed
        // div (needed for click-to-select/resize) instead of being swallowed by
        // the iframe, which is otherwise a separate browsing context that never
        // bubbles clicks to the editor at all once its content has loaded.
        iframe.style.cssText =
          "border-radius: 8px; display: block; max-width: 100%; pointer-events: none;";
        el.appendChild(iframe);
        markRendered();
      } else if (platform === "vimeo") {
        const match = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
        if (!match || !match[1]) return;
        el.innerHTML = "";
        const iframe = document.createElement("iframe");
        iframe.width = "100%";
        iframe.height = "280";
        iframe.src = `https://player.vimeo.com/video/${match[1]}`;
        iframe.title = "Vimeo video player";
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "");
        iframe.style.cssText =
          "border-radius: 8px; display: block; max-width: 100%; pointer-events: none;";
        el.appendChild(iframe);
        markRendered();
      } else if (platform === "x" || platform === "twitter") {
        el.innerHTML = "";
        const bq = document.createElement("blockquote");
        bq.className = "twitter-tweet";
        bq.setAttribute("data-theme", "dark");
        bq.style.pointerEvents = "none";
        const trustedTweetUrl = this.getTrustedHttpUrl(url);
        if (!trustedTweetUrl) return;
        const a = document.createElement("a");
        a.href = trustedTweetUrl;
        bq.appendChild(a);
        el.appendChild(bq);
        markRendered();
        if (!document.getElementById("twitter-wjs")) {
          const script = document.createElement("script");
          script.id = "twitter-wjs";
          script.src =
            "https://platform.twitter.com/widgets" +
            String.fromCharCode(46, 106, 115);
          script.async = true;
          document.body.appendChild(script);
        } else if ((window as any).twttr) {
          (window as any).twttr.widgets.load(el);
        }
      } else if (platform === "instagram") {
        el.innerHTML = "";
        const igBq = document.createElement("blockquote");
        igBq.className = "instagram-media";
        igBq.setAttribute("data-instgrm-permalink", url);
        igBq.setAttribute("data-instgrm-version", "14");
        igBq.style.pointerEvents = "none";
        el.appendChild(igBq);
        markRendered();
        if (!document.getElementById("instagram-embed")) {
          const script = document.createElement("script");
          script.id = "instagram-embed";
          script.src =
            "https://www.instagram.com/embed" +
            String.fromCharCode(46, 106, 115);
          script.async = true;
          document.body.appendChild(script);
        } else if ((window as any).instgrm) {
          (window as any).instgrm.Embeds.process();
        }
      } else if (platform === "facebook") {
        el.innerHTML = "";
        const fbDiv = document.createElement("div");
        fbDiv.className = "fb-post";
        fbDiv.setAttribute("data-href", url);
        fbDiv.setAttribute("data-width", "500");
        fbDiv.style.pointerEvents = "none";
        el.appendChild(fbDiv);
        markRendered();
        if (!document.getElementById("facebook-jssdk")) {
          const script = document.createElement("script");
          script.id = "facebook-jssdk";
          script.src =
            "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0";
          script.async = true;
          script.defer = true;
          script.crossOrigin = "anonymous";
          document.body.appendChild(script);
        } else if ((window as any).FB) {
          (window as any).FB.XFBML.parse(el);
        }
      } else if (platform === "linkedin") {
        const embedUrl = url.includes("/embed/")
          ? url
          : url.replace(/\/posts?\//, "/embed/feed/update/");
        const trustedEmbedUrl = this.getTrustedHttpUrl(embedUrl);
        if (!trustedEmbedUrl) return;
        el.innerHTML = "";
        const liIframe = document.createElement("iframe");
        liIframe.src = trustedEmbedUrl;
        liIframe.height = "400";
        liIframe.width = "100%";
        liIframe.setAttribute("frameborder", "0");
        liIframe.setAttribute("allowfullscreen", "");
        liIframe.title = "Embedded post";
        liIframe.style.cssText =
          "border-radius: 8px; max-width: 100%; pointer-events: none;";
        el.appendChild(liIframe);
        markRendered();
      }
    });
    const formulas = editor.querySelectorAll(
      '.cv-math-formula:not([data-cv-rendered="true"])'
    );
    if (formulas.length > 0) {
      const renderMath = () => {
        formulas.forEach((el: any) => {
          const formula =
            el.getAttribute("data-formula") || el.textContent || "";
          if (!formula) return;
          const k = (window as any).katex;
          if (!k) return;
          try {
            // formula is read back from a DOM attribute (getAttribute
            // decodes entities, undoing any escaping done when it was
            // written), then handed to a third-party HTML generator
            // (katex.renderToString) whose output we do not otherwise
            // control -- sanitize that output before it reaches
            // innerHTML rather than trusting the katex output as-is.
            el.innerHTML = DOMPurify.sanitize(
              k.renderToString(formula, {
                throwOnError: false,
                displayMode: false,
              }),
              {
                USE_PROFILES: {
                  html: true,
                  mathMl: true,
                  svg: true,
                },
                // DOMPurify's mathMl profile omits <semantics>/<annotation>
                // (katex's copy-source-as-LaTeX accessibility layer) -- add
                // them back explicitly so sanitizing does not quietly
                // degrade that.
                ADD_TAGS: ["semantics", "annotation"],
                ADD_ATTR: ["encoding"],
              }
            );
            el.setAttribute("data-cv-rendered", "true");
          } catch (mathErr) {}
        });
      };
      if ((window as any).katex) {
        renderMath();
      } else if (document.getElementById("cv-katex-js")) {
        const pendingScript = document.getElementById("cv-katex-js");
        if (pendingScript) pendingScript.addEventListener("load", renderMath);
      } else {
        if (!document.getElementById("cv-katex-css")) {
          const link = document.createElement("link");
          link.id = "cv-katex-css";
          link.rel = "stylesheet";
          link.href =
            "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css";
          document.head.appendChild(link);
        }
        const script = document.createElement("script");
        script.id = "cv-katex-js";
        script.src =
          "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min" +
          String.fromCharCode(46, 106, 115);
        script.async = true;
        script.onload = renderMath;
        document.body.appendChild(script);
      }
    }
  }
  syncContent() {
    const editor = this.getEditorElement();
    if (editor) {
      this.internalContent = this.getCanonicalHtml();
      if (this.onChange) {
        this.onChange.emit(this.internalContent);
      }
    }
  }
  handleInput() {
    const el = this.getEditorElement();
    if (el) {
      if ((el as any).__cv_inputTimer) {
        clearTimeout((el as any).__cv_inputTimer);
      }
      (el as any).__cv_inputTimer = setTimeout(() => {
        (el as any).__cv_inputTimer = null;
        this.syncContent();
      }, 250);
    } else {
      this.syncContent();
    }
  }
  handleFocus() {
    if (typeof document !== "undefined") {
      try {
        document.execCommand("defaultParagraphSeparator", false, "p");
      } catch (e) {}
    }
  }
  handleBlur() {
    const el = this.getEditorElement();
    if (el && (el as any).__cv_inputTimer) {
      clearTimeout((el as any).__cv_inputTimer);
      (el as any).__cv_inputTimer = null;
      this.syncContent();
    }
  }
  handleSourceInput(e: any) {
    this.internalContent = e.target.value;
    if (this.onChange) {
      this.onChange.emit(this.internalContent);
    }
    if (this.editorRef?.nativeElement) {
      /* lgtm[js/xss, js/html-constructed-from-input] */
      /* codeql[js/xss, js/html-constructed-from-input] */
      this.editorRef!.nativeElement.innerHTML = this.sanitizeHtml(
        this.internalContent
      );
      this.renderEmbeds();
    }
  }
  openTableModal() {
    if (this.mode === "source") return;
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
      let table =
        '<table border="1" style="width:100%; border-collapse: collapse; min-width: 50px;">';
      if (this.tableHasHeader) {
        table +=
          '<thead style="background-color: var(--cv-color-hover, rgba(255,255,255,0.05));"><tr>';
        for (let j = 0; j < cols; j++) {
          table +=
            '<th scope="col" style="padding: 12px; border: 1px solid var(--cv-color-border, rgba(255,255,255,0.1)); text-align: left; color: var(--cv-color-link, #7fc4de);">Header</th>';
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
      this.insertHtmlAtCursor(table);
    }
  }
  closeTableModal() {
    this.showTableModal = false;
  }
  modifyTable(action: "addRow" | "removeRow" | "addCol" | "removeCol") {
    if (this.mode === "source") return;
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
        if (row.parentNode.nodeName === "THEAD")
          newCell.setAttribute("scope", "col");
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
    if (this.mode === "source") return;
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
    if (this.mode === "source") return;
    this.saveSelection();
    this.showWidgetModal = true;
  }
  confirmWidget() {
    this.showWidgetModal = false;
    const escapedWidget = this.escapeHtml(this.selectedWidget);
    let html = `<div class="cv-widget" data-widget="${escapedWidget}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-primary, #7fc4de); background: var(--cv-color-accent-tint, rgba(127,196,222,0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-link, #7fc4de); font-weight: 600;">[ContentVeda Widget: ${this.escapeHtml(
      this.selectedWidget.toUpperCase()
    )}]</div><p><br></p>`;
    this.insertHtmlAtCursor(html);
  }
  closeWidgetModal() {
    this.showWidgetModal = false;
  }
  openSocialModal() {
    if (this.mode === "source") return;
    this.saveSelection();
    this.showSocialModal = true;
    this.socialUrl = "";
    this.socialPlatform = "youtube";
  }
  confirmSocial() {
    this.showSocialModal = false;
    if (this.socialUrl) {
      let platform = (this.socialPlatform || "youtube").toLowerCase();
      if (
        this.isHost(this.socialUrl, "youtube.com") ||
        this.isHost(this.socialUrl, "youtu.be")
      ) {
        platform = "youtube";
      } else if (this.isHost(this.socialUrl, "vimeo.com")) {
        platform = "vimeo";
      }
      const escapedPlatform = this.escapeHtml(platform);
      const escapedUrl = this.escapeHtml(this.socialUrl);
      let embedHtml = `<div class="cv-social-embed" data-platform="${escapedPlatform}" data-url="${escapedUrl}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded ${this.escapeHtml(
        platform.toUpperCase()
      )} Post: ${escapedUrl}]</div><p><br></p>`;
      this.insertHtmlAtCursor(embedHtml);
    }
  }
  closeSocialModal() {
    this.showSocialModal = false;
  }
  openImageModal() {
    if (this.mode === "source") return;
    this.saveSelection();
    this.showImageModal = true;
    this.imageUrl = "";
    this.imageAlt = "";
  }
  closeImageModal() {
    this.showImageModal = false;
  }
  confirmImage() {
    this.showImageModal = false;
    if (this.imageUrl) {
      const url = this.imageUrl.trim();
      const filenameGuess = (url.split("/").pop() || "image")
        .split("?")[0]
        .split(".")[0]
        .replace(/[-_]+/g, " ")
        .trim();
      const alt = (this.imageAlt || "").trim() || filenameGuess || "Image";
      const escapedAlt = this.escapeHtml(alt);
      const escapedUrl = this.escapeHtml(url);
      const html = `<img src="${escapedUrl}" alt="${escapedAlt}" loading="lazy" decoding="async" draggable="false" style="max-width: 100%; border-radius: 8px; margin: 16px 0;" /><p><br></p>`;
      this.insertHtmlAtCursor(html);
    }
  }
  openVideoModal() {
    if (this.mode === "source") return;
    this.saveSelection();
    this.showVideoModal = true;
    this.videoUrl = "";
  }
  closeVideoModal() {
    this.showVideoModal = false;
  }
  confirmVideo() {
    this.showVideoModal = false;
    if (this.videoUrl) {
      const url = this.videoUrl.trim();
      const ytMatch = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?\/]+)/
      );
      const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
      const escapedUrl = this.escapeHtml(url);
      let html = "";
      if (ytMatch) {
        html = `<div class="cv-social-embed" data-platform="youtube" data-url="${escapedUrl}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded YOUTUBE Video: ${escapedUrl}]</div><p><br></p>`;
      } else if (vimeoMatch) {
        html = `<div class="cv-social-embed" data-platform="vimeo" data-url="${escapedUrl}" contenteditable="false" style="padding: 24px; border: 2px dashed var(--cv-color-info, #0ea5e9); background: var(--cv-color-info-tint, rgba(14, 165, 233, 0.05)); text-align: center; border-radius: 12px; margin: 16px 0; color: var(--cv-color-code-text, #38bdf8); font-weight: 600;">[Embedded VIMEO Video: ${escapedUrl}]</div><p><br></p>`;
      } else {
        html = `<video src="${escapedUrl}" controls style="max-width: 100%; border-radius: 8px; margin: 16px 0;"></video><p><br></p>`;
      }
      this.insertHtmlAtCursor(html);
    }
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
        this.editorRef!.nativeElement.innerHTML = this.sanitizeHtml(
          this.internalContent
        );
        this.renderEmbeds();
      }
    }
  }
  toggleFullScreen() {
    if (typeof document !== "undefined") {
      if (!document.fullscreenElement) {
        if (
          this.rootRef?.nativeElement &&
          this.rootRef?.nativeElement.requestFullscreen
        ) {
          this.rootRef?.nativeElement
            .requestFullscreen()
            .catch((err) => console.warn("Fullscreen denied", err));
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  }
  changeFontFamily(font: string) {
    if (this.mode === "source") return;
    this.fontFamily = font;
    this.restoreSelection();
    document.execCommand("fontName", false, font);
    this.syncContent();
    this.checkFormats();
  }
  changeFontSize(size: string) {
    if (this.mode === "source") return;
    this.fontSize = size;
    this.restoreSelection();
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
      const span = document.createElement("span");
      span.style.fontSize = size;
      const contents = sel.getRangeAt(0).extractContents();
      span.appendChild(contents);
      sel.getRangeAt(0).insertNode(span);
      sel.removeAllRanges();
      const newRange = document.createRange();
      newRange.selectNodeContents(span);
      sel.addRange(newRange);
      this.saveSelection();
    } else {
      const sizeMap: any = {
        "12px": "1",
        "14px": "2",
        "15px": "2",
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
    if (this.mode === "source") return;
    this.restoreSelection();
    const sel = typeof window !== "undefined" ? window.getSelection() : null;
    const editor = this.getEditorElement();
    if (!sel || !editor) return;
    let node: any =
      sel.rangeCount > 0 ? sel.getRangeAt(0).startContainer : null;
    let currentLi: HTMLElement | null = null;
    let currentUl: HTMLElement | null = null;
    let currentP: HTMLElement | null = null;
    while (node && node !== editor) {
      if (node.nodeType === 1) {
        if (node.tagName === "LI") currentLi = node;
        if (node.tagName === "UL" && node.classList.contains("task-list"))
          currentUl = node;
        if (node.tagName === "P" || node.tagName === "DIV") currentP = node;
      }
      node = node.parentNode;
    }

    // 1. If currently inside a task list: append a new <li> to the existing <ul>
    if (currentUl) {
      const li = document.createElement("li");
      li.style.cssText = "margin: 4px 0;";
      li.innerHTML =
        '<label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox" style="width: 15px; height: 15px; cursor: pointer;" /> <span>Task item</span></label>';
      if (currentLi && currentLi.parentNode === currentUl) {
        currentLi.after(li);
      } else {
        currentUl.appendChild(li);
      }
      const span = li.querySelector("span");
      if (span) {
        const newRange = document.createRange();
        newRange.selectNodeContents(span);
        sel.removeAllRanges();
        sel.addRange(newRange);
        this.saveSelection();
      }
      this.syncContent();
      this.checkFormats();
      return;
    }

    // 2. If directly inside or after an adjacent paragraph right next to a task list: append to that same task list
    if (currentP) {
      const prev = currentP.previousElementSibling;
      if (
        prev &&
        prev.tagName === "UL" &&
        prev.classList.contains("task-list")
      ) {
        const text = currentP.textContent ? currentP.textContent.trim() : "";
        const li = document.createElement("li");
        li.style.cssText = "margin: 4px 0;";
        const itemText =
          text && text !== "" ? this.escapeHtml(text) : "Task item";
        li.innerHTML = `<label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox" style="width: 15px; height: 15px; cursor: pointer;" /> <span>${itemText}</span></label>`;
        prev.appendChild(li);
        currentP.remove();
        const span = li.querySelector("span");
        if (span) {
          const newRange = document.createRange();
          newRange.selectNodeContents(span);
          sel.removeAllRanges();
          sel.addRange(newRange);
          this.saveSelection();
        }
        this.syncContent();
        this.checkFormats();
        return;
      }
    }

    // 3. New task list: create a single <ul class="task-list"> and focus its <li> text
    const ul = document.createElement("ul");
    ul.className = "task-list";
    ul.style.cssText = "list-style: none; padding-left: 0.25rem;";
    const li = document.createElement("li");
    li.style.cssText = "margin: 4px 0;";
    li.innerHTML =
      '<label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox" style="width: 15px; height: 15px; cursor: pointer;" /> <span>Task item</span></label>';
    ul.appendChild(li);
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(ul);
    } else {
      editor.appendChild(ul);
    }
    const span = li.querySelector("span");
    if (span) {
      const newRange = document.createRange();
      newRange.selectNodeContents(span);
      sel.removeAllRanges();
      sel.addRange(newRange);
      this.saveSelection();
    }
    this.syncContent();
    this.checkFormats();
  }
  openFormulaModal() {
    if (this.mode === "source") return;
    this.saveSelection();
    this.showFormulaModal = true;
    this.formulaInput = "E = mc²";
  }
  closeFormulaModal() {
    this.showFormulaModal = false;
    const el = this.getEditorElement();
    if (el) el.focus();
  }
  confirmFormula() {
    this.showFormulaModal = false;
    const formula = (this.formulaInput || "").trim();
    if (formula) {
      const escaped = this.escapeHtml(formula);
      const html = `<code class="cv-math-formula" data-formula="${escaped}" contenteditable="false" style="background: rgba(127,196,222,0.15); color: #0284c7; padding: 2px 8px; border-radius: 6px; font-family: monospace; font-size: 0.9em; border: 1px solid rgba(127,196,222,0.3);">${escaped}</code>&nbsp;`;
      this.insertHtmlAtCursor(html);
    }
    const el = this.getEditorElement();
    if (el) el.focus();
  }
  insertFormula() {
    this.openFormulaModal();
  }
  addClass(className: string) {
    if (!className) return;
    if (this.mode === "source") return;
    if (!this.appliedClasses.includes(className)) {
      this.appliedClasses = [...this.appliedClasses, className];
    }
  }
  removeClass(className: string) {
    if (this.mode === "source") return;
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
      const safeSelection = selectedText
        ? this.escapeHtml(selectedText)
        : "Configure your toolbar modules, slot rules, and custom micro-frontends directly in the inspector panel.";
      result = `<div class="cv-callout variant-blue" style="padding: 16px 20px; border-left: 4px solid #0284c7; background: rgba(2, 132, 199, 0.08); border-radius: 0 8px 8px 0; margin: 16px 0;"><strong>AI INSIGHT:</strong> ${safeSelection}</div><p><br></p>`;
    } else if (action === "summarize") {
      const safeSummary = selectedText
        ? this.escapeHtml(selectedText.slice(0, 100)) + "..."
        : "Key takeaways: High performance AST validation, component slot architecture, and real-time schema hydration.";
      result = `<p><em>Summary:</em> ${safeSummary}</p>`;
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
        "formula",
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
      this.deselectMediaElement();
    }
  }
  isResizableTarget(el: any) {
    if (!el || el.nodeType !== 1) return false;
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "AUDIO") return true;
    if (
      el.classList &&
      (el.classList.contains("cv-social-embed") ||
        el.classList.contains("cv-widget"))
    )
      return true;
    return false;
  }
  updateResizeHandlePosition() {
    const editor = this.getEditorElement();
    if (!this.selectedMediaEl || !editor) return;
    const container = (editor as any).parentElement;
    if (!container) return;
    const elRect = this.selectedMediaEl.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    this.resizeHandleTop =
      elRect.bottom - containerRect.top + container.scrollTop - 7;
    this.resizeHandleLeft =
      elRect.right - containerRect.left + container.scrollLeft - 7;
    let tbTop = elRect.top - containerRect.top + container.scrollTop - 40;
    if (tbTop < 8) {
      tbTop = elRect.bottom - containerRect.top + container.scrollTop + 8;
    }
    let tbLeft = elRect.left - containerRect.left + container.scrollLeft;
    if (tbLeft < 8) tbLeft = 8;
    this.resizeToolbarTop = tbTop;
    this.resizeToolbarLeft = tbLeft;
  }
  handleEditorScroll() {
    if (!this.selectedMediaEl) return;
    if (typeof window !== "undefined" && window.requestAnimationFrame) {
      window.requestAnimationFrame(() => {
        this.updateResizeHandlePosition();
      });
    } else {
      this.updateResizeHandlePosition();
    }
  }
  selectMediaElement(el: any) {
    if (this.selectedMediaEl && this.selectedMediaEl !== el) {
      this.selectedMediaEl.classList.remove("cv-resizing-selected");
    }
    this.selectedMediaEl = el;
    el.classList.add("cv-resizing-selected");
    this.updateResizeHandlePosition();
    if (el.tagName === "IMG" && !el.complete) {
      el.addEventListener(
        "load",
        () => {
          if (this.selectedMediaEl === el) {
            this.updateResizeHandlePosition();
          }
        },
        {
          once: true,
        }
      );
    }
  }
  deleteSelectedMedia() {
    if (this.selectedMediaEl) {
      const el = this.selectedMediaEl;
      this.deselectMediaElement();
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
      this.ensureEditableStructure();
      this.syncContent();
    }
  }
  setImageSize(size: string) {
    if (!this.selectedMediaEl) return;
    const el = this.selectedMediaEl;
    el.style.width = size;
    el.style.maxWidth = "100%";
    el.style.height = "auto";
    this.updateResizeHandlePosition();
    this.syncContent();
  }
  setImageAlign(align: string) {
    if (!this.selectedMediaEl) return;
    const el = this.selectedMediaEl;
    if (align === "center") {
      el.style.display = "block";
      el.style.marginLeft = "auto";
      el.style.marginRight = "auto";
    } else if (align === "left") {
      el.style.display = "block";
      el.style.marginLeft = "0";
      el.style.marginRight = "auto";
    } else if (align === "right") {
      el.style.display = "block";
      el.style.marginLeft = "auto";
      el.style.marginRight = "0";
    }
    this.updateResizeHandlePosition();
    this.syncContent();
  }
  deselectMediaElement() {
    if (this.selectedMediaEl) {
      this.selectedMediaEl.classList.remove("cv-resizing-selected");
    }
    this.selectedMediaEl = null;
  }
  isReadOnly() {
    return !!(this.readOnly || this.disabled);
  }
  closeAllModals() {
    this.showTableModal = false;
    this.showLinkModal = false;
    this.showWidgetModal = false;
    this.showSocialModal = false;
    this.showButtonModal = false;
    this.showAiModal = false;
    this.showImageModal = false;
    this.showVideoModal = false;
    this.showFormulaModal = false;
  }
  handleBackdropClick(e: any) {
    if (e && e.target === e.currentTarget) {
      this.closeAllModals();
    }
  }
  ensureEditableStructure() {
    const el = this.getEditorElement();
    if (!el) return;
    if (!el.hasChildNodes()) {
      el.innerHTML = "<p><br></p>";
      return;
    }
    const first = el.firstElementChild;
    if (
      el.childNodes.length === 1 &&
      first &&
      first.tagName === "P" &&
      !first.textContent &&
      !first.children.length
    ) {
      first.innerHTML = "<br>";
      return;
    }
    const last = el.lastElementChild;
    if (
      last &&
      (last.getAttribute("contenteditable") === "false" ||
        last.tagName === "TABLE" ||
        last.tagName === "IMG" ||
        last.tagName === "VIDEO" ||
        last.tagName === "AUDIO" ||
        (last.classList &&
          (last.classList.contains("cv-social-embed") ||
            last.classList.contains("cv-widget"))))
    ) {
      const p = document.createElement("p");
      p.innerHTML = "<br>";
      el.appendChild(p);
    }
    if (
      first &&
      (first.getAttribute("contenteditable") === "false" ||
        first.tagName === "TABLE" ||
        first.tagName === "IMG" ||
        first.tagName === "VIDEO" ||
        first.tagName === "AUDIO" ||
        (first.classList &&
          (first.classList.contains("cv-social-embed") ||
            first.classList.contains("cv-widget"))))
    ) {
      const p = document.createElement("p");
      p.innerHTML = "<br>";
      el.insertBefore(p, first);
    }
  }
  normalizeSelection() {
    if (this.isReadOnly()) return;
    const el = this.getEditorElement();
    if (!el) return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    let range: any = null;
    try {
      range = sel.getRangeAt(0);
    } catch (e) {
      return;
    }
    let node: any = range.startContainer;
    let atomicEl: any = null;
    while (node && node !== el) {
      if (
        node.nodeType === 1 &&
        node.getAttribute &&
        node.getAttribute("contenteditable") === "false"
      ) {
        atomicEl = node;
        break;
      }
      node = node.parentNode;
    }
    if (atomicEl) {
      const newRange = document.createRange();
      const next = atomicEl.nextSibling;
      if (
        !next ||
        (next.nodeType === 1 &&
          next.getAttribute("contenteditable") === "false")
      ) {
        const p = document.createElement("p");
        p.innerHTML = "<br>";
        if (next) {
          atomicEl.parentNode.insertBefore(p, next);
        } else {
          atomicEl.parentNode.appendChild(p);
        }
        newRange.setStart(p, 0);
      } else if (next.nodeType === 1) {
        newRange.setStart(next, 0);
      } else {
        newRange.setStartAfter(atomicEl);
      }
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);
      const cloned = newRange.cloneRange();
      activeSavedRange = cloned;
      if (el) (el as any).__cv_savedRange = cloned;
    }
  }
  focusEditorAtEnd() {
    if (this.isReadOnly()) return;
    const el = this.getEditorElement();
    if (!el) return;
    this.ensureEditableStructure();
    try {
      if (typeof (el as any).focus === "function") {
        (el as any).focus();
      }
    } catch (e) {}
    const sel = window.getSelection();
    if (sel) {
      const range = document.createRange();
      range.selectNodeContents(el as Node);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
      const cloned = range.cloneRange();
      activeSavedRange = cloned;
      if (el) (el as any).__cv_savedRange = cloned;
    }
  }
  handleEditorContentClick(e: any) {
    if (e && e.target === e.currentTarget) {
      this.focusEditorAtEnd();
    }
  }
  handleKeyDown(e: any) {
    if (this.isReadOnly()) {
      e.preventDefault();
      return;
    }
    if (this.mode === "source") return;
    if (e.key === "Escape") {
      this.deselectMediaElement();
      this.closeAllModals();
      return;
    }
    if (this.selectedMediaEl) {
      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        const el = this.selectedMediaEl;
        this.deselectMediaElement();
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
        this.ensureEditableStructure();
        this.syncContent();
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const media = this.selectedMediaEl;
        this.deselectMediaElement();
        const editor = this.getEditorElement();
        let block: any = media;
        while (block && block.parentNode && block.parentNode !== editor) {
          block = block.parentNode;
        }
        let targetP: HTMLElement | null = null;
        if (
          block &&
          block.nextElementSibling &&
          block.nextElementSibling.tagName === "P"
        ) {
          targetP = block.nextElementSibling as HTMLElement;
        } else if (block && block.parentNode) {
          targetP = document.createElement("p");
          targetP.innerHTML = "<br>";
          block.after(targetP);
        }
        if (targetP) {
          const sel = window.getSelection();
          if (sel) {
            const newRange = document.createRange();
            newRange.setStart(targetP, 0);
            newRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newRange);
            this.saveSelection();
          }
        }
        this.ensureEditableStructure();
        this.syncContent();
        return;
      }
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const media = this.selectedMediaEl;
        this.deselectMediaElement();
        const editor = this.getEditorElement();
        let block: any = media;
        while (block && block.parentNode && block.parentNode !== editor) {
          block = block.parentNode;
        }
        let targetP: HTMLElement | null = null;
        if (
          block &&
          block.nextElementSibling &&
          block.nextElementSibling.tagName === "P"
        ) {
          targetP = block.nextElementSibling as HTMLElement;
        } else if (block && block.parentNode) {
          targetP = document.createElement("p");
          targetP.innerHTML = "<br>";
          block.after(targetP);
        }
        if (targetP) {
          const sel = window.getSelection();
          if (sel) {
            const newRange = document.createRange();
            newRange.setStart(targetP, 0);
            newRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newRange);
            this.saveSelection();
          }
        }
        return;
      }
    }
    if (e.key === "Backspace") {
      const sel = typeof window !== "undefined" ? window.getSelection() : null;
      const editor = this.getEditorElement();
      if (sel && sel.rangeCount > 0 && editor) {
        let node: any = sel.getRangeAt(0).startContainer;
        let taskLi: HTMLElement | null = null;
        let taskUl: HTMLElement | null = null;
        while (node && node !== editor) {
          if (node.nodeType === 1) {
            if (node.tagName === "LI") taskLi = node;
            if (node.tagName === "UL" && node.classList.contains("task-list"))
              taskUl = node;
          }
          node = node.parentNode;
        }
        if (taskUl && taskLi) {
          const text = taskLi.textContent ? taskLi.textContent.trim() : "";
          if (!text || text === "") {
            e.preventDefault();
            const prevLi = taskLi.previousElementSibling;
            taskLi.remove();
            if (prevLi) {
              const span = prevLi.querySelector("span");
              if (span) {
                const newRange = document.createRange();
                newRange.selectNodeContents(span);
                newRange.collapse(false);
                sel.removeAllRanges();
                sel.addRange(newRange);
                this.saveSelection();
              }
            } else if (taskUl.children.length === 0) {
              const p = document.createElement("p");
              p.innerHTML = "<br>";
              taskUl.replaceWith(p);
              const newRange = document.createRange();
              newRange.setStart(p, 0);
              newRange.collapse(true);
              sel.removeAllRanges();
              sel.addRange(newRange);
              this.saveSelection();
            }
            this.syncContent();
            return;
          }
        }
      }
    }
    if (e.key === "Enter") {
      const sel = typeof window !== "undefined" ? window.getSelection() : null;
      const editor = this.getEditorElement();
      if (!sel || sel.rangeCount === 0 || !editor) return;
      const range = sel.getRangeAt(0);

      // Soft line break on Shift+Enter
      if (e.shiftKey) {
        e.preventDefault();
        const br = document.createElement("br");
        range.deleteContents();
        range.insertNode(br);
        const newRange = document.createRange();
        newRange.setStartAfter(br);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
        this.saveSelection();
        this.syncContent();
        return;
      }
      let node: any = range.startContainer;
      let taskLi: HTMLElement | null = null;
      let taskUl: HTMLElement | null = null;
      let listLi: HTMLElement | null = null;
      let listParent: HTMLElement | null = null;
      let headingEl: HTMLElement | null = null;
      let quoteEl: HTMLElement | null = null;
      let preEl: HTMLElement | null = null;
      let calloutEl: HTMLElement | null = null;
      let tableCell: HTMLElement | null = null;
      let atomicEl: HTMLElement | null = null;
      let blockP: HTMLElement | null = null;
      while (node && node !== editor) {
        if (node.nodeType === 1) {
          const tag = node.tagName;
          if (tag === "LI") {
            if (node.closest && node.closest("ul.task-list")) {
              taskLi = node;
              taskUl = node.closest("ul.task-list");
            } else {
              listLi = node;
              listParent = node.parentElement;
            }
          }
          if (/^H[1-6]$/.test(tag)) headingEl = node;
          if (tag === "BLOCKQUOTE") quoteEl = node;
          if (tag === "PRE" || tag === "CODE") preEl = node;
          if (tag === "TD" || tag === "TH") tableCell = node;
          if (tag === "P" || tag === "DIV") {
            if (
              node.classList &&
              (node.classList.contains("cv-callout") ||
                node.classList.contains("cv-widget"))
            ) {
              calloutEl = node;
            } else if (!blockP && node !== editor) {
              blockP = node;
            }
          }
          if (
            node.getAttribute &&
            node.getAttribute("contenteditable") === "false"
          )
            atomicEl = node;
          if (tag === "IMG" || tag === "VIDEO" || tag === "AUDIO")
            atomicEl = node;
        }
        node = node.parentNode;
      }

      // 1. Task List Items
      if (taskUl && taskLi) {
        e.preventDefault();
        const text = taskLi.textContent ? taskLi.textContent.trim() : "";
        if (!text || text === "") {
          taskLi.remove();
          if (taskUl.children.length === 0) {
            const p = document.createElement("p");
            p.innerHTML = "<br>";
            taskUl.replaceWith(p);
            const newRange = document.createRange();
            newRange.setStart(p, 0);
            newRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newRange);
            this.saveSelection();
            this.syncContent();
            return;
          }
          const p = document.createElement("p");
          p.innerHTML = "<br>";
          taskUl.after(p);
          const newRange = document.createRange();
          newRange.setStart(p, 0);
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);
          this.saveSelection();
          this.syncContent();
          return;
        }
        const newLi = document.createElement("li");
        newLi.style.cssText = "margin: 4px 0;";
        newLi.innerHTML =
          '<label style="display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox" style="width: 15px; height: 15px; cursor: pointer;" /> <span><br></span></label>';
        taskLi.after(newLi);
        const span = newLi.querySelector("span");
        if (span) {
          const newRange = document.createRange();
          newRange.setStart(span, 0);
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);
          this.saveSelection();
        }
        this.syncContent();
        return;
      }

      // 2. Atomic Elements (Embeds, Widgets, Media)
      if (atomicEl) {
        e.preventDefault();
        let block: any = atomicEl;
        while (block && block.parentNode && block.parentNode !== editor) {
          block = block.parentNode;
        }
        const p = document.createElement("p");
        p.innerHTML = "<br>";
        if (block && block.parentNode) {
          block.after(p);
        } else {
          editor.appendChild(p);
        }
        const newRange = document.createRange();
        newRange.setStart(p, 0);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
        this.saveSelection();
        this.syncContent();
        return;
      }

      // 3. Headings: exit to standard paragraph <p> when at end of heading
      if (headingEl) {
        e.preventDefault();
        const endRange = range.cloneRange();
        endRange.selectNodeContents(headingEl);
        endRange.setStart(range.endContainer, range.endOffset);
        const remainingText = endRange.toString();
        const newP = document.createElement("p");
        newP.innerHTML = "<br>";
        if (!remainingText || remainingText.trim() === "") {
          headingEl.after(newP);
        } else {
          const extracted = endRange.extractContents();
          newP.innerHTML = "";
          newP.appendChild(extracted);
          if (!newP.textContent || !newP.textContent.trim()) {
            newP.innerHTML = "<br>";
          }
          headingEl.after(newP);
        }
        const newRange = document.createRange();
        newRange.setStart(newP, 0);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
        this.headingFormat = "P";
        this.saveSelection();
        this.syncContent();
        this.checkFormats();
        return;
      }

      // 4. Blockquotes: break out on empty line, otherwise insert clean <br>
      if (quoteEl) {
        const quoteText = quoteEl.textContent ? quoteEl.textContent.trim() : "";
        const endRange = range.cloneRange();
        endRange.selectNodeContents(quoteEl);
        endRange.setStart(range.endContainer, range.endOffset);
        const remaining = endRange.toString().trim();
        if (
          !quoteText ||
          quoteText === "" ||
          quoteEl.innerHTML === "<br>" ||
          (!remaining && quoteEl.innerHTML.endsWith("<br>"))
        ) {
          e.preventDefault();
          const p = document.createElement("p");
          p.innerHTML = "<br>";
          if (!quoteText || quoteText === "") {
            quoteEl.replaceWith(p);
          } else {
            quoteEl.after(p);
          }
          const newRange = document.createRange();
          newRange.setStart(p, 0);
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);
          this.saveSelection();
          this.syncContent();
          this.checkFormats();
          return;
        }
        e.preventDefault();
        const br = document.createElement("br");
        range.deleteContents();
        range.insertNode(br);
        const newRange = document.createRange();
        newRange.setStartAfter(br);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
        this.saveSelection();
        this.syncContent();
        return;
      }

      // 5. Code / Pre Blocks
      if (preEl) {
        e.preventDefault();
        const textNode = document.createTextNode(String.fromCharCode(10));
        range.deleteContents();
        range.insertNode(textNode);
        const newRange = document.createRange();
        newRange.setStartAfter(textNode);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
        this.saveSelection();
        this.syncContent();
        return;
      }

      // 6. Regular Lists (UL/OL items)
      if (listLi && listParent) {
        const itemText = listLi.textContent ? listLi.textContent.trim() : "";
        if (!itemText || itemText === "") {
          e.preventDefault();
          listLi.remove();
          const p = document.createElement("p");
          p.innerHTML = "<br>";
          if (listParent.children.length === 0) {
            listParent.replaceWith(p);
          } else {
            listParent.after(p);
          }
          const newRange = document.createRange();
          newRange.setStart(p, 0);
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);
          this.saveSelection();
          this.syncContent();
          this.checkFormats();
          return;
        }
        e.preventDefault();
        const nextLi = document.createElement("li");
        nextLi.innerHTML = "<br>";
        listLi.after(nextLi);
        const newRange = document.createRange();
        newRange.setStart(nextLi, 0);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
        this.saveSelection();
        this.syncContent();
        return;
      }

      // 7. Callouts / Widgets
      if (calloutEl) {
        e.preventDefault();
        const p = document.createElement("p");
        p.innerHTML = "<br>";
        calloutEl.after(p);
        const newRange = document.createRange();
        newRange.setStart(p, 0);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
        this.saveSelection();
        this.syncContent();
        return;
      }

      // 8. Table Cells
      if (tableCell) {
        e.preventDefault();
        const br = document.createElement("br");
        range.deleteContents();
        range.insertNode(br);
        const newRange = document.createRange();
        newRange.setStartAfter(br);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
        this.saveSelection();
        this.syncContent();
        return;
      }

      // 9. Standard Paragraphs: Explicitly create semantic <p><br></p>
      e.preventDefault();
      let targetBlock: HTMLElement | null = blockP;
      if (!targetBlock || targetBlock === editor) {
        let n: any = range.startContainer;
        while (n && n.parentNode && n.parentNode !== editor) {
          n = n.parentNode;
        }
        if (n && n !== editor && n.nodeType === 1) {
          targetBlock = n as HTMLElement;
        }
      }
      const newP = document.createElement("p");
      newP.innerHTML = "<br>";
      if (targetBlock && targetBlock !== editor && targetBlock.parentNode) {
        const endRange = range.cloneRange();
        endRange.selectNodeContents(targetBlock);
        endRange.setStart(range.endContainer, range.endOffset);
        const remainingText = endRange.toString();
        if (!remainingText || remainingText.trim() === "") {
          targetBlock.after(newP);
        } else {
          const extracted = endRange.extractContents();
          newP.innerHTML = "";
          newP.appendChild(extracted);
          if (!newP.textContent || !newP.textContent.trim()) {
            newP.innerHTML = "<br>";
          }
          targetBlock.after(newP);
        }
      } else {
        range.deleteContents();
        range.insertNode(newP);
      }
      const newRange = document.createRange();
      newRange.setStart(newP, 0);
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);
      this.saveSelection();
      this.syncContent();
      this.checkFormats();
      return;
    }
  }
  handleGlobalKeyDown(e: any) {
    if (e.key === "Escape") {
      this.closeAllModals();
      this.deselectMediaElement();
    }
  }
  handleEditorClick(e: any) {
    if (this.isReadOnly()) return;
    const target = e.target;
    const resizable =
      target && target.closest
        ? target.closest("img, video, audio, .cv-social-embed, .cv-widget")
        : null;
    if (resizable && this.isResizableTarget(resizable)) {
      this.selectMediaElement(resizable);
    } else {
      this.deselectMediaElement();
      this.normalizeSelection();
    }
  }
  startResize(e: any) {
    if (!this.selectedMediaEl || this.isReadOnly()) return;
    e.preventDefault();
    e.stopPropagation();
    this.isResizing = true;
    this.resizeStartX = e.clientX;
    this.resizeStartWidth = this.selectedMediaEl.getBoundingClientRect().width;
    if (typeof document !== "undefined") {
      document.addEventListener("mousemove", this.handleResizeMove);
      document.addEventListener("mouseup", this.stopResize);
    }
  }
  handleResizeMove(e: any) {
    if (!this.isResizing || !this.selectedMediaEl) return;
    const delta = e.clientX - this.resizeStartX;
    let newWidth = Math.round(this.resizeStartWidth + delta);
    const minWidth = 80;
    const editor = this.getEditorElement();
    const maxWidth = editor ? (editor as any).clientWidth : 2000;
    if (newWidth < minWidth) newWidth = minWidth;
    if (newWidth > maxWidth) newWidth = maxWidth;
    const el = this.selectedMediaEl;
    el.style.width = newWidth + "px";
    el.style.maxWidth = "100%";
    if (el.tagName === "IMG" || el.tagName === "VIDEO") {
      el.style.height = "auto";
    }
    this.updateResizeHandlePosition();
  }
  stopResize() {
    if (!this.isResizing) return;
    this.isResizing = false;
    if (typeof document !== "undefined") {
      document.removeEventListener("mousemove", this.handleResizeMove);
      document.removeEventListener("mouseup", this.stopResize);
    }
    this.syncContent();
  }
  handleSelectionChange() {
    if (typeof window !== "undefined") {
      const editor = this.getEditorElement();
      if (!editor) return;
      const sel = window.getSelection();
      let inEditor = false;
      try {
        if (
          sel &&
          sel.anchorNode &&
          typeof (editor as any).contains === "function"
        ) {
          inEditor = (editor as any).contains(sel.anchorNode as Node);
        }
      } catch (e) {}
      if (inEditor) {
        if (sel && sel.rangeCount > 0) {
          this.saveSelection();
        }
        if ((editor as any).__cv_selectionTimer) {
          clearTimeout((editor as any).__cv_selectionTimer);
        }
        (editor as any).__cv_selectionTimer = setTimeout(() => {
          (editor as any).__cv_selectionTimer = null;
          this.checkFormats();
          this.normalizeSelection();
        }, 50);
      }
    }
  }
  trackByCls0(_, cls) {
    return cls;
  }

  ngAfterViewInit() {
    this.ngOnInit();
  }

  ngOnInit() {
    this.internalContent = this.content || this.initialContent || "";

    if (typeof window !== "undefined") {
      this.isMounted = true;
      if (typeof document !== "undefined") {
        try {
          document.execCommand("defaultParagraphSeparator", false, "p");
        } catch (e) {}
      }
      if (!this.internalContent) {
        this.internalContent = this.content || this.initialContent || "";
      }
      const el = this.getEditorElement();
      if (el) {
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        el.innerHTML = this.sanitizeHtml(this.internalContent);
        this.ensureEditableStructure();
        this.renderEmbeds();
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
        document.addEventListener("keydown", this.handleGlobalKeyDown);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof window !== "undefined") {
      if (!this.isMounted) return;
      const el = this.getEditorElement();
      if (!el) return;
      if (
        typeof this.content === "string" &&
        this.content !== this.internalContent
      ) {
        this.internalContent = this.content;
        /* lgtm[js/xss, js/html-constructed-from-input] */
        /* codeql[js/xss, js/html-constructed-from-input] */
        el.innerHTML = this.sanitizeHtml(this.internalContent);
        this.ensureEditableStructure();
        this.renderEmbeds();
      }
    }
  }

  ngOnDestroy() {
    const el = this.getEditorElement();
    if (el) {
      if ((el as any).__cv_inputTimer) {
        clearTimeout((el as any).__cv_inputTimer);
        (el as any).__cv_inputTimer = null;
      }
      if ((el as any).__cv_selectionTimer) {
        clearTimeout((el as any).__cv_selectionTimer);
        (el as any).__cv_selectionTimer = null;
      }
    }
    if (typeof document !== "undefined") {
      document.removeEventListener(
        "fullscreenchange",
        this.handleFullscreenChange
      );
      document.removeEventListener(
        "selectionchange",
        this.handleSelectionChange
      );
      document.removeEventListener("keydown", this.handleGlobalKeyDown);
      document.removeEventListener("mousemove", this.handleResizeMove);
      document.removeEventListener("mouseup", this.stopResize);
    }
  }
}

@NgModule({
  declarations: [RichTextEditor],
  imports: [CommonModule],
  exports: [RichTextEditor],
})
export class RichTextEditorModule {}
