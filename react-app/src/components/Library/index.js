import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllLibraryGamesThunk, removeGameThunk } from '../../store/library';

const Library = () => {
  const dispatch = useDispatch();
  const library = useSelector((state) => state.library);

  useEffect(() => {
    dispatch(getAllLibraryGamesThunk());
  }, [dispatch]);

  const handleRemove = async (game) => {
    dispatch(removeGameThunk(game.game_id));
  };

  return (
    <div>
      <h2>Library</h2>
      {Object.values(library).map((game) => (
        <div className="game-card" key={game.id}>
          <img className="games-list-image"src={game.banner_image} alt={game.title} />
          <h3>{game.title}</h3>
          <button onClick={() => handleRemove(game)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Library;