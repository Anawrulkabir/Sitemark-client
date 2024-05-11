import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import auth from '../firebase/firebase.config'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'

// import { useLocation } from 'react-router-dom'

// exporting context globally
export const AuthContext = createContext(null)
const googleAuthProvider = new GoogleAuthProvider()
const githubAuthProvider = new GithubAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // signup
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // login
  const signinUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  // signin - Google
  //   const navigate = useNavigate()
  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        console.log(result.user)
        toast.success('You have successfully logged in your account')
        Navigate(location?.state ? location.state : '/')

        console.log(location)
      })
      .catch((error) => console.error(error))
  }

  // signin - Github
  const signInWithGithub = () => {
    setLoading(true)
    return signInWithPopup(auth, githubAuthProvider)
  }

  // Log Out
  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  // passing the value by authInfo inside AuthContext
  const authInfo = {
    user,
    createUser,
    signinUser,
    loading,
    signInWithGoogle,
    signInWithGithub,
    logOut,
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
      console.log('Current value of the curruent user :', currentUser)
    })
    return () => {
      unSubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider

AuthProvider.propTypes = {
  children: PropTypes.node,
}
