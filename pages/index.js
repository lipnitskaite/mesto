import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';

import { initialCards, editLink, profileForm, addButton, addCardForm, cardsContainerEl, popups, postTitle, postImage, popupImageItem, imagePopup, captionPopup, profileTitle, profileSubtitle, popupEditProfile, nameInput, jobInput, popupAddPost } from '../utils/constants.js';

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
function render(container, items, getFunction) {
  const html = items
    .map(getFunction)
  
    container.append(...html);
}

function getItem(item) {
  const handleCardClick = () => {
    imagePopup.setAttribute('src', item.imageSource);
    imagePopup.setAttribute('alt', item.imageAlt);
    captionPopup.textContent = item.name;

    openPopup(popupImageItem);
  }

  const card = new Card(item, '.template', handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

// Handle AddPost
function handleAdd(evt) {  
  evt.preventDefault(); 

  const inputPostTitle = postTitle.value;
  const inputPostImage = postImage.value;

  const cardElement = getItem({name: inputPostTitle, imageSource: inputPostImage});
  
  cardsContainerEl.prepend(cardElement);

  postTitle.value = '';
  postImage.value = '';

  closePopup(popupAddPost);
}

// Handle openPopup
function openPopup(evt) {
  evt.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

// Open popupEditProfile
editLink.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  openPopup(popupEditProfile);

  formValidators[ profileForm.getAttribute('name') ].resetValidation();
});

profileForm.addEventListener('submit', handleFormSubmit); 

// Open popupAddPost
addButton.addEventListener('click', function () {
  openPopup(popupAddPost);

  postTitle.value = '';
  postImage.value = '';

  formValidators[ addCardForm.getAttribute('name') ].resetValidation();
});

addCardForm.addEventListener('submit', handleAdd);

// Submit popupEditProfile changes
function handleFormSubmit (evt) {
  evt.preventDefault(); 
    
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

// Handle closePopup
function closePopup (evt) {
  evt.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

// Close Popup
popups.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__overlay')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
})

// Close Popup By Escape
function closePopupByEsc (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

render(cardsContainerEl, initialCards, getItem);
