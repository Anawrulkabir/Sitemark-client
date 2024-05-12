import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useContext, useState } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import toast, { Toaster } from 'react-hot-toast'
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import { useLocation, useNavigate } from 'react-router-dom'

import auth from '../firebase/firebase.config'

const defaultTheme = createTheme()

export default function SignUp() {
  const { createUser } = useContext(AuthContext)
  const [passTextError, setPassTextError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  let navigate = useNavigate()
  let location = useLocation()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')
    const password = data.get('password')
    const firstname = data.get('firstName')
    const lastName = data.get('lastName')
    const photo = data.get('photo')

    const name = firstname + lastName
    const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/
    if (password.length < 6) {
      setPassTextError('Password should be at least 6 character')
      return // returning so that the validation stops here, no need to go to database in firebase
    } else if (!regex.test(password)) {
      setPassTextError('Password must contain uppercase letter')
      return
    } else {
      setPassTextError('')
    }

    const emailRegex = /^\S+@\S+\.\S+$/

    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format')
      return // Return to stop further validation
    } else {
      setEmailError('')
    }

    createUser(email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        })
        toast.success(`Account created successfully, ${name}`)
        // console.log(photoUrl)
        setTimeout(() => {
          navigate(location?.state ? location.state : '/')
        }, 1000)
      })
      .catch((error) => {
        console.log(error.code)
        console.log(error.message)
        // setLoginError(error.message)
        toast.error(
          error.message === 'Firebase: Error (auth/email-already-in-use).'
            ? 'Email already in use. Try logging in instead.'
            : 'Something went Worng'
        )
      })
  }

  const provider = new GoogleAuthProvider()
  const handleSignUpWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user)
        toast.success(`You have successfully logged in your account`)
        setTimeout(() => {
          navigate(location?.state ? location.state : '/')
        }, 1000)
      })
      .catch((error) => console.error(error))
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" className="pt-10">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <div className="mt-6 w-full ">
            <Button
              variant="outlined"
              onClick={handleSignUpWithGoogle}
              // href="#"
              className="w-full  justify-center px-6 h-12 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-400 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>

              <span className="mx-2 text-gray-500 capitalize text-base">
                Sign up with Google
              </span>
            </Button>

            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
              or sign up with
            </p>
          </div>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                {emailError && (
                  <p className="text-red-500 text-[8px]">{emailError}</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="photo"
                  label="Photo Url"
                  name="photo"
                  autoComplete="photo"
                />
              </Grid>

              <Grid item xs={12} className="relative">
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={!showPassword ? 'password' : 'text'}
                  id="password"
                  autoComplete="new-password"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer top-1/2 right-0 -translate-y-[10%] -translate-x-[70%] text-[18px]"
                >
                  {/* {showPassword ? <FaEye /> : <FaEyeSlash />} */}
                  {showPassword ? <VscEye /> : <VscEyeClosed />}
                </div>
                {passTextError && (
                  <p className="text-red-500 text-[8px]">{passTextError}</p>
                )}
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
      <Toaster position="right" />
    </ThemeProvider>
  )
}
