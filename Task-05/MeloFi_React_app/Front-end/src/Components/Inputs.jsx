function Input({ name, placeholder, value, onChange, type = "text" }) {
  return (
    <input
      name={name}
      type={type}
      required
      placeholder={placeholder}
      className="id"
      value={value}
      onChange={onChange}
      autoFocus
    ></input>
  );
}

export default Input;
