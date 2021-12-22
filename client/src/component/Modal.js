import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
export default function Modal({ hideModal, modal, user }) {
  const modalClass = modal ? "modalContainer open" : "modalContainer close";
  const dispatch = useDispatch();
  const history = useHistory()
  console.log(user);
  const editUser = async () => {
    try {
      console.log(user);
      let newUser = await axios.patch("http://localhost:9000/updateUser",
        { email: user.email, firstName: state.firstName, lastName: state.lastName, address: state.address })
      console.log(newUser);
      if (newUser.data.user) {
        dispatch({ type: "editUser", payload: newUser.data.user });
      } else {
        alert(newUser.data.message)
      }
    } catch (err) {
      alert("error occurs")
    }
    hideModal()
  };
  const [state, setState] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
  });
  const changeInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className={modalClass}>
      <div className="modalBox">
        <button onClick={hideModal} className="btn btn-danger closeBtn">
          X
        </button>
        <div>
          <h5>First Name</h5>
          <input
            name="firstName"
            type="text"
            className="form-control"
            placeholder={user.firstName}
            value={state.firstName}
            onChange={changeInput}
          />
        </div>
        <div>
          <h5>Last Name</h5>
          <input
            value={state.lastName}
            name="lastName"
            type="text"
            class="form-control"
            onChange={changeInput}
            placeholder={user.lastName}
          />
        </div>

        <div>
          <h5>Address</h5>
          <input
            name="address"
            value={state.address}
            type="text"
            class="form-control"
            placeholder={user.address}
            onChange={changeInput}
          />
        </div>
        <button
          onClick={editUser}
          className="btn btn-success "
          id="editConfirm"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
