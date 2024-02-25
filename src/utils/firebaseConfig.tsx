import {initializeApp} from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

import {StoreUserData} from '../api/userData'

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
    const {localId} = _tokenResponse
    window.localStorage.setItem('user', localId as string)

    if (_tokenResponse.isNewUser) {
      const {firstName, lastName, email, localId} = _tokenResponse
      const userData = {firstName, lastName, email}
      await StoreUserData(userData, localId as string)
    }

    return localId
  } catch (error: any) {
    alert(error.message)

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
    const {user} = response

    return user.uid
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      alert('Cannot create user, email already in use!')

      return
    }

    alert(error.message)
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
    const {user} = response
    window.localStorage.setItem('user', user.uid as string)

    return user.uid
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      alert('Cannot create user, email already in use!')

      return
    }

    if (error.code === 'auth/invalid-credential') {
      alert('error: invalid email or password')

      return
    }

    alert(error.message)
  }
}

export const signoutUser = async () => {
  try {
    await signOut(auth)
    window.localStorage.removeItem('user')
  } catch (error: any) {
    alert(error.message)
  }
}
