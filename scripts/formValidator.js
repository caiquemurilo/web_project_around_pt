export class FormValidator {
  constructor(
    { inputSelector, submitButtonSelector, inputErrorClass, errorClass },
    formElement
  ) {
    this._inputSelector = inputSelector // '.popup__input'
    this._submitButtonSelector = submitButtonSelector // '.popup__button'
    this._inputErrorClass = inputErrorClass // 'popup__input_type_error'
    this._errorClass = errorClass // '.popup__input-error_active'

    this._formElement = formElement // ex: o newCardModal de const newCardModal = document.querySelector('#new-card-popup')
  }
  enableValidation() {
    this._formInputs = Array.from(this._formElement.querySelectorAll(this._inputSelector))

    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    )
    this._setEventListeners()
    this._toggleButtonState()
  }
  _setEventListeners() {
    this._formInputs.forEach(input => {
      input.addEventListener('input', () => {
        if (this._hasInvalidInput()) {
          this._showInputError(input, input.validationMessage)
        } else {
          this._hideInputError(input)
        }
        this._toggleButtonState()
      })
    })
  }
  _showInputError(element, errorMessage) {
    const errorElement = document.querySelector(`.${element.id}-input-error`) //select span with class which has the class with id reference in its name 
    element.classList.add(this._inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add('popup__input-error_active')

  }
  _hideInputError(element) {
    const errorElement = document.querySelector(`.${element.id}-input-error`)
    element.classList.remove('popup__input_type_error')
    errorElement.textContent = ''
    errorElement.classList.remove('popup__input-error_active')
  }
  _hasInvalidInput() {
    return this._formInputs.some(function (input) {
      return !input.validity.valid
    })

  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.disabled = true
    } else {
      this._submitButton.disabled = false
    }
  }
  resetFormValidation() {
    this._formInputs.forEach(input => {
      this._hideInputError(input)
    })
  }
}
