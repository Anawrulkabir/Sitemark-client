import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import LandingPage from './pages/LandingPage'
import Checkout from './components/CheckOut/Checkout'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import MainLayout from './pages/MainLayout'
import ErrorPage from './pages/ErrorPage'
import AuthProvider from './provider/AuthProvider'
import AddBlogs from './pages/AddBlogs'
import AllBlogs from './pages/AllBlogs'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/addBlogs',
        element: <AddBlogs></AddBlogs>,
      },
      {
        path: '/all-blogs',
        element: <AllBlogs />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
