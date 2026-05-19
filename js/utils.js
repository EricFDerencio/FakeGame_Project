function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createElement(tagName, className, textContent) {
  const element = document.createElement(tagName);

  if (className) element.className = className;
  if (textContent) element.textContent = textContent;

  return element;
}
