export class Card {
  constructor({ name, imageSource, imageAlt }, cardSelector, handleCardClick) {
    this._name = name;
    this._imageSource = imageSource;
    this._imageAlt = imageAlt;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._setEventListeners();
  
    this._cardImage.src = this._imageSource;
    this._cardImage.alt = this._imageAlt;
    this._element.querySelector('.place__title').textContent = this._name;
  
    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLike);
    this._element.querySelector('.place__delete-button').addEventListener('click', this._handleDelete);
    this._cardImage.addEventListener('click', this._handleCardClick);
  }

  _handleLike = () => {
    this._likeButton.classList.toggle('place__like-button_active');
  }

  _handleDelete = () => {  
    this._element.remove();
    this._element = null;
  }
}