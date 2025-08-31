
# Tanishq Portfolio — React (Vite)

Converted from a single HTML file into a modular React application.

## Quick start
```bash
# 1) Install deps
npm i

# 2) Dev
npm run dev

# 3) Build
npm run build
npm run preview
```

## Notes
- Assets expected in `public/`: `hero.mp4`, `poster.jpg`, `preview.png`, `resume.pdf`, `snake.jpeg`, `tictactoe.jpeg`.
- EmailJS uses the keys present in the original file. For production, move them to environment variables:
  - `VITE_EMAILJS_PUBLIC_KEY`
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  and read via `import.meta.env`.
- Smooth scroll, scroll spy, reveal animations, skills progress, theme toggle and the two game demos are all implemented.
- You can further split CSS into modules if you prefer.
