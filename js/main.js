const createRandomNumber = (min, max) => {
  if (min >=0 && max >=0 && min !== max && min < max) {
    return Math.floor(Math.random()  * (max - min + 1) + min);
  }
  return 'Введите число в установленном диапазоне';
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

createRandomNumber(10,20);
checkStringLength('Hello, world!', 13);

