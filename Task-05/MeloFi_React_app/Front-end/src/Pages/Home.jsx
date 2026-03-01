import Input from "../Components/Inputs";
import Password from "../Components/Password";
import Buttons from "../Components/Buttons";
import Header from "../Components/Header";
import "../Style/Home.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {login } = useAuth();


  //  async ==> allows systems to send and recive data without waiting for an immediate responceponce.
  const handleLogin = async (e) => {
    e.preventDefault(); // we make the webpage not to refresh because, is the webpage refreshes then it will cuts off code before it can finish the api call.

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      //  this await makes the async function to stop until the fetching finishes
      const responce = await fetch("http://localhost:5555/login", {
        // the above link is from backend , it is usefull to check login details.(we are connecting them here)
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await responce.json();

      if (responce.ok) {
        login(data.user, data.token);
        console.log("Login successful:", data);
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      setError("Server error");
      console.error("Login error:", error);
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
        <h2 className="jua-regular">Welcome to MeloFi</h2>
        <p>Have a account for Free to get a Wonderful Listening Experience!</p>

        <h3 className="title">Login</h3>

        {/* style for error displaying */}
        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}
        <div>
          <form onSubmit={handleLogin} className="login-part">
            <Input
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Password
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          <p className="text">
            <Link
              to="/Resetpage"
              style={{ textDecoration: "none", color: "black" }}
            >
              Forgot Password?
            </Link>
          </p>

          <Buttons
            name={loading ? "LoggingIn.." : "Login"}
            onClick={handleLogin}
            disabled={loading}
            type="submit"
          />

          <p className="text">Not registered yet? Then Click below</p>

          <Buttons name="SignUp" onClick={() => navigate("/Registration")} />
        </div>
      </div>
    </>
  );
}

export default Home;
