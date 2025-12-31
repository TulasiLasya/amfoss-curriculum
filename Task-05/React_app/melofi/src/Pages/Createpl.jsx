import "../Style/Home.css";
import Buttons from "../Components/Buttons";
import Input from "../Components/Inputs";
import Header from "../Components/Header";
import "../Style/Createpl.css";

function Createpl() {
  return (
      <>
        <div>
          <Header />
        </div>
        <div className="box2">
          <h3 className="title">Give your Playlist name</h3>
          <Input placeholder="Enter your playlist name" />
          <br></br>
          <div className="btn-box">
            <Buttons name="Create" />
            <Buttons name="Cancel" />
          </div>
        </div>
      </>
  );
}

export default Createpl;
