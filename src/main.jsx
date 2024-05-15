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
import BlogDetails from './pages/BlogDetails'
import FeaturedBlogsPage from './pages/FeaturedBlogsPage'
import WishList from './pages/WishList'
import PrivateRoute from './routes/PrivateRoute'

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
        element: (
          <PrivateRoute>
            <AddBlogs></AddBlogs>
          </PrivateRoute>
        ),
      },
      {
        path: '/all-blogs',
        element: <AllBlogs />,
        loader: () =>
          // fetch('https://my-project-server-ten.vercel.app/allBlogs'),
          fetch('http://localhost:3000/allBlogs'),
      },
      {
        path: '/all-blogs/:id',
        element: (
          <PrivateRoute>
            <BlogDetails></BlogDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/allBlogs/${params.id}`),
      },
      {
        path: '/featuredBlogs',
        element: <FeaturedBlogsPage />,
        loader: () => fetch('http://localhost:3000/allBlogs'),
      },
      {
        path: '/wishlist',
        element: <WishList />,
        loader: () =>
          // fetch('https://my-project-server-ten.vercel.app/allBlogs'),
          fetch('http://localhost:3000/allBlogs'),
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
