import AbstractView from "./abstract.js";

const createFooterStatisticsCardTemplate = (filmsCount) => {
  return `<section class="footer__statistics">
      <p>${filmsCount} movies inside</p>
    </section>`;
};

export default class FooterStatisticsCard extends AbstractView {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFooterStatisticsCardTemplate(this._filmsCount);
  }

}

