import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import Grocery from "../groceries/Grocery"
import "./css/itemDetails.scss";
import axios from "axios";
import useBasket from "./useBasket";
export default function ItemDetails() {
  //   const location = useLocation();
  //   const { data } = location.state;
  const selector = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const param = useParams();
  const [data, setData] = useState({})
  console.log(param);
  const [addBasket, removeBasket] = useBasket()
  useEffect(async () => {
    let urlName = "http://localhost:9000/item/" + param.name
    let val = await axios.get(urlName)
    let newVal = val.data.item
    let newData = { ...newVal, filename: Grocery[newVal.filename] }
    setData(newData)
  }, [])
  console.log(data);

  return (
    <div className="itemContainer">
      <div className="itemDetails">
        <img src={data.filename} />
        <h3>{data.title}</h3>
        <div>
          ,<h5>Price : </h5>
          <span> {data.price}</span>
        </div>
        <div className="itemsRating">
          <h5>Rating:</h5>
          {data.rating} <span class="material-icons">star</span>
        </div>

        <div className="addRemoveItem">
          <button
            onClick={() => removeBasket(data)}
            className="btn btn-danger "
          >
            -
          </button>
          {/* <h5>{data.qty}</h5> */}
          <button
            onClick={() => addBasket(data)}
            className="btn btn-primary  add"
          >
            +
          </button>
        </div>
        <div>{data.description}</div>
      </div>
    </div>
  );
}
