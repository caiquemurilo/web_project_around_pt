const initialCards = [
  {
    name: 'Vale de Yosemite',
    link: '"https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg'
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

initialCards.forEach(function (card) {
  console.log(card)
})

const profileEditModal = document.querySelector('#edit-popup')
const profileEditOpenBtn = document.querySelector('.profile__edit-button')
const profileEditCloseBtn = profileEditModal.querySelector('.popup__close')
// const profileEditSaveBtn = profileEditModal.querySelector('.popup__button')
const profileEditForm = profileEditModal.querySelector('#edit-profile-form')
const nameInput = profileEditModal.querySelector('.popup__input_type_name')
const jobInput = profileEditModal.querySelector('.popup__input_type_description')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

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

profileEditOpenBtn.addEventListener('click', function () {
  handleOpenEditModal()
})

profileEditCloseBtn.addEventListener('click', function () {
  closeModal(profileEditModal)
})

profileEditForm.addEventListener('submit', handleProfileFormSubmit)
