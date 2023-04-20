const normalizer = (data) => {
    const obj = {};
    data.forEach((item) => {
      obj[item.id] = item;
    });
  return obj;
};

const LOAD_CART = "cart_games/LOAD_CART";
const ADD_TO_CART = "cart_games/ADD_TO_CART"


const loadCartGames = (allCartData) => ({
    type: LOAD_CART,
    payload: allCartData
})

const addGameToCart = (newCartGame) => ({
    type: ADD_TO_CART,
    payload: newCartGame
})


export const getAllCartThunk = () => async (dispatch) => {
    const response = await fetch(`/api/cart`);

    if (response.ok) {
        const allCartData = await response.json();
        const normalizedCartData = normalizer(allCartData);
        dispatch(loadCartGames(normalizedCartData));
    }
};

export const addToCartThunk = (gameId) => async (dispatch) => {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ game_id: gameId }),
    });
  
    if (response.ok) {
      const { success } = await response.json();
      console.log(success);
      const response2 = await fetch(`/api/cart`);
      if (response2.ok) {
        const newCartGame = await response2.json();
        dispatch(addGameToCart(newCartGame));
        dispatch(loadCartGames(normalizer(newCartGame)));
      }
    }
  };



const initialState = {};

const cartReducer = (state = initialState, action) => {
    let newState = { ...state}
    switch (action.type) {
        case LOAD_CART:
            return { ...state, ...action.payload };
        case ADD_TO_CART:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
}

export default cartReducer;
