import { Link, useLocation } from "react-router-dom";

import style from "./navBar.module.css";
import SearchBar from "../SearchBar/searchBar.jsx";

const navBar = () => {
  return (
    <nav className={style.fullWrapper}>
      <SearchBar className={style.SearchBar}/>
      <div className={style.buttonsWrapper}>
        <Link to="/home">
          <button>Home</button>
        </Link>
        <Link to="/create-activity">
          <button>Create Activity</button>
        </Link>
        <Link to="/about">
          <button>About</button>
        </Link>
      </div>
      <Link to="/">
        <button className={style.logoutButton}>Log Out</button>
      </Link>
    </nav>
  );
};

export default navBar;
