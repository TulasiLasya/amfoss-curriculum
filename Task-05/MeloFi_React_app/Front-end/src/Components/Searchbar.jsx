import { FaSearch } from "react-icons/fa";

function Searchbar() {
  return (
    <>
      <FaSearch color="white"/>
      <input type="text" placeholder="Search" className="search-input" ></input>
    </>
  );
}

export default Searchbar;
