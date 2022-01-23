export class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector }) {
    this._profileTitleSelector = document.querySelector(profileTitleSelector);
    this._profileSubtitleSelector = document.querySelector(profileSubtitleSelector);
  }

  getUserInfo() {
    this._nameInput = document.querySelector('.form__input_type_name');
    this._jobInput = document.querySelector('.form__input_type_job');

    this._profileValues = {};

    this._profileValues[this._nameInput.value] = this._profileTitleSelector.textContent;
    this._profileValues[this._jobInput.value] = this._profileSubtitleSelector.textContent;

    return this._profileValues;
  }

  setUserInfo() {
    // this._userInfoForm = document.querySelector('.form_type_edit');

    // this._userInfoForm.addEventListener('submit', (evt) => {
    //   evt.preventDefault();

    //   this._profileTitleSelector.textContent = this._nameInput.value;
    //   this._profileSubtitleSelector.textContent = this._jobInput.value;
    // })
    this._profileTitleSelector.textContent = this._nameInput.value;
    this._profileSubtitleSelector.textContent = this._jobInput.value;
  }
}