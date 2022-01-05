import React from 'react'
import { combineReducers } from 'redux'
import home from './reducers/home'
import cart from "./reducers/cart"
import auth from './reducers/auth'
// import shop from './shop'
export default combineReducers({
    home,
    cart,
    auth
})