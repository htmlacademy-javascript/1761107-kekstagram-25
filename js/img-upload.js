import { isEscapeKey, stopBubbling } from './util.js';
import { FocusLock } from './focus-lock.js';

const FILE_UPLOAD_NUMBER = 0;

const uploadFile = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadContainer = document.querySelector('.img-upload__overlay');
const imgPreview = document.querySelector('.img-upload__preview img');
const scaleControl = document.querySelector('.scale__control--value');
const effectNone = document.querySelector('#effect-none');
const hashtags = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');

const focusLock = new FocusLock;

//создает из строки массив с разделителем - "любое количество пробелов"
const createHashtagsArray = (hashtagsString) => {
  const newArray = hashtagsString.split(/\s* \s*/);
  //удаляет пустые элементы в массиве, если в конце или начале строки были пробелы
  return newArray.filter((item) => item !== '');
};

const CHECKLIST = [
  {
    validation: (stringComments) => createHashtagsArray(stringComments).length <= 5,
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
    validation: (stringComments) => createHashtagsArray(stringComments).every((item) => item.length <= 20),
    errorText: 'длина хэш-тега не должна превышать 20 символов'
  },
  {
    validation: (stringComments) => createHashtagsArray(stringComments).every((item) => item.match(/^#[A-Za-zА-Яа-яЁё0-9]+$/) !== null),
    errorText: 'хэш-тег может состоять только из букв и цифр'
  }
];

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'text__hashtags-container',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

CHECKLIST.forEach((check) => {
  pristine.addValidator(hashtags, check.validation, check.errorText);
});

const validateForm = (evt) => {
  if (hashtags.value.length && !pristine.validate()) {
    evt.preventDefault();
  }
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
  hashtags.addEventListener('keydown', stopBubbling);
  comment.addEventListener('keydown', stopBubbling);
  imgUploadForm.addEventListener('submit', validateForm);
};

const openModal = () => {
  imgUploadContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  addModalListeners();
  focusLock.lock('.img-upload__overlay', false);
};

const removeModalListeners = () => {
  imgUploadContainer.removeEventListener('click', onModalClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  hashtags.removeEventListener('keydown', stopBubbling);
  comment.removeEventListener('keydown', stopBubbling);
  imgUploadForm.removeEventListener('submit', validateForm);
};

const onUploadFileChange = (evt) => {
  evt.preventDefault();
  imgPreview.src = URL.createObjectURL(evt.target.files[FILE_UPLOAD_NUMBER]);
  openModal();
};

uploadFile.addEventListener('change', onUploadFileChange);
