import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendMail } from "@/helpers/mailer";


connect();

export async function POST(request: NextRequest) {
     try {
          const reqBody = await request.json()
          const {email, password, username} = reqBody;

          console.log(reqBody);


          //check if user exists
          const user = await User.findOne({email: email});

          if (user) {
               return NextResponse.json({error: "User already exists"}, {status: 400});
          }

          //hash password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          const newUser = new User({
               username: username,
               email: email,
               password: hashedPassword,
          })

          const savedUser = await newUser.save();
          console.log(savedUser);

          //send verification email

          await sendMail({
               email: email,
               emailType: "VERIFY",
               userId: savedUser._id
           })  
 


          return NextResponse.json({
               message: "User created successfully",
               success: true,
               savedUser
          
          });

     
     } catch (error: any) {
          return NextResponse.json({
               error: error.message},
               {status: 500});
          
     }
}
