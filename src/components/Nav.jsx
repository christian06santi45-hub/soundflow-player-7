import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/inti";

const Nav = () => {
  const location = useLocation();
  const musicIconTarget = location.pathname === "/musicplayer" ? "/" : "/musicplayer";
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
    });
    return unsubscribe;
  }, []);

  const userInitial = useMemo(() => {
    if (!user) return "";

    const displayName = (user.displayName || "").trim();
    if (displayName) {
      return displayName.charAt(0).toUpperCase();
    }

    const email = (user.email || "").trim();
    return email ? email.charAt(0).toUpperCase() : "U";
  }, [user]);

  function openMenu() {
    document.body.classList += "menu--open";
  }

  function closeMenu() {
    document.body.classList.remove("menu--open");
  }

  async function handleSignOut() {
    try {
      await signOut(auth);
      closeMenu();
    } catch (signOutError) {
      console.error("Sign out failed:", signOutError);
    }
  }

  return (
    <nav>
      <div className="nav__container">
        <Link to="/">
          <h2 className="logo">Soundflow Player</h2>
        </Link>
        <ul className="nav__links">
          {!user && (
            <>
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
            </>
          )}
          {user && (
            <li className="nav__list">
              <div className="nav__avatar" title={user.displayName || user.email || "User"}>
                {userInitial}
              </div>
            </li>
          )}
          {user && (
            <li className="nav__list">
              <button type="button" className="nav__signout" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          )}
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
            {!user && (
              <>
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
              </>
            )}
            {user && (
              <>
                <li className="menu__list">
                  <span className="menu__avatar" title={user.displayName || user.email || "User"}>
                    {userInitial}
                  </span>
                </li>
                <li className="menu__list">
                  <button type="button" className="menu__signout" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </li>
              </>
            )}
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
