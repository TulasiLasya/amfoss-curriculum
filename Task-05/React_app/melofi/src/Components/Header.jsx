import music from "../assets/music.png";
import "../Style/Header.css";

function Header() {
  return (
    <>
      <div className="head">
        <img src={music} alt="Logo" width="50" height="50"></img>
        <div className="heading">
          <h4 className="jua-regular">MeloFi</h4>
        </div>
      </div>
    </>
  );
}

export default Header;
