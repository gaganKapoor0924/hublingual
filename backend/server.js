const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://garvikapoor2021_db_user:YJ9639dK43EIzglN@cluster0.c1jco4s.mongodb.net/institute?appName=Cluster0')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  course: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your gmail
    pass: process.env.EMAIL_PASS,   // app password
  },
});

app.post('/contact', async (req, res)=>{
  try {
    const { name, email, phone, course, message } = req.body;
    if(!name || !email || !phone || !course || !message){
      return res.status(400).json({message:"All fields are required"});
    }
    const newUser = new User(req.body);
    await newUser.save();

     try {
      await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to: "garvikapoor2021@gmail.com",
        replyTo: email,
        subject: "New Contact Form Submission",
        html: `
          <h2>New Lead Received</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Course:</b> ${course}</p>
          <p><b>Message:</b> ${message}</p>
        `,
      });
      console.log("Email Sent ✅");
    } catch (emailError) {
      console.log("❌ Email Error:", emailError);
    }
    res.status(200).json({message:"Data Saved Successfully"});
  } catch (error) {
    res.status(500).json({message:"Error saving data"});
  }
})




app.listen(3001, ()=>{
  console.log("Server is started");
})