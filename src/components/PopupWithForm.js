import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, resetFormValidation) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit.bind(this)
    this._popupForm = this._popupElement.querySelector('.popup__form')
    this._resetFormValidation = resetFormValidation
    this._submitButton = this._popupForm.querySelector('.popup__button')
    this._originalButtonText = this._submitButton.textContent
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
    this._popupForm.addEventListener('submit', this._handleFormSubmit)
  }
  close() {
    super.close()
    this._resetFormValidation()
    this._popupForm.removeEventListener('submit', this._handleFormSubmit)
  }
  renderLoading(isLoading, loadingText = 'Salvando...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._originalButtonText;
    }
  }
}
