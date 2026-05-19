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
