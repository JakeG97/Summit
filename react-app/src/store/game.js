const normalizer = (data) => {
    const obj = {};
    data.forEach((item) => {
      obj[item.id] = item;
    });
  return obj;
};

  const LOAD_GAMES = "games/LOAD_GAMES";
  const LOAD_SINGLE_GAME = "games/LOAD_SINGLE_GAME"
  const CREATE_GAME = "games/CREATE_GAME"

  const loadGames = (allGameData) => ({
    type: LOAD_GAMES,
    payload: allGameData,
  });

  const loadSingleGame = (gameData) => ({
    type: LOAD_SINGLE_GAME,
    payload: gameData,
  });

  const createGame = (game) => ({
    type: CREATE_GAME,
    payload: game
  });

  export const getAllGamesThunk = () => async (dispatch) => {
    const response = await fetch(`/api/games`);
  
    if (response.ok) {
      const allGameData = await response.json();
      // console.log("HEY LOOK HERE", allGameData)
      const normalizedGameData = normalizer(allGameData);
      dispatch(loadGames(normalizedGameData));
    }
  };

  export const getSingleGameThunk = (gameId) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}`);
  
    if (response.ok) {
      const gameData = await response.json();
      dispatch(loadSingleGame(gameData));
    }
  };

  export const createGameThunk = (formData) => async (dispatch) => {
    try {
      const response = await fetch('/create_game', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const newGame = await response.json();
        dispatch(createGame(newGame));
      } else {
        throw new Error('Failed to create game.');
      }
    } catch (error) {
      console.log("Error:", error);
      throw new Error('An unexpected error occurred.');
    }
  };



const initialState = {};

const gamesReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOAD_GAMES:
          return { ...state, ...action.payload };
        case LOAD_SINGLE_GAME:
          return { ...state, [action.payload.id]: action.payload };
        case CREATE_GAME:
          return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
};

export default gamesReducer;