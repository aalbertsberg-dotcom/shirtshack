// ===================================================
//  SHIRT SHACK — script.js
// ===================================================

// --- Year in footer ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// --- Mobile hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7.5px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7.5px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// --- Gallery Filter ---
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      const cats = item.dataset.cat || '';
      if (filter === 'all' || cats.includes(filter)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// --- Lightbox ---
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
const lbClose   = document.getElementById('lb-close');
const lbPrev    = document.getElementById('lb-prev');
const lbNext    = document.getElementById('lb-next');

let currentIndex = 0;
let visibleItems = [];

function getVisible() {
  return Array.from(galleryItems).filter(el => !el.classList.contains('hidden'));
}

function openLightbox(index) {
  visibleItems = getVisible();
  currentIndex = index;
  const item = visibleItems[currentIndex];
  lbImg.src = item.querySelector('img').src;
  lbImg.alt = item.querySelector('img').alt;
  lbCaption.textContent = item.dataset.label || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lbImg.src = '';
}

function showPrev() {
  visibleItems = getVisible();
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  openLightbox(currentIndex);
}

function showNext() {
  visibleItems = getVisible();
  currentIndex = (currentIndex + 1) % visibleItems.length;
  openLightbox(currentIndex);
}

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    visibleItems = getVisible();
    const visIndex = visibleItems.indexOf(item);
    openLightbox(visIndex);
  });
});

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', showPrev);
lbNext.addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   showPrev();
  if (e.key === 'ArrowRight')  showNext();
});

// --- Scroll-reveal animation ---
const revealEls = document.querySelectorAll(
  '.service-card, .gallery-item, .contact-card, .about-inner, .stat-chip'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${(i % 6) * 60}ms`;
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

document.head.insertAdjacentHTML('beforeend', `
  <style>.revealed { opacity: 1 !important; transform: translateY(0) !important; }</style>
`);

// --- Contact form ---
const form        = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;

  const ACTION_URL = 'https://formspree.io/f/YOUR_FORM_ID';

  if (ACTION_URL.includes('YOUR_FORM_ID')) {
    await new Promise(r => setTimeout(r, 900));
    form.reset();
    formSuccess.style.display = 'block';
    btn.textContent = original;
    btn.disabled = false;
    setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
    return;
  }

  try {
    const res = await fetch(ACTION_URL, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      form.reset();
      formSuccess.style.display = 'block';
      setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
    } else {
      alert('Oops — something went wrong. Please call us at (228) 861-6587.');
    }
  } catch {
    alert('Network error. Please call us at (228) 861-6587.');
  }

  btn.textContent = original;
  btn.disabled = false;
});

// --- Active nav highlight ---
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navAs.forEach(a => {
    a.style.background = a.getAttribute('href') === `#${current}` ? 'var(--teal-lite)' : '';
    a.style.color      = a.getAttribute('href') === `#${current}` ? 'var(--teal-dark)' : '';
  });
}, { passive: true });
