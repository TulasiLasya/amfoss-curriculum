function Input({ placeholder, value, onChange }) {
  return (
    <input
      required
      placeholder={placeholder}
      className="id"
      value={value}
      onChange={onChange}
    ></input>
  );
}

export default Input;
