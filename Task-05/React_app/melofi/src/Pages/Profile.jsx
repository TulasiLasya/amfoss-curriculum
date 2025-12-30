import "../Style/Home.css"; //import Username from "../Components/Username";
import Email from "../Components/Email";
import Bio from "../Components/Bio";
import Header from "../Components/Header";
import Input from "../Components/Inputs";
import account from "../assets/account.png";

function Profile() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div class="box3">
        <img src={account} className="Profilepic" width="70" height="70"></img>
        <h3 class="title">Profile</h3>
        <br />
        <Input placeholder="Username" />
        <br />
        <Email />
        <br />
        <Bio />
        <br />
        <h4 class="title">Total Time listened</h4>( Total time listened will be
        updated when doing backend )
      </div>
    </>
  );
}

export default Profile;
