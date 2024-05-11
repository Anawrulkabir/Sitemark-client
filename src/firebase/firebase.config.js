// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDcL4VHBx_i2BKOPZM8-hAJfOhp62myPsU',
  authDomain: 'aspirant-blog.firebaseapp.com',
  projectId: 'aspirant-blog',
  storageBucket: 'aspirant-blog.appspot.com',
  messagingSenderId: '351731831738',
  appId: '1:351731831738:web:7312572ad087cdff130383',
  measurementId: 'G-5C5F2FED61',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export default auth
