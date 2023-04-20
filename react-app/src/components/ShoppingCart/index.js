import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllCartThunk, clearCartThunk } from "../../store/cart";
import './ShoppingCart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  

  useEffect(() => {
    dispatch(getAllCartThunk());
  }, [dispatch]);

  const handleClearCart = () => {
    dispatch(clearCartThunk(cart));
    history.push(`/cart`)
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
      <button>Purchase for myself</button>
    </div>
  );
};

export default Cart;
