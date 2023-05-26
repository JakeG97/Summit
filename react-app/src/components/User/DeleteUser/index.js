import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteUserThunk, logout } from "../../../store/session"
import "./DeleteUser.css"

function DeleteUserModal() {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    await dispatch(deleteUserThunk(sessionUser.id));
    closeModal();
    dispatch(logout());
    history.push(``);
  };

  const handleKeepUser = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div>
      <div id="remove-account" className="library-remove-container">
        <div className="remove-account-text">
          <p className="confirm-delete">Confirm Delete</p>
          <p className="title-text">Are you sure you want to delete yourself? </p>
        <div className="remove-user-buttons">
          <button id="user-remove-yes" className="remove-yes" onClick={handleDeleteUser}>{`Yes`}</button>
          <button className="remove-no" onClick={handleKeepUser}>{`No`}</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteUserModal;
