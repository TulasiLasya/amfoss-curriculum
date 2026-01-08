import Email from "../Components/Email";
import Password from "../Components/Password";
import "../Style/Home.css";
import Input from "../Components/Inputs";
import Header from "../Components/Header";
import Button from "../Components/Buttons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="box">
        <h3 className="title">Registration</h3>
        <br></br>
        <Input placeholder="Username" />
        <br></br>
        <div className="login-part">
          <Email />
        </div>
        <br></br>
        <Password placeholder="Password" />
        <br></br>
        <Button name="Sign Up" onClick={() => navigate("/")} />
        <h4 className="title">
          Already had account? <Link to="/">Login</Link>
        </h4>
      </div>
    </>
  );
}

export default Registration;
