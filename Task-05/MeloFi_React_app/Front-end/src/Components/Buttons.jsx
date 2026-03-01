import "../Style/Buttons.css";

function Buttons({ name, onClick, disabled = false, type = "button" }) {
  return (
    <button
      className="Btn"
      onClick={onClick}
      disabled={disabled}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {name}
    </button>
  );
}

export default Buttons;
