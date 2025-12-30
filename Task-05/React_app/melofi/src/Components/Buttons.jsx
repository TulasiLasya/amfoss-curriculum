import "../Style/Buttons.css";

function Buttons(props) {
  return (
    <button className="Btn" onClick={props.onClick}>
      {props.name}
    </button>
  );
}

export default Buttons;
