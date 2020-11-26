import {getRandomInteger} from "./utils.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createFilmPopupTemplate} from "./view/film-popup.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createUsersTitleTemplate} from "./view/users-title.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsTemplate} from "./view/films.js";
import {createFooterStatisticsCardTemplate} from "./view/footer-statistics";
import {createFilmsTopRatedTemplate} from "./view/films-top-rated";
import {createFilmsMostCommentedTemplate} from "./view/films-most-commented";
import {createStatsTemplate} from "./view/stats";
import {createFilmsEmptyTemplate} from "./view/films-empty";
import {generateFilm} from "./mock/film";
import {generateUserdata} from "./mock/user-data";

const FILM_COUNT_PER_STEP = 5;
const FILMS_EXTRA_COUNT = 2;
const GENERATE_FILMS_COUNT_MIN = 15;
const GENERATE_FILMS_COUNT_MAX = 20;

const generateFilmsData = () => {
  const count = getRandomInteger(GENERATE_FILMS_COUNT_MIN, GENERATE_FILMS_COUNT_MAX);

  return Array(count).fill().map(generateFilm);
};

let filmsData = generateFilmsData();
const userinfo = generateUserdata(filmsData);

const siteMainElement = document.querySelector(`.main`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderUserTitle = () => {
  const header = document.querySelector(`.header`);
  render(header, createUsersTitleTemplate(userinfo), `beforeend`);
};

const renderFooterStatistic = () => {
  const footerStatistics = document.querySelector(`.footer__statistics`);
  render(footerStatistics, createFooterStatisticsCardTemplate(filmsData.length), `beforeend`);
};

const createFilters = () => {
  render(siteMainElement, createSiteMenuTemplate(userinfo), `beforeend`);
};

const renderStats = () => {
  renderUserTitle();

  createFilters();
  render(siteMainElement, createStatsTemplate(userinfo), `beforeend`);

  renderFooterStatistic();
};

const renderListEmpty = () => {
  renderUserTitle();
  createFilters();
  render(siteMainElement, createFilmsEmptyTemplate(), `beforeend`);

  renderFooterStatistic();
};

const createFilms = () => {
  const films = document.querySelector(`.films`);
  const filmList = films.querySelector(`.films-list`);
  const filmsContainer = filmList.querySelector(`.films-list__container`);

  let renderedFilmCount = 0;

  const renderFilmsData = (fromIndex, count) => {
    filmsData
      .slice(fromIndex, fromIndex + count)
      .forEach((film) => render(filmsContainer, createFilmCardTemplate(film), `beforeend`));

    renderedFilmCount += count;
  };

  const renderFirstStep = () => {
    renderFilmsData(renderedFilmCount, FILM_COUNT_PER_STEP);
  };

  const initShowMore = () => {
    render(filmList, createShowMoreButtonTemplate(), `beforeend`);

    const loadMoreButton = filmList.querySelector(`.films-list__show-more`);

    const OnLoadMore = (evt) => {
      evt.preventDefault();

      renderFilmsData(renderedFilmCount, FILM_COUNT_PER_STEP);

      if (renderedFilmCount >= filmsData.length) {
        loadMoreButton.remove();
      }
    };

    loadMoreButton.addEventListener(`click`, OnLoadMore);
  };

  renderFirstStep();

  if (filmsData.length > renderedFilmCount) {
    initShowMore();
  }

  render(films, createFilmsTopRatedTemplate(), `beforeend`);
  render(films, createFilmsMostCommentedTemplate(), `beforeend`);

  const filmExtraLists = document.querySelectorAll(`.films-list--extra`);

  const filmsTopRatedContainer = filmExtraLists[0].querySelector(`.films-list__container`);
  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    render(filmsTopRatedContainer, createFilmCardTemplate(filmsData[i]), `beforeend`);
  }

  const filmsMostCommentedContainer = filmExtraLists[1].querySelector(`.films-list__container`);
  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    render(filmsMostCommentedContainer, createFilmCardTemplate(filmsData[i]), `beforeend`);
  }
};

const renderList = () => {
  renderUserTitle();
  createFilters();
  render(siteMainElement, createSortTemplate(), `beforeend`);
  render(siteMainElement, createFilmsTemplate(), `beforeend`);
  createFilms();
  renderFooterStatistic();
};

const renderPopup = () => {
  createFilters();
  render(siteMainElement, createSortTemplate(), `beforeend`);
  render(siteMainElement, createFilmsTemplate(), `beforeend`);
  createFilms();
  renderFooterStatistic();
  render(siteMainElement, createFilmPopupTemplate(filmsData[0]), `beforeend`);
};

window.main = {
  doRenderPopup: renderPopup, // отрисовка элементов как в popup.html
  doRenderListEmpty: renderListEmpty, // отрисовка как в list-empty.html
  doRenderList: renderList, // отрисовка основных элементов, как в list.html
  doRenderStats: renderStats // отрисовка статистики как в stats.html
};

window.main.doRenderPopup();


