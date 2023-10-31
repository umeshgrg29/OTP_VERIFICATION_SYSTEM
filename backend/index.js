const cors = require("cors");
const express = require("express");
require("dotenv").config();
const app = express();
const jwt = require("jsonwebtoken");
const User = require("../backend/models/user");
const connectWithDb = require("./config/db");
const mailHelper = require("./utils/emailHelper");
const { isValidToken } = require("./middleware/user");

//connect with database
connectWithDb();

app.use(cors());
app.use(express.json());

//api to reigster the user
app.post("/api/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  try {
    if (!email || !username || !password) {
      return res.status(400).json({ message: "Enter the required fields" });
    }
    let newUser = await User.create({
      username: username,
      email: email,
      password: password,
    });
    if (newUser) {
      res.status(200).json({
        sucess: true,
        message: "User registered successfully",
        newUser,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Server error" });
  }
});

//api to send otp to the user
app.post("/api/sendotp", async (req, res, next) => {
  try {
      const { email } = req.body;
      console.log(email)
      const user = await User.findOne({ email });
    
    //checking if user exists
      if(!user)
      {
        res.status(400).json({message:"No such user found"})
      }
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      console.log("OTP is ", otp);

      //sending OTP via mail
      await mailHelper({
        email,
        subject: "OTP for Verification",
        message: otp
      });

      //store otp in db
      user.otp=otp;
      await user.save();

      // json reponse if email is success
      res.status(200).json({
        succes: true,
        message: "OTP sent successfully",
      });
    
  } catch (error) {
    res.status(500).json({ message: "some error occured"});
  }
});

app.post('/api/validate-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (user && user.otp === otp) {
      // Generate JWT token for session management
      const token = jwt.sign({ userId: user._id }, 'your-secret-key');
      console.log(token)
      // Return success response with token
      res.json({ success: true, message: 'OTP verified successfully', token });
    } else {
      // Return error response for invalid email or OTP
      res.status(401).json({ success: false, message: 'Invalid email or OTP' });
    }
  } catch (error) {
    // Handle database or other server errors
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/api/profile', isValidToken, async(req,res)=>{
  let id = req.user._id;
  console.log("here", id)
  try {
     const profile = await User.findById(id);
     if(!profile){
      return res.sendStatus(403);
      }
      const userData = {
        username: profile.username ,
        email : profile.email,
        password :profile.password
      }
      res.status(200).json({success :true , data : userData}) ;
  } catch (error) {
    res.status(500).json({success :false , message:" server error" }); 
  }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
