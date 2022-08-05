import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyDkzxMq3vdqrKo7FER17MsP11za6Deb1Ho",
  authDomain: "portfolio-2022-jeheo.firebaseapp.com",
  databaseURL: "https://portfolio-2022-jeheo-default-rtdb.firebaseio.com",
  projectId: "portfolio-2022-jeheo",
  storageBucket: "portfolio-2022-jeheo.appspot.com",
  messagingSenderId: "233128118631",
  appId: "1:233128118631:web:e4d0e695a94cfa108ac7c2"
};

export const firebaseInstance = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseInstance);

export const storage = getStorage(firebaseInstance);

const auth = getAuth(firebaseInstance);
export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const logout = () => {
  signOut(auth);
}

export const getUser = () => {
  const user = auth.currentUser;
  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const uid = user.uid;

    return {
      displayName,
      email,
      photoURL,
      uid
    }
  } else {
    return null;
  }
}