// API endpoint to log in the user, it returns a json web token.
const bcrypt = require('bcrypt');
const Joi = require('joi');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// The user should use this endpoint to verify their identity if the call was successfull
// a json web token is returned to the user in the body
router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();

    res.send(token);
});

// This function is for the validation of the incomming user data
function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
  }

module.exports = router;

//const {Accesstoken} = require('../models/accesstoken');
    //Normally I am not storing the access token, but I might do it here after I hash it inside the log in method. 
    // I thought the accesstoken is something like the jsonwebtoken
    //const salt = await bcrypt.genSalt(10);
    //const hashedToken = await bcrypt.hash(token, salt);
    /*const accesstoken = new Accesstoken({
      _id: hashedToken,
      tll://set time to live here,
      //set date here
    })
    
    */