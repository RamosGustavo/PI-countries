import React from "react";
import { NavLink } from "react-router-dom";

import SearchBar from "./SearchBar";

import s from "./NavBar.module.css";

export default function NavBar({ setCurrentPage }) {
    return (
        <nav className={s.nav}>
            <ul className={s.ul}>
                <li>
                    <NavLink className={s.navLink} to="/home">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink className={s.navLink} to="/createActivity">
                        Create activity
                    </NavLink>
                </li>
                <li className="searchBar">
        <SearchBar setCurrentPage={setCurrentPage} />
        </li>
            </ul>
        </nav>
    );
}
