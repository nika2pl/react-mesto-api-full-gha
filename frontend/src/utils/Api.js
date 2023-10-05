export default class Api {
  constructor(options) {
    this._url = options.baseUrl
    this._headers = options.headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(res.status);
  }

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      credentials: "include",
      headers: this._headers
    }).then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      credentials: "include",
      headers: this._headers
    }).then(this._checkResponse)
  }

  setUserInfo(data) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._checkResponse)
  }

  addCard(data) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(this._url + `/cards/${id}`, {
      method: 'DELETE',
      credentials: "include",
      headers: this._headers
    }).then(this._checkResponse)
  }

  changeLikeCardStatus(card, isLiked) {
    if (isLiked) {
      return this.like(card);
    } else {
      return this.dislike(card);
    }
  }

  like(id) {
    return fetch(this._url + `/cards/likes/${id}`, {
      method: 'PUT',
      credentials: "include",
      headers: this._headers
    }).then(this._checkResponse)
  }

  dislike(id) {
    return fetch(this._url + `/cards/likes/${id}`, {
      method: 'DELETE',
      credentials: "include",
      headers: this._headers
    }).then(this._checkResponse)
  }

  changeAvatar(data) {
    return fetch(this._url + `/users/me/avatar`, {
      method: 'PATCH',
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._checkResponse)
  }

}
