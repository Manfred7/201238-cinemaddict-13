import {getRandomInteger} from "./utils/common.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import SiteMenuView from "./view/site-menu.js";
import FilmCardView from "./view/film-card.js";
import FilmPopupView from "./view/film-popup.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import UsersTitleView from "./view/users-title.js";
import SortView from "./view/sort.js";
import FilmsView from "./view/films.js";
import FooterStatisticsCardView from "./view/footer-statistics";
import FilmsTopRatedView from "./view/films-top-rated";
import FilmsMostCommentedView from "./view/films-most-commented";
import StatsView from "./view/stats";
import FilmsEmptyView from "./view/films-empty";
import {generateFilm} from "./mock/film";
import {generateUserdata} from "./mock/user-data";

const FILM_COUNT_PER_STEP = 5;
const FILMS_EXTRA_COUNT = 2;
const GENERATE_FILMS_COUNT_MIN = 15;
const GENERATE_FILMS_COUNT_MAX = 20;

const body = document.querySelector(`body`);

const generateFilmsData = () => {
  const count = getRandomInteger(GENERATE_FILMS_COUNT_MIN, GENERATE_FILMS_COUNT_MAX);

  return Array(count).fill().map(generateFilm);
};

const filmsData = generateFilmsData();
const userinfo = generateUserdata(filmsData);

const siteMainElement = document.querySelector(`.main`);

const renderUserTitle = () => {
  const header = document.querySelector(`.header`);
  render(header, new UsersTitleView(userinfo), RenderPosition.BEFOREEND);
};

const renderFooterStatistic = () => {
  const footerStatistics = document.querySelector(`.footer__statistics`);
  render(footerStatistics, new FooterStatisticsCardView(filmsData.length), RenderPosition.BEFOREEND);
};

const renderSort = () => render(siteMainElement, new SortView(), RenderPosition.BEFOREEND);

const renderFilmsView = () => render(siteMainElement, new FilmsView(), RenderPosition.BEFOREEND);

const getNewPopupElement = (filmInfo) => {
  const popupView = new FilmPopupView(filmInfo);
  const popupElement = popupView.getElement();

  const onPressClose = () => {

    body.classList.remove(`hide-overflow`);
    siteMainElement.removeChild(popupElement);
    popupView.removeElement();
  };

  popupView.setClosePopupHandler(onPressClose);

  return popupElement;
};

const renderFilters = () => {
  render(siteMainElement, new SiteMenuView(userinfo), RenderPosition.BEFOREEND);
};

const renderStats = () => {
  renderUserTitle();
  renderFilters();
  render(siteMainElement, new StatsView(userinfo), RenderPosition.BEFOREEND);

  renderFooterStatistic();
};

const renderListEmpty = () => {
  renderUserTitle();
  renderFilters();
  render(siteMainElement, new FilmsEmptyView(), RenderPosition.BEFOREEND);

  renderFooterStatistic();
};

const getNewFilmCardViewElement = (filmInfo) => {
  const filmView = new FilmCardView(filmInfo);
  const filmViewElement = filmView.getElement();

  const onShowPopup = () => {
    body.classList.add(`hide-overflow`);
    siteMainElement.appendChild(getNewPopupElement(filmInfo));
  };

  filmView.setShowPopupHandler(onShowPopup);

  return filmViewElement;
};

const createFilms = () => {
  const films = document.querySelector(`.films`);
  const filmList = films.querySelector(`.films-list`);
  const filmsContainer = filmList.querySelector(`.films-list__container`);

  let renderedFilmCount = 0;

  const renderFilmsData = (fromIndex, count) => {
    filmsData
      .slice(fromIndex, fromIndex + count)
      .forEach((film) => render(filmsContainer, getNewFilmCardViewElement(film), RenderPosition.BEFOREEND));

    renderedFilmCount += count;
  };

  const renderFirstStep = () => {
    renderFilmsData(renderedFilmCount, FILM_COUNT_PER_STEP);
  };

  const initShowMore = () => {
    const showMoreButtonView = new ShowMoreButtonView();
    render(filmList, showMoreButtonView, RenderPosition.BEFOREEND);

    const onLoadMore = () => {

      renderFilmsData(renderedFilmCount, FILM_COUNT_PER_STEP);

      if (renderedFilmCount >= filmsData.length) {
        remove(showMoreButtonView);
      }
    };

    showMoreButtonView.setShowMoreHandler(onLoadMore);
  };

  renderFirstStep();

  if (filmsData.length > renderedFilmCount) {
    initShowMore();
  }

  render(films, new FilmsTopRatedView(), RenderPosition.BEFOREEND);
  render(films, new FilmsMostCommentedView(), RenderPosition.BEFOREEND);

  const filmExtraLists = document.querySelectorAll(`.films-list--extra`);

  const filmsTopRatedContainer = filmExtraLists[0].querySelector(`.films-list__container`);
  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    render(filmsTopRatedContainer, getNewFilmCardViewElement(filmsData[i]), RenderPosition.BEFOREEND);
  }

  const filmsMostCommentedContainer = filmExtraLists[1].querySelector(`.films-list__container`);
  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    render(filmsMostCommentedContainer, getNewFilmCardViewElement(filmsData[i]), RenderPosition.BEFOREEND);
  }
};

const renderList = () => {
  renderUserTitle();
  renderFilters();
  renderSort();
  renderFilmsView();
  createFilms();
  renderFooterStatistic();
};

window.main = {

  doRenderListEmpty: renderListEmpty, // отрисовка как в list-empty.html
  doRenderList: renderList, // отрисовка основных элементов, как в list.html
  doRenderStats: renderStats // отрисовка статистики как в stats.html
};

window.main.doRenderList();


