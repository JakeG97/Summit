import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateUserThunk, setUser } from "../../store/session";


const EditUserForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [username, setUsername] = useState(sessionUser.username);
  const [email, setEmail] = useState(sessionUser.email);
  const [profilePicture, setProfilePicture] = useState("");

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

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
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
          type="file"
          id="profilePicture"
          accept="image/*"
          onChange={handleProfilePictureChange}
        />
      </div>
      <button type="submit">Update User</button>
    </form>
  );
};

export default EditUserForm;