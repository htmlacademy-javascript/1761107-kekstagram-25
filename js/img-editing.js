const MIN_VALUE_SCALE_CONTROL = 25;
const MAX_VALUE_SCALE_CONTROL = 100;
const STEP_SCALE = 25;

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const scaleControlSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleControlBiggerBtn = document.querySelector('.scale__control--bigger');
const scaleControlInput = document.querySelector('.scale__control--value');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectList = document.querySelector('.effects__list');

let currentEffect;

const EFFECTS = [
  {
    id: 'effect-none',
    className: 'effects__preview--none',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => parseFloat(value)
    },
    getScaleFilter: () => '',
  },
  {
    id: 'effect-chrome',
    className: 'effects__preview--chrome',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower', format: {
      to: (value) => value.toFixed(1),
      from: (value) => parseFloat(value)
    },
    getScaleFilter: (scale) => `grayscale(${scale})`
  },
  {
    id: 'effect-sepia',
    className: 'effects__preview--sepia',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(1),
      from: (value) => parseFloat(value)
    },
    getScaleFilter: (scale) =>`sepia(${scale})`
  },
  {
    id: 'effect-marvin',
    className: 'effects__preview--marvin',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower', format: {
      to: (value) => value.toFixed(0),
      from: (value) => parseFloat(value)
    },
    getScaleFilter: (scale) => `invert(${scale}%)`
  },
  {
    id: 'effect-phobos',
    className: 'effects__preview--phobos',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(1),
      from: (value) => parseFloat(value)
    },
    getScaleFilter: (scale) => `blur(${scale}px)`
  },
  {
    id: 'effect-heat',
    className: 'effects__preview--heat',
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(1),
      from: (value) => parseFloat(value)
    },
    getScaleFilter: (scale) => `brightness(${scale})`
  }
];

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

const onScaleControlBiggerBtnClick = (evt) => {
  evt.preventDefault();
  changeControlValue(true);
};

const onEffectLevelSliderUpdate = () => {
  const scale = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = scale;
  imgUploadPreview.style.filter = currentEffect.getScaleFilter(scale);
};

const createSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: currentEffect.range,
    start: currentEffect.start,
    step: currentEffect.step,
    connect: currentEffect.connect,
    format: currentEffect.format
  });
};

const updateSlider = () => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: currentEffect.range,
    start: currentEffect.start,
    step: currentEffect.step,
    connect: currentEffect.connect,
    format: currentEffect.format
  });
};

const setImgEffectPreview = () => {
  imgUploadPreview.classList.forEach((ImgClass) => {
    if (ImgClass.indexOf('effects__preview--') === 0) {
      imgUploadPreview.classList.remove(ImgClass);
    }
  });

  imgUploadPreview.classList.add(currentEffect.className);
};

const disableSlider = () => {
  if (currentEffect.id === 'effect-none') {
    effectLevelSlider.setAttribute('disabled', true);
    return;
  }
  effectLevelSlider.removeAttribute('disabled');
};

const onEffectListClick = (evt) => {
  if (evt.target.closest('.effects__item')) {
    const effectID = evt.target.closest('.effects__item').querySelector('.effects__radio').id;
    currentEffect = EFFECTS.find((element) => (element.id === effectID));
    updateSlider();
    setImgEffectPreview();
    disableSlider();
  }
};

const initEffectLevelSlider = () => {
  currentEffect = EFFECTS.find((element) => (element.id === 'effect-none'));
  createSlider();
  setImgEffectPreview();
  disableSlider();

  effectLevelSlider.noUiSlider.on('update', onEffectLevelSliderUpdate);
  effectLevelValue.value = currentEffect.start;
  imgUploadPreview.style.filter = currentEffect.getScaleFilter(currentEffect.start);
};

export const initImgEditing = () => {
  scaleControlInput.value = 100;
  scaleControlSmallerBtn.addEventListener('click', onScaleControlSmallerBtnClick);
  scaleControlBiggerBtn.addEventListener('click', onScaleControlBiggerBtnClick);
  effectList.addEventListener('click', onEffectListClick);
  initEffectLevelSlider();
};

export const removeImgEditingListeners = () => {
  scaleControlSmallerBtn.removeEventListener('click', onScaleControlSmallerBtnClick);
  scaleControlBiggerBtn.removeEventListener('click', onScaleControlBiggerBtnClick);
  effectList.removeEventListener('click', onEffectListClick);
  effectLevelSlider.noUiSlider.destroy();
};
