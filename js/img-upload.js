import { isEscapeKey, stopBubbling } from './util.js';
import { FocusLock } from './focus-lock.js';

const MAX_HASH_COUNTER = 5;
const MAX_HASH_LENGTH = 20;

const uploadFile = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadContainer = document.querySelector('.img-upload__overlay');
const imgPreview = document.querySelector('.img-upload__preview img');
const scaleControl = document.querySelector('.scale__control--value');
const effectNone = document.querySelector('#effect-none');
const hashtagInput = document.querySelector('.text__hashtags');
const commentTextarea = document.querySelector('.text__description');

const focusLock = new FocusLock;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'text__hashtags-container',
  errorTextParent: 'text__hashtags-container',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

//создает из строки массив с разделителем - "любое количество пробелов"
const createHashtagsArray = (hashtagsString) => {
  const newArray = hashtagsString.split(/\s* \s*/);
  //удаляет пустые элементы в массиве, если в конце или начале строки были пробелы
  return newArray.filter((item) => item !== '');
};

const CHECKLIST = [
  {
    validation: (stringComments) => createHashtagsArray(stringComments).length <= MAX_HASH_COUNTER,
    errorText: 'количество хэш-тегов не должно быть больше 5'
  },
  {
    validation: (stringComments) => {
      const hashtagsArray = createHashtagsArray(stringComments);
      return new Set(hashtagsArray.map((item) => item.toLowerCase())).size === hashtagsArray.length;
    },
    errorText: 'хэш-теги не должны повторяться'
  },
  {
    validation: (stringComments) => createHashtagsArray(stringComments).every((item) => item.startsWith('#')),
    errorText: 'хэш-тег должен начинаться с #'
  },
  {
    validation: (stringComments) => !createHashtagsArray(stringComments).includes('#'),
    errorText: 'хэш-тег не может быть пустым'
  },
  {
    validation: (stringComments) => createHashtagsArray(stringComments).every((item) => item.length <= MAX_HASH_LENGTH),
    errorText: 'длина хэш-тега не должна превышать 20 символов'
  },
  {
    validation: (stringComments) => createHashtagsArray(stringComments).every((item) => item.match(/^#[A-Za-zА-Яа-яЁё0-9]+$/) !== null),
    errorText: 'хэш-тег может состоять только из букв и цифр'
  }
];

CHECKLIST.forEach((check) => {
  pristine.addValidator(hashtagInput, check.validation, check.errorText);
});

const onUploadFormSubmit = (evt) => {
  if (hashtagInput.value.length && !pristine.validate()) {
    evt.preventDefault();
  }
};

const onHashtagsInputKeydown= (evt) => {
  stopBubbling(evt);
};

const onCommentTextareaKeydown = (evt) => {
  stopBubbling(evt);
};

const clearImgUpload = () => {
  uploadFile.value = '';
  scaleControl.value = 100;
  effectNone.checked = true;
};

const closeModalWindow = () => {
  imgUploadContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  removeModalListeners();
  clearImgUpload();
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
  focusLock.lock('.img-upload__overlay', false);
};

function removeModalListeners () {
  imgUploadContainer.removeEventListener('click', onModalClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  hashtagInput.removeEventListener('keydown', onHashtagsInputKeydown);
  commentTextarea.removeEventListener('keydown', onCommentTextareaKeydown);
  imgUploadForm.removeEventListener('submit', onUploadFormSubmit);
}

const onUploadFileChange = (evt) => {
  evt.preventDefault();
  imgPreview.src = URL.createObjectURL(evt.target.files[0]);
  openModal();
};

export const initUploading = () => {
  uploadFile.addEventListener('change', onUploadFileChange);
};
