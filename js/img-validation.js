const MAX_HASH_COUNTER = 5;
const MAX_HASH_LENGTH = 20;

const hashtagInput = document.querySelector('.text__hashtags');
const imgUploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'text__hashtags-container',
  errorTextParent: 'text__hashtags-container',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const createHashtagsArray = (hashtagsString) => hashtagsString.split(' ').filter((item) => item);

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
    validation: (stringComments) => createHashtagsArray(stringComments).every((item) => {
      if (item.length > 1) {
        return item.match(/^#[A-Za-zА-Яа-яЁё0-9]+$/);
      }
      return true;
    }),
    errorText: 'хэш-тег может состоять только из букв и цифр'
  }
];

export const initImgValidation = () => {
  CHECKLIST.forEach((check) => {
    pristine.addValidator(hashtagInput, check.validation, check.errorText);
  });
};

export const isValid = () => pristine.validate();
