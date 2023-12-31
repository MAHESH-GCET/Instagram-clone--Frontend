import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  // user data
  const [userDetails, setUserDetails] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [err, setErr] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  // login data
  const { user } = useSelector((state) => state.login);

  // get token
  let token = sessionStorage.getItem("token");

  // get user details
  const getUserDetails = async () => {
    try {
      let response = await axios.get(
        `http://localhost:5000/user/${user.username}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setUserDetails(response.data.user);
      } else {
        console.log("error fetching user details");
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  // get posts data from backend
  const getdata = async () => {
    try {
      let response = await axios.get(
        `http://localhost:5000/home/${user.username}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        setUserPosts(response.data.payload);
        setDataFetched(true);
      } else {
        setErr("Error while fetching data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // delete post
  const deletePost = async (postData) => {
    try {
      let { postId, username } = postData;
      let response = await axios.delete(
        `http://localhost:5000/${username}/profile/edit/${postId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
        getdata();
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
    getdata();
  }, [user]);
  return (
    <div>
      {dataFetched === true ? (
        <>
          <div className="header">
            <div className="container">
              <div className="profile">
                <div className="profile-image">
                  <img src={`${userDetails.profileURL}`} alt="" />
                </div>
                <div className="profile-user-settings">
                  <h1 className="profile-user-name">{userDetails.username}</h1>
                  <button
                    className="btn profile-edit-btn"
                    onClick={() =>
                      navigate(`/${user.username}/edit`, {
                        state: {
                          bio: userDetails.bio,
                          profile: userDetails.profileURL,
                        },
                      })
                    }
                  >
                    Edit Profile
                  </button>
                </div>
                <div className="profile-stats">
                  <ul>
                    <li className="profile-stat-count">
                      {userPosts.length >= 0 && <>{userPosts.length}</>} Posts
                    </li>
                    <li className="profile-stat-count">
                      <span
                        onClick={() =>
                          navigate(`/user/${user.username}/followers`)
                        }
                      >
                        {userDetails.numberOfFollowers} Followers{" "}
                      </span>
                    </li>
                    <li className="profile-stat-count">
                      <span
                      onClick={() =>
                        navigate(`/user/${user.username}/following`)
                      }
                      >
                      {userDetails.numberOfFollowing} Following
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="profile-bio">
                  <p>
                    {" "}
                    <span className="profile-real-name">
                      {userDetails.username}
                    </span>{" "}
                    {userDetails.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="main">
            <div className="container">
              <div className="gallery">
                {userPosts.map((post, key) => (
                  <div className="gallery-item" tabIndex="0" key={post.postId}>
                    <img
                      className="gallery-image"
                      src={`${post.imageUrl}`}
                      alt=""
                    />

                    <div className="gallery-item-info ">
                      <ul>
                        {/* {likes} */}
                        <li className="gallery-item-likes">
                          <span className="visually-hidden">Likes:</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            fill="white"
                            viewBox="0 0 512 512"
                          >
                            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                          </svg>
                          <span className="ms-2">{post.Likes.length}</span>
                        </li>
                        {/* {comments} */}
                        <li className="gallery-item-comments">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            fill="white"
                            viewBox="0 0 512 512"
                          >
                            <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
                          </svg>
                          <span className="visually-hidden">Likes:</span>
                          <i className="fas fa-comment" aria-hidden="true"></i>
                          <span className="ms-2">{post.Comments.length}</span>
                        </li>
                      </ul>
                    </div>
                    {/* {delete button} */}
                    <div className="absolute top-0 right-0 mt-1 me-1">
                      <span onClick={() => deletePost(post)}>
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          height="2em"
                          width="2em"
                        >
                          <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <p>No Data To Show</p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
