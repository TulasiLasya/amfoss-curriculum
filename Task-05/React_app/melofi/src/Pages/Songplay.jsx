import { FiSkipBack } from "react-icons/fi";
import { FiSkipForward } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi"; // attach to dashboard page

import "../Style/Songplay.css";
import Header from "../Components/Header";
import LikeIcon from "../Components/LikeIcon";
import Addplaylist from "../Components/Addplaylist";
import Play from "../Components/Play";
import Popup from "../Components/PopUpPL";
import "../Style/PopUpPL.css";

function SongPlay() {
  return (
    <>
      <Header />
      <br />
      <div className="play-box">
        <br />
        <br />
        <div className="music-box">
          <div className="cover"></div>
        </div>
        <br />

        <p class="details">Song Name</p>
        <p class="details">About song</p>

        <div className="design1">
          <LikeIcon />
          <Addplaylist />
        </div>
        <br />
        <div className="design2">
          <FiSkipBack color="white" />
          <Play />
          <FiSkipForward color="white" />
        </div>
        <p>Will make a progress bar and time when doing with backend </p>
      </div>
    </>
  );
}

export default SongPlay;
