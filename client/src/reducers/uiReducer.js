const initialState = {
    ui: {},
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NAVIGATE_TO":
            return state;
        default:
            return state;
    }
};

export default uiReducer;