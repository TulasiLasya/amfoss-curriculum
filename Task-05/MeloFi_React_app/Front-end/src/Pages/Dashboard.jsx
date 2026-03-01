import Menu from "../Components/Menu";
import Header from "../Components/Header";
import Playbar from "../Components/Playbar";
import Searchbar from "../Components/Searchbar";
import "../Style/Searchbar.css";
import "../Style/Header.css";
import Trendingsongs from "../Components/Trendingsongs";
import "../Style/Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <div className="dashboard-container">
        <Header />

        <div className="dbody">
          <Menu />
          <div className="content">
            <div className="search-con">
              <Link to="/search-page" style={{ textDecoration: "none" }}>
                <Searchbar />
              </Link>
            </div>
            <div className="trending-sec">
              <Trendingsongs />
            </div>
          </div>
        </div>
        <Playbar />
      </div>
    </>
  );
}

export default Dashboard;
