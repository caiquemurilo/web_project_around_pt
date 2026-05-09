import Popup from './Popup.js'
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }
  open(name, link) {
    super.open()

    const imagePopup = this._popupSelector.querySelector('.popup__image')
    const captionPopup = this._popupSelector.querySelector('.popup__caption')

    imagePopup.src = link
    imagePopup.alt = name
    captionPopup.textContent = name
  }
}
