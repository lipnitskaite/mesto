import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Initial cards 
const initialCards = [
  {
    name: 'Алтайский край',
    imageSource: './images/altai.jpg',
    imageAlt: 'Сосновый лес на фоне заснеженных гор'
  },
  {
    name: 'Озеро Байкал',
    imageSource: './images/baikal-lake.jpg',
    imageAlt: 'Машина на замерзшем озере на фоне холмистого берега'
  },
  {
    name: 'Кавказ',
    imageSource: './images/caucasus.jpg',
    imageAlt: 'Летний вид на горы Кавказа'
  },
  {
    name: 'Гора Эльбрус',
    imageSource: './images/elbrus-mountain.jpg',
    imageAlt: 'Осенний вид на Эльбрус'
  },
  {
    name: 'Камчатка',
    imageSource: './images/kamchatka.jpg',
    imageAlt: 'Каменнистые горы посреди моря'
  },
  {
    name: 'Куршская Коса',
    imageSource: './images/kurshskaya-kosa.jpg',
    imageAlt: 'Деревянная дорога посреди песчаных дюн'
  }
];

const cardsContainerEl = document.querySelector('.places');
const popups = document.querySelectorAll('.popup');

// Image Popup
const popupImageItem = document.querySelector('.popup_type_image');
const imagePopup = popupImageItem.querySelector('.popup__image');
const captionPopup = popupImageItem.querySelector('.popup__caption');

// Edit profile form
const editLink = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const profileForm = document.querySelector('.form_type_edit');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Add post form
const addCardForm = document.querySelector('.form_type_add');
const addButton = document.querySelector('.profile__add-button');
const popupAddPost = document.querySelector('.popup_type_add-post');
const postTitle = popupAddPost.querySelector('.form__input_type_post-title');
const postImage = popupAddPost.querySelector('.form__input_type_post-image');

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
