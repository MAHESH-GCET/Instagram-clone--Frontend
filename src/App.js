import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import RootLayout from './components/RootLayout';
import ErrorElement from './components/ErrorElement';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ForgotPassword from './components/Forgot-Password/ForgotPassword';
import Home from './components/Home/Home';
import UserProfile from './components/UserProfile/UserProfile';
import FileUpload from './components/FileUpload';
import { useSelector } from 'react-redux';
import EditProfile from './components/EditProfile/EditProfile';


function App() {
  // get user details
  const {user}=useSelector(state=>state.login)

  // create browser router object
  const browserRouterObj=createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      errorElement:<ErrorElement/>,
      children:[
        {
          path:'/',
          element:<Login/>
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path:'/forgot-password',
          element:<ForgotPassword/>
        },
        {
          path:'/home',
          element:<Home/>
        },
        {
          path:`/user/${user.username}`,
          element:<UserProfile/>
        },
        {
          path:'/upload',
          element:<FileUpload/>
        },
        {
          path:`/${user.username}/edit`,
          element:<EditProfile/>
        }
      ]
    }
  ])
  return (
    <div className="App">
      {/* {return browser router object} */}
      <RouterProvider router={browserRouterObj}></RouterProvider>
    </div>
  );
}

export default App;
