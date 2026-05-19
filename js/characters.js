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
