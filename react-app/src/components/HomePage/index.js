import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import { getAllGamesThunk } from "../../store/game";
import "./HomePage.css";
import { useEffect } from "react";

const HomePage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  // Retrieve games from the store
  const games = useSelector((state) => Object.values(state.games));

  // Dispatch action to load all games when the component mounts
  useEffect(() => {
    dispatch(getAllGamesThunk());
  }, [dispatch]);

  const onClick = () => {
    dispatch(login("demo@aa.io", "password"));
    history.push("/");
  };

  return (
    <>
      <h1>SUMMIT</h1>
      <div className="games-container">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <img className="games-list-image" src={game.image} alt={game.title} />
            <h2 className="title-text">{game.title}</h2>
            <p id="home-price" className="title-text">{game.price}</p>
            <div className="hover-container">
              <h3>{game.title}</h3>
              <p>test test test test test test </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
