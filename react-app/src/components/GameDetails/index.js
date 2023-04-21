import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleGameThunk } from "../../store/game";
import { addToCartThunk } from "../../store/cart";
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


  const handleAddToCart = () => {
      dispatch(addToCartThunk(game.id));
  };

  return (
    <>
    <div className="game-detail-container">
        <h1>{game.title}</h1>
        <img className="game-detail-logo" src={game.image} alt={game.title} />
        {game.other_images.map((image, index) => (
                <img key={index} className="game-detail-images" src={image} alt={game.title} />
            ))}
        <p className="side-text-details">{game.short_description}</p>
        <p className="side-text-details"><span className="game-detail-subtext">Release Date:</span> {game.release_date}</p>
        <p className="side-text-details"><span className="game-detail-subtext">Developer:</span> {game.developer}</p>
        <p className="side-text-details"><span className="game-detail-subtext">Publisher:</span> {game.publisher}</p>
        <div className="price-container">
            <p>{game.price}</p>
        </div>
        <h2 className="title-text">About This Game</h2>
        <div className="full-description-container">
            <p>{game.full_description}</p>
        </div>
        <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
    </>
  );
};

export default GameDetails;
