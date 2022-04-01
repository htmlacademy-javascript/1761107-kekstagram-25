import { fillBigPicture } from './big-pictures.js';

const pictureTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');

const onPicturesContainerClick = (evt) => {
  const currentTarget = evt.target.closest('.picture');
  if (currentTarget) {
    evt.preventDefault();
    fillBigPicture(+currentTarget.dataset.id);
  }
};

const createPictureElement = ({ id, url, like, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureLink = pictureElement.querySelector('.picture');
  const imgElement = pictureElement.querySelector('.picture__img');
  imgElement.src = url;
  pictureLink.dataset.id = id;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = like;
  return pictureElement;
};

export const fillPhotoGallery = (cards) => {
  const listPhotos = document.createDocumentFragment();

  cards.forEach((card) => {
    const pictureElement = createPictureElement(card);
    listPhotos.append(pictureElement);
  });

  picturesContainer.addEventListener('click', onPicturesContainerClick);

  picturesContainer.querySelector('.pictures__title').after(listPhotos);
};

