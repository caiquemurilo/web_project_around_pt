import PopupWithImage from './PopupWithImage.js'
export default class Card {
  constructor({ name, link }, cardTemplateSelector) {
    this._name = name
    this._link = link
    this._cardTemplateSelector = cardTemplateSelector

  }
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.card')
      .cloneNode(true)
    return cardTemplate
  }

  _setEventListeners() {
    this.likeBtn.addEventListener('click', () => {
      this.likeBtn.classList.toggle('card__like-button_is-active')
    })

    this.removeCardBtn.addEventListener('click', () => {
      this._cardElement.remove()
    })
    this._cardImage.addEventListener('click', () => {
      const popupImageInstace = new PopupWithImage('#image-popup')
      popupImageInstace.open(this._name, this._link)
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
}