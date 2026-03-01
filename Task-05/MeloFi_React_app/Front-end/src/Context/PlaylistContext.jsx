// this file is useful for managing the playlist data, this includes CRUD operations (create, read, update, delete )

import React, { createContext, useState, useContext, useEffect } from "react";
import {useAuth} from './AuthContext'
import { useNavigate } from "react-router-dom";


// create context is like we create one thing that can be passed down to all.
const PlaylistContext = createContext();

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylist must be used within PlaylistProvider");
  }
  return context;
};

export const PlaylistProvider = ({ children }) => {
  // children is used here like a placeholder like the content inside the outercode is made to visible by this keyword children
  const {token, logout, loading} = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading authentication...</div>; 
  }
  
  const isAuthenticated = () =>  !!token;
  const API_BASE_URL = "http://localhost:5555"; 

  // No localStorage initialization – we rely on backend for authenticated users
  const [playlists, setPlaylists] = useState([]);


  const handleUnauthorized = () =>{
    logout();
    navigate("/");
  }
  const syncPlaylistsWithBackend = async () => {
    if (!isAuthenticated()) return;
    await new Promise(resolve => setTimeout(resolve, 100));
      try {
        const response = await fetch(`${API_BASE_URL}/playlists`, {
          headers: {
            'Authorization': `Bearer ${token}`,   
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 401) {
        handleUnauthorized();
        return;
      }

        if (response.ok) {
          const data = await response.json();
          const transformedPlaylists = data.playlists.map(playlist => ({
            id: playlist.id,
            name: playlist.name,
            songs: playlist.songs || []
          }));
          setPlaylists(transformedPlaylists);
        }
      } catch (error) {
        console.error("Error syncing with backend:", error);
      }
    
  };

  // useEffect to sync when user changes
  useEffect(() => { // because of this the frontend stays sync in with backend
    if (isAuthenticated()){
      syncPlaylistsWithBackend();
    } else {
      setPlaylists([]); // clear playlists when logged out
    }
  }, [token]); // this also only when token changes , this is a dependency array.

  const createPlaylist = async (playlistName) => {
    if (!playlistName || typeof playlistName !== 'string') { // make sure that playlist should not be null.
      console.error("Invalid playlist name:", playlistName);
      return null;
    }

    if (!isAuthenticated()) {
      alert("You must be logged in to create a playlist");
      return null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/playlists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({ name: playlistName })
      });

       if (response.status === 401) {
        handleUnauthorized();
        return null;
      }
      
      if (response.ok) {
        const data = await response.json();
        const newPlaylist = {
          id: data.playlist.id,
          name: data.playlist.name,
          songs: []
        };
        setPlaylists(prev => [...prev, newPlaylist]);
        return newPlaylist;
      } else {
        // Handle backend errors
        const error = await response.json();
        alert(error.error || "Failed to create playlist");
        return null;
      }
    } catch (error) {
      console.error("Error creating playlist in backend:", error);
      alert("Failed to connect to server");
      return null;
    }
  };

  const addSongToPlaylist =  async (playlistId, song) => {
    if (!isAuthenticated()) {
      alert("You must be logged in to add songs");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/playlists/${playlistId}/songs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify(song)
      });

       if (response.status === 401) {
        handleUnauthorized();
        return;
      }
      
      if (response.ok) {
        // Refresh playlists from backend to get updated data
        syncPlaylistsWithBackend();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to add song");
      }
    } catch (error) {
      console.error("Error adding song in backend:", error);
      alert("Failed to connect to server");
    }
  };

  const removeSongFromPlaylist = async (playlistId, songId) => {
    if (!isAuthenticated()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/playlists/${playlistId}/songs/${songId}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${token}`
        }
      });
       if (response.status === 401) {
        handleUnauthorized();
        return;
      }
      
      if (response.ok) {
        syncPlaylistsWithBackend();
      }
    } catch (error) {
      console.error("Error removing song from backend:", error);
    }
  };

  const removePlaylist = async (playlistId) => {
    if (!isAuthenticated()) return;

    if (window.confirm("Are you sure you want to delete this playlist?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/playlists/${playlistId}`, {
          method: 'DELETE',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
          }
        });
         if (response.status === 401) {
        handleUnauthorized();
        return;
      }
        
        if (response.ok) {
          syncPlaylistsWithBackend();
        }
      } catch (error) {
        console.error("Error deleting playlist from backend:", error);
      }
    }
  };

  const getPlaylistById = (playlistId) => {
    const id = Number(playlistId);
    const found = playlists.find(p => p.id === id);
    return found || null;
  };

  // instead of passing the single variable we are creating a bundle that contains the data and the functions to change data.
  const value = {
    playlists,
    createPlaylist,
    addSongToPlaylist,
    removePlaylist,
    getPlaylistById,
    removeSongFromPlaylist
  };

  return (
    // we are making this tag with all the values above that we created as we passed in value to it.
    <PlaylistContext.Provider value={value}>
      {/* without this line we can't see the inside things  */}
      {children}
    </PlaylistContext.Provider>
  );
};
// by this creation, any component can simply access by :
//const { playlists, createPlaylist } = useContext(PlaylistContext);