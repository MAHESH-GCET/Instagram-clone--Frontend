import React from 'react'
import Users from '../Users/Users'
import Requests from '../Requests/Requests'
import './Notification.css'
function Notification() {
    console.log('notifications rendered')
  return (
    <div className='flex flex-col sm:flex-row '>
        <div className=' sm:w-1/2'>
            <Requests/>
        </div>
        <span className="container vertical-line"></span>
        <div className='sm:w-1/2 '>
            <Users/>
        </div>
    </div>
  )
}

export default Notification