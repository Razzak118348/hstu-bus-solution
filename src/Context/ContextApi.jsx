import React from 'react';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import { useEffect, useState } from "react";
import { createContext } from "react";
import app from '../Firebase/firebase.config'

export const AuthContext = createContext(null)

//social media provider
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()
const ContextApi = ({children}) => {
  const auth = getAuth(app)
  const [user,setUser]= useState(null)
  const [loading,setLoading]=useState(true)

  //creat user
  const creatUser =(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)

  }

  //signin user
  const SignInUser = (email,password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password)
  }

  //google login
  const googleLogin=()=>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
  }

  //github login
  const gitHubLogin =()=>{
    setLoading(true)
    return signInWithPopup(auth,githubProvider)
  }

  //observer
  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser)
      setLoading(false)
    });
return ()=>{
  unSubscribe();
}
  },[])

const LogOut =()=>{
  setLoading(true)
  setUser(null)
  signOut(auth)
}


const authInfo = {
  user,
  creatUser,
  SignInUser,
  LogOut,
  loading,
  googleLogin,
  gitHubLogin}


    return (
        <AuthContext.Provider value={authInfo} >{children}</AuthContext.Provider>
    );
};

export default ContextApi;
