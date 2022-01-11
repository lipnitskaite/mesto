class Card {
  constructor(name, imageSource, imageAlt) {
    this._name = name;
    this._imageSource = imageSource;
    this._imageAlt = imageAlt;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector('.template')
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
