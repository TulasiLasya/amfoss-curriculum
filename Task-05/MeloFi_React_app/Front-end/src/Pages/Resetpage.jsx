import "../Style/Home.css";
import Email from "../Components/Email";
import Buttons from "../Components/Buttons";
import Password from "../Components/Password";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Resetpage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // react will updates the ui based state changes.
  const [loading, setLoading] = useState(false); // it will not load if we open the page, so for that we kept false.
  const [error, setError] = useState("");

  // success state is used for conditional rendering, like it will cover the form by showing the successful message while submitting successfully.
  const [success, setSuccess] = useState("");

  const handleResetPassword = async () => {
    if (!email || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5555/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to reset password");
      }

      // Success
      setSuccess("Password reset successfully!");

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes - handeling the events in the inputs.
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(""); // we will get the error message when error occured here.
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="box">
        <h3 className="title">Reset Password</h3>

        {/* Error message styling */}
        {error && (
          <div
            className="error-message"
            style={{ color: "red", marginBottom: "10px" }}
          >
            {error}
          </div>
        )}

        {/* success message styling */}
        {success && (
          <div
            className="success-message"
            style={{ color: "green", marginBottom: "10px" }}
          >
            {success}
          </div>
        )}


        <Email value={email} onChange={handleEmailChange} />
        <br />
        <Password
          placeholder="New Password"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        <br />
        <Password
          placeholder="Re-enter Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <br />
        <Buttons
          name={loading ? "Resetting your password.." : "Reset"}
          onClick={handleResetPassword}
          disabled={loading}
        />

        <h4 className="title">
          All reset? Go to{" "}
          <Link to="/" title="Login Page" style={{ color: "black" }}>
            Login
          </Link>{" "}
          Page
        </h4>
      </div>
    </>
  );
}

export default Resetpage;
