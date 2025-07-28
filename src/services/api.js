const API_KEY = "59063dc5908d01e7da976e2911731895";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  return await response.json();
};

export const getPopularAnime = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_keywords=210024&page=${page}`
  );
  return await response.json();
};

export const searchMovies = async (query, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  return await response.json();
};

export const searchAnime = async (query, page = 1) => {
    const response = await fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&with_keywords=210024&page=${page}`
    );
    return await response.json();
  };

export const getMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return await response.json();
};

export const getGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres;
};

export const getMoviesByGenre = async (genreId, year = "", country = "", page = 1) => {
  let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}`;
  if (genreId) url += `&with_genres=${encodeURIComponent(genreId)}`;
  if (year) url += `&primary_release_year=${encodeURIComponent(year)}`; // Utiliser primary_release_year
  if (country) url += `&with_origin_country=${encodeURIComponent(country)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
  };

  export const getAnimeByGenre = async (genreId, year = "", country = "", page = 1) => {
    let url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_keywords=210024&page=${page}`;
    if (genreId) url += `&with_genres=${encodeURIComponent(genreId)}`;
    if (year) url += `&first_air_date_year=${encodeURIComponent(year)}`; // Use first_air_date_year for TV
    if (country) url += `&with_origin_country=${encodeURIComponent(country)}`;
    const response = await fetch(url);
    return await response.json();
  };