
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config(); 

console.log("Host:", process.env.EMAIL_HOST);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST ,
  port: Number(process.env.EMAIL_PORT) ,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});




export const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"Hospital System" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};