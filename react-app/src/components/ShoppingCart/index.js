import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
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
    <div className="cart">
      <h2 className="cart-title">YOUR SHOPPING CART</h2>
      {Object.values(cart).map((game) => (
        <div className="game-card-cart" key={game.id}>
          <img className="games-cart-image" src={game.banner_image} alt={game.title} />
          <h2 className="cart-game-titles">{game.title}</h2>
          <div className="price-remove-container">
            <p className="cart-game-price">{game.price}</p>
            <button className="remove-button" onClick={() => handleRemove(game)}>Remove</button>
          </div>
        </div>
      ))}
      {Object.keys(cart).length !== 0 && (
        <div className="total-card">
          <p className="total-math">Estimated Total: TBC</p>
          <button id="purchase-button" className="add-button" onClick={handlePurchase}>Purchase for myself</button>
        </div>
      )}
      <div>
        <Link id="continue-shopping-cart" to="/" className="post-review-button">Continue Shopping</Link>
        <button className="clear-cart" onClick={handleClearCart}>Remove all items</button>
      </div>
    </div>
  );
};

export default Cart;
