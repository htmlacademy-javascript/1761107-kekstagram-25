const createRandomNumber = (min, max) => {
  if (min >= 0 && max >= 0 && min <= max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return 'Введите число в установленном диапазоне';
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const createNumberArray = (from, to) => {
  const array = [];
  for (let i = from; i <= to; i++) {
    array.push(i);
  }
  return array;
};

const shuffleArray = (array) => {
  const newArray = [];
  while (array.length > 0) {
    const i = createRandomNumber(0, array.length - 1);
    newArray.push(array[i]);
    array.splice(i, 1);
  }
  return newArray;
};

createRandomNumber(10, 20);
checkStringLength('Hello, world!', 13);
createNumberArray(1, 2);
shuffleArray([]);

export {createRandomNumber, createNumberArray, shuffleArray};
