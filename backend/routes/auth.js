const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'helloworld';
const fetchuser = require('../middleware/fetchuser');


router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array() });
    }
    try {
        
  
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error : "sorry email already exist"})
    }
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, salt);

     user= await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secpass,
    })
    //   .then((user) => res.json(user))
    //   .catch((err) => {
    //     console.log(err);
    //     res.json({ error: "please enter unique email" });
    const data = {
      user:{
        id: user.id
      }
    }
     success = true;
    const authtoken = jwt.sign(success, data,JWT_SECRET);
    res.json({authtoken})
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("error occured")
    }
    //   });
   
    
}
);

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error : "incoorect email"});
      }
      const passwordcompare = await bcrypt.compare(password , user.password);
      if(!passwordcompare){
        return res.status(400).json({ error : "incoorect password"});
      
    } const data = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    success = true;
    res.json({success, authtoken})
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("error occured")
    }
  })

router.post("/getuser", fetchuser, async (req, res) => {
    try {
      const userid= req.user.id;
      const user = await User.findById(userid).select("-password");
       res.send(user)
    }  catch (error) {
        console.error(error.message);
        res.status(500).send("error occured")
    }
  })

module.exports = router;
