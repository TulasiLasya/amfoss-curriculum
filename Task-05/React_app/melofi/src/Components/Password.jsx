function Password(props) {
  return (
    <form>
      <label>
        <input
          type="password"
          id="password"
          className="id"
          required
          placeholder={props.placeholder}
        ></input>
      </label>
    </form>
  );
}

export default Password;
