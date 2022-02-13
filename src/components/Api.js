export class Api {
  constructor({address, token}) {
    this._address = address;
    this._token = token;
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json()
    } 
      return Promise.reject(`Ошибка: ${res.status}`)
  };

  // User Info
  getUserInfoApi() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleResponse);
  }

  updateUserInfo(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._handleResponse);
  }

  // Cards
  getCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleResponse);
  }

  addCard(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleResponse)
}

}