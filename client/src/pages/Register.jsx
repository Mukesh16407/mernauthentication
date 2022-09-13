import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const Register = () => {
  const [userRegistration, setUserRegistration] = useState({
    fname: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const setVal = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserRegistration({ ...userRegistration, [name]: value });
  };
  const registerUser = async () => {
    const { fname, email, password, cPassword } = userRegistration;

    if (fname === "") {
      toast.error("fname is required!", {
        position: "top-center",
      });
    } else if (email === "") {
      toast.error("email is required!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.error("includes @ in your email!", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
        position: "top-center",
      });
    } else if (cPassword === "") {
      toast.error("confirmPassword is required!", {
        position: "top-center",
      });
    } else if (cPassword.length < 6) {
      toast.error("confirm password must be 6 char!", {
        position: "top-center",
      });
    } else if (password !== cPassword) {
      toast.error("pass and confirmPassword are not matching!", {
        position: "top-center",
      });
    } else {
      const userObj = {fname,password,email,cPassword,};
      try {
        toast.loading("Loading...");
        const response = await axios.post("/api/auth/register", userObj);
        toast.dismiss();
        if(response.data.success){
          toast.success(response.data.message);
        }else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.dismiss();
        toast.error("Something went wrong");
      }
     
      }
    }

  return (
    <div className="flex justify-center items-center h-screen space-x-40">
      <div className="w-[400px] flex space-y-5 flex-col shadow-lg border border-gray-300">
        <h1 className="font-semibold text-2xl text-white bg-primary p-5 rounded-b-full text-center">
          Welcome TO Auth
        </h1>
        <div className="flex flex-col space-y-5 p-5">
          <input
            type="text"
            className="py-1 px-3 border-2 border-secondary focus:outline-none w-full"
            placeholder="name"
            id="fname"
            name="fname"
            value={userRegistration.fname}
            onChange={setVal}
          />
          <input
            type="text"
            className="py-1 px-3 border-2 border-secondary focus:outline-none w-full"
            placeholder="email"
            id="email"
            name="email"
            value={userRegistration.email}
            onChange={setVal}
          />
          <input
            type="password"
            className="py-1 px-3 border-2 border-secondary focus:outline-none w-full"
            placeholder="password"
            id="password"
            name="password"
            value={userRegistration.password}
            onChange={setVal}
          />
          <input
            type="password"
            className="py-1 px-3 border-2 border-secondary focus:outline-none w-full"
            placeholder="confirm password"
            id="cPassword"
            name="cPassword"
            value={userRegistration.cPassword}
            onChange={setVal}
          />
          <div className="flex justify-between items-end">
            <Link className="underline text-primary" to="/login">
              Click Here To Login
            </Link>
            <button
              className="py-1 px-5 text-white bg-primary"
              onClick={registerUser}
            >
              REGISTER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
