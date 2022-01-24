import {Popup} from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.form__input');

    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  // Handle closePopup
  closePopup() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);

    this._form.reset();
  }

  setEventListeners() {
    this._form = this._popupSelector.querySelector('.form');

    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__overlay')) {
        this.closePopup();
      }
      if (evt.target.classList.contains('popup__close')) {
        this.closePopup();
      }
    });

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());

      this.closePopup();
    })
  };
}