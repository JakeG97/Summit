const LOAD_LIBRARY = 'library/LOAD_LIBRARY';
const ADD_TO_LIBRARY = 'library/ADD_TO_LIBRARY';
const UPDATE_LIBRARY_GAME = 'library/UPDATE_LIBRARY_GAME';
const REMOVE_FROM_LIBRARY = 'library/REMOVE_FROM_LIBRARY';

const loadLibrary = (allLibraryData) => ({
  type: LOAD_LIBRARY,
  payload: allLibraryData,
});

const addToLibrary = (newLibraryGame) => ({
  type: ADD_TO_LIBRARY,
  payload: newLibraryGame,
});

const removeFromLibrary = (gameId) => {
  console.log('removeFromLibrary called with gameId', gameId);
  return {
    type: REMOVE_FROM_LIBRARY,
    payload: gameId,
  };
}

// const updateLibrary = (libraryData) => ({
//   type: UPDATE_LIBRARY_GAME,
//   payload: {
//     libraryData,
//     gameId: libraryData.id,
//   },
// });

const updateLibrary = (libraryData) => ({
  type: UPDATE_LIBRARY_GAME,
  payload: libraryData,
});




export const getAllLibraryGamesThunk = () => async (dispatch) => {
  const response = await fetch('/api/library');

  if (response.ok) {
    const allLibraryData = await response.json();
    const normalizedLibraryData = {};
    allLibraryData.forEach((e) => {
        normalizedLibraryData[e.game_id] = e;
    });
    dispatch(loadLibrary(normalizedLibraryData));
  }
};


export const addToLibraryThunk = (gameId) => async (dispatch) => {
  console.log('gameId:', gameId);
  const response = await fetch(`/api/cart/add-to-library`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ game_id: gameId }),
  })

  if (response.ok) {
    const newLibraryGame = await response.json();
    dispatch(addToLibrary(newLibraryGame));
  }
};


export const removeGameThunk = (gameId) => async (dispatch) => {
  const response = await fetch(`/api/library/${gameId}`, {
    method: "DELETE",
  })

  if (response.ok) {
    console.log('removeGameThunk dispatching removeFromLibrary action with gameId', gameId);
    dispatch(removeFromLibrary(gameId))
  }
}


export const updatedGameThunk = (game, gameId) => async (dispatch, getState) => {
  const response = await fetch(`/api/library/${gameId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });

  if (response.ok) {
    const data = await response.json();
    const libraryState = getState().library;

    for (let key in libraryState) {
      if (libraryState.hasOwnProperty(key) && libraryState[key].id === data.id) {
        libraryState[key].title = data.title;
        libraryState[key].banner_image = data.banner_image;
        break;
      }
    }

    dispatch(updateLibrary(libraryState));
    dispatch(getAllLibraryGamesThunk());
  }
};



const initialState = {};

const libraryReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case LOAD_LIBRARY:
      return { ...action.payload };
    // return { ...state, ...action.payload };
    case ADD_TO_LIBRARY:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_LIBRARY_GAME:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_FROM_LIBRARY:
      // console.log('Removing game from library', action.payload);
      delete newState[action.payload];
      // console.log('New library state', newState);
      return newState;
    default:
      return state;
  }
};

export default libraryReducer;
