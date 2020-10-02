import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAdJnebZS9dd4b1EYQyh_IZ6nvwCxVmuc0",
  authDomain: "ynsitu-test.firebaseapp.com",
  databaseURL: "https://ynsitu-test.firebaseio.com",
  projectId: "ynsitu-test",
  storageBucket: "ynsitu-test.appspot.com",
  messagingSenderId: "918360174562",
  appId: "1:918360174562:web:96a13114fd7c6f76f4d3bb"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

export { db, auth }