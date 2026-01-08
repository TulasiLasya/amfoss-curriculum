import { FaSearch } from "react-icons/fa";

function Searchbar() {
  return (
    <>
      <FaSearch />
      <input type="text" placeholder="Search" className="search-input"></input>
    </>
  );
}

export default Searchbar;
