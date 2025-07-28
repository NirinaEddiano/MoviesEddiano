/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [movies, setMovies] = useState([]);
  const [anime, setAnime] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [moviePage, setMoviePage] = useState(1);
  const [animePage, setAnimePage] = useState(1);

  const addFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav.id === movie.id)) {
        return [...prevFavorites, movie];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (movieId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  return (
    <MovieContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        searchQuery,
        setSearchQuery,
        filtersApplied,
        setFiltersApplied,
        movies,
        setMovies,
        anime,
        setAnime,
        error,
        setError,
        loading,
        setLoading,
        moviePage,
        setMoviePage,
        animePage,
        setAnimePage,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};