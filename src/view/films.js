import AbstractView from "./abstract.js";

const createFilmsTemplate = () => {
  return `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">all movies. upcoming</h2>
          <div class="films-list__container">
          </div>
      </section>
    </section>`;
};

export default class Films extends AbstractView {
  getTemplate() {
    return createFilmsTemplate();
  }

}
