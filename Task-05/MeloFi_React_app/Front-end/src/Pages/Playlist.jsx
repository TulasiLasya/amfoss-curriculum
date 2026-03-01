import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import "../Style/Playlist.css";
import { usePlaylist } from "../Context/PlaylistContext";
import Menu from "../Components/Menu";
import { MdDelete } from "react-icons/md";

function Playlist() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { getPlaylistById, playlists, removeSongFromPlaylist } = usePlaylist(); // gets from Context file
  const [playlist, setPlaylist] = useState(null);

  // it will load the playlist from local storage if not in state.
  useEffect(() => {
    const playlistId = parseInt(id);
    const foundPlaylist = getPlaylistById(playlistId);
    if (foundPlaylist) {
      setPlaylist(foundPlaylist);
      setLoading(false);
    } else {
      let retryCount = 0;
      const maxRetries = 5;
      
      const intervalId = setInterval(() => {
        retryCount++;
        const retryPlaylist = getPlaylistById(playlistId);
        
        if (retryPlaylist) {
          console.log("Found on retry:", retryPlaylist);
          setPlaylist(retryPlaylist);
          setLoading(false);
          clearInterval(intervalId);
        } else if (retryCount >= maxRetries) {
          clearInterval(intervalId);
          alert("Playlist not found!");
          navigate("/playlists");
        }
      }, 300);
      return () => clearInterval(intervalId);
    }
  }, [id, getPlaylistById, navigate, playlists]);

  const handleSongClick = (song) => {
    navigate("/songplay", {
      state: {
        song: {
          _id: song._id,
          songName: song.songName,
          singer: song.singer,
          songBanner: song.songBanner,
          url: song.url,
        },
      },
    });
  };

  const handleDeleteSong = (songId, e) => {
    e.stopPropagation(); // Prevent triggering the song click
    e.preventDefault();

    if (window.confirm("Remove this song from playlist?")) {
      removeSongFromPlaylist(playlist.id, songId);

      // Update local state to reflect deletion immediately
      setPlaylist((prev) => ({
        ...prev,
        songs: prev.songs.filter((song) => song._id !== songId),
      }));
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading playlist...</p>
        </div>
      </>
    );
  }
  
  if (!playlist) {
    return null;
  }

  return (
    <>
      <div className="header">
        <Header />
        <div>
          <Menu />
        </div>
      </div>
      <div className="content-pl">
        <div className="playlist-container">
          <div className="playlist-header">
            <h1 className="playlist-title">{playlist.name}</h1>

            <p className="playlist-stats">
              {playlist.songs.length}{" "}
              {playlist.songs.length === 1 ? "song" : "songs"}
            </p>
          </div>
          <div className="songs-container">
            <h2 className="songs-heading">Songs in this playlist</h2>

            {playlist.songs.length === 0 ? (
              <div className="empty-playlist">
                <p>No songs in this playlist yet</p>
                <p className="hint">
                  Go to Dashboard and click the + button on any song to add it!
                </p>
              </div>
            ) : (
              <div className="songs-list">
                {playlist.songs.map((song, index) => (
                  <div
                    key={song._id || index}
                    className="song-item clickable-song"
                    onClick={() => handleSongClick(song)}
                  >
                    <span className="song-number">{index + 1}</span>
                    <img
                      src={song.songBanner}
                      alt={song.songName}
                      className="song-thumbnail"
                    />
                    <div className="song-details">
                      <h3 className="song-name">{song.songName}</h3>
                      <p className="song-artist">{song.singer}</p>
                    </div>

                    {/* Delete button for song */}
                    <button
                      className="delete-song-btn"
                      onClick={(e) => handleDeleteSong(song._id, e)}
                      title="Remove from playlist"
                    >
                      <MdDelete size={20} />
                    </button>

                    <audio controls src={song.url} className="song-preview">
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Playlist;