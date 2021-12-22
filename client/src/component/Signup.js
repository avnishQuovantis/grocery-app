import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import "./css/loginSignup.scss";
// import axios from "axios"
export default function Signup() {
  const selector = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
  });
  const changeInput = (e) => {
    // console.log(e.target.name,e.target.value);
    setState({ ...state, [e.target.name]: e.target.value });
  };

  //   console.log(localStorage.getItem("abc@gmail.com")==null)
  const submitButton = async () => {
    let userDetails = { firstName: state.firstName, lastName: state.lastName, email: state.email, password: state.password, address: state.address }
    let obj = await axios.post("http://localhost:9000/signup", userDetails)
    let user = obj.data.user
    console.log(obj);
    if (user == null) {
      console.log("email is null");
      alert("this email already exist please try another email")
      history.push("/signup")
    } else {
      alert("Successfully signup")
      dispatch({ type: "signup", payload: user });
      history.push("/login");
    }
    setState({ firstName: "", lastName: "", email: "", password: "", address: "" });
  };
  return (
    <div className="login signup ">
      <h1 data-testid="signupTitle">SignUp</h1>
      <div>
        <h5>First Name</h5>
        <input
          name="firstName"
          type="text"
          value={state.firstName}
          class="form-control"
          placeholder="fname"
          onChange={changeInput}
        />
      </div>
      <div>
        <h5>Last name</h5>
        <input
          name="lastName"
          type="text"
          value={state.lastName}
          class="form-control"
          placeholder="lname"
          onChange={changeInput}
        />

      </div>
      <div>
        <h5>Email</h5>
        <input
          name="email"
          type="email"
          value={state.email}
          class="form-control"
          placeholder="email"
          onChange={changeInput}
        />
      </div>
      <div>
        <h5>Password</h5>
        <input
          name="password"
          value={state.password}
          type="password"
          class="form-control"
          placeholder="password"
          onChange={changeInput}
        />
      </div>
      <div>
        <h5>Address</h5>
        <input
          name="address"
          type="text"
          value={state.address}
          class="form-control"
          placeholder="address"
          onChange={changeInput}
        />
      </div>

      <button className="btn btn-danger" onClick={submitButton}>
        submit
      </button>
    </div>
  );
}
