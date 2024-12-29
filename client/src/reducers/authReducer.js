const initialState = {
    user: {},
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USER_SUCCESS":
            return { ...state, user: state.user };
        default:
            return state;
    }
};

export default authReducer;