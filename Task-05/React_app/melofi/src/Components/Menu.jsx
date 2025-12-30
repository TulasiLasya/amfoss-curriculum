function Menu() {
  return (
    <>
      <div class="menu">
        <h5>Profile</h5>
        <h5>Create Playlist</h5>
        <h5>
          <Link to="/">Logout</Link>
        </h5>
        <h5>
          <Link to="/Resetpage">Reset Password</Link>
        </h5>
      </div>
    </>
  );
}

export default Menu;
