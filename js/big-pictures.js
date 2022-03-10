import { cards } from './data.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCloseBtn = document.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments');

const closeBigPicture = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

bigPictureCloseBtn.addEventListener('click', () => {
  closeBigPicture();
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    closeBigPicture();
  }
});

const showModalWindow = () => {
  bigPictureContainer.classList.remove('hidden');
  bigPictureContainer.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureContainer.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');
};

const fillBigPictureContainer = (card) => {
  bigPictureContainer.querySelector('.big-picture__img').children[0].src = card.url;
  bigPictureContainer.querySelector('.likes-count').textContent = card.like;
  bigPictureContainer.querySelector('.comments-count').textContent = card.comments.length;
  bigPictureContainer.querySelector('.social__caption').textContent = card.description;
};

const createCommentElement = (comment) => {
  const commentEl = document.createElement('li');
  commentEl.classList.add('social__comment');

  const pictureEl = document.createElement('img');
  pictureEl.classList.add('social__picture');
  pictureEl.src = comment.avatar;
  pictureEl.alt = comment.name;
  pictureEl.width = 35;
  pictureEl.height = 35;

  const textEl = document.createElement('p');
  textEl.classList.add('social__text');
  textEl.textContent = comment.message;

  commentEl.append(pictureEl);
  commentEl.append(textEl);
  return commentEl;
};

const generateComments = (card) => {
  const listComments = document.createDocumentFragment();

  card.comments.forEach((comment) => {
    const commentEl = createCommentElement(comment);
    listComments.append(commentEl);
  });

  socialComments.innerHTML = '';
  socialComments.append(listComments);
};

const fillBigPicture = (idCard) => {
  const card = cards.find((element) => (element.id === idCard));
  fillBigPictureContainer(card);
  generateComments(card);
  showModalWindow();

};

export { fillBigPicture };
