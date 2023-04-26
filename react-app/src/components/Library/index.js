import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllLibraryGamesThunk, removeGameThunk } from '../../store/library';
import { useModal } from '../../context/Modal';
import UpdateGame from '../LibraryUpdate';
import UninstallGameModal from '../UninstallGameModal';
import "./Library.css"

const Library = () => {
  const dispatch = useDispatch();
  const library = useSelector((state) => state.library);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const { setModalContent } = useModal();

  useEffect(() => {
    dispatch(getAllLibraryGamesThunk());
  }, [dispatch]);

  const handleRemove = async (game) => {
    setModalContent(
      <UninstallGameModal game={game} onClose={() => dispatch(getAllLibraryGamesThunk())} />
    );
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
          <img className="games-list-image"src={game.banner_image} alt={game.title} />
          <h2 className="cart-game-titles">{game.title}</h2>
          <button className="remove-button" onClick={() => handleRemove(game)}>Remove</button>
          <button className="review-buttons"onClick={() => handleUpdateClick(game)}>Update</button>
        </div>
      ))}
      {showUpdateForm && (
        <UpdateGame game={selectedGame} onClose={handleFormClose} />
      )}
    </div>
  );
};

export default Library;