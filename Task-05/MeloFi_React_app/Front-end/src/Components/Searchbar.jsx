import "../Style/Searchbar.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

function Searchbar({ onSearch, initialValue = "" }) {
  const [query, setQuery] = useState(initialValue);
  const handleSubmit = (e) => {
     e.preventDefault(); // Prevent page refresh
     if (query.trim()) { // trim() is used to remove the white spaces at both ends
       onSearch(query);
     }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      onSearch(query);
    }
  };

return (
  <>
    <form className="search-box" onSubmit={handleSubmit}>
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search"
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </form>
  </>
);
}

export default Searchbar;
