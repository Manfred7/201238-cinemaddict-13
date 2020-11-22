export const createFilmCommentTemplate = () => {
  return `
<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/puke.png" width="55" height="55" alt="emoji-puke">
  </span>
  <div>
    <p class="film-details__comment-text">Very very old. Meh</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">John Doe</span>
      <span class="film-details__comment-day">2 days ago</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};
