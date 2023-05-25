import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllLibraryGamesThunk, removeGameThunk } from '../../store/library';
import UpdateGame from '../LibraryUpdate';
import './Library.css';
import loadingGif from "../HomePage/loading-2.gif"

const Library = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const library = useSelector((state) => {
    console.log('Library state:', state.library);
    return state.library;
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [gameToRemove, setGameToRemove] = useState(null);

  useEffect(() => {
    const fetchLibrary = async () => {
      await dispatch(getAllLibraryGamesThunk());
      setIsLoaded(true);
    };
    fetchLibrary();
  }, [dispatch]);

  useEffect(() => {
    if (gameToRemove && !library[gameToRemove.id]) {
      setShowConfirmationPopup(false);
    }
  }, [library, gameToRemove]);

  const handleRemove = (game) => {
    setGameToRemove(game);
    setShowConfirmationPopup(true);
  };

  const handleConfirmRemove = async () => {
    if (gameToRemove) {
      await dispatch(removeGameThunk(gameToRemove.game_id));
      setGameToRemove(null);
      setShowConfirmationPopup(false);
    }
  };

  const handleCancelRemove = () => {
    setGameToRemove(null);
    setShowConfirmationPopup(false);
  };

  const handleUpdateClick = (game) => {
    console.log('Selected game ID:', game.game_id);
    setShowUpdateForm(true);
    setSelectedGame(game);
  };

  const handleFormClose = () => {
    setShowUpdateForm(false);
    setSelectedGame(null);
  };

  if (!sessionUser) {
    return (
      <div className="library-logged-out">
        <h2 className="no-games">
          You'll need to be signed into an account in order to start your library.
        </h2>
        <Link to="/login">
          <button className="library-login">Let's get you logged in!</button>
        </Link>
      </div>
    );
  }

  // Filter out games that are not present in the store
  const filteredLibrary = Object.values(library).filter((game) => game);

  return (
    <>
      {!isLoaded ? (
        <div className="loading-container">
          <img  className="loading-gif" src={loadingGif} alt="Loading..." />
        </div>
      ) : (
        <div className="library">
          <h2 className="library-title">Library</h2>
          {filteredLibrary.length === 0 ? (
            <div className="no-games">
              <p>Looks like you don't have any games in your library yet...</p>
              <Link to="/">
                <button>Let's change that!</button>
              </Link>
            </div>
          ) : (
            filteredLibrary.map((game) => (
              <div key={game.id}>
                <div className="game-card">
                  <img
                    className="games-list-image"
                    src={game.banner_image}
                    alt={game.title}
                  />
                  <h2 className="cart-game-titles">{game.title}</h2>
                  <button
                    className="remove-button"
                    onClick={() => handleRemove(game)}
                  >
                    Remove
                  </button>
                  <button
                    className="review-buttons"
                    onClick={() => handleUpdateClick(game)}
                  >
                    Update
                  </button>
                </div>
                {showUpdateForm && selectedGame?.id === game.id && (
                  <UpdateGame game={selectedGame} onClose={handleFormClose} />
                )}
                {showConfirmationPopup && gameToRemove?.id === game.id && (
                  <div className="library-remove-form">
                    <div className="library-remove-container">
                      <p>Are you sure you want to uninstall {game.title}?</p>
                      <div className="uninstall-buttons">
                        <button className="remove-yes" onClick={handleConfirmRemove}>Yes</button>
                        <button className="remove-no" onClick={handleCancelRemove}>No</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </>
  );  
};

export default Library;
