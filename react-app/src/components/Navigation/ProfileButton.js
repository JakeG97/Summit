import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { Link, NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className="username-dropdown" onClick={openMenu}>
        {user.username} ▼
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="dropdown-list">
            <ul>
            <NavLink to="/library" className="dropdown-text">
              View Profile
            </NavLink>
            </ul>
            <ul>
            <NavLink to="/library" className="dropdown-text">
              Account Details
            </NavLink>
            </ul>
            <ul>
            <button className="dropdown-text" onClick={handleLogout}>Log Out: <span id="user-name-list">{user.username}</span></button>
            </ul>
          </div>
        ) : (
          <>
            <li>
              <Link to="/login" onClick={closeMenu}>
                Log In
              </Link>
            </li>
            <li>
              <Link to="/signup" onClick={closeMenu}>
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
