import dayjs from "dayjs";

export const createFilmCardTemplate = (filmData) => {
  const {caption, poster, description, rating, duration, comments, releaseDate, genres} = filmData;
  const commentsCount = comments.length;
  const allGenres = genres.join(`,`);
  const creteYear = dayjs(releaseDate).format(`YYYY`);
  const formatedDuration = `${duration.h}h ${duration.m}m`;

  return `
    <article class="film-card">
      <h3 class="film-card__title">${caption}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${creteYear}</span>
        <span class="film-card__duration">${formatedDuration}</span>
        <span class="film-card__genre">${allGenres}</span>
      </p>
      <img src="${poster}" alt="${caption}" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article> `;
};
