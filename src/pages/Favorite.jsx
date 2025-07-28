import { useMovieContext } from "../contexts/MovieContext";
import { useLanguage } from "../contexts/LanguageContext";
import MovieCard from "../components/MovieCard";
import "../css/Favorite.css"; 

function Favorite() {
  const { favorites } = useMovieContext();
  const { t } = useLanguage();

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>{t("noFavorites")}</h2>
        <p>{t("addFavorites")}</p>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="content">
        <h2>{t("favorites")}</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorite;