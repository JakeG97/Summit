import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllGamesThunk } from "../../store/game";
import { getAllReviewsThunk } from "../../store/review";
import "./HomePage.css";
import loadingGif from "./loading-2.gif";
import mainBanner from "../LibraryImages/AC6.png"

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const games = useSelector((state) => Object.values(state.games));
  const reviews = useSelector((state) => state.reviews);
  const reviewsArray = Object.values(reviews);
  

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredImage, setHoveredImage] = useState('');
  const [index, setIndex] = useState(0);


  useEffect(() => {
    if (games.length > 0) {
      setHoveredImage(games[0].image);
    }
  }, [games]);  



  useEffect(() => {
    dispatch(getAllGamesThunk()).then(() => setIsLoaded(true));
    dispatch(getAllReviewsThunk());
  }, [dispatch]);


  //* loading gif test
  // useEffect(() => {
  //   dispatch(getAllGamesThunk())
  //     .then(() => {
  //       setTimeout(() => {
  //         setIsLoaded(true);
  //       }, 3000);
  //     });
  // }, [dispatch]);

  // const currentGame = games[activeIndex];
  
  const handleLeftButtonClick = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleRightButtonClick = () => {
    if (index < games.length - 1) {
      setIndex(index + 1);
    }
  };

  const mainImageClick = () => {
    history.push('/games/10')
  }
  
  const game = games[index];

  return (
    <>
      {!isLoaded ? (
        <div className="loading-container">
          <img className="loading-gif" src={loadingGif} alt="Loading..." />
        </div>
      ) : (
        <>
          <img className="main-banner" src={mainBanner} onClick={mainImageClick} />
          <div className="games-page">
            <a className="cart-details-page" href="/cart">
              <button className="cart-button">CART</button>
            </a>
            <div className="games-container">
              <button className="arrow-button" onClick={handleLeftButtonClick}>
                <i class="fas fa-chevron-left"></i>
              </button>
              <a href={`/games/${game.id}`} className="game-preview-container">
                <div className="game-main-image-container">
                  <img
                    className="game-main-image"
                    src={game.image}
                    alt={game.title}
                  />
                </div>
                <div className="right-game-preview">
                  <h3 className="main-game-title">{game.title}</h3>
                  <div className="game-other-images-container">
                    {game.other_images.map((image, index) => (
                      <img
                        key={index}
                        className="game-other-image"
                        src={image}
                        alt={game.title}
                        onMouseEnter={() =>
                          document.querySelector(".game-main-image").src = image
                        }
                        onMouseLeave={() =>
                          document.querySelector(".game-main-image").src = game.image
                        }
                      />
                    ))}
                  </div>
                  <div className="game-details">
                    <div className="main-game-price">{game.price}</div>
                  </div>
                </div>
              </a>
              <button className="arrow-button" onClick={handleRightButtonClick}>
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
            <div className="index-squares">
              {games.map((game, i) => (
                <div
                  key={i}
                  className={`index-square ${i === index ? "active" : ""}`}
                  onClick={() => setIndex(i)}
                ></div>
              ))}
            </div>
            <div className="bottom-home-container">
              <div className="left-bar-home">
                <div className="see-more">See more</div>
              {games.map((game, index) => (
                <NavLink
                  to={`/games/${game.id}`}
                  style={{ textDecoration: "none", color: "#fff", fontFamily: "Motiva Sans, sans-serif" }}
                  className={`game-card ${index === activeIndex ? "active" : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <img className="games-list-image" src={game.image} alt={game.title} />
                  <h2 className="title-text">{game.title}</h2>
                  <p id="home-price" className="title-text">{game.price}</p>
                </NavLink> 
              ))}
              </div>
              <div className="right-bar-home">
                <div className="hover-container">
                  <h3 className="title-hover">{games[activeIndex].title}</h3>
                  <p>Overall user reviews:</p>
                  <span className="review-length">({reviewsArray.length})</span>
                  <div className="other-images-container">
                    {games[activeIndex].other_images.map((image, index) => (
                      <img key={index} className="game-hover-images" src={image} alt={games[activeIndex].title} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );  
};

export default HomePage;
