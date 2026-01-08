function Password({ placeholder, value, onChange }) {
  return (
      <label>
        <input
          type="password"
          id="password"
          className="id"
          required
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        ></input>
      </label>
  );
}

export default Password;
