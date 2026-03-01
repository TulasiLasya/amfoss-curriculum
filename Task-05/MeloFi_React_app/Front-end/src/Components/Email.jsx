import "../Style/Email.css";
function Email({ value, onChange }) {
  return (
    <form>
      <label className="label">
        <input
          type="email"
          value={value}
          onChange={onChange}
          name="email"
          className="id"
          required
          placeholder="Email Id"
        ></input>
      </label>
    </form>
  );
}

export default Email;
