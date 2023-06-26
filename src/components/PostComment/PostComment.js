import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
function PostComment() {
  // comment form
  const { handleSubmit, register, reset } = useForm();
  // local state
  let [post, setPost] = useState();
  let [fetched, setFetched] = useState(false);
  // user
  const { user } = useSelector((state) => state.login);
  let location = useLocation();
  // get post from state
  const { postId } = location.state;
  console.log(postId);

  // get tpken
  const token = sessionStorage.getItem("token");
  // get post details
  const getPostDetails = async () => {
    try {
      let response = await axios.get(`http://localhost:5000/post/${postId}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      setPost(response.data.post[0]);
      setFetched(true);
      console.log(response.data.post[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  // post comment
  const postComment = async (commentObj) => {
    console.log(commentObj);
    try{
        let response=await axios.post(`http://localhost:5000/${user.username}/feed/${postId}/addcomment`,{
            commentText:commentObj.commentText
        },{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        console.log(response)
        if(response.status===200){
            reset()
            getPostDetails()
        }
    }
    catch(error){
        console.log(error.message)
    }
  };
  // use effect
  useEffect(() => {
    getPostDetails();
  }, []);
  return (
    <div>
      {fetched === true && (
        <div
          className="container d-flex flex-row flex-wrap p-2"
          style={{
            marginTop: "150px",
            alignItems: "flex-start",
          }}
        >
          {/* {post} */}
          <div>
            <div
              className="flex ms-2"
              // style={{ justifyContent: "center", alignItems: "center" }}
            >
              <div>
                <img
                  src={`${post.User.profileURL}`}
                  alt="user profile"
                  height={"40px"}
                  width={"40px"}
                  className="rounded-full"
                ></img>
              </div>
              <div>
                <h4 className="ms-3">{post.username}</h4>
              </div>
            </div>
            <img
              src={`${post.imageUrl}`}
              alt="Post Preview"
              className="mt-2"
              height={"500px"}
              width={"500px"}
            ></img>
          </div>
          {/* {details} */}
          <div className="ms-5 mt-5">
            <h5>Comments</h5>
            <table className="table table-control table-responsive bg-white">
              <thead></thead>
              {post.Comments?.map((comment, key) => (
                <tr key={comment.id}>
                  <td>
                    <img
                      src={`${comment.User.profileURL}`}
                      alt="user profile"
                      height={"40px"}
                      width={"40px"}
                      className="rounded-full"
                    ></img>
                  </td>
                  <td>
                    <span>{comment.username}</span>
                  </td>
                  <td>
                    <span>{comment.commentText}</span>
                  </td>
                </tr>
              ))}
            </table>
            <form className="d-flex" onSubmit={handleSubmit(postComment)}>
              <label htmlFor="commentText"></label>
              <input
                type="text"
                placeholder="Enter Comment"
                className="form-control p-3"
                {...register("commentText", { required: true })}
              ></input>
              <button className="btn btn-primary ms-1">Comment</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostComment;
