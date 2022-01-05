let initialState = {
    qty: 0,
    cart: []
}
const cart = (state = initialState, action) => {
    switch (action.type) {
        case "getCart":
            console.log("initial cart length ", action.payload.length);
            return {
                qty: action.payload.length,
                cart: action.payload,
            }
        case "addInBasket":
            console.log("inside cart addInBasket", action.payload);
            console.log(action.payload)
            return {
                qty: state.cart.length,
                cart: [...action.payload]
            };
        case "removeFromBasket":

            //    let quantityNo=state.qty>0?state.qty-1:
            console.log("inside cart removeFromBasket ", action.payload);
            console.log(action.payload);
            return {
                qty: state.cart.length,
                cart: [...action.payload]
            }
        case "deleteItem":
            console.log("inside cart deleteFromBasket", action.payload);
            console.log(action.payload);
            return {

                qty: state.cart.length,
                cart: action.payload
            }
        default: return state

    }
}


function increaseQuantity(array, action) {
    let temp = [];
    console.log(array, action);
    for (let i = 0; i < array.length; i++) {
        let obj = array[i];
        if (array[i].id == action.payload.id) {
            obj = { ...array[i], qty: array[i].qty + 1 };
            temp[i] = obj;
        } else {
            temp[i] = obj;
        }
    }
    return temp;
}
function decreaseQuantity(array, action) {
    let temp = [];
    for (let i = 0; i < array.length; i++) {
        let obj = array[i];
        if (array[i].id == action.payload.id) {
            obj = { ...array[i], qty: array[i].qty > 0 ? array[i].qty - 1 : 0 };
            temp[i] = obj;
        } else {
            temp[i] = obj;
        }
    }
    return temp;
}

function removeFromCart(array, action) {
    let temp = array.filter((obj) => {
        return obj.id != action.payload.id;
    });
    return temp;
}

export default cart