import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleGameThunk } from "../../store/game";
import './GameDetails.css'

const GameDetails = () => {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const game = useSelector((state) => state.games[gameId]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      await dispatch(getSingleGameThunk(gameId));
      setLoading(false);
    };
    fetchGame();
  }, [dispatch, gameId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <>
    <div className="game-detail-container">
        <h1>{game.title}</h1>
        <img className="game-detail-logo" src={game.image} alt={game.title} />
        {game.other_images.map((image, index) => (
                <img key={index} className="game-detail-images" src={image} alt={game.title} />
            ))}
        <p className="short-description">{game.short_description}</p>
        <p><span className="game-detail-subtext">Release Date:</span> {game.release_date}</p>
        <p><span className="game-detail-subtext">Developer:</span> {game.developer}</p>
        <p><span className="game-detail-subtext">Publisher:</span> {game.publisher}</p>
        <p>{game.price}</p>
        <h2 className="title-text">About This Game</h2>
        <div className="full-description-container">
            <p>{game.full_description}</p>
        </div>
    </div>
    </>
  );
};

export default GameDetails;
