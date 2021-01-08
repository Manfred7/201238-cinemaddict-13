import {getRandomInteger} from "./utils/common.js";
import {render, RenderPosition} from "./utils/render.js";
import SiteMenuView from "./view/site-menu.js";
import UsersTitleView from "./view/users-title.js";
import SortView from "./view/sort.js";
import FooterStatisticsCardView from "./view/footer-statistics";
import StatsView from "./view/stats";
import {generateFilm} from "./mock/film";
import {generateUserdata} from "./mock/user-data";
import FilmList from "./presenter/film-list";

const GENERATE_FILMS_COUNT_MIN = 15;
const GENERATE_FILMS_COUNT_MAX = 20;


const generateFilmsData = () => {
  const count = getRandomInteger(GENERATE_FILMS_COUNT_MIN, GENERATE_FILMS_COUNT_MAX);

  return Array(count).fill().map(generateFilm);
};

const filmsData = generateFilmsData();
const userinfo = generateUserdata(filmsData);

const siteMainElement = document.querySelector(`.main`);

const filmsPresenter = new FilmList(siteMainElement);


const renderUserTitle = () => {
  const header = document.querySelector(`.header`);
  render(header, new UsersTitleView(userinfo), RenderPosition.BEFOREEND);
};

const renderFooterStatistic = () => {
  const footerStatistics = document.querySelector(`.footer__statistics`);
  render(footerStatistics, new FooterStatisticsCardView(filmsData.length), RenderPosition.BEFOREEND);
};

const renderSort = () => render(siteMainElement, new SortView(), RenderPosition.BEFOREEND);

const renderFilters = () => {
  render(siteMainElement, new SiteMenuView(userinfo), RenderPosition.BEFOREEND);
};

const renderStats = () => {
  renderUserTitle();
  renderFilters();
  render(siteMainElement, new StatsView(userinfo), RenderPosition.BEFOREEND);

  renderFooterStatistic();
};


const renderList = () => {
  renderUserTitle();
  renderFilters();
  renderSort();

  filmsPresenter.init(filmsData);

  renderFooterStatistic();
};


window.main = {
  doRenderList: renderList, // отрисовка основных элементов, как в list.html
  doRenderStats: renderStats // отрисовка статистики как в stats.html
};

window.main.doRenderList();


