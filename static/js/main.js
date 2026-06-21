// ── Typewriter ──
const phrases = ['AI & ML Developer', 'Flask Developer', 'Problem Solver', 'CS @ Delhi University'];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const word = phrases[pi];
  typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1200); return; }
  if (deleting && ci < 0)            { deleting = false; pi = (pi + 1) % phrases.length; }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ── Navbar scroll + active link ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.getElementById('navbar').classList.toggle('scrolled', y > 50);

  // Back to top
  document.getElementById('backToTop').classList.toggle('visible', y > 400);

  // Active nav highlight
  let current = '';
  sections.forEach(s => { if (y >= s.offsetTop - 120) current = s.getAttribute('id'); });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ── Back to top ──
document.getElementById('backToTop').addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// ── Hamburger ──
document.getElementById('hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => document.querySelector('.nav-links').classList.remove('open'))
);

// ── Scroll fade-in ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card, .timeline-item, .edu-card, .contact-card, .learning-card, .bar-item')
  .forEach(el => { el.classList.add('fade-in'); observer.observe(el); });

// ── Skill bars ──
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const fill = e.target.querySelector('.bar-fill');
      if (fill) fill.style.width = fill.dataset.width + '%';
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.bar-item').forEach(b => barObserver.observe(b));

// ── Particles ──
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', resize);

for (let i = 0; i < 55; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.4,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    o: Math.random() * 0.5 + 0.1
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(168,85,247,${p.o})`;
    ctx.fill();
    p.x += p.dx; p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── Lightbox ──
document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    openLightbox(card.dataset.src, card.dataset.title);
  });
});

function openLightbox(src, title) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-title').textContent = title;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
