import { json } from "react-router-dom";

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    const token=localStorage.getItem('token')
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers:{ authorization: `Bearer ${token}`,  
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
    }).then(this._checkResponse);
  }

  getCardInfo() {
    const token=localStorage.getItem('token')
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers:{ authorization: `Bearer ${token}`,  
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
    }).then(this._checkResponse);
  }

  editeProfile( name, about ) {
    const token=localStorage.getItem('token')
    return fetch(`${this._baseUrl}/users/me `, {
      method: "PATCH",
      headers:{ authorization: `Bearer ${token}`,  
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify(
        name,
        about,
      ),
    }).then(this._checkResponse);
  }

  editeAvatar({ avatar }) {
    const token=localStorage.getItem('token')
    return fetch(`${this._baseUrl}/users/me/avatar `, {
      method: "PATCH",
      headers:{ authorization: `Bearer ${token}`,  
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }

  handleAddCardApi({ name, link }) {
    const token=localStorage.getItem('token')
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers:{ authorization: `Bearer ${token}`,  
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    const token=localStorage.getItem('token')
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers:{ authorization: `Bearer ${token}`,  
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
    }).then(this._checkResponse);
  }

  toggleLike(cardId, isLiked) {
    const token=localStorage.getItem('token')
    if (!isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers:{ authorization: `Bearer ${token}`,  
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      })
      .then(this._checkResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._checkResponse);
    }
  }
}
export const api = new Api({
  baseUrl: "http://localhost:3000",
});
