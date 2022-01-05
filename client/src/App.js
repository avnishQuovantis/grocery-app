import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.scss';
import Home from './component/Home';
import Heading from './component/Heading';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Basket from './component/Basket';
import Login from './component/Login';
import Signup from './component/Signup';
import Catagory from './component/Catagory';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Cart from './component/Cart';
import Search from './component/Search';
import Checkout from './component/Checkout';

import ItemDetails from './component/ItemDetails';
import User from './component/User';
import axios from 'axios';
function App() {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart.cart)
  useEffect(async () => {
    let token = localStorage.getItem("jwt")
    console.log("inside app useffect token=>", token);
    if (token) {
      let user = await axios.post("http://localhost:9000/user", { token })
      console.log("find by token user", user);
      dispatch({ type: "getUser", payload: user.data.user })
      dispatch({ type: "getCart", payload: user.data.user.cart })
    } else {
      localStorage.setItem("jwt", null)
      dispatch({ type: "getUser", payload: null })
    }
  }, [])
  return (
    <Router>
      <div className="App">
        <Heading />
        <Switch>
          <Route exact path="/"><Home></Home> </Route>
          <Route exact path="/cart"><Cart /></Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/signup"><Signup /></Route>
          <Route exact path="/catagory/:name"><Catagory /></Route>
          <Route exact path="/search/:search"><Search /></Route>
          <Route exact path="/checkout"><Checkout /></Route>
          <Route exact path="/item/:name"><ItemDetails /></Route>
          <Route exact path="/user/:user"><User /></Route>
        </Switch>
      </div>

    </Router>
  );
}

export default App;
