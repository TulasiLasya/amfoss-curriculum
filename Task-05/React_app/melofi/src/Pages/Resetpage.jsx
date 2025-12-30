import React from "react";
import "../Style/Home.css";
import Email from "../Components/Email";
import Buttons from "../Components/Buttons";
import Password from "../Components/Password";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Resetpage() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Header />
      </div>
      <div class="box">
        <h3 className="title">Reset Password</h3>
        <Email />
        <br />
        <Password placeholder="New Password" />
        <br></br>
        <Password placeholder="Re-enter Password" />
        <br />
        <Buttons name="Reset" onClick={() => navigate("/")} />

        <h4 class="title">
          All reset? Go to{" "}
          <Link to="/" title="Login Page">
            Login
          </Link>{" "}
          Page
        </h4>
      </div>
    </>
  );
}

export default Resetpage;
