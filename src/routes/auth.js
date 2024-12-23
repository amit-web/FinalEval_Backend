const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { userValidationSignup } = require("../utils/validation.js");
const bcrypt = require("bcrypt");
authRouter.post("/signup", async (req, res) => {
    try {
      let data = req.body;
      let {name, emailId, password} = req.body;
      userValidationSignup(data);
      const hashEncrptedPassword = bcrypt.hash(password, 10);
      const hasedPass = await hashEncrptedPassword;
      const user = new User({
        name,
        emailId,
        password: hasedPass,
        
      });
     const savedUser =  await user.save();
     const token = await user.getJWT();
  
     res.cookie("token", token, {
       expires: new Date(Date.now() + 1 * 3600000),
     }); 
      res.json({
        message:"user added successfully",
        data:savedUser
      });

    } catch (err) {
      res.status(404).send("Error:" + " " + err.message);
    }
  });
  
authRouter.post("/login", async (req, res) => {
    try {
      let { emailId, password } = req.body;
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("Invalid Credential");
      }
      const isPasswordValid = await user.validatePassword(password);
      if (isPasswordValid) {
        //create jwt token
        const token = await user.getJWT();
  
        res.cookie("token", token, {
          expires: new Date(Date.now() + 1 * 3600000),
        });
  
        res.json({
           user
        });
      } else {
        throw new Error("Invalid Credential");
      }
    } catch (err) {
      res.status(400).send("Error:" + " " + err.message);
    }
  });

authRouter.post("/logout",(req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())})
    res.send("logged out");
  })
  

  
module.exports = authRouter;