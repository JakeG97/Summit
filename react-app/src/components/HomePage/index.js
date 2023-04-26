import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import { getAllGamesThunk } from "../../store/game";
import "./HomePage.css";
import { useEffect, useState } from "react";

const HomePage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const games = useSelector((state) => Object.values(state.games));

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(getAllGamesThunk());
  }, [dispatch]);

  const DemoLogin = () => {
    dispatch(login("demo@aa.io", "password"));
    history.push("/");
  };


return (
    <>
      <a className="cart-details-page" href="/cart">
      <button className="cart-button">CART</button>
      </a>
      <div className="games-container">
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
            <div className="hover-container">
              <h3 className="title-hover">{game.title}</h3>
                <div className="other-images-container">
                {game.other_images.map((image, index) => (
                  <img key={index} className="game-hover-images" src={image} alt={game.title} />
              ))}
                </div>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default HomePage;
