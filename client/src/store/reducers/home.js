import Grocery from "../../groceries/Grocery"
import { GET_DATA } from "../descriptor/descriptors";
let initialState = {
  data: [],

  currUser: null,
};
console.log(Grocery);
const home = (state = initialState, action) => {
  // console.log(action.payload);

  switch (action.type) {

    case GET_DATA:
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
