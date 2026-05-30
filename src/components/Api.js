export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  getInitialData() {
    return Promise.all([this.getUser(), this.getInitialCards()])
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then(this._checkResponse)
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    }).then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(this._checkResponse)
  }

createCard({name, link}) {
return fetch(`${this._baseUrl}/cards/`, {
  method: 'POST',
  headers: this._headers,
  body: JSON.stringify({
    name,
    link
  })
}).then(this._checkResponse)
}

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

}