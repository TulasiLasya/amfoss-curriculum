import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Createpl from "./Pages/Createpl";
import Profile from "./Pages/Profile";
import Registration from "./Pages/Registration";
import Resetpage from "./Pages/Resetpage";
import SongPlay from "./Pages/Songplay";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/Resetpage" element={<Resetpage />} /> */}
        {/* <Route path="/Registration" element={<Registration />} /> */}
        <Route path="" element={<Createpl />} />
        {/* <Route path="" element={<Profile />} /> */}
        {/* <Route path="" element={<SongPlay />} /> */}
      </Routes>
    </>
  );
}

export default App;
