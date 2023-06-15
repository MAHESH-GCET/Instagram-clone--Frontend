import React from 'react'
import './ForgotPassword.css'
import {useForm} from 'react-hook-form'
import { useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function ForgotPassword() {
  let navigate=useNavigate()

  //locat state
  let [otpStatus,setOtpStatus]=useState(false);
  let [checkOtp,setCheckOtp]=useState("");
  let [email,setEmail]=useState("");
  let [newPassword,setNewPassword]=useState("");

  // check email and send otp
  const onSubmit=async(userEmail)=>{
    setEmail(userEmail.email)
    try{
      let response=await axios.post('http://localhost:5000/forgot-password',userEmail)
      if(response.status===200){
        setOtpStatus(true)
      }
    } catch (err){
      console.log(err)
    }
  }

  // on otp submit
  const onOtpSubmit=async(newPassword)=>{
    try{
      let response=await axios.put(`http://localhost:5000/reset-password/${newPassword.email}`,newPassword);
      console.log(response)
      if(response.data.message==='success'){
        setNewPassword("password reset successsful")
        setTimeout(()=>{
          navigate("/")
        },3000)
      }
      else{
        setCheckOtp(response.data.message)
      }
      }
      catch(err){
        console.log(err);
      }
  }

  // form
  const {handleSubmit,register,formState:{errors}} =useForm()
  return (
    <div className='container'>
      <div className='box'>
        <div className='heading'></div>
        <form
        className='forgot-form form-control border-0'
        onSubmit={handleSubmit(onSubmit)}
        >
        {/* {Email} */}
        <div className='input-field mb-2'>
          <label htmlFor='email'></label>
          <input 
          type='text' 
          placeholder='Enter email'
          id='email'
          className='p-4 form-control w-100'
          {...register("email",{required:true})}
          />
          {errors.email?.type==='required' && (
            <p className='text-danger'>Enter Email</p>
          )}
        </div>
        <div>
          <button className='otp-button'>Get OTP</button>
        </div>
        </form>
        {
          otpStatus===true && (
          <>
          <form className='forgot-form form-control border-0'
          onSubmit={handleSubmit(onOtpSubmit)}
          >
          {/* {otp} */}
          <div className='input-field mb-2 mt-2'>
          <label htmlFor='otp'></label>
          <input 
          type='number' 
          placeholder='Enter otp'
          id='otp'
          className='p-4 form-control w-100'
          {...register("otp",{required:true,maxLength:6})}
          />
          {errors.otp?.type==='required' && (
          <p className='text-danger'>Enter otp</p>
          )}
          </div>
          {checkOtp && <p className='text-danger text-center fs-5 fw-semibold'>{checkOtp}</p>}
          {/* {New Password} */}
          <div className='input-field mb-2 mt-2'>
          <label htmlFor='password'></label>
          <input 
          type='text' 
          placeholder='Enter New Password'
          id='password'
          className='p-4 form-control w-100'
          {...register("password",{required:true})}
          />
          {errors.password?.type==='required' && (
          <p className='text-danger'>Enter Password</p>
          )}
          </div>
          <div>
          <button className='otp-button'>Submit</button>
          </div>
          {newPassword && (
            <p className='text-success fs-5 fw-semibold  text-center'>{newPassword}</p>
          )}     
          </form>
          </>
          )
        }
      </div>
    </div>
  )
}

export default ForgotPassword