# Changelog

All notable changes to `@contentveda/ui` are documented in this file. The format
follows [Conventional Commits](https://www.conventionalcommits.org/) and releases
are cut by [semantic-release](https://semantic-release.gitbook.io/).

## 1.0.0 (2026-07-31)

Initial release of `@contentveda/ui` — a universal, framework-agnostic UI
component library built with Mitosis. Write once, compile to React, Svelte, and
Web Components.

### Features

* Components: `Banner`, `GridBanner`, `SlidingBanner`, `AlternatingSlider`,
  `RowScrollable`, `MediaGrid`, `AnnouncementBar`, `TimerWidget`,
  `RichTextEditor`, `WysiwygRenderer`.
* Three build targets from a single source: React, Svelte, and Web Components
  (custom elements registered under the `cv-` prefix).
* Design tokens exposed as CSS custom properties under the `--cv-` namespace,
  with per-component stylesheets shipped alongside the compiled output.
* Cucumber BDD suite running against all three targets, with axe-core
  accessibility checks.
* Auto-generated interactive component documentation.
