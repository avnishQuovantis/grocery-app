import React from 'react'
import { combineReducers } from 'redux'
import home from './home'
import cart from "./cart"
import auth from './auth'
// import shop from './shop'
export default combineReducers({
    home,
    cart,
    auth
})