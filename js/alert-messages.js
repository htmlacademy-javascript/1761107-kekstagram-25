import { isEscapeKey } from './util.js';
const ALERT_SHOW_TIME = 5000;
const bodyElement = document.querySelector('body');
const UploadErrorMessageTemplate = document.querySelector('#upload-error-messages').content;
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;
let errorContainer;
let successContainer;

export const showUploadErrorMessage = (err) => {
  const messageElement = UploadErrorMessageTemplate.cloneNode(true);
  messageElement.querySelector('p').textContent = err;
  bodyElement.append(messageElement);

  setTimeout(() => {
    bodyElement.querySelector('.error').remove();
  }, ALERT_SHOW_TIME);
};

const onModalErrorClick = (evt) => {
  if (evt.target === evt.currentTarget || evt.target.closest('.error__button')) {
    evt.preventDefault();
    errorContainer.remove();
    removeModalErrorListeners();
  }
};

const onDocumentKeydownError = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    errorContainer.remove();
    removeModalErrorListeners();
  }
};

function removeModalErrorListeners() {
  document.removeEventListener('keydown', onDocumentKeydownError);
}

export const showErrorMessage = () => {
  const messageElement = errorTemplate.cloneNode(true);
  errorContainer = messageElement.querySelector('.error');
  bodyElement.append(errorContainer);
  errorContainer.addEventListener('click', onModalErrorClick);
  document.addEventListener('keydown', onDocumentKeydownError);
};

const onModalSuccessClick = (evt) => {
  if (evt.target === evt.currentTarget || evt.target.closest('.success__button')) {
    evt.preventDefault();
    successContainer.remove();
    removeModalSuccessListeners();
  }
};

const onDocumentKeydownSuccess = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successContainer.remove();
    removeModalSuccessListeners();
  }
};

function removeModalSuccessListeners() {
  document.removeEventListener('keydown', onDocumentKeydownSuccess);
}

export const showSuccessMessage = () => {
  const messageElement = successTemplate.cloneNode(true);
  successContainer = messageElement.querySelector('.success');
  bodyElement.append(successContainer);

  document.addEventListener('keydown', onDocumentKeydownSuccess);
  successContainer.addEventListener('click', onModalSuccessClick);
};
