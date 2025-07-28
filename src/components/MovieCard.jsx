import { Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import { useLanguage } from "../contexts/LanguageContext";
import "../css/MovieCard.css";
import { FaHeart } from "react-icons/fa";

function MovieCard({ movie }) {
  const { isFavorite, addFavorite, removeFavorite } = useMovieContext();
  const { t } = useLanguage();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    console.log("Favorite button clicked for movie:", movie.id, movie.title || movie.name);
    if (favorite) {
      console.log("Removing from favorites:", movie.id);
      removeFavorite(movie.id);
    } else {
      console.log("Adding to favorites:", movie.id);
      addFavorite(movie);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
            aria-label={favorite ? t("removeFavorite") : t("addFavorite")}
          >
            <FaHeart />
          </button>
          <Link to={`/watch/${movie.id}`} className="watch-btn">
            {t("watch")}
          </Link>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
}

export default MovieCard;