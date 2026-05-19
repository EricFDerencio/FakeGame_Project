const PARTICLE_COUNT = 22;

const elements = {
  cursor: document.getElementById('cursor'),
  trail: document.getElementById('cursor-trail'),
  hero: document.getElementById('hero'),
  layerStars: document.getElementById('layer-stars'),
  layerNebula: document.getElementById('layer-nebula'),
  layerMountains: document.getElementById('layer-mountains'),
  layerGlow: document.getElementById('layer-glow'),
  heroContent: document.querySelector('.hero-content'),
  particles: document.getElementById('particles'),
};

const parallaxState = {
  mouseX: 0,
  mouseY: 0,
  scrollY: 0,
  ticking: false,
};

const cursorState = {
  x: 0,
  y: 0,
  trailX: 0,
  trailY: 0,
  isVisible: false,
  animationFrame: null,
};

function hasRequiredElements() {
  return Object.values(elements).every(Boolean);
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function setCursorTransform(element, x, y) {
  element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
}

function showCursor() {
  if (cursorState.isVisible) return;

  cursorState.isVisible = true;
  elements.cursor.classList.add('is-visible');
  elements.trail.classList.add('is-visible');
}

function hideCursor() {
  cursorState.isVisible = false;
  elements.cursor.classList.remove('is-visible');
  elements.trail.classList.remove('is-visible');
}

function animateCursorTrail() {
  cursorState.trailX += (cursorState.x - cursorState.trailX) * 0.22;
  cursorState.trailY += (cursorState.y - cursorState.trailY) * 0.22;

  setCursorTransform(elements.trail, cursorState.trailX, cursorState.trailY);
  cursorState.animationFrame = requestAnimationFrame(animateCursorTrail);
}

function updateCursor(x, y) {
  cursorState.x = x;
  cursorState.y = y;

  if (!cursorState.isVisible) {
    cursorState.trailX = x;
    cursorState.trailY = y;
    showCursor();
  }

  setCursorTransform(elements.cursor, x, y);
}

function getLayerTransform(mouseXFactor, mouseYFactor, scrollFactor) {
  const x = parallaxState.mouseX * mouseXFactor;
  const y = parallaxState.mouseY * mouseYFactor + parallaxState.scrollY * scrollFactor;

  return `translate(${x}px, ${y}px)`;
}

function updateParallax() {
  const heroHeight = elements.hero.offsetHeight;
  const scrollProgress = Math.min(parallaxState.scrollY / heroHeight, 1);

  elements.layerStars.style.transform = getLayerTransform(8, 6, 0.15);
  elements.layerNebula.style.transform = getLayerTransform(14, 10, 0.25);
  elements.layerMountains.style.transform = getLayerTransform(4, 3, 0.45);
  elements.layerGlow.style.transform = `translateY(${parallaxState.scrollY * 0.5}px)`;
  elements.heroContent.style.transform = `translateY(${parallaxState.scrollY * 0.3}px)`;
  elements.heroContent.style.opacity = Math.max(1 - scrollProgress * 1.6, 0);
}

function requestParallaxUpdate() {
  if (parallaxState.ticking) return;

  parallaxState.ticking = true;
  requestAnimationFrame(() => {
    updateParallax();
    parallaxState.ticking = false;
  });
}

function handlePointerMove(event) {
  parallaxState.mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  parallaxState.mouseY = (event.clientY / window.innerHeight - 0.5) * 2;

  updateCursor(event.clientX, event.clientY);
  requestParallaxUpdate();
}

function handleScroll() {
  const heroHeight = elements.hero.offsetHeight;

  parallaxState.scrollY = Math.min(window.scrollY, heroHeight);
  requestParallaxUpdate();
}

function createParticle() {
  const particle = document.createElement('div');
  const size = randomBetween(1, 4);
  const color = Math.random() > 0.5 ? 'rgba(200,168,75,0.8)' : 'rgba(180,210,255,0.6)';

  particle.className = 'particle';
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${randomBetween(0, 100)}%`;
  particle.style.bottom = `${randomBetween(0, 20)}%`;
  particle.style.opacity = randomBetween(0.4, 1);
  particle.style.background = color;
  particle.style.setProperty('--drift', `${randomBetween(-40, 40)}px`);
  particle.style.animationDuration = `${randomBetween(6, 16)}s`;
  particle.style.animationDelay = `${randomBetween(-12, 0)}s`;

  return particle;
}

function generateParticles() {
  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    elements.particles.appendChild(createParticle());
  }
}

function initSmoothScroll() {
  const scrollTriggers = document.querySelectorAll('[data-scroll-target]');

  scrollTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const target = document.getElementById(trigger.dataset.scrollTarget);

      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initRevealAnimations() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  const cards = document.querySelectorAll('.char-card');

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('visible'));
    cards.forEach((card) => card.classList.add('visible'));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.15 },
  );

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const delay = Number(entry.target.dataset.delay || 0) * 120;
        window.setTimeout(() => entry.target.classList.add('visible'), delay);
        cardObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.1 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
  cards.forEach((card) => cardObserver.observe(card));
}

function initCardTilt() {
  const cards = document.querySelectorAll('.char-card');

  cards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      if (card.classList.contains('is-filtered')) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = (event.clientX - centerX) / (rect.width / 2);
      const distanceY = (event.clientY - centerY) / (rect.height / 2);

      card.style.transform = `perspective(800px) rotateY(${distanceX * 10}deg) rotateX(${-distanceY * 8}deg) translateY(-6px) scale(1.02)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

function initCharacterFilters() {
  const tabs = document.querySelectorAll('.tab');
  const cards = document.querySelectorAll('.char-card');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const selectedFilter = tab.dataset.filter;

      tabs.forEach((currentTab) => {
        currentTab.classList.toggle('active', currentTab === tab);
      });

      cards.forEach((card) => {
        const isMatch = selectedFilter === 'all' || card.dataset.element === selectedFilter;

        card.classList.toggle('is-filtered', !isMatch);
        card.style.transform = '';
      });
    });
  });
}

function initCharactersSection() {
  initRevealAnimations();
  initCardTilt();
  initCharacterFilters();
}

function init() {
  if (!hasRequiredElements()) return;

  document.addEventListener('pointermove', handlePointerMove);
  document.addEventListener('pointerleave', hideCursor);
  document.addEventListener('pointercancel', hideCursor);
  window.addEventListener('blur', hideCursor);
  window.addEventListener('scroll', handleScroll, { passive: true });
  animateCursorTrail();
  generateParticles();
  initSmoothScroll();
  initCharactersSection();
  handleScroll();
}

init();
