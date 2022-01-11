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
  
    this._element.querySelector('.place__image').src = this._imageSource;
    this._element.querySelector('.place__image').alt = this._imageAlt;
    this._element.querySelector('.place__title').textContent = this._name;
  
    return this._element;
  }
}

export default Card;
