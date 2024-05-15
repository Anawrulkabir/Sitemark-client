import { useContext, useState, useEffect } from 'react'
import { Grid } from 'react-loader-spinner'
// import PropTypes from 'prop-types'

import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider'

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext)
  const [isLoaded, setIsLoaded] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => clearTimeout(timer) // Cleanup on component unmount
  }, [])

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
        <Grid
          visible={true}
          height={80}
          width={80}
          color="#0959A9"
          ariaLabel="grid-loading"
          radius={12.5}
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      </div>
    )
  }

  if (user) {
    return <>{children}</>
  }

  return <Navigate state={location.pathname} to="/signin" />
}

export default PrivateRoute
