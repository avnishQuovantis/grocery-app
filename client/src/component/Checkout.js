import React from "react";
import { useSelector } from "react-redux";
import "./css/checkout.scss";
export default function Checkout() {
  const select = useSelector((state) => state.home);
  const data = select.cart;
  let totalPrice = 0;
  return (
    <div className="mainContainer">
      <div className="checkoutPage">
        <h1>Checkout</h1>
        <div className="checkoutItems">
          <table className="table">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price </th>
              <th scope="col">QTY</th>
              <th scope="col">Total Amount</th>
            </tr>
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
          </table>
          <div class="row lastRow">
            <div class="col-5 font-weight-bold">Total price</div>
            <div class="col-5">{totalPrice}</div>
          </div>
        </div>
        <div className="checkoutAddress">
          <h4>address</h4>
          <div>{select.currUser.address}</div>
        </div>
        <button className="btn btn-outline-danger confirmBtn">Confirm</button>
      </div>
    </div>
  );
}
