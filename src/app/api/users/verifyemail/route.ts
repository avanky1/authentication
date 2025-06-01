import { connect }  from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
connect();

export async function POST(request: NextRequest) {
     try {
          const reqBody = await request.json();
          const {token} = reqBody;
          console.log(token);

          const user = await User.findOne({verifyToken: token, verifyTokenExpires: {$gt: Date.now()}});

          if(!user){
               return NextResponse.json({message: "Invalid token"}, {status: 401});

          }
          console.log(user);

          user.isVerified = true;
          user.verifyToken = undefined;
          user.verifyTokenExpires = undefined;
          await user.save();

          return NextResponse.json({
               message : "Email verified successfully",
               success : true
          })

          
     } catch (error:any) {
          return NextResponse.json({message: error.message}, {status: 500});
          
     }
}