const cursorState = {
  x: 0,
  y: 0,
  trailX: 0,
  trailY: 0,
  isVisible: false,
  animationFrame: null,
};

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
