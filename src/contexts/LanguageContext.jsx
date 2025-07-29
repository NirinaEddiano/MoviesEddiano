/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("fr");

  const translations = {
    fr: {
      home: "Accueil",
      favorites: "Favoris",
      search: "Rechercher un film ou un anime...",
      watch: "Regarder",
      filters: "Filtres",
      genres: "Genres",
      year: "Année",
      country: "Pays",
      noFavorites: "Aucun favori pour le moment",
      addFavorites: "Ajoutez des films à vos favoris !",
      loading: "Chargement...",
      viewMore: "Voir plus",
      noVideoAvailable: "Aucune vidéo disponible pour le moment",
      apply: "Appliquer",
      synopsis: "Synopsis",
      noSynopsisAvailable: "Aucun synopsis disponible",
      relatedMovies: "Films similaires",
      addFavorite: "Ajouter aux favoris",
      removeFavorite: "Retirer des favoris",
      noDate: "Date non disponible",
      popularMovies: "Films Populaires",
      popularAnime: "Anime Populaires",
      allMovies: "Tous les Films",
      allAnime: "Tous les Anime",
      errorLoading: "Erreur lors du chargement...",
      errorSearch: "Erreur lors de la recherche...",
      errorFilter: "Erreur lors du filtrage...",
      playVideo: "Lancer la vidéo",
      errorCard: "Erreur lors du chargement de la carte du film",
      notFound: "Aucun résultat trouvé",
      noVideo:"Aucune vidéo disponible en raison de manque de droits d'auteur",
    },
    en: {
      home: "Home",
      favorites: "Favorites",
      search: "Search for movies or anime...",
      watch: "Watch",
      filters: "Filters",
      genres: "Genres",
      year: "Year",
      country: "Country",
      noFavorites: "No favorites yet",
      addFavorites: "Start adding movies to your favorites!",
      loading: "Loading...",
      viewMore: "View More",
      noVideoAvailable: "No video available at the moment",
      apply: "Apply",
      synopsis: "Synopsis",
      noSynopsisAvailable: "No synopsis available",
      relatedMovies: "Related Movies",
      addFavorite: "Add to Favorites",
      removeFavorite: "Remove from Favorites",
      noDate: "Date not available",
      popularMovies: "Popular Movies",
      popularAnime: "Popular Anime",
      allMovies: "All Movies",
      allAnime: "All Anime",
      errorLoading: "Error during loading...",
      errorSearch: "Error during search...",
      errorFilter: "Error during filtering...",
      playVideo: "Play video",
      errorCard: "Error loading movie card",
      notFound: "No results found",
      noVideo:"No video available due to copyright restrictions",
    },
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};