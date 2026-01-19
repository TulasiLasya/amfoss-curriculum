import { useEffect, useState } from "react";
import Songcard from "./Songcard";
import "../Style/Trending.css";

function Trendingsongs() {
  const [songs, setsongs] = useState([]);

  useEffect(() => {
    fetch("https://free-music-api2.vercel.app/getSongs")
      .then((res) => res.json())
      .then((data) => {
        setsongs(data);
      });
  }, []);
  return (
    <>
      <div>
        <h2 className="sub-heading">Trending Songs</h2>
        <div>
          <div className="songs-row">
            {songs.map((song) => (
              <Songcard
                key={song._id}
                songBanner={song.songBanner}
                songName={song.songName}
                singer={song.singer}
                url={song.url}
                
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Trendingsongs;
