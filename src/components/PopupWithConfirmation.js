import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    if (this._handleSubmitCallback) {
      this._handleSubmitCallback();
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._handleFormSubmit);
  }

  close() {
    super.close();
    this._popupForm.removeEventListener('submit', this._handleFormSubmit);
  }
}