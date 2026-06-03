export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items
    this._renderer = renderer
    this._containerSelector = document.querySelector(containerSelector)
  }
  renderer() {
    this._items.reverse().forEach(item => {
      this._renderer(item)
    })
  }
  addItem(item) {
    this._containerSelector.prepend(item)
  }
}
