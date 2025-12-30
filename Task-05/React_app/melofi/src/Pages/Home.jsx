//import Login from "../Components/Login";
//import Email from "../Components/Email";
//import SignUp from "../Components/SignUp";
import Password from "../Components/Password";
import "../Style/Home.css";
import Buttons from "../Components/Buttons";
import Input from "../Components/Inputs";
import Header from "../Components/Header";
import Resetpage from "./Resetpage";
import { Link, useNavigate } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
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
          <Input placeholder="Email" />
          <Password placeholder="password" />
          <p className="text">
            <Link to="/Resetpage">Forgot Password?</Link>
          </p>
          <Buttons name="Login" onClick={() => navigate()} />
          {/* goes to dashboard page */}
          <p className="text">Not registered yet? Then Click below</p>
          <Buttons name="SignUp" onClick={() => navigate("/Registration")} />
        </div>
      </div>
    </>
  );
}

export default Home;
