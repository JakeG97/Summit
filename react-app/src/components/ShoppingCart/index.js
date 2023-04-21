import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllCartThunk, clearCartThunk } from "../../store/cart";
import { addGameToLibraryThunk } from "../../store/library";
import { refreshUser } from "../../store/session"; //TODO look into this for clearing the cart
import './ShoppingCart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  

  useEffect(() => {
    dispatch(getAllCartThunk());
  }, [dispatch]);

  const handleClearCart = async () => {
    await dispatch(clearCartThunk(cart));
    dispatch(refreshUser(sessionUser.id));
    history.push(`/cart`)
  };

  
  const handlePurchase = () => {
    dispatch(addGameToLibraryThunk());
  };

  return (
    <div>
      <h2>Cart</h2>
      {Object.values(cart).map((game) => (
        <div className="game-card" key={game.id}>
          <img className="games-list-image"src={game.banner_image} alt={game.title} />
          <h3>{game.title}</h3>
          <p>{game.price}</p>
        </div>
      ))}
      <button onClick={handleClearCart}>Clear Cart</button>
      <button onClick={handlePurchase}>Purchase for myself</button>
    </div>
  );
};

export default Cart;
