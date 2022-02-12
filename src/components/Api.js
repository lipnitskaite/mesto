export class Api {
  constructor({adress, token}) {
    this._adress = adress;
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
    return fetch(`${this._adress}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleResponse);
  }

  updateUserInfo(data) {
    return fetch(`${this._adress}/users/me`, {
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
    return fetch(`${this._adress}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleResponse);
  }

  addCard(data) {
    return fetch(`${this._adress}/cards`, {
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
}