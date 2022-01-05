import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams, useHistory } from "react-router";
import "./css/user.scss";
import Modal from "./Modal";
export default function User() {
  const user = useSelector(state => state.auth.currUser)
  const history = useHistory()
  const loading = useSelector(state => state.cart.loading)
  const [modal, setModal] = useState(false)
  const showModal = () => {
    setModal(true)
  }
  const hideModal = () => {
    setModal(false)
  }

  return (
    <div className="mainContainer">

      {loading ? <h1>loading...</h1> :
        <>
          <div className="userContainer">

            <h1>User</h1>
            <table class="table table-striped">
              <tbody>
                <tr>
                  <th scope="row">Name</th>
                  <td>{user.firstName + " " + user.lastName}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>{user.email}</td>
                  {/* <td></td> */}
                </tr>
                <tr>
                  <th scope="row">Address</th>
                  <td>{user.address}</td>
                </tr>
              </tbody>
            </table>
            <button onClick={showModal} className="btn btn-warning" id="modalBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
              Edit
            </button>
          </div>

          <Modal hideModal={hideModal} user={user} modal={modal} />
        </>
      }
    </div>
  );
}
