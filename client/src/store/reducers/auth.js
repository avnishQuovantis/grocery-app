import { LOGIN, SIGN_UP, SIGN_OUT, GET_USER, EDIT_USER, LOADING, } from "../descriptor/descriptors";

let initialState = {
    loading: true,
    currUser: null,
    error: false
};

const auth = (state = initialState, action) => {
    console.log(state.currUser);
    console.log(state.data);
    switch (action.type) {
        case GET_USER:
            console.log(action.payload);

            return {
                ...state,
                currUser: action.payload,
                loading: false
            }

        case LOGIN:
            localStorage.setItem("jwt", action.payload.token)
            console.log("login auth", action.payload);
            return {
                ...state,
                currUser: action.payload.user,
            };
        case SIGN_UP:
            localStorage.setItem("jwt", action.payload.token)

            return state

        case SIGN_OUT:
            localStorage.setItem("jwt", null)
            return {
                ...state,
                currUser: null,
            };
        case EDIT_USER:
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
