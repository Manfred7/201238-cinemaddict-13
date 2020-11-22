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
import {getRandomInteger} from "./utils";
import {generateFilm} from "./mock/film";

const FILM_COUNT_PER_STEP = 5;
const FILMS_EXTRA_COUNT = 2;
const GENERATE_FILMS_COUNT_MIN = 15;
const GENERATE_FILMS_COUNT_MAX = 20;

const generateFilmsData = () => {
  let newFilms = [];
  const count = getRandomInteger(GENERATE_FILMS_COUNT_MIN, GENERATE_FILMS_COUNT_MAX);

  for (let i = 0; i < count - 1; i++) {
    newFilms.push(generateFilm());
  }
  return newFilms;
};

let filmsData = generateFilmsData();

const siteMainElement = document.querySelector(`.main`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderUserTitle = () => {
  const header = document.querySelector(`.header`);
  render(header, createUsersTitleTemplate(), `beforeend`);
};

const renderFooterStatistic = () => {
  const footerStatistics = document.querySelector(`.footer__statistics`);
  render(footerStatistics, createFooterStatisticsCardTemplate(), `beforeend`);
};

const renderStats = () => {
  renderUserTitle();

  render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
  render(siteMainElement, createStatsTemplate(), `beforeend`);

  renderFooterStatistic();
};

const renderListEmpty = () => {
  renderUserTitle();
  render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
  render(siteMainElement, createFilmsEmptyTemplate(), `beforeend`);

  renderFooterStatistic();
};

const createFilms = () => {
  const films = document.querySelector(`.films`);
  const filmList = films.querySelector(`.films-list`);
  const filmsContainer = filmList.querySelector(`.films-list__container`);

  for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
    render(filmsContainer, createFilmCardTemplate(filmsData[i]), `beforeend`);
  }

  if (filmsData.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;

    render(filmList, createShowMoreButtonTemplate(), `beforeend`);

    const loadMoreButton = filmList.querySelector(`.films-list__show-more`);

    loadMoreButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      filmsData
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => render(filmsContainer, createFilmCardTemplate(film), `beforeend`));

      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= filmsData.length) {
        loadMoreButton.remove();
      }
    });
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
  render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
  render(siteMainElement, createSortTemplate(), `beforeend`);
  render(siteMainElement, createFilmsTemplate(), `beforeend`);
  createFilms();
  renderFooterStatistic();
};

const renderPopup = () => {
  render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
  render(siteMainElement, createSortTemplate(), `beforeend`);
  render(siteMainElement, createFilmsTemplate(), `beforeend`);
  createFilms();
  renderFooterStatistic();
  render(siteMainElement, createFilmPopupTemplate(), `beforeend`);
};

window.main = {
  doRenderPopup: renderPopup, // отрисовка элементов как в popup.html
  doRenderListEmpty: renderListEmpty, // отрисовка как в list-empty.html
  doRenderList: renderList, // отрисовка основных элементов, как в list.html
  doRenderStats: renderStats // отрисовка статистики как в stats.html
};

window.main.doRenderList();


