# Photographer Portfolio

A single-page portfolio for a photographer, built with plain HTML, CSS and JavaScript (no build step).

Open `index.html` in a browser, or host the folder on GitHub Pages / Netlify / Vercel.

## Sections
Hero · Published-in strip · Filterable gallery with lightbox · About + stats · Services · Process · Testimonials · Journal · Contact form · Footer

## Customising
- **Name & copy:** edit text in `index.html` (search for "Elias Rowe").
- **Photos:** images are placeholders from picsum.photos. Put your own in an `images/` folder and update each `src`. Each gallery `<figure>` has a `data-cat` that drives the filter buttons.
- **Colours & fonts:** CSS variables at the top of `css/styles.css`.
- **Contact form:** currently front-end only; point it at Formspree, Netlify Forms or similar in `js/main.js`.
