import React from 'react';
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
function App() {
  localStorage.setItem("currUser", null)
  return (
    <Router>
      <div className="App">
        <Heading />
        <Switch>
          <Route exact path="/"><Home></Home> </Route>
          <Route exact path="/cart"><Cart /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/signup"><Signup /></Route>
          <Route path="/catagory/:name"><Catagory /></Route>
          <Route path="/search/:search"><Search /></Route>
          <Route path="/checkout"><Checkout /></Route>
          <Route path="/item/:name"><ItemDetails /></Route>
          <Route path="/user/:user"><User /></Route>
        </Switch>
      </div>

    </Router>
  );
}

export default App;
