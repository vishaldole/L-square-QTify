import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Logo from "./Logo";
import Search from "./Search";
import styles from "./Navbar.module.css";

function Navbar({ searchData }) {
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <Logo />
      </Link>
      <Search
        placeholder="Search a song of your choice"
        searchData={searchData}
      />
      <Button>Give Feedback</Button>
    </nav>
  );
}

export default Navbar;
