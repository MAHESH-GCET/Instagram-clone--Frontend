import React from 'react'
import './AddPost.css'
import {Modal,Button} from 'react-bootstrap'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {Spinner} from 'react-bootstrap'
function AddPost() {
  let navigate=useNavigate();

  // form
  let {
    register,
    getValues
  } = useForm();

  // user 
  let {user}=useSelector(state=>state.login)
  // modal
  const [show] = useState(true);
  const [imageUpload,setImageUpload]=useState(false)
  const [imagePreview, setImagePreview] = useState(null);
  const [image,setImage]=useState(null)
  const [loadSpinner,setLoadSpinner]=useState(false)

  //handle and convert it in base 64
  const handleImage = (e) =>{
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
    setImageUpload(true)
    // preview
    const reader=new FileReader();
    reader.onloadend=()=>{
      setImagePreview(reader.result);
    }
    reader.readAsDataURL(file);
    }

    // read file and set file object
    const setFileToBase = (file) =>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
        setImage(reader.result);
    }
    }

  // modal close 
  const handleClose = () => navigate(-1);

  // handle save 
  const handleSave=()=>navigate(`/user/${user.username}`)

  // tokenn
  const token=sessionStorage.getItem('token')

  // handle post
  const addPost=async()=>{
    let {caption}=getValues()
    try{
      setLoadSpinner(true)
      let response=await axios.post(`http://localhost:5000/${user.username}/newPost `,
      {caption,image},{
        headers:{
          Authorization:`bearer ${token}`
        }
      })
      if(response.status===201){
        handleSave()
        setLoadSpinner(false)
      } else{
        console.log("error while uploading")
      }

    } catch(e){
      throw new Error(e)
    }

  }
  //

  return (
    <div className='container'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>NEW POST</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='post'> 
          {
            imageUpload && (
              <div className='post-preview mx-auto mb-2'>
                <img
                src={imagePreview} 
                alt='cant load' 
                />
              </div>
            )
          }
          <form>
            {/* {post image} */}
            <div className='flex'>
              <div>
                <label 
                htmlFor='post'
                className='fw-semibold text-dark fs-5 me-2'
                >
                  Upload Image
                </label>
              </div>
              <div>
                <input
                type='file'
                id='post'
                name='post'
                onChange={handleImage}
                style={{height:'50px'}}
                />
              </div>
            </div>
            {/* {post caption} */}
            <div className='d-flex mt-4'>
              <div>
                <label htmlFor='caption'></label>
              </div>
              <div className='d-flex'>
                <input
                type='text'
                placeholder='Enter Caption'
                id='caption'
                className='form-control p-4 ms-3 '
                style={{justifyContent:'center',alignItems:'center', width:'380px'}}
                {...register('caption')}
                >
                </input>
              </div>
            </div>
          </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {
            loadSpinner===false ? (
              <Button className='btn-primary p-2' onClick={addPost}>
              Post
              </Button>
            ) :(
              <Spinner animation="border" variant='primary' />
            )
          }
          
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddPost