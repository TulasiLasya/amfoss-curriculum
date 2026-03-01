import { Link, useNavigate } from "react-router-dom";
import "../Style/Menu.css";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { MdLockReset } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi";
import { RiPlayList2Fill } from "react-icons/ri";
import { useAuth } from "../Context/AuthContext";

function Menu() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <div className="menu">
        <br />
        <br />
        <div>
          <Link to="/dashboard" className="no-decor">
            <HiOutlineHome size="25" /> Dashboard
          </Link>
        </div>
        <br />
        <br />
        <div>
          <Link to="/Profile" className="no-decor">
            <CgProfile size="25" /> Profile
          </Link>
        </div>
        <br />
        <br />
        <div>
          <Link to="/Createpl" className="no-decor">
            <IoMdAddCircleOutline size="25" /> Create Playlist
          </Link>
        </div>
        <br />
        <br />
        <div>
          <Link to="/playlists" className="no-decor">
            <RiPlayList2Fill size="25" /> Playlists
          </Link>
        </div>
        <br />
        <br />
        <div
          onClick={handleLogout}
          style={{ cursor: "pointer", color: "white", textDecoration: "none" }}
          className="no-decor"
        >
          <LuLogOut size="25" /> Logout
        </div>
        <br />
        <br />
        <div>
          <Link to="/Resetpage" className="no-decor">
            <MdLockReset size="25" /> Reset Password
          </Link>
        </div>
        <br />
        <br />
      </div>
    </>
  );
}

export default Menu;
