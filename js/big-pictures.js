import { cards } from './data.js';
import { generateModalFunctions } from './modal-window.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCloseBtn = document.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments');
const socialCommentsCurrentCount = document.querySelector('.social__comment-count');
const commentLoaderBtn = document.querySelector('.social__comments-loader');

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
  pictureEl.width = 35;
  pictureEl.height = 35;

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

const fillBigPicture = (idCard) => {
  const card = cards.find((element) => (element.id === idCard));
  const comments = card.comments;
  socialComments.innerHTML = '';
  let displayedCommentsCount = 0;

  const updateCommentLoaderBtn = () => {
    if (displayedCommentsCount === comments.length) {
      commentLoaderBtn.classList.add('hidden');
    }
    else {
      commentLoaderBtn.classList.remove('hidden');
    }
  };

  const showComments = (from, to) => {
    displayedCommentsCount = Math.min(to, comments.length);
    const displayedComments = comments.slice(from, displayedCommentsCount);
    renderComments(displayedComments);
    socialCommentsCurrentCount.innerHTML =
      `${displayedCommentsCount} из <span class="comments-count">${ comments.length}</span> комментариев`;
    updateCommentLoaderBtn();
  };

  showComments(0, 5);

  const oncommentLoaderBtnClick = (evt) => {
    evt.preventDefault();
    showComments(displayedCommentsCount, displayedCommentsCount + 5);
  };

  const deleteEventListenerCommentLoaderBtn = () => {
    commentLoaderBtn.removeEventListener('click', oncommentLoaderBtnClick);
  };

  commentLoaderBtn.addEventListener('click', oncommentLoaderBtnClick);

  const showModalBigPicture = () => {
    const bigPictureModal = generateModalFunctions(
      bigPictureContainer,
      bigPictureCloseBtn,
      bigPictureContainer,
      deleteEventListenerCommentLoaderBtn
    );
    bigPictureModal.showModalWindow();
  };

  fillBigPictureContainer(card);
  showModalBigPicture();
};

export { fillBigPicture };
