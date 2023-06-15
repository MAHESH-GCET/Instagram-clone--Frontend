import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './Header/Header';
import {useSelector} from 'react-redux'
function RootLayout() {
  // get user state
  const {status}=useSelector(state=>state.login)
  return (
    <div>
      {
        status==='success' ? (
          <>
          <div>
            <Header/>
          </div>
          <div>
            <Outlet/>
          </div>
          </>
        ) : (
          <Outlet/>
        )
      }
      
    </div>
  )
}

export default RootLayout