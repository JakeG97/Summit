const normalizer = (data) => {
    const obj = {};
    data.forEach((item) => {
      obj[item.id] = item;
    });
    return obj;
  };

  const LOAD_GAMES = "games/LOAD_GAMES";
  const LOAD_SINGLE_GAME = "games/LOAD_SINGLE_GAME"

  const loadGames = (allGameData) => ({
    type: LOAD_GAMES,
    payload: allGameData,
  });

  const loadSingleGame = (gameData) => ({
    type: LOAD_SINGLE_GAME,
    payload: gameData,
  });


  export const getAllGamesThunk = () => async (dispatch) => {
    const response = await fetch(`/api/games`);
  
    if (response.ok) {
      const allGameData = await response.json();
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



const initialState = {};

const gamesReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOAD_GAMES:
          return { ...state, ...action.payload };
        case LOAD_SINGLE_GAME:
          return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
};

export default gamesReducer;