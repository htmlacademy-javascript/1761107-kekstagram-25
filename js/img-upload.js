import { generateModalFunctions } from './modal-window.js';

const uploadFile = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadContainer = document.querySelector('.img-upload__overlay');
const imgPreview = document.querySelector('.img-upload__preview img');
const editImgCloseBtn = document.querySelector('.img-upload__cancel');
const scaleControl = document.querySelector('.scale__control--value');
const effectNone = document.querySelector('#effect-none');
const hashtags = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
const overlay = document.querySelector('.img-upload__overlay');

//создает из строки массив с разделителем - люое количество пробелов
const createHashtagsArray = (hashtagsString) => {
  const newArray = hashtagsString.split(/\s* \s*/);
  //удаляем последний элемент в массиве, если в конце строки было больше 1 пробела
  return newArray.filter((item) => item !== '');
};

const CHECKLIST = [
  {
    validation(string) {
      return createHashtagsArray(string).length <= 5;
    },
    errorText: 'количество хэш-тегов не должно быть больше 5'
  },
  {
    validation(string) {
      const hashtagsArray = createHashtagsArray(string);
      return new Set(hashtagsArray.map((item) => item.toLowerCase())).size === hashtagsArray.length;
    },
    errorText: 'хэш-теги не должны повторяться'
  },
  {
    validation(string) {
      return createHashtagsArray(string).some((item) => item[0] === '#');
    },
    errorText: 'хэш-тег должен начинаться с #'
  },
  {
    validation(string) {
      const hashtagsArray = createHashtagsArray(string);
      if (hashtagsArray.some((item) => item[0] === '#')) {
        return hashtagsArray.some((item) => item.length > 1);
      } else {
        return true;
      }
    },
    errorText: 'хэш-тег не может быть пустым'
  },
  {
    validation(string) {
      return createHashtagsArray(string).some((item) => item.length < 20);
    },
    errorText: 'длина хэш-тега не должна превышать 20 символов'
  },
  {
    validation(string) {
      const hashtagsArray = createHashtagsArray(string);
      if (hashtagsArray.some((item) => item[0] === '#')) {
        return !createHashtagsArray(string).some((item) => !item.match(/^#[A-Za-zА-Яа-яЁё0-9]+$/));
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
  if (hashtags.value.length !== 0) {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  }
};

imgUploadForm.addEventListener('submit', (evt) => {
  validateForm(evt);
});

const stopBubling = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

hashtags.addEventListener('keydown', (evt) => {
  stopBubling(evt);
});

comment.addEventListener('keydown', (evt) => {
  stopBubling(evt);
});

//приведение полей к значениям по умолчанию, после закрытия модального окна
const clearImgUpload = () => {
  uploadFile.value = '';
  scaleControl.value = 100;
  effectNone.checked = true;
};

const onUploadFileChage = (evt) => {
  evt.preventDefault();
  //временное решение, это нужно к след домашке
  imgPreview.src = URL.createObjectURL(evt.target.files[0]);
  //
  const editImgModal = generateModalFunctions(imgUploadContainer, editImgCloseBtn, overlay, clearImgUpload);
  editImgModal.showModalWindow();
};

uploadFile.addEventListener('change', onUploadFileChage);
