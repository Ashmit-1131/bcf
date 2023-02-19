const { UserModel } = require("../model/User.Model");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  const user = await UserModel.find({ email});
 console.log(user)
//  const u1=user.email
//  const u2=email
//   console.log(email,"body")
console.log(user.length)
  if(user.length>0)
  {
    res.send({"msg":"sign up with new id"})
  }
  else if(user.length===0)
  {
    try {
      bcrypt.hash(pass, 5, async (err, hash) => {
        // Store hash in your password DB.
        // console.log(err)
        if (err) res.send({ msg: "something went wrong while registering" });
        else {
          const user = new UserModel({name,email,pass:hash});
          await user.save();
          res.send({"msg":"user registered"});
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  
});

userRouter.post("/login", async (req, res) => {
  const { email,pass} = req.body;
  
  
    try {
      const user = await UserModel.find({ email});
      if (user.length > 0) {
        bcrypt.compare(pass, user[0].pass, (err, result)=> {
            console.log(user[0],pass)
            // console.log(result,"result")
            if(result)
            {
              
               const token = jwt.sign({ userID:user[0]._id }, "masai");
                res.send({ "msg": "login successful", "token": token });
              
            }
            else
            {
                res.send(  {"msg":"wrong credentials"})
            }
          
        });
       
      } else {
        res.send({"msg":"user id not registered"});
      }
    } catch (err) {
      console.log("something went wrong in login");
    }
  
});
module.exports = {
  userRouter
};
