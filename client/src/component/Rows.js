import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./css/rows.scss";
import "./StarRating"
import StarRating from "./StarRating";
import useBasket from "./useBasket";
export default function Rows({ data }) {

  console.log(data);
  const history = useHistory()
  const dispatch = useDispatch();
  const [addBasket, removeBasket, deleteItem] = useBasket();

  const handleChild = e => {
    e.stopPropagation();
  }
  return (
    <div className="groceryList__list" data-testid="rowsList">
      {data.map((obj) => {
        return (

          <div data-testid="rowsData" className="catagoryRows" onClick={() => history.push({ pathname: `/item/${obj.title}`, state: { data: obj } })}>
            <div className="catagoryRows__titleBtn" onClick={handleChild}>
              <img src={obj.filename} />
              <div className="titleBtn-addCart" >
                <button
                  onClick={() => addBasket(obj)}
                  className="btn btn-success titleBtn-addCart-btn"

                >
                  <span className="titleBtn-addCart-btn-qty">{obj.qty}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
                  </svg>
                </button>
              </div>

            </div>
            <h6 data-testid="rowtitle" className="catagoryRows__title">{obj.title}</h6>
            {/* <div className="qtyPrice"> */}
            <span className="catagoryRows__price">
              <span className="catagoryRows__price-mrp" >{parseFloat(obj.price + (obj.price / 8)).toFixed(2)}</span> {obj.price}
            </span>


            <div className="catagoryRows__rating">
              <StarRating rating={obj.rating} />
              {/* {obj.rating} <span class="material-icons">star</span> */}
            </div>

          </div>

        );
      })}
    </div>
  );
}
