import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { useMovieContext } from "../contexts/MovieContext";
import { FaSearch, FaHome, FaHeart, FaLanguage, FaSun, FaMoon, FaBars } from "react-icons/fa";
import "../css/NavBar.css";

function NavBar({ onSearchSubmit }) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { setSearchQuery } = useMovieContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar" ref={menuRef}>
      <div className="navbar-brand">
        <Link to="/">MovieEddiano</Link>
      </div>
      <div className="navbar-search">
        <input
          type="text"
          placeholder={t("search")}
          className="search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" onClick={onSearchSubmit}>
          <FaSearch /> {t("search")}
        </button>
      </div>
      <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
          <FaHome /> {t("home")}
        </Link>
        <Link to="/favorite" className="nav-link" onClick={() => setIsMenuOpen(false)}>
          <FaHeart /> {t("favorites")}
        </Link>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-select"
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FaBars />
      </button>
    </nav>
  );
}

export default NavBar;