class Api {
    constructor({ baseUrl, headers }) {
        this._headers = headers
        this._baseUrl = baseUrl
    }

    _getResponseData(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    }
    
    getProfile() {
        
        return fetch(`https://${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._getResponseData)
        // .catch(console.log)
        // .then(res => res.ok ? res.json() : Promise.reject(res.status))
        // .catch(console.log)
    }

    getInitialCards() {
        return fetch(`https://mesto.${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(this._getResponseData)
        // .catch(console.log)
    }

    editProfile(name, about) {
        return fetch(`https://mesto.${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
              })
        })
        .then(this._getResponseData)
        // .catch(console.log)
    }

    addCard(name, link) {
        return fetch(`https://mesto.${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
              })
        })
        .then(this._getResponseData)
        // .catch(console.log)
    }


    deleteCard(id) {
        return fetch(`https://mesto.${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._getResponseData)
        // .catch(console.log)
    }

    deleteLike(id) {
        return fetch(`https://mesto.${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._getResponseData)
        // .catch(console.log)
    }
  
    addLike(id) {
        return fetch(`https://mesto.${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._getResponseData)
        // .catch(console.log)
    }

    updateAvatar(avatar, id) {
        return fetch(`https://mesto.${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ avatar })
        })
        .then(this._getResponseData)
        // .catch(console.log)
    }
  }
  
  export const api = new Api({
    baseUrl: 'nomoreparties.co/v1/cohort-47',
    headers: {
      authorization: 'f98f9cb4-e18b-46d2-a787-d3d5dad68294',
      'Content-Type': 'application/json'
    }
  }); 