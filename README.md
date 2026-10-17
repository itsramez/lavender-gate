# LavenderGate

A static, front-end-only marketing website for LavenderGate, a fictional NGO. No backend, no database, no CMS — just plain HTML/CSS/JS built and served with Vite.

## Pages

- `index.html` — Home
- `about.html` — Who Are We
- `what-we-do.html` — What We Do
- `contact.html` — Contact Us

All pages share the same header, footer, `src/styles.css`, and `src/main.js`.

## Running locally

### Option 1: Vite dev server (recommended)

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

### Option 2: Production build + preview

```bash
npm install
npm run build
npm run preview
```

### Option 3: No tooling at all

Because this is a static site, you can also just open `index.html` directly in a browser, or serve the folder with any static file server. Note that some browsers restrict `<script type="module">` on the `file://` protocol, so a local server (Option 1, or e.g. `npx serve`) is more reliable.

## Notes

- The hero background and photo placeholders use CSS gradients / text placeholders. Swap them for real images before launch (see the `NOTE:` comments in the HTML/CSS).
- The contact form (`contact.html`) is front-end only: it prevents the real submission and shows an inline confirmation message. See the comment near the form for where a real handler (e.g. Formspree, Netlify Forms) could be wired in later.
- The map on the Contact page is a static placeholder `<div>`, not a live embed, since there's no backend/API key configured.
