export const createRandomNumber = (min, max) => {
  if (min >= 0 && max >= 0 && min <= max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  return 'Введите число в установленном диапазоне';
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

export const createNumberArray = (from, to) => {
  const array = [];
  for (let i = from; i <= to; i++) {
    array.push(i);
  }
  return array;
};

export const shuffleArray = (array) => {
  const newArray = [];
  while (array.length > 0) {
    const i = createRandomNumber(0, array.length - 1);
    newArray.push(array[i]);
    array.splice(i, 1);
  }
  return newArray;
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const stopBubbling = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

checkStringLength('Hello, world!', 13);
