import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import './login.css'
import {Link,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux';
import {userLogin} from '../../slices/loginSlice';
function Login() {
  let navigate=useNavigate();
  let dispatch=useDispatch();
  const { register, handleSubmit, formState:{errors}, reset } = useForm();
  
  const onLogin=(userCred)=>{
    dispatch(userLogin(userCred));
    reset()
  }
  
  // get user store
  const {user,errorMessage,status} = useSelector(state=>state.login)

  // navigate if success
  useEffect(()=>{
    if(status==='success'){
      navigate('/home')
    } 
  },[status])
  return (
    <div className='container'>
      <div className='box'>
        <div className='heading'></div>
        <form 
          onSubmit={handleSubmit(onLogin)}
          className='login-form form-control border-0'
        >
        {/* {Email} */}
        <div className='input-field mb-2'>
          <label htmlFor='username'></label>
          <input 
          type='text' 
          placeholder='Enter username'
          id='username'
          className='p-4 form-control w-100'
          {...register("username",{required:true})}
          />
          {errors.username?.type==='required' && (
            <p className='text-danger'>Enter Email</p>
          )}
        </div>
        {/* {Password} */}
        <div className='input-field mb-2'>
          <label htmlFor='password'></label>
          <input 
          type='password' 
          placeholder='Enter password'
          id='password'
          className='p-4 form-control '
          {...register("password",{required:true})}
          />
          {errors.password?.type==='required' && (
            <p className='text-danger'>Enter Password</p>
          )}
        </div>
        <div>
          <button className='login-button mt-2'>Log In</button>
        </div>
        <Link className='forgot-password fs-5 d-flex mt-3 mx-auto' to='/forgot-password'>Forgot Password?</Link>
      </form>
      </div>
      <div>
        <p className='fs-5 mt-3 '>Don't have an account? <Link className='signup' to='/register'>Sign Up</Link></p>
      </div>
      <div>
        {
          status==="failed" && <p className='text-center text-danger fs-5 fw-semibold'>{errorMessage}</p>
        }
      </div>
    </div>
  )
}

export default Login