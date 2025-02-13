import React from "react"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
// import {useRecoilState} from 'recoil'
// import { userState } from "../Atom/myatom";



const Signin = ({setUser , user}) => {
 

    const [email , setEmail]=useState("");
    const [password,setpassword]=useState(""); 
    // const [user , setUser]=useRecoilState(userState);
    const navigate=useNavigate(); 

        const handleSubmit = async () => {
          try {
            console.log("hi")
            const response = await axios.post(
              "http://localhost:8787/api/v1/signin",
              {
              
                email,
                password,
              }
            )
            console.log("hello");
          
            // setUser(response.data);
            const jwt=response.data.token ; 
            console.log(jwt) ; 
            localStorage.setItem("token", jwt) ;



  
            setUser(response.data.name) ; 
            console.log(response.data); 
            navigate("/userboard")
          } catch (e) {
            console.log(e)
          }
        }
  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Sign in
              </h1>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setpassword(e.target.value)}
                />
                <button className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <button className="ml-3"
                  
                  onClick={handleSubmit}
                  >Sign In</button>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                  <button
                    className="text-blue-900 font-semibold"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Signin
