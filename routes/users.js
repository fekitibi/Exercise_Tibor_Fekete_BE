const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');
const {UserRole} = require('../models/user_role');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// This endpoint is for user registration
// This endpoint could be also used for sending email verification after successful registration
// Here user update and delete user endpoints could be potentially implemented with the correct authorization
router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User already registered.');

    let userData = _.pick(req.body, ['name', 'email', 'password', 'phone_number', 'address', 'zip_code', 'city']);

    // get the User role
    let role = await UserRole.findOne({role: 'User'});

    userData.profile_pic = 'default pic'
    userData.active = false;
    userData.user_role_id = role._id;
    
    
    userData.created_at = Date.now();
    userData.updated_at = Date.now();

    user = new User(userData);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    
    res.send(_.pick(user,['_id', 'name', 'email']));
});

module.exports = router;