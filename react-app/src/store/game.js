const normalizer = (data) => {
    const obj = {};
    data.forEach((item) => {
      obj[item.id] = item;
    });
    return obj;
  };

  const LOAD_GAMES = "games/LOAD_GAMES";

  const loadGames = (allGameData) => ({
    type: LOAD_GAMES,
    payload: allGameData,
  });


  export const getAllGamesThunk = () => async (dispatch) => {
    const response = await fetch(`/api/games`);
  
    if (response.ok) {
      const allGameData = await response.json();
      const normalizedGameData = normalizer(allGameData);
      dispatch(loadGames(normalizedGameData));
    }
  };




const initialState = {};

const gamesReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOAD_GAMES:
          return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default gamesReducer;