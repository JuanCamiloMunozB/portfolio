# JCMB portfolio

Personal portfolio of **Juan Camilo Muñoz Barco**, final-year Software Engineering student at Universidad Icesi (Cali, Colombia), open to internships from January 2027.

**Live:** https://juancamilomunozb.github.io/portfolio/ (English) and https://juancamilomunozb.github.io/portfolio/es/ (Spanish)

Every project is shown by its goal, its architecture and the decisions behind it, including what each decision cost. The site is bilingual, has dark and light themes, and uses animated pixel art drawn only from the JCMB color tokens.

## Stack

| Part | Choice | Why |
| --- | --- | --- |
| Framework | [Astro](https://astro.build) 5, static output | Pre-renders every page and ships almost no JavaScript |
| Hosting | GitHub Pages, deployed with GitHub Actions | Free and static: no server, no database, no secrets in the client |
| Fonts | Jersey 10, Silkscreen, Atkinson Hyperlegible, JetBrains Mono | All SIL OFL, self-hosted through Fontsource |
| Graphics | Inline SVG pixel art with CSS and SMIL animation | Colors come from CSS tokens, so the art follows the theme |
| Tool logos | [Simple Icons](https://simpleicons.org) (CC0), one color | Drawn in the theme's muted color on transparent tiles |
| Scrolling | [Lenis](https://lenis.darkroom.engineering) (MIT) | Weighted smooth scroll; off when reduced motion is on |

## Run it locally

Requires Node.js 20 or newer (CI uses Node 22).

```bash
npm install
npm run dev       # http://localhost:4321/portfolio/
npm run build     # outputs to dist/
npm run preview   # serves dist/
```

## Project structure

```
src/
  data/
    site.ts         name, email, links, CV links
    projects.ts     every project and case study (both languages)
    certs.ts        certifications
    skills.ts       skill areas and the projects that prove them
  i18n/ui.ts        interface text in English and Spanish, number formatting
  components/
    HomePage.astro  home page body, shared by / and /es/
    CasePage.astro  case study body, shared by /work/<slug>/ and /es/work/<slug>/
    SystemScene.astro  animated system in the hero
    Scene.astro     every animated pixel scene (projects, certs, skills)
    Diagram.astro   UML deployment + component diagrams (Visual Paradigm notation); the build fails if a label overflows
    SkillArea.astro skill area with logo tiles and concept tags
    Prompt.astro    shell prompt that types its command
    Header.astro, Footer.astro
  layouts/Base.astro  page shell: meta tags, hreflang, theme, shared scripts
  pages/            routes (EN at the root, ES under /es/, plus 404)
  styles/global.css   color tokens, layout and animation keyframes
public/favicon.svg
design/             earlier mockups and logo options (not deployed)
.github/workflows/deploy.yml
```

## Editing content

- **Text and numbers** live in `src/data/` and `src/i18n/ui.ts`, never in the components. Every string has an `en` and an `es` version.
- **Numbers** are written once as numbers and formatted per language: `2,588` and `0.837` in English, `2.588` and `0,837` in Spanish.
- **A new featured project** needs a `case` entry in `projects.ts`. Its case study pages are generated in both languages automatically.
- **A new scene** is a new `name === '...'` block in `Scene.astro`. Use only the token classes (`.a`, `.m`, `.ls`, `.s2` and so on) so it works in both themes.
- **Placeholders**: anything still to be confirmed goes in a case study's `pending` list and shows on the page with a "to confirm" label.

### Content rules

- Every number on the site must come from verified facts. No invented metrics, users or traffic.
- Unfinished work is labeled (`inProgress`).
- No phone number or photo on the site.
- In Spanish, the program is "Ingeniería de Sistemas". In English, it is "Software Engineering".

## CVs

The CV buttons link to Google's PDF export of two Google Docs (see `SITE.cv` in `src/data/site.ts`). Google renders the PDF from the current text of the Doc on every download, so **editing the Doc updates the CV on the site with no redeploy.**

For this to keep working:

1. Edit the same Docs. A new copy has a new ID and needs a new link in `site.ts`.
2. Keep both Docs shared as "Anyone with the link can view".

## Deployment

Every push to `main` builds the site and publishes it to GitHub Pages (`.github/workflows/deploy.yml`).

One-time setup: in the repository, open **Settings, Pages** and set **Source** to **GitHub Actions**.

The site is a project site, so it lives under `/portfolio/`. `astro.config.mjs` sets `base: '/portfolio'`, and every internal link goes through `url()` or `localized()` in `src/data/site.ts`. If the repository is renamed, update `base` to match.

## Accessibility

- Color contrast meets WCAG AA in both themes.
- Everything works with the keyboard; the hero layers are focusable and announce their tools.
- With `prefers-reduced-motion`, every animation stops on a readable frame.
- Each animated scene has a text label, and each diagram has a written description.
- No autoplay audio.

## License

Code: all rights reserved, Juan Camilo Muñoz Barco. Fonts are under the SIL Open Font License 1.1.
