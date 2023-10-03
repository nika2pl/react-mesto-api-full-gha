export default class ApiAuth {
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
    
    signIn(data) {
      return fetch(this._url + `/signin`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data)
      }).then(this._checkResponse)
    }
  
    signUp(data) {
      return fetch(this._url + `/signup`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data)
      }).then(this._checkResponse)
    }
  
    checkToken(token) {
      return fetch(this._url + `/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }).then(this._checkResponse)
    }
  }
  