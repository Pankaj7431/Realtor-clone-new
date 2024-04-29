import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import {useNavigate } from 'react-router-dom'

export default function OAuth() {
  const navigate =useNavigate ()
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        
      }
      navigate('/') 
      
    } catch (error) {
      toast.error("Could Not authorize with google");
    }
  }
  return (
    <button
      type="button"
      onClick={onGoogleClick}
      className="flex items-center 
    text-white uppercase px-7 py-2 
    justify-center w-full bg-red-500 rounded-2xl hover:bg-red-700
    transition duration-700 ease-in-out font-medium"
    >
      <FcGoogle className="text-2xl bg-white mr-2 rounded-full" /> Continue With
      Google
    </button>
  );
}

