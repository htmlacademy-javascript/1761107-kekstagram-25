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

export function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

checkStringLength('Hello, world!', 13);
