# Granblue Fantasy Chrome Extension Development Guide

## Project Overview

A Chrome extension for Granblue Fantasy (グランブルーファンタジー) that provides battle log analysis, drop tracking, party builds, draw history and more.

## Build Commands

- **Dev server**: `pnpm dev`
- **Dev build**: `pnpm ba`
- **Production build**: `pnpm bp`
- **Create ZIP package**: `pnpm zip`
- **Lint**: `pnpm lint`

## Code Conventions

- **TypeScript**: strict mode, `noUnusedLocals` enabled
- **Path alias**: use `~/` instead of `src/`
- **Auto-imports**: Vue components and methods in `/src/composables/` don't need manual imports
- **Lodash**: use `lodash-es`, not `lodash`
- **Default exports**: composables use default exports; utility functions use named exports
- **ESLint**: uses the @antfu/eslint-config setup

## Project Structure

```
src/
├── background/      # Background service worker
├── composables/     # Vue composables
├── contentScripts/  # Injected scripts
├── logic/          # Data storage
├── views/          # UI views
└── constants/      # Constant definitions
```

## Tech Stack

- Vue 3 + Composition API
- TypeScript + Vite
- Element Plus + UnoCSS
- webext-bridge messaging
- Cheerio HTML parsing

## Data Flow

Game AJAX requests → content script (jQuery ajaxSuccess) → webext-bridge → background script → useDataCenter processing → Chrome storage → UI display
