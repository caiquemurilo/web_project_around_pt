import Popup from './Popup.js'
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubit) {
    super(popupSelector)
    this._handleFormSubit = handleFormSubit // callback function submit form
  }
  _getInputValues() {
    // coleta dados de todos os campos de entrada
  }
  setEventListeners() {
    super.setEventListeners();
// adicionar o manipulador de eventos Submit ao formulário e o ouvinte de eventos click para o ícone de fechamento.
  }
  close() {
    super.close()
    // Modificar o método pai close() para redefinir o formulário assim que o pop-up for fechado.
  }

}

// OBSSSSSS Criar uma instância da classe PopupWithForm para cada pop-up, provavelmente lá no index