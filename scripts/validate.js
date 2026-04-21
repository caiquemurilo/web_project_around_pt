import { formValidator } from './formValidator.js'
import {
  profileEditModal,
  newCardModal,
  submitButtonNewCardModal
} from './index.js'

// const inputsProfileEditModal =
//   profileEditModal.querySelectorAll('.popup__input')

// const inputsNewCardModal = newCardModal.querySelectorAll('.popup__input')

/* function showInputError(element, errorMessage) {
  const errorElement = document.querySelector(`.${element.id}-input-error`)
  element.classList.add('popup__input_type_error')
  errorElement.textContent = errorMessage
  errorElement.classList.add('popup__input-error_active')
} */

/* function hideInputError(element) {
  const errorElement = document.querySelector(`.${element.id}-input-error`)
  element.classList.remove('popup__input_type_error')
  errorElement.textContent = ''
  errorElement.classList.remove('form__input-error_active')
} */

/* function hasInvalidInput(inputList) {
  return Array.from(inputList).some(function (input) {
    return !input.validity.valid
  })
} */

/* function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true
  } else {
    buttonElement.disabled = false
  }
}
 */
function resetFormValidation(modal) {
  const inputsModal = modal.querySelectorAll('.popup__input')
  inputsModal.forEach(input => {
    hideInputError(input)
  })
}

inputsProfileEditModal.forEach(input => {
  input.addEventListener('input', () => {
    if (!input.validity.valid) {
      showInputError(input, input.validationMessage)
    } else {
      hideInputError(input)
    }
    toggleButtonState(inputsProfileEditModal, submitButtonProfileEditModal)
  })
})

inputsNewCardModal.forEach(input => {
  input.addEventListener('input', () => {
    if (!input.validity.valid) {
      showInputError(input, input.validationMessage)
    } else {
      hideInputError(input)
    }
    toggleButtonState(inputsNewCardModal, submitButtonNewCardModal)
  })
})



function enableValidation({
  formSelector, // form id
  inputSelector, //inputs class
  submitButtonSelector, // submit button class
  ...rest
}) {
  const formElement = document.querySelector(formSelector) // form element by id
  const formInputs = Array.from(formElement.querySelectorAll(inputSelector)) // all inputs of form element in an array
  const submitButton = formElement.querySelector(submitButtonSelector) // submit button of form element 
  toggleButtonState(formInputs, submitButton) // 

  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      isInputValid(formElement, input, rest)
      toggleButtonState(formInputs, submitButton)
    })
  })
}

// export { resetFormValidation }
