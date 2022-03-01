const createRandomNumber = (min, max) => {
  if (min >= 0 && max >= 0 && min <= max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return 'Введите число в установленном диапазоне';
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

createRandomNumber(10, 20);
checkStringLength('Hello, world!', 13);

const comments = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const names = ['Александр',
  'Михаил',
  'Дмитрий',
  'Иван',
  'Даниил',
  'Артем',
  'Егор',
  'Никита',
  'Владислав',
  'Тимофей',
  'Андрей',
  'Назар',
  'Марк',
  'Мария',
  'Дарина',
  'Алиса',
  'Ева',
  'Виктория',
  'Полина',
  'Варвара',
  'Александра',
  'Анастасия',
  'Ангелина',
  'Вероника',
  'Дарья'];

const descriptions = ['водоем',
  'указатель на пляж',
  'море',
  'девушка с фотоаппаратом',
  'рамен',
  'авто',
  'клубника на тарелке',
  'клюквенный морс',
  'самолет пролетащий над пляжем',
  'обувница',
  'дорога к пляжу',
  'ауди',
  'овощной салат',
  'котосуши',
  'тапочки-луноходы',
  'самолет в небе',
  'хор',
  'рето автомобиль',
  'тапочки с фонариками',
  'пальмы',
  'паста',
  'закат',
  'краб',
  'концерт',
  'сафари'];

const generateMassage = () => {
  let massage = '';
  for (let i = 0; i < createRandomNumber(1, 2); i++) {
    massage += comments[createRandomNumber(0, 5)];
  }
  return massage;
};

const generateComments = (cardNumber) => {
  const arComments = [];
  for (let i = 0; i < createRandomNumber(1, 10); i++) {
    const obj = {
      id: cardNumber * 100 + i,
      avatar: `img/avatar-${createRandomNumber(1, 25)}.svg`,
      message: generateMassage(),
      name: names[createRandomNumber(0, 24)],
    };
    arComments.push(obj);
  }
  return arComments;
};

const getArPhotoId = (countCards) => {
  const arId = [];
  const arPhotoId = [];
  for (let i = 0; i < countCards; i++) {
    arId.push(i + 1);
  }
  while (arId.length > 0) {
    const i = createRandomNumber(0, arId.length - 1);
    arPhotoId.push(arId[i]);
    arId.splice(i, 1);
  }
  return arPhotoId;
};

const generateCard = (cardNumber, photoNumber) => ({
  id: cardNumber,
  url: `photos/${photoNumber}.jpg`,
  description: descriptions[photoNumber - 1],
  like: createRandomNumber(15, 200),
  comments: generateComments(cardNumber)
});

const createCards = (countCards) => {
  const arPhotoId = getArPhotoId(countCards);
  const cards = [];
  for (let i = 0; i < countCards; i++) {
    cards.push(generateCard(i + 1, arPhotoId[i]));
  }
  return cards;
};

createCards(25);

