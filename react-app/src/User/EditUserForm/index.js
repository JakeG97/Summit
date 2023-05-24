import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserThunk, setUser } from "../../store/session";
import { useHistory } from "react-router-dom";

const EditUserForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [username, setUsername] = useState(sessionUser.username);
  const [email, setEmail] = useState(sessionUser.email);
  const [profilePicture, setProfilePicture] = useState(sessionUser.profile_picture);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUserData = {
      username,
      email,
      profile_picture: profilePicture,
    };

    dispatch(updateUserThunk(newUserData, sessionUser.id))
      .then((data) => {
        console.log("User updated successfully:", data);
        dispatch(setUser(data));
        history.push("/profile");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="profilePicture">Profile Picture</label>
        <input
          type="text"
          id="profilePicture"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
        />
      </div>
      <button type="submit">Update User</button>
    </form>
  );
};

export default EditUserForm;
