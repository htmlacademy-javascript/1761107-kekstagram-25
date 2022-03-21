import { cards } from './data.js';
import { isEscapeKey, stopBubbling } from './util.js';
import { FocusLock } from './focus-lock.js';

const LOADABLE_COMMENTS_COUNT = 5;
const PICTURE_WIDTH = 35;
const PICTURE_HEIGHT = 35;

const bigPictureContainer = document.querySelector('.big-picture');
const socialComments = document.querySelector('.social__comments');
const socialCommentsCurrentCount = document.querySelector('.social__comment-count');
const commentLoaderBtn = document.querySelector('.social__comments-loader');
const commentInput = document.querySelector('.social__footer-text');

const focusLock = new FocusLock;

let displayedCommentsCount = 0;
let comments;

const fillBigPictureContainer = (card) => {
  bigPictureContainer.querySelector('.big-picture__img img').src = card.url;
  bigPictureContainer.querySelector('.likes-count').textContent = card.like;
  bigPictureContainer.querySelector('.social__caption').textContent = card.description;
};

const createCommentElement = (comment) => {
  const commentEl = document.createElement('li');
  commentEl.classList.add('social__comment');

  const pictureEl = document.createElement('img');
  pictureEl.classList.add('social__picture');
  pictureEl.src = comment.avatar;
  pictureEl.alt = comment.name;
  pictureEl.width = PICTURE_WIDTH;
  pictureEl.height = PICTURE_HEIGHT;

  const textEl = document.createElement('p');
  textEl.classList.add('social__text');
  textEl.textContent = comment.message;

  commentEl.append(pictureEl);
  commentEl.append(textEl);
  return commentEl;
};

const renderComments = (groupComments) => {
  const listComments = document.createDocumentFragment();

  groupComments.forEach((comment) => {
    const commentEl = createCommentElement(comment);
    listComments.append(commentEl);
  });

  socialComments.append(listComments);
};

const closeModalWindow = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  removeModalListeners();
};

const updateCommentLoaderBtn = () => {
  if (displayedCommentsCount === comments.length) {
    commentLoaderBtn.classList.add('hidden');
    commentLoaderBtn.disabled = true;
    focusLock.lock('.big-picture', false);
    return;
  }
  commentLoaderBtn.classList.remove('hidden');
  commentLoaderBtn.disabled = false;
};

const showComments = (from, to) => {
  displayedCommentsCount = Math.min(to, comments.length);
  const displayedComments = comments.slice(from, displayedCommentsCount);
  renderComments(displayedComments);
  socialCommentsCurrentCount.innerHTML =
    `${displayedCommentsCount} из <span class="comments-count">${comments.length}</span> комментариев`;
  updateCommentLoaderBtn();
};

const onCommentLoaderBtnClick = (evt) => {
  evt.preventDefault();
  showComments(displayedCommentsCount, displayedCommentsCount + LOADABLE_COMMENTS_COUNT);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalWindow();
  }
};

const onModalClick = (evt) => {
  if (evt.target === evt.currentTarget || evt.target.closest('.cancel')) {
    evt.preventDefault();
    closeModalWindow();
  }
};

const addModalListeners = () => {
  bigPictureContainer.addEventListener('click', onModalClick);
  document.addEventListener('keydown', onDocumentKeydown);
  commentInput.addEventListener('keydown', stopBubbling);
  commentLoaderBtn.addEventListener('click', onCommentLoaderBtnClick);
};

const openModal = () => {
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  addModalListeners();
  focusLock.lock('.big-picture', false);
};

function removeModalListeners () {
  bigPictureContainer.removeEventListener('click', onModalClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  commentInput.removeEventListener('keydown', stopBubbling);
  commentLoaderBtn.removeEventListener('click', onCommentLoaderBtnClick);
}

const fillBigPicture = (idCard) => {
  const card = cards.find((element) => (element.id === idCard));
  comments = card.comments;
  socialComments.innerHTML = '';
  fillBigPictureContainer(card);
  showComments(0, LOADABLE_COMMENTS_COUNT);
  openModal();
};

export { fillBigPicture };
