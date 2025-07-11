import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  FacebookAuthProvider,
  User,
  onAuthStateChanged,
} from "firebase/auth";

import { StoreUserData } from "../api/userData";

const firebaseConfig = {
  apiKey: "AIzaSyCMRHnTZg4fsI_NbWTlf418h_vSstA8XVE",
  authDomain: "task-manager-116de.firebaseapp.com",
  databaseUrl:
    "https://task-manager-116de-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "task-manager-116de",
  storageBucket: "task-manager-116de.appspot.com",
  messagingSenderId: "619401058835",
  appId: "1:619401058835:web:8a0fbfc11f3ca04d567de6",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const firebaseapp = initializeApp(firebaseConfig);
export const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

const facebookProvider = new FacebookAuthProvider();

let currentUser: User | null = null;

onAuthStateChanged(auth, (user) => {
  currentUser = user;
});

export const signInWithGooglePopup = async () => {
  try {
    const response = await signInWithPopup(auth, googleProvider);
    const { _tokenResponse } = response;

    if (_tokenResponse.isNewUser) {
      const { firstName, lastName, email, localId } = _tokenResponse;
      const userData = { firstName, lastName, email };
      await StoreUserData(userData, localId as string);
    }

    return response.user.uid;
  } catch (error: any) {
    alert(error.message);

    return false;
  }
};
export const signInWithFacebookPopup = async () => {
  try {
    const response = await signInWithPopup(auth, facebookProvider);
    const { _tokenResponse } = response;

    if (_tokenResponse.isNewUser) {
      const { firstName, lastName, email, localId } = _tokenResponse;
      const userData = { firstName, lastName, email };
      await StoreUserData(userData, localId as string);
    }

    return response.user.uid;
  } catch (error: any) {
    alert(error.message);

    return false;
  }
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    return;
  }

  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return response.user.uid;
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      alert("Cannot create user, email already in use!");

      return;
    }
    alert(error.message);
  }
};

export const signinAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    return;
  }

  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

    return response.user.uid;
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      alert("Cannot create user, email already in use!");

      return;
    }

    if (error.code === "auth/invalid-credential") {
      alert("error: invalid email or password");

      return;
    }

    alert(error.message);
  }
};

export const signoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    alert(error.message);
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser ?? currentUser;
};
