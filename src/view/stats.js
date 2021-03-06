import AbstractView from "./abstract.js";

const createStatsTemplate = (userData) => {
  const {profileAvatar, profileRating, historyCount, history, favoriteGenre} = userData;
  let totalDuartion = 0;
  history.forEach((current) => {
    totalDuartion = totalDuartion + current.duration.h * 60 + current.duration.m;
  });
  // console.log(`duration :${totalDuartion}`);
  const totalHour = Math.floor(totalDuartion / 60);
  const totalMin = totalDuartion - totalHour * 60;
  return `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="${profileAvatar}" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">${profileRating}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
          <label for="statistic-all-time" class="statistic__filters-label">All time</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
            <label for="statistic-today" class="statistic__filters-label">Today</label>

            <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
              <label for="statistic-week" class="statistic__filters-label">Week</label>

              <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
                <label for="statistic-month" class="statistic__filters-label">Month</label>

                <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
                  <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${historyCount} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${totalHour}<span class="statistic__item-description">h</span> ${totalMin} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${favoriteGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`;
};

export default class Stats extends AbstractView {
  constructor(userInfo) {
    super();
    this.userInfo = userInfo;

  }

  getTemplate() {
    return createStatsTemplate(this.userInfo);
  }

}

