import { createContext, useReducer } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// context
const AuthContext = createContext();

// reducer
export const AuthInit = {
  accessToken: null,
  email: '',
  uid: '',
  photoURL: '',
  error: null
}

export const AuthReducer = async (state, action) => {
  const auth = getAuth();

  let newUser = null;
  switch(action.type) {
    case 'LOGIN':
      await signInWithEmailAndPassword(auth, action.payload.email, action.payload.password)
        .then((userCredential) => {
          // Logged in
          newUser = userCredential.user;
          return {
            ...state,
            accessToken: newUser.accessToken,
            email: newUser.email,
            uid: newUser.uid,
            photoURL: newUser.photoURL
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          return {
            accessToken: null,
            email: '',
            uid: '',
            photoURL: '',
            error: error.code
          }
        });
      return {...state};
    case 'SIGNUP':
      await createUserWithEmailAndPassword(auth, action.payload.email, action.payload.password)
        .then((userCredential) => {
          // Signed in
          newUser = userCredential.user;
          return {
            ...state,
            accessToken: newUser.accessToken,
            email: newUser.email,
            uid: newUser.uid,
            photoURL: newUser.photoURL
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          return {
            accessToken: null,
            email: '',
            uid: '',
            photoURL: '',
            error: error.code
          }
        });
      return {...state};
    case 'GETUSER':
      let  userId = '';
      onAuthStateChanged(auth, (user) => {
        if (user) {
          userId = user.uid;
          newUser = user;
          console.log(newUser.accessToken);
          console.log(newUser.email);
          console.log(user.uid);
          console.log(newUser.photoURL);
          return {
            ...state,
            accessToken: newUser.accessToken,
            email: newUser.email,
            uid: user.uid,
            photoURL: newUser.photoURL
          }
        } else {
          // User is signed out
          // ...
        }
      });
      return {...state};
    case 'LOGOUT':
      return {user: null};
    default:
      return 'None';
  }
}

// provider
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, AuthInit);

  return (
    <AuthContext.Provider value={{dispatch, state}}>
      {children}
    </AuthContext.Provider>
  )
}



export default AuthContext;