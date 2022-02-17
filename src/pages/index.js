// import '../pages/index.css';
import { 
  editLink,
  editProfileSubmit, 
  profileForm, 
  addButton, 
  addCardForm, 
  addCardFormSelector,
  addPostSubmit,
  cardsContainerSelector,  
  popupEditProfileSelector,
  editAvatarLink,
  editAvatarSubmit,
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
  popupDeletePostSelector, 
  deleteCardFormSelector
} from '../utils/constants.js';

import {Api} from '../components/Api.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithConfirmation} from '../components/PopupWithConfirmation.js';
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

    handleDeleteButtonClick: (item) => {
      deleteCardPopup.setSubmitAction(() => {
        api.deleteCard(card.getId())
        .then(() => {
          card.removeCard()

          deleteCardPopup.closePopup();
        })
        .catch(err => console.log(`Ошибка при удалении карточки: ${err}`))
      });

      deleteCardPopup.openPopup(item);
    }, 

    handleLike: () => {
      const active = card.getLikeStatus();

      if (active) {
        api.removeLikeCard(card.getId())
        .then(() => {
          card.addLikeQuantity(-1)
          card.toggleLike();
        })
      } else {
        api.likeCard(card.getId())
        .then(() => {
          card.addLikeQuantity(1)
          card.toggleLike();
        })
      }
    },
  }, 
    '.template');

  const cardElement = card.generateCard();

  // Handle likes toggle
  item.likes.forEach((like) => {
    if(like._id == currentUserId) {
      card.toggleLike();
    }
  })

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

// Handle Loading
function renderLoading(buttonClass, isLoading) {
  if (isLoading) {
    buttonClass.textContent = 'Сохранение...';
  } else {
    buttonClass.textContent = buttonClass.value;
  }
}

// AddPost Form
const addPostForm = new PopupWithForm(
  popupAddPostSelector,
  addCardFormSelector,
  
  // handleFormSubmit
  (newPostData) => {
    renderLoading(addPostSubmit, true);

    api.addCard(newPostData)
    .then((result) => {
      const cardElement = getItem(result);

      section.addItem(cardElement);

      addPostForm.closePopup();
    })
    .catch(err => console.log(`Ошибка при создании карточки: ${err}`))
  }
);

// Delete Card Confirmation
const deleteCardPopup = new PopupWithConfirmation(popupDeletePostSelector);

deleteCardPopup.setEventListeners();

// UserInfo Form
const userInfoForm = new UserInfo({profileTitleSelector, profileSubtitleSelector, profileAvatarSelector});

// Popup Edit Profile
const popupUserInfo = new PopupWithForm(
  popupEditProfileSelector,
  profileFormSelector,
  (newUserData) => {
    renderLoading(editProfileSubmit, true);

    api.updateUserInfo(newUserData)
    .then(result => {
      userInfoForm.setUserInfo(result.name, result.about, result.avatar);

      popupUserInfo.closePopup();
    })
    .catch(err => console.log(`Ошибка при изменении информации: ${err}`))
});

popupUserInfo.setEventListeners();

// Popup Edit Avatar
const popupAvatar = new PopupWithForm(
  popupEditAvatarSelector,
  avatarFormSelector,
  (newAvatarData) => {
    api.updateUserAvatar(newAvatarData.avatar)
    .then(result => {
      userInfoForm.setUserInfo(result.name, result.about, result.avatar);
      
      renderLoading(editAvatarSubmit, true);
      popupAvatar.closePopup();
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

  renderLoading(editProfileSubmit, false);

  popupUserInfo.openPopup();

  formValidators[ profileForm.getAttribute('name') ].resetValidation();
});

// Open Popup Edit Profile Avatar
editAvatarLink.addEventListener('click', function () {
  renderLoading(editAvatarSubmit, false);

  popupAvatar.openPopup();

  formValidators[ avatarForm.getAttribute('name') ].resetValidation();
});

// Open popupAddPost
addButton.addEventListener('click', function () {
  renderLoading(addPostSubmit, false);
  
  addPostForm.openPopup();

  formValidators[ addCardForm.getAttribute('name') ].resetValidation();
});

addPostForm.setEventListeners();

// Handle User Info and Cards rendering
Promise.all([api.getUserInfoApi(), api.getCards()])
.then(([userData, cards]) => {
    userInfoForm.setUserInfo(userData.name, userData.about, userData.avatar);

    currentUserId = userData._id;

    section.render(cards);
})
.catch(err => console.log(err));




