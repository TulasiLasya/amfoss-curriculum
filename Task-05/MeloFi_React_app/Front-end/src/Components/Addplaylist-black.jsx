import { FiPlusCircle } from "react-icons/fi";
import { useState } from "react";

function Addplaylistb() {
  const [clicked, setclicked] = useState(false);
  const handleClicked = () => {
    setclicked(!clicked);
  };
  if (clicked) return;
  return <FiPlusCircle color="black" onClick={handleClicked} />;
}
export default Addplaylistb;
