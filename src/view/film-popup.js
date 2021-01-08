import dayjs from "dayjs";
import {createFilmCommentTemplate} from "./film_comment";
import AbstractView from "./abstract.js";


const createFilmPopupTemplate = (filmData) => {
  const {
    caption,
    poster,
    description,
    rating,
    duration,
    originalName,
    comments,
    country,
    releaseDate,
    genres,
    ageRating,
    director,
    screenwriters,
    cast
  } = filmData;

  const writers = screenwriters.join(`, `);
  const actors = cast.join(`, `);
  const formatedDuration = `${duration.h}h ${duration.m}m`;

  const createComments = (commentsData) => {
    let commentsTemplate = commentsData
      .map((item) => createFilmCommentTemplate(item))
      .join(``);

    return `<ul class="film-details__comments-list">${commentsTemplate} </ul>`;
  };

  const createGenres = (genresData) => {
    return genresData
      .map((item) => `<span class="film-details__genre">${item}</span>`)
      .join(``);
  };

  const allGenres = createGenres(genres);
  const releaseDateFormated = dayjs(releaseDate).format(`DD MMMM YYYY`);
  const commentsText = createComments(comments);

  return `<section class="film-details"> <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${caption}</h3>
              <p class="film-details__title-original">${originalName}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDateFormated}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${formatedDuration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
              ${allGenres}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
         ${commentsText}
        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmPopup extends AbstractView {
  constructor(filmData) {
    super();
    this._filmData = filmData;
    this._clickHandler = this._clickHandler.bind(this);

    this._addToWatchListHandler = this._addToWatchListHandler.bind(this);
    this._addToWatchedHandler = this._addToWatchedHandler.bind(this);
    this._addToFavoriteHandler = this._addToFavoriteHandler.bind(this);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClosePopupHandler(callback) {
    this._callback.click = callback;

    const closeBtn = this.getElement().querySelector(`.film-details__close`);
    closeBtn.addEventListener(`click`, this._clickHandler);
  }

  getTemplate() {
    return createFilmPopupTemplate(this._filmData);
  }

  _addToWatchListHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchListClick();
  }

  setAddToWatchListHandler(callback) {
    this._callback.addToWatchListClick = callback;
    const filmViewElement = this.getElement();
    const watchlistLabel = filmViewElement.querySelector(`.film-details__control-label--watchlist`);

    watchlistLabel.addEventListener(`click`, this._addToWatchListHandler);
  }

  _addToWatchedHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchedClick();
  }

  setAddToWatchedHandler(callback) {
    this._callback.addToWatchedClick = callback;
    const filmViewElement = this.getElement();
    const watchedLabel = filmViewElement.querySelector(`.film-details__control-label--watched`);

    watchedLabel.addEventListener(`click`, this._addToWatchedHandler);
  }

  _addToFavoriteHandler(evt) {
    evt.preventDefault();
    this._callback.addToFavoriteClick();
  }

  setAddToFavoriteHandler(callback) {
    this._callback.addToFavoriteClick = callback;
    const filmViewElement = this.getElement();
    const favoriteLabel = filmViewElement.querySelector(`.film-details__control-label--favorite`);

    favoriteLabel.addEventListener(`click`, this._addToFavoriteHandler);
  }

}

