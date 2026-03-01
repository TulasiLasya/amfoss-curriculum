function Password({ placeholder, value, onChange }) {
  return (
    <label>
      <input
        type="password"
        id="password"
        name="password"
        className="id"
        required
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        autoFocus
      ></input>
    </label>
  );
}

export default Password;
