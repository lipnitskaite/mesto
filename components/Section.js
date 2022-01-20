import {Card} from '../components/Card.js';
import { popupImageItem, imagePopup, captionPopup } from '../utils/constants.js';


export class Section {
  constructor({ items }, containerSelector) {
    this._items = items;
    // this._renderer = renderer;
    this._containerSelector = document.querySelector(this._containerSelector);
  }

  // Render cards with pictures
  addItem(element) {
    this._container.append(element);
  }

  renderer(item) {  
    const handleCardClick = () => {
      imagePopup.setAttribute('src', item.imageSource);
      imagePopup.setAttribute('alt', item.imageAlt);
      captionPopup.textContent = item.name;
  
      openPopup(popupImageItem);
    }

    this._items.forEach((item) => {
      const card = new Card(item, '.template', handleCardClick);
      const cardElement = card.generateCard();
            
      this.addItem(cardElement);
    })
  }
}