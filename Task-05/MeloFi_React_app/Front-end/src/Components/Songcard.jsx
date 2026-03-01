import "../Style/Trending.css";
import { useState, useEffect, useRef } from "react"; // useRef is used for storing the data without rerendering.
import { usePlaylist } from "../Context/PlaylistContext";
import { FiPlusCircle } from "react-icons/fi";

function Songcard({ onClick, songBanner, songName, singer, url, song }) {
  const [showPlaylists, setShowPlaylists] = useState(false);
  const { playlists, addSongToPlaylist } = usePlaylist(); // gets playlists from context.
  const dropdownRef = useRef(null); // Add ref for dropdown
  const buttonRef = useRef(null); // ref for btn


  // Debug log
  useEffect(() => {
    // console.log("Songcard - playlists received:", playlists);
    // console.log("Songcard - is array?", Array.isArray(playlists));
  }, [playlists]);


  const safePlaylists = Array.isArray(playlists)
    ? playlists.filter((playlist) => playlist !== null)
    : [];



    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target)
        ) {
          setShowPlaylists(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);



    const handleAddToPlaylist = (playlistId, e) => {
      e.stopPropagation();



      if (!song) {
        alert("Song data is missing!");
        return;
      }

      // Create a complete song object with all details
      const songToAdd = {
        _id: song._id, // Keep original ID
        songName: songName,
        singer: singer,
        songBanner: songBanner,
        url: url,
      };

      addSongToPlaylist(playlistId, songToAdd);
      setShowPlaylists(false);
      alert(`Added "${songName}" to playlist!`);
    };



    return (


      <div className="song-card-wrapper" style={{ position: "relative" }}>
        {/* Main song card - clicking plays the song */}
        <div
          className="song-card"
          onClick={onClick}
          style={{ cursor: "pointer" }}
        >
          <img className="img-container" src={songBanner} alt={songName} />
          <h4>{songName}</h4>
          <p>{singer}</p>
        </div>



        {/* Plus button - triggers playlist dropdown  */}
        <button
          ref ={buttonRef}
          className="add-to-playlist-btn"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Plus button clicked - current playlists:", playlists); // DEBUG LINE
            setShowPlaylists(!showPlaylists);
          }}
          title="Add to playlist"
        >
          <FiPlusCircle />
        </button>




        {/* Playlist dropdown - appears when plus is clicked */}
        {showPlaylists && (
          <div  ref={dropdownRef} className="playlist-dropdown">
            {safePlaylists.length === 0 ? (
              <div className="no-playlists">
                <p>No playlists yet</p>
                <small>Create one in the menu!</small>
              </div>
            ) : (
              <>
                <div className="dropdown-header">
                  <span>Select Playlist</span>
                </div>
                <div className="dropdown-items-container">
                  {" "}


                  {/* for scrollable items */}
                  {safePlaylists.map((playlist) => (
                    <div
                      key={playlist.id}
                      className="playlist-option clickable-option" // clickable styling
                      onClick={(e) => handleAddToPlaylist(playlist.id, e)}
                    >
                      <span className="playlist-name">{playlist.name}</span>
                      <span className="song-count">
                        {playlist.songs.length} songs
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}






      </div>
    );
  }


export default Songcard;
