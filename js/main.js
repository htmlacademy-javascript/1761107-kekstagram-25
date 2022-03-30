import { fillPhotoGallery } from './pictures.js';
import { initUploading } from './img-upload.js';
import { getCardsData } from './api.js';
import { initCards } from './data.js';
import { showUploadErrorMessage } from './alert-messages.js';

getCardsData((cardsList) => {
  initCards(cardsList);
  fillPhotoGallery();
}, showUploadErrorMessage);

initUploading();
