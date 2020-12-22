const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// This endpoint is for user registration
// This endpoint could be also used for sending email verification after successful registration
router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User already registered.');

    let userData = _.pick(req.body, ['active','profile_pic','name', 'email', 'user_role_id', 'password', 'phone_number', 'address', 'zip_code', 'city']);
    
    userData.created_at = Date.now();
    userData.updated_at = Date.now();

    user = new User(userData);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    
    res.send(_.pick(user,['_id', 'name', 'email']));
});

// This route was created only for testing the populate function
// TODO: Delete these comments
/*
router.get('/', async (req, res) => {
    const users = await User.find().populate('user_role_id').sort('name');
    res.send(users);
});
*/

module.exports = router;