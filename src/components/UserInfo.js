export class UserInfo {
    constructor({profileNameSelector, profileJobSelector, profileAvatarSelector}) { //add !!!!!!!!! profileAvatarSelector
        this._nameElement = document.querySelector(profileNameSelector)
        this._jobElement = document.querySelector(profileJobSelector)
        //this._avatar = document.querySelector(profileAvatarSelector) //add !!!!!!!!! this._avatar = document.querySelector(profileAvatarSelector)
    }

    getUserInfo()  {
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent,
            //avatar: this.this._avatar.src
        }
    }

    setUserInfo(title, job, avatar) { //add !!!!!!!!! avatar
        this._nameElement.textContent = title
        this._jobElement.textContent = job
        //console.log('src', this._avatar)
        //this._avatar.src = avatar // Popup avatar 
      
        // avatar put in src
    }
}
