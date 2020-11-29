export const createUsersTitleTemplate = (Userdata) => {
  const {profileAvatar, profileRating} = Userdata;
  return `
    <section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="${profileAvatar}" alt="Avatar" width="35" height="35">
    </section>`;
};


