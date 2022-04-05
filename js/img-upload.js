import { isEscapeKey, stopBubbling } from './util.js';
import { FocusLock } from './focus-lock.js';
import { initImgEditing, removeImgEditingListeners } from './img-editing.js';
import { initImgValidation, isValid } from './img-validation.js';
import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './alert-messages.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadFile = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadContainer = document.querySelector('.img-upload__overlay');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectNone = document.querySelector('#effect-none');
const hashtagInput = document.querySelector('.text__hashtags');
const commentTextarea = document.querySelector('.text__description');
const imgUploadSubmitButton = document.querySelector('.img-upload__submit');

const focusLock = new FocusLock;

const onHashtagsInputKeydown = (evt) => {
  stopBubbling(evt);
};

const onCommentTextareaKeydown = (evt) => {
  stopBubbling(evt);
};

const clearImgUpload = () => {
  uploadFile.value = '';
  effectNone.checked = true;
};

const closeModalWindow = () => {
  imgUploadContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgPreview.src = '';
  hashtagInput.value = '';
  commentTextarea.value = '';
  removeModalListeners();
  clearImgUpload();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalWindow();
  }
};

const blockSubmitButton = () => {
  imgUploadSubmitButton.disabled = true;
};

const unblockSubmitButton = () => {
  imgUploadSubmitButton.disabled = false;
};

const onSendSuccess = () => {
  closeModalWindow();
  unblockSubmitButton();
  showSuccessMessage();
};

const onSendError = () => {
  unblockSubmitButton();
  closeModalWindow();
  showErrorMessage();
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (isValid()) {
    blockSubmitButton();
    sendData(onSendSuccess, onSendError, new FormData(evt.target));
  }
};

const onModalClick = (evt) => {
  if (evt.target === evt.currentTarget || evt.target.closest('.cancel')) {
    evt.preventDefault();
    closeModalWindow();
  }
};

const addModalListeners = () => {
  imgUploadContainer.addEventListener('click', onModalClick);
  document.addEventListener('keydown', onDocumentKeydown);
  hashtagInput.addEventListener('keydown', onHashtagsInputKeydown);
  commentTextarea.addEventListener('keydown', onCommentTextareaKeydown);
  imgUploadForm.addEventListener('submit', onUploadFormSubmit);
};

const openModal = () => {
  imgUploadContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  addModalListeners();
  initImgEditing();
  initImgValidation();
  focusLock.lock('.img-upload__overlay', false);
};

function removeModalListeners() {
  imgUploadContainer.removeEventListener('click', onModalClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  hashtagInput.removeEventListener('keydown', onHashtagsInputKeydown);
  commentTextarea.removeEventListener('keydown', onCommentTextareaKeydown);
  imgUploadForm.removeEventListener('submit', onUploadFormSubmit);
  removeImgEditingListeners();
}

const onUploadFileChange = (evt) => {
  evt.preventDefault();
  const file = evt.target.files[0];

  if (FILE_TYPES.some((it) => file.name.toLowerCase().endsWith(it))) {
    imgPreview.src = URL.createObjectURL(file);
    openModal();
  }
};

export const initUploading = () => {
  uploadFile.addEventListener('change', onUploadFileChange);
};
