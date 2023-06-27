import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function Home() {
  let navigate = useNavigate();
  // get user
  const { user } = useSelector((state) => state.login);
  // local state to store feed
  const [feed, setFeed] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [liked,setLiked]=useState()
  // get token
  const token = sessionStorage.getItem("token");
  // get feed
  const getFeed = async () => {
    try {
      let response = await axios.get(
        `http://localhost:5000/${user.username}/feed`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      //console.log(response);
      if (response.status === 200) {
        const sortedFeed = response.data.posts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setFeed(sortedFeed);
        setFetched(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // check like
  const checkLike = async () => {
    const newFeed = await Promise.all(feed?.map(async (post) => {
      try {
        let response = await axios.get(
          `http://localhost:5000/${user.username}/feed/${post.postId}/check`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        if (response.data.message === "true") {
          post.isLiked = true;
        } else {
          post.isLiked = false;
        }
        return post;
      } catch (error) {
        console.log("error", error.message);
      }
    }));
    //console.log(newFeed);
    setFeed(newFeed);
  };

  // like
  const likePost = async (postId) => {
    console.log(postId);
    try {
      let response = await axios.post(
        `http://localhost:5000/${user.username}/feed/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.data.message === "Liked") {
        // getFeed()
        checkLike()
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  // dislike
  const disLikePost = async (postId) => {
    console.log(postId);
    try {
      let response = await axios.delete(
        `http://localhost:5000/${user.username}/feed/${postId}/dislike`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.data.message === "disliked") {
        // getFeed()
        checkLike()
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  // re  render
  useEffect(() => {
    getFeed();
    checkLike()
  }, [fetched])
   
  console.log(feed)

  return (
    <div
      className="container d-flex mx-auto  sm:px-20 flex justify-center"
      style={{ marginTop: "90px", height: "auto" }}
    >
      {fetched ? (
        feed?.map((post) => (
          <div
            className=" w-50 overflow-visible rounded border lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0 mt-3"
            key={post.postId}
          >
            {/* {post header} */}
            <div className="w-full flex justify-between p-3">
              <div className="flex">
                <div className="rounded-full h-8 w-8 bg-grey=500 flex items-center justify-center overflow-hidden">
                  <img src={`${post.User.profileURL}`} alt="preview" />
                </div>
                <span className="pt-1 ml-2 font-bold text-sm">
                  {post.username}
                </span>
              </div>
            </div>
            {/* {post} */}
            <img
              className="w-100 bg-cover object-full"
              width={"400px"}
              height={"400px"}
              alt={<Spinner />}
              src={`${post.imageUrl}`}
            />
            {/* {post footer} */}
            <div className="px-3 pb-2">
              {/* {like,comment button} */}
              <div className="pt-2">
                <div className="flex">
                  {/* {like} */}
                  
                  {post.isLiked === true ? (
                    <button>
                      <svg
                        viewBox="0 0 1024 1024"
                        fill="currentColor"
                        height="2em"
                        className="me-3"
                        onClick={() => disLikePost(post.postId)}
                      >
                        <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" />
                      </svg>
                    </button>
                  ) : (
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="2em"
                        viewBox="0 0 512 512"
                        className="me-3"
                        onClick={() => likePost(post.postId)}
                      >
                        <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                      </svg>
                    </button>
                  )}

                  {/* comment */}
                  <button
                    onClick={() =>
                      navigate(`/${user.username}/postComment`, {
                        state: {
                          postId: post.postId,
                        },
                      })
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="2em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" />
                    </svg>
                  </button>
                </div>
                {/* <span className="text-sm text-grey-400 font-medium">
                  {post.Likes.length} likes
                </span> */}
              </div>
              {/* {caption} */}
              <div className="pt-1">
                <div className="mb-2 text-sm">
                  <span className="font-medium mr-2">{post.username}</span>{" "}
                  {post.caption}
                </div>
              </div>
              {/* {comments} */}
              <div
                className="text-sm mb-2 text-gray-400 cursor-pointer font-medium"
                onClick={() =>
                  navigate(`/${user.username}/postComment`, {
                    state: {
                      postId: post.postId,
                    },
                  })
                }
              >
                View all {post.Comments.length} comments
              </div>
              <div className="mb-2">
                <div className="mb-2 text-sm">
                  {post.Comments.length > 0 && (
                    <>
                      <span>{post.Comments[0].username}</span>{" "}
                      {post.Comments[0].commentText}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="3em"
            viewBox="0 0 512 512"
          >
            <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
          </svg>
        </>
      )}
    </div>
  );
}

export default Home;
