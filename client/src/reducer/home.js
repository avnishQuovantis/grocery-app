import { act } from "react-dom/test-utils";
import Signup from "../component/Signup";
import data from "../groceries/data";
// import { } from "./descriptors"
import Grocery from "../groceries/Grocery"
let initialState = {
  data: [],

  currUser: null,
};
console.log(Grocery);
const home = (state = initialState, action) => {
  // console.log(action.payload);

  switch (action.type) {

    case "initialHomeData":
      console.log(action.payload);
      let arr = action.payload.map(obj => {
        let fn = Grocery[obj.filename]
        return { ...obj, filename: fn }
      })
      console.log(arr)
      return {
        ...state,
        data: arr
      }

    default:
      return state;
  }
};


export default home;
