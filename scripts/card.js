import {
  imagePopup,
  captionPopup,
  imagePopupModal,
  imagePopupCloseBtn
} from './index.js'
class Card {
  constructor({ name, link }, cardTemplateSelector) {
    this._name = name
    this._link = link
    this._cardTemplateSelector = cardTemplateSelector
    this._addImagePopupCloseKey = this._addImagePopupCloseKey.bind(this)
    this._addImagePopupCloseClick = this._addImagePopupCloseClick.bind(this)
    this._handleClosePopup = this._handleClosePopup.bind(this)
  }
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.card')
      .cloneNode(true)
    return cardTemplate
  }
  _handleOpenPopup() {
    imagePopup.src = this._link
    imagePopup.alt = this._name
    captionPopup.textContent = this._name
    document.addEventListener('keydown', this._addImagePopupCloseKey)
    imagePopupModal.addEventListener('click', this._addImagePopupCloseClick)
    imagePopupModal.classList.add('popup_is-opened')
    imagePopupCloseBtn.addEventListener('click', this._handleClosePopup)
  }
  _handleClosePopup() {
    imagePopupModal.classList.remove('popup_is-opened')
    imagePopup.src = ''
    imagePopup.alt = ''
    captionPopup.textContent = ''
    document.removeEventListener('keydown', this._addImagePopupCloseKey)
    imagePopupModal.removeEventListener('click', this._addImagePopupCloseClick)
    imagePopupCloseBtn.removeEventListener('click', this._handleClosePopup)
  }
  _setEventListeners() {
    this.likeBtn.addEventListener('click', () => {
      this.likeBtn.classList.toggle('card__like-button_is-active')
    })

    this.removeCardBtn.addEventListener('click', () => {
      this._cardElement.remove()
    })
    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopup()
    })
  }
  generateCard() {
    this._cardElement = this._getTemplate()

    const cardTitle = this._cardElement.querySelector('.card__title')
    this._cardImage = this._cardElement.querySelector('.card__image')
    this.likeBtn = this._cardElement.querySelector('.card__like-button')
    this.removeCardBtn = this._cardElement.querySelector('.card__delete-button')

    cardTitle.textContent = this._name
    this._cardImage.alt = this._name
    this._cardImage.src = this._link

    this._setEventListeners()
    return this._cardElement
  }
  _addImagePopupCloseKey(e) {
    if (e.key === 'Escape') {
      this._handleClosePopup()
    }
  }
  _addImagePopupCloseClick(e) {
    if (
      e.target.classList.contains('popup') ||
      e.target.classList.contains('popup__close')
    ) {
      this._handleClosePopup()
    }
  }
}
export { Card }
