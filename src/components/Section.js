export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  // Render cards with pictures
  addItem(element) {
    this._containerSelector.append(element);
  }

  render() {  
    this._items.forEach((item) => {
      const cardElement = this._renderer(item)
    
      this.addItem(cardElement);
    })
  }
}