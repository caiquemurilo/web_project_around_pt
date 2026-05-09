export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this)
    this._handleClickClose = this._handleClickClose.bind(this)
    this.close = this.close.bind(this)
  }
  open() {
    this._popupSelector.classList.add('popup_is-opened')
    this.setEventListeners()
  }
  close() {
    this._popupSelector.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', this._handleEscClose)
    document.removeEventListener('click', this._handleClickClose)
  }
  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close()
    }
  }
  _handleClickClose(e) {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
      this.close()
    }
  }
  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose)
    document.addEventListener('click', this._handleClickClose)
  }
}
