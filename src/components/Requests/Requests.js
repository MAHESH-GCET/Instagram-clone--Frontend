import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Requests() {
  // loacl state
  let [requests, setRequests] = useState([]);

  // user
  const { user } = useSelector((state) => state.login);
  // token
  const token = sessionStorage.getItem("token");

  // get requests
  const getRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/${user.username}/requests`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      console.log(response.data.requests);
      setRequests(response.data.requests);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // accept follow request
  const acceptRequest = async (request) => {
    console.log(request);
    const from_username = request.from_username;
    try {
      let response = await axios.put(
        `http://localhost:5000/${user.username}/requests/accept`,
        {
          from_username,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        getRequests();
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };
  
  // reject follow request
  const rejectRequest = async (request) => {
    const from_username = request.from_username;

    try {
      let response = await axios.delete(
        `http://localhost:5000/${user.username}/requests/${from_username}/reject`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        getRequests();
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  // useeffect
  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div
      className="container d-flex align-items-start"
      style={{ marginTop: "auto" ,height:'auto'}}
    >
      <h1 className="ms-2" style={{ marginTop: "100px" }}>Follow Requests</h1>
      <table className="table table-control table-responsive mt-5 m-2 mb-4">
        <thead>
          <tr>
            {/* <td></td>
            <td></td>
            <td></td> */}
          </tr>
        </thead>
        <tbody className="text-center">
          {requests?.map((request) => (
            <tr key={request.id}>
              <td width={"100px"} height={"100px"}>
                <img
                  src={`${request.User.profileUrl}`}
                  alt="profile"
                  style={{ borderRadius: "50%" }}
                ></img>
              </td>
              {
                <>
                  <td>
                    <span className="fw-bold fs-5 me-2">
                      {request.from_username} 
                    </span>
                    has sent a request to follow you
                  </td>
                  <td>
                    <button
                      className="btn btn-primary p-3"
                      onClick={() => acceptRequest(request)}
                    >
                      Accept
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary p-3"
                      onClick={() => rejectRequest(request)}
                    >
                      Reject
                    </button>
                  </td>
                </>
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Requests;
