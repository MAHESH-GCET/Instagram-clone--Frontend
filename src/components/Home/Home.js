import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

function Home() {
  // get user
  const {user}=useSelector(state=>state.login)
  // local state to store feed 
  const [feed,setFeed]=useState([])
  const [fetched,setFetched]=useState(false)
  // get token
  const token=sessionStorage.getItem('token')
  // get feed
  const getFeed=async()=>{
    try{
      let response=await axios.get(`http://localhost:5000/${user.username}/feed`,{
        headers:{
          Authorization:`bearer ${token}`
        }
      })
      console.log(response)
      if(response.status===200){
        setFeed(response.data.posts)
        setFetched(true)
        
      }
      
    } catch(err){
      console.log(err)
    }
  }
  console.log(feed)
  // re  render
  useEffect(()=>{
    getFeed();
  },[fetched])

  return (
    <div className='container mx-auto my-10 sm:px-20 flex justify-center' style={{marginTop:'90px', height:'2200px'}}>
      {
        fetched ? (
          feed.map((post)=>(
            <div className='w-full rounded overflow-hidden border lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0 mt-3' key={post.postId}>
              {/* {post header} */}
              <div className='w-full flex justify-between p-3'>
                <div className='flex'>
                  <div className='rounded-full h-8 w-8 bg-grey=500 flex items-center justify-center overflow-hidden'>
                    <img src={`${post.User.profileURL}`}/>
                  </div>
                  <span className='pt-1 ml-2 font-bold text-sm'>{post.username}</span>
                </div>
              </div>
              {/* {post} */}
              <img
              className='w-full bg-cover'
              src={`${post.imageUrl}`} 
              />
              {/* {post footer} */}
              <div className='px-3 pb-2'>
                {/* {like,comment button} */}
                <div className='pt-2'>
                <div className='flex'>
                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512" className='me-3'>
                <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512">
                <path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"/>
                </svg>
                </div>
                <span className='text-sm text-grey-400 font-medium'>{post.Likes.length} likes</span>
                </div>
                {/* {caption} */}
                <div className='pt-1'>
                  <div className='mb-2 text-sm'>
                    <span className='font-medium mr-2'>{post.username}</span> {post.caption}
                  </div>
                </div>
                {/* {comments} */}
                <div className="text-sm mb-2 text-gray-400 cursor-pointer font-medium">View all {post.Comments.length} comments</div>
                  <div className="mb-2">
                    <div className="mb-2 text-sm">
                      {
                        post.Comments.length>0 && (
                          <>
                          <span>
                            {post.Comments[0].username}
                          </span> {post.Comments[0].commentText}
                          </>
                        )
                      }
                    </div>
                  </div>
              </div>
            </div>
          ))
        ):(
          <>
          <svg xmlns="http://www.w3.org/2000/svg"  height="3em" viewBox="0 0 512 512" >
          <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/>
          </svg>
          </>
        )
      }
      
    </div>
  )
}

export default Home