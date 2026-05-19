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

function hasRequiredElements() {
  return Object.values(elements).every(Boolean);
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

function initSideNav() {
  const navIcons = document.querySelectorAll('.side-nav-icon');
  const sectionIds = ['hero', 'characters', 'world'];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

  if (!sections.length || !navIcons.length) return;

  function setActive(targetId) {
    navIcons.forEach((icon) => {
      const isActive = icon.dataset.scrollTarget === targetId;

      icon.classList.toggle('active', isActive);
    });
  }

  function updateActiveOnScroll() {
    const scrollY = window.scrollY + window.innerHeight * 0.35;
    let currentId = sectionIds[0];

    for (let i = 0; i < sections.length; i += 1) {
      if (sections[i].offsetTop <= scrollY) {
        currentId = sectionIds[i];
      }
    }

    setActive(currentId);
  }

  navIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
      setActive(icon.dataset.scrollTarget);
    });
  });

  window.addEventListener('scroll', updateActiveOnScroll, { passive: true });
  updateActiveOnScroll();
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
  renderCharacters();
  renderWorldFeatures();
  updateCharacterSummary();
  initRevealAnimations();
  initCardTilt();
  initCharacterFilters();
  initSideNav();
  handleScroll();
}

init();
