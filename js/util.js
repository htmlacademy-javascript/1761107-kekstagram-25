export const createRandomNumber = (min, max) => {
  if (min >= 0 && max >= 0 && min <= max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  return 'Введите число в установленном диапазоне';
};

export const shuffleArray = (items) => {
  const newItems = [];
  while (items.length > 0) {
    const i = createRandomNumber(0, items.length - 1);
    newItems.push(items[i]);
    items.splice(i, 1);
  }
  return newItems;
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const stopBubbling = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

export function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
