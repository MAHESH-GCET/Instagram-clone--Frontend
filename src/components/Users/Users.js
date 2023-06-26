import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";

function Users() {
  // users
  let [allUsers, setAllUsers] = useState([]);
  let [pendingReqs, setPendingReqs] = useState([]);
  // user
  const { user } = useSelector((state) => state.login);
  // token
  const token = sessionStorage.getItem("token");

  // get all users
  const getAllUsers = async () => {
    try {
      let response = await axios.get(
        `http://localhost:5000/${user.username}/users`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setAllUsers(response.data.users);
      setPendingReqs(response.data.pending);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  // send request
  const sendRequest = async (userObj) => {
    const to_username = userObj.username;
    try {
      let reqReponse = await axios.post(
        `http://localhost:5000/${user.username}/users/request`,
        { to_username },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      console.log(reqReponse);
      if (reqReponse.status === 200) {
        getAllUsers();
      } else {
        console.log(reqReponse.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // use effect
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div
      className="container justify-content-start align-items-start"
      style={{ marginTop: "auto" }}
    >
      <h1 className="ms-2" style={{ marginTop: "100px" }}>
        Users
      </h1>
      <table className="table table-control table-responsive mt-5 m-2 mb-4 w-75">
        <thead>
          <tr></tr>
        </thead>
        <tbody className="text-center">
          {allUsers?.map((user) => (
            <tr key={user.username}>
              <td width={"100px"} height={"100px"}>
                <img
                  src={`${user.profileUrl}`}
                  alt="profile"
                  style={{ borderRadius: "50%" }}
                ></img>
              </td>
              <td>
                <span className="fw-bold fs-5">{user.username}</span>
              </td>
              <td>
                <button
                  className="btn btn-primary p-3"
                  onClick={() => sendRequest(user)}
                >
                  Follow
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {pending requests} */}
      <div className="h-5 w-75">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Pending Requests</Accordion.Header>
            <Accordion.Body>
              <table className="table table-control table-responsive m-2 mb-4">
                <thead>
                  <tr></tr>
                </thead>
                <tbody className="text-center">
                  {pendingReqs?.map((request) => (
                    <tr key={request.id}>
                      <td>
                        <span className="fw-bold fs-5 float-left">{request.to_username}</span>
                      </td>
                      <td>
                        <button
                          className="btn p-2 float-end"
                          style={{backgroundColor:'lightGray'}}
                        >
                          Pending
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default Users;
