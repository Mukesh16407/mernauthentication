/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export const VerifyEmail = () => {

  const [emailVerified, setEmailVerified] = useState("");
  
  const params = useParams();
  const verifyToken =async()=>{
      try{
        toast.loading();
        const response = await axios.post("/api/auth/verifyemail", {
          token: params.token,
        });
        if (response.data.success) {
          setEmailVerified("true");
        } else {
          setEmailVerified("false");
        }
      }catch(error){
        toast.dismiss();
        setEmailVerified("false");
      }
  }
  useEffect(() => {
    verifyToken();
  }, []);
  return (
    <div className="flex min-h-screen p-5 justify-center items-center">
      {emailVerified==="" &&(
        <h1 className="text-primary text-4xl">
        Please wait we are verifying your email
      </h1>
      )}
      {emailVerified === "true" && (
        <h1 className="text-primary text-4xl">
          Your email verified successfully
        </h1>
      )}
      {emailVerified === "false" && (
        <h1 className="text-primary text-4xl">Invalid or Expired Token</h1>
      )}
    </div>
  )
}
