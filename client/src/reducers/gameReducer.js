const initialState = {
    games: [],
    game: []
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_GAME_SUCCESS":
            return Object.assign({ ...state });
        case "GET_GAMES_SUCCESS":
            return Object.assign({ ...state, games: action.data });
        case "GET_GAME_SUCCESS":
            return Object.assign({ ...state, game: action.data });

        default:
            return state;
    }
};

export default gameReducer;