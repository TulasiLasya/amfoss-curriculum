import "../Style/Home.css";
import Buttons from "../Components/Buttons";
import Input from "../Components/Inputs";
import Header from "../Components/Header";
import "../Style/Createpl.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlaylist } from "../Context/PlaylistContext";

function Createpl() {
  const [playlistName, setPlaylistName] = useState("");
  const navigate = useNavigate();
  const { createPlaylist } = usePlaylist(); // gets the create function from the creatContext.

  const handleCreateClick = async () => {
    if (!playlistName.trim()) {
      alert("Please enter a playlist name");
      return;
    }

    const newPlaylist = await createPlaylist(playlistName);
    if (newPlaylist) {
      navigate(`/playlist/${newPlaylist.id}`);
    }
    
  };
  

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="box2">
        <h3 className="title">Give your Playlist name</h3>
        <Input
          placeholder="Enter your playlist name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        <br />
        <div className="btn-box">
          <Buttons name="Create" onClick={handleCreateClick} />
          <Link to="/dashboard">
            <Buttons name="Cancel" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Createpl;
