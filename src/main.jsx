import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import App from './App'
import Home from './Home'
import Profile from './Profile'
import Lists from './Lists'
import SignIn from './LoginComponents/SignIn'
import Signup from './LoginComponents/SignUp'
import CreateProfile from './LoginComponents/CreateProfile'


import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/SignUp",
    element: <Signup />,
  },
  {
    path: "/CreateProfile",
    element: <CreateProfile />,
  },
  {
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    path: '/Home',
    element: <Home />
  },
  {
    path: '/Profile',
    element: <Profile />
  }, {
    path: '/Lists' ,
    element: <Lists />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
