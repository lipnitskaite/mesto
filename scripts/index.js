// Edit profile form
const editLink = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupEditCloseButton = popupEditProfile.querySelector('.popup__close');
const addLink = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('.form__item_type_name');
const jobInput = document.querySelector('.form__item_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Add post form
const popupAddPost = document.querySelector('.popup_type_add-post');
const popupAddCloseButton = popupAddPost.querySelector('.popup__close');
const postTitle = popupAddPost.querySelector('.form__item_type_post-title');
const postImage = popupAddPost.querySelector('.form__item_type_post-image');
const submit = document.querySelector('.form__item_type_submit');

// Like button
// const places = document.querySelector('.places').cloneNode(true);

// Initial cards with pictures
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
const templateEl = document.querySelector('.template');

function render() {
  const html = initialCards
    .map(getItem)
  
    cardsContainerEl.append(...html);
}

function getItem(item) {
  const newItem = templateEl.content.cloneNode(true);
  const headerEl = newItem.querySelector('.place__title');
  const imageEl = newItem.querySelector('.place__image');
  headerEl.textContent = item.name;
  imageEl.setAttribute('src', item.imageSource);
  imageEl.setAttribute('alt', item.imageAlt);

  return newItem;
} 

render();

// Open popupEditProfile
function openPopupEdit () {
  popupEditProfile.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

editLink.addEventListener('click', openPopupEdit);

// Submit popupEditProfile changes
function formSubmitHandler (evt) {
  evt.preventDefault(); 
    
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  close();
}

formElement.addEventListener('submit', formSubmitHandler);

// Open popupAddPost
function openPopupAdd () {
  popupAddPost.classList.add('popup_opened');
}

addLink.addEventListener('click', openPopupAdd);

// Close popup
function close () {
  popupEditProfile.classList.remove('popup_opened');
  popupAddPost.classList.remove('popup_opened');
}

popupEditCloseButton.addEventListener('click', close);
popupAddCloseButton.addEventListener('click', close);


// Add like to a place
// places.querySelector('.place__like-button').addEventListener('click', function (evt) {
//   evt.target.classList.toggle('place__like-button_active');
// }); 
