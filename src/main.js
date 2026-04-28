import './style.css';

// ── Nav scroll effect ────────────────────────────────────────────────
const nav = document.getElementById('nav');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 30);
  if (y <= 10) {
    nav.classList.remove('nav-hidden');
  } else if (y > lastY) {
    nav.classList.add('nav-hidden');
  } else {
    nav.classList.remove('nav-hidden');
  }
  lastY = y;
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

// ── Video thumbnail → YouTube embed ──────────────────────────────────
const videoThumb = document.querySelector('.video-thumb');
if (videoThumb) {
  videoThumb.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/v4_KMwheXs8?autoplay=1&rel=0';
    iframe.allow = 'autoplay; encrypted-media; fullscreen';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:inherit;';
    videoThumb.appendChild(iframe);
    videoThumb.querySelector('.play-btn').style.display = 'none';
  });
}

// ── Scroll-reveal ────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

// ── Hero stat count-up ───────────────────────────────────────────────
function countUp(el, start, end, duration, suffix) {
  const t0 = performance.now();
  function tick(now) {
    const progress = Math.min((now - t0) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(start + (end - start) * eased) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Set starting values immediately so final numbers never flash during fade-in
const statEls = document.querySelectorAll('.stat .stat-num');
if (statEls[0]) statEls[0].textContent = '2010';
if (statEls[1]) statEls[1].textContent = '0';
if (statEls[2]) statEls[2].textContent = '0';

// Start count-up while the left side is fading in
setTimeout(() => {
  const stats = document.querySelectorAll('.stat');
  if (stats.length >= 3) {
    countUp(stats[0].querySelector('.stat-num'), 2010, 2015, 1400, '');
    countUp(stats[1].querySelector('.stat-num'), 0,    15,   1200, '+');
    countUp(stats[2].querySelector('.stat-num'), 0,    700,  1400, '+');
  }
}, 250);

// ── Contact form (Netlify AJAX) ───────────────────────────────────────
const form = document.getElementById('contact-form');
const success = document.getElementById('contact-success');

if (form && success) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString(),
    });
    form.hidden = true;
    success.hidden = false;
  });
}
