import Menu from "../Components/Menu";
import Header from "../Components/Header";
import Playbar from "../Components/Playbar";
import Searchbar from "../Components/Searchbar";
import "../Style/Searchbar.css";
import Trendingsongs from "../Components/Trendingsongs";
import "../Style/Dashboard.css";
import Albumpage from "../Components/Albums";

function Dashboard() {
  return (
    <>
      <Header />

      <div className="dbody">
        <Menu />
        <div className="content">
          <Searchbar />
          <Trendingsongs />
        </div>
      </div>
      <Playbar />
    </>
  );
}

export default Dashboard;
