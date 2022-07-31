class Api {
    constructor({ baseUrl, headers }) {
        this._headers = headers
        this._baseUrl = baseUrl
      // тело конструктора
    }
    
    getProfile() {
        
        return fetch(`https://${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(console.log)
        
    }

    getInitialCards() {
        return fetch(`https://mesto.${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(console.log)
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
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(console.log)
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
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(console.log)
    }


    deleteCard(id) {
        return fetch(`https://mesto.${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(console.log)
    }

    deleteLike(id) {
        return fetch(`https://mesto.${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(console.log)
    }
  
    addLike(id) {
        return fetch(`https://mesto.${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(console.log)
    }

    updateAvatar(id) {
        return fetch(`https://mesto.${this._baseUrl}/cards/${id}/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
              })
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(console.log)
    }
  
    // другие методы работы с API
    //PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar 
  }
  
  export const api = new Api({
    baseUrl: 'nomoreparties.co/v1/cohort-47',
    headers: {
      authorization: 'f98f9cb4-e18b-46d2-a787-d3d5dad68294',
      'Content-Type': 'application/json'
    }
  }); 