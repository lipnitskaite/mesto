import {Popup} from '../components/Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._deleteButton = this._popup.querySelector('.form__button_type_delete-post');
    // this._form = this._popup.querySelector(formSelector);
    // this._handleFormSubmit = handleFormSubmit;
  }

  // _getInputValues() {
  //   this._inputList = this._popup.querySelectorAll('.form__input');

  //   this._formValues = {};

  //   this._inputList.forEach(input => {
  //     this._formValues[input.name] = input.value;
  //   });

  //   return this._formValues;
  // }

  setSubmitAction(func) {
    this._handleCardDelete = func;
  }

  // Handle closePopup
  closePopup() {
    super.closePopup();
    // this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    // this._form.addEventListener('submit', (evt) => {
    //   evt.preventDefault();

    //   this._handleFormSubmit();

    //   this.closePopup();
    // })

    this._deleteButton.addEventListener('click', () => {
        this._handleCardDelete(this._element);
    })
  };
}