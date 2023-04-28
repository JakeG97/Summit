import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatedGameThunk, getAllLibraryGamesThunk } from '../../store/library';
import "./LibraryUpdate.css"


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
    <div className="library-update">
    <h3>Update Game</h3>
      <form className="library-update-form" onSubmit={handleSubmit}>
        <div className='library-inputs'>
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
        </div>
        <div className="library-submits">
          <button className="review-buttons" type="submit">Update</button>
          <button id="cancel-update" className="remove-button" type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateGame;
