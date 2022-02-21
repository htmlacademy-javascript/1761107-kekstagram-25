function createRandomNumber(firstNumber, secondNumber) {
  if (firstNumber < 0 || secondNumber < 0) {
    return 0;
  }
  if (firstNumber === secondNumber) {
    return firstNumber;
  }
  if (firstNumber > secondNumber) {
    const x = firstNumber;
    firstNumber = secondNumber;
    secondNumber = x;
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  const randomNumber = Math.random()  * (secondNumber - firstNumber + 1) + firstNumber;
  return  Math.floor(randomNumber);
}

function lengthIsCorrect(string, maxLength) {
  return string.length <= maxLength;
}

console.log(createRandomNumber(10,20));

console.log(lengthIsCorrect('Hello, world!', 13));

