import { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useMovieContext } from "../contexts/MovieContext";
import { getPopularAnime, searchAnime, getAnimeByGenre } from "../services/api"; // Updated imports
import MovieCard from "../components/MovieCard";
import FilterSidebar from "../components/FilterSidebar";
import { FaArrowRight } from "react-icons/fa";
import { Component } from "react";
import "../css/Home.css";

function AllAnime() {
  const { t } = useLanguage();
  const {
    anime,
    setAnime,
    error,
    setError,
    loading,
    setLoading,
    animePage,
    setAnimePage,
    searchQuery,
    filtersApplied,
  } = useMovieContext();

  useEffect(() => {
    const loadAnime = async () => {
      setLoading(true);
      try {
        let response;
        if (searchQuery.trim()) {
          response = await searchAnime(searchQuery, animePage); 
        } else {
          response = await getPopularAnime(animePage); 
        }
        setAnime(response.results);
        setError(null);
      } catch {
        setError(t("errorLoading"));
      } finally {
        setLoading(false);
      }
    };
    loadAnime();
  }, [animePage, searchQuery, t, setAnime, setError, setLoading]);

  const handleFilterChange = async (filters) => {
    setLoading(true);
    try {
      const response = await getAnimeByGenre(filters.genre, filters.year, filters.country, animePage); // Use anime-specific filtering
      setAnime(response.results);
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
          <h2>{t("allAnime")}</h2>
          {error && <div className="error">{error}</div>}
          {loading ? (
           <div className="loading">{t("loading")}</div>
        ) : (searchQuery.trim() || filtersApplied) && anime.length === 0 ? (
          <div className="not-found">{t("notFound")}</div>
        ) : (
            <section className="anime-section">
              <div className="movies-grid">
                {anime.map((animeItem) => (
                  <ErrorBoundary key={animeItem.id} fallback={t("errorCard")}>
                    <MovieCard movie={animeItem} />
                  </ErrorBoundary>
                ))}
              </div>
              <button
                className="view-more"
                onClick={() => setAnimePage((prev) => prev + 1)}
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

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>{this.props.fallback}</div>;
    }
    return this.props.children;
  }
}

export default AllAnime;