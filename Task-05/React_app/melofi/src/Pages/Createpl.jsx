import "../Style/Home.css";
import Buttons from "../Components/Buttons";
import Input from "../Components/Inputs";
import Header from "../Components/Header";
import "../Style/Createpl.css";
import { IconContext } from "react-icons";

function Createpl() {
  return (
    <IconContext.Provider value={{ color: "black" }}>
      <>
        <div>
          <Header />
        </div>
        <div class="box2">
          <h3 class="title">Give your Playlist name</h3>
          <Input placeholder="Enter your playlist name" />
          <br></br>
          <div class="btn-box">
            <Buttons name="Create" />
            <Buttons name="Cancel" />
          </div>
        </div>
      </>
    </IconContext.Provider>
  );
}

export default Createpl;
