import React from 'react'
import {NavLink} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {clearState} from '../../slices/loginSlice';
import './Header.css'

function Header() {
  // get status from login slice
  const {user,status}=useSelector(state=>state.login)
  let dispatch=useDispatch()

  // handle logout
  const handleLogout=()=>{
    sessionStorage.clear()

    //dispatch
    dispatch(clearState())
  }
  return (
    <div className='navigation'>

      {
        status==='success' && (
        <>
        {/* {Logo} */}
        <div className='logo ms-3'>
          <NavLink to='/' className='text-dark' >
          <svg xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 0 448 512">
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
          </svg>
          </NavLink>
        </div>
        {/* nav bar icons */}
        <div className='hidden sm:block' >
        <ul className='d-flex ' style={{marginTop:'20px'}} >
        {/* {notification} */}
        <div style={{marginLeft:'30px',marginRight:'10px'}}>
          
          <svg
          viewBox="0 0 512 512"
          fill="black"
          height="2.2em"
          width="2.2em"
          >
          <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm0 336c-20.9 0-37.52-8.86-39.75-27.58a4 4 0 014-4.42h71.45a4 4 0 014 4.48C293.15 374.85 276.68 384 256 384zm98-48H158c-11.84 0-18-15-11.19-23 16.33-19.34 27.87-27.47 27.87-80.8 0-48.87 25.74-66.21 47-74.67a11.35 11.35 0 006.33-6.68C231.7 138.6 242.14 128 256 128s24.28 10.6 28 22.86a11.39 11.39 0 006.34 6.68c21.21 8.44 47 25.81 47 74.67 0 53.33 11.53 61.46 27.86 80.8 6.74 7.99.57 22.99-11.2 22.99z" />
          </svg>
          
        </div>
        {/* {add post} */}
        <div style={{marginLeft:'30px',marginRight:'10px'}}>
          <NavLink to={`/${user.username}/newPost`}>
          <svg
          viewBox="0 0 24 24"
          fill="black"
          height="2.3em"
          width="2.3em"
          >
          <path d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4V5z" />
          <path d="M8 11l-3 4h11l-4-6-3 4z" />
          <path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z" />
          </svg>
          </NavLink>
        </div>
        {/* {profile} */}
        <div style={{marginLeft:'30px',marginRight:'10px'}}>
          <NavLink to={`/user/${user.username}`}>
          <svg fill="none" viewBox="0 0 24 24" height="2em" width="2em" >
          <path
          fill="black"
          fillRule="evenodd"
          d="M16 9a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z"
          clipRule="evenodd"
          />
          <path
          fill="black"
          fillRule="evenodd"
          d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0112.065 14a8.984 8.984 0 017.092 3.458A9 9 0 103 12zm9 9a8.963 8.963 0 01-5.672-2.012A6.992 6.992 0 0112.065 16a6.991 6.991 0 015.689 2.92A8.964 8.964 0 0112 21z"
          clipRule="evenodd"
          />
          </svg>
          </NavLink>
        </div>
        {/* {logout} */}
        <div style={{marginLeft:'30px',marginRight:'10px'}}>
          <NavLink onClick={handleLogout} to='/'>
          <svg
          viewBox="0 0 900 1000"
          fill="black"
          height="1.9em"
          width="1.9em"
          >
          <path d="M502 850V750h98v100c0 26.667-9.667 50-29 70s-43 30-71 30H100c-26.667 0-50-10-70-30S0 876.667 0 850V150c0-28 10-51.667 30-71s43.333-29 70-29h400c28 0 51.667 9.667 71 29s29 43 29 71v150h-98V150H100v700h402m398-326L702 720V600H252V450h450V330l198 194" />
          </svg>
          </NavLink>
        </div>
        
        </ul>
        </div>
        </>
        )
      }
    </div>
  )
}

export default Header