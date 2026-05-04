// index.js
import Card from './card.js'
import { FormValidator } from './formValidator.js'
import { openModal, closeModal, handleOverlayClick } from './utils.js'
import Section from './Section.js'

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

const cardsContainerSelector = '.cards__list'

const profileEditModal = document.querySelector('#edit-popup')
const profileEditForm = profileEditModal.querySelector('#edit-profile-form')
const nameInput = profileEditModal.querySelector('.popup__input_type_name')
const jobInput = profileEditModal.querySelector(
  '.popup__input_type_description'
)
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileEditOpenBtn = document.querySelector('.profile__edit-button')

const newCardModal = document.querySelector('#new-card-popup')
const newCardForm = newCardModal.querySelector('#new-card-form')
const cardNameInput = newCardModal.querySelector('.popup__input_type_card-name')
const cardLinkInput = newCardModal.querySelector('.popup__input_type_url')
const newCardOpenBtn = document.querySelector('.profile__add-button')

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const formValidatorEditProfile = new FormValidator(
  validationConfig,
  profileEditForm
)
formValidatorEditProfile.enableValidation()

const formValidatorNewCard = new FormValidator(validationConfig, newCardForm)
formValidatorNewCard.enableValidation()

function fillProfileForm() {
  nameInput.value = profileTitle.textContent
  jobInput.value = profileDescription.textContent
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault()
  profileTitle.textContent = nameInput.value
  profileDescription.textContent = jobInput.value
  closeModal(profileEditModal)
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault()
  const cardData = [{ name: cardNameInput.value, link: cardLinkInput.value }]


  const sectionNewCard = new Section(
    {
      items: cardData,
      renderer: item => {
        const cardInstance = new Card(item, '#card-template')
        const card = cardInstance.generateCard()
        sectionNewCard.addItem(card)
      }
    },
    cardsContainerSelector
  )
  sectionNewCard.renderer()
  closeModal(newCardModal)
}

profileEditOpenBtn.addEventListener('click', () => {
  fillProfileForm()
  formValidatorEditProfile.resetFormValidation()
  openModal(profileEditModal)
})

newCardOpenBtn.addEventListener('click', () => {
  newCardForm.reset()
  formValidatorNewCard.resetFormValidation()
  openModal(newCardModal)
})

profileEditForm.addEventListener('submit', handleProfileFormSubmit)
newCardForm.addEventListener('submit', handleNewCardFormSubmit)

profileEditModal.addEventListener('click', handleOverlayClick)
newCardModal.addEventListener('click', handleOverlayClick)

const imagePopupModal = document.querySelector('#image-popup')
if (imagePopupModal) {
  imagePopupModal.addEventListener('click', handleOverlayClick)
}


const initialCardsList = new Section(
  {
    items: initialCards,
    renderer: item => {
      const cardInstance = new Card(item, '#card-template')
      const card = cardInstance.generateCard()
      initialCardsList.addItem(card)
    }
  },
  cardsContainerSelector
)
initialCardsList.renderer()
