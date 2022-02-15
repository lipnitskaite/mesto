export class Card {
  constructor({ name, imageSource, likeQuantity, cardId, handleCardClick, hideDeleteButton, handleDeleteButtonClick, handleLike }, cardSelector) {
    this._name = name;
    this._imageSource = imageSource;
    this._likeQuantity = likeQuantity;
    this._cardId = cardId;
    this._handleCardClick = handleCardClick;
    this._hideDeleteButton = hideDeleteButton;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLike = handleLike;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.place')
    .cloneNode(true);
    
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.place__image');
    this._likeButton = this._element.querySelector('.place__like-button');
    this._likeNumber = this._element.querySelector('.place__like-number');
    this._deleteButton = this._element.querySelector('.place__delete-button');
    this._setEventListeners();
  
    this._cardImage.src = this._imageSource;
    this._likeNumber.textContent = this._likeQuantity;
    this._element.querySelector('.place__title').textContent = this._name;

    if (this._hideDeleteButton) {
      this._deleteButton.classList.add('place_delete-button_inactive');
    }
  
    return this._element;
  }

  removeCard() {  
    this._element.remove();
    this._element = null;
  }

  getId() {
    return this._cardId;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._toggleLike);
    this._element.querySelector('.place__delete-button').addEventListener('click', this._handleDeleteButtonClick);
    this._cardImage.addEventListener('click', this._handleCardClick);
  }

  _toggleLike = () => {
    const active = this._likeButton.classList.toggle('place__like-button_active');
    this._handleLike(active);
  }

  addLikeQuantity(delta) {
    this._likeQuantity += delta;
    this._likeNumber.textContent = this._likeQuantity;
  }

}