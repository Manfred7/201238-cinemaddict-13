export const createFooterStatisticsCardTemplate = (filmsCount) => {
  return `
    <section class="footer__statistics">
      <p>${filmsCount} movies inside</p>
    </section>`;
};
