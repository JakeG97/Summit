import React from "react";
import DeleteUserModal from "../DeleteUser";
import OpenModalButton from "../../components/OpenModalButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

import "./Profile.css";

const ProfilePage = () => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const library = useSelector((state) => state.library);

  if (!sessionUser) {
    history.push(`/home`);
  }

  const isDemoUser = sessionUser && sessionUser.id === 1;
  const deleteButton = isDemoUser ? (
    <div className="delete-user-container">
      <p>You cannot delete your account as a demo user</p>
    </div>
  ) : (
    <div className="delete-user-container">
      <OpenModalButton
        buttonText="Delete My Account"
        modalComponent={<DeleteUserModal />}
        className="delete-user-account-button"
      />
    </div>
  );

  const gameCount = Object.values(library).length;

  return (
    <div className="profile-page-container">
      <div className="profile-top-container">
        <div className="top-container-contents">
          <div className="profile-picture-container">
            <img
              src={
                sessionUser.profile_picture === null
                  ? sessionUser.username[0]
                  : sessionUser.profile_picture
              }
              alt="Profile"
              className="profile-page-picture"
            />
          </div>
          <div className="username-email-container">
            <div className="profile-username">{sessionUser.username}</div>
            <div className="profile-email">{sessionUser.email}</div>
          </div>
          <div className="level-container">
            <div className="level">Level {gameCount}</div>
          </div>
        </div>
      </div>
      <div className="delete-user-container">
        <div className="no-delete-button">{deleteButton}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
