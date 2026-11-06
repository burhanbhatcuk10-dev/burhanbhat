# Burhan Bhat — Portfolio (React + Vite)

## Run
    npm install
    npm run dev       # local dev server
    npm run build     # production build in /dist (deploy to Netlify / Vercel / GitHub Pages)

## Edit your content
Everything (text, work cards, experience, skills, image URLs) is in `src/data.js`.
Colors, fonts and spacing are CSS variables at the top of `src/styles.css`.
Your CV is served from `public/Burhan_Bhat_Resume.pdf`.

## Images
Photos are free Unsplash images loaded from their CDN. Each has a gradient fallback, so the
layout never breaks if one fails. Swap the URLs in `src/data.js` for screenshots of your own
projects whenever you like.

## What's inside (no animation libraries)
- Preloader with counter and curved curtain exit
- Letter-by-letter hero, rotating role line, count-up stats, live Srinagar clock
- Mouse + scroll parallax hero images, drifting gradient blobs, film grain
- Two opposing marquees that lean with scroll velocity
- About text whose words light up as you scroll; curtain-reveal photos
- Pinned horizontal "Work" showcase (desktop) with parallax images and 3D tilt cards
- Timeline whose line fills with scroll; spotlight + border-glow cards
- Custom cursor with labels, magnetic buttons, wave-text email, light/dark theme
- Mobile menu with circular reveal; fully responsive; honors "reduce motion"
