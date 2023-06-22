import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

function ShowFollowing() {
  let navigate = useNavigate();
  // follower state
  let [following, setFollowing] = useState([]);
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
  const getFollowing = async () => {
    try {
      let response = await axios.get(
        `http://localhost:5000/${user.username}/following`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setFollowing(response.data.following);
      setDataFetched(true);
    } catch (error) {
      console.log(error);
    }
  };

  // remove user
  const removeUser = async (Fuser) => {
    setLoadSpinner(true)
    const followingUser = Fuser.username;
    try {
      let response = await axios.delete(
        `http://localhost:5000/${user.username}/following/${followingUser}/remove`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      console.log(response);
      if (response.status === 200) {
        getFollowing();
        setLoadSpinner(false)
      } else {
        console.log(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getFollowing();
  }, []);

  return (
    <div className="bg-danger ">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Following</Modal.Title>
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
              {following?.map((followingUser) => (
                <tr key={followingUser.username}>
                  <td className=" " width={"65px"} height={"65px"}>
                    <img
                      src={followingUser.profileURL}
                      style={{ borderRadius: "50%" }}
                      alt="profile"
                    ></img>
                  </td>
                  <td className="text-center fw-semibold fs-5 items-center justify-center p-3">
                    {followingUser.username}
                  </td>
                  <td>
                    {loadSpinner === true ? (
                      <Spinner animation="border" variant="primary" />
                    ) : (
                      <button
                        className="btn btn-primary p-2"
                        onClick={() => removeUser(followingUser)}
                      >
                        Remove
                      </button>
                    )}
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

export default ShowFollowing;
