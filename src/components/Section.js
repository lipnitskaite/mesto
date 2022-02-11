export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Render cards with pictures
  addItem(element) {
    this._container.prepend(element);
  }

  render(items) {  
    items.forEach((item) => {
      const cardElement = this._renderer(item)
    
      this.addItem(cardElement);
    })
  }
}