import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Createpl from "./Pages/Createpl";
import Profile from "./Pages/Profile";
import Registration from "./Pages/Registration";
import Resetpage from "./Pages/Resetpage";
import SongPlay from "./Pages/Songplay";
import Dashboard from "./Pages/Dashboard";
import Albums from "./Components/Albums";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Resetpage" element={<Resetpage />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Createpl" element={<Createpl />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="" element={<SongPlay />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="" element={<Albums />}/> */}
        {/* <Route path="" element={<Albumpage/>}/> */}
      </Routes>
    </>
  );
}

export default App;
