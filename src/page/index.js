import Api from '../components/Api.js'
import Card from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from '../components/PopupWithImage.js'

const api = new Api({
  baseUrl: 'https://around-api.pt-br.tripleten-services.com/v1',
  headers: {
    authorization: 'bc827ff1-488a-414b-a998-e3daaf72ac0b',
    'Content-Type': 'application/json'
  }
})
/*    {
    "name": "Jacques Cousteau",
    "about": "Explorador",
    "avatar": "https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg",
    "_id": "bd22d2324d371a4a45b9dc66"
}  */

/* api.getInitialData()
.then(([userData, initialCards])=> {

  initialCards.forEach(card => {
    console.log(card)
  })
// saída userData this.getUser() 
// userData.name
// userData.about
// passar essas chaves de userData para o método correto que renderiza esses dados no DOM
// saída initialCards this.getInitialCards()
})
.catch(err => {

})
 */

let userData = null
let initialCards = []

try {
  ;[userData, initialCards] = await api.getInitialData()
} catch (err) {
  console.error(`Erro ao carregar dados da API: ${err}`)
}

const cardsContainerSelector = '.cards__list'

const profileEditModal = document.querySelector('#edit-popup')
const profileEditForm = profileEditModal.querySelector('#edit-profile-form')
const nameInput = profileEditModal.querySelector('.popup__input_type_name')
const jobInput = profileEditModal.querySelector(
  '.popup__input_type_description'
)
/* const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description') */
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

if (userData) {
  userInfo.setUserInfo({
    name: userData.name,
    description: userData.about
  })
}

const editPopupFormInstance = new PopupWithForm(
  '#edit-popup',
  evt => {
    evt.preventDefault()
    const { name, description } = editPopupFormInstance._getInputValues()
    userInfo.setUserInfo({ name, description })
    editPopupFormInstance.close()
  },
  () => formValidatorEditProfile.resetFormValidation()
)

profileEditOpenBtn.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo()
  nameInput.value = currentUserInfo.name
  jobInput.value = currentUserInfo.description
  editPopupFormInstance.open()
})
const popupImageInstance = new PopupWithImage('#image-popup')

const cardSectionInstance = new Section(
  {
    items: initialCards,
    renderer: item => {
      const cardInstance = new Card(item, '#card-template', () => {
        popupImageInstance.open(item.name, item.link)
      })
      const card = cardInstance.generateCard()
      cardSectionInstance.addItem(card)
    }
  },
  cardsContainerSelector
)

const newCardPopupFormInstance = new PopupWithForm(
  '#new-card-popup',
  evt => {
    evt.preventDefault()
    const { 'place-name': placeName, link } =
      newCardPopupFormInstance._getInputValues()

    const cardInstance = new Card(
      { name: placeName, link: link },
      '#card-template',
      () => {
        popupImageInstance.open(placeName, link)
      }
    )
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
