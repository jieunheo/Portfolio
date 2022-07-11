import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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