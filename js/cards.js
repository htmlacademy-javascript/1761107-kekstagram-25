import {createRandomNumber, createNumberArray, shuffleArray} from './util.js';

const CARD_COUNT = 25;
const AVATAR_COUNT = 6;

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Александр',
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
  'Дарья'
];
const PHOTO_DESCRIPTIONS = [
  'водоем',
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
  'сафари'
];

const generateMessage = () => {
  let message = '';
  for (let i = 0; i < createRandomNumber(1, 2); i++) {
    message += `${COMMENTS[createRandomNumber(0, 5)]} `;
  }
  return message.trim();
};

const generateComments = (cardNumber) => {
  const CommentsArray = [];
  for (let i = 0; i < createRandomNumber(1, 10); i++) {
    const obj = {
      id: cardNumber * 10 + i,
      avatar: `img/avatar-${createRandomNumber(1, AVATAR_COUNT)}.svg`,
      message: generateMessage(),
      name: NAMES[createRandomNumber(0, NAMES.length - 1)],
    };
    CommentsArray.push(obj);
  }
  return CommentsArray;
};

const getPhotoIdArray = () => {
  const array = createNumberArray(1,25);
  return shuffleArray(array);
};

const generateCard = (cardNumber, photoNumber) => ({
  id: cardNumber,
  url: `photos/${photoNumber}.jpg`,
  description: PHOTO_DESCRIPTIONS[photoNumber - 1],
  like: createRandomNumber(15, 200),
  comments: generateComments(cardNumber)
});

export const createCards = () => {
  const PhotoIdArray = getPhotoIdArray();
  const cards = [];
  for (let i = 0; i < CARD_COUNT; i++) {
    cards.push(generateCard(i + 1, PhotoIdArray[i]));
  }
  return cards;
};
