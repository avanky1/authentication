import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";


export const sendMail = async ({email, emailType, userId} : any) => {

     try {
         const hashedToken = await bcrypt.hash(userId.toString(), 10)

         if(emailType === "VERIFY"){
             await User.findOneAndUpdate(userId,  
               {verifyToken: hashedToken, verifyTokenExpires: new Date(Date.now() + 3600000)})

         }else if(emailType === "RESET"){
             await User.findOneAndUpdate(userId,  
               {forgotPasswordToken: hashedToken, forgotPasswordTokenExpires: new Date(Date.now() + 3600000)})
         }
         
         // Looking to send emails in production? Check out our Email API/SMTP product!
          const transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
          user: "0a89d485aa2639",
          pass: "b5b0b58133759b"
  }
});

          const mailOptions = {
               from : 'cptests0001@gmail.com',
               to : email,
               subject : emailType === "VERIFY" ? "Verify your email" : "Reset your password",
               html : `<p> Click <a href = "${process.env.DOMAIN}/ 
               verifyemail ? token = ${hashedToken}">here</a> to verify your email</p>`
          
          }
          const mailresponse = await transport.sendMail(mailOptions);
          return mailresponse;
          
     } catch (error:any) {
          throw new Error(error.message);
          
     }

}