const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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




app.listen(3001, ()=>{
  console.log("Server is started");
})