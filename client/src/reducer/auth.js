let initialState = {
    currUser: null,
};

const auth = (state = initialState, action) => {
    console.log(state.currUser);
    console.log(state.data);
    switch (action.type) {
        case "getUser":
            console.log(action.payload);

            return {
                ...state,
                currUser: action.payload
            }
        case "login":
            localStorage.setItem("jwt", action.payload.token)
            console.log("login auth", action.payload);
            return {
                ...state,
                currUser: action.payload.user,
            };
        case "signup":
            localStorage.setItem("jwt", action.payload.token)

            return state

        case "signout":
            localStorage.setItem("jwt", null)
            return {
                ...state,
                currUser: null,
            };
        case "editUser":
            let newUser = action.payload
            return {
                ...state,
                currUser: newUser,
            };

        default:
            return state;
    }
};


export default auth;
