import { generateModalFunctions } from './modal-window.js';
import { stopBubbling } from './util.js';

const uploadFile = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadContainer = document.querySelector('.img-upload__overlay');
const imgPreview = document.querySelector('.img-upload__preview img');
const editImgCloseBtn = document.querySelector('.img-upload__cancel');
const scaleControl = document.querySelector('.scale__control--value');
const effectNone = document.querySelector('#effect-none');
const hashtags = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');

//создает из строки массив с разделителем - "любое количество пробелов"
const createHashtagsArray = (hashtagsString) => {
  const newArray = hashtagsString.split(/\s* \s*/);
  //удаляет пустые элементы в массиве, если в конце или начале строки были пробелы
  return newArray.filter((item) => item !== '');
};

const CHECKLIST = [
  {
    validation(stringComments) {
      return createHashtagsArray(stringComments).length <= 5;
    },
    errorText: 'количество хэш-тегов не должно быть больше 5'
  },
  {
    validation(stringComments) {
      const hashtagsArray = createHashtagsArray(stringComments);
      return new Set(hashtagsArray.map((item) => item.toLowerCase())).size === hashtagsArray.length;
    },
    errorText: 'хэш-теги не должны повторяться'
  },
  {
    validation(stringComments) {
      return createHashtagsArray(stringComments).some((item) => item[0] === '#');
    },
    errorText: 'хэш-тег должен начинаться с #'
  },
  {
    validation(stringComments) {
      const hashtagsArray = createHashtagsArray(stringComments);
      if (hashtagsArray.some((item) => item[0] === '#')) {
        return hashtagsArray.some((item) => item.length > 1);
      } else {
        return true;
      }
    },
    errorText: 'хэш-тег не может быть пустым'
  },
  {
    validation(stringComments) {
      return createHashtagsArray(stringComments).some((item) => item.length < 20);
    },
    errorText: 'длина хэш-тега не должна превышать 20 символов'
  },
  {
    validation(stringComments) {
      const hashtagsArray = createHashtagsArray(stringComments);
      if (hashtagsArray.some((item) => item[0] === '#')) {
        return !createHashtagsArray(stringComments).some((item) => !item.match(/^#[A-Za-zА-Яа-яЁё0-9]+$/));
      } else {
        return true;
      }
    },
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

imgUploadForm.addEventListener('submit', validateForm);

hashtags.addEventListener('keydown', stopBubbling);

comment.addEventListener('keydown', stopBubbling);

//приведение полей к значениям по умолчанию, после закрытия модального окна
const clearImgUpload = () => {
  uploadFile.value = '';
  scaleControl.value = 100;
  effectNone.checked = true;
};

const onUploadFileChange = (evt) => {
  evt.preventDefault();
  //временное решение, это нужно к след домашке
  imgPreview.src = URL.createObjectURL(evt.target.files[0]);
  //
  const editImgModal = generateModalFunctions(imgUploadContainer, editImgCloseBtn, clearImgUpload);
  editImgModal.showModalWindow();
};

uploadFile.addEventListener('change', onUploadFileChange);
