import '../pages/index.css';
import { 
  editUserInfoButton,
  editUserInfoSubmit, 
  editProfileInfoForm, 
  addCardButton, 
  addCardForm, 
  addCardFormSelector,
  addCardSubmit,
  cardsContainerSelector,  
  popupEditUserInfoSelector,
  editAvatarButton,
  editAvatarSubmit,
  popupEditAvatarSelector,
  editProfileInfoFormSelector,
  editAvatarForm,
  editAvatarFormSelector,
  popupWithImageSelector, 
  popupAddCardSelector, 
  UserInfoTitleSelector,
  UserInfoSubtitleSelector,
  AvatarSelector,
  nameInput, 
  aboutInput,
  popupDeleteCardSelector, 
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

// Api
const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-35',
  token: '5ac1d86f-37b5-4f50-b37e-b1e98dd53da9'
});

// Section
const section = new Section({ 
  renderer: getItem 
  }, cardsContainerSelector
);

// Edit User Info
const editUserInfoForm = new UserInfo({profileTitleSelector: UserInfoTitleSelector, profileSubtitleSelector: UserInfoSubtitleSelector, profileAvatarSelector: AvatarSelector});

const popupUserInfo = new PopupWithForm(
  popupEditUserInfoSelector,
  editProfileInfoFormSelector,
  (newUserData) => {
    renderLoading(editUserInfoSubmit, true);

    api.updateUserInfo(newUserData)
    .then(result => {
      editUserInfoForm.setUserInfo(result.name, result.about, result.avatar);

      popupUserInfo.closePopup();
    })
    .catch(err => console.log(`Ошибка при изменении информации: ${err}`))
});

const openEditProfilePopup = () => {
  const currentUserForm = editUserInfoForm.getUserInfo();   
  nameInput.value = currentUserForm.name;
  aboutInput.value = currentUserForm.about;

  renderLoading(editUserInfoSubmit, false);

  popupUserInfo.openPopup();

  formValidators[ editProfileInfoForm.getAttribute('name') ].resetValidation();
};

// Edit Avatar
const popupAvatar = new PopupWithForm(
  popupEditAvatarSelector,
  editAvatarFormSelector,
  (newAvatarData) => {
    api.updateUserAvatar(newAvatarData.avatar)
    .then(result => {
      editUserInfoForm.setUserInfo(result.name, result.about, result.avatar);
      
      renderLoading(editAvatarSubmit, true);
      popupAvatar.closePopup();
    })
    .catch(err => console.log(`Ошибка при изменении аватара: ${err}`))
});

const openEditAvatarPopup = () => {
  renderLoading(editAvatarSubmit, false);

  popupAvatar.openPopup();

  formValidators[ editAvatarForm.getAttribute('name') ].resetValidation();
};

// Add Card to Section
const addNewCardForm = new PopupWithForm(
  popupAddCardSelector,
  addCardFormSelector,
  
  // handleFormSubmit
  (newCardData) => {
    renderLoading(addCardSubmit, true);

    api.addCard(newCardData)
    .then((result) => {
      const cardElement = getItem(result);

      section.addItem(cardElement);

      addNewCardForm.closePopup();
    })
    .catch(err => console.log(`Ошибка при создании карточки: ${err}`))
  }
);

const openAddCardPopup = () => {
  renderLoading(addCardSubmit, false);
  
  addNewCardForm.openPopup();

  formValidators[ addCardForm.getAttribute('name') ].resetValidation();
};

// Open Popup With Image
const popupWithImage = new PopupWithImage(popupWithImageSelector);

// Delete Card Confirmation
const deleteCardPopup = new PopupWithConfirmation(popupDeleteCardSelector);

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

api.getUserInfoApi();

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

// Handle Loading Button
function renderLoading(buttonClass, isLoading) {
  if (isLoading) {
    buttonClass.textContent = 'Сохранение...';
  } else {
    buttonClass.textContent = buttonClass.value;
  }
}

// Validation
enableValidation(config);

// Open popupEditProfile
editUserInfoButton.addEventListener('click', openEditProfilePopup);
popupUserInfo.setEventListeners();

// Open Popup Edit Profile Avatar
editAvatarButton.addEventListener('click', openEditAvatarPopup);
popupAvatar.setEventListeners();

// Add Card to Section
addCardButton.addEventListener('click', openAddCardPopup);
addNewCardForm.setEventListeners();

// Popup With Image
popupWithImage.setEventListeners();

// Delete Card Popup
deleteCardPopup.setEventListeners();

// Handle User Info and Cards rendering
Promise.all([api.getUserInfoApi(), api.getCards()])
.then(([userData, cards]) => {
  editUserInfoForm.setUserInfo(userData.name, userData.about, userData.avatar);

  currentUserId = userData._id;

  section.render(cards);
})
.catch(err => console.log(err));

