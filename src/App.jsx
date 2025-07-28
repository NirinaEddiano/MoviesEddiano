import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Watch from "./pages/Watch";
import Movies from "./pages/AllMovies";
import Anime from "./pages/AllAnime";
import { useMovieContext } from "./contexts/MovieContext";
import { searchMovies } from "./services/api";

function AppContent() {
  const { setMovies, setAnime, setError, setLoading, searchQuery } = useMovieContext();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults.results);
      setAnime([]); // Clear anime results during search
      setError(null);
    } catch {
      setError("Erreur lors de la recherche...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar onSearchSubmit={handleSearch} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/watch/:id" element={<Watch />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <MovieProvider>
          <AppContent />
        </MovieProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;