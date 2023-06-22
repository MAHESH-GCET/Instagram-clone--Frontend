import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./EditProfile.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { Spinner } from "react-bootstrap";

function EditProfile() {
  const { user } = useSelector((state) => state.login);
  let navigate = useNavigate();

  // form
  let { register, getValues } = useForm();

  const [show] = useState(true);
  const [newProfile, setNewProfile] = useState([]);
  const [imageUpload, setImageUpload] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [loadSpinner, setLoadSpinner] = useState(false);

  const handleClose = () => navigate(-1);

  let location = useLocation();
  const { bio, profile } = location.state;

  //handle and convert it in base 64
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
    setImageUpload(true);

    // preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // read file and set file object
  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewProfile(reader.result);
    };
  };

  // get token
  const token = sessionStorage.getItem("token");

  // update details
  const updateDetails = async () => {
    let { bio } = getValues();
    try {
      setLoadSpinner(true);
      let response = await axios.put(
        `http://localhost:5000/userApi/${user.username}/update`,
        { bio, newProfile },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        navigate(-1);
        setLoadSpinner(false);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>EDIT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="edit">
            {
              // {image preview}
              imageUpload ? (
                <div className="image-preview mx-auto mb-4">
                  {imagePreview && <img src={imagePreview} alt="preview"></img>}
                </div>
              ) : (
                <div className="image-preview mx-auto mb-4">
                  <img src={`${profile}`} alt="Preview"></img>
                </div>
              )
            }
            {/* {edit form} */}
            <form>
              {/* {profile picture} */}
              <div className="d-flex">
                <div>
                  <label
                    htmlFor="profile"
                    className="fw-semibold text-dark fs-5 me-2"
                  >
                    Profile Picture{" "}
                  </label>
                </div>
                <div>
                  <input
                    type="file"
                    id="profile"
                    name="profile"
                    onChange={handleImage}
                    style={{ height: "50px" }}
                  />
                </div>
              </div>
              {/* {bio} */}
              <div className="d-flex mt-2">
                <div>
                  <label htmlFor="bio" className="fw-bold text-dark fs-4">
                    Bio
                  </label>
                </div>
                <div>
                  <input
                    defaultValue={bio}
                    className="form-control w-100 p-3 ms-3 "
                    type="text"
                    id="bio"
                    {...register("bio")}
                  ></input>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {loadSpinner === true ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Button className="btn btn-primary p-2" onClick={updateDetails}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditProfile;
