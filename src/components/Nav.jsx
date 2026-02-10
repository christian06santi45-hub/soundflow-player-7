import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
    const location = useLocation();
    const musicIconTarget = location.pathname === "/musicplayer" ? "/" : "/musicplayer";

    function openMenu() {
    document.body.classList += "menu--open";
    }

    function closeMenu() {
    document.body.classList.remove("menu--open");
    }

  return (
    <nav>
      <div className="nav__container">
        <Link to="/">
          <h2 className="logo">Soundflow Player</h2>
        </Link>
        <ul className="nav__links">
          <li className="nav__list">
            <Link to="/signin" className="nav__link">
              Sign In
            </Link>
          </li>
          <li className="nav__list">
            <Link to="/signup" className="nav__link nav__link--primary">
              Sign Up
            </Link>
          </li>
          <button className="btn__menu" onClick={openMenu}>
            <FontAwesomeIcon icon="bars" />
          </button>
          <li className="nav__icon">
            <Link className="nav__link" to={musicIconTarget}>
              <FontAwesomeIcon icon="music" />
            </Link>
          </li>
        </ul>
        <div className="menu__backdrop">
          <button className="btn__menu btn__menu--close" onClick={closeMenu}>
            <FontAwesomeIcon icon="times" />
          </button>
          <ul className="menu__links">
            <li className="menu__list">
              <Link to="/signin" className="menu__link" onClick={closeMenu}>
                Sign In
              </Link>
            </li>
            <li className="menu__list">
              <Link to="/signup" className="menu__link" onClick={closeMenu}>
                Sign Up
              </Link>
            </li>
            <li className="menu__list">
              <Link to="/musicplayer" className="menu__link" onClick={closeMenu}>
                Music Player
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
