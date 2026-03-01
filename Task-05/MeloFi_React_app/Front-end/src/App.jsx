import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Createpl from "./Pages/Createpl";
import Profile from "./Pages/Profile";
import Registration from "./Pages/Registration";
import Resetpage from "./Pages/Resetpage";
import SongPlay from "./Pages/Songplay";
import Dashboard from "./Pages/Dashboard";
import Searchpage from "./Pages/Searchpage";
import AllPlaylists from "./Pages/AllPlaylists";
import { PlaylistProvider } from "./Context/PlaylistContext";
import Playlist from "./Pages/Playlist";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";

function AppContent() {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      <PlaylistProvider currentUser={currentUser}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Resetpage" element={<Resetpage />} />
          <Route path="/Registration" element={<Registration />} />
          <Route
            path="/Createpl"
            element={
              <PrivateRoute>
                <Createpl />
              </PrivateRoute>
            }
          />
          <Route
            path="/Profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/songplay"
            element={
              <PrivateRoute>
                <SongPlay />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <Searchpage />
              </PrivateRoute>
            }
          />
          <Route
            path="/search-page"
            element={
              <PrivateRoute>
                <Searchpage />
              </PrivateRoute>
            }
          />
          <Route
            path="/playlists"
            element={
              <PrivateRoute>
                <AllPlaylists />
              </PrivateRoute>
            }
          />
          <Route
            path="/playlist/:id"
            element={
              <PrivateRoute>
                <Playlist />
              </PrivateRoute>
            }
          />
        </Routes>
      </PlaylistProvider>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
