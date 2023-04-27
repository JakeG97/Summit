import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatedGameThunk, getAllLibraryGamesThunk } from '../../store/library';


const UpdateGame = ({ game, onClose }) => {
  const dispatch = useDispatch();

  const [newTitle, setNewTitle] = useState(game.title);
  const [newBannerImage, setNewBannerImage] = useState(game.banner_image);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGameData = { title: newTitle, banner_image: newBannerImage };
    dispatch(updatedGameThunk(newGameData, game.game_id));
    dispatch(getAllLibraryGamesThunk())
    onClose();
  };


  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Game</h3>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <label htmlFor="banner_image">Banner Image:</label>
      <input
        type="text"
        id="banner_image"
        value={newBannerImage}
        onChange={(e) => setNewBannerImage(e.target.value)}
      />
      <button type="submit">Update</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default UpdateGame;
