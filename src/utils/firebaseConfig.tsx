import {initializeApp} from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

import {StoreUserData} from '../api/https'

const firebaseConfig = {
  apiKey: 'AIzaSyCMRHnTZg4fsI_NbWTlf418h_vSstA8XVE',
  authDomain: 'task-manager-116de.firebaseapp.com',
  databaseUrl:
    'https://task-manager-116de-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'task-manager-116de',
  storageBucket: 'task-manager-116de.appspot.com',
  messagingSenderId: '619401058835',
  appId: '1:619401058835:web:8a0fbfc11f3ca04d567de6'
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const firebaseapp = initializeApp(firebaseConfig)
const googleprovider = new GoogleAuthProvider()

googleprovider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()

export const signInWithGooglePopup = async () => {
  try {
    const response = await signInWithPopup(auth, googleprovider)
    const {_tokenResponse} = response
    window.localStorage.setItem('isLoggedIn', JSON.stringify(true))

    if (_tokenResponse.isNewUser) {
      const {firstName, lastName, email, localId} = _tokenResponse
      const userData = {firstName, lastName, email}
      await StoreUserData(userData, localId as string)
    }

    return response
  } catch (error: any) {
    alert(error)

    return false
  }
}

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    return
  }

  try {
    const response = await createUserWithEmailAndPassword(auth, email, password)

    return response
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      alert('Cannot create user, email already in use!')

      return
    }

    alert(error)
  }
}

export const signinAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    return
  }

  try {
    const response = await signInWithEmailAndPassword(auth, email, password)
    window.localStorage.setItem('isLoggedIn', JSON.stringify(true))

    return response
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      alert('Cannot create user, email already in use!')

      return
    }

    if (error.code === 'auth/invalid-credential') {
      alert('error: invalid email or password')

      return
    }

    alert(error)
  }
}
