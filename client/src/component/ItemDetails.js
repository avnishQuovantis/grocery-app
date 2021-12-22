import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import "./css/itemDetails.scss";
export default function ItemDetails() {
  //   const location = useLocation();
  //   const { data } = location.state;
  const selector = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const param = useParams();
  const data = selector.data.find((obj) => {
    return obj.title == param.name;
  });
  console.log(data);
  const addBasket = (obj) => {
    dispatch({
      type: "addInBasket",
      payload: obj,
    });
  };
  const removeBasket = (obj) => {
    dispatch({
      type: "removeFromBasket",
      payload: obj,
    });
  };
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
          <h5>{data.qty}</h5>
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
