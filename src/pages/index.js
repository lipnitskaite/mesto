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
  editAvatarLink,
  popupEditAvatarSelector,
  profileFormSelector,
  avatarForm,
  avatarFormSelector,
  popupWithImageSelector, 
  popupAddPostSelector, 
  profileTitleSelector,
  profileSubtitleSelector,
  profileAvatarSelector,
  nameInput, 
  aboutInput,
  avatarInput,
  popupDeletePostSelector, 
  deleteCardFormSelector
} from '../utils/constants.js';

import {Api} from '../components/Api.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

let currentUserId = '';

// Render cards with pictures
function getItem(item) {
  const card = new Card({
    name: item.name, 
    imageSource: item.link,
    likeQuantity: item.likes.length,
    cardId: item._id,
    handleCardClick: () => {
      popupWithImage.openPopup({name: item.name, imageSource: item.link});
    },
    hideDeleteButton: item.owner._id != currentUserId,
    handleDeleteButtonClick: () => {
      const deletePostForm = new PopupWithForm(popupDeletePostSelector, deleteCardFormSelector, 
        () => {
        api.deleteCard(card.getId())
          .then(() => card.removeCard())
          .catch(err => console.log(`Ошибка при удалении карточки: ${err}`))
      }
      );
      deletePostForm.openPopup();

      deletePostForm.setEventListeners();
  }
  }, '.template');

  const cardElement = card.generateCard();

  return cardElement;
}

// Api
const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-35',
  token: '5ac1d86f-37b5-4f50-b37e-b1e98dd53da9'
});

api.getUserInfoApi();

// Section
const section = new Section({ 
  renderer: getItem 
  }, cardsContainerSelector
);

// AddPost Form
const addPostForm = new PopupWithForm(popupAddPostSelector, addCardFormSelector, 
  () => {
  const inputsNewPost = {
    name: postTitle.value,
    link: postImage.value
  }

  api.addCard(inputsNewPost)
  .then((result) => {
    const cardElement = getItem(result);

    console.log(result);

    section.addItem(cardElement);
  })
  .catch(err => console.log(`Ошибка при создании карточки: ${err}`))
}
);

// UserInfo Form
const userInfoForm = new UserInfo({profileTitleSelector, profileSubtitleSelector, profileAvatarSelector});

// Popup Edit Profile
const popupUserInfo = new PopupWithForm(
  popupEditProfileSelector,
  profileFormSelector,
  () => {
    const inputs = {
      name: nameInput.value,
      about: aboutInput.value
    }
    api.updateUserInfo(inputs)
    .then(result => {
      userInfoForm.setUserInfo(result.name, result.about, result.avatar);
    })
    .catch(err => console.log(`Ошибка при изменении информации: ${err}`))
});

popupUserInfo.setEventListeners();

// Popup Edit Avatar
const popupAvatar = new PopupWithForm(
  popupEditAvatarSelector,
  avatarFormSelector,
  () => {
    const newAvatarInput = avatarInput.value;

    api.updateUserAvatar(newAvatarInput)
    .then(result => {
      userInfoForm.setUserInfo(result.name, result.about, result.avatar);
      // profilePhoto.src = result;
    })
    .catch(err => console.log(`Ошибка при изменении аватара: ${err}`))
});

popupAvatar.setEventListeners();

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

popupWithImage.setEventListeners();

// Open popupEditProfile
editLink.addEventListener('click', function () {
  const currentUserForm = userInfoForm.getUserInfo();   
  nameInput.value = currentUserForm.name;
  aboutInput.value = currentUserForm.about;

  popupUserInfo.openPopup();

  formValidators[ profileForm.getAttribute('name') ].resetValidation();
});

// Open Popup Edit Profile Avatar
editAvatarLink.addEventListener('click', function () {
  popupAvatar.openPopup();

  formValidators[ avatarForm.getAttribute('name') ].resetValidation();
});

// Open popupAddPost
addButton.addEventListener('click', function () {
  addPostForm.openPopup();

  formValidators[ addCardForm.getAttribute('name') ].resetValidation();
});

addPostForm.setEventListeners();

api.getUserInfoApi()
  .then(result => {
    console.log(result);
    userInfoForm.setUserInfo(result.name, result.about, result.avatar);

    currentUserId = result._id;
  })
  .catch(err => console.log(err));

api.getCards()
  .then(cards => {
    section.render(cards);
  })
  .catch(err => console.log(err));



