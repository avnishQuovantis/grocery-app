import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function Item({ items }) {
  const history = useHistory();
  const dispatch = useDispatch();
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
    <div className="catagoryContainer">
      {items.map((obj) => {
        return (
          <div data-testid="itemlist" className="catagoryItems">
            <button
              className="btn titleItemDetailBtn"
              onClick={() => history.push(`/item/${obj.title}`)}
            >
              {" "}
              <img src={obj.filename} />
              <h5>{obj.title}</h5>
            </button>

            <span>
              <b>price</b> : {obj.price}
            </span>

            <div className="addRemove">
              <b>Qty : </b>
              <button
                onClick={() => removeBasket(obj)}
                className="btn btn-danger addCart"
              >
                -
              </button>
              {obj.qty}
              <button
                onClick={() => addBasket(obj)}
                className="btn btn-primary addCart add"
              >
                +
              </button>
            </div>
            <div className="ratingItems">
              <span>Rating:</span>
              {obj.rating} <span class="material-icons">star</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
