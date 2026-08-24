// ============================================================
// Catalina Casado — script compartido (todas las páginas)
// ============================================================

// header on scroll
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('mobile-menu');
if (burger && menu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      menu.classList.remove('open');
    });
  });
}

// reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ============================================================
// Testimonios: "leer más" (line-clamp) + carrusel con flechas
// ============================================================
document.querySelectorAll('.t-card').forEach(card => {
  const quote = card.querySelector('.t-quote');
  const btn = card.querySelector('.t-more');
  if (!quote || !btn) return;
  // esperar a que fuentes/layout estén listas
  requestAnimationFrame(() => {
    if (quote.scrollHeight > quote.clientHeight + 4) {
      btn.hidden = false;
    }
  });
  btn.addEventListener('click', () => {
    const expanded = card.classList.toggle('expanded');
    btn.textContent = expanded ? 'Leer menos' : 'Leer más';
  });
});

document.querySelectorAll('.carousel-wrap').forEach(wrap => {
  const track = wrap.querySelector('.carousel');
  const prev = wrap.querySelector('.car-btn.prev');
  const next = wrap.querySelector('.car-btn.next');
  if (!track) return;
  const scrollAmount = () => {
    const card = track.querySelector('.t-card');
    return card ? card.getBoundingClientRect().width + 20 : 320;
  };
  if (prev) prev.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });
  if (next) next.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });
});
