import AbstractView from "./abstract.js";

const createUsersTitleTemplate = (Userdata) => {
  const {profileAvatar, profileRating} = Userdata;
  return `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="${profileAvatar}" alt="Avatar" width="35" height="35">
    </section>`;
};


export default class UsersTitle extends AbstractView {
  constructor(userInfo) {
    super();
    this.userInfo = userInfo;
  }

  getTemplate() {
    return createUsersTitleTemplate(this.userInfo);
  }
}
