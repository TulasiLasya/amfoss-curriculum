import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import "../Style/PopUpPL.css";

function Popup() {
  const [popup, setpopup] = useState(false);
  return (
    <>
      <div className="btn-box">
        <button className="add-box" onClick={() => setpopup(true)}>
          <FiPlusCircle color="white" />
        </button>
        {/* should work on pop up so that to show the created playlist and create playlist options */}
      </div>
    </>
  );
}

export default Popup;
