import {Popup} from '../components/Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  // Handle openPopup
  openPopup({imageSource, imageAlt, name}) {
    this._imagePopup = document.querySelector('.popup__image');
    this._captionPopup = document.querySelector('.popup__caption');

    super.openPopup();

    this._imagePopup.src = imageSource;
    this._imagePopup.alt = imageAlt;
    this._captionPopup.textContent = name;
  }
}