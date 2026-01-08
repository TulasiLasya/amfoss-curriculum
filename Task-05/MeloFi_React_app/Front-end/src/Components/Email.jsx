import "../Style/Email.css";
function Email() {
  return (
    <form>
      <label className="label">
        <input type="Email" class="id" required placeholder="Email Id"></input>
      </label>
    </form>
  );
}

export default Email;
