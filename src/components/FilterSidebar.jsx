import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useMovieContext } from "../contexts/MovieContext";
import { getGenres } from "../services/api";
import { FaFilter } from "react-icons/fa";
import "../css/FilterSidebar.css";

function FilterSidebar({ onFilterChange }) {
  const { t } = useLanguage();
  const { setFiltersApplied } = useMovieContext();
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    const fetchGenres = async () => {
      const genreData = await getGenres();
      setGenres(genreData);
    };
    fetchGenres();
  }, []);

  const handleFilterChange = () => {
    setFiltersApplied(!!(selectedGenre || selectedYear || selectedCountry));
    onFilterChange({ genre: selectedGenre, year: selectedYear, country: selectedCountry });
  };

  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
  const countries = ["US", "FR", "JP", "KR", "GB", "CA"];

  return (
    <div className="filter-sidebar">
      <h3 className="filter-title">{t("filters")}</h3>
      <div className="filter-group">
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">{t("genres")}</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">{t("year")}</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value="">{t("country")}</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleFilterChange} className="filter-button">
        <FaFilter /> {t("apply")}
      </button>
    </div>
  );
}

export default FilterSidebar;