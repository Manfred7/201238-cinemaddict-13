import {getRandomInteger} from "./utils.js";
import {render, RenderPosition} from "./utils.js";
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
  render(header, new UsersTitleView(userinfo).getElement(), RenderPosition.BEFOREEND);
};

const renderFooterStatistic = () => {
  const footerStatistics = document.querySelector(`.footer__statistics`);
  render(footerStatistics, new FooterStatisticsCardView(filmsData.length).getElement(), RenderPosition.BEFOREEND);
};

const renderSort = () => render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

const renderFilmsView = () => render(siteMainElement, new FilmsView().getElement(), RenderPosition.BEFOREEND);

const getNewPopupElement = (filmInfo) => {
  const popupView = new FilmPopupView(filmInfo);
  const popupElement = popupView.getElement();
  const closeBtn = popupElement.querySelector(`.film-details__close`);

  const onPressClose = () => {
    body.classList.remove(`hide-overflow`);
    siteMainElement.removeChild(popupElement);
    popupView.removeElement();
  };

  closeBtn.addEventListener(`click`, onPressClose);

  return popupElement;
};

const renderFilters = () => {
  render(siteMainElement, new SiteMenuView(userinfo).getElement(), RenderPosition.BEFOREEND);
};

const renderStats = () => {
  renderUserTitle();
  renderFilters();
  render(siteMainElement, new StatsView(userinfo).getElement(), RenderPosition.BEFOREEND);

  renderFooterStatistic();
};

const renderListEmpty = () => {
  renderUserTitle();
  renderFilters();
  render(siteMainElement, new FilmsEmptyView().getElement(), RenderPosition.BEFOREEND);

  renderFooterStatistic();
};

const getNewFilmCardViewElement = (filmInfo) => {
  const filmViewElement = new FilmCardView(filmInfo).getElement();

  const filmsTitles = filmViewElement.querySelector(`.film-card__title`);
  const filmsPosters = filmViewElement.querySelector(`img`);
  const filmsComments = filmViewElement.querySelector(`.film-card__comments`);

  const OnShowPopup = () => {
    body.classList.add(`hide-overflow`);
    siteMainElement.appendChild(getNewPopupElement(filmInfo));
  };

  filmsTitles.addEventListener(`click`, OnShowPopup);
  filmsPosters.addEventListener(`click`, OnShowPopup);
  filmsComments.addEventListener(`click`, OnShowPopup);

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
    render(filmList, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

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

  render(films, new FilmsTopRatedView().getElement(), RenderPosition.BEFOREEND);
  render(films, new FilmsMostCommentedView().getElement(), RenderPosition.BEFOREEND);

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


