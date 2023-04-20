import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartThunk } from "../../store/cart"

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getAllCartThunk());
  }, [dispatch]);

  return (
    <div>
      <h2>Cart</h2>
      {Object.values(cart).map((game) => (
        <div key={game.id}>
          <h3>{game.title}</h3>
          <img src={game.image} alt={game.title} />
          <p>{game.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;