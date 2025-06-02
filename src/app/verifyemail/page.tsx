"use client";

import axios from "axios";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage(){
     const [token, setToken] = useState("");
     const [verified, setVerified] = useState(false);
     const [error, setError] = useState("");

     const verifyUserEmail = async () => {
          try {
               await axios.post("/api/users/verifyemail", {token})
               setVerified(true);
               
          } catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

     }
     useEffect(() => {

          const urlToken = window.location.search.split("=")
          [1];
          setToken(urlToken || " ");
     }, []);
     
     
     useEffect(() => {
          if(token.length > 0){
               verifyUserEmail();
          }
     }, [token])

     return (
          <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">

               <h1 className="text-3xl font-bold text-center">Verify your email</h1>
               <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

               {verified && (
                    <div>
                         <h2 className="text-center text-green-500">Your email has been verified</h2>
                         <Link href="/login">
                              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                   Login
                              </button>
                         </Link>     
                    </div>
               )}
               
               {error && (
                    <div>
                         <h2 className="text-center text-red-500">Error </h2>
                        
                    </div>
               )}
          </div>
     )
    
}