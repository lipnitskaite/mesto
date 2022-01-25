export class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector }) {
    this._profileTitle = document.querySelector(profileTitleSelector);
    this._profileSubtitle = document.querySelector(profileSubtitleSelector);
  }

  getUserInfo() {
    return {
      userName: this._profileTitle.textContent,
      userJob: this._profileSubtitle.textContent
    }
  }

  setUserInfo(name, job) {
    this._profileTitle.textContent = name;
    this._profileSubtitle.textContent = job;
  }
}