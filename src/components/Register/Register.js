import React, { useState } from 'react'
import './Register.css'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import {Link, useNavigate} from 'react-router-dom'
import axios from  'axios'

function Register() {
  let navigate=useNavigate()
  // local state
  const [err,setErr]=useState(false)
  const [image,setImage]=useState()
  
  // initial values
  const initialValues={
    username:'',
    email:'',
    password:'',
    fullName:'',
    age:'',
    gender:'',
    profileUrl:''
  }

  
  //on submit
  const onSubmit=async(values)=>{
    if(values.profileUrl===null){
      values.profileUrl='https://cdn.iconscout.com/icon/free/png-512/free-profile-199-436934.png?f=avif&w=256'
    }
    else{
      values.profileUrl=image
    }
    console.log(values)
    try{
      let response=await axios.post('http://localhost:5000/userApi/register',values) 
      console.log(response)
      if(response.status===201){
        console.log('user registered successfully')
        setTimeout(()=>{
          navigate("/")
        },3000)
      }
      else{
        console.log('err occured')
        setErr(true)
      }

    } catch(err){
      console.log(err)
    }
  }

  // validation form
  const validateForm=(values)=>{
    const errors={}
    if(!values.username){
      errors.username='Username Required'
    }

    if(!values.email){
      errors.email='Email Required'
    }

    if(!values.password){
      errors.password='Password Required'
    }

    if(!values.age){
      errors.age='Age Required'
    }

    if(!values.gender){
      errors.gender='Gender Required'
    }

    return errors;
  }

  return (
    <div className='container'>
      <div className='box'>
        <div className='heading'></div>
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validateForm={validateForm}
        >
        <Form className='form-control border-0'>
        <div >
          <label htmlFor='username'></label>
          <Field  type='text' id='username' name='username' placeholder='Enter Username' className='field p-4 form-control w-100' />
          <ErrorMessage name='username' component='div'/>
        </div>
        <div>
          <label htmlFor='fulllName'></label>
          <Field type='text' id='fullName' name='fullName' placeholder='Enter Full Name' className='field p-4 form-control' />
          <ErrorMessage name='fullName' component='div' />
        </div>
        <div>
          <label htmlFor='email'></label>
          <Field type='text' id='email' name='email' placeholder='Enter email' className='field p-4 form-control' />
          <ErrorMessage name='email' component='div'/>
        </div>
        <div>
          <label htmlFor='password'></label>
          <Field type='password' id='password' name='password' placeholder='Enter Password' className='field p-4 mt-2 form-control' />
          <ErrorMessage name='password' component='div'/>
        </div>
        <div>
          <label htmlFor='age'></label>
          <Field type='number' id='age' name='age' placeholder='Enter Age' className='field p-4 mt-2 form-control' />
          <ErrorMessage name='age' component='div'/>
        </div>
        <div>
          <label htmlFor="gender"></label>
          <Field as="select" id="gender" name="gender" className='field mt-2 form-control'>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Field>
          <ErrorMessage name="gender" component="div" />
        </div>
        <div>
          <button type='submit' className='signup-button'>SignUp</button>
        </div>
        </Form>
        </Formik>
        {
          err && (
            <p className='fs-5 fw-semibold text-danger'>Error While registering</p>
          )
        }
      </div>
      <div>
        <p className='fs-5 mt-3 '>Already Have an Account? <Link className='login' to='/'>Log In</Link></p>
      </div>
    </div>
  )
}

export default Register