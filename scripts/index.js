import Card from './card.js'
import { FormValidator } from './formValidator.js'
// import { FormValidator } from './formValidator.js'
// import { resetFormValidation } from './validate.js'
const initialCards = [
  {
    name: 'Vale de Yosemite',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg'
  },
  {
    name: 'Lago Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg'
  },
  {
    name: 'Montanhas Carecas',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg'
  },
  {
    name: 'Latemar',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg'
  },
  {
    name: 'Parque Nacional da Vanoise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg'
  },
  {
    name: 'Lago di Braies',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg'
  }
]

const cardsContainer = document.querySelector('.cards__list')

const profileEditModal = document.querySelector('#edit-popup')

const submitButtonProfileEditModal =
  profileEditModal.querySelector('.popup__button')
const profileEditOpenBtn = document.querySelector('.profile__edit-button')
const profileEditCloseBtn = profileEditModal.querySelector('.popup__close')
const profileEditForm = profileEditModal.querySelector('#edit-profile-form')
const nameInput = profileEditModal.querySelector('.popup__input_type_name')
const jobInput = profileEditModal.querySelector(
  '.popup__input_type_description'
)
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

const newCardModal = document.querySelector('#new-card-popup')

const submitButtonNewCardModal = newCardModal.querySelector('.popup__button')
const newCardOpenBtn = document.querySelector('.profile__add-button')
const newCardCloseBtn = newCardModal.querySelector('.popup__close')
const newCardForm = newCardModal.querySelector('#new-card-form')
const cardNameInput = newCardModal.querySelector('.popup__input_type_card-name')
const cardLinkInput = newCardModal.querySelector('.popup__input_type_url')

const imagePopupModal = document.querySelector('#image-popup')
const imagePopupCloseBtn = imagePopupModal.querySelector('.popup__close')
const imagePopup = imagePopupModal.querySelector('.popup__image')
const captionPopup = imagePopupModal.querySelector('.popup__caption')

function openModal(modal) {
  modal.classList.add('popup_is-opened')
}
function closeModal(modal) {
  modal.classList.remove('popup_is-opened')
  const form = modal.querySelector('form')
  if (form) {
    modal.querySelector('form').reset()
  }
  if (modal === newCardModal) {
    document.removeEventListener('keydown', newCardCloseKey)
    formValidatorNewCard.resetFormValidation()
  } else if (modal === profileEditModal) {
    document.removeEventListener('keydown', profileEditCloseKey)
    formValidatorEditProfile.resetFormValidation()
  }
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent
  jobInput.value = profileDescription.textContent
}
function handleOpenEditModal() {
  openModal(profileEditModal)
  fillProfileForm()
  document.addEventListener('keydown', profileEditCloseKey)
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault()
  profileTitle.textContent = nameInput.value
  profileDescription.textContent = jobInput.value
  closeModal(profileEditModal)
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault()
  const card = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }
  const newCardInstance = new Card(card, '#card-template')
  const newCard = newCardInstance.generateCard()
  cardsContainer.prepend(newCard)
  closeModal(newCardModal)
  document.addEventListener('keydown', newCardCloseKey)
}

function handleOpenNewCardModal() {
  openModal(newCardModal)
  document.addEventListener('keydown', newCardCloseKey)
}

function newCardCloseKey(e) {
  if (e.key === 'Escape') {
    closeModal(newCardModal)
  }
}

function profileEditCloseKey(e) {
  if (e.key === 'Escape') {
    closeModal(profileEditModal)
  }
}

profileEditOpenBtn.addEventListener('click', handleOpenEditModal)

profileEditCloseBtn.addEventListener('click', function () {
  closeModal(profileEditModal)
})

profileEditForm.addEventListener('submit', handleProfileFormSubmit)

initialCards.forEach(function (card) {
  const newCardInstance = new Card(card, '#card-template')
  const newCard = newCardInstance.generateCard()
  cardsContainer.prepend(newCard)
})

newCardOpenBtn.addEventListener('click', handleOpenNewCardModal)

newCardCloseBtn.addEventListener('click', function () {
  closeModal(newCardModal)
})
newCardForm.addEventListener('submit', handleNewCardFormSubmit)

profileEditModal.addEventListener('click', e => {
  if (
    e.target.classList.contains('popup') ||
    e.target.classList.contains('popup__close')
  ) {
    closeModal(profileEditModal)
  }
})

newCardModal.addEventListener('click', e => {
  if (
    e.target.classList.contains('popup') ||
    e.target.classList.contains('popup__close')
  ) {
    closeModal(newCardModal)
  }
})

function handleOpenImagePopup(name, link) {
  imagePopup.src = link
  imagePopup.alt = name
  captionPopup.textContent = name
  document.addEventListener('keydown', addImagePopupCloseKey)
  imagePopupModal.addEventListener('click', addImagePopupCloseClick)
  imagePopupCloseBtn.addEventListener('click', handleCloseImagePopup)
  openModal(imagePopupModal)
}

function handleCloseImagePopup() {
  closeModal(imagePopupModal)
  imagePopup.src = ''
  imagePopup.alt = ''
  captionPopup.textContent = ''
  document.removeEventListener('keydown', addImagePopupCloseKey)
  imagePopupModal.removeEventListener('click', addImagePopupCloseClick)
  imagePopupCloseBtn.removeEventListener('click', handleCloseImagePopup)
}

function addImagePopupCloseKey(e) {
  if (e.key === 'Escape') {
    handleCloseImagePopup()
  }
}
function addImagePopupCloseClick(e) {
  if (
    e.target.classList.contains('popup') ||
    e.target.classList.contains('popup__close')
  ) {
    handleCloseImagePopup()
  }
}

const formValidatorEditProfile = new FormValidator(
  {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.popup__input-error_active'
  },
  profileEditForm
)

formValidatorEditProfile.enableValidation()


const formValidatorNewCard = new FormValidator(
  {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.popup__input-error_active'
  },
  newCardForm
)
formValidatorNewCard.enableValidation()


export {
  profileEditModal,
  newCardModal,
  imagePopup,
  captionPopup,
  imagePopupModal,
  imagePopupCloseBtn,
  submitButtonNewCardModal,
  handleOpenImagePopup
}
