const MAX_HASH_COUNTER = 5;
const MAX_HASH_LENGTH = 20;
const CHECK_ITEMS = [
  {
    validate: (stringComments) => createHashtagsArray(stringComments).length <= MAX_HASH_COUNTER,
    errorText: 'количество хэш-тегов не должно быть больше 5'
  },
  {
    validate: (stringComments) => {
      const hashtagsArray = createHashtagsArray(stringComments);
      return new Set(hashtagsArray.map((item) => item.toLowerCase())).size === hashtagsArray.length;
    },
    errorText: 'хэш-теги не должны повторяться'
  },
  {
    validate: (stringComments) => createHashtagsArray(stringComments).every((item) => item.startsWith('#')),
    errorText: 'хэш-тег должен начинаться с #'
  },
  {
    validate: (stringComments) => !createHashtagsArray(stringComments).includes('#'),
    errorText: 'хэш-тег не может быть пустым'
  },
  {
    validate: (stringComments) => createHashtagsArray(stringComments).every((item) => item.length <= MAX_HASH_LENGTH),
    errorText: 'длина хэш-тега не должна превышать 20 символов'
  },
  {
    validate: (stringComments) => createHashtagsArray(stringComments).every((item) => {
      if (item.length > 1) {
        return item.match(/^#[A-Za-zА-Яа-яЁё0-9]+$/);
      }
      return true;
    }),
    errorText: 'хэш-тег может состоять только из букв и цифр'
  }
];

const hashtagInput = document.querySelector('.text__hashtags');
const imgUploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'text__hashtags-container',
  errorTextParent: 'text__hashtags-container',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

function createHashtagsArray(hashtagsString) {
  return hashtagsString.split(' ').filter((item) => item);
}

export const initImgValidation = () => {
  CHECK_ITEMS.forEach((check) => {
    pristine.addValidator(hashtagInput, check.validate, check.errorText);
  });
};

export const isValid = () => pristine.validate();
