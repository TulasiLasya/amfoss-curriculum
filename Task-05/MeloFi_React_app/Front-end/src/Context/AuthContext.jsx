import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};



export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token , setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
  const verifyToken = async () => {
    console.log("Starting token verification");
    const token = localStorage.getItem('token');
    console.log(" token:", token);


    if (!token) {
      console.log("No token found, setting loading false");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5555/verify', {
        headers: { 'Authorization': `Bearer ${token}` } // in backend wrap(token_required) is looking for this
      });
      const data = await response.json();
      console.log("Verify response status:", response.status);

      if (response.ok) {
        console.log("Token valid, user:", data.user);
        setToken(token);
        setCurrentUser(data.user);               
        localStorage.setItem('user', JSON.stringify(data.user)); // cache
      } else {
        console.log("Token invalid, clearing storage");
        localStorage.removeItem('token');
        localStorage.removeItem('user'); 
        setCurrentUser(null); // it makes the user log out
        setToken(null);
      }
    } catch (error) {
      console.error('Verification failed', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setCurrentUser(null);
      setToken(null);
    } finally {
      console.log("Setting loading false");
      setLoading(false);  // hides the loading spinner and shows the actual content
    }
  };

  verifyToken();
}, []);

  const login = (userData, newToken) => {
    console.log("login received token:", newToken);
    setCurrentUser(userData);
    setToken(newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem('token', newToken); 
  };

  const logout = () => {
    console.log("Logout called. Current localStorage token:", localStorage.getItem('token'));
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem('token'); 
    console.log("After removal, token should be null:", localStorage.getItem('token'));
};


  const value = {
    currentUser,
    token,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};