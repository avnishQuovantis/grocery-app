import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import StarRating from "./StarRating";
import Rows from "./Rows";
import "./css/basket.scss";
import useBasket from "./useBasket";
export default function Cart() {
  const select = useSelector((state) => state.home);
  const data = select.cart;
  let totalPrice = 0;
  const history = useHistory();
  const [addBasket, removeBasket, deleteItem] = useBasket();
  const checkoutPage = () => {
    let val = "/checkout";
    if (select.currUser == null) {
      alert("login first");
      val = "/login";
    }
    history.push(val);
  };
  const handleChild = e => {
    e.stopPropagation();
  }
  const deleteBtn = (e, obj) => {
    e.stopPropagation();
    deleteItem(obj);
  }
  return (
    <div className="basketPage">
      <div className="cartItems">
        <h1 data-testid="cartHeading" className="cartItems__heading">Cart</h1>
        {data.length == 0 ? (
          <span style={{ fontSize: "5rem" }} className="material-icons">remove_shopping_cart</span>
        ) : (


          data.map((obj) => {
            return (

              <div data-testid="rowsData" className="cart" onClick={() => history.push({ pathname: `/item/${obj.title}`, state: { data: obj } })}>
                <div className="cart__titleBtn" onClick={handleChild}>
                  <img src={obj.filename} />
                  <div className="cart__titleBtn-addCart" >
                    <button
                      onClick={() => removeBasket(obj)}
                      className="btn btn-danger cart__titleBtn-addCart-btn"
                      
                    >
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-dash" viewBox="0 0 16 16">
  <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg>
                    </button>
                      <span className="cart__titleBtn-addCart-btn-qty">{obj.qty}</span>
                    <button
                      onClick={() => addBasket(obj)}
                      className="btn btn-success cart__titleBtn-addCart-btn"
                      
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
                      </svg>
                    </button>

                  </div>

                </div>
                <h6 data-testid="rowtitle" className="cart__title">{obj.title}</h6>
                {/* <div className="qtyPrice"> */}
                <span className="cart__price">
                  <span className="cart__price-mrp" >{parseFloat(obj.price + (obj.price / 8)).toFixed(2)}</span> {obj.price}
                </span>


                <div className="cart__rating">
                  <StarRating rating={obj.rating} />

                </div>
                <button className="btn btn-danger cart__deleteBtn" onClick={e => deleteBtn(e, obj)} >
                  <i class="fa fa-trash-o"></i>
                </button>
              </div>

            );
          })


          // <div className="addRemove">
          //   <button
          //     onClick={() => removeBasket(obj)}
          //     className="btn btn-danger addCart"
          //   >
          //     -
          //   </button>
          //   <h6>{obj.qty}</h6>
          //   <button
          //     onClick={() => addBasket(obj)}
          //     className="btn btn-primary addCart add"
          //   >
          //     +
          //   </button>
          // </div>


        )}
      </div>
      <div className="amountDetail">
        <h2>Amount details</h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price </th>
              <th scope="col">QTY</th>
              <th scope="col">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((obj) => {
              totalPrice = totalPrice + obj.qty * obj.price;
              return (
                <tr>
                  <th scope="row">{obj.title}</th>
                  <td>{obj.price}</td>
                  <td>{obj.qty}</td>
                  <td>{obj.qty * obj.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div class="row lastRow">
          <div class="col-5">Total price</div>
          <div class="col-5">{totalPrice}</div>
        </div>

        <button className="btn btn-danger checkoutBtn" onClick={checkoutPage}>
          Checkout
        </button>
      </div>
    </div>
  );
}
