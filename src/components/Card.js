export default class Card {
  constructor(
    { name, link, isLiked },
    cardTemplateSelector,
    handleCardClick,
    handleTrashClick,
    handleLikeClick 
  ) {
    this._name = name
    this._link = link
    this._isLiked = isLiked 
    this._cardTemplateSelector = cardTemplateSelector
    this._handleCardClick = handleCardClick
    this._handleTrashClick = handleTrashClick
    this._handleLikeClick = handleLikeClick
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
      this._handleLikeClick() 
    })

    this.removeCardBtn.addEventListener('click', () => {
      this._handleTrashClick()
    })

    this._cardImage.addEventListener('click', this._handleCardClick)
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


    if (this._isLiked) {
      this.likeBtn.classList.add('card__like-button_is-active')
    }

    this._setEventListeners()
    return this._cardElement
  }

  removeCard() {
    this._cardElement.remove()
    this._cardElement = null
  }


  isLiked() {
    return this._isLiked
  }


  updateLikeState(newIsLiked) {
    this._isLiked = newIsLiked
    if (this._isLiked) {
      this.likeBtn.classList.add('card__like-button_is-active')
    } else {
      this.likeBtn.classList.remove('card__like-button_is-active')
    }
  }
}