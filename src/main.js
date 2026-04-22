import './style.css';

// ── Nav scroll effect ────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ── Hamburger menu ───────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

// ── Smooth scroll for all data-scroll buttons ────────────────────────
document.querySelectorAll('[data-scroll]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.scroll;
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // close mobile menu if open
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ── Video thumbnail play button wrapper ──────────────────────────────
const videoThumb = document.querySelector('.video-thumb');
if (videoThumb) {
  const inner = videoThumb.querySelector('.play-btn');
  if (inner) {
    const wrapper = document.createElement('div');
    wrapper.className = 'play-btn-inner';
    while (inner.firstChild) wrapper.appendChild(inner.firstChild);
    inner.appendChild(wrapper);
  }
}

// ── Contact form ─────────────────────────────────────────────────────
const form = document.getElementById('contact-form');
const success = document.getElementById('contact-success');

if (form && success) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.hidden = true;
    success.hidden = false;
  });
}
