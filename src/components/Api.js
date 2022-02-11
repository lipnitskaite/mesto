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

  // Return User Info
  getUserInfoApi() {
    return fetch(`${this._adress}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleResponse);
  }

  // Update User Info
  updateUserInfo(name, about) {
    return fetch(`${this._adress}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._handleResponse);
  }

  // Return Cards
  getCards() {
    return fetch(`${this._adress}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleResponse);

  }
}