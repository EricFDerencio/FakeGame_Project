const parallaxState = {
  mouseX: 0,
  mouseY: 0,
  scrollY: 0,
  ticking: false,
};

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
