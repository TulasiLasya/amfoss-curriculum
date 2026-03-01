import Playblack from "./Play-black";
import { FiSkipForward } from "react-icons/fi";
import { FiSkipBack } from "react-icons/fi";
import Likeblack from "./Like-black";
import "../Style/Playbar.css";
import Addplaylistb from "./Addplaylist-black";
import { useLocation } from "react-router-dom";

function Playbar() {
  const location = useLocation();
  const song = location.state?.song; // ?. checks if the location.state exits or not 

  return (
    <>
      <footer className="container">
        <div
          className="cover"
          style={{
            backgroundImage: `url(${song?.songBanner})`,
            backgroundSize: "cover",
            width: "150px",
            height: "120px",
            borderRadius: "20px",
            margin: 0,
          }}
        ></div>
        <div className="container2">
          <Likeblack />
          <FiSkipBack />
          <Playblack />
          <FiSkipForward />
          <Addplaylistb />
        </div>
      </footer>
    </>
  );
}

export default Playbar;
