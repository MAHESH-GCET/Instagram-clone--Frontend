import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

function ShowFollowers() {
  let navigate = useNavigate();
  // follower state
  let [followers, setFollowers] = useState([]);
  let [dataFetched, setDataFetched] = useState(false);
  const [loadSpinner, setLoadSpinner] = useState(false);
  // user
  const { user } = useSelector((state) => state.login);
  // token
  const token = sessionStorage.getItem("token");
  //modal
  const [show] = useState(true);
  const handleClose = () => navigate(-1);

  // get followers
  const getFollowers = async () => {
    try {
      let response = await axios.get(
        `http://localhost:5000/${user.username}/followers`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      setFollowers(response.data.followers);
      setDataFetched(true);
    } catch (error) {
      console.log(error);
    }
  };

  // remove user
  const removeUser = async (follower) => {
    setLoadSpinner(true);
    const followerUser = follower.username;
    try {
      let response = await axios.delete(
        `http://localhost:5000/${user.username}/followers/${followerUser}/remove`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      console.log(response);
      if (response.status === 200) {
        getFollowers();
        setLoadSpinner(false);
      } else {
        console.log(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getFollowers();
  }, []);

  return (
    <div className="bg-danger ">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Followers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-responsive">
            <thead>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {followers?.map((follower) => (
                <tr key={follower.username}>
                  <td className=" " width={"65px"} height={"65px"}>
                    <img
                      src={follower.profileURL}
                      alt="profile"
                      style={{ borderRadius: "50%" }}
                    ></img>
                  </td>
                  <td className="text-center fw-semibold fs-5 items-center justify-center p-3">
                    {follower.username}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary p-2 "
                      onClick={() => removeUser(follower)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ShowFollowers;
