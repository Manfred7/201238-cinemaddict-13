import {remove, render, RenderPosition} from "../utils/render";
import FilmsView from "../view/films";
import ShowMoreButtonView from "../view/show-more-button";
import FilmsTopRatedView from "../view/films-top-rated";
import FilmsMostCommentedView from "../view/films-most-commented";
import FilmsEmptyView from "../view/films-empty";
import Film from "../presenter/film";
import {updateItem} from "../utils/common";

const FILM_COUNT_PER_STEP = 5;
const FILMS_EXTRA_COUNT = 2;
// const body = document.querySelector(`body`);

export default class FilmList {
  constructor(container) {
    this._filmListContainer = container;

    this._filmPresenter = {};

    this._filmsEmptyView = new FilmsEmptyView();
    this._filmsView = new FilmsView();

    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(filmsData) {
    this._filmsData = filmsData.slice();
    if (this._filmsData.length === 0) {
      render(this._filmListContainer, this._filmsEmptyView, RenderPosition.BEFOREEND);
    } else {
      render(this._filmListContainer, this._filmsView, RenderPosition.BEFOREEND);
      this._films = document.querySelector(`.films`);
      this._filmList = this._films.querySelector(`.films-list`);
      this._filmsContainer = this._filmList.querySelector(`.films-list__container`);

      this._renderedFilmCount = 0;
      this._createFilms();
    }
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleFilmChange(updateFilmData) {
    this._filmsData = updateItem(this._filmsData, updateFilmData);
    this._filmPresenter[updateFilmData.id].init(updateFilmData);
  }

  _createFilms() {
    this._renderFirstStep();

    if (this._filmsData.length > this._renderedFilmCount) {
      this._initShowMore();
    }
  }

  _clearFilms() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);

  }

  _renderFilm(film) {
    const filmPresenter = new Film(this._filmsContainer, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilmsData(fromIndex, count) {
    this._filmsData
      .slice(fromIndex, fromIndex + count)
      .forEach((film) => this._renderFilm(film));

    this._renderedFilmCount += count;
  }

  _renderFirstStep() {
    this._renderFilmsData(this._renderedFilmCount, FILM_COUNT_PER_STEP);
  }

  _handleShowMoreButtonClick() {

    this._renderFilmsData(this._renderedFilmCount, FILM_COUNT_PER_STEP);

    if (this._renderedFilmCount >= this._filmsData.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _initShowMore() {

    render(this._filmList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setShowMoreHandler(this._handleShowMoreButtonClick);
  }


  renderExtraFilms() {
    render(this._films, new FilmsTopRatedView(), RenderPosition.BEFOREEND);
    render(this._films, new FilmsMostCommentedView(), RenderPosition.BEFOREEND);

    const filmExtraLists = document.querySelectorAll(`.films-list--extra`);

    const filmsTopRatedContainer = filmExtraLists[0].querySelector(`.films-list__container`);
    for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
      let filmPresenter = new Film(this._filmsContainer);
      render(filmsTopRatedContainer, filmPresenter.init(this._filmsData[i]), RenderPosition.BEFOREEND);
    }

    const filmsMostCommentedContainer = filmExtraLists[1].querySelector(`.films-list__container`);
    for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
      let filmPresenter = new Film(this._filmsContainer);
      render(filmsMostCommentedContainer, filmPresenter.init((this._filmsData[i]), RenderPosition.BEFOREEND));
    }
  }


}
