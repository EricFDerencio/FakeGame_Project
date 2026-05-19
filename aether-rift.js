const PARTICLE_COUNT = 22;

const characters = [
  {
    name: 'KAEL',
    role: 'Guerreiro',
    element: 'pyro',
    elementLabel: 'Pyro',
    badge: 'PY',
    image: 'assets/pyro.png',
    description: 'Lâmina forjada na chama dos mundos caídos. Sua raiva queima mais que qualquer fogo.',
    accent: '#ff6b35',
    glow: 'rgba(255,107,53,0.4)',
    background: 'linear-gradient(160deg, #1a0810 0%, #3d0f0f 40%, #1a0508 100%)',
    stats: {
      atk: 90,
      def: 48,
      spd: 70,
    },
  },
  {
    name: 'LYRA',
    role: 'Maga',
    element: 'cryo',
    elementLabel: 'Cryo',
    badge: 'CR',
    image: 'assets/crio.png',
    description: 'A voz do inverno eterno. Cada feitiço que lança congela o tempo ao redor.',
    accent: '#5bc4e8',
    glow: 'rgba(91,196,232,0.4)',
    background: 'linear-gradient(160deg, #060d1e 0%, #0a2040 40%, #061218 100%)',
    stats: {
      atk: 72,
      def: 55,
      spd: 82,
    },
  },
  {
    name: 'ZHEN',
    role: 'Invocador',
    element: 'aether',
    elementLabel: 'Aether',
    badge: 'AE',
    image: 'assets/aether.png',
    description: 'Dobra a realidade com a ponta dos dedos. O espaço entre mundos obedece sua vontade.',
    accent: '#a855f7',
    glow: 'rgba(168,85,247,0.4)',
    background: 'linear-gradient(160deg, #0a0a18 0%, #1a0a35 40%, #0a0a1a 100%)',
    stats: {
      atk: 80,
      def: 62,
      spd: 78,
    },
  },
  {
    name: 'NYX',
    role: 'Assassino',
    element: 'void',
    elementLabel: 'Void',
    badge: 'VO',
    image: 'assets/void.png',
    description: 'Emerge das sombras sem rastro. Seus golpes apagam memórias e deixam apenas silêncio.',
    accent: '#22d3a8',
    glow: 'rgba(34,211,168,0.4)',
    background: 'linear-gradient(160deg, #050508 0%, #0f0818 40%, #050508 100%)',
    stats: {
      atk: 85,
      def: 40,
      spd: 95,
    },
  },
];

const worldFeatures = [
  {
    index: '01',
    title: 'Biomas vivos',
    description: 'Tempestades, ruínas e criaturas alteram rotas conforme o Rift se expande.',
  },
  {
    index: '02',
    title: 'Facções em conflito',
    description: 'Suas alianças mudam missões, preços, patrulhas e encontros pelo mapa.',
  },
  {
    index: '03',
    title: 'Segredos verticais',
    description: 'Escalada, portais e correntes etéreas revelam camadas escondidas do mundo.',
  },
];

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

function createElement(tagName, className, textContent) {
  const element = document.createElement(tagName);

  if (className) element.className = className;
  if (textContent) element.textContent = textContent;

  return element;
}

function createRarityStars(count) {
  const rarity = createElement('div', 'rarity');
  rarity.setAttribute('aria-label', `Raridade ${count} estrelas`);

  for (let i = 0; i < count; i += 1) {
    rarity.appendChild(createElement('span', 'star'));
  }

  return rarity;
}

function createStatRow(label, value) {
  const statRow = createElement('div', 'stat-row');
  const statLabel = createElement('span', 'stat-label', label);
  const statTrack = createElement('div', 'stat-track');
  const statFill = createElement('div', 'stat-fill');

  statFill.style.setProperty('--stat-w', `${value}%`);
  statTrack.appendChild(statFill);
  statRow.append(statLabel, statTrack);

  return statRow;
}

function createCharacterCard(character, index) {
  const card = createElement('article', 'char-card');
  const cardBg = createElement('div', 'card-bg');
  const image = document.createElement('img');
  const badge = createElement('div', 'element-badge', character.badge);
  const cardContent = createElement('div', 'card-content');
  const role = createElement('p', 'char-role', `${character.role} / ${character.elementLabel}`);
  const name = createElement('h3', 'char-name', character.name);
  const description = createElement('p', 'char-desc', character.description);
  const statBars = createElement('div', 'stat-bars');

  card.dataset.element = character.element;
  card.dataset.delay = String(index);
  card.style.setProperty('--card-bg', character.background);
  card.style.setProperty('--card-accent', character.accent);
  card.style.setProperty('--card-glow', character.glow);

  image.src = character.image;
  image.alt = '';
  image.loading = 'lazy';

  cardBg.setAttribute('aria-hidden', 'true');
  cardBg.appendChild(image);

  badge.setAttribute('aria-hidden', 'true');
  statBars.append(
    createStatRow('ATK', character.stats.atk),
    createStatRow('DEF', character.stats.def),
    createStatRow('SPD', character.stats.spd),
  );
  cardContent.append(role, name, description, statBars);
  card.append(
    cardBg,
    createElement('div', 'card-overlay'),
    createElement('div', 'card-shine'),
    createElement('div', 'card-border'),
    createRarityStars(5),
    badge,
    cardContent,
  );

  return card;
}

function renderCharacters() {
  const grid = document.getElementById('cards-grid');

  if (!grid) return;
  grid.replaceChildren(...characters.map((character, index) => createCharacterCard(character, index)));
}

function updateCharacterSummary() {
  const summaryValues = document.querySelectorAll('#detail-panel .detail-stat-value');
  const elementCount = new Set(characters.map((character) => character.element)).size;

  if (summaryValues.length < 3) return;

  summaryValues[0].textContent = String(characters.length);
  summaryValues[1].textContent = String(elementCount);
  summaryValues[2].textContent = 'S5';
}

function createWorldFeatureCard(feature) {
  const card = createElement('article', 'feature-card');
  const index = createElement('span', 'feature-index', feature.index);
  const title = createElement('h3', null, feature.title);
  const description = createElement('p', null, feature.description);

  card.setAttribute('data-reveal', '');
  card.append(index, title, description);

  return card;
}

function renderWorldFeatures() {
  const grid = document.getElementById('feature-grid');

  if (!grid) return;
  grid.replaceChildren(...worldFeatures.map(createWorldFeatureCard));
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
    tab.setAttribute('aria-pressed', String(tab.classList.contains('active')));
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const selectedFilter = tab.dataset.filter;

      tabs.forEach((currentTab) => {
        const isActive = currentTab === tab;

        currentTab.classList.toggle('active', isActive);
        currentTab.setAttribute('aria-pressed', String(isActive));
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
  renderCharacters();
  renderWorldFeatures();
  updateCharacterSummary();
  initRevealAnimations();
  initCardTilt();
  initCharacterFilters();
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
  initCharactersSection();
  initSideNav();
  handleScroll();
}

init();

