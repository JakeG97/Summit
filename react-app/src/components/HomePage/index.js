import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
// import { login } from "../../store/session";
import { getAllGamesThunk } from "../../store/game";
import "./HomePage.css";
import loadingGif from "./loading-2.gif";
import mainBanner from "../LibraryImages/AC6.png"

const HomePage = () => {
  // const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  // const history = useHistory();

  const games = useSelector((state) => Object.values(state.games));

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredImage, setHoveredImage] = useState('');
  const [currentGameIndex, setCurrentGameIndex] = useState(0);


  useEffect(() => {
    if (games.length > 0) {
      setHoveredImage(games[0].image);
    }
  }, [games]);  


  useEffect(() => {
    dispatch(getAllGamesThunk())
      .then(() => setIsLoaded(true));
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

  const handlePrevGame = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextGame = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, 2));
  };

  return (
    <>
      {!isLoaded ? (
        <div className="loading-container">
          <img className="loading-gif" src={loadingGif} alt="Loading..." />
        </div>
      ) : (
        <>
          <img className="main-banner" src={mainBanner} />
          <div className="games-page">
            <a className="cart-details-page" href="/cart">
              <button className="cart-button">CART</button>
            </a>
            <div className="games-container">
              <div className="game-preview-container">
                <div className="game-main-image-container">
                  <img
                    className="game-main-image"
                    src={games[0].image}
                    alt={games[0].title}
                  />
                </div>
                <div className="right-game-preview">
                  <h3 className="main-game-title">{games[0].title}</h3>
                  <div className="game-other-images-container">
                    {games[0].other_images.map((image, index) => (
                      <img
                        key={index}
                        className="game-other-image"
                        src={image}
                        alt={games[0].title}
                        onMouseEnter={() =>
                          document.querySelector(".game-main-image").src = image
                        }
                        onMouseLeave={() =>
                          document.querySelector(".game-main-image").src = games[0].image
                        }
                      />
                    ))}
                  </div>
                  <div className="game-details">
                    <div className="main-game-price">{games[0].price}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom-home-container">
              <div className="left-bar-home">
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
