const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

require("../db/conn");

router.post("/user/register", async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ error: "Please fill the field" });
  }
  try {
    const userNameExist = await User.findOne({ username: username });
    if (userNameExist) {
      return res.status(400).json({ error: "Username Already Exists" });
    } else {
      const user = new User({ username, password, role });
      const userRegister = await user.save();
      if (userRegister) {
        return res
          .status(200)
          .send({ message: "User Registered Successfully" });
      }
    }
  } catch (e) {
    console.log(e);
  }
});

router.post("/employee/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Please fill the field" });
  }
  try {
    const userFound = await User.findOne({ username: username });
    if (userFound) {
      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        const userData = await User.findOne({ username: username }).select({
          _id: 1,
          username: 1,
          role: 1,
        });
        if (userData.role === "Employee") {
          const token = jwt.sign({ userId: userData._id }, "MY_SECRET_KEY");
          res.status(200).send({ userData, token });
        }
        else{
            res.status(400).send({error:"You are not an Employee"})
        }
      }
    } else {
      res.status(404).send({ error: "User Not Found" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Please fill the field" });
  }
  try {
    const userFound = await User.findOne({ username: username });
    if (userFound) {
      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        const userData = await User.findOne({ username: username }).select({
          _id: 1,
          username: 1,
          role: 1,
        });
        if (userData.role === "Admin") {
            const token = jwt.sign({ userId: userData._id }, "MY_SECRET_KEY");
            res.status(200).send({ userData, token });
        }
        else{
              res.status(400).send({error:"You are not an Admin"})
        }
      }
    } else {
      res.status(404).send({ error: "User Not Found" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/token/verify',async(req,res)=>{
  const {token} = req.query
  if(!token){
    return res.status(401).send({error:"You must be logged in"})
  }
  try {
      jwt.verify(token, 'MY_SECRET_KEY', async(err,payload)=>{
        if(err){
          res.status(401).send({error:"You must be logged in"})
        }
        const {userId} = payload
        const user = await User.findById(userId).select({
          _id: 1,
          username: 1,
          role: 1,
        })
        res.status(200).send(user)
      })
  } catch (error) {
    console.log(error)
  }
})

router.get('/employee/get',async(req,res)=>{
  try {
    const getUsers = await User.find({role:"Employee"}).select({"_id":1,"username":1, "role":1})
    if(getUsers){
      return res.status(200).send(getUsers)
    }
    else{
      return res.status(200).send({error:"No Employee found"})
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
