import { Link } from "react-router-dom";
import "../Style/Menu.css";
import { FiPlusCircle } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { MdLockReset } from "react-icons/md";


function Menu() {
  return (
    <>
      <div className="menu">
        <br/><br/><br/>
        <div>
          <Link to="/Profile" className="no-decor">
            <CgProfile size="20"/> Profile
          </Link>
        </div>
        <br />
        <div>
          <Link to="/Createpl" className="no-decor">
            <IoMdAddCircleOutline size="20"/> Create Playlist
          </Link>
        </div>
        <br />
        <div>
          <Link to="/" className="no-decor">
            <LuLogOut size="20"/> Logout
          </Link>
        </div>
        <br />
        <div>
          <Link to="/Resetpage" className="no-decor">
            <MdLockReset size="20"/> Reset Password
          </Link>
        </div>
      </div>
    </>
  );
}

export default Menu;
