import Api from '../components/Api.js'
import Card from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'

const profileAvatarContainer = document.querySelector('.profile__avatar')
const profileAvatarImage = document.querySelector('.profile__image')

const api = new Api({
  baseUrl: 'https://around-api.pt-br.tripleten-services.com/v1',
  headers: {
    authorization: 'bc827ff1-488a-414b-a998-e3daaf72ac0b',
    'Content-Type': 'application/json'
  }
})

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

const avatarFormValidator = new FormValidator(
  validationConfig,
  document.querySelector('#set-avatar-form')
)
avatarFormValidator.enableValidation()

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__description'
})

if (userData) {
  userInfo.setUserInfo({
    name: userData.name,
    description: userData.about
  })
  profileAvatarImage.src = userData.avatar
}

const editPopupFormInstance = new PopupWithForm(
  '#edit-popup',
  evt => {

    evt.preventDefault()
    editPopupFormInstance.renderLoading(true)
    const { name, description } = editPopupFormInstance._getInputValues()
    api
      .setUserInfo({ name, about: description })
      .then(updatedUserData => {
        userInfo.setUserInfo({
          name: updatedUserData.name,
          description: updatedUserData.about
        })
        editPopupFormInstance.close()
      })
      .catch(err => {
        console.log(`Erro ao atualizar o perfil: ${err}`)
      })
      .finally(() => {
        editPopupFormInstance.renderLoading(false)
      })
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
const deleteCardPopupInstance = new PopupWithConfirmation('#delete-card-popup')
deleteCardPopupInstance.setEventListeners()

const cardSectionInstance = new Section(
  {
    items: initialCards,
    renderer: item => {
      const cardInstance = new Card(
        item,
        '#card-template',
        () => {
          popupImageInstance.open(item.name, item.link)
        },
        () => {
          deleteCardPopupInstance.setSubmitAction(() => {
            api
              .deleteCard(item)
              .then(() => {
                cardInstance.removeCard()
                deleteCardPopupInstance.close()
              })
              .catch(err => console.log(`Erro ao deletar o cartão: ${err}`))
          })
          deleteCardPopupInstance.open()
        },
        () => {
          if (cardInstance.isLiked()) {
            api
              .removeLike(item)
              .then(updatedCard => {
                cardInstance.updateLikeState(updatedCard.isLiked)
              })
              .catch(err => console.log(`Erro ao remover curtida: ${err}`))
          } else {
            api
              .addLike(item)
              .then(updatedCard => {
                cardInstance.updateLikeState(updatedCard.isLiked)
              })
              .catch(err => console.log(`Erro ao adicionar curtida: ${err}`))
          }
        }
      )
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
    newCardPopupFormInstance.renderLoading(true)
    const { 'place-name': placeName, link } =
      newCardPopupFormInstance._getInputValues()

    api
      .createCard({ name: placeName, link })
      .then(newCardData => {
        const cardInstance = new Card(
          newCardData,
          '#card-template',
          () => {
            popupImageInstance.open(newCardData.name, newCardData.link)
          },
          () => {
            deleteCardPopupInstance.setSubmitAction(() => {
              api
                .deleteCard(newCardData)
                .then(() => {
                  cardInstance.removeCard()
                  deleteCardPopupInstance.close()
                })
                .catch(err => console.log(`Erro ao deletar o cartão: ${err}`))

            })
            deleteCardPopupInstance.open()
          },

          () => {
            if (cardInstance.isLiked()) {
              api
                .removeLike(newCardData)
                .then(updatedCard => {
                  cardInstance.updateLikeState(updatedCard.isLiked)
                })
                .catch(err => console.log(`Erro ao remover curtida: ${err}`))
            } else {
              api
                .addLike(newCardData)
                .then(updatedCard => {
                  cardInstance.updateLikeState(updatedCard.isLiked)
                })
                .catch(err => console.log(`Erro ao adicionar curtida: ${err}`))
            }
          }
        )
        const cardElement = cardInstance.generateCard()
        cardSectionInstance.addItem(cardElement)

        newCardPopupFormInstance.close()
      })
      .catch(err => {
        console.log(`Erro ao criar cartão: ${err}`)
      })
      .finally(() => {
        newCardPopupFormInstance.renderLoading(false)
      })
  },
  () => formValidatorNewCard.resetFormValidation()
)

const setAvatarPopupFormInstance = new PopupWithForm(
  '#set-avatar-popup',
  evt => {
    evt.preventDefault()
    setAvatarPopupFormInstance.renderLoading(true)
    const { avatar } = setAvatarPopupFormInstance._getInputValues()

    api
      .setUserAvatar({ avatar })
      .then(updatedUserData => {
        profileAvatarImage.src = updatedUserData.avatar
        setAvatarPopupFormInstance.close()
      })
      .catch(err => {
        console.log(`Erro ao atualizar a foto de perfil: ${err}`)
      })
      .finally(() => {
        setAvatarPopupFormInstance.renderLoading(false)
      })
  },

  () => avatarFormValidator.resetFormValidation() 
)
setAvatarPopupFormInstance.setEventListeners()

newCardOpenBtn.addEventListener('click', () => {
  newCardPopupFormInstance.open()
})

profileAvatarContainer.addEventListener('click', () => {
  setAvatarPopupFormInstance.open()
})
cardSectionInstance.renderer()
