import { fillPhotoGallery } from './pictures.js';
import { showFilters } from './img-filters.js';
import { initUploading } from './img-upload.js';
import { getCardsData } from './api.js';
import { initCards } from './data.js';
import { showUploadErrorMessage } from './alert-messages.js';

const onGetSuccess = (cardsList) => {
  initCards(cardsList);
  fillPhotoGallery();
  showFilters();
};

getCardsData(onGetSuccess, showUploadErrorMessage);

initUploading();
