import React, { useEffect, useState } from "react";
import "./css/catagory.scss";
// import { useHistory } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";
import axios from "axios";
// import { AddBasket } from './functions';
import Item from "./Item";
import Rows from "./Rows";
export default function Catagory() {
  const param = useParams();
  const select = useSelector((state) => state.home);
  const dispatch = useDispatch()

  useEffect(async () => {
    let url = "http://localhost:9000/catagory/" + param.name
    let val = await axios.get(url)
    let data = val.data.data
    dispatch({ type: "initialHomeData", payload: data })
  }, [])
  let items = [...select.data]
  const [btnState, setBtnState] = useState({
    priceUp: false,
    priceDown: false,
    rateUp: false,
    rateDown: false,
  });
  const priceBtn = (val) => {
    let obj = [];
    for (let i in btnState) {
      obj[i] = false;
    }
    obj[val] = !btnState[val];
    setBtnState(obj);
  };

  if (btnState.priceUp) {
    let obj = items.sort((a, b) => {
      return a.price - b.price;
    });
    items = obj;
  } else if (btnState.priceDown) {
    let obj = items.sort((a, b) => {
      return b.price - a.price;
    });
    items = obj;
  } else if (btnState.rateUp) {
    let obj = items.sort((a, b) => {
      return a.rating - b.rating;
    });
    items = obj;
  }
  if (btnState.rateDown) {
    let obj = items.sort((a, b) => {
      return b.ratinig - a.rating;
    });
    items = obj;
  }

  return (
    <div className="mainContainer">
      {console.log(items)}
      {/* <div className="leftCatagory">
        <div>
          <button
            className="btn btn-dark"
            name="priceUp"
            onClick={() => priceBtn("priceUp")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-up"
              viewBox="0 0 16 16"
            >
              <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
            </svg>
          </button>
          <span>price</span>

          <button
            className="btn btn-dark"
            name="priceDown"
            onClick={() => priceBtn("priceDown")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-down"
              viewBox="0 0 16 16"
              name="priceDown"
            >
              <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
            </svg>
          </button>
        </div>
        <div>
          <button
            className="btn btn-outline-secondary"
            name="ratingUp"
            onClick={() => priceBtn("rateUp")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-up"
              viewBox="0 0 16 16"
              name="ratingUp"
            >
              <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
            </svg>
          </button>
          <span>Rating</span>
          <button
            className="btn btn-dark"
            name="ratingDown"
            onClick={() => priceBtn("rateDown")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-down"
              viewBox="0 0 16 16"
              name="ratingDown"
            >
              <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
            </svg>
          </button>
        </div> */}
      {/* <button className="btn btn-secondary">reset</button> */}
      {/* </div> */}
      {/* <Item items={items} /> */}

      <Rows data={items} />

    </div>
  );
}
