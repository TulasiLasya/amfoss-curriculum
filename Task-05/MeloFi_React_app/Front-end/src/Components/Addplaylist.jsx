import { FiPlusCircle } from "react-icons/fi";
import { useState } from "react";
import Createpl from "../Pages/Createpl";

function Addplaylist() {
  const [clicked, setclicked] = useState(false);
  const handleClicked = () => {
    setclicked(!clicked);
  };
  if (clicked) return;
  return <FiPlusCircle color="white" onClick={handleClicked} />;
}
export default Addplaylist;
