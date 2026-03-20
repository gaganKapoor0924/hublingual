const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)

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

let mailTransporter =
    nodemailer.createTransport(
        {
            service: 'gmail',
             auth: {
    user: process.env.EMAIL_USER, // your gmail
    pass: process.env.EMAIL_PASS,   // app password
  }
        }
    );

let mailDetails = {
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
      
};

mailTransporter
    .sendMail(mailDetails,
        function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });

app.post('/contact', async (req, res)=>{
  try {
    const { name, email, phone, course, message } = req.body;
    if(!name || !email || !phone || !course || !message){
      return res.status(400).json({message:"All fields are required"});
    }
    const newUser = new User(req.body);
    await newUser.save();

     
    res.status(200).json({message:"Data Saved Successfully"});
  } catch (error) {
    res.status(500).json({message:"Error saving data"});
  }
})

const PORT = process.env.PORT || 3001;


app.listen(PORT, ()=>{
  console.log("Server is started");
})