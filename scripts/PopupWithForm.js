import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubit, resetFormValidation) {
    super(popupSelector)
    this._handleFormSubit = handleFormSubit.bind(this) // callback function submit form
    this._popupForm = this._popupElement.querySelector('.popup__form')
    this._resetFormValidation = resetFormValidation
  }
  _getInputValues() {
    const formValues = {}
    const formInputList = Array.from(
      this._popupElement.querySelectorAll('.popup__input')
    )
    formInputList.forEach(input => {
      formValues[input.id] = input.value
    })
    return formValues

  }
  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', this._handleFormSubit)
  }
  close() {

    super.close()
    this._resetFormValidation()
    this._popupForm.removeEventListener('submit', this._handleFormSubit)
  }
}
