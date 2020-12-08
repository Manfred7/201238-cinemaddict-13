import {createElement} from "../utils";

const createUsersTitleTemplate = (Userdata) => {
  const {profileAvatar, profileRating} = Userdata;
  return `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="${profileAvatar}" alt="Avatar" width="35" height="35">
    </section>`;
};


export default class UsersTitle {
  constructor(userInfo) {
    this.userInfo = userInfo;
    this._element = null;
  }

  getTemplate() {
    return createUsersTitleTemplate(this.userInfo);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
