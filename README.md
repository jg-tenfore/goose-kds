# 🪿 Goose KDS — Design System

React component library for the **TenFore Kitchen Display System (KDS)**, built on
**MUI (Material UI) + Emotion** and showcased/customized in **Storybook**.

- **Engine:** Vite + React 19 + TypeScript
- **Components:** [MUI Material UI](https://mui.com/material-ui/) (v9), styled with Emotion
- **Docs/showcase:** Storybook (Vite builder) — addons: a11y, docs, vitest, MCP, Chromatic
- **Deployed Storybook:** GitHub Pages → https://jg-tenfore.github.io/goose-kds/ *(after first deploy + Pages enabled)*

Project context, scope, schedule, and the Linear structure live in the companion folder
`../schedule-summer2026/` (see its `README.md` / `CLAUDE.md`).

## Getting started

```bash
npm install
npm run dev          # run the demo app (Vite)
npm run storybook    # run Storybook at http://localhost:6006
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server for the demo app |
| `npm run build` | Type-check + build the app |
| `npm run storybook` | Storybook dev server |
| `npm run build-storybook` | Static Storybook → `storybook-static/` |
| `npm run lint` | oxlint |

## Customizing the component library

Everything is themed in **one place: [`src/theme/theme.ts`](src/theme/theme.ts)**. The app
(`src/main.tsx`) and Storybook (`.storybook/preview.tsx`) both wrap everything in
`<ThemeProvider theme={theme}>`, so a change to a token flows everywhere.

- **Global tokens:** `palette`, `typography`, `shape`.
- **Per-component:** `components.MuiButton.styleOverrides` / `defaultProps`, etc.
- **Custom KDS tokens:** `palette.status.*` — ticket-urgency colors (normal / warning /
  late / recalled / priority), added via TypeScript module augmentation and shown in
  **Storybook → Foundations → Palette**.

> Brand colors are TenFore-flavored placeholders — swap them for the official tokens when
> finalized.

## Structure

```
src/
├── theme/          # createTheme() — the customization surface
├── components/      # library components + their .stories.tsx
├── stories/         # Introduction.mdx, Foundations (Palette)
├── App.tsx          # small themed demo app
└── main.tsx         # app entry (ThemeProvider + CssBaseline)
.storybook/          # Storybook config (react-vite) + themed preview
.github/workflows/   # deploy Storybook to GitHub Pages
```

## Deploying Storybook

Pushing to `main` runs `.github/workflows/deploy-storybook.yml`, which builds Storybook and
publishes it to GitHub Pages.

**One-time setup:** in the repo → **Settings → Pages → Build and deployment → Source:
GitHub Actions**. After the first successful run it's live at
`https://jg-tenfore.github.io/goose-kds/`.
