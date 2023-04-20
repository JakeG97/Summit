const normalizer = (data) => {
  const obj = {};
  data.forEach((item) => {
    obj[item.id] = item;
  });
return obj;
};


const LOAD_LIBRARY = 'library/LOAD_LIBRARY';
const ADD_TO_LIBRARY = 'library/ADD_TO_LIBRARY';
const UPDATE_LIBRARY_GAME = 'library/UPDATE_LIBRARY_GAME';
const REMOVE_FROM_LIBRARY = 'library/REMOVE_FROM_LIBRARY';

export const loadLibrary = (allLibraryData) => ({
  type: LOAD_LIBRARY,
  payload: allLibraryData,
});

export const addToLibrary = (newLibraryGame) => ({
  type: ADD_TO_LIBRARY,
  payload: newLibraryGame,
});

export const getAllLibraryGamesThunk = () => async (dispatch) => {
  const response = await fetch('/api/library');

  if (response.ok) {
    const allLibraryData = await response.json();
    const normalizedLibraryData = normalizer(allLibraryData)
    dispatch(loadLibrary(normalizedLibraryData));
  }
};

export const addGameToLibraryThunk = (gameId) => async (dispatch) => {
  const response = await fetch('/api/cart/add-to-library', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ game_id: gameId }),
  });

  if (response.ok) {
    const game = await response.json();
    dispatch(addToLibrary(game));
  }
};


const initialState = {};

const libraryReducer = (state = initialState, action) => {
  let newState = { ...state}
  switch (action.type) {
    case LOAD_LIBRARY:
      return { ...state, ...action.payload };
    case ADD_TO_LIBRARY:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};

export default libraryReducer;
