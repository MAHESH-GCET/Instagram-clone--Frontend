import { useState } from 'react';
import {Button,Modal} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import './EditProfile.css'

function EditProfile() {
    let navigate=useNavigate()

    // form
    let {
        register,
        setValue,
        getValues,
        reset
    } = useForm();
    
  const [show, setShow] = useState(true);
  const [newProfile,setNewProfile]=useState([])
  const [imageUpload,setImageUpload]=useState(false)
  const [imagePreview, setImagePreview] = useState(null);

  const handleClose = () => navigate(-1);

  let location=useLocation()
  const {bio,profile}=location.state

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

    const setFileToBase = (file) =>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
        setNewProfile(reader.result);
    }
    }


    // update details
    const updateDetails=()=>{
        let data=getValues()
        console.log(data,newProfile)
    }


  return (
    <div className='container'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>EDIT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='edit'>
            {
                imageUpload? (
                    <div className='image-preview mx-auto mb-4'>
                        {
                            imagePreview && <img src={imagePreview} alt='preview'></img>
                        }
                    </div>
                ) : (
                    <div className='image-preview mx-auto mb-4'>
                    <img
                    src={`${profile}`}
                    alt='Image Preview'
                    >
                    </img>
            </div>
                )
            }
            
            <form>
            <div className='d-flex'>
                <div>
                    <label 
                    htmlFor='profile' 
                    className='fw-semibold text-dark fs-5 me-2'>Profile Picture </label>
                </div>
                <div>
                    <input 
                    type="file"  
                    id='profile' 
                    name='profile'  
                    onChange={handleImage} 
                    style={{height:'50px'}} />
                </div>
            </div>
            <div className='d-flex mt-2'>
                <div>
                    <label htmlFor='bio' className='fw-bold text-dark fs-4'>Bio</label>
                </div>
                <div>
                    <input 
                    defaultValue={bio} 
                    className='form-control w-100 p-3 ms-3 ' 
                    type='text' id='bio' 
                    {...register("bio")}>
                    </input>
                </div>
            </div>
            </form>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-danger p-1' onClick={updateDetails}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditProfile;