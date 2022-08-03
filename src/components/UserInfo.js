export class UserInfo {
  constructor({
    profileNameSelector,
    profileJobSelector,
    profileAvatarSelector,
  }) {
    this._nameElement = document.querySelector(profileNameSelector);
    this._jobElement = document.querySelector(profileJobSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo(title, job, avatar) {
    if (title) this._nameElement.textContent = title;
    if (job) this._jobElement.textContent = job;
    if (avatar) this._avatar.src = avatar;
  }
}
