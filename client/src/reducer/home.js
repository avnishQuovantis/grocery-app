import { act } from "react-dom/test-utils";
import Signup from "../component/Signup";
import data from "../groceries/data";

let initialState = {
  data: data,
  qty: 0,
  cart: [],
  currUser: null,
};
console.log(initialState.currUser);
const home = (state = initialState, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case "addInBasket":
      let arr = [];
      let basketObj = [];
      let isPresent = state.cart.find((obj) => {
        return obj.id == action.payload.id;
      });
      if (isPresent == undefined) {
        //    let obj={...action.payload,qty:1}
        basketObj = [...state.cart, { ...action.payload, qty: 1 }];
      } else {
        basketObj = increaseQuantity(state.cart, action);
      }
      arr = increaseQuantity(state.data, action);
      return {
        ...state,
        data: arr,
        qty: state.qty + 1,
        cart: basketObj,
      };
    case "removeFromBasket":
      let arr2 = [];
      let cartObj = [];
      if (action.payload.qty == 1) {
        cartObj = removeFromCart(state.cart, action);
      } else {
        cartObj = decreaseQuantity(state.cart, action);
      }

      arr2 = decreaseQuantity(state.data, action);
      //    let quantityNo=state.qty>0?state.qty-1:
      return {
        ...state,
        data: arr2,
        qty: state.qty > 0 ? state.qty - 1 : 0,
        cart: cartObj,
      };

    case "login":
      console.log(action.payload);
      return {
        ...state,
        currUser: action.payload,
      };
    case "signup":
      let email = action.payload.email;
      let value = JSON.stringify(action.payload);
      localStorage.setItem(email, value);

    case "signout":
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
    case "deleteItem":
      let newObj = removeFromCart(state.cart, action);
      let newObj2 = state.data.map(obj => {
        if (obj.id == action.payload.id) {
          return { ...obj, qty: 0 };
        } else {
          return obj
        }
      })
      return {
        data: newObj2,
        qty: state.qty - action.payload.qty,
        cart: newObj
      }
    default:
      return state;
  }
};

function increaseQuantity(array, action) {
  let temp = [];
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
export default home;
