export class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector, profileAvatarSelector }) {
    this._profileTitle = document.querySelector(profileTitleSelector);
    this._profileSubtitle = document.querySelector(profileSubtitleSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      about: this._profileSubtitle.textContent,
    }
  }

  setUserInfo(newName, newAbout, newAvatar) {
    this._profileTitle.textContent = newName;
    this._profileSubtitle.textContent = newAbout;
    this._profileAvatar.src = newAvatar;
  }
}