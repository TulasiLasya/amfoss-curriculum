import Albumcard from "./Albumcard";
import { useState, useEffect } from "react";
import "../Style/Trending.css"


function Albums() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("https://free-music-api2.vercel.app/album/todfadd")
      .then(res => res.json())
      .then(data => setSongs(data));
  }, []);

  return (
    <div>
      <h3 className="sub-heading">Albums</h3>
      {songs.length > 0 && (
        <Albumcard
          songs={songs}
          albumname="Todfadd"
        />
      )}
    </div>
  );
}

export default Albums;
