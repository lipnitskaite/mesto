import {Popup} from '../components/Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._deleteButton = this._popup.querySelector('.form__button_type_delete-post');
  }

  setSubmitAction(func) {
    this._handleCardDelete = func;
  }

  // Handle closePopup
  closePopup() {
    super.closePopup();
  }

  setEventListeners() {
    super.setEventListeners();

    this._deleteButton.addEventListener('click', () => {
      this._handleCardDelete(this._element);
    })
  };
}