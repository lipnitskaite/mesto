// Initial cards 

import altaiImage from '../images/altai.jpg';
import baikalImage from '../images/baikal-lake.jpg';
import caucasusImage from '../images/caucasus.jpg';
import elbrusImage from '../images/elbrus-mountain.jpg';
import kamchatkaImage from '../images/kamchatka.jpg';
import kurshskayaKosaImage from '../images/kurshskaya-kosa.jpg';

export const initialCards = [
  {
    name: 'Алтайский край',
    imageSource: altaiImage,
    imageAlt: 'Сосновый лес на фоне заснеженных гор'
  },
  {
    name: 'Озеро Байкал',
    imageSource: baikalImage,
    imageAlt: 'Машина на замерзшем озере на фоне холмистого берега'
  },
  {
    name: 'Кавказ',
    imageSource: caucasusImage,
    imageAlt: 'Летний вид на горы Кавказа'
  },
  {
    name: 'Гора Эльбрус',
    imageSource: elbrusImage,
    imageAlt: 'Осенний вид на Эльбрус'
  },
  {
    name: 'Камчатка',
    imageSource: kamchatkaImage,
    imageAlt: 'Каменнистые горы посреди моря'
  },
  {
    name: 'Куршская Коса',
    imageSource: kurshskayaKosaImage,
    imageAlt: 'Деревянная дорога посреди песчаных дюн'
  }
];

export const cardsContainerEl = document.querySelector('.places');
export const cardsContainerSelector = '.places';
export const popups = document.querySelectorAll('.popup');
export const popupSelector = '.popup';

// Image Popup
export const popupImageItem = document.querySelector('.popup_type_image');
export const popupWithImageSelector = '.popup_type_image';
export const imagePopup = popupImageItem.querySelector('.popup__image');
export const captionPopup = popupImageItem.querySelector('.popup__caption');

// Edit profile form
export const editLink = document.querySelector('.profile__edit-button');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupEditProfileSelector = '.popup_type_edit-profile';
export const profileForm = document.querySelector('.form_type_edit');
export const nameInput = document.querySelector('.form__input_type_name');
export const jobInput = document.querySelector('.form__input_type_job');
export const profileTitle = document.querySelector('.profile__title');
export const profileTitleSelector = '.profile__title';
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const profileSubtitleSelector = '.profile__subtitle';

// Add post form
export const addCardForm = document.querySelector('.form_type_add');
export const addButton = document.querySelector('.profile__add-button');
export const popupAddPost = document.querySelector('.popup_type_add-post');
export const popupAddPostSelector = '.popup_type_add-post';
export const postTitle = popupAddPost.querySelector('.form__input_type_post-title');
export const postImage = popupAddPost.querySelector('.form__input_type_post-image');