"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {

     const router = useRouter();
     const [data, setData] = useState("nothing");

     const logout = async () => {
          try {
              await axios.get("/api/users/logout");
              toast.success("Logged out successfully");
               
          } catch (error: any) {
               console.log(error.message);
               toast.error(error.message);

               
          }
     }

     const getUserDetails = async () => {
         
          const res = await axios.get("/api/users/me");
          console.log(res.data);
          setData(res.data.data._id);
     }

     return(
          <div className="flex flex-col items-center justify-center min-h-screen py-2">
               <h1>Profile</h1>
               <hr />
               <p>Tihs is the profile page</p>
               <h2 className="p-1 text-black rounded-2xl bg-green-400">{data ==='nothing' ? "Nothing" : <Link href = {'/profile/${data}'}>{data}</Link>}</h2>
               <hr />
               <button onClick={logout}
                className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-4xl"
               >Logout</button>

               <button onClick={getUserDetails}
                className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 px-4 rounded-4xl"
               >Get User Details</button>
               
          </div>
     )
}     