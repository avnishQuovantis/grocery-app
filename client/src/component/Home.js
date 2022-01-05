import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import data from "../groceries/data"
import "./css/Home.scss";
import Search from "./Search";
import Item from "./Item";
import Rows from "./Rows";
import axios from "axios"
export default function Home({ addBasket, removeBasket }) {
  let state = useSelector((state) => state.home);
  let dispatch = useDispatch();

  console.log(state.currUser);
  const history = useHistory()
  useEffect(async () => {
    let val = await axios.get("http://localhost:9000")
    let data = val.data.data
    dispatch({ type: "initialHomeData", payload: data })
  }, [])

  const allGroceries = [...state.data];

  return (
    <div className="mainContainer">


      <div className="banner">
        <div className="banner__text">
          <h1 className=" banner__text-heading">Stay Healthy</h1>
          <p className="banner__text-quote">you don't have to eat less you just need to eat right</p>
          {/* <button className="btn btn-outline-secondary banner__text-button">click to visit -></button> */}

        </div>
      </div>

      <div className="offers">
        <div className="offers__btn offers__btn-1">
          <div className="offers__btn-text offers__btn-1-text">
            <span className="offers__btn-text-small">take a quick look  </span>
            <span className="offers__btn-text-big"><span className="offers__btn-text-highlight highlight-1">100%</span> fresh vegetables</span>
            <button onClick={() => history.push("/catagory/vegetable")} type="button" class="offers__btn-button">Show Now</button>
          </div>

        </div>
        <div className="offers__btn offers__btn-2">
          <div className="offers__btn-text offers__btn-2-text">
            <span className="offers__btn-text-small">Fresh Fruits </span>
            <span className="offers__btn-text-big">Upto
              <span className="offers__btn-text-highlight highlight-2">18%</span> Off</span>
            <button onClick={() => history.push("/catagory/fruit")} type="button" class=" offers__btn-button ">Show Now</button>
          </div>

        </div>
        <div className="offers__btn offers__btn-3">
          <div className="offers__btn-text offers__btn-3-text">
            <span className="offers__btn-text-small">Fresh Dairy available </span>
            <span className="offers__btn-text-big">
              <span className="offers__btn-text-highlight highlight-3">100%</span> Natural </span>
            <button onClick={() => history.push("/catagory/dairy")} type="button" class=" offers__btn-button ">Shop Now</button>
          </div>
        </div>
        <div className="offers__btn offers__btn-4">
          <div className="offers__btn-text offers__btn-4-text">
            <span className="offers__btn-text-small">freshly Baked </span>
            <span className="offers__btn-text-big">Upto
              <span className="offers__btn-text-highlight highlight-4">18%</span> Off</span>
            <button onClick={() => history.push("/catagory/bakery")} type="button" class=" offers__btn-button ">Shop Now</button>
          </div>
        </div>
      </div>
      {/* <div className="catagory">
        <button className="btn" onClick={() => history.push("/catagory/fruit")}>
          <div className="catagoryItem">
            <img src="https://tvm.biggro.com/content/images/thumbs/0007367_fresh-fruits_300.jpeg" />
            <h5>Fruits</h5>
          </div>
        </button>
        <button className="btn" onClick={() => history.push("/catagory/vegetable")}>
          <div className="catagoryItem">

            <img src="https://media.istockphoto.com/photos/variety-of-fresh-organic-vegetables-and-fruits-in-the-garden-picture-id1280856062?b=1&k=20&m=1280856062&s=170667a&w=0&h=wQu-c2ZjzeCBkAGEj69xpF611lx1i_xim48vOCj_Dw0=" />
            <h5>vegetables</h5>
          </div>
        </button>
        <button className="btn" onClick={() => history.push("/catagory/dairy")}>
          <div className="catagoryItem">
            <img src="https://www.dairyfoods.com/ext/resources/DF/2020/August/df-100/GettyImages-1194287257.jpg?1597726305" />
            <h5>diary</h5>
          </div>
        </button>
        <button className="btn" onClick={() => history.push("/catagory/meat")}>
          <div className="catagoryItem">
            <img src="https://images.ctfassets.net/3s5io6mnxfqz/5GlOYuzg0nApcehTPlbJMy/140abddf0f3f93fa16568f4d035cd5e6/AdobeStock_175165460.jpeg?fm=jpg&w=900&fl=progressive" />
            <h5>Meat</h5>
          </div>
        </button>
        <button className="btn" onClick={() => history.push("/catagory/bakery")}>
          <div className="catagoryItem">
            <img src="https://4.imimg.com/data4/JF/DD/MY-6467687/multi-grain-bread-500x500.png" />
            <h5>Bakery</h5>
          </div>
        </button> */}
      {/* <h5>Meat</h5> */}
      {/* </div> */}
      <div className="groceryList">
        <h5 className="groceryList__heading">Top Rated</h5>

        <Rows
          data={allGroceries.filter((obj) => {
            return obj.rating > 4;
          })}
        />
      </div>
      <div className="groceryList">
        <h5 className="groceryList__heading">Lowest Price</h5>
        <Rows
          data={allGroceries.filter((obj) => {
            return obj.price < 14;
          })}
        />
      </div>
      {/* </>
      )} */}
    </div>
  );
}
