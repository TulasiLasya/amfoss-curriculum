import { useEffect, useState } from "react";
import Songcard from "./Songcard";
import "../Style/Trending.css";
import { useNavigate } from "react-router-dom";


function Trendingsongs() {
  const [songs, setsongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // runs only once (empty dependency array)
  useEffect(() => {
    fetch("https://free-music-api2.vercel.app/getSongs")
      .then((res) => res.json())
      .then((data) => {
        setsongs(data);
        setLoading(false);
      })

      .catch((error) => {
        console.error("Error loading songs:", error);
        setLoading(false);
      });
  }, []);
  
  const handelDoubleClick = (song) => {
    // this passes all the song properties, so that it gets all the details of the song
    navigate("/songplay", { state: { song: song } });
  };

  if (loading) return <div>Songs are Loading...</div>;

  return (
    <>
      <div>
        <h2 className="sub-heading">Trending Songs</h2>
        <div>
          <div className="songs-row">
            {songs.map((song) => (
              <Songcard
                onClick={() => handelDoubleClick(song)}
                key={song._id}
                songBanner={song.songBanner}
                songName={song.songName}
                singer={song.singer}
                url={song.url}
                song={song}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Trendingsongs;
