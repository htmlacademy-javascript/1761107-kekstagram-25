import { fillBigPicture } from './big-pictures.js';
import { cards } from './data.js';

const pictureTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');

const createPictureElement = ({ id, url, like, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const imgElement = pictureElement.querySelector('.picture__img');
  imgElement.src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = like;

  pictureElement.children[0].addEventListener('click', () => {
    fillBigPicture(id);
  });

  return pictureElement;
};

const fillPhotoGallery = () => {
  const listPhotos = document.createDocumentFragment();

  cards.forEach((card) => {
    const pictureElement = createPictureElement(card);
    listPhotos.append(pictureElement);
  });

  picturesContainer.querySelector('.pictures__title').after(listPhotos);
};

export { fillPhotoGallery };
