export class Card {
  constructor({ name, imageSource, imageAlt, cardId, handleCardClick, hideDeleteButton, handleDeleteButtonClick }, cardSelector) {
    this._name = name;
    this._imageSource = imageSource;
    this._imageAlt = imageAlt;
    this._cardId = cardId;
    this._handleCardClick = handleCardClick;
    this._hideDeleteButton = hideDeleteButton;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
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
    this._deleteButton = this._element.querySelector('.place__delete-button');
    this._setEventListeners();
  
    this._cardImage.src = this._imageSource;
    this._cardImage.alt = this._imageAlt;
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
    this._likeButton.addEventListener('click', this._handleLike);
    this._element.querySelector('.place__delete-button').addEventListener('click', this._handleDeleteButtonClick);
    this._cardImage.addEventListener('click', this._handleCardClick);
  }

  _handleLike = () => {
    this._likeButton.classList.toggle('place__like-button_active');
  }
}