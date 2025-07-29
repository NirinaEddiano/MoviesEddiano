import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMoviesByGenre } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import MovieCard from "./MovieCard";
import "../css/VideoPlayer.css"; // Assurez-vous que le CSS est importé

function VideoPlayer() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);

  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
        const genreId = movieData.genres[0]?.id;
        if (genreId) {
          const related = await getMoviesByGenre(genreId);
          setRelatedMovies(related.results.filter((m) => m.id !== parseInt(id)));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du film:", error);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>{t("loading")}</div>;
  }

  const posterUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div className="video-player">
      <div className="player-container">
        <h2>{movie.title}</h2>
        <div className="video-player-wrapper">
          {!isPlaying ? (

            <div
              className="poster-container"
              style={{ backgroundImage: `url(${posterUrl})` }}
              onClick={() => setIsPlaying(true)}
              role="button"
              tabIndex="0"
              aria-label="Lancer la vidéo"
            >
              <div className="play-icon-wrapper"></div>
            </div>
          ) : (
            
            <div className="favorites-empty">
        <h2>{t("noVideo")}</h2>
      </div>
          )}
        </div>
      </div>
      <div className="synopsis">
          <h3>{t("synopsis")}</h3>
          <p>{movie.overview || t("noSynopsisAvailable")}</p>
        </div>
      <div className="related-content">
        <h3>Films similaires</h3>
        <div className="related-grid">
          {relatedMovies.map((relatedMovie) => (
            <MovieCard key={relatedMovie.id} movie={relatedMovie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;