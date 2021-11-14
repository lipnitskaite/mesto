const editLink = document.querySelector('.profile__button_type_edit');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');

function open () {
  popup.classList.add('popup__opened');
}

editLink.addEventListener('click', open);

function close () {
  popup.classList.remove('popup__opened');
}

popupCloseButton.addEventListener('click', close);

let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input');
let jobInput = document.querySelector('.form__job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let submit = document.querySelector('.form__submit');

function formSubmitHandler (evt) {
  evt.preventDefault(); 
    
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);

submit.addEventListener('click', close);
