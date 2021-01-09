const MOVIE_BUFF = `movie buff`;
const FAN = `fan`;
const NOVICE = `novice`;
const NOVICE_LEFT = 1;
const NOVICE_RIGHT = 10;
const FAN_LEFT = 10;
const FAN_RIGHT = 20;
const MOVIE_BUFF_LEFT = 21;

export const generateUserdata = (filmsData) => {
  const watchlist = filmsData.filter((film) => film.isInWatchlist);
  const history = filmsData.filter((film) => film.isWatched);
  const favorites = filmsData.filter((film) => film.isWatched);

  const generateProfileRating = () => {

    switch (true) {
      case ((history.length >= NOVICE_LEFT) && (history.length <= NOVICE_RIGHT)): {
        return NOVICE;
      }
      case ((history.length > FAN_LEFT) && (history.length <= FAN_RIGHT)): {
        return FAN;
      }
      case (history.length >= MOVIE_BUFF_LEFT): {
        return MOVIE_BUFF;
      }
      default: {
        return ``;
      }
    }
  };

  const generateProfileAvatar = () => `images/bitmap@2x.png`;

  const generateFavoriteGenre = () => `Sci-Fi`;

  return {
    profileRating: generateProfileRating(),
    watchlist,
    history,
    favorites,
    profileAvatar: generateProfileAvatar(),
    favoritesCount: favorites.length,
    historyCount: history.length,
    watchlistCount: watchlist.length,
    favoriteGenre: generateFavoriteGenre()
  };
};

