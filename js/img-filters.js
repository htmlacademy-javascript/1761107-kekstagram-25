import { getCards } from './data.js';
import { fillPhotoGallery } from './pictures.js';
import { shuffleArray } from './util.js';


const COUNT_RANDOM_PICTURE = 10;
const imgFilters = document.querySelector('.img-filters');
const imgFiltersBtnDefault = document.querySelector('#filter-default');
const imgFiltersBtnRandom = document.querySelector('#filter-random');
const imgFiltersBtnDiscussed = document.querySelector('#filter-discussed');

const setClassBtnActive = (activeBtn) => {
  const previousBtn = document.querySelector('.img-filters__button--active');
  previousBtn.classList.remove('img-filters__button--active');
  activeBtn.classList.add('img-filters__button--active');
};

const clearPicturesContainer = () => {
  const picturesList = document.querySelectorAll('.picture');
  picturesList.forEach((picture) => {
    picture.innerHTML = '';
  });
};

const getRandomCards = () => {
  const shuffleCards = shuffleArray(getCards().slice());
  return shuffleCards.slice(0, COUNT_RANDOM_PICTURE);

};

const sortCardsDiscussed = () => {
  return getCards().sort((cardA, cardB) => cardB.comments.length - cardA.comments.length);
};

const onImgFiltersBtnDefaultClick = (evt) => {
  setClassBtnActive(evt.target);
  clearPicturesContainer();
  fillPhotoGallery(getCards());
};

const onImgFiltersBtnRandomClick = (evt) => {
  setClassBtnActive(evt.target);
  clearPicturesContainer();
  fillPhotoGallery(getRandomCards());
};

const onImgFiltersBtnDiscussedClick = (evt) => {
  setClassBtnActive(evt.target);
  clearPicturesContainer();
  fillPhotoGallery(sortCardsDiscussed());
};

export const showFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
  imgFiltersBtnDefault.addEventListener('click', onImgFiltersBtnDefaultClick);
  imgFiltersBtnRandom.addEventListener('click', onImgFiltersBtnRandomClick);
  imgFiltersBtnDiscussed.addEventListener('click', onImgFiltersBtnDiscussedClick);
};
