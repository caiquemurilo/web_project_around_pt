export default class UserInfo {
  // Recebe um objeto com os seletores do nome e da profissão
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector)
    this._jobElement = document.querySelector(jobSelector)
  }

  // Retorna os dados atuais da página (útil para preencher o popup ao abrir)
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._jobElement.textContent
    }
  }

  // Recebe os novos dados e injeta no DOM da página
  setUserInfo({ name, description }) {
    this._nameElement.textContent = name
    this._jobElement.textContent = description
  }
}