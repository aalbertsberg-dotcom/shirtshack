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
  // Animate hamburger → X
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7.5px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7.5px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
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

// Add CSS class to trigger animation
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .revealed { opacity: 1 !important; transform: translateY(0) !important; }
  </style>
`);

// --- Contact form (simple demo / Formspree-ready) ---
const form        = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // -----------------------------------------------
  // TO CONNECT FORMSPREE:
  //   1. Go to https://formspree.io and create a form
  //   2. Replace the action URL below with your endpoint
  //   3. Remove the setTimeout simulation block
  // -----------------------------------------------

  const ACTION_URL = 'https://formspree.io/f/YOUR_FORM_ID'; // ← replace this

  if (ACTION_URL.includes('YOUR_FORM_ID')) {
    // Demo mode — simulate success
    await new Promise(r => setTimeout(r, 900));
    form.reset();
    formSuccess.style.display = 'block';
    btn.textContent = original;
    btn.disabled = false;
    setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
    return;
  }

  try {
    const data = new FormData(form);
    const res  = await fetch(ACTION_URL, {
      method: 'POST',
      body: data,
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

// --- Smooth active link highlight ---
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
