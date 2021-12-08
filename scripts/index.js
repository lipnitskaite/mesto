const cardsContainerEl = document.querySelector('.places');
const templateEl = document.querySelector('.template');

// Edit profile form
const editLink = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupEditCloseButton = popupEditProfile.querySelector('.popup__close');
const editFormElement = document.querySelector('.form_type_edit');
const nameInput = document.querySelector('.form__item_type_name');
const jobInput = document.querySelector('.form__item_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Add post form
const addFormElement = document.querySelector('.form_type_add');
const addButton = document.querySelector('.profile__add-button');
const popupAddPost = document.querySelector('.popup_type_add-post');
const popupAddCloseButton = popupAddPost.querySelector('.popup__close');
const postTitle = popupAddPost.querySelector('.form__item_type_post-title');
const postImage = popupAddPost.querySelector('.form__item_type_post-image');

// PopupImage
const popupImageItem = document.querySelector('.popup_type_image');
const popupImageItemCloseButton = popupImageItem.querySelector('.popup__close');

// Initial cards with pictures
function render() {
  const html = initialCards
    .map(getItem)
  
    cardsContainerEl.append(...html);
}

function getItem(item) {
  const newItem = templateEl.content.cloneNode(true);
  const headerEl = newItem.querySelector('.place__title');
  const imageEl = newItem.querySelector('.place__image');
  const likeButton = newItem.querySelector('.place__like-button');
  const removeBtn = newItem.querySelector('.place__delete-button');

  headerEl.textContent = item.name;
  imageEl.setAttribute('src', item.imageSource);
  imageEl.setAttribute('alt', item.imageAlt);
  
  likeButton.addEventListener('click', handleLike); // Handle Like Button

  removeBtn.addEventListener('click', handleDelete); // Handle Delete Button

  // Handle popupImage
  const imagePopup = document.querySelector('.popup__image');
  const captionPopup = document.querySelector('.popup__caption');

  imageEl.addEventListener('click', function() {
    imagePopup.setAttribute('src', item.imageSource);
    imagePopup.setAttribute('alt', item.imageAlt);
    captionPopup.textContent = item.name;

    openPopup(popupImageItem);
  });

  return newItem;
} 

// Handle openPopup
function openPopup(evt) {
  evt.classList.add('popup_opened');
}

// Handle closePopup
function closePopup (evt) {
  evt.classList.remove('popup_opened');
}

// Submit popupEditProfile changes
function handleFormSubmit (evt) {
  evt.preventDefault(); 
    
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

// Handle AddPost
function handleAdd(evt) {  
  evt.preventDefault(); 

  const inputPostTitle = postTitle.value;
  const inputPostImage = postImage.value;
  const cardItem = getItem({name: inputPostTitle, imageSource: inputPostImage});
  
  cardsContainerEl.prepend(cardItem);

  postTitle.value = '';
  postImage.value = '';
  
  closePopup(popupAddPost);
}

// Handle Like
function handleLike (evt) {
  const eventTarget = evt.target;

  eventTarget.classList.toggle('place__like-button_active');
}

// Handle Delete
function handleDelete (evt) {
  const eventTarget = evt.target;
  const cardItem = eventTarget.closest('.place');
  
  cardItem.remove();
}

// Open popupEditProfile
editLink.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  openPopup(popupEditProfile);
});

editFormElement.addEventListener('submit', handleFormSubmit); 

// Open popupAddPost
addButton.addEventListener('click', function () {
  openPopup(popupAddPost);
});

addFormElement.addEventListener('submit', handleAdd);

// Popup CloseButton
popupEditCloseButton.addEventListener('click', function () {
  closePopup(popupEditProfile);
});
popupAddCloseButton.addEventListener('click', function () {
  closePopup(popupAddPost);
});
popupImageItemCloseButton.addEventListener('click', function () {
  closePopup(popupImageItem);
});

render();
