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

const loadLibrary = (allLibraryData) => ({
  type: LOAD_LIBRARY,
  payload: allLibraryData,
});

const addToLibrary = (newLibraryGame) => ({
  type: ADD_TO_LIBRARY,
  payload: newLibraryGame,
});

const removeFromLibrary = (gameId) => ({
  type: REMOVE_FROM_LIBRARY,
  payload: gameId,
})

const updateLibrary = (updatedGameData) => ({
  type: UPDATE_LIBRARY_GAME,
  payload: updatedGameData,
});


export const getAllLibraryGamesThunk = () => async (dispatch) => {
  const response = await fetch('/api/library');

  if (response.ok) {
    const allLibraryData = await response.json();
    const normalizedLibraryData = {}
    allLibraryData.forEach((e) => {
      normalizedLibraryData[e.id] = e;
    })
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

export const removeGameThunk = (gameId) => async (dispatch) => {
  const response = await fetch(`/api/library/${gameId}`, {
    method: "DELETE",
  })

  if (response.ok) {
    dispatch(removeFromLibrary(gameId))
  }
}

// export const updatedGameThunk = (newGameData, gameId) => async (dispatch, getState) => {
//   try {
//     const response = await fetch(`/api/library/${gameId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newGameData),
//     });
//     const data = await response.json();
//     console.log('Received updated game data:', data);
//     dispatch(updateLibrary({ [data.game_id]: data }));
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updatedGameThunk = (newGameData, gameId) => async (dispatch) => {
//   try {
//     console.log('updating game:', gameId);
//     console.log('new game data:', newGameData);
//     const response = await fetch(`/api/library/${gameId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newGameData),
//     });
//     const data = await response.json();
//     console.log('Received updated game data:', data);
//     console.log('updated game:', data);
//     const normalizedLibraryData = { [data.id]: data };
//     console.log('Normalized game data:', normalizedLibraryData);
//     dispatch(updateLibrary(normalizedLibraryData));
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };


//! WORKING JUST GOES BACK TO OLD DATA ON REFRESH
export const updatedGameThunk = (newGameData, gameId) => async (dispatch) => {
  try {
    console.log('updating game:', gameId);
    console.log('new game data:', newGameData);
    const response = await fetch(`/api/library/${gameId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGameData),
    });
    const data = await response.json();
    console.log('Received updated game data:', data);

    // Create normalized data object with correct structure
    const normalizedLibraryData = {
      [data.game.id]: {
        id: data.game.id,
        title: data.game.title,
        banner_image: data.game.banner_image,
      },
    };
    console.log('Normalized game data:', normalizedLibraryData);

    dispatch(updateLibrary(normalizedLibraryData));
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const updatedGameThunk = (newGameData, gameId) => async (dispatch) => {
//   try {
//     console.log('updating game:', gameId);
//     console.log('new game data:', newGameData);
//     const response = await fetch(`/api/library/${gameId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newGameData),
//     });
//     const data = await response.json();
//     console.log('Received updated game data:', data);

    
//     dispatch(updateLibrary({ [data.id]: data }));

//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };





const initialState = {};

const libraryReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case LOAD_LIBRARY:
      return { ...state, ...action.payload };
    case ADD_TO_LIBRARY:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_LIBRARY_GAME:
      console.log('Updating game in reducer:', action.payload);
      return {
        ...state,
        ...action.payload,
      };
    case REMOVE_FROM_LIBRARY:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default libraryReducer;
