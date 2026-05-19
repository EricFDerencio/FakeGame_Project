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
