const MIN_VALUE_SCALE_CONTROL = 25;
const MAX_VALUE_SCALE_CONTROL = 100;
const STEP_SCALE = 25;
const EFFECTS = {
  'effect-none'   : 'effects__preview--none',
  'effect-chrome' : 'effects__preview--chrome',
  'effect-sepia'  : 'effects__preview--sepia',
  'effect-marvin' : 'effects__preview--marvin',
  'effect-phobos' : 'effects__preview--phobos',
  'effect-heat'   : 'effects__preview--heat'
};

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const scaleControlSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleControlBiggerBtn = document.querySelector('.scale__control--bigger');
const scaleControlInput = document.querySelector('.scale__control--value');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectList = document.querySelector('.effects__list');
const effectLevelFieldset = document.querySelector('.img-upload__effect-level');

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

effectLevelSlider.noUiSlider.on('update', (...rest) => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
});

const changeControlValue = (bigger = false) => {
  const currentScaleValue = parseInt(scaleControlInput.value, 10);

  if (bigger && currentScaleValue === MAX_VALUE_SCALE_CONTROL) {
    return;
  }
  if (!bigger && currentScaleValue === MIN_VALUE_SCALE_CONTROL) {
    return;
  }

  const scaleValue = (bigger ? currentScaleValue + STEP_SCALE : currentScaleValue - STEP_SCALE);
  scaleControlInput.value = `${scaleValue} %`;
  imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
};

const onScaleControlSmallerBtnClick = (evt) => {
  evt.preventDefault();
  changeControlValue();
};

const scaleControlBiggerBtnClick = (evt) => {
  evt.preventDefault();
  changeControlValue(true);
};

export const initImgEditing = () => {
  scaleControlSmallerBtn.addEventListener('click', onScaleControlSmallerBtnClick);
  scaleControlBiggerBtn.addEventListener('click', scaleControlBiggerBtnClick);
};

const showSlider = (effectID) => {
  if (effectID === 'effect-none') {
    effectLevelSlider.setAttribute('disabled', true);
    return;
  }
  effectLevelSlider.removeAttribute('disabled');
};

const setImgEffects = (effectID) => {
  imgUploadPreview.classList.forEach((ImgClass) => {
    if (ImgClass.indexOf('effects__preview--') === 0) {
      imgUploadPreview.classList.remove(ImgClass);
    }
  });

  imgUploadPreview.classList.add(EFFECTS[effectID]);

  showSlider(effectID);
};

effectList.addEventListener('click', (evt) => {
  if (evt.target.closest('.effects__item')) {
    const effectID = evt.target.closest('.effects__item').querySelector('.effects__radio').id;
    setImgEffects(effectID);
  }
});
