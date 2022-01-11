class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._imageSource = data.imageSource;
    this._imageAlt = data.imageAlt;
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
    this._setEventListenersForButtons();
  
    this._element.querySelector('.place__image').src = this._imageSource;
    this._element.querySelector('.place__image').alt = this._imageAlt;
    this._element.querySelector('.place__title').textContent = this._name;
  
    return this._element;
  }

  _setEventListenersForButtons() {
    this._element.querySelector('.place__like-button').addEventListener('click', this._handleLike);
    this._element.querySelector('.place__delete-button').addEventListener('click', this._handleDelete);
  }

  _handleLike = () => {
    this._element.querySelector('.place__like-button').classList.toggle('place__like-button_active');
  }

  _handleDelete = () => {  
    this._element.remove();
  }
}

export default Card;
