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

const CHECKLIST = [
  {
    validation(array) {
      return array.some((item) => item[0] !== '#');
    },
    errorText: 'хэш-тег должен начинаться с #'
  },
  {
    validation(array) {
      return array.some((item) => item.length <= 1);
    },
    errorText: 'хэш-тег не может быть пустым'
  },
  {
    validation(array) {
      return array.some((item) => item.length > 20);
    },
    errorText: 'длина хэш-тега не должна превышать 20 символов'
  },
  {
    validation(array) {
      return array.some((item) => !item.match(/^#[A-Za-zА-Яа-яЁё0-9]+$/));
    },
    errorText: 'хэш-тег может состоять только из букв и цифр'
  }
];

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

const validateHashtags = (hashtagsArray) => {
  const errorMessages = [];
  //проверяем количество хэш-тегов
  if (hashtagsArray.length > 5) {
    errorMessages.push('количество хэш-тегов не должно быть больше 5');
  }
  //проверяем на уникальность
  if (new Set(hashtagsArray.map((item) => item.toLowerCase())).size !== hashtagsArray.length) {
    errorMessages.push('хэш-теги не должны повторяться');
  }
  //проверяем корректность каждого хэш-тега
  CHECKLIST.forEach((check) => {
    if (check.validation(hashtagsArray)) {
      errorMessages.push(check.errorText);
    }
  });
  return errorMessages.join(', ');
};

// const checkHashtags = () => {
//   imgUploadForm.addEventListener('submit', (evt) => {
//     //проверяем что инпут не пустой
//     if (hashtags.value.length !== 0) {
//       //разделяем строку на элементы массива
//       const hashtagsArray = hashtags.value.split(' ');
//       //еще нужно удалить элементы массива с пустыми пробелами и его потом заполнить в value
//       const errorMessage = validateHashtags(hashtagsArray);
//       if (errorMessage.length) {
//         evt.preventDefault();
//         console.log(validateHashtags(hashtagsArray));
//       }
//     }
//   }
//   );
// };

//checkHashtags();

//pristine example
const imgUploadFormPristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'text__hashtags-container',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

imgUploadFormPristine.addValidator(hashtags, (value) => value.length > 0, 'bla');

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  imgUploadFormPristine.validate();
});
///////

const clearImgUpload = () => {
  uploadFile.value = '';
  scaleControl.value = 100;
  effectNone.checked = true;
};

const onUploadFileChage = (evt) => {
  evt.preventDefault();
  imgPreview.src = URL.createObjectURL(evt.target.files[0]);
  const editImgModal = generateModalFunctions(imgUploadContainer, editImgCloseBtn, clearImgUpload);
  editImgModal.showModalWindow();
};

uploadFile.addEventListener('change', onUploadFileChage);
