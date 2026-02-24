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
}
function fillProfileForm() {
  nameInput.value = profileTitle.textContent
  jobInput.value = profileDescription.textContent
}
function handleOpenEditModal() {
  openModal(profileEditModal)
  fillProfileForm()
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault()
  profileTitle.textContent = nameInput.value
  profileDescription.textContent = jobInput.value
  closeModal(profileEditModal)
}

profileEditOpenBtn.addEventListener('click', handleOpenEditModal)

profileEditCloseBtn.addEventListener('click', function () {
  closeModal(profileEditModal)
})

profileEditForm.addEventListener('submit', handleProfileFormSubmit)

function getCardElement(
  name = 'Lugar sem nome',
  link = './images/placeholder.jpg'
) {
  const cardTemplate = document
    .querySelector('#card-template')
    .content.querySelector('.card')
  const cardElement = cardTemplate.cloneNode(true)
  const cardTitle = cardElement.querySelector('.card__title')
  const cardImage = cardElement.querySelector('.card__image')
  cardTitle.textContent = name
  cardImage.alt = name
  cardImage.src = link

  const likeBtn = cardElement.querySelector('.card__like-button')
  likeBtn.addEventListener('click', function (evt) {
    evt.currentTarget.classList.toggle('card__like-button_is-active')
  })

  const deleteCardBtn = cardElement.querySelector('.card__delete-button')
  deleteCardBtn.addEventListener('click', function (evt) {
    evt.currentTarget.closest('.card').remove()
  })

  cardImage.addEventListener('click', function () {
    imagePopup.src = link
    imagePopup.alt = name
    captionPopup.textContent = name
    openModal(imagePopupModal)
  })

  return cardElement
}
imagePopupCloseBtn.addEventListener('click', function () {
  closeModal(imagePopupModal)
})

function renderCard(name, link, container) {
  container.append(getCardElement(name, link))
}

initialCards.forEach(function (card) {
  // console.log(card)
  renderCard(card.name, card.link, cardsContainer)
})

function handleNewCardFormSubmit(evt) {
  evt.preventDefault()
  cardsContainer.prepend(
    getCardElement(cardNameInput.value, cardLinkInput.value)
  )
  closeModal(newCardModal)
}

function handleOpenNewCardModal() {
  openModal(newCardModal)
}

newCardOpenBtn.addEventListener('click', handleOpenNewCardModal)

newCardCloseBtn.addEventListener('click', function () {
  closeModal(newCardModal)
})
newCardForm.addEventListener('submit', handleNewCardFormSubmit)
