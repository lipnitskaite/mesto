// const showInputError = (form, input, errorMessage, errorClass, inputErrorClass) => {
//   const errorElement = form.querySelector(`.${input.id}-error`);
//   input.classList.add(inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(errorClass);
// };

// const hideInputError = (form, input, errorClass, inputErrorClass) => {
//   const errorElement = form.querySelector(`.${input.id}-error`);
//   input.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = '';
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((input) => {
//     return !input.validity.valid;
//   });
// }

// const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(inactiveButtonClass);
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(inactiveButtonClass);
//     buttonElement.disabled = false;
//   }
// }

// const checkInputValidity = (form, input, { inputErrorClass, errorClass }) => {
//   if (!input.validity.valid) {
//     showInputError(form, input, input.validationMessage, errorClass, inputErrorClass);
//   } else {
//     hideInputError(form, input, errorClass, inputErrorClass);
//   }
// };

// const setEventListeners = (form, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {
//   const inputList = Array.from(form.querySelectorAll(inputSelector));
//   const buttonElement = form.querySelector(submitButtonSelector);
  
//   toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  
//   inputList.forEach((input) => {
//     input.addEventListener('input', function () {
//       checkInputValidity(form, input, rest);
      
//       toggleButtonState(inputList, buttonElement, inactiveButtonClass);
//     });
//   });
// };

// const enableValidation = ({ formSelector, ...rest }) => {
//   const formList = Array.from(document.querySelectorAll(formSelector));
  
//   formList.forEach((form) => {
//     form.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });

//     setEventListeners(form, rest);
//   });
// };

// // включение валидации вызовом enableValidation
// // все настройки передаются при вызове

// enableValidation({
//   formSelector: '.form',
//   inputSelector: '.form__input',
//   submitButtonSelector: '.form__button',
//   inactiveButtonClass: 'form__button_inactive',
//   inputErrorClass: 'form__input_type_error',
//   errorClass: 'form__input-error_active'
// });

class FormValidator {
  constructor(data, form) {
    this._form = form;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  _showInputError (input, errorMessage) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);

    input.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);

    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };

  _setEventListeners() {    
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const buttonElement = this._form.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation () {    
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    this._setEventListeners();
  };
}

export default FormValidator;
