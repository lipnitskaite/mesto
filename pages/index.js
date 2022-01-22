import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';

import { initialCards, editLink, profileForm, addButton, addCardForm, cardsContainerEl, cardsContainerSelector, postTitle, postImage, popupWithImageSelector, profileTitle, profileSubtitle, nameInput, jobInput, popupAddPostSelector } from '../utils/constants.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

// Forms
const addPostForm = new PopupWithForm(popupAddPostSelector, () => {
  const inputPostTitle = postTitle.value;
  const inputPostImage = postImage.value;

  const cardElement = getItem({name: inputPostTitle, imageSource: inputPostImage});

  cardsContainerEl.prepend(cardElement);
}
);

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
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  // openPopup(popupEditProfile);

  formValidators[ profileForm.getAttribute('name') ].resetValidation();
});

// profileForm.addEventListener('submit', handleFormSubmit); 

// Open popupAddPost
addButton.addEventListener('click', function () {
  addPostForm.openPopup();

  formValidators[ addCardForm.getAttribute('name') ].resetValidation();
});

// Submit popupEditProfile changes
// function handleFormSubmit (evt) {
  // evt.preventDefault(); 
    
  // profileTitle.textContent = nameInput.value;
  // profileSubtitle.textContent = jobInput.value;

  // closePopup(popupEditProfile);
// }

addPostForm.setEventListeners();

const section = new Section({ items: initialCards, renderer: getItem }, cardsContainerSelector);
section.render();