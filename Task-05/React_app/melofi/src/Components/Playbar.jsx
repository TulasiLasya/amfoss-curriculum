import Playblack from "./Play-black";
import { FiPause } from "react-icons/fi";
import { FiSkipForward } from "react-icons/fi";
import { FiSkipBack } from "react-icons/fi";
import Likeblack from "./Like-black";
import Addplaylist from "./Addplaylist";
import "../Style/Playbar.css"
import Addplaylistb from "./Addplaylist-black";


function Playbar() {
  return (
    <>
    <footer className="container">
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
