// const normalizer = (data) => {
//   const obj = {};
//   data.forEach((item) => {
//     obj[item.id] = item;
//   });
// return obj;
// };

const LOAD_CART = "cart_games/LOAD_CART";
const ADD_TO_CART = "cart_games/ADD_TO_CART"
const CLEAR_CART = "cart_games/CLEAR_CART";
const REMOVE_FROM_CART = "cart/REMOVE_FROM_CART"


const loadCartGames = (allCartData) => ({
  type: LOAD_CART,
  payload: allCartData
})

const addGameToCart = (newCartGame) => ({
  type: ADD_TO_CART,
  payload: newCartGame
})

const clearCart = () => ({
type: CLEAR_CART
});

const removeGameFromCart = (gameId) => ({
type: REMOVE_FROM_CART,
payload: gameId
})


// export const getAllCartThunk = () => async (dispatch) => {
//   const response = await fetch(`/api/cart`);

//   if (response.ok) {
//       const allCartData = await response.json();
//       const normalizedCartData = normalizer(allCartData);
//       dispatch(loadCartGames(normalizedCartData));
//   }
// };
export const getAllCartThunk = () => async (dispatch) => {
  const response = await fetch(`/api/cart`);

  if (response.ok) {
      const allCartData = await response.json();
      const normalizedCartData = {};
      allCartData.forEach((e) => {
        normalizedCartData[e.game_id] = e;
      })
      dispatch(loadCartGames(normalizedCartData));
  }
};

export const addToCartThunk = (gameId) => async (dispatch) => {
  console.log("!!!cart gameId:", gameId)
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ game_id: gameId }),
  });

  if (response.ok) {
      const newCartGame = await response.json();
      dispatch(addGameToCart(newCartGame));
  }
};

export const clearCartThunk = () => async (dispatch) => {
const response = await fetch(`api/cart/clear`, {
  method: "DELETE",
});

if (response.ok) {
  dispatch(clearCart());
}
};

export const removeCartGameThunk = (gameId) => async (dispatch) => {
const response = await fetch(`/api/cart/${gameId}`, {
  method: "DELETE",
});

if (response.ok) {
  dispatch(removeGameFromCart(gameId));
  dispatch(loadCartGames())
}
};

const initialState = {};

const cartReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
      case LOAD_CART:
          return { ...state, ...action.payload };
      case ADD_TO_CART:
          return { ...state, [action.payload.id]: action.payload };
      case CLEAR_CART:
          return initialState;
      case REMOVE_FROM_CART:
          delete newState[action.payload];
          return newState;
      default:
          return state;
  }
}

export default cartReducer;
