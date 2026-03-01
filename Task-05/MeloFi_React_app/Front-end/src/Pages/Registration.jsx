import Email from "../Components/Email";
import Password from "../Components/Password";
import "../Style/Home.css";
import Input from "../Components/Inputs";
import Header from "../Components/Header";
import Button from "../Components/Buttons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Registration() {
  const navigate = useNavigate();
  const [Data, setData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(""); // creating a useState variable with empty string
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //  e.preventDefault() stops page reload

    if (!Data.username || !Data.email || !Data.password) {
      setError("All fields are required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Data.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      //  trying to send data to backend

      const response = await fetch("http://localhost:5555/users", {
        method: "POST",
        // for creating new users POST is used here. 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data), 
        // JSON.stringify(Data) is used to convert a js value ( array or obj) into json-string format.
      });

      const data = await response.json();
      //  we are telling the js to pause the execution of async fun until the entire responce from the frontend(a network request) has been made as a json obj/text.

      if (response.ok) {
        // response.ok ==> checks if the HTTP status is in b/w 200-299

        alert("Registration successful! Please login.");
        navigate("/"); // Redirects to login page
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      // what if we got errors then 
      
      setError("Server error. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="box">
        <h3 className="title">Registration</h3>
        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}
        <br></br>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Username"
            name="username"
            value={Data.username}
            onChange={handleChange}
          />
          <br></br>
          <div >
            {/* Connects email input to the state and updates the changes occured in the email in the state */}
            <Email value={Data.email} onChange={handleChange} />
          </div>
          <br></br>
          {/* connects the pasword to the state fun and it updates the value */}
          <Password
            placeholder="Password"
            value={Data.password}
            onChange={handleChange}
          />
          <br></br>
          <Button
            name={loading ? "Registering.." : "SignUp"}
            onClick={handleSubmit}
            disabled={loading}
          />
        </form>
        <h4 className="title">
          Already had account? <Link to="/">Login</Link>
        </h4>
      </div>
    </>
  );
}

export default Registration;
