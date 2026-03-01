import Menu from "../Components/Menu";
import Header from "../Components/Header";
import Playbar from "../Components/Playbar";
import Searchbar from "../Components/Searchbar";
import "../Style/Searchbar.css";
import "../Style/Header.css";
import "../Style/Dashboard.css";
import Songcard from "../Components/Songcard";
import { useNavigate, useLocation } from "react-router-dom";
import Trendingsongs from "../Components/Trendingsongs";
import { useState, useEffect } from "react";

function Searchpage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // this takes the query string from the url like from ? onwards.
  const initialQuery = queryParams.get("q") || ""; // this looks for the value associated with "q" and gets it ; || "" if there is no q in the URL then it returns null. that means it makes the initial query as empty string.

  // States for search
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      // query.trim() checks if the search box is empty, if it is, it resets the results and stops the search.
      setSearchResults([]); // as the query is empty it sets the search resukts to be empty.
      setSearchPerformed(false); // this makes to go back to dashboard.
      return;
    }

    setLoading(true);
    setError("");
    setSearchPerformed(true);
    try {
      // Make API call to your backend search endpoint
      // fetch(url) is used to request to retrieve a resource from the url
      const response = await fetch(
        `http://localhost:5555/search/songs?q=${encodeURIComponent(query)}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Search failed");
      }

      setSearchResults(data.songs || []);
      setSearchQuery(query);

      // Update URL with search query
      // encodeURIComponent(query): This is crucial. It converts special characters (like spaces or &) into a format URLs understand (e.g., a space becomes %20).
      // navigate func is a react hook it will change the current url without a full page reload.
      // ?q= is a query parameter.
      // encodeURIComponent(query) replaces teh special charaters with utf-8 escape sequence.
      // replace overwrites the current entry in the history instead of adding new one.
      navigate(`/search-page?q=${encodeURIComponent(query)}`, {
        replace: true,
      });
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally { // finally block runs even it is failed or succeeded.
      // it ensures that the Searching text disapperas whether it worked or failed.
      setLoading(false); // it will not show the loading.. txt.
    }
  };

  const handleSongClick = (song) => {
    navigate("/songplay", { state: { song: song } }); // { state: { song: song } } means it will keep the data attached to the next page that we are going to.
  };

  // If there's an initial query from URL, perform search automatically
  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, []); // [] this makes to run only once

  return (
    <>
      <div className="dashboard-container">
        <Header />

        <div className="dbody">
          <Menu />
          <div className="content">
            <div className="search-con">
              <Searchbar onSearch={handleSearch} initialValue={searchQuery} />
              
              {/* Search Results Section */}
              <div className="search-results">
                {loading && <div className="loading">Searching...</div>}

                {error && <div className="error-message">{error}</div>}

                {!loading && !error && searchPerformed && (
                  <>
                    {searchResults.length > 0 ? (
                      <>
                        <h3>Search Results for "{searchQuery}"</h3>
                        <div className="songs-row">
                          {searchResults.map((song) => (
                            <Songcard
                              key={song._id || song.id}
                              onClick={() => handleSongClick(song)}
                              songBanner={song.songBanner}
                              songName={song.songName}
                              singer={song.singer}
                              url={song.url}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="no-results">
                        <h3>No results found for "{searchQuery}"</h3>
                        <p>Try searching with different keywords</p>
                      </div>
                    )}
                  </>
                )}

                {/* Show trending songs when no search is performed */}
                {!searchPerformed && !loading && <Trendingsongs />}
              </div>
            </div>
          </div>
        </div>
        <Playbar />
      </div>
    </>
  );
}

export default Searchpage;
