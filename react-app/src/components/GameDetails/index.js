import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { getSingleGameThunk } from "../../store/game";
import { addToCartThunk } from "../../store/cart";
import loadingGif from "../HomePage/loading-2.gif"
import Reviews from "../Reviews";
import ReviewForm from "../ReviewForm";
import './GameDetails.css'

const GameDetails = () => {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const game = useSelector((state) => state.games[gameId]);
  const reviews = useSelector((state) => Object.values(state.reviews));
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const sessionUser = useSelector((state) => state.session.user);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    const fetchGame = async () => {
      await dispatch(getSingleGameThunk(gameId));
      setIsLoaded(true);
    };
    fetchGame();
  }, [dispatch, gameId]);
  


  if (!game) {
    return <div>Game not found</div>;
  }

  const handleAddToCart = async () => {
    try {
      const response = await dispatch(addToCartThunk(game.id));
      if (!response.ok) {
        const error = response.data.error;
        setErrorMessage(error);
        setShowPopup(false);
        setTimeout(() => {
          setShowPopup(true);
        }, 0);
      } else {
        setShowPopup(true);
        const cartButton = document.querySelector(".add-button");
        if (cartButton) {
          cartButton.textContent = "In Cart";
          cartButton.disabled = true;
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };  

  const handleLogin = () => {
    history.push("/login");
  };

  console.log('showPopup:', showPopup);  

  return (
    <>
      {!isLoaded ? (
          <div className="loading-container">
            <img  className="loading-gif" src={loadingGif} alt="Loading..." />
          </div>
      ) : (
      <>
        <div className="game-detail-container">
        <a className="cart-details-page" href="/cart">
          <button id ="detail-cart" className="cart-button">CART</button>
        </a>
        <div className="main-detail-title">
          <h1>{game.title}</h1>
        </div>
          <div className="top-half-container">
            <div className="left-bar">
              <div className="selected-image-container">
                <img
                  className="selected-image"
                  src={game.other_images[selectedImageIndex]}
                  alt={game.title}
                />
              </div>
              <div className="small-images-container">
                {game.other_images.map((image, index) => (
                  <img
                    key={index}
                    className={`game-detail-images ${
                      selectedImageIndex === index ? "selected" : ""
                    }`}
                    src={image}
                    alt={game.title}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            </div>
            <div className="right-bar">
              <div className="right-bar-container">
                <img
                  className="game-detail-logo"
                  src={game.image}
                  alt={game.title}
                />
                <p className="side-text-details">{game.short_description}</p>
                <p className="side-text-details">
                  <span className="game-detail-subtext">ALL REVIEWS:</span>{" "}
                  <span className="review-length">({reviews.length})</span>
                </p>
                <p className="side-text-details">
                  <span className="game-detail-subtext">RELEASE DATE:</span>{" "}
                  <span className="release-date">{game.release_date}</span>
                </p>
                <div className="developer-publisher-container">
                <p className="side-text-details">
                  <span className="game-detail-subtext">DEVELOPER:</span>{" "}
                  <span className="dev-pub">{game.developer}</span>
                </p>
                <p className="side-text-details">
                  <span className="game-detail-subtext">PUBLISHER:</span>{" "}
                  <span className="dev-pub">{game.publisher}</span>
                </p>
                </div>
              </div>
            </div>
          </div>
          <div className="price-container">
            <p>Buy {game.title}</p>
          <div className="purchase-box-container">
            <div className="purchase-box">
              <p id="actual-price">{game.price}</p>
              {sessionUser ? (
                <button className="add-button" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              ) : (
                <button className="add-button-login" onClick={handleLogin}>
                  Login
                </button>
              )}
              {showPopup && (
                <div className="popup">
                  <p className="title-text">{errorMessage ? errorMessage : 'Item added to cart!'}</p>
                  {errorMessage ? (
                    <div className="popup-button-container">
                      <button className="popup-buttons" onClick={() => setShowPopup(false)}>OK</button>
                    </div>
                  ) : (
                    <div className="popup-button-container">
                      <a id="cart-redirect" className="popup-buttons" href="/">
                        Continue Shopping
                      </a>
                      <a id="cart-redirect" className="popup-buttons" href="/cart">
                        Go to Cart
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          </div>
          <div className="about-container">
            <h2 className="title-text">About This Game</h2>
            <div className="full-description-container">
              <p className="full-description">{game.full_description}</p>
            </div>
          </div>
          {sessionUser ? (
            <>
              <ReviewForm gameId={gameId} />
              <Reviews gameId={gameId} />
            </>
          ) : (
            <>
            <p className="logged-out-message">Please log in to leave a review</p>
            <NavLink to="/login" className="logout-redirect">Login</NavLink>
            <Reviews gameId={gameId} />
            </>
          )}
        </div>
      </>
      )}
    </>
  );    
};

export default GameDetails;
