import Grocery from "../../groceries/Grocery"
import { EDIT_CART, GET_CART } from "../descriptor/descriptors";

let initialState = {
    qty: 0,
    cart: [],
    loading: true
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART:
            console.log(Grocery);
            return {
                qty: action.payload.length,
                loading: false,
                cart: action.payload,
            }

        case EDIT_CART:
            console.log("inside reducer cart ", action.payload);
            return {
                qty: action.payload.length,
                cart: action.payload
            };

        default: return state

    }
}




export default cart