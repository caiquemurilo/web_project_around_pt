const imagePopupModal = document.querySelector('#image-popup')
const imagePopup = imagePopupModal.querySelector('.popup__image')
const captionPopup = imagePopupModal.querySelector('.popup__caption')


export function openModal(modal) {
  modal.classList.add('popup_is-opened')
  document.addEventListener('keydown', handleEscClose)
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', handleEscClose)
}

export function handleEscClose(e) {
  if (e.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened')
    if (openedModal) {
      closeModal(openedModal)
    }
  }
}

export function handleOverlayClick(e) {
  if (
    e.target.classList.contains('popup') ||
    e.target.classList.contains('popup__close')
  ) {
    closeModal(e.currentTarget)
  }
}


export function handleOpenImagePopup(name, link) {
  imagePopup.src = link
  imagePopup.alt = name
  captionPopup.textContent = name
  openModal(imagePopupModal)
}