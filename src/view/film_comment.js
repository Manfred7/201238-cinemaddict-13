import dayjs from "dayjs";

export const createFilmCommentTemplate = (commentdata) => {
  const {emoji, author, day, text} = commentdata;
  const dayFormated = dayjs(day).format(`YYYY/MM/DD hh:mm`);
  return `
<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="${emoji}" width="55" height="55" alt="emoji-puke">
  </span>
  <div>
    <p class="film-details__comment-text">${text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${dayFormated}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};
