import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllCartThunk, clearCartThunk, removeCartGameThunk } from "../../store/cart";
import { addGameToLibraryThunk, getAllLibraryGamesThunk } from "../../store/library"
import './ShoppingCart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  

  useEffect(() => {
    dispatch(getAllCartThunk());
  }, [dispatch]);

  
  const handleClearCart = () => {
    dispatch(clearCartThunk(cart));
  };
  
  useEffect(() => {
    if (Object.keys(cart).length === 0) {
      history.push(`/cart`);
    }
  }, [cart, history]);
  
  const handlePurchase = () => {
    Object.values(cart).forEach((game) => {
      dispatch(addGameToLibraryThunk(game));
    });
    dispatch(getAllLibraryGamesThunk())
    dispatch(clearCartThunk(cart));
    history.push(`/library`);
  };
  
  const handleRemove = async (game) => {
    dispatch(removeCartGameThunk(game.game_id));
  };
  

  return (
    <div>
      {Object.values(cart).map((game) => (
        <div className="game-card" key={game.id}>
          <img className="games-list-image" src={game.banner_image} alt={game.title} />
          <h3>{game.title}</h3>
          <p>{game.price}</p>
          <button className="remove-button" onClick={() => handleRemove(game)}>Remove</button>
        </div>
      ))}
      <button onClick={handleClearCart}>Clear Cart</button>
      <button onClick={handlePurchase}>Purchase for myself</button>
    </div>
  );
};

export default Cart;
