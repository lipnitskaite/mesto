import {Popup} from '../components/Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, { name, imageSource, imageAlt }) {
    super(popupSelector);
    this._name = name;
    this._imageSource = imageSource;
    this._imageAlt = imageAlt;
  }

  // Handle openPopup
  openPopup() {
    this._imagePopup = document.querySelector('.popup__image');
    this._captionPopup = document.querySelector('.popup__caption');

    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);

    this._imagePopup.src = this._imageSource;
    this._imagePopup.alt = this._imageAlt;
    this._captionPopup.textContent = this._name;
  }
}