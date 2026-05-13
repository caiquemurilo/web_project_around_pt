// index.js
import Card from './Card.js'
import { FormValidator } from './FormValidator.js'
import Section from './Section.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'

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


const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__description'
})



const editPopupFormInstance = new PopupWithForm(
  '#edit-popup',
  (evt) => {
    evt.preventDefault()
    const { name, description} = editPopupFormInstance._getInputValues()
    profileTitle.textContent = name
profileDescription.textContent = description
userInfo.setUserInfo({ name, description })
editPopupFormInstance.close()
  },
  () => formValidatorEditProfile.resetFormValidation()
)

profileEditOpenBtn.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo()
  nameInput.value = currentUserInfo.name
  jobInput.value = currentUserInfo.description
  editPopupFormInstance .open()
  
})

const cardSectionInstance = new Section(
  {
    items: initialCards,
    renderer: item => {
      const cardInstance = new Card(item, '#card-template')
      const card = cardInstance.generateCard()
      cardSectionInstance.addItem(card)
    }
  },
  cardsContainerSelector
)



const newCardPopupFormInstance = new PopupWithForm(
  '#new-card-popup',
  (evt) => {
    evt.preventDefault()
    const { 'place-name': placeName, link} = newCardPopupFormInstance._getInputValues()

      const cardInstance = new Card({name: placeName, link: link}, '#card-template')
      const cardElement = cardInstance.generateCard()
      cardSectionInstance.addItem(cardElement)

newCardPopupFormInstance.close()
  },
  () => formValidatorNewCard.resetFormValidation()
)

newCardOpenBtn.addEventListener('click', () => {
  newCardPopupFormInstance.open()
})

cardSectionInstance.renderer()