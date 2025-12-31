import { FiPlusCircle } from "react-icons/fi";
import { useState } from "react";
import Createpl from "../Pages/Createpl";

function Addplaylistb() {
  const [clicked, setclicked] = useState(false);
  const handleClicked = () => {
    setclicked(!clicked);
  };
  if (clicked) return;
  return <FiPlusCircle color="black" onClick={handleClicked} />;
}
export default Addplaylistb;