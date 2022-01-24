import '../pages/index.css';
import { initialCards, editLink, profileForm, addButton, addCardForm, cardsContainerEl, cardsContainerSelector, postTitle, postImage, popupEditProfileSelector, popupWithImageSelector, popupAddPostSelector, profileTitleSelector, profileSubtitleSelector } from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {Popup} from '../components/Popup.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

// Forms
const addPostForm = new PopupWithForm(popupAddPostSelector, () => {
  const inputPostTitle = postTitle.value;
  const inputPostImage = postImage.value;

  const cardElement = getItem({name: inputPostTitle, imageSource: inputPostImage});

  cardsContainerEl.prepend(cardElement);
}
);
const userInfoForm = new UserInfo({profileTitleSelector, profileSubtitleSelector});

// Popups
const popupUserInfo = new Popup(popupEditProfileSelector);

// Forms Validation
const config = ({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

// Render cards with pictures
function getItem(item) {
  const handleCardClick = () => {
    const popupWithImage = new PopupWithImage(popupWithImageSelector, item);
    popupWithImage.openPopup();

    popupWithImage.setEventListeners();
  }

  const card = new Card(item, '.template', handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

// Open popupEditProfile
editLink.addEventListener('click', function () {
  userInfoForm.getUserInfo();

  popupUserInfo.openPopup();
  popupUserInfo.setEventListeners();

  formValidators[ profileForm.getAttribute('name') ].resetValidation();
});

profileForm.addEventListener('submit', handleFormSubmit); 

// Submit popupEditProfile changes
function handleFormSubmit (evt) {
  userInfoForm.setUserInfo();

  popupUserInfo.closePopup();
}

// Open popupAddPost
addButton.addEventListener('click', function () {
  addPostForm.openPopup();

  formValidators[ addCardForm.getAttribute('name') ].resetValidation();
});

addPostForm.setEventListeners();

const section = new Section({ items: initialCards, renderer: getItem }, cardsContainerSelector);
section.render();