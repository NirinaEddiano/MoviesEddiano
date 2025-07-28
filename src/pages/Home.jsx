import { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useMovieContext } from "../contexts/MovieContext";
import { getPopularMovies, getPopularAnime, getMoviesByGenre } from "../services/api";
import MovieCard from "../components/MovieCard";
import FilterSidebar from "../components/FilterSidebar";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "../css/Home.css";

function Home() {
  const { t } = useLanguage();
  const {
    movies,
    setMovies,
    anime,
    setAnime,
    error,
    setError,
    loading,
    setLoading,
    moviePage,
    animePage,
    searchQuery,
    filtersApplied,
  } = useMovieContext();

  useEffect(() => {
    const loadContent = async () => {
      try {
        const movieData = await getPopularMovies(moviePage);
        const animeData = await getPopularAnime(animePage);
        setMovies(movieData.results);
        setAnime(animeData.results);
        setError(null);
      } catch {
        setError(t("errorLoading"));
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [moviePage, animePage, t, setMovies, setAnime, setError, setLoading]);

  const handleFilterChange = async (filters) => {
    setLoading(true);
    try {
      const response = await getMoviesByGenre(filters.genre, filters.year, filters.country);
      setMovies(response.results);
      setAnime([]);
      setError(null);
    } catch {
      setError(t("errorFilter"));
    } finally {
      setLoading(false);
    }
  };

  const isNoResults = (searchQuery.trim() || filtersApplied) && movies.length === 0 && anime.length === 0;

  return (
    <div className="home">
      <div className="home-container">
        <FilterSidebar onFilterChange={handleFilterChange} />
        <div className="content">
          <h2>{t("home")}</h2>
          {error && <div className="error">{error}</div>}
          {loading ? (
            <div className="loading">{t("loading")}</div>
          ) : isNoResults ? (
            <div className="not-found">{t("notFound")}</div>
          ) : (
            <>
              <section className="movies-section">
                <h3>{t("popularMovies")}</h3>
                {(searchQuery.trim() || filtersApplied) && movies.length === 0 ? (
                  <div className="not-found">{t("notFound")}</div>
                ) :(
                  <div className="movies-grid">
                    {movies.slice(0, 6).map((movie) => (
                      <MovieCard movie={movie} key={movie.id} />
                    ))}
                  </div>
                )}
                <Link to="/movies" className="view-more">
                  <FaArrowRight /> {t("viewMore")}
                </Link>
              </section>
              <section className="anime-section">
                <h3>{t("popularAnime")}</h3>
                {(searchQuery.trim() || filtersApplied) && anime.length === 0 ? (
                  <div className="not-found">{t("notFound")}</div>
                ) : (
                  <div className="movies-grid">
                    {anime.slice(0, 6).map((anime) => (
                      <MovieCard movie={anime} key={anime.id} />
                    ))}
                  </div>
                )}
                <Link to="/anime" className="view-more">
                  <FaArrowRight /> {t("viewMore")}
                </Link>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;