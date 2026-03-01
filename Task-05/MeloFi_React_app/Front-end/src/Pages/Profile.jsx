import "../Style/Home.css";
import Header from "../Components/Header";
import account from "../assets/account.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Profile.css";
import { useAuth } from "../Context/AuthContext";  


function Profile() {
  const navigate = useNavigate();
  const { currentUser, loading: authLoading } = useAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [editedBio, setEditedBio] = useState("");

  useEffect(() => {
  if (authLoading) return; // wait for auth to load

  if (!currentUser) {
    navigate("/dashboard"); // no user then redirect
    return;
  }

  // user exists -- set initial data and fetch fresh profile
  setUser(currentUser);
  setEditedBio(currentUser.bio || "");
  fetchUserProfile(currentUser.id);
}, [authLoading, currentUser, navigate]);


  const fetchUserProfile = async (userId) => {
    try {
      console.log("Fetching profile for userId:", userId);
      const response = await fetch(`http://localhost:5555/profile/${userId}`);
      const data = await response.json();
     // console.log("Profile response:", data); // Debug log

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch profile");
      }
      setUser(data.user);
      setEditedBio(data.user.bio || "");

      // Update localStorage with latest user data
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleSaveBio = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // console.log("Saving bio for userId:", userId, "Bio:", editedBio); // Debug log
      const response = await fetch(`http://localhost:5555/profile/${currentUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: editedBio,
        }),
      });


      const data = await response.json();
      // console.log("Save response:", data); // DEBUG LOG
      if (!response.ok) {
        throw new Error(data.error || "Failed to update bio");
      }

      setUser(data.user);
      setIsEditing(false); // closes the editing mode by false
      setSuccessMessage("Bio updated successfully!");

      // update the local storage.
      localStorage.setItem("user", JSON.stringify(data.user));

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedBio(user.bio || "");
    setIsEditing(false);
    setError("");
  };

  if (loading && !user) {
    return (
      <>
        <Header />
        <div className="box3">
          <div className="loading-spinner">Loading profile...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="box3">
        <img src={account} className="Profilepic" width="70" height="70"></img>
        <h3 className="title">Profile</h3>
        <br />

        {/* Error Message */}
        {error && (
          <div
            className="error-message"
            style={{ color: "red", marginBottom: "10px", textAlign: "center" }}
          >
            {error}
          </div>
        )}

        {/* success message */}
        {successMessage && (
          <div
            className="success-message"
            style={{
              color: "green",
              marginBottom: "10px",
              textAlign: "center",
              fontFamily: "arial",
            }}
          >
            {successMessage}
          </div>
        )}

        {/* Display details */}
        <div className="info-row">
          {/* ?. will give it as undefined instead of givving errors and crashing */}
          <strong>Username:</strong> {user?.username} 
        </div>
        <br />
        <div className="info-row">
          <strong>Email:</strong> {user?.email}
        </div>
        <br />

        {/* BIO */}
        <div className="bio-section">
          <strong>Bio:</strong>
          {isEditing ? (
            <textarea
              value={editedBio}
              onChange={(e) => setEditedBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows="4"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "2px solid pink",
                fontFamily: "arial",
                fontSize: "14px",
                resize: "vertical",
              }}
            />
          ) : (
            <div
              style={{
                padding: "15px",
                backgroundColor: "pink",
                borderRadius: "8px",
                minHeight: "60px",
                marginBottom: "15px",
                color: "#333",
                fontFamily: "arial",
              }}
            >
              {user?.bio
                ? user.bio
                : "No bio added yet. Click 'Edit Bio' to add one!"}
            </div>
          )}
        </div>

        <br />
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginTop: "20px",
            fontFamily: "arial",
          }}
        >
          {isEditing ? (
            <>
              <button
                onClick={handleSaveBio}
                disabled={loading}
                style={{
                  padding: "10px 20px",
                  background: "pink",
                  color: "black",
                  border: "none",
                  borderRadius: "5px",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.5 : 1,
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "arial",
                }}
              >
                {loading ? "Saving..." : "Save Bio"}
              </button>
              <button
                onClick={handleCancel}
                style={{
                  padding: "10px 20px",
                  background: "pink",
                  color: "black",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "arial",
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: "10px 20px",
                background: "white",
                color: "black",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                fontFamily: "arial",
              }}
            >
              Edit Bio
            </button>
          )}
        </div>
        <h4 className="title">Total Time listened</h4>
        <div
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "green",
            fontFamily: "arial",
          }}
        >
          {user?.totalTime || "0"} minutes
        </div>
      </div>
    </>
  );
}

export default Profile;
