import { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useMovieContext } from "../contexts/MovieContext";
import { getMoviesByGenre, searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import FilterSidebar from "../components/FilterSidebar";
import { FaArrowRight } from "react-icons/fa";
import "../css/Home.css";

function AllMovies() {
  const { t } = useLanguage();
  const {
    movies,
    setMovies,
    error,
    setError,
    loading,
    setLoading,
    moviePage,
    setMoviePage,
    searchQuery,
    filtersApplied,
  } = useMovieContext();

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        let response;
        if (searchQuery.trim()) {
          response = await searchMovies(searchQuery, moviePage); // Use searchMovies for search queries
        } else {
          response = await getMoviesByGenre("", "", "", moviePage); // Load popular movies by default
        }
        setMovies(response.results);
        setError(null);
      } catch {
        setError(t("errorLoading"));
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [moviePage, searchQuery, t, setMovies, setError, setLoading]);

  const handleFilterChange = async (filters) => {
    setLoading(true);
    try {
      const response = await getMoviesByGenre(filters.genre, filters.year, filters.country, moviePage);
      setMovies(response.results);
      setError(null);
    } catch {
      setError(t("errorFilter"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="home-container">
        <FilterSidebar onFilterChange={handleFilterChange} />
        <div className="content">
          <h2>{t("allMovies")}</h2>
          {error && <div className="error">{error}</div>}
          {loading ? (
            <div className="loading">{t("loading")}</div>
          ) : (searchQuery.trim() || filtersApplied) && movies.length === 0 ? (
            <div className="not-found">{t("notFound")}</div>
          ) : (
            <section className="movies-section">
              <div className="movies-grid">
                {movies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </div>
              <button
                className="view-more"
                onClick={() => setMoviePage((prev) => prev + 1)}
              >
                <FaArrowRight /> {t("viewMore")}
              </button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllMovies;