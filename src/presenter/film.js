import FilmPopupView from "../view/film-popup";
import FilmCardView from "../view/film-card";
import {render, RenderPosition, replace, remove} from "../utils/render";

const Mode = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`
};

const body = document.querySelector(`body`);

export default class Film {

  constructor(Container, changeData, changeMode) {
    this._filmListContainer = Container;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._popupView = null;
    this._filmView = null;
    this._mode = Mode.DEFAULT;

    this._onShowPopup = this._onShowPopup.bind(this);
    this._onPressClose = this._onPressClose.bind(this);

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);


  }

  init(filmInfo) {
    this._filmInfo = filmInfo;

    const prevFilmView = this._filmView;
    const prevPopupView = this._popupView;


    this._filmView = new FilmCardView(this._filmInfo);
    this._popupView = new FilmPopupView(this._filmInfo);

    this._popupView.setClosePopupHandler(this._onPressClose);
    this._filmView.setShowPopupHandler(this._onShowPopup);

    this._popupView.setAddToFavoriteHandler(this._handleFavoriteClick);
    this._popupView.setAddToWatchedHandler(this._handleWatchedClick);
    this._popupView.setAddToWatchListHandler(this._handleWatchlistClick);

    this._filmView.setAddToFavoriteHandler(this._handleFavoriteClick);
    this._filmView.setAddToWatchedHandler(this._handleWatchedClick);
    this._filmView.setAddToWatchListHandler(this._handleWatchlistClick);


    if (prevFilmView === null || prevPopupView === null) {
      render(this._filmListContainer, this._filmView.getElement(), RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmView, prevFilmView);
    }

    if (this._mode === Mode.POPUP) {
      replace(this._popupView, prevPopupView);
    }

    remove(prevFilmView);
    remove(prevPopupView);
  }

  _replacePopupToCard() {
    body.classList.remove(`hide-overflow`);
    this._filmListContainer.removeChild(this._popupView.getElement());
    this._popupView.removeElement();
    this._mode = Mode.DEFAULT;
  }

  _onPressClose() {
    this._changeData(this._filmInfo);
    this._replacePopupToCard();
  }

  _replaceCardToPopup() {
    body.classList.add(`hide-overflow`);
    this._filmListContainer.appendChild(this._popupView.getElement());
    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _onShowPopup() {
    this._replaceCardToPopup();
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replacePopupToCard();
    }
  }

  _handleWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._filmInfo,
            {
              isInWatchlist: !this._filmInfo.isInWatchlist //  тут что-то правильное надодобавить
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._filmInfo,
            {
              isFavorite: !this._filmInfo.isFavorite
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._filmInfo,
            {
              isWatched: !this._filmInfo.isWatched
            }
        )
    );
  }

  destroy() {
    remove(this._filmView);
    remove(this._popupView);
  }

}
