const initialState = {
    user: {},
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USER_SUCCESS":
            return Object.assign({ ...state, user: action.data });
        default:
            return state;
    }
};

export default authReducer;