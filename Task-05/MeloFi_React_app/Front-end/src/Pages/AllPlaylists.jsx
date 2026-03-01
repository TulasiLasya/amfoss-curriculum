import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Menu from "../Components/Menu";
import { usePlaylist } from "../Context/PlaylistContext";
import "../Style/AllPlaylists.css";
import { MdDelete } from "react-icons/md";
import { RiPlayList2Fill } from "react-icons/ri";

function AllPlaylists() {
  const { playlists, removePlaylist, removeSongFromPlaylist } = usePlaylist();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Filter out any null values from playlists
  const validPlaylists = Array.isArray(playlists)
    ? playlists.filter((p) => p !== null)
    : [];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  // handelers start
  const handlePlaylistClick = (playlistId, e) => {
    if (e.target.closest(".delete-playlist-btn")) return;
    navigate(`/playlist/${playlistId}`);
  };

  const handleDeletePlaylist = (playlistId, e) => {
    e.stopPropagation(); // Stops the click
    if (window.confirm("Delete this playlist?")) {
      removePlaylist(playlistId);
    }
  };

  const handleDeleteSong = (playlistId, songId, e) => {
    e.stopPropagation();
    if (window.confirm("Remove this song from playlist?")) {
      removeSongFromPlaylist(playlistId, songId);
    }
  };

  const handleSongClick = (song, e) => {
    e.stopPropagation(); // Prevent playlist click
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
  // handelers end

  if (loading) {
    return (
      <>
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your playlists...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <div className="dbody">
          <Menu />

          <div className="playlist-container">
            <div className="playlist-header">
              <h1>Your Playlists</h1>
              <Link to="/createpl" className="create-playlist-btn">
                <div className="bg">+ Create New Playlist </div>
              </Link>
            </div>

            {validPlaylists.length === 0 ? (
              <div className="no-playlists-container">
                <div className="empty-playlists">
                  <RiPlayList2Fill size={64} className="empty-icon" />
                  <h2>No playlists yet</h2>
                  <p>Create your first playlist to start adding songs!</p>
                  <Link to="/createpl" className="create-first-btn">
                    Create Playlist
                  </Link>
                </div>
              </div>
            ) : (
              <div className="playlists-grid">
                {validPlaylists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="playlist-card"
                    onClick={(e) => handlePlaylistClick(playlist.id, e)}
                  >
                    {/* plaulist card */}
                    <div className="playlist-card-image">
                      {playlist.songs.length > 0 ? (
                        <img
                          src={
                            playlist.songs[0]?.songBanner ||
                            "https://via.placeholder.com/200x200?text=Playlist"
                          }
                          alt={playlist.name}
                          className="song-img"
                        />
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div className="playlist-card-info">
                      <h3 className="playlist-card-name">{playlist.name}</h3>
                      <p className="playlist-card-count">
                        {playlist.songs.length}{" "}
                        {playlist.songs.length === 1 ? "song" : "songs"}
                      </p>
                      <button
                        className="delete-playlist-btn"
                        onClick={(e) => handleDeletePlaylist(playlist.id, e)}
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>

                    {/* Songs Section - Below the playlist card */}
                    {playlist.songs.length > 0 && (
                      <div className="playlist-songs-section">
                        <h4 className="songs-title">Songs in this playlist:</h4>
                        <div className="mini-songs-list">
                          {playlist.songs.map((song, index) => (
                            <div
                              key={song._id || index}
                              className="mini-song-item"
                              onClick={(e) => handleSongClick(song, e)}
                            >
                              <img
                                src={song.songBanner}
                                alt={song.songName}
                                className="mini-song-thumbnail"
                                width="30"
                                height="45"
                              />
                              <div className="mini-song-info">
                                <span className="mini-song-name">
                                  {song.songName}
                                </span>
                                <span className="mini-song-artist">
                                  {song.singer}
                                </span>
                              </div>
                              <span className="mini-song-number">
                                {index + 1}
                              </span>

                              <button
                                className="mini-delete-btn"
                                onClick={(e) =>
                                  handleDeleteSong(playlist.id, song._id, e)
                                }
                              >
                                <MdDelete size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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

export default AllPlaylists;
