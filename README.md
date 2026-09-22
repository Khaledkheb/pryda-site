# PRYDA+ Design Studio — Website

Landing page for **PRYDA+ Design Studio**, built to match the PRYDA+ design language:
a dark navy background, cyan/aqua glassmorphism panels, Oswald display type, and a
single orange accent reserved for primary actions.

Live site: **https://khaledkheb.github.io/pryda-site/** _(after the first deploy runs)_

## Stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (design tokens defined in `src/index.css` via `@theme`)
- [Vitest](https://vitest.dev/) + Testing Library for the smoke tests

## Sections

Announcement bar → glass navbar (sticky, mobile menu, search) → hero carousel →
featured work → services (tabs on desktop, accordion on mobile) → final CTA → footer.

## Hero carousel

- 5 wallpaper slides, auto-playing every 5 seconds
- pauses on hover, focus and touch
- previous / next buttons, 5 pagination dots
- keyboard support: `←` `→` `Home` `End`

## Design tokens

| Token | Value |
| --- | --- |
| Navy / deep background | `#06121c` / `#081d2b` |
| Cyan / aqua accent | `#24d7e8` / `#7cf7ff` |
| Orange (primary actions) | `#ff7a2f` (hover `#ff914f`) |
| Glass surface / border | `rgba(180,235,245,0.07)` / `rgba(210,245,250,0.16)` |
| Display / body font | Oswald / Inter |
| Container width | 740px |
| Radius scale | 0.75 / 1 / 1.5 / 2rem, pill `999px` |

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
npm test         # vitest smoke tests
```

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds the site and publishes `dist/` to GitHub Pages
on every push to `main`. The Vite `base` is relative (`./`), so the build works from
the `/<repo-name>/` path of a project page as well as from a custom domain.

One-time check in the repository settings: **Settings → Pages → Source = GitHub Actions**
(the workflow also tries to enable Pages automatically).
