import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../redux/Actions/action.js";
import style from "./searchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState("");

  const handleChange = (event) => {
    setSearchString(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getCountryByName(searchString));
  };

  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit}>
        <div className={style.barElements}>
          <input
            type="search"
            placeholder="Search Country"
            value={searchString}
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
