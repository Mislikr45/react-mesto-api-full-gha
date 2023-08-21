
export default class Api {
  constructor({ url, headers }) {
    this._baseUrl = url;
    this._headers = headers;
  }


  

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Authorization : `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        'Accept': 'application/json',
      }
    }).then(this._checkResponse);
  }

  getCardInfo() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        Authorization : `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        'Accept': 'application/json',
      }
    }).then(this._checkResponse);
  }

  editeProfile( name, about ) {
    return fetch(`${this._baseUrl}/users/me `, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(
        name,
        about,
      ),
    }).then(this._checkResponse);
  }

  editeAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar `, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }

  handleAddCardApi({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addLike(cardId) {
     return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      })
      .then(this._checkResponse);
    }
  


deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkResponse);
}
}

export const api = new Api({
  url: "https://api.mislikr45.nomoreparties.co",
  headers: {
    Authorization : `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
    'Accept': 'application/json',
  }
});
