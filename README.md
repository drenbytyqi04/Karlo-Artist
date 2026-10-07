# Fatmir Mustafa Karllo

Portfolio and archive site for the artist Fatmir Mustafa Karllo (Prishtina, Kosovo).
Built with [Astro](https://astro.build) as a fully static site. Plain CSS in one file (`src/styles/global.css`).

## Run it

Requires Node 22.12 or newer.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npm run preview  # serve the built site
```

## Deploy

- **Netlify**: connect the repository; `netlify.toml` sets the build command (`npm run build`) and publish folder (`dist`).
- **Vercel**: import the repository; `vercel.json` (and Astro auto-detection) does the rest.

Set the real domain in `astro.config.mjs` (`site`) once it is known.

## Add a new work

1. **Photos** — create a folder named after the work (lowercase, words joined with `-`) and put the photos in it:

   ```
   src/assets/works/my-new-work/01.jpg
   src/assets/works/my-new-work/02.jpg
   ```

   Use the original, uncropped photos (JPG or PNG, ideally at least 1640 px wide). The site makes all smaller
   sizes and WebP/AVIF versions automatically and always shows every photo at its own proportions.

2. **Text** — create `src/content/works/my-new-work.md`. The file name becomes the address
   (`/works/my-new-work/`).

   ```md
   ---
   title: "My New Work"
   year: 2025
   material: "Wood, flour"
   dimensions: "120 × 80 × 40 cm"
   images:
     - src: "../../assets/works/my-new-work/01.jpg"
       caption: "Installation view, Gallery Name, 2025. Photo: Name Surname."
     - src: "../../assets/works/my-new-work/02.jpg"
       caption: "Detail. Photo: Name Surname."
   ---
   The description of the work goes here. Separate paragraphs with an empty line.
   ```

   - `title` is required; `year`, `material`, `dimensions` and `images` are optional.
   - The caption under each photo is built automatically:
     **FATMIR MUSTAFA KARLLO**, *TITLE*, MATERIAL, YEAR, DIMENSIONS. *caption*
   - Photos appear in the order listed. The first photo is also the thumbnail on the Works page, where it is
     shown in an even 3:2 box (cropped to fill it). On the work page itself photos are never cropped.
   - Optional per photo: `alt: "…"` to describe the image for screen readers.
   - Add `draft: true` to hide a work without deleting it.

3. Commit and push — the site rebuilds. The Works page sorts by year, newest first; works without a year come last.

## Add a project

Same as a work, in `src/content/projects/` (photos in `src/assets/projects/<name>/`). Extra fields:

```md
---
title: "On Top Residency"
meta: "Since 2022 · Butoc, Pristina"   # grey line on the Projects page
summary: "Short text for the Projects page."
order: 1                               # position on the Projects page
images: []
---
```

## Add a text

Create `src/content/texts/my-essay.md`:

```md
---
title: "Essay Title"
author: "Author Name"
year: 2025
---
The text…
```

## Other content

- **Bio and quote**: `src/pages/index.astro`
- **Portrait thumbnail**: replace `src/assets/portrait/portrait.jpg`
- **CV**: replace `public/cv.pdf`
- **Contact details**: `src/pages/contact.astro` (currently placeholders: [EMAIL], [PHONE], [@HANDLE])
- **Header / navigation**: `src/components/Header.astro` (used by every page)

Search (`/search/`) needs no setup: an index of all works, projects and texts is generated at build time
(`/search.json`).

The current photos for *Artist Must Stand* and *On Top Residency* are grey placeholders of different sizes —
replace the files with the real photos (same names, or update the paths in the `.md` file).
