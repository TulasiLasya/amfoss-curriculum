import Input from "../Components/Inputs";
import Password from "../Components/Password";
import Buttons from "../Components/Buttons";
import Header from "../Components/Header";
import "../Style/Home.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // states for inputs 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {

      const res = await fetch("http://localhost:5000/login", {
        // the above link is from backend , it is usefull to check login details.(we are connecting them here)
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid credentials");
      }

    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>

      <div className="box">
        <h2 className="jua-regular">Welcome to MeloFi</h2>
        <p>Have a account for Free to get a Wonderful Listening Experience!</p>

        <h3 className="title">Login</h3>

        <div className="login-part">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Password
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="text">
            <Link to="/Resetpage">Forgot Password?</Link>
          </p>

          <Buttons name="Login" onClick={handleLogin} />

          <p className="text">Not registered yet? Then Click below</p>

          <Buttons name="SignUp" onClick={() => navigate("/Registration")} />
        </div>
      </div>
    </>
  );
}

export default Home;
