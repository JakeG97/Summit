import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllLibraryGamesThunk, removeGameThunk } from '../../store/library';
import { ModalProvider } from "../../context/Modal";
import RemoveGameModal from '../RemoveGameModal';
import UpdateGame from '../LibraryUpdate';
import "./Library.css"

const Library = () => {
  const dispatch = useDispatch();
  const library = useSelector((state) => state.library);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    dispatch(getAllLibraryGamesThunk());
  }, [dispatch]);

  const handleRemoveClick = (game) => {
    setShowRemoveModal(true);
    setSelectedGame(game);
  };

  const handleRemoveClose = () => {
    setShowRemoveModal(false);
    setSelectedGame(null);
    dispatch(getAllLibraryGamesThunk());
  };
  

  const handleRemove = async (game) => {
    await dispatch(removeGameThunk(game.game_id));
    dispatch(getAllLibraryGamesThunk());
    handleRemoveClose();
  };  

  const handleUpdateClick = (game) => {
    console.log("Selected game ID:", game.game_id);
    setShowUpdateForm(true);
    setSelectedGame(game);
  };

  const handleFormClose = () => {
    setShowUpdateForm(false);
    setSelectedGame(null);
  };


  return (
    <div className="library">
      <h2 className="library-title">Library</h2>
      {Object.values(library).map((game) => (
        <div className="game-card" key={game.id}>
          <img className="games-list-image" src={game.banner_image} alt={game.title} />
          <h2 className="cart-game-titles">{game.title}</h2>
          <button className="remove-button" onClick={() => handleRemoveClick(game)}>Remove</button>
          <button className="review-buttons" onClick={() => handleUpdateClick(game)}>Update</button>
        </div>
      ))}
      {showUpdateForm && (
        <UpdateGame game={selectedGame} onClose={handleFormClose} />
      )}
      <ModalProvider>
        {showRemoveModal && (
          <RemoveGameModal game={selectedGame} onRemove={handleRemove} onClose={handleRemoveClose} />
        )}
      </ModalProvider>
    </div>
  );
};

export default Library;