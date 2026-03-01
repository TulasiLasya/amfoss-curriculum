import { FiArrowLeft } from "react-icons/fi";
import "../Style/Songplay.css";
import Header from "../Components/Header";
import LikeIcon from "../Components/LikeIcon";
import Addplaylist from "../Components/Addplaylist";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Menu from "../Components/Menu";
import Playbar from "../Components/Playbar";
import { useEffect, useRef } from "react";


function SongPlay() {
  // we will get the song from navigation.
  const location = useLocation();
  const navigate = useNavigate();
  const audioRef = useRef(null);

  // we are getting the song from Trendingsongs.jsx
  const song = location.state?.song;

   useEffect(() => {
    // Auto play the song when component mounts or song changes
    if (audioRef.current && song) {
      // Small delay to ensure audio element is ready
      setTimeout(() => {
        audioRef.current.play().catch(error => {
          console.log("Auto-play was prevented:", error);
          // Most browsers block auto-play, so we'll handle it silently
        });
      }, 500);
    }
  }, [song]); // Re-run when song changes


  if (!song) {
    return (
      <div style={{ color: "white", textAlign: "center", padding: "50px" }}>
        <Header />
        <FiArrowLeft
          onClick={() => navigate(-1)}
          style={{
            cursor: "pointer",
            margin: "20px",
            position: "absolute",
            top: "20px",
            left: "20px",
          }}
          size={28}
          color="white"
        />
        <h2>No song selected!</h2>
        <p>Please select a song from the dashboard</p>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "10px 20px",
            background: "#1DB954",
            color: "white",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Go to Dashboard
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="dashboard-container">
        <Header />

        <div className="dbody">
          <Menu />
          <div className="content1">
            <div className="music-box">
              <div
                className="cover"
                style={{
                  backgroundImage: `url(${song.songBanner})`,
                  backgroundSize: "cover",
                  width: "450px",
                  height: "400px",
                  borderRadius: "20px",
                  margin: 0,
                }}
              ></div>
            </div>

            <p className="details">{song.songName}</p>
            <p className="details">{song.singer}</p>

            <div className="design1">
              <LikeIcon />
              <Addplaylist />
            </div>
            <br />
            <br />
            <audio 
              ref={audioRef}
              controls 
              style={{ margin: "20px auto", display: "block" }}
              autoPlay 
            >
              <source src={song.url} />
            </audio>
            <br />
          </div>
        </div>
        <Playbar />
      </div>
    </>
  );
}

export default SongPlay;
