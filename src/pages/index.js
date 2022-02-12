// import '../pages/index.css';
import { 
  editLink, 
  profileForm, 
  addButton, 
  addCardForm, 
  addCardFormSelector, 
  cardsContainerSelector, 
  postTitle, 
  postImage, 
  popupEditProfileSelector, 
  profileFormSelector, 
  popupWithImageSelector, 
  popupAddPostSelector, 
  profileTitleSelector,
  profileSubtitleSelector, 
  nameInput, 
  aboutInput 
} from '../utils/constants.js';

import {Api} from '../components/Api.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

// Api
const api = new Api({
  adress: 'https://mesto.nomoreparties.co/v1/cohort-35',
  token: '5ac1d86f-37b5-4f50-b37e-b1e98dd53da9'
});

api.getUserInfoApi();

// Section
const section = new Section({ 
  renderer: getItem 
  }, cardsContainerSelector
);

// AddPost Form
const addPostForm = new PopupWithForm(popupAddPostSelector, addCardFormSelector, () => {
  const inputPostTitle = postTitle.value;
  const inputPostImage = postImage.value;

  const cardElement = getItem({name: inputPostTitle, imageSource: inputPostImage});

  section.addItem(cardElement);
}
);

// UserInfo Form
const userInfoForm = new UserInfo({profileTitleSelector, profileSubtitleSelector});

// Popups
const popupUserInfo = new PopupWithForm(
  popupEditProfileSelector,
  profileFormSelector,
  () => {
    const inputs = {
      name: nameInput.value,
      about: aboutInput.value
    }
    // userInfoForm.setUserInfo(inputs.name, inputs.about);
    api.updateUserInfo(inputs)
    .then(result => {
      userInfoForm.setUserInfo(result.name, result.about);
    })
    .catch(err => console.log(`Ошибка при изменении информации: ${err}`))
});

popupUserInfo.setEventListeners();

// Popup With Image
const popupWithImage = new PopupWithImage(popupWithImageSelector);

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
    popupWithImage.openPopup({name: item.name, imageSource: item.link});
  }

  const card = new Card({name: item.name, imageSource: item.link}, '.template', handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

popupWithImage.setEventListeners();

// Open popupEditProfile
editLink.addEventListener('click', function () {
  const currentUserForm = userInfoForm.getUserInfo();   
  nameInput.value = currentUserForm.name;
  aboutInput.value = currentUserForm.about;

  popupUserInfo.openPopup();

  formValidators[ profileForm.getAttribute('name') ].resetValidation();
});

// Open popupAddPost
addButton.addEventListener('click', function () {
  addPostForm.openPopup();

  formValidators[ addCardForm.getAttribute('name') ].resetValidation();
});

addPostForm.setEventListeners();

api.getUserInfoApi()
  .then(data => {
    userInfoForm.setUserInfo(data.name, data.about);
  })
  .catch(err => console.log(err));

api.getCards()
  .then(cards => {
    section.render(cards);
  })
  .catch(err => console.log(err));



