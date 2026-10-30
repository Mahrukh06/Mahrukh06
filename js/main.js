// Sticky nav state
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const toggle = document.getElementById('navToggle');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('#navLinks a').forEach((link) =>
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Gallery filters
const tiles = [...document.querySelectorAll('.tile')];
document.querySelectorAll('.filter').forEach((btn) =>
  btn.addEventListener('click', () => {
    document.querySelector('.filter.is-active').classList.remove('is-active');
    btn.classList.add('is-active');
    const cat = btn.dataset.filter;
    tiles.forEach((t) => t.classList.toggle('is-hidden', cat !== 'all' && t.dataset.cat !== cat));
  })
);

// Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');
const lbCaption = document.getElementById('lightboxCaption');
let current = 0;

const visibleTiles = () => tiles.filter((t) => !t.classList.contains('is-hidden'));

function show(index) {
  const list = visibleTiles();
  current = (index + list.length) % list.length;
  const img = list[current].querySelector('img');
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lbCaption.textContent = list[current].querySelector('figcaption').lastChild.textContent;
}

function openLightbox(tile) {
  show(visibleTiles().indexOf(tile));
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

tiles.forEach((tile) => tile.addEventListener('click', () => openLightbox(tile)));
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => show(current - 1));
document.getElementById('lightboxNext').addEventListener('click', () => show(current + 1));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') show(current - 1);
  if (e.key === 'ArrowRight') show(current + 1);
});

// Contact form (front-end only — connect to Formspree, Netlify Forms, etc.)
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.reset();
  document.getElementById('formNote').textContent = 'Thank you — your message is on its way. I’ll be in touch soon.';
});

document.getElementById('year').textContent = new Date().getFullYear();
