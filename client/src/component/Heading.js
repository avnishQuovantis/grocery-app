import React, { useState } from "react";
import "./css/heading.scss";
// import {Link}
import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "./Home";
export default function Heading() {
  let state = useSelector((state) => state.home);
  let dispatch = useDispatch();
  // let { name } = useParams();
  const history = useHistory();
  const [search, setSearch] = useState("");
  console.log(state);
  const searchButton = () => {
    history.push(`/search/${search}`);
  };
  const [open, setOpen] = useState(false);
  let user = state.currUser;
  const searchItem = (e) => {
    setSearch(e.target.value);
    // dispatch({type:"search",payload:e.target.value})
    if (e.target.value == "") {
      history.push("/");
    }
  };
  const headingBtn = (val) => {
    history.push(val);
  };
  console.log(user);
  return (
    <div className="headContainer">
      <div className="logo head">
        <button className="btn" onClick={() => headingBtn("/")}>
          Grocery
        </button>
      </div>
      {/* <input className="form-control" placeholder="search" type="text"/> */}
      <div class="input-group  searchInput">
        <input
          data-testid="search"
          type="text"
          class="form-control"
          placeholder="Search"
          value={search}
          aria-describedby="button-addon2"
          onChange={(e) => searchItem(e)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              searchButton(e);
            }
          }}
        />
        <button
          class="btn btn-primary"
          type="button"
          id="button-addon2"
          onClick={searchButton}
          data-testid="searchBtn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </div>
      <div className="menuBar head">
        {/* <button className="btn basketIcon" onClick={() => headingBtn("/cart")}> */}

        <button
          data-testid="basket"
          type="button"
          class="btn basket "
          onClick={() => headingBtn("/cart")}
        >
          <span className="Qty">{state.qty}</span>

          <svg
            id="basketIcon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-basket"
            viewBox="0 0 16 16"
          >
            <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />
          </svg>
        </button>
        {/* </button> */}
        <div className="dropBtnContainer">
          <button
            className="btn  dropBtn"
            onClick={() => setOpen(!open)}
            data-testid="loginSignup"
          >
            {/* login */}
            {user == null ? <span>login</span> : <span>{user.firstName}</span>}
          </button>
          {

            <div className={`dropmenu ${open ? "openModal" : "closeModal"}`}>
              {user == null ? (
                <>
                  <button
                    onClick={() => headingBtn("/login")}
                    className="btn modalBtn modalBtn__login"
                    data-testid="login"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => headingBtn("/signup")}
                    className="btn modalBtn modalBtn__signup"
                    data-testid="signup"
                  >
                    Signup
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-secondary"
                    onClick={history.push({
                      pathname: `/user/${user.firstName}`,
                      user: user
                    })}>{user.firstName}</button>
                  <button
                    className="btn modalBtn modalBtn__signout"
                    onClick={() => {

                      dispatch({
                        type: "signout",
                      })
                      history.push("/")
                    }
                    }
                  >
                    sign out
                  </button>
                </>
              )}
            </div>
          }
        </div>
      </div>
    </div>
  );
}
