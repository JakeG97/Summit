import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import mainLogo from "../LibraryImages/summit-logo-transparent.png"
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="navbar-container">
      <div className="left-container">
        <div className='main-title-container'>
          <NavLink className="main-logo-nav" exact to="/">
            <img  className="main-logo" src={mainLogo} />
          </NavLink>
          <NavLink className="main-title" exact to="/">
            SUMMIT
          </NavLink>
        </div>
		<p className='trademark'></p>
        <NavLink className="other-main-title" exact to="/">STORE</NavLink>
        <NavLink className="other-main-title" exact to="/Library">LIBRARY</NavLink>
        <NavLink className="other-main-title" exact to="/create-game">CREATE</NavLink>
        <NavLink className="other-main-title" exact to="/profile">{sessionUser?.username}</NavLink>
      </div>
      {isLoaded && (
        <div className="right-container">
          {sessionUser ? (
            <>
				{/* <button className="install-button" onClick={() => alert('Feature Coming Soon...')}>
        <i class="fas fa-download"></i>	
					Install Summit
				</button>
				<button className="message-button" onClick={() => alert('Feature Coming Soon...')}>
					<i class="fas fa-envelope"></i>
				</button> */}
              	<ProfileButton user={sessionUser} />
              	<NavLink to="/profile" className="profile-picture-button">
                <img className="profile-pic-review-list" src={sessionUser.profile_picture || "https://avatars.cloudflare.steamstatic.com/8ac27aecdce197c83213d6fb7257f7b55eb18a6c_full.jpg"} alt="Profile" />
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-user-links">Log In</NavLink>
              <NavLink to="/signup" className="nav-user-links">Sign Up</NavLink>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navigation;
