const editLink = document.querySelector('.profile__edit-button');
const addLink = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddPost = document.querySelector('.popup_type_add-post');
const popupEditCloseButton = popupEditProfile.querySelector('.popup__close');
const popupAddCloseButton = popupAddPost.querySelector('.popup__close');
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('.form__item_type_name');
const jobInput = document.querySelector('.form__item_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const submit = document.querySelector('.form__item_type_submit');

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
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

addLink.addEventListener('click', openPopupAdd);

// Close popup

function close () {
  popupEditProfile.classList.remove('popup_opened');
  popupAddPost.classList.remove('popup_opened');
}

popupEditCloseButton.addEventListener('click', close);
popupAddCloseButton.addEventListener('click', close);
